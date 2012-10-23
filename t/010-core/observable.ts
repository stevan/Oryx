class KartObservableTests {

    checkSimpleObservable ( c: tsUnit.TestContext ) {
        var x = new Kart.Core.Observable ();

        var test = 0;
        var test_event = function () { test++ };

        x.bind( 'test-event', test_event );
        x.trigger( 'test-event' );
        c.areIdentical( test, 1 );

        x.trigger( 'test-event' );
        c.areIdentical( test, 2 );

        x.unbind( 'test-event', test_event );

        x.trigger( 'test-event' );
        c.areIdentical( test, 2 );
    }


    checkSimpleObservableWithArgs ( c: tsUnit.TestContext ) {
        var x = new Kart.Core.Observable ();

        var data_1 = { value: 0 };
        var data_2 = { value: 0 };

        var test_event = function ( args ) { args.value++ };

        x.bind( 'test-event', test_event );
        x.trigger( 'test-event', data_1 );
        c.areIdentical( data_1.value, 1 );

        x.trigger( 'test-event', data_1 );
        c.areIdentical( data_1.value, 2 );

        x.unbind( 'test-event', test_event );

        x.trigger( 'test-event', data_1 );
        c.areIdentical( data_1.value, 2 );
    }

}