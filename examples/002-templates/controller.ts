/// <reference path="model.ts" />
/// <reference path="handlebars.d.ts" />
/// <reference path="../../shared/jquery.d.ts" />
/// <reference path="../../lib/Oryx.ts" />

class OrderController {
    public current_product : Product;
    public order : Order;
    public view;
    public table;
    public templates : any;

    initialize_view() {
        return Oryx.UI.Panel.inflate({
            outlets : {
                'input[name=sku]' : {
                    type : 'Textbox',
                    prop : 'sku',
                },
                'input[name=description]' : {
                    type : 'Textbox',
                    prop : 'description',
                },
                'input[name=quantity]' : {
                    type : 'Textbox',
                    prop : 'quantity',
                },
            },
            actions : {
            }
        });
    }

    initialize_table() {
        return new Oryx.UI.DataTable({
            table_body    : 'tbody',
            row_selector  : 'tr',
            binding_spec  : {
                '.sku'         : this.renderer_for('sku'),
                '.description' : this.renderer_for('description'),
                '.quantity'    : this.renderer_for('quantity'),
                '.available'   : this.renderer_for('available'),
            }
        });
    }

    constructor() {
        this.templates = {};

        this.order = new Order(null, {
            name     : "New Order",
            products : new Products(),
        });

        this.table = this.initialize_table();
        this.view  = this.initialize_view();

        this.initialize_new_product();
    }

    initialize_new_product () {
        this.current_product = new Product (null, {
            sku: "",
            description: "",
            quantity: 0,
        });
        this.view.set_data_source( this.current_product );
    }

    renderer_for (prop : string) {
        var templates = this.templates;
        return function (node, product) {
            var content = templates[prop](product.pack());
            node.html(content);
        }
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
