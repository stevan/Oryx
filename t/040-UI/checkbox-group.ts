
test("Oryx.UI.CheckboxGroup - basic", () => {

    var r = new Oryx.Model.Resource (null, {
        "first_name" : "Stevan",
        "last_name"  : "Little",
        "titles"     : ["programmer","manager"]
    });

    var $doc = $("<div>"
               + "<input type='checkbox' name='title' value='programmer' />"
               + "<input type='checkbox' name='title' value='manager' />"
               + "<input type='checkbox' name='title' value='sysadmin' />"
               + "</div>");

    var binding = new Oryx.UI.CheckboxGroup ({
        element  : $doc.find('input:checkbox'),
        target   : r,
        property : "titles"
    });

    deepEqual(binding.get_element_value(), ["programmer","manager"], "... got the right value for the DOM after initial binding");

    r.set({ titles : ["programmer","sysadmin"] });
    deepEqual(binding.get_element_value(), ["programmer","sysadmin"], "... got the right value for the DOM after changing resource");

    var $manager = $doc.find('input:checkbox[value="manager"]');
    $manager.attr("checked", true);
    $manager.trigger('change'); // gotta manually trigger this in the test
    deepEqual(r.get('titles'), ["programmer","manager","sysadmin"], "... got the right value for updated resource after changing DOM");

});