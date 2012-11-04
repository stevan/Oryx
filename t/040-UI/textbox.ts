
test("Oryx.UI.Textbox - basic", () => {

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little"
    });

    var $input = Oryx.RosettaNode.create("<input type='text'/>");

    var binding = new Oryx.UI.Textbox ({
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

});
