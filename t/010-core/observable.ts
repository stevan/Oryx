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


}