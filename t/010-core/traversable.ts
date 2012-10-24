class KartTraversableTests {

    public t = Kart.Core.Traversable;
    public p = {};

    checkSimpleTraversable ( c: tsUnit.TestContext ) {
        this.t.traverse_path_and_set( 'x', this.p, 1 );
        c.areIdentical( this.p['x'], 1 );
        c.areIdentical( this.t.traverse_path_and_get( 'x', this.p ), 1 );
    }

    checkDeepTraversable ( c: tsUnit.TestContext ) {
        this.t.traverse_path_and_set( 'y.x', this.p, "HELLO" );
        c.areIdentical( this.p['y']['x'], "HELLO" );
        c.areIdentical( this.t.traverse_path_and_get( 'y.x', this.p ), "HELLO" );
    }

}