/// <reference path="../shared/jquery.d.ts" />
/// <reference path="../shared/jquery.js" />
/// <reference path="../lib/Kart.ts" />

class Example {

    public persons        : Kart.Model.Resource[] = [];
    public current_person : Kart.Model.Resource;

    public view = new Kart.UI.View({
        outlets : [
            new Kart.UI.Textbox ({
                element  : $('#first_name'),
                property : "first_name"
            }),
            new Kart.UI.Textbox ({
                element  : $('#last_name'),
                property : "last_name"
            })
        ],
        actions : [
            new Kart.UI.Button ({
                element       : $('#save'),
                event_type    : 'click',
                target_action : 'save_person'
            }),
            new Kart.UI.Button ({
                element       : $('#cancel'),
                event_type    : 'click',
                target_action : 'cancel_edit'
            })
        ]
    });

    constructor() {
        this.view.set_responder( this );
        this.initialize_new_resource();
    }

    private initialize_new_resource () {
        this.current_person = new Kart.Model.Resource({});
        this.view.set_data_source( this.current_person );
    }

    save_person ( e ) {
        var p = this.current_person;
        this.persons.push( p );
        this.initialize_new_resource();
        $('#output').append( '<div>' + p.serialize( new Kart.Model.Serializer.Json () ) + '</div>' );
        console.log( this.persons );
    }

    cancel_edit ( e ) {
        this.current_person.set({ first_name : "", last_name : "" })
    }
}

$(document).ready(function () {
    var e = new Example ();
});
