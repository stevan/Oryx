
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
                this.trigger('update:responder', this);
            }

            clear_responder (): void {
                this.responder = undefined;
                this.actions.map(( a ) => { a.clear_target() });
                this.trigger('clear:responder', this);
            }

            get_data_source (): Oryx.Binding.IOutletTarget { return this.data_source; }

            set_data_source ( data_source : Oryx.Binding.IOutletTarget ): void {
                this.data_source = data_source;
                this.outlets.map(( o ) => { o.set_target( this.data_source ) });
                this.trigger('update:data_source', this);
            }

            clear_data_source (): void {
                this.data_source = undefined;
                this.outlets.map(( o ) => { o.clear_target() });
                this.trigger('clear:data_source', this);
            }

            static inflate ( opts : { outlets : Object; actions : Object; } ): Oryx.UI.Panel {
                var o = [], a = [];

                for ( var selector in opts.outlets ) {
                    var args = opts.outlets[ selector ];
                    o.push(
                        new Oryx.UI[ args.type ] ({
                            element  : new Oryx.RosettaNode( selector ),
                            property : args['prop']
                        })
                    );
                }

                for ( var selector in opts.actions ) {
                    var args = opts.actions[ selector ];
                    a.push(
                        new Oryx.UI[ args.type ] ({
                            element       : new Oryx.RosettaNode( selector ),
                            event_type    : args['event'],
                            target_action : args['action']
                        })
                    );
                }

                return new Oryx.UI.Panel ({ outlets : o, actions : a });
            }
        }
    }
}





