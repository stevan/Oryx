module Kart {
    export module Util {

        export module Array {
            export function remove ( array : any, from : number, to? : number ) {
                var rest = array.slice((to || from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            }
        }

        export module Serializer {
            declare var JSON;

            export var json : Kart.Model.ISerializer = {
                serialize   : ( obj  : any    ): string => { return JSON.stringify( obj ) },
                deserialize : ( json : string ): any    => { return JSON.parse( json )    }
            };
        }

    }
}