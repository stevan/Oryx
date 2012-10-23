class KartObservableTests {

    checkSimpleObservable ( c: tsUnit.TestContext ) {
        var x = new Kart.Client.Observable ();

        var test;
        x.bind( 'test-event', function () { test = "hi" } );

        x.trigger( 'test-event' );

        c.areIdentical( test, "hi" );
    }


}