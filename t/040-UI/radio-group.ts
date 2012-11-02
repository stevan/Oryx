
test("Oryx.UI.RadioGroup - basic", () => {

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little",
        "sex"        : "male"
    });

    var $doc = $("<div><input type='radio' name='sex' value='male' /><input type='radio' name='sex' value='female' /></div>");

    var binding = new Oryx.UI.RadioGroup ({
        element  : $doc.find('input:radio'),
        target   : r,
        property : "sex"
    });

    equal(binding.get_element_value(), "male", "... got the right value for the DOM after initial binding");

    r.set({ sex : "female" });
    equal(binding.get_element_value(), "female", "... got the right value for the DOM after changing resource");

    var $male = $doc.find('input:radio[value="male"]');
    $male.attr("checked", true);
    $male.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('sex'), "male", "... got the right value for updated resource after changing DOM");

});