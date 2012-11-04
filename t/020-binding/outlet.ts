
test("Oryx.Binding.Outlet - basic", () => {

    (function () {
        var r = new Oryx.Model.Resource (null, {
            "first_name" : "Stevan",
            "last_name"  : "Little"
        });

        var $input = Oryx.RosettaNode.create("<input type='text'/>");

        var binding = new Oryx.Binding.Outlet ({
            element  : $input,
            target   : r,
            property : "first_name"
        });

        equal($input.val(), "Stevan", "... got the right value for the DOM after initial binding");

        r.set({ first_name : "Steve" });
        equal($input.val(), "Steve", "... got the right value for the DOM after changing resource");

        $input.val("Scott");
        $input.trigger('change'); // gotta manually trigger this in the test
        equal(r.get('first_name'), "Scott", "... got the right value for updated resource after changing DOM");
    })();


    (function () {
        var r = new Oryx.Model.Resource (null, {
            "first_name" : "Stevan",
            "last_name"  : "Little"
        });

        var $input = Oryx.RosettaNode.create("<input type='text'/>");

        var binding = new Oryx.Binding.Outlet ({
            element  : $input,
            target   : r,
            property : "first_name"
        });

        equal(binding.$element.val(), "Stevan", "... got the right value for the DOM after initial binding");

        r.set({ first_name : "Steve" });
        equal(binding.$element.val(), "Steve", "... got the right value for the DOM after changing resource");

        binding.$element.val("Scott");
        binding.$element.trigger('change'); // gotta manually trigger this in the test
        equal(r.get('first_name'), "Scott", "... got the right value for updated resource after changing DOM");
    })();

});

test("Oryx.Binding.Outlet - changing targets", () => {

    (function () {
        var r = new Oryx.Model.Resource (null, {
            "first_name" : "Stevan",
            "last_name"  : "Little"
        });

        var $input = Oryx.RosettaNode.create("<input type='text'/>");

        var binding = new Oryx.Binding.Outlet ({
            element  : $input,
            property : "first_name"
        });

        equal(binding.$element.val(), "", "... got the right value for the DOM before initial binding");

        binding.set_target( r );

        equal(binding.$element.val(), "Stevan", "... got the right value for the DOM after initial binding");

        binding.unregister_target_event();
        r.set({ first_name : "Steve" });

        equal(binding.$element.val(), "Stevan", "... got the right value for the DOM because we unbound the binding");

        binding.register_target_event();
        binding.refresh();

        equal(binding.$element.val(), "Steve", "... got the right value for the DOM because we rebound the binding and refreshed");

        binding.$element.val("Scott");
        binding.$element.trigger('change'); // gotta manually trigger this in the test
        equal(r.get('first_name'), "Scott", "... got the right value for updated resource after changing DOM");
    })();

});

test("Oryx.Binding.Outlet - with formatter", () => {

    (function () {
        var r = new Oryx.Model.Resource (null, {
            "first_name" : "Stevan",
            "last_name"  : "Little",
            "age"        : 37
        });

        var $input = Oryx.RosettaNode.create("<input type='text'/>");

        var binding = new Oryx.Binding.Outlet ({
            element     : $input,
            target      : r,
            property    : "age",
            transformer : ( age ) => { return parseInt( age ) }
        });

        binding.$element.val("100");
        binding.$element.trigger('change'); // gotta manually trigger this in the test
        ok(r.get('age') === 100, "... got the right value for updated resource after changing DOM and applying tranformer");
    })();

});

test("Oryx.Binding.Outlet - with deep property", () => {

    (function () {
        var r = new Oryx.Model.Resource (null, {
            "name" : {
                "first" : "Stevan",
                "last"  : "Little",
            }
        });

        var $input = Oryx.RosettaNode.create("<input type='text'/>");

        var binding = new Oryx.Binding.Outlet ({
            element     : $input,
            target      : r,
            property    : "name.first",
        });

        equal(binding.$element.val(), "Stevan", "... got the right value for the DOM after initial binding and deep accessor");

        r.set({ "name.first" : "Steve" });
        equal(binding.$element.val(), "Steve", "... got the right value for the DOM after changing resource with deep accessor");

        binding.$element.val("Scott");
        binding.$element.trigger('change'); // gotta manually trigger this in the test
        equal(r.get('name.first'), "Scott", "... got the right value for updated resource after changing DOM and deep accessor");
    })();

});
