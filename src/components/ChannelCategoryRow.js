import { Lightning } from '@lightningjs/sdk';
import ChannelCard from './ChannelCard.js';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING, COMPONENT_SIZE } from '../constants/colors.js';

export default class ChannelCategoryRow extends Lightning.Component {
    static _template() {
        return {
            w: 1920,
            h: 400, // Altura: título + tarjetas
            alpha: 1,

            Title: {
                x: 60,
                y: 0,
                text: {
                    text: '',
                    fontSize: 36,
                    fontFace: TYPOGRAPHY.FONT_FAMILY,
                    textColor: COLORS.ACCENT_BLUE
                }
            },

            // Contenedor que moveremos hacia los lados para simular el scroll
            Slider: {
                x: 60,
                y: 60,
                Items: {}
            }
        };
    }

    _init() {
        this._index = 0; // Índice de la tarjeta enfocada
        this._cards = []; // Guardaremos referencias solo a los elementos enfocables (ChannelCard)
    }

    // Setter que reemplaza los "props" de React
    set category(data) {
        const {
            title,
            channels,
            expandedChannels,
            toggleInfo,
            abrirCanal,
            abrirCanalOnStreams,
            abrirCanalOnDemand,
            navigateYouTube
        } = data;

        if (!channels || channels.length === 0) {
            this.alpha = 0;
            return;
        }
        this.alpha = 1;

        this.tag('Title').text.text = title;

        let currentX = 0;
        const items = [];
        const GAP = 150; // Espaciado muy generoso entre tarjetas

        const isExpanded = (name) => expandedChannels && expandedChannels.has(name);

        const getCardWidth = (channel) => {
            const activeCount = Object.keys(channel.Actives || {}).length;
            if (title === 'AHORA' && activeCount > 1) {
                return 380 + ((activeCount - 1) * 355);
            }
            return 380;
        };

        channels.forEach(channel => {
            const cardW = getCardWidth(channel);
            items.push({
                type: ChannelCard,
                ref: `Card_${channel.ChannelName}`,
                x: currentX,
                w: cardW,
                item: {
                    channel,
                    isExpanded: isExpanded(channel.ChannelName),
                    isLiveGroup: title === 'AHORA', // true si es categoría de Live
                    toggleInfo,
                    abrirCanal,
                    abrirCanalOnStreams,
                    abrirCanalOnDemand,
                    navigateYouTube
                }
            });
            currentX += cardW + GAP;
        });

        this.tag('Slider.Items').children = items;
        this._cards = this.tag('Slider.Items').children;
        this._updateScroll(); // Forzar el culling al inicializar la fila
    }

    // --- Control de Foco y Navegación Horizontal ---
    _handleLeft() {
        if (this._index > 0) {
            this._index--;
            this._updateScroll();
            this._refocus();
            return true;
        }
        return false;
    }

    _handleRight() {
        if (this._index < this._cards.length - 1) {
            this._index++;
            this._updateScroll();
            this._refocus();
            return true;
        }
        return false;
    }

    _updateScroll() {
        const currentCard = this._cards[this._index];
        if (currentCard) {
            let targetX = 60 - currentCard.x;
            this.tag('Slider').patch({
                smooth: { x: targetX }
            });
        }

        // PERFORMANCE: Culling horizontal (desactivar renderizado fuera de pantalla)
        this._cards.forEach((card, idx) => {
            const distance = Math.abs(idx - this._index);
            card.visible = distance <= 5;
        });
    }

    _getFocused() {
        return this._cards[this._index];
    }
}