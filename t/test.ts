/// <reference path="../shared/tsUnit.ts" />
/// <reference path="../lib/Kart.ts" />

/// <reference path="010-core/error.ts" />
/// <reference path="010-core/observable.ts" />

var test = new tsUnit.Test ();

test.addTestClass( new KartErrorTests () );
test.addTestClass( new KartObservableTests () );





test.showResults( document.getElementById('results'), test.run() );