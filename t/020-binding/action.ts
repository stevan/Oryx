class KartBindingActionTests {

    checkSimpleBindingAction1 ( c: tsUnit.TestContext ) {
        var object = {
            counter      : 0,
            test_counter : function () { this.counter++ }
        };

        var a = new Kart.Binding.Action ({
            element       : $('<input type="button" />'),
            event_type    : 'click',
            target        : object,
            target_action : 'test_counter'
        });

        a.element.click();
        c.areIdentical( object.counter, 1 );

        a.element.click();
        c.areIdentical( object.counter, 2 );
    }

    checkSimpleBindingAction2 ( c: tsUnit.TestContext ) {
        var object = {
            counter      : 0,
            test_counter : function () { this.counter++ }
        };

        var a = new Kart.Binding.Action ({
            element       : $('<input type="button" />'),
            event_type    : 'click',
            target_action : 'test_counter'
        });

        c.areIdentical( object.counter, 0 );
        a.element.click();
        c.areIdentical( object.counter, 0 );

        a.set_target( object );
        a.element.click();
        c.areIdentical( object.counter, 1 );

        a.clear_target();
        a.element.click();
        c.areIdentical( object.counter, 1 );

        a.set_target( object );
        a.element.click();
        c.areIdentical( object.counter, 2 );
    }

}