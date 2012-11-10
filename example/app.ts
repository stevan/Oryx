/// <reference path="../lib/Oryx.ts" />
/// <reference path="../../Rosetta/lib/Rosetta/JQuery.ts" />

interface IPerson {
    first_name : string;
    last_name  : string;
}

class Person extends Oryx.Model.Resource {
    constructor ( id : string, body : IPerson ) { super( id, body ) }
}

class People extends Oryx.Model.Collection {
    public resources : Person[] = [];

    add ( resource : Person ): void { super.add( resource ) }

    set ( index : number, resource : Person ): void {
        super.set( index, resource );
    }
}

class PersonController {

    public current_person : Person;
    public persons = new People();

    public view = Oryx.UI.Panel.inflate({
        outlets : {
            '#first_name' : { type: 'Textbox',  prop: 'first_name' },
            '#last_name'  : { type: 'Textbox',  prop: 'last_name'  }
        },
        actions : {
            '#save'   : { type: 'Button', event: 'click', action: 'save_person' },
            '#cancel' : { type: 'Button', event: 'click', action: 'cancel_edit' }
        }
    });

    public table = new Oryx.UI.DataTable ({
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
        this.current_person = new Person (null, {
            first_name : "",
            last_name  : ""
        });
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


Oryx.ready(
    Rosetta.JQuery.Node,
    () => { var e = new PersonController () }
);

