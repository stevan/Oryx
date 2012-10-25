module Kart {
    export module Binding {
        export interface IOutletTarget extends Kart.Core.IObservable, Kart.Core.ITraversable {}

        export interface IActionTarget {
            [ target : string ] : Function;
        }
    }
}