/// <reference path="../shared/tsUnit.ts" />
/// <reference path="../lib/Kart.ts" />

/// <reference path="010-core/error.ts" />
/// <reference path="010-core/observable.ts" />
/// <reference path="010-core/traversable.ts" />

var test = new tsUnit.Test ();

test.addTestClass( new KartErrorTests () );
test.addTestClass( new KartObservableTests () );
test.addTestClass( new KartTraversableTests () );




test.showResults( document.getElementById('results'), test.run() );