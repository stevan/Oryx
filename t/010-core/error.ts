
test( "Oryx.Error - basic", () => {

    var err    = new Oryx.Error("hello");
    var result = err.toString();
    equal("hello", result, '... go the result of toString we expected');
    equal("Oryx Error", err.name, '... got the name we expected');
    equal("hello", err.message, '... got the message we expected');
    equal("hello", err.reason, '...  got the reason we expected');

});

test( "Oryx.Error - with reason", () => {

    var err    = new Oryx.Error("hello", "I wanted to say hi");
    var result = err.toString();
    equal("hello", result, '... go the result of toString we expected');
    equal("Oryx Error", err.name, '... got the name we expected');
    equal("hello", err.message, '... got the message we expected');
    equal("I wanted to say hi", err.reason, '...  got the reason we expected');

});