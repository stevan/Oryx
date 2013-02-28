
test("Oryx.UI.Select - basic", () => {

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little",
        "relation"   : "uncle"
    });

    var $doc = $("<div><select><option value='uncle'>Uncle</option><option value='aunt'>Aunt</option><option value='cousin'>Cousin</option></select></div>");

    var binding = new Oryx.UI.Select ({
        element  : $doc.find('select'),
        target   : r,
        property : "relation"
    });

    equal(binding.get_element_value(), "uncle", "... got the right value for the DOM after initial binding");

    r.set({ relation : "aunt" });
    equal(binding.get_element_value(), "aunt", "... got the right value for the DOM after changing resource");

    var $cousin = $doc.find('select');
    $cousin.val("cousin");
    $cousin.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('relation'), "cousin", "... got the right value for updated resource after changing DOM");

});
