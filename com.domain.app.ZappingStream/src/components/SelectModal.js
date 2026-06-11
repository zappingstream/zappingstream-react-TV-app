import { Lightning } from '@lightningjs/sdk';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS } from '../constants/colors.js';

class SelectItem extends Lightning.Component {
    static _template() {
        return {
            w: 600, h: 60,
            rect: true, color: 0x00000000,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.MEDIUM },
            Label: {
                x: 30, mountY: 0.5, y: 30,
                text: { text: '', fontSize: TYPOGRAPHY.FONT_SIZE_LARGE, textColor: COLORS.TEXT_WHITE }
            }
        };
    }
    set item(v) {
        this._value = v.value;
        this.tag('Label').text.text = v.label;
    }
    _focus() {
        this.patch({ color: COLORS.ACCENT_BLUE, Label: { text: { textColor: COLORS.BG_BLACK } }, smooth: { scale: 1.02 } });
    }
    _unfocus() {
        this.patch({ color: 0x00000000, Label: { text: { textColor: COLORS.TEXT_WHITE } }, smooth: { scale: 1.0 } });
    }
    _handleEnter() {
        this.fireAncestors('$onOptionSelected', this._value);
    }
}

export default class SelectModal extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 1080,
            Background: { w: 1920, h: 1080, rect: true, color: 0xaa000000 },
            Container: {
                x: 960, y: 540, mount: 0.5, w: 660, h: 800, rect: true, color: COLORS.BG_DARK,
                shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.LARGE },
                Title: {
                    x: 30, y: 30,
                    text: { text: 'Seleccionar', fontSize: TYPOGRAPHY.FONT_SIZE_XLARGE, textColor: COLORS.ACCENT_BLUE }
                },
                ListBounds: {
                    x: 30, y: 100, w: 600, h: 660, clipping: true,
                    Slider: { y: 0, Items: {} }
                }
            }
        };
    }

    _construct() {
        this._index = 0;
        this._options = [];
        this._onSelect = null;
    }

    set config(data) {
        this._onSelect = data.onSelect;
        this.tag('Container.Title').text.text = data.title;
        this._options = data.options.map((opt, i) => ({
            type: SelectItem,
            y: i * 60,
            item: opt
        }));
        this.tag('Container.ListBounds.Slider.Items').children = this._options;
        this._index = 0;
        this._updateScroll(true);
    }

    _handleUp() {
        if (this._index > 0) {
            this._index--;
            this._updateScroll();
        }
        return true;
    }

    _handleDown() {
        if (this._index < this._options.length - 1) {
            this._index++;
            this._updateScroll();
        }
        return true;
    }

    _handleBack() {
        this.fireAncestors('$closeSelectModal');
        return true;
    }

    _updateScroll(instant = false) {
        let targetY = 0;
        if (this._index > 5) { // Empieza a scrollear al pasar el 5to item
            targetY = -(this._index - 5) * 60;
        }
        if (instant) {
            this.tag('Container.ListBounds.Slider').y = targetY;
        } else {
            this.tag('Container.ListBounds.Slider').patch({ smooth: { y: targetY } });
        }
    }

    _getFocused() {
        const items = this.tag('Container.ListBounds.Slider.Items').children;
        return items[this._index] || this;
    }

    $onOptionSelected(value) {
        if (this._onSelect) this._onSelect(value);
        this.fireAncestors('$closeSelectModal');
    }
}