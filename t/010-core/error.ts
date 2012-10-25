
test( "Kart.Error - basic", () => {

    var err    = new Kart.Error("hello");
    var result = err.toString();
    equal("hello", result, '... go the result of toString we expected');
    equal("Kart Error", err.name, '... got the name we expected');
    equal("hello", err.message, '... got the message we expected');
    equal("hello", err.reason, '...  got the reason we expected');

});

test( "Kart.Error - with reason", () => {

    var err    = new Kart.Error("hello", "I wanted to say hi");
    var result = err.toString();
    equal("hello", result, '... go the result of toString we expected');
    equal("Kart Error", err.name, '... got the name we expected');
    equal("hello", err.message, '... got the message we expected');
    equal("I wanted to say hi", err.reason, '...  got the reason we expected');

});