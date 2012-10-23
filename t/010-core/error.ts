class KartErrorTests {
    simplest_err = new Kart.Error("hello");
    simple_err   = new Kart.Error("hello", "I wanted to say hi");

    checkSimplestError ( c: tsUnit.TestContext ) {
        var err    = this.simplest_err;
        var result = err.toString();
        c.areIdentical("hello", result);
        c.areIdentical("Kart Error", err.name);
        c.areIdentical("hello", err.message);
        c.areIdentical("hello", err.reason);
    }

    checkSimpleError ( c: tsUnit.TestContext ) {
        var err    = this.simple_err;
        var result = err.toString();
        c.areIdentical("hello", result);
        c.areIdentical("Kart Error", err.name);
        c.areIdentical("hello", err.message);
        c.areIdentical("I wanted to say hi", err.reason);
    }
}