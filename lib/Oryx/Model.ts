module Oryx {
    export module Model {
        export interface ISerializer {
            serialize   ( x : any    ): string;
            deserialize ( x : string ): any;
        }

        export interface ISerializable {
            pack (): any;
            serialize ( serializer : ISerializer ): string;
        }
    }
}
