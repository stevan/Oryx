
test("Oryx.UI.Panel - basic", () => {

    var save_person_called = 0;
    var cancel_edit_called = 0;

    var object = {
        save_person : () => { save_person_called++ },
        cancel_edit : () => { cancel_edit_called++ },
    }

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little"
    });

    var $first_name = $("<input type='text' />");
    var $last_name  = $("<input type='text' />");
    var $save       = $("<input type='button' />");
    var $cancel     = $("<input type='button' />");

    var view = new Oryx.UI.Panel({
        data_source : r,
        responder   : object,
        outlets : [
            new Oryx.UI.Textbox ({
                element  : $first_name,
                property : "first_name"
            }),
            new Oryx.UI.Textbox ({
                element  : $last_name,
                property : "last_name"
            })
        ],
        actions : [
            new Oryx.UI.Button ({
                element       : $save,
                event_type    : 'click',
                target_action : 'save_person'
            }),
            new Oryx.UI.Button ({
                element       : $cancel,
                event_type    : 'click',
                target_action : 'cancel_edit'
            })
        ]
    });

    equal($first_name.val(), "Stevan", "... got the right value for the DOM after initial binding");
    equal($last_name.val(), "Little", "... got the right value for the DOM after initial binding");

    $first_name.val("Steve");
    $first_name.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('first_name'), "Steve", "... got the right value for updated resource after changing DOM");

    $last_name.val("Jones");
    $last_name.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('last_name'), "Jones", "... got the right value for updated resource after changing DOM");

    $save.click();
    equal(save_person_called, 1, '... save_person was called');
    $cancel.click();
    equal(cancel_edit_called, 1, '... cancel_edit was called');
});

test("Oryx.UI.Panel - with deferred setup", () => {

    var save_person_called = 0;
    var cancel_edit_called = 0;

    var object = {
        save_person : () => { save_person_called++ },
        cancel_edit : () => { cancel_edit_called++ },
    }

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little"
    });

    var $first_name = $("<input type='text' />");
    var $last_name  = $("<input type='text' />");
    var $save       = $("<input type='button' />");
    var $cancel     = $("<input type='button' />");

    var view = new Oryx.UI.Panel({
        outlets : [
            new Oryx.UI.Textbox ({
                element  : $first_name,
                property : "first_name"
            }),
            new Oryx.UI.Textbox ({
                element  : $last_name,
                property : "last_name"
            })
        ],
        actions : [
            new Oryx.UI.Button ({
                element       : $save,
                event_type    : 'click',
                target_action : 'save_person'
            }),
            new Oryx.UI.Button ({
                element       : $cancel,
                event_type    : 'click',
                target_action : 'cancel_edit'
            })
        ]
    });

    equal($first_name.val(), "", "... got the no value yet");
    equal($last_name.val(), "", "... got the no value yet");

    view.set_data_source( r );

    equal($first_name.val(), "Stevan", "... got the right value for the DOM after initial binding");
    equal($last_name.val(), "Little", "... got the right value for the DOM after initial binding");

    $first_name.val("Steve");
    $first_name.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('first_name'), "Steve", "... got the right value for updated resource after changing DOM");

    $last_name.val("Jones");
    $last_name.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('last_name'), "Jones", "... got the right value for updated resource after changing DOM");

    $save.click();
    equal(save_person_called, 0, '... save_person was not called');
    $cancel.click();
    equal(cancel_edit_called, 0, '... cancel_edit was not called');

    view.set_responder( object );

    $save.click();
    equal(save_person_called, 1, '... save_person was called');
    $cancel.click();
    equal(cancel_edit_called, 1, '... cancel_edit was called');
});




