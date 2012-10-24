class KartResourceTests {

    checkSimpleResource ( c: tsUnit.TestContext ) {

        var update_event                   = 0;
        var update_first_name_event        = 0;
        var update_first_name_second_event = 0;

        var r = new Kart.Model.Resource ({
            "first_name" : "Stevan",
            "last_name"  : "Little"
        });

        c.areIdentical( r.get("first_name"), "Stevan" );
        c.areIdentical( r.get("last_name"), "Little" );

        r.bind( 'update', ( resource, updates ) => {
            c.areIdentical( r, resource );
            update_event++;
        });

        r.bind('update:first_name', ( resource, value ) => {
            c.areIdentical( r, resource );
            update_first_name_event++;
        });

        r.set({ 'first_name' : 'Steve' });
        c.areIdentical( r.get("first_name"), "Steve" );
        c.areIdentical( update_event, 1 );
        c.areIdentical( update_first_name_event, 1 );

        r.bind('update:first_name', ( resource, value ) => {
            c.areIdentical( r, resource );
            update_first_name_second_event++;
        });

        r.set({ 'first_name' : 'Steve' });
        c.areIdentical( r.get("first_name"), "Steve" );
        c.areIdentical( update_event, 2 );
        c.areIdentical( update_first_name_event, 2 );
        c.areIdentical( update_first_name_second_event, 1 );

        r.set({ 'last_name' : 'Little Jr.' });
        c.areIdentical( r.get("last_name"), "Little Jr." );
        c.areIdentical( update_event, 3 );
        c.areIdentical( update_first_name_event, 2 );
        c.areIdentical( update_first_name_second_event, 1 );

        r.set({
            'first_name' : 'Stevan',
            'last_name'  : 'Little'
        });

        c.areIdentical( r.get("first_name"), "Stevan" );
        c.areIdentical( r.get("last_name"), "Little" );
        c.areIdentical( update_event, 4 );
        c.areIdentical( update_first_name_event, 3 );
        c.areIdentical( update_first_name_second_event, 2 );
    }

}