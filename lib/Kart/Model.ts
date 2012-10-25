module Kart {
    export module Model {
        export interface ISerializer {
            serialize ( x : Object ): string;
        }

        export interface ISerializable {
            pack (): Object;
            serialize ( serializer : ISerializer ): string;
        }
    }
}