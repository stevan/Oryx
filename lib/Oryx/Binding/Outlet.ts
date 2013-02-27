module Oryx {
    export module Binding {
        export class Outlet {

            public element       : JQuery;
            public property      : string;
            public target        : IOutletTarget;
            public transformer   : ( x : any ) => any;
            public formatter     : ( x : any ) => any;
            public validator     : ( x : any ) => any;
            public error_element : JQuery;

            public element_event;
            public target_event;

            constructor ( opts : {
                element        : JQuery;
                property       : string;
                target?        : Object;
                transformer?   : ( x : any ) => any;
                formatter?     : ( x : any ) => any;
                validator?     : ( x : any ) => any;
                error_element? : JQuery;
            } ) {
                this.element       = opts.element;
                this.property      = opts.property;
                this.target        = <IOutletTarget> opts.target;
                this.transformer   = opts.transformer;
                this.formatter     = opts.formatter;
                this.validator     = opts.validator;
                this.error_element = opts.error_element;

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
                    this.clear_error();
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

            validate_or_warn (): bool {
                if (this.validator) {
                    var value = this.get_element_value();
                    if ( this.transformer ) {
                        value = this.transformer( value );
                    }

                    var validation = this.validator(value);
                    if (validation !== true) {
                        this.show_error(validation);
                        return false;
                    }
                }

                this.clear_error();
                return true;
            }

            update_target (): void {
                var value = this.get_element_value();
                if ( this.transformer ) {
                    value = this.transformer( value );
                }
                if ( this.validator ) {
                    var validation = this.validator(value);
                    if (validation !== true) {
                        this.show_error(validation);
                    }
                    else {
                        this.clear_error();
                    }
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

            show_error (result : any): void {
                this.$element().closest('.control-group').addClass('error');

                if (result && this.error_element && this.error_element.length) {
                    this.error_element.addClass("error").text(result);
                }
                else {
                    console.warn("unreported validation error in", this, result);
                }
            }

            clear_error (): void {
                this.$element().closest('.control-group').removeClass('error');
                if (this.error_element) {
                    this.error_element.removeClass("error").text("");
                }
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
}
