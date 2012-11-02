
test("Oryx.UI.Checkbox - basic", () => {

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little",
        "is_awesome" : true
    });

    var binding = new Oryx.UI.Checkbox ({
        element  : $("<input type='checkbox'/>"),
        target   : r,
        property : "is_awesome"
    });

    equal(binding.get_element_value(), true, "... got the right value for the DOM after initial binding");

    r.set({ is_awesome : false });
    equal(binding.get_element_value(), false, "... got the right value for the DOM after changing resource");

    binding.element.attr("checked", true);
    binding.element.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('is_awesome'), true, "... got the right value for updated resource after changing DOM");

});