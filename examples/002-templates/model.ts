/// <reference path="../../lib/Oryx.ts" />

interface IProduct {
    sku         : string;
    description : string;
    quantity    : number;
}

class Product extends Oryx.Model.Resource {
    constructor ( id : string, body : IProduct ) { super( id, body ) }
}

class Products extends Oryx.Model.Collection {
    public resources : Product[] = [];

    add ( resource : Product ): void { super.add( resource ) }

    set ( index : number, resource : Product ): void {
        super.set( index, resource );
    }
}

interface IOrder {
    name     : string;
    products : Products;
}

class Order extends Oryx.Model.Resource {
    constructor ( id : string, body : IOrder ) { super( id, body ) }
}

