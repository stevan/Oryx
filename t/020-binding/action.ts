test("Oryx.Binding.Action - basic", () => {
    var object = {
        counter      : 0,
        test_counter : function () { this.counter++ }
    };

    var a = new Oryx.Binding.Action ({
        element       : $('<input type="button" />'),
        event_type    : 'click',
        target        : object,
        target_action : 'test_counter'
    });

    a.element.click();
    equal( object.counter, 1, '... counter incremented correctly' );

    a.element.click();
    equal( object.counter, 2, '... counter incremented correctly (again)' );
});

test("Oryx.Binding.Outlet - clearing and setting targets", () => {
    var object = {
        counter      : 0,
        test_counter : function () { this.counter++ }
    };

    var a = new Oryx.Binding.Action ({
        element       : $('<input type="button" />'),
        event_type    : 'click',
        target_action : 'test_counter'
    });

    equal( object.counter, 0, '... initial counter value is good' );
    a.element.click();
    equal( object.counter, 0, '... counter did not increment because target it not bound' );

    a.set_target( object );
    a.element.click();
    equal( object.counter, 1, '... counter incremented correctly' );

    a.clear_target();
    a.element.click();
    equal( object.counter, 1, '... counter did not incremented because target was cleared' );

    a.set_target( object );
    a.element.click();
    equal( object.counter, 2, '... counter incremented correctly (target re-bound)' );
});

class Counter {
    counter = 0;
    test_counter () { this.counter++ }
}

test("Oryx.Binding.Action - with object", () => {

    var object = new Counter ();

    var a = new Oryx.Binding.Action ({
        element       : $('<input type="button" />'),
        event_type    : 'click',
        target        : object,
        target_action : 'test_counter'
    });

    a.element.click();
    equal( object.counter, 1, '... counter incremented correctly' );

    a.element.click();
    equal( object.counter, 2, '... counter incremented correctly (again)' );
});
