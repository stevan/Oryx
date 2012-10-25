
test( "Kart.Core.Observable - basic", () => {
    var x = new Kart.Core.Observable ();

    var test = 0;
    var test_event = function () { test++ };

    x.bind( 'test-event', test_event );
    x.trigger( 'test-event' );
    equal( test, 1, '... trigger fired successfully' );

    x.trigger( 'test-event' );
    equal( test, 2, '... trigger fired successfully (again)' );

    x.unbind( 'test-event', test_event );

    x.trigger( 'test-event' );
    equal( test, 2, '... trigger did not fired (correctly, since it was unbound)' );
});


test( "Kart.Core.Observable - basic w/args", () => {

    var x = new Kart.Core.Observable ();

    var data_1 = { value: 0 };
    var data_2 = { value: 0 };

    var test_event = function ( args ) { args.value++ };

    x.bind( 'test-event', test_event );
    x.trigger( 'test-event', data_1 );
    equal( data_1.value, 1, '... trigger fired successfully' );

    x.trigger( 'test-event', data_1 );
    equal( data_1.value, 2, '... trigger fired successfully (again)' );

    x.trigger( 'test-event', data_2 );
    equal( data_1.value, 2, '... trigger did not fire for these args' );
    equal( data_2.value, 1, '... trigger fired successfully (again with different args)' );

    x.unbind( 'test-event', test_event );

    x.trigger( 'test-event', data_1 );
    equal( data_1.value, 2, '... trigger did not fired (correctly, since it was unbound)' );
});
