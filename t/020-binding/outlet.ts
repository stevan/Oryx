class KartBindingOutletTests {

    checkSimpleBindingOutlet1 ( c: tsUnit.TestContext ) {
        var r = new Kart.Model.Resource ({
            "first_name" : "Stevan",
            "last_name"  : "Little"
        });

        var $input = $("<input type='text'/>");

        var binding = new Kart.Binding.Outlet ({
            element  : $input,
            target   : r,
            property : "first_name"
        });

        c.areIdentical( $input.val(), "Stevan" );

        r.set({ first_name : "Steve" });
        c.areIdentical( $input.val(), "Steve" );

        $input.val( "Scott" );
        $input.trigger( 'change' ); // gotta manually trigger this in the test
        c.areIdentical( r.get('first_name'), "Scott" );

    }

}