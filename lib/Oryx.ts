/// <reference path="../../Rosetta/lib/Rosetta.ts" />

/// <reference path="../lib/Oryx/Error.ts" />

/// <reference path="../lib/Oryx/Util.ts" />
/// <reference path="../lib/Oryx/Util/DOM.ts" />

/// <reference path="../lib/Oryx/Core.ts" />
/// <reference path="../lib/Oryx/Core/Observable.ts" />
/// <reference path="../lib/Oryx/Core/Traversable.ts" />

/// <reference path="../lib/Oryx/Binding.ts" />
/// <reference path="../lib/Oryx/Binding/Action.ts" />
/// <reference path="../lib/Oryx/Binding/Outlet.ts" />

/// <reference path="../lib/Oryx/Model.ts" />
/// <reference path="../lib/Oryx/Model/Serializer/Json.ts" />
/// <reference path="../lib/Oryx/Model/Resource.ts" />
/// <reference path="../lib/Oryx/Model/Collection.ts" />

/// <reference path="../lib/Oryx/UI.ts" />
/// <reference path="../lib/Oryx/UI/Panel.ts" />
/// <reference path="../lib/Oryx/UI/DataTable.ts" />

module Oryx {
    export var VERSION   = 0.01;
    export var AUTHORITY = "cpan:STEVAN";

    export var RosettaNode : Rosetta.INodeStatic;

    export function ready ( Node : Rosetta.INodeStatic, callback : () => void ) {
        RosettaNode = Node;
        Node.ready( callback );
    }
}

