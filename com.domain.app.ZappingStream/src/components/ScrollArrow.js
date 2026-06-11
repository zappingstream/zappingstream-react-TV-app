import { Lightning } from '@lightningjs/sdk';
import { COLORS, BORDER_RADIUS, COMPONENT_SIZE } from '../constants/colors.js';

/**
 * ScrollArrow - Componente de flecha para scroll horizontal
 * Adaptación de CSS: .scroll-arrow
 * 
 * Props:
 *  - direction: 'left' | 'right'
 *  - onPress: () => void
 *  - isDisabled: boolean
 */
export default class ScrollArrow extends Lightning.Component {
    static _template() {
        return {
            w: COMPONENT_SIZE.ARROW_SIZE,
            h: COMPONENT_SIZE.ARROW_SIZE,
            rect: true,
            color: 0x800000ff, // rgba(17, 17, 17, 0.85) -> Semi-transparente
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.CIRCLE },
            borderWidth: 2,
            borderColor: COLORS.ACCENT_BLUE,

            Icon: {
                mount: 0.5,
                x: COMPONENT_SIZE.ARROW_SIZE / 2,
                y: COMPONENT_SIZE.ARROW_SIZE / 2,
                text: {
                    text: '',
                    fontSize: 32,
                    fontFace: 'Bold',
                    textColor: COLORS.TEXT_WHITE,
                    textAlign: 'center'
                }
            }
        };
    }

    _construct() {
        this._direction = 'left';
        this._isDisabled = false;
        this._onPress = () => { };
    }

    set direction(val) {
        this._direction = val;
        const icon = this._direction === 'left' ? '‹' : '›';
        this.tag('Icon').text.text = icon;
    }

    set isDisabled(val) {
        this._isDisabled = val;
        this._updateVisuals();
    }

    set onPress(fn) {
        this._onPress = fn;
    }

    _focus() {
        if (this._isDisabled) return;

        this.patch({
            color: COLORS.ACCENT_BLUE,
            smooth: { scale: 1.1 },
            Icon: { text: { textColor: COLORS.BG_BLACK } }
        });
    }

    _unfocus() {
        this.patch({
            color: 0x800000ff, // rgba(17, 17, 17, 0.85)
            smooth: { scale: 1.0 },
            Icon: { text: { textColor: COLORS.TEXT_WHITE } }
        });
    }

    _handleEnter() {
        if (!this._isDisabled) {
            this._onPress();
        }
    }

    _updateVisuals() {
        if (this._isDisabled) {
            this.patch({
                alpha: 0.2,
                borderColor: COLORS.BORDER_DISABLED,
                Icon: { text: { textColor: COLORS.BORDER_DISABLED } }
            });
        } else {
            this.patch({
                alpha: 1,
                borderColor: COLORS.ACCENT_BLUE,
                Icon: { text: { textColor: COLORS.TEXT_WHITE } }
            });
        }
    }

    _handleActive() {
        if (!this._isDisabled) {
            this.patch({ smooth: { scale: 0.9 } });
        }
    }
}
