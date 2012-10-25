module Kart {
    export module Util {
        export module Array {
            export function remove ( array : any, from : number, to? : number ) {
                var rest = array.slice((to || from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            }
        }
    }
}