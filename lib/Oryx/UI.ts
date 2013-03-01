
module Oryx {
    export module UI {

        /* Actions */

        export class Button extends Oryx.Binding.Action {
            disable (): void { this.$element().attr('disabled', true) }
            enable  (): void { this.$element().attr('disabled', false) }
        }

        /* Outlets */

        export class Textbox extends Oryx.Binding.Outlet {}

        export class Textarea extends Oryx.Binding.Outlet {}

        export class Label extends Oryx.Binding.Outlet {
            register_element_event (): void {}; // it cannot be edited
            get_element_value (): string { return this.$element().html() }
            set_element_value ( value ): void { this.$element().html(value) }
        }

        export class Checkbox extends Oryx.Binding.Outlet {
            get_element_value (): bool { return this.$element().attr("checked") != undefined }
            set_element_value ( value: bool ): void {
                this.$element().attr("checked", value == undefined ? false : value );
            }
        }

        export class RadioGroup extends Oryx.Binding.Outlet {
            get_element_value (): string { return this.$element().filter(":checked").attr("value") }
            set_element_value ( value: string ): void {
                this.$element().attr("checked", false);
                if ( value != undefined ) {
                    this.$element().filter('[value="' + value + '"]').attr("checked", true);
                }
            }
        }

        export class CheckboxGroup extends Oryx.Binding.Outlet {
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

        export class Select extends Oryx.Binding.Outlet {
            get_element_value (): string { return this.$element().val() }
            set_element_value ( value: string ): void {
                this.$element().children('option').each(function(i) {
                    if ( value == $(this).val() ) {
                        $(this).parent().val(value);
                        return false;
                    } else {
                        console.warn('This is not the option you\'re looking for.');
                    }
                });
            }
        }
    }
}





