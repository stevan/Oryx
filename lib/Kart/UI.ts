
module Kart {
    export module UI {

        /* Actions */

        export class Button extends Kart.Binding.Action {
            disable (): void { this.$element().attr('disabled', true) }
            enable  (): void { this.$element().attr('disabled', false) }
        }

        /* Outlets */

        export class Textbox extends Kart.Binding.Outlet {}

        export class Label extends Kart.Binding.Outlet {
            register_element_event (): void {}; // it cannot be edited
            get_element_value (): string { return this.$element().html() }
            set_element_value ( value ): void { this.$element().html(value) }
        }

        export class Checkbox extends Kart.Binding.Outlet {
            get_element_value (): bool { return this.$element().attr("checked") != undefined }
            set_element_value ( value: bool ): void {
                this.$element().attr("checked", value == undefined ? false : value );
            }
        }

        export class RadioGroup extends Kart.Binding.Outlet {
            get_element_value (): string { return this.$element().filter(":checked").attr("value") }
            set_element_value ( value: string ): void {
                this.$element().attr("checked", false);
                if ( value != undefined ) {
                    this.$element().filter('[value="' + value + '"]').attr("checked", true);
                }
            }
        }

        export class CheckboxGroup extends Kart.Binding.Outlet {
            get_element_value (): string[] {
                var acc = [];
                this.$element().filter(":checked").each( function () { acc.push( $(this).attr("value") ) } );
                return acc;
            }
            set_element_value ( values: string[] ): void {
                this.$element().attr("checked", false);
                if ( values != undefined ) {
                    for (var i = 0; i < values.length; i++) {
                        this.$element().filter('[value="' + values[i] + '"]').attr("checked", true);
                    }
                }
            }
        }
    }
}





