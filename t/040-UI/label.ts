
test("Oryx.UI.Label - basic", () => {

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little"
    });

    var $doc   = $("<div><span class='name'></span><input type='text'/></div>");
    var $input = $doc.find('input');
    var $label = $doc.find('.name');

    var b1 = new Oryx.Binding.Outlet ({
        element  : $input,
        target   : r,
        property : "first_name"
    });

    var b2 = new Oryx.UI.Label ({
        element  : $label,
        target   : r,
        property : "first_name"
    });

    equal($input.val(), "Stevan", "... got the right value for the DOM after initial binding");
    equal($label.text(), "Stevan", "... got the right value for the DOM after initial binding");

    r.set({ first_name : "Steve" });
    equal($input.val(), "Steve", "... got the right value for the DOM after changing resource");
    equal($label.text(), "Steve", "... got the right value for the DOM after changing resource");

    $input.val("Scott");
    $input.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('first_name'), "Scott", "... got the right value for updated resource after changing DOM");
    equal($label.text(), "Scott", "... got the right value for updated resource after changing DOM");

});
