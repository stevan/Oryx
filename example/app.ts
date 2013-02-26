/// <reference path="../shared/jquery.d.ts" />
/// <reference path="../shared/jquery.js" />
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
    public idSerial : any = 0;

    public view = Oryx.UI.Panel.inflate({
        outlets : {
            '#first_name' : {
                type      : 'Textbox',
                prop      : 'first_name',
                validator : function (value) { return value !== "" },
            },
            '#last_name'  : {
                type      : 'Textbox',
                prop      : 'last_name',
                validator : function (value) { return value !== "" },
            }
        },
        actions : {
            '.delete' : { type: 'Button', event: 'click', action: 'delete_person' },

            '#cancel' : { type: 'Button', event: 'click', action: 'cancel_edit' },

            '#add' : {
                type      : 'Button',
                event     : 'click',
                action    : 'add_person',
                validator : function (source) {
                    return source.validate_add_person();
                },
            },
        }
    });

    public table = new Oryx.UI.DataTable ({
        keyboard_nav  : true,
        select_by_row : true,
        table_body    : 'table tbody',
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
        this.idSerial += 1;

        this.current_person = new Person (this.idSerial, {
            first_name : "",
            last_name  : ""
        });
        this.view.set_data_source( this.current_person );
    }

    delete_person ( e ) {
        var index = this.table.index_for_node(e.currentTarget);
        this.persons.remove(index);
    }

    validate_add_person ( ) {
        var p = this.current_person,
            is_valid = true;

        if (!p.get('first_name')) {
            is_valid = false;
            jQuery('#first_name').closest('.control-group').addClass('error');
        }

        if (!p.get('last_name')) {
            is_valid = false;
            jQuery('#last_name').closest('.control-group').addClass('error');
        }

        return is_valid;
    }

    add_person ( e ) {
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
    var e = new PersonController ();
});
