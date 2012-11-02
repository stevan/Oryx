module Oryx {
    export class Error {
        name    : string = "Oryx Error";
        message : string;
        reason  : string;

        constructor( msg : string, reason? : string ) {
            this.message = msg;
            this.reason  = reason || msg;
        }

        toString () { return this.message }
    }
}
