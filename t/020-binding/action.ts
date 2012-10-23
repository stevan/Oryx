class KartBindingActionTests {

    checkSimpleBindingAction ( c: tsUnit.TestContext ) {
        var object = {
            counter      : 0,
            test_counter : function () { this.counter++ }
        };

        var a = new Kart.Binding.Action (
            $('<input type="button" />'),
            'click',
            object,
            'test_counter'
        );

        a.element.click();
        c.areIdentical( object.counter, 1 );
    }

}