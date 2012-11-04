module Oryx {
    export module UI {

        export class DataTable extends Oryx.Core.Observable {

            public table_body       : string;
            public row_selector     : string;
            public binding_spec     : Object;
            public keyboard_nav     : bool = false;
            public select_by_row    : bool = false;
            public data_source      : Oryx.Model.Collection;

            private keydown_handler : ( e ) => void;
            private $table          : Rosetta.INode;
            private $row_template   : Rosetta.INode;

            constructor ( opts : {
                table_body     : string;
                row_selector   : string;
                binding_spec   : Object;
                keyboard_nav?  : bool;
                select_by_row? : bool;
                data_source?   : Oryx.Model.Collection;
            } ) {
                super();
                this.table_body    = opts.table_body;
                this.row_selector  = opts.row_selector;
                this.binding_spec  = opts.binding_spec;
                this.data_source   = opts.data_source;

                if ( opts.keyboard_nav  ) { this.keyboard_nav  = opts.keyboard_nav  }
                if ( opts.select_by_row ) { this.select_by_row = opts.select_by_row }

                if ( this.keyboard_nav == true ) {
                    this.keydown_handler = ( e ) => {
                        if (e.keyCode == 38) {
                            this.move_selection_up();
                        }
                        else if (e.keyCode == 40) {
                            this.move_selection_down();
                        }
                    };
                }

                if ( this.data_source ) {
                    this.init()
                }
            }

            set_data_source ( data_source : Oryx.Model.Collection ): void {
                this.data_source = data_source;
                this.init();
                this.data_source.bind( 'add', ( c, idx, r ) => {
                    this.add_new_row( idx )
                });
            }

            init (): void {
                if ( this.$table == undefined ) {
                    this.$table        = new Oryx.RosettaNode( this.table_body );
                    this.$row_template = this.$table.find_one( this.row_selector ).clone( true );
                }

                this.$table.empty();
                for ( var i = 0; i < this.data_source.length(); i++ ) {
                    this.add_new_row( i );
                }

                if ( this.keyboard_nav == true ) {
                    var $document = new Oryx.RosettaNode( document );
                    $document.unbind( 'keydown', this.keydown_handler );
                    $document.bind( 'keydown', this.keydown_handler );
                }
            }


            reload (): void {
                this.init();
                this.trigger( 'reloaded', this );
            }

            add_new_row ( index : number ): void {
                var $new_row = this.$row_template.clone( true );

                this.data_source.bind(
                    'update:' + index,
                    ( c, idx, r ) => { this.populate_row( $new_row, idx, r ) }
                );

                this.populate_row( $new_row, index, this.data_source.get( index ) )
                this.$table.append( $new_row );
            }

            populate_row ( $row : Rosetta.INode, index : number, element : Oryx.Model.Resource ): void {
                for ( var selector in this.binding_spec ) {
                    var property = this.binding_spec[ selector ];
                    if ( property.constructor == Function ) {
                        var args : any[] = [ $row.find_one( selector ), element ];
                        property.apply( this, args );
                    }
                    else {
                        $row.find_one( selector ).html( element.get( property ) );
                    }
                }

                if ( this.select_by_row == true ) {
                    $row.bind( 'click', () => {
                        $row.siblings().each( ( n ) => { n.remove_class( 'selected' ) });
                        $row.add_class( 'selected' );
                        this.trigger( 'selected', index );
                    });
                }

                this.trigger( 'populate_row', this, $row, index, element );
            }

            clear_selection (): void {
                this.$table.find_one( this.row_selector ).remove_class( 'selected' );
                this.trigger( 'clear:selected' );
            }

            move_selection_up (): void {
                var $row  = this.$table.find_one( '.selected' );
                if ( $row ) {
                    var $prev = $row.prev();
                    if ( $prev ) {
                        $row.remove_class( 'selected' );
                        this.trigger( 'clear:selected' );
                        $prev.add_class( 'selected' );
                        this.trigger( 'selected', $prev.index() );
                    }
                }
            }

            move_selection_down (): void {
                var $row  = this.$table.find_one( '.selected' );
                if ( $row ) {
                    var $next = $row.next();
                    if ( $next ) {
                        $row.remove_class( 'selected' );
                        this.trigger( 'clear:selected' );
                        $next.add_class( 'selected' );
                        this.trigger( 'selected', $next.index() );
                    }
                }
            }
        }

    }
}

