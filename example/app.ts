/// <reference path="../shared/jquery.d.ts" />
/// <reference path="../lib/Oryx.ts" />

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
            'input[name=first_name]' : {
                type      : 'Textbox',
                prop      : 'first_name',
                validator : (value) => { return value.match(/\S/) },
            },
            'input[name=last_name]'  : {
                type      : 'Textbox',
                prop      : 'last_name',
                validator : (value) => { return value.match(/\S/) },
            }
        },
        actions : {
            'button[name=delete]' : { type: 'Button', event: 'click', action: 'delete_person' },

            'button[name=add]'    : { type: 'Button', event: 'click', action: 'add_person', validate_props: '*' },
            'button[name=cancel]' : { type: 'Button', event: 'click', action: 'initialize_new_person' }
        }
    });

    public table = new Oryx.UI.DataTable ({
        keyboard_nav  : true,
        select_by_row : true,
        table_body    : 'tbody',
        row_selector  : 'tr',
        binding_spec  : {
            '.first_name' : 'first_name',
            '.last_name'  : 'last_name'
        }
    });

    constructor() {
        this.view.set_responder( this );
        this.table.set_data_source( this.persons );
        this.initialize_new_person();
    }

    initialize_new_person () {
        this.current_person = new Person (null, {
            first_name : "",
            last_name  : ""
        });
        this.view.set_data_source( this.current_person );
    }

    delete_person ( e ) {
        var index = this.table.index_for_node(e.currentTarget);
        var person = this.persons.get(index);
        this.persons.remove(index);

        console.log( "Good bye, " + person.get('first_name') );
        console.log( "Please don't leave me " + (this.persons.map((p) => { return p.get('first_name') } ).join(", ")));
    }

    add_person ( e ) {
        var p = this.current_person;
        this.persons.add( p );
        this.initialize_new_person();

        console.log( "Hello " + (this.persons.map((p) => { return p.get('first_name') } ).join(", ")));
    }
}

$(document).ready(function () {
    var e = new PersonController ();
});
