module Kart {
    export module UI {

        export class DataTable extends Kart.Core.Observable {

            public table_body       : string;
            public row_selector     : string;
            public binding_spec     : Object;
            public keyboard_nav     : bool = false;
            public select_by_row    : bool = false;
            public data_source      : Kart.Model.Collection;

            private keydown_handler : ( e ) => void;
            private $table          : JQuery;
            private $row_template   : JQuery;

            constructor ( opts : {
                table_body     : string;
                row_selector   : string;
                binding_spec   : Object;
                keyboard_nav?  : bool;
                select_by_row? : bool;
                data_source?   : Kart.Model.Collection;
            } ) {
                super();
                this.table_body    = opts['table_body'];
                this.row_selector  = opts['row_selector'];
                this.binding_spec  = opts['binding_spec'];
                this.data_source   = opts['data_source'];

                if ( opts['keyboard_nav']  ) { this.keyboard_nav  = opts['keyboard_nav']  }
                if ( opts['select_by_row'] ) { this.select_by_row = opts['select_by_row'] }

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

            set_data_source ( data_source : Kart.Model.Collection ): void {
                this.data_source = data_source;
                this.init();
                this.data_source.bind( 'add', ( c, idx, r ) => {
                    this.add_new_row( idx )
                });
            }

            init (): void {
                if ( this.$table == undefined ) {
                    this.$table        = jQuery( this.table_body );
                    this.$row_template = this.$table.find( this.row_selector ).clone( true );
                }

                this.$table.empty();
                for ( var i = 0; i < this.data_source.length(); i++ ) {
                    this.add_new_row( i );
                }

                if ( this.keyboard_nav == true ) {
                    jQuery( document ).unbind( 'keydown', this.keydown_handler );
                    jQuery( document ).bind( 'keydown', this.keydown_handler );
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

            populate_row ( $row : JQuery, index : number, element : Kart.Model.Resource ): void {
                for ( var selector in this.binding_spec ) {
                    var property = this.binding_spec[ selector ];
                    if ( property.constructor == Function ) {
                        var args : any[] = [ $row.find( selector ), element ];
                        property.apply( this, args );
                    }
                    else {
                        $row.find( selector ).html( element.get( property ) );
                    }
                }

                if ( this.select_by_row == true ) {
                    var self = this;
                    $row.click(
                        function () {
                            jQuery( this ).siblings().removeClass( 'selected' );
                            jQuery( this ).addClass( 'selected' );
                            self.trigger( 'selected', index );
                        }
                    );
                }

                this.trigger( 'populate_row', this, $row, index, element );
            }

            clear_selection (): void {
                this.$table.find( this.row_selector ).removeClass( 'selected' );
                this.trigger( 'clear:selected' );
            }

            move_selection_up (): void {
                var $row  = this.$table.find( '.selected' );
                if ( $row.length != 0 ) {
                    var $prev = $row.prev();
                    if ( $prev.length != 0 ) {
                        $row.removeClass( 'selected' );
                        this.trigger( 'clear:selected' );
                        $prev.addClass( 'selected' );
                        this.trigger( 'selected', $prev.index() );
                    }
                }
            }

            move_selection_down (): void {
                var $row  = this.$table.find( '.selected' );
                if ( $row.length != 0 ) {
                    var $next = $row.next();
                    if ( $next.length != 0 ) {
                        $row.removeClass( 'selected' );
                        this.trigger( 'clear:selected' );
                        $next.addClass( 'selected' );
                        this.trigger( 'selected', $next.index() );
                    }
                }
            }
        }

    }
}

