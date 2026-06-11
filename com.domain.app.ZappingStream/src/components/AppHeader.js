import { Lightning, Utils } from '@lightningjs/sdk';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS } from '../constants/colors.js';

// Sub-componente interno que simula ser un botón, input o select
class HeaderButton extends Lightning.Component {
    static _template() {
        return {
            rect: true,
            color: COLORS.BG_PANEL,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.MEDIUM },
            Label: {
                mount: 0.5,
                text: {
                    text: '',
                    fontSize: TYPOGRAPHY.FONT_SIZE_NORMAL,
                    fontFace: TYPOGRAPHY.FONT_FAMILY,
                    textColor: COLORS.TEXT_WHITE,
                    textOverflow: 'ellipsis',
                }
            }
        };
    }

    set label(v) {
        this.tag('Label').text.text = v;
    }

    _init() {
        // Asignamos las medidas de forma segura una vez que el componente existe
        this.tag('Label').patch({
            x: this.w / 2,
            y: (this.h / 2) + 2,
            text: {
                wordWrapWidth: this.w > 20 ? this.w - 20 : 0
            }
        });
    }

    set isActive(v) {
        this._isActiveFlag = v;
        this._updateAppearance();
    }

    _updateAppearance() {
        if (this.hasFocus()) {
            this.patch({
                color: COLORS.ACCENT_BLUE,
                Label: { text: { textColor: COLORS.BG_BLACK } },
                smooth: { scale: 1.05 }
            });
        } else if (this._isActiveFlag) {
            this.patch({
                color: COLORS.BORDER_LIGHT,
                Label: { text: { textColor: COLORS.ACCENT_BLUE } },
                smooth: { scale: 1.0 }
            });
        } else {
            this.patch({
                color: COLORS.BG_PANEL,
                Label: { text: { textColor: COLORS.TEXT_WHITE } },
                smooth: { scale: 1.0 }
            });
        }
    }

    _focus() {
        this._updateAppearance();
    }

    _unfocus() {
        this._updateAppearance();
    }

    // Al presionar Enter, avisa al padre (AppHeader) qué botón fue presionado
    _handleEnter() {
        this.fireAncestors('$onHeaderAction', this.ref);
    }
}

export default class AppHeader extends Lightning.Component {
    static _template() {
        return {
            w: 1920,
            h: 220,
            rect: true,
            color: COLORS.TRANSPARENT,

            Logo: {
                x: 60,
                y: 0,
                w: 220,
                h: 220,
                src: Utils.asset('images/logo.png'),
            },

            // Controles de navegación de cabecera alineados horizontalmente
            Controls: {
                x: 350,
                y: 30,
                Search: { type: HeaderButton, ref: 'Search', w: 260, h: 60 },
                Province: { type: HeaderButton, ref: 'Province', x: 280, w: 240, h: 60 },
                City: { type: HeaderButton, ref: 'City', x: 540, w: 240, h: 60 },
                ModeCards: { type: HeaderButton, ref: 'ModeCards', x: 800, w: 160, h: 60 },
                ModeGrid: { type: HeaderButton, ref: 'ModeGrid', x: 980, w: 220, h: 60 }
            }
        };
    }

    _construct() {
        this._index = 0; // Índice de foco horizontal
        this._controls = ['Search', 'Province', 'City', 'ModeCards', 'ModeGrid'];
    }

    // Equivalente a recibir los "props" de React
    set config(data) {
        const { searchText, viewMode, selectedProvince, selectedCity, provinces, cities, callbacks } = data;

        this._callbacks = callbacks || {};

        this.tag('Controls.Search').label = searchText ? `🔍 ${searchText}` : '🔍 Buscar canal...';
        this.tag('Controls.Province').label = selectedProvince ? `Prov: ${selectedProvince}` : 'Provincia: Todas';
        this.tag('Controls.City').label = selectedCity ? `Ciudad: ${selectedCity}` : 'Ciudad: Todas';

        // Deshabilitar visualmente o no la ciudad si el arreglo está vacío
        this._hasCities = cities && cities.length > 0;
        this.tag('Controls.City').alpha = this._hasCities ? 1 : 0.5;

        this.tag('Controls.ModeCards').label = 'Canales';
        this.tag('Controls.ModeCards').isActive = viewMode === 'cards';

        this.tag('Controls.ModeGrid').label = 'Transmisiones';
        this.tag('Controls.ModeGrid').isActive = viewMode === 'grid';
    }

    // --- Manejo del Foco Horizontal ---
    _handleLeft() {
        if (this._index > 0) {
            this._index--;
            // Si estamos retrocediendo y "City" está deshabilitado, lo saltamos
            if (this._controls[this._index] === 'City' && !this._hasCities) {
                this._index--;
            }
            this._refocus();
            return true;
        }
        return false; // Permite que el contenedor superior atrape la flecha izquierda si hiciera falta
    }

    _handleRight() {
        if (this._index < this._controls.length - 1) {
            this._index++;
            // Si avanzamos y "City" está deshabilitado, lo saltamos
            if (this._controls[this._index] === 'City' && !this._hasCities) {
                this._index++;
            }
            this._refocus();
            return true;
        }
        return false;
    }

    // Le dice a Lightning JS a qué control darle el estado _focus()
    _getFocused() {
        const controlRef = this._controls[this._index];
        return this.tag(`Controls.${controlRef}`);
    }

    // --- Receptor de Eventos (Simulación de onClick) ---
    $onHeaderAction(ref) {
        if (!this._callbacks) return;

        switch (ref) {
            case 'Search':
                if (this._callbacks.onSearchClick) this._callbacks.onSearchClick();
                break;
            case 'Province':
                if (this._callbacks.onProvinceClick) this._callbacks.onProvinceClick();
                break;
            case 'City':
                if (this._hasCities && this._callbacks.onCityClick) this._callbacks.onCityClick();
                break;
            case 'ModeCards':
                if (this._callbacks.onViewModeChange) this._callbacks.onViewModeChange('cards');
                break;
            case 'ModeGrid':
                if (this._callbacks.onViewModeChange) this._callbacks.onViewModeChange('grid');
                break;
        }
    }
}