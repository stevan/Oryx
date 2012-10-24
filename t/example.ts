/// <reference path="../shared/jquery.d.ts" />
/// <reference path="../shared/jquery.js" />
/// <reference path="../lib/Kart.ts" />

class Example {

    public persons        : Kart.Model.Resource[] = [];
    public current_person : Kart.Model.Resource;

    public actions = {
        save : new Kart.Binding.Action ({
            element       : $('#save'),
            event_type    : 'click',
            target_action : 'save_person'
        }),
        cancel : new Kart.Binding.Action ({
            element       : $('#cancel'),
            event_type    : 'click',
            target_action : 'cancel_edit'
        })
    };

    public outlets = {
        first_name : new Kart.Binding.Outlet ({
            element  : $('#first_name'),
            property : "first_name"
        }),
        last_name : new Kart.Binding.Outlet ({
            element  : $('#last_name'),
            property : "last_name"
        })
    };

    constructor() {
        this.initialize_new_resource();
        this.bind_actions( this );
    }

    private initialize_new_resource () {
        this.current_person = this.new_resource();
        this.bind_outlets( this.current_person );
    }

    private new_resource () { return new Kart.Model.Resource({}) }

    private bind_outlets ( target ) {
        for ( var o in this.outlets ) {
            this.outlets[ o ].set_target( target );
        }
    }

    private bind_actions ( target ) {
        for ( var a in this.actions ) {
            this.actions[ a ].set_target( target );
        }
    }

    save_person ( e ) {
        var p = this.current_person;
        this.persons.push( p );
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
