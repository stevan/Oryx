
module Oryx {
    export module UI {
        export class Panel extends Oryx.Core.Observable {

            public actions      : Oryx.Binding.Action[] = [];
            public outlets      : Oryx.Binding.Outlet[] = [];
            private data_source : Oryx.Binding.IOutletTarget;
            private responder   : Oryx.Binding.IActionTarget;

            constructor ( opts : {
                actions      : Oryx.Binding.Action[];
                outlets      : Oryx.Binding.Outlet[];
                responder?   : Oryx.Binding.IActionTarget;
                data_source? : Oryx.Binding.IOutletTarget;
            } ) {
                super();
                this.outlets = opts.outlets;
                this.actions = opts.actions;
                if ( opts.responder != undefined ) {
                    this.set_responder( opts.responder );
                }
                if ( opts.data_source != undefined ) {
                    this.set_data_source( opts.data_source );
                }
            }

            get_responder (): Oryx.Binding.IActionTarget { return this.responder }

            set_responder ( responder : Oryx.Binding.IActionTarget ): void {
                this.responder = responder;
                this.actions.map(( a ) => { a.set_target( this.responder ) });
                this.fire('update:responder', this);
            }

            clear_responder (): void {
                this.responder = undefined;
                this.actions.map(( a ) => { a.clear_target() });
                this.fire('clear:responder', this);
            }

            get_data_source (): Oryx.Binding.IOutletTarget { return this.data_source; }

            set_data_source ( data_source : Oryx.Binding.IOutletTarget ): void {
                this.clear_errors();
                this.data_source = data_source;
                this.outlets.map(( o ) => { o.set_target( this.data_source ) });
                this.fire('update:data_source', this);
            }

            clear_data_source (): void {
                this.clear_errors();
                this.data_source = undefined;
                this.outlets.map(( o ) => { o.clear_target() });
                this.fire('clear:data_source', this);
            }

            clear_errors () {
                jQuery('.error').removeClass('error');
            }

            static inflate ( opts : { outlets : Object; actions : Object; } ): Oryx.UI.Panel {
                var outlets = [],
                    actions = [],
                    outlets_by_prop = {};

                for ( var selector in opts.outlets ) {
                    var args = opts.outlets[ selector ];

                    var outlet = new Oryx.UI[ args.type ] ({
                        element       : jQuery( selector ),
                        property      : args['prop'],
                        formatter     : args['formatter'],
                        transformer   : args['transformer'],
                        validator     : args['validator'],
                        error_element : jQuery( args['error_element'] ),
                    });

                    outlets.push(outlet);
                    outlets_by_prop[ args['prop'] ] = outlet;
                }

                for ( var selector in opts.actions ) {
                    var args = opts.actions[ selector ];

                    /* some actions need properties to be valid to
                       be able to run. this chunk of code wraps up
                       a bunch of validators together. we always
                       want all the validators to run (because they
                       might highlight erroneous fields) but we
                       only want a simple valid/invalid response
                       ... for now... */

                    var validator = args['validator'];
                    if (typeof validator === "string") {
                        var validator_method = validator;
                        validator = function (source) {
                            return source[validator_method]();
                        };
                    }

                    if (args['validate_props']) {
                        if (args['validate_props'] === '*') {
                            args['validate_props'] = outlets;
                        }
                        else {
                            args['validate_props'] = args['validate_props'].map(( prop ) => { outlets_by_prop[prop] });
                        }

                        args['validate_props'].forEach(function (outlet) {
                            var old_validator = validator;

                            validator = function (source) {
                                var is_valid = true;

                                if (outlet.validate_or_warn() !== true) {
                                    is_valid = false;
                                }

                                if (old_validator) {
                                    var validation = old_validator(source);
                                    if (validation !== true) {
                                        return validation;
                                    }
                                }

                                return is_valid;
                            };
                        });
                    }

                    actions.push(
                        new Oryx.UI[ args.type ] ({
                            element           : jQuery( selector ),
                            event_type        : args['event'],
                            target_action     : args['action'],
                            validator         : validator,
                            error_element     : jQuery( args['error_element'] ),
                        })
                    );
                }

                return new Oryx.UI.Panel ({ outlets : outlets, actions : actions });
            }
        }
    }
}





