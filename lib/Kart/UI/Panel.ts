
module Kart {
    export module UI {
        export class Panel extends Kart.Core.Observable {

            public actions      : Kart.Binding.Action[] = [];
            public outlets      : Kart.Binding.Outlet[] = [];
            private data_source : Kart.Binding.IOutletTarget;
            private responder   : Kart.Binding.IActionTarget;

            constructor ( opts : {
                actions      : Kart.Binding.Action[];
                outlets      : Kart.Binding.Outlet[];
                responder?   : Kart.Binding.IActionTarget;
                data_source? : Kart.Binding.IOutletTarget;
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

            get_responder (): Kart.Binding.IActionTarget { return this.responder }

            set_responder ( responder : Kart.Binding.IActionTarget ): void {
                this.responder = responder;
                this.actions.map(( a ) => { a.set_target( this.responder ) });
                this.trigger('update:responder', this);
            }

            clear_responder (): void {
                this.responder = undefined;
                this.actions.map(( a ) => { a.clear_target() });
                this.trigger('clear:responder', this);
            }

            get_data_source (): Kart.Binding.IOutletTarget { return this.data_source; }

            set_data_source ( data_source : Kart.Binding.IOutletTarget ): void {
                this.data_source = data_source;
                this.outlets.map(( o ) => { o.set_target( this.data_source ) });
                this.trigger('update:data_source', this);
            }

            clear_data_source (): void {
                this.data_source = undefined;
                this.outlets.map(( o ) => { o.clear_target() });
                this.trigger('clear:data_source', this);
            }
        }
    }
}





