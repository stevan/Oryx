/// <reference path="../shared/jquery.d.ts" />
/// <reference path="../shared/jquery.js" />
/// <reference path="../shared/tsUnit.ts" />
/// <reference path="../lib/Kart.ts" />

/// <reference path="010-core/error.ts" />
/// <reference path="010-core/observable.ts" />
/// <reference path="010-core/traversable.ts" />
/// <reference path="010-core/resource.ts" />

/// <reference path="020-binding/action.ts" />
/// <reference path="020-binding/outlet.ts" />

var test = new tsUnit.Test ();

test.addTestClass( new KartErrorTests () );
test.addTestClass( new KartObservableTests () );
test.addTestClass( new KartTraversableTests () );
test.addTestClass( new KartResourceTests () );

test.addTestClass( new KartBindingActionTests () );
test.addTestClass( new KartBindingOutletTests () );

test.showResults( document.getElementById('results'), test.run() );