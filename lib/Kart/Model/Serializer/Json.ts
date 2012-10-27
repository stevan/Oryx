module Kart {
    export module Model {
        export module Serializer {
            export class Json implements ISerializer  {
                serialize   ( obj  : any    ): string { return JSON.stringify( obj ) }
                deserialize ( json : string ): any    { return JSON.parse( json )    }
            }
        }
    }
}
