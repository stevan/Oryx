module Oryx {
    export module Binding {
        export class Action {

            public element       : JQuery;
            public event_type    : string;
            public target        : IActionTarget;
            public target_action : string;
            public element_event : ( e : JQueryEventObject ) => void;
            public validator     : ( x : Object ) => any;

            constructor ( opts : {
                element        : JQuery;
                event_type     : string;
                target?        : Object;
                target_action? : string;
                validator?     : ( x : Object ) => any;
            } ) {
                this.element       = opts.element;
                this.event_type    = opts.event_type;
                this.target        = <IActionTarget> opts.target;
                this.target_action = opts.target_action;
                this.element_event = ( e ) => { this.call_target_action( e ) };
                this.validator     = opts.validator;

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
                if ( this.validator ) {
                    if (this.validator( this.target ) !== true) {
                        return;
                    }
                }

                // XXX - maybe this should throw an error??
                if ( this.target                     == undefined ) return;
                if ( this.target[this.target_action] == undefined ) return;
                this.target[this.target_action].apply( this.target, [ e ] );
            }

        }
    }
}
