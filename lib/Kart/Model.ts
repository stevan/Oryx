module Kart {
    export module Model {
        var traverser = Kart.Core.Traversable;

        export interface ISerializer {
            serialize ( x : Object ): string;
        }

        export interface ISerializable {
            pack (): Object;
            serialize ( serializer : ISerializer ): string;
        }

        export class Resource extends Kart.Core.Observable implements Kart.Binding.IOutletTarget, ISerializable {

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

}