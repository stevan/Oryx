/*

TODO:
- add tests for pack() and serialize()
- add tests for map()

*/

test( "Kart.Model.Collection - basic", () => {

    var update_event = 0;
    var add_event    = 0;

    var john = new Kart.Model.Resource ({
        "first_name" : "John",
        "last_name"  : "Doe"
    });

    var bob = new Kart.Model.Resource ({
        "first_name" : "Bob",
        "last_name"  : "Smith"
    });

    var c = new Kart.Model.Collection([
        new Kart.Model.Resource ({
            "first_name" : "Stevan",
            "last_name"  : "Little"
        })
    ]);

    // set up some events for testing ...

    c.bind( 'update:0', ( collection, idx, resource ) => {
        ok(true, '... update event has been fired');
        equal( idx, 0, '... the right index' );
        strictEqual( bob, resource, '... the right resource is passed in' );
        update_event++;
    });

    c.bind( 'add', ( collection, idx, resource ) => {
        ok(true, '... add event has been fired');
        equal( idx, 1, '... the right index' );
        strictEqual( john, resource, '... the right resource is passed in' );
        add_event++;
    });

    equal( c.length(), 1, '... the collection has one element in it');

    equal( c.get(0).get("first_name"), "Stevan", '... get() worked as expected' );
    equal( c.get(0).get("last_name"), "Little", '... get() worked as expected' );

    deepEqual( c.pack(), [ { first_name: "Stevan", last_name: "Little"} ], '... the pack() method worked as expected');

    c.add( john );

    equal( c.length(), 2, '... the collection has two elements in it');
    equal( add_event, 1, '... the expected event fired' );

    equal( c.get(1).get("first_name"), "John", '... get() worked as expected' );
    equal( c.get(1).get("last_name"), "Doe", '... get() worked as expected' );

    c.set( 0, bob );

    equal( c.length(), 2, '... the collection (still) has two elements in it');
    equal( update_event, 1, '... the expected event fired' );

    equal( c.get(0).get("first_name"), "Bob", '... get() worked as expected' );
    equal( c.get(0).get("last_name"), "Smith", '... get() worked as expected' );

});
