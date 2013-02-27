test( "Oryx.Core.Traversable - basic", () => {

    var t = Oryx.Core.Traversable;
    var p = {};

    t.traverse_path_and_set( 'x', p, 1 );
    equal( p['x'], 1, '... got the expected value (introspecting the object directly)' );
    equal( t.traverse_path_and_get( 'x', p ), 1, '... got the expected value (introspecting the object via traverable)' );

    t.traverse_path_and_set( 'y.x', p, "HELLO" );
    equal( p['y']['x'], "HELLO", '... got the expected value (introspecting the object directly)' );
    equal( t.traverse_path_and_get( 'y.x', p ), "HELLO", '... got the expected value (introspecting the object via traverable)' );

});
