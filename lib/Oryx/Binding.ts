module Oryx {
    export module Binding {
        export interface IOutletTarget extends Oryx.Core.IObservable, Oryx.Core.ITraversable {}

        export interface IActionTarget {
            [ target : string ] : Function;
        }
    }
}