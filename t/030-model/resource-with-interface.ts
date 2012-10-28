
interface IPerson {
    first_name : string;
    last_name  : string;
}

class Person extends Kart.Model.Resource {
    constructor( b : IPerson ) { super( b ) }
}

test( "Kart.Model.Resource - resource with interface", () => {

    var p1 = new Person ({
        "first_name" : "Stevan",
        "last_name"  : "Little"
    });

    equal( p1.get("first_name"), "Stevan", '... get() worked as expected' );
    equal( p1.get("last_name"), "Little", '... get() worked as expected' );

    // this won't compile
    // var p2 = new Person ({
    //    "first_name" : "Stevan",
    // });

});