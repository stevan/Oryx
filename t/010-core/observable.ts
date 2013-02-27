
test( "Oryx.Core.Observable - basic", () => {
    var x = new Oryx.Core.Observable ();

    var test = 0;
    var test_event = function () { test++ };

    x.bind( 'test-event', test_event );
    x.fire( 'test-event' );
    equal( test, 1, '... test-event fired successfully' );

    x.fire( 'test-event' );
    equal( test, 2, '... test-event fired successfully (again)' );

    x.unbind( 'test-event', test_event );

    x.fire( 'test-event' );
    equal( test, 2, '... test-event did not fired (correctly, since it was unbound)' );
});


test( "Oryx.Core.Observable - basic w/args", () => {

    var x = new Oryx.Core.Observable ();

    var data_1 = { value: 0 };
    var data_2 = { value: 0 };

    var test_event = function ( args ) { args.value++ };

    x.bind( 'test-event', test_event );
    x.fire( 'test-event', data_1 );
    equal( data_1.value, 1, '... test-event fired successfully' );

    x.fire( 'test-event', data_1 );
    equal( data_1.value, 2, '... test-event fired successfully (again)' );

    x.fire( 'test-event', data_2 );
    equal( data_1.value, 2, '... test-event did not fire for these args' );
    equal( data_2.value, 1, '... test-event fired successfully (again with different args)' );

    x.unbind( 'test-event', test_event );

    x.fire( 'test-event', data_1 );
    equal( data_1.value, 2, '... test-event did not fired (correctly, since it was unbound)' );
});
