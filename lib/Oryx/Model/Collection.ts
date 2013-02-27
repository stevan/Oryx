module Oryx {
    export module Model {
        export class Collection extends Oryx.Core.Observable implements ISerializable {

            constructor ( private resources : Resource[] = [] ) { super() }

            pack (): Object[] {
                return this.resources.map( ( r ) => { return r.pack() } )
            }

            serialize ( serializer : ISerializer ): string {
                return serializer.serialize( this.pack() );
            }

            length (): number { return this.resources.length }

            add ( resource : Resource ): void {
                this.resources.push( resource );
                this.fire( 'add', this, (this.resources.length - 1), resource );
            }

            remove ( index : number ): void {
                var resource = this.resources[ index ];
                this.resources.splice(index, 1);
                this.fire( 'remove', this, index, resource );
            }

            get ( index : number ): Resource { return this.resources[ index ] }

            getById ( id : string ): Resource {
                var length = this.length();

                for ( var i = 0; i < length; i++ ) {
                    var resource = this.get( i );
                    if ( resource.id === id ) {
                        return resource;
                    }
                }

                return;
            }

            set ( index : number, resource : Resource ): void {
                this.resources[ index ] = resource;
                this.fire( 'update:' + index, this, index, resource );
            }

            map ( f : ( r : Resource ) => any ) {
                return this.resources.map( f );
            }
        }
    }
}
