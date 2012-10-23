class KartTraversableTests {

    checkSimpleTraversable ( c: tsUnit.TestContext ) {
        var t = new Kart.Core.Traversable ();

        var p = {};
        t.traverse_path_and_set( 'x', p, 1 );

        c.areIdentical( p['x'], 1 );
        c.areIdentical( t.traverse_path_and_get( 'x', p ), 1 );

        t.traverse_path_and_set( 'y.x', p, "HELLO" );
        c.areIdentical( p['y']['x'], "HELLO" );
        c.areIdentical( t.traverse_path_and_get( 'y.x', p ), "HELLO" );
    }

}