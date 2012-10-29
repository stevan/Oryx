/*

TODO:
- add tests for pack and serialize

*/

test( "Kart.Model.Resource - basic", () => {

    var update_event                   = 0;
    var update_first_name_event        = 0;
    var update_first_name_second_event = 0;

    var r = new Kart.Model.Resource ({
        "first_name" : "Stevan",
        "last_name"  : "Little"
    });

    equal( r.get("first_name"), "Stevan", '... get() worked as expected' );
    equal( r.get("last_name"), "Little", '... get() worked as expected' );

    r.bind( 'update', ( resource, updates ) => {
        ok(true, '... update event has been fired');
        strictEqual( r, resource, '... the same resource is passed in' );
        update_event++;
    });

    r.bind('update:first_name', ( resource, value ) => {
        ok(true, '... first name has been changed correctly');
        strictEqual( r, resource, '... the same resource is passed in' );
        update_first_name_event++;
    });

    r.set({ 'first_name' : 'Steve' });
    equal( r.get("first_name"), "Steve", '... the resource has been changed by set()' );
    equal( update_event, 1, '... the expected event(0) fired' );
    equal( update_first_name_event, 1, '... the expected event(1) fired' );

    r.bind('update:first_name', ( resource, value ) => {
        ok(true, '... the second event fires as well');
        strictEqual( r, resource, '... the same resource is passed in' );
        update_first_name_second_event++;
    });

    r.set({ 'first_name' : 'Steve' });
    equal( r.get("first_name"), "Steve", '... the resource has been changed by set()' );
    equal( update_event, 2, '... the expected event(0) fired twice' );
    equal( update_first_name_event, 2, '... the expected event(1) fired twice' );
    equal( update_first_name_second_event, 1, '... the expected event(2) fired' );

    r.set({ 'last_name' : 'Little Jr.' });
    equal( r.get("last_name"), "Little Jr.", '... the resource has been changed by set()' );
    equal( update_event, 3, '... the expected event(0) fired for a third time' );
    equal( update_first_name_event, 2, '... the expected event(1) did not fire (correctly)' );
    equal( update_first_name_second_event, 1, '... the expected event(2) did not fire (correctly)' );

    r.set({
        'first_name' : 'Stevan',
        'last_name'  : 'Little'
    });

    equal( r.get("first_name"), "Stevan", '... the resource has been changed by bulk set()' );
    equal( r.get("last_name"), "Little", '... the resource has been changed by bulk set()' );
    equal( update_event, 4, '... the expected event(0) fired for the fourth time' );
    equal( update_first_name_event, 3, '... the expected event(1) fired for the third time' );
    equal( update_first_name_second_event, 2, '... the expected event(2) fired for the second time' );
});


test( "Kart.Model.Resource - deep accessor test", () => {

    var r = new Kart.Model.Resource ({
        "name" : {
            "first"  : "Stevan",
            "middle" : "Calvert",
            "last"   : "Little"
        },
        "height" : { "units" : "inches", "value" : "68" },
        "computers" : [
            "iPad", 'Macbook', 'NeXT Slab'
        ],
        "books" : [
            { "title" : "REST in Practice" },
            { "title" : "Art out of time" }
        ]
    });

    equal(r.get('name.first'), "Stevan", '... got the right value for name.first');

    r.set({ 'name.first' : 'Steve' });
    equal(r.get('name.first'), "Steve", '... got the updated value for name.first');

    r.set({ 'age.years' : 37 });
    equal(r.get('age.years'), 37, '... got the autovivified value for age.years');

    r.set({ 'age.months' : 4 });
    equal(r.get('age.months'), 4, '... got the autovivified value for age.months');

    var update_age_months_event = 0;
    r.bind('update:age.months', (self, value) => {
        ok(true, '... age.months has been changed correctly');
        equal(value, 5, '... age.months has been passed to the event correctly');
        ok(self === r, '... passed in our self');
        update_age_months_event++;
    });

    r.set({ 'age.months' : 5 });
    equal(r.get('age.months'), 5, '... got the value for age.months');
    equal(update_age_months_event, 1, '... our event fired');

    r.set({ 'computers.1' : 'MacBook' });
    equal(r.get('computers.1'), "MacBook", '... got the updated value for computer.1');

    r.set({ 'computers.3' : 'Android' });
    equal(r.get('computers.3'), "Android", '... got the updated value for computer.3');

    equal(r.get('books.0.title'), "REST in Practice", '... got the value for books.0.title');

    r.set({ 'books.1.title' : 'MongoDB : The definitive guide' });
    equal(r.get('books.1.title'), "MongoDB : The definitive guide", '... got the updated value for books.1.title');

});

