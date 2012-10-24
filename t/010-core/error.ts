class KartErrorTests {
    checkSimplestError ( c: tsUnit.TestContext ) {
        var err    = new Kart.Error("hello");
        var result = err.toString();
        c.areIdentical("hello", result);
        c.areIdentical("Kart Error", err.name);
        c.areIdentical("hello", err.message);
        c.areIdentical("hello", err.reason);
    }

    checkSimpleError ( c: tsUnit.TestContext ) {
        var err    = new Kart.Error("hello", "I wanted to say hi");
        var result = err.toString();
        c.areIdentical("hello", result);
        c.areIdentical("Kart Error", err.name);
        c.areIdentical("hello", err.message);
        c.areIdentical("I wanted to say hi", err.reason);
    }
}