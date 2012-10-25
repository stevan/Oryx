/*

This tests demostrates using a cloure for
handling deep navigation in an object. This
has one issue in that the closure must be
a property on the object and not a method.
When it is a method, it will not work
correctly.

*/

var traverser = Kart.Core.Traversable;
class MyTarget extends Kart.Core.Observable implements Kart.Binding.IOutletTarget {
    public first_name = "Stevan";
    public chain;

    constructor() {
        super();
        this.chain = () => { return this };
    }

    get ( name ) {
        return traverser.traverse_path_and_get( name, this );
    }

    set ( args ) {
        for (var k in args) {
            traverser.traverse_path_and_set( k, this, args[k] );
            this.trigger('update:' + k, this, args[k]);
        }
        return this;
    }
}

test("Kart.Binding.Outlet - with deep chaining", () => {

    (function () {
        var c = new MyTarget();

        var $input = $("<input type='text'/>");

        var binding = new Kart.Binding.Outlet ({
            element  : $input,
            target   : c,
            property : "first_name"
        });

        equal($input.val(), "Stevan", "... got the right value for the DOM after initial binding");

        c.set({"first_name" : "Steve"});
        equal(c.get('first_name'), "Steve", "... got the right value for updated resource");
        equal($input.val(), "Steve", "... got the right value for the DOM after changing resource");

        $input.val("Scott");
        $input.trigger('change'); // gotta manually trigger this in the test
        equal(c.get('first_name'), "Scott", "... got the right value for updated resource after changing DOM");
    })();

    (function () {
        var c = new MyTarget();

        var $input = $("<input type='text'/>");

        var binding = new Kart.Binding.Outlet ({
            element  : $input,
            target   : c,
            property : "chain.first_name"
        });

        equal($input.val(), "Stevan", "... got the right value for the DOM after initial binding");

        c.set({"chain.first_name" : "Steve"});
        equal(c.get('chain.first_name'), "Steve", "... got the right value for updated resource");
        equal($input.val(), "Steve", "... got the right value for the DOM after changing resource");

        $input.val("Scott");
        $input.trigger('change'); // gotta manually trigger this in the test
        equal(c.get('chain.first_name'), "Scott", "... got the right value for updated resource after changing DOM");
    })();

    (function () {
        var c = new MyTarget();

        var $input = $("<input type='text'/>");

        var binding = new Kart.Binding.Outlet ({
            element  : $input,
            target   : c,
            property : "chain.chain.chain.chain.first_name"
        });

        equal($input.val(), "Stevan", "... got the right value for the DOM after initial binding");

        c.set({"chain.chain.chain.chain.first_name" : "Steve"});
        equal(c.get('chain.chain.chain.chain.first_name'), "Steve", "... got the right value for updated resource");
        equal($input.val(), "Steve", "... got the right value for the DOM after changing resource");

        $input.val("Scott");
        $input.trigger('change'); // gotta manually trigger this in the test
        equal(c.get('chain.chain.chain.chain.first_name'), "Scott", "... got the right value for updated resource after changing DOM");
    })();
});


