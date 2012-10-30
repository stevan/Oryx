/// <reference path="../shared/jquery.d.ts" />
/// <reference path="../shared/jquery.js" />
/// <reference path="../lib/Kart.ts" />

class Example {

    public current_person : Kart.Model.Resource;
    public persons = new Kart.Model.Collection();

    public view = Kart.UI.Panel.inflate({
        outlets : {
            '#first_name' : { type: 'Textbox',  prop: 'first_name' },
            '#last_name'  : { type: 'Textbox',  prop: 'last_name'  }
        },
        actions : {
            '#save'   : { type: 'Button', event: 'click', action: 'save_person' },
            '#cancel' : { type: 'Button', event: 'click', action: 'cancel_edit' }
        }
    });

    public table = new Kart.UI.DataTable ({
        keyboard_nav  : true,
        select_by_row : true,
        table_body    : '#table_view tbody',
        row_selector  : 'tr',
        binding_spec  : {
            '.first_name' : 'first_name',
            '.last_name'  : 'last_name'
        }
    });

    constructor() {
        this.view.set_responder( this );
        this.table.set_data_source( this.persons );
        this.initialize_new_resource();
    }

    private initialize_new_resource () {
        this.current_person = new Kart.Model.Resource({});
        this.view.set_data_source( this.current_person );
    }

    save_person ( e ) {
        var p = this.current_person;
        this.persons.add( p );
        this.initialize_new_resource();
        console.log( this.persons );
    }

    cancel_edit ( e ) {
        this.current_person.set({ first_name : "", last_name : "" })
    }
}

$(document).ready(function () {
    var e = new Example ();
});
