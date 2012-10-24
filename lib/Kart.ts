module Kart {

    export var VERSION   = 0.01;
    export var AUTHORITY = "cpan:STEVAN";

    export class Error {
        name    : string = "Kart Error";
        message : string;
        reason  : string;

        constructor( msg : string, reason? : string ) {
            this.message = msg;
            this.reason  = reason || msg;
        }

        toString () { return this.message }
    }

    export module Core {

        interface ICallback {
            (...args: any[]): void;
        }

        export interface ITraversable {
            get ( path    : string ): any;
            set ( updates : Object ): ITraversable;
        }

        export interface IObservable {
            bind    ( event_name : string, callback : ICallback ): IObservable;
            unbind  ( event_name : string, callback : ICallback ): IObservable;
            trigger ( event_name : string, ...args  : any[]     ): IObservable;
        }

        export class Observable implements IObservable {
            private callbacks = {};

            bind ( event_name : string, callback : ICallback ): IObservable {
                if ( this.callbacks[ event_name ] == undefined ) {
                    this.callbacks[ event_name ] = [];
                }
                this.callbacks[ event_name ].push( callback );
                return this;
            }

            unbind ( event_name : string, callback : ICallback ): IObservable {
                if ( this.callbacks[ event_name ] == undefined ) return;
                var callbacks = this.callbacks[ event_name ];
                for (var i = 0; i < callbacks.length; i++) {
                    if (callbacks[i] === callback) {
                        Util.Array.remove( callbacks, i );
                    }
                }
                return this;
            }

            trigger ( event_name : string, ...args : any[] ): IObservable {
                if ( this.callbacks[ event_name ] != undefined ) {
                    var callbacks = this.callbacks[ event_name ];
                    for ( var i = 0; i < callbacks.length; i++ ) {
                        callbacks[i].apply( this, args );
                    }
                }
                return this;
            }

        }

        export module Traversable {

            export function traverse_path_and_get ( path : string, context : Object ): any {
                var parts   = path.split('.');
                var current = context;
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if ( current[ part ] != undefined && current[ part ].constructor == Function ) {
                        current = current[ part ].call( this );
                    }
                    else {
                        current = current[ part ];
                    }
                    // if there is nothing there,
                    // then we might as well return
                    // undefined, even if we are not
                    // finished the traversal, the
                    // result is the same
                    if ( current == undefined ) return current;
                }
                return current;
            }

            export function traverse_path_and_set ( path : string, context : Object, value : any, full_path? : string ): void {
                if ( full_path == undefined ) full_path = path;
                var parts   = path.split('.');
                var final   = parts.pop();
                var current = context;
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if ( current[ part ] != undefined && current[ part ].constructor == Function ) {
                        current = current[ part ].call( this );
                    }
                    else {
                        if ( current[ part ] == undefined && i < parts.length ) {
                            // auto-vivify when we
                            // hit a dead-end, this
                            // is most appropriate
                            // for additional_properties
                            current[ part ] = {};
                        }
                        else if ( typeof current[ part ] != 'object' && i < parts.length ) {
                            // if we still have parts and
                            // the current item is not an
                            // object, they obviously the
                            // path is not valid, so we
                            // throw an error
                            throw new Kart.Error ("The property (" + full_path + ") is not a valid property");
                        }
                        current = current[ part ];
                    }
                }
                // if we have reached the end
                // and we find a Function, then
                // we assume it is a setter can
                // so we call it
                if ( current[ final ] != undefined && current[ final ].constructor == Function ) {
                    current[ final ].call( this, value );
                }
                else {
                    current[ final ] = value;
                }
            }
        }
    }

    export module Binding {

        export interface IOutletTarget extends Core.IObservable, Core.ITraversable {}

        export interface IActionTarget {
            [ target : string ] : Function;
        }

        export class Action {

            public element       : JQuery;
            public event_type    : string;
            public target        : IActionTarget;
            public target_action : string;
            public element_event : ( e : JQueryEventObject ) => void;

            constructor ( opts : {
                element        : JQuery;
                event_type     : string;
                target?        : Object;
                target_action? : string;
            } ) {
                this.element       = opts.element;
                this.event_type    = opts.event_type;
                this.target        = <IActionTarget> opts.target;
                this.target_action = opts.target_action;
                this.element_event = ( e ) => { this.call_target_action( e ) };

                this.setup();
            }

            $element (): JQuery {
                return jQuery( this.element )
            }

            setup (): void {
                if ( this.target == undefined ) return;
                this.register_element_event();
            }

            set_target ( target : IActionTarget ): void {
                this.clear_target();
                this.target = target;
                this.setup();
            }

            set_target_data ( target_data : { target : IOutletTarget; action? : string; } ): void {
                this.clear_target();
                this.target = target_data.target;
                if ( target_data.action != undefined ) {
                    this.target_action = target_data.action;
                }
                this.setup();
            }

            clear_target (): void {
                this.unregister_element_event();
                this.target = undefined;
            }

            register_element_event (): void {
                this.$element().bind( this.event_type, this.element_event );
            }

            unregister_element_event (): void {
                this.$element().unbind( this.event_type, this.element_event );
            }

            call_target_action ( e : JQueryEventObject ): void {
                // XXX - maybe this should throw an error??
                if ( this.target                     == undefined ) return;
                if ( this.target[this.target_action] == undefined ) return;
                this.target[this.target_action].apply( this.target, [ e ] );
            }

        }

        export class Outlet {

            public element     : JQuery;
            public property    : string;
            public target      : IOutletTarget;
            public transformer : ( x : any ) => any;
            public formatter   : ( x : any ) => any;

            public element_event;
            public target_event;

            constructor ( opts : {
                element        : JQuery;
                property       : string;
                target?        : Object;
                transformer?   : ( x : any ) => any;
                formatter?     : ( x : any ) => any;
            } ) {
                this.element     = opts.element;
                this.property    = opts.property;
                this.target      = <IOutletTarget> opts.target;
                this.transformer = opts.transformer;
                this.formatter   = opts.formatter;

                this.element_event = () => { this.update_target() };
                this.target_event  = () => { this.update_element.apply( this, arguments ) }

                this.setup();
            }

            $element (): JQuery {
                return jQuery( this.element )
            }

            setup (): void {
                if ( this.target == undefined ) return;
                this.register_all_events();
                this.refresh();
            }

            set_target ( target : IOutletTarget ): void {
                this.clear_target();
                this.target = target;
                this.setup();
            }

            clear_target (): void {
                if ( this.target != undefined ) {
                    this.unregister_all_events();
                    this.target = undefined;
                    this.set_element_value('');
                }
            }

            refresh (): void {
                this.update_element(
                    this.target,
                    this.get_target_value()
                );
            }

            // default events

            update_target (): void {
                var value = this.get_element_value();
                if ( this.transformer ) {
                    value = this.transformer( value );
                }
                this.set_target_value( value );
            }

            update_element ( target : IOutletTarget, value : any ): void {
                if ( this.formatter ) {
                    value = this.formatter( value );
                }
                this.set_element_value( value );
            }

            // event registration

            unregister_all_events (): void {
                this.unregister_target_event();
                this.unregister_element_event();
            }

            register_all_events (): void {
                this.register_element_event();
                this.register_target_event();
            }

            // -------------------------------
            // methods to change in subclasses
            // -------------------------------
            // element handlers

            register_element_event (): void {
                this.$element().bind( 'change', this.element_event );
            }

            unregister_element_event (): void {
                this.$element().unbind( 'change', this.element_event );
            }

            get_element_value (): any {
                return this.$element().val();
            }

            set_element_value ( value : any ): void {
                this.$element().val( value == undefined ? "" : value );
            }

            // target handlers

            register_target_event (): void {
                this.target.bind( "update:" + this.property, this.target_event );
            }

            unregister_target_event (): void {
                this.target.unbind( "update:" + this.property, this.target_event );
            }

            get_target_value (): any {
                return this.target.get( this.property );
            }

            set_target_value ( value : any ): any {
                var o = {};
                o[ this.property ] = value;
                return this.target.set( o );
            }

        }

    }

    export module Model {
        var traverser = Core.Traversable;

        export interface ISerializer {
            serialize ( x : Object ): string;
        }

        export interface ISerializable {
            pack (): Object;
            serialize ( serializer : ISerializer ): string;
        }

        export class Resource extends Core.Observable implements Binding.IOutletTarget, ISerializable {

            constructor ( public body : Object ) { super() }

            pack (): Object { return this.body }

            serialize ( serializer : ISerializer ): string {
                return serializer.serialize( this.pack() );
            }

            get ( path : string ): any {
                return traverser.traverse_path_and_get( path, this.body );
            }

            set ( updates : Object ): Resource {
                for (var k in updates) {
                    traverser.traverse_path_and_set( k, this.body, updates[ k ], k );
                    this.trigger( 'update:' + k, this, updates[ k ] );
                }
                this.trigger('update', this, updates);
                return this;
            }
        }
    }

    module Util {
        export module Array {
            export function remove ( array : Array, from : number, to? : number ) {
                var rest = array.slice((to || from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            }
        }
    }

}

