/// <reference path="model.ts" />
/// <reference path="../../shared/jquery.d.ts" />
/// <reference path="../../lib/Oryx.ts" />

class OrderController {
    public order;

    public view = Oryx.UI.Panel.inflate({
        outlets : {
        },
        actions : {
        }
    });

    public table = new Oryx.UI.DataTable ({
        table_body    : 'tbody',
        row_selector  : 'tr',
        binding_spec  : {
        }
    });

    constructor() {
        this.order = new Order(null, {
            name     : "New Order",
            products : new Products(),
        });
        console.log(this.order);
    }

    bind() {
        this.view.set_responder( this );
        // this.table.set_data_source( this.order.get("products") );
    }

}
