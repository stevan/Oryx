
test("Oryx.UI.Textarea - basic", () => {

    var r = new Oryx.Model.Resource (null, {
        "textarea_text" : "The quick brown fox jumps over the lazy dog"
    });

    var $input = $("<textarea></textarea>");

    var binding = new Oryx.UI.Textarea ({
        element  : $input,
        target   : r,
        property : "textarea_text"
    });

    equal($input.val(), "The quick brown fox jumps over the lazy dog", "... got the right value for the DOM after initial binding");

    r.set({ textarea_text : "The slow brown fox falls over the lazy dog" });
    equal($input.val(), "The slow brown fox falls over the lazy dog", "... got the right value for the DOM after changing resource");

    $input.val("The fox and the hound");
    $input.trigger('change'); // gotta manually trigger this in the test
    equal(r.get('textarea_text'), "The fox and the hound", "... got the right value for updated resource after changing DOM");

});
