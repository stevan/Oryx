/// <reference path="../shared/jquery.d.ts" />

/// <reference path="../lib/Kart/Util.ts" />
/// <reference path="../lib/Kart/Util/Array.ts" />

/// <reference path="../lib/Kart/Core.ts" />
/// <reference path="../lib/Kart/Core/Observable.ts" />
/// <reference path="../lib/Kart/Core/Traversable.ts" />

/// <reference path="../lib/Kart/Binding.ts" />
/// <reference path="../lib/Kart/Binding/Action.ts" />
/// <reference path="../lib/Kart/Binding/Outlet.ts" />

/// <reference path="../lib/Kart/Model.ts" />
/// <reference path="../lib/Kart/Model/Resource.ts" />

module Kart {

    export var VERSION   = 0.01;
    export var AUTHORITY = "cpan:STEVAN";

    export class Error {
        name    : string = "Kart Error";
        message : string;
        reason  : string;

        constructor( msg : string, reason? : string ) {
            this.message = msg;
            this.reason  = reason || msg;
        }

        toString () { return this.message }
    }

}

