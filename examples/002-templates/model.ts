/// <reference path="../../lib/Oryx.ts" />

interface IProduct {
    sku         : string;
    description : string;
    quantity    : number;
    available?  : bool;
}

class Product extends Oryx.Model.Resource {
    constructor ( id : string, body : IProduct ) {
        super( id, body );

        this.bind('update:quantity', ( ) => {
            this.refresh_available( )
        });

        this.refresh_available( )
    }

    refresh_available ( ) {
        var quantity = this.get('quantity');
        if (quantity > 3) {
            this.set({'available': false});
        }
        else {
            this.set({'available': true});
        }
    }
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

    addProduct ( product : Product ): void {
        this.get("products").add(product);
    }
}

