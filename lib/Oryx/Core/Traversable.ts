module Oryx {
    export module Core {
        export module Traversable {

            export function traverse_path_and_get ( path : string, context : Object ): any {
                var parts   = path.split('.');
                var current = context;
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if ( current[ part ] != undefined && current[ part ].constructor == Function ) {
                        current = current[ part ].call( this );
                    }
                    else {
                        current = current[ part ];
                    }
                    // if there is nothing there,
                    // then we might as well return
                    // undefined, even if we are not
                    // finished the traversal, the
                    // result is the same
                    if ( current == undefined ) return current;
                }
                return current;
            }

            export function traverse_path_and_set ( path : string, context : Object, value : any, full_path? : string ): void {
                if ( full_path == undefined ) full_path = path;
                var parts   = path.split('.');
                var final   = parts.pop();
                var current = context;
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if ( current[ part ] != undefined && current[ part ].constructor == Function ) {
                        current = current[ part ].call( this );
                    }
                    else {
                        if ( current[ part ] == undefined && i < parts.length ) {
                            // auto-vivify when we
                            // hit a dead-end, this
                            // is most appropriate
                            // for additional_properties
                            current[ part ] = {};
                        }
                        else if ( typeof current[ part ] != 'object' && i < parts.length ) {
                            // if we still have parts and
                            // the current item is not an
                            // object, they obviously the
                            // path is not valid, so we
                            // throw an error
                            throw new Oryx.Error ("The property (" + full_path + ") is not a valid property");
                        }
                        current = current[ part ];
                    }
                }
                // if we have reached the end
                // and we find a Function, then
                // we assume it is a setter can
                // so we call it
                if ( current[ final ] != undefined && current[ final ].constructor == Function ) {
                    current[ final ].call( this, value );
                }
                else {
                    current[ final ] = value;
                }
            }
        }
    }
}