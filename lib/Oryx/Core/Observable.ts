module Oryx {
    export module Core {
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
                        Oryx.Util.Array.remove( callbacks, i );
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
    }
}