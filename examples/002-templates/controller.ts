/// <reference path="model.ts" />
/// <reference path="handlebars.d.ts" />
/// <reference path="../../shared/jquery.d.ts" />
/// <reference path="../../lib/Oryx.ts" />

class OrderController {
    public order : Order;
    public templates : any;

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
        this.templates = {};

        this.order = new Order(null, {
            name     : "New Order",
            products : new Products(),
        });
    }

    extract_templates() {
        this.templates.sku         = Handlebars.compile($("#sku-template").html());
        this.templates.description = Handlebars.compile($("#description-template").html());
        this.templates.quantity    = Handlebars.compile($("#quantity-template").html());
        this.templates.available   = Handlebars.compile($("#available-template").html());
    }

    bind() {
        this.extract_templates();
        this.view.set_responder( this );
        this.table.set_data_source( this.order.get("products") );
    }
}
