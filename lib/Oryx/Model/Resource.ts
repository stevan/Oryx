module Oryx {
    export module Model {
        var traverser = Oryx.Core.Traversable;
        export class Resource extends Oryx.Core.Observable implements Oryx.Binding.IOutletTarget, ISerializable {

            public id   : string;
            public body : Object;

            constructor ( id : string, body : Object ) {
                super();
                this.id   = id;
                this.body = body;
            }

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
}