/// <reference path="../../shared/jquery.d.ts" />
/// <reference path="../../lib/Oryx.ts" />

class OrderController {

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
    }

    bind() {
        this.view.set_responder( this );
        // this.table.set_data_source( this.order.get("products") );
    }

}
