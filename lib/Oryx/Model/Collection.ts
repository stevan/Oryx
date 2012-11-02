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
                this.trigger( 'add', this, (this.resources.length - 1), resource );
            }

            get ( index : number ): Resource { return this.resources[ index ] }

            set ( index : number, resource : Resource ): void {
                this.resources[ index ] = resource;
                this.trigger( 'update:' + index, this, index, resource );
            }

            map ( f : ( r : Resource ) => any ) {
                return this.resources.map( f );
            }
        }
    }
}