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

        interface Callback {
            (...args: any[]): void;
        }

        export class Observable {
            private callbacks = {};

            bind ( event_name : string, callback : Callback ): Observable {
                if ( this.callbacks[ event_name ] == undefined ) {
                    this.callbacks[ event_name ] = [];
                }
                this.callbacks[ event_name ].push( callback );
                return this;
            }

            unbind ( event_name : string, callback : Callback ): Observable {
                if ( this.callbacks[ event_name ] == undefined ) return;
                var callbacks = this.callbacks[ event_name ];
                for (var i = 0; i < callbacks.length; i++) {
                    if (callbacks[i] === callback) {
                        Util.Array.remove( callbacks, i );
                    }
                }
                return this;
            }

            trigger ( event_name : string, ...args: any[] ): Observable {
                if ( this.callbacks[ event_name ] != undefined ) {
                    var callbacks = this.callbacks[ event_name ];
                    for ( var i = 0; i < callbacks.length; i++ ) {
                        callbacks[i].apply( this, args );
                    }
                }
                return this;
            }

        }

        export class Traversable {

            traverse_path_and_get ( path : string, context : Object ): any {
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

            traverse_path_and_set ( path : string, context : Object, value : any, full_path? : string ): void {
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
        export class Action {

            private $element : () => JQuery;
            private _element_event ;

            constructor (
                public element        : JQuery,
                public event_type     : string,
                public target?        : any,
                public target_action? : string
            ) {
                var self = this;
                this.$element       = function () { return jQuery( self.element ) };
                this._element_event = function (e) { self.call_target_action( e ) };
                this.setup();
            }

            setup (): void {
                if ( this.target == undefined ) return;
                this.register_element_event();
            }

            set_target ( target ): void {
                this.clear_target();
                this.target = target;
                this.setup();
            }

            set_target_data ( target_data ): void {
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
                this.$element().bind( this.event_type, this._element_event );
            }

            unregister_element_event (): void {
                this.$element().unbind( this.event_type, this._element_event );
            }

            call_target_action (...args: any[]): void {
                this.target[this.target_action].apply( this.target, args );
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

