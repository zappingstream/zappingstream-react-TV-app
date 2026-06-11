import { Lightning } from '@lightningjs/sdk';
import VideoCard from './VideoCard.js';
import ChannelCard from './ChannelCard.js'; // Usado para cuando se expande un canal
import { getFreshImage } from '../utils.js';
import { COLORS, BORDER_RADIUS, COMPONENT_SIZE, SPACING, TYPOGRAPHY } from '../constants/colors.js';

// ==========================================
// 1. Componente de Botón de Día (DayButton)
// ==========================================
class DayButton extends Lightning.Component {
    static _template() {
        return {
            w: COMPONENT_SIZE.BUTTON_HEIGHT + 110, h: COMPONENT_SIZE.BUTTON_HEIGHT,
            rect: true,
            color: COLORS.BG_PANEL,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.PILL },
            Label: {
                mount: 0.5, x: (COMPONENT_SIZE.BUTTON_HEIGHT + 110) / 2, y: COMPONENT_SIZE.BUTTON_HEIGHT / 2,
                text: { text: '', fontSize: TYPOGRAPHY.FONT_SIZE_LARGE, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE }
            }
        };
    }

    set item(data) {
        this._item = data;
        this.tag('Label').text.text = data.label;
        this._updateState();
    }

    set isSelected(val) {
        this._isSelected = val;
        this._updateState();
    }

    _updateState() {
        if (this.hasFocus()) {
            this.patch({
                color: COLORS.ACCENT_BLUE,
                Label: { text: { textColor: COLORS.BG_BLACK } },
                smooth: { scale: 1.1 }
            });
        } else if (this._isSelected) {
            this.patch({
                color: COLORS.ACCENT_BLUE,
                Label: { text: { textColor: COLORS.BG_BLACK } },
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

    _focus() { this._updateState(); }
    _unfocus() { this._updateState(); }

    _handleEnter() {
        this.fireAncestors('$onDaySelected', this._item.date);
    }
}

// ==========================================
// 2. Componente Evento Individual (EpgEvent)
// ==========================================
class EpgEvent extends Lightning.Component {
    static _template() {
        return {
            w: COMPONENT_SIZE.CARD_WIDTH, h: COMPONENT_SIZE.CARD_HEIGHT,
            rect: true,
            color: COLORS.BG_DARK,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.LARGE },
            TimeBadge: {
                y: SPACING.PADDING_SMALL, x: SPACING.PADDING_SMALL, h: 28, rect: true, color: COLORS.BG_PANEL,
                shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.MEDIUM },
                Label: {
                    x: SPACING.PADDING_SMALL * 1.5, mountY: 0.5, y: 16,
                    text: { text: '', fontSize: TYPOGRAPHY.FONT_SIZE_SMALL, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE }
                }
            },
            VideoWrapper: {
                y: 35, w: COMPONENT_SIZE.CARD_WIDTH, h: 120,
                type: VideoCard
            },
            Title: {
                y: 160, x: SPACING.PADDING_SMALL, w: COMPONENT_SIZE.CARD_WIDTH - SPACING.PADDING_SMALL * 2,
                text: { text: '', fontSize: TYPOGRAPHY.FONT_SIZE_NORMAL, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE, maxLines: 2, textOverflow: 'ellipsis', wordWrapWidth: COMPONENT_SIZE.CARD_WIDTH - SPACING.PADDING_SMALL * 2 }
            }
        };
    }

    set item(data) {
        this._item = data;
        const { ev, navigateYouTube, onVideoError } = data;

        // Formateo de fecha
        const formatTime = (dateStr) => {
            if (!dateStr) return "??:??";
            const d = new Date(dateStr);
            return isNaN(d.getTime()) ? "??:??" : d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
        };

        const start = formatTime(ev.ActualStartTime || ev.ScheduledStartTime || ev.AddedAt);
        let timeText = start;
        if (ev.IsPast && !ev.Live) {
            const endStr = ev.ActualEndTime || ev.EndedAt;
            const end = endStr ? formatTime(endStr) : "??:??";
            timeText = `${start} - ${end}`;
        }

        const isNotNow = !ev.Live;
        this.tag('TimeBadge').color = isNotNow ? COLORS.BG_DARK : COLORS.LIVE_BADGE;
        this.tag('TimeBadge.Label').text.text = timeText;
        this.tag('TimeBadge.Label').text.textColor = isNotNow ? COLORS.TEXT_GRAY : COLORS.TEXT_WHITE;

        // Ajustar dinámicamente el ancho del badge en base al texto
        this.tag('TimeBadge').w = Math.max(timeText.length * 8 + 24, 60);

        const rawImageUrl = ev.ThumbnailUrl || ev.channel.ChannelImgUrl;

        this.tag('VideoWrapper').item = {
            imageUrl: rawImageUrl ? getFreshImage(rawImageUrl, ev.channel.LastActivityAt) : undefined,
            altText: ev.Title,
            fallbackText: ev.channel.ChannelName,
            isLive: ev.Live,
            isPremiere: ev.IsPremiere || ev.WasPremiere,
            isPast: ev.IsPast && !ev.Live,
            isUpcoming: !ev.IsPast && !ev.Live,
            onImageError: () => onVideoError(ev.VideoId)
        };

        this.tag('Title').text.text = ev.Title || 'Transmisión sin título';
    }

    _focus() {
        this.patch({
            smooth: { scale: 1.05 },
            color: COLORS.BG_PANEL,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.LARGE, stroke: 4, strokeColor: COLORS.ACCENT_BLUE },
            zIndex: 10
        });
    }
    _unfocus() {
        this.patch({
            smooth: { scale: 1.0 },
            color: COLORS.BG_DARK,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.LARGE, stroke: 0 },
            zIndex: 1
        });
    }
    _handleEnter() {
        if (this._item.navigateYouTube) {
            this._item.navigateYouTube(`https://www.youtube.com/watch?v=${this._item.ev.VideoId}`);
        }
    }
}

// ==========================================
// 3. Fila de Canal Completa (EpgRow)
// ==========================================
class EpgRow extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 280, // Altura fija de la fila
            Sidebar: {
                w: 100, h: 260, rect: true, color: COLORS.BG_BLACK,
                Logo: { x: 10, y: 15, w: COMPONENT_SIZE.LOGO_SMALL, h: COMPONENT_SIZE.LOGO_SMALL, shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.CIRCLE } },
                Name: { x: 10, y: 70, w: 80, text: { text: '', fontSize: TYPOGRAPHY.FONT_SIZE_SMALL, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.ACCENT_BLUE, wordWrapWidth: 80, maxLines: 2, textAlign: 'center' } },
                InfoBtn: {
                    x: 10, y: 170, w: 80, h: COMPONENT_SIZE.BUTTON_HEIGHT_SMALL, rect: true, color: COLORS.BG_PANEL, shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.PILL },
                    Label: { mount: 0.5, x: 40, y: COMPONENT_SIZE.BUTTON_HEIGHT_SMALL / 2, text: { text: 'Info', fontSize: TYPOGRAPHY.FONT_SIZE_SMALL, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE } }
                }
            },
            // Slider horizontal de videos
            TrackBounds: {
                x: 115, y: 0, w: 1805, h: 280, clipping: true,
                Slider: { x: 0, y: 0, Items: {} }
            }
        };
    }

    _construct() {
        this._index = 1; // 0 = InfoBtn (Sidebar), 1 a N = Eventos
        this._events = [];
    }

    set item(data) {
        this._item = data;
        const { row, navigateYouTube, onVideoError, toggleInfo } = data;

        // Configurar Sidebar
        this.tag('Sidebar.Logo').src = row.channel.ChannelImgUrl;
        this.tag('Sidebar.Name').text.text = row.channel.ChannelName;
        this._toggleInfo = () => toggleInfo(row.channel.ChannelName);

        // Poblar Eventos
        let currentX = 0;
        const items = [];

        row.events.forEach((ev, idx) => {
            items.push({
                type: EpgEvent,
                x: currentX,
                item: { ev, navigateYouTube, onVideoError }
            });
            currentX += 280; // 240 de ancho + 40 de gap
        });

        this.tag('TrackBounds.Slider.Items').children = items;
        this._events = this.tag('TrackBounds.Slider.Items').children;

        // Auto-focus al primer video en vivo si existe, sino al primero normal
        const liveIndex = row.events.findIndex(e => e.Live);
        this._index = liveIndex !== -1 ? (liveIndex + 1) : 1;
        this._updateScroll(true); // true = sin animación inicial
    }

    _handleLeft() {
        if (this._index > 0) {
            this._index--;
            this._updateScroll();
            this._refocus();
            return true;
        }
        return false; // Permite salir del EPG y volver al menú principal si hubiera uno
    }

    _handleRight() {
        if (this._index < this._events.length) { // length es N, index llega hasta N
            this._index++;
            this._updateScroll();
            this._refocus();
            return true;
        }
        return false;
    }

    _updateScroll(instant = false) {
        // Lógica de Sidebar Foco vs Video Foco
        if (this._index === 0) {
            // Foco en Botón Info
            this.tag('Sidebar.InfoBtn').color = COLORS.ACCENT_BLUE;
            this.tag('Sidebar.InfoBtn.Label').text.textColor = COLORS.BG_BLACK;
        } else {
            // Foco en Slider
            this.tag('Sidebar.InfoBtn').color = COLORS.BG_PANEL;
            this.tag('Sidebar.InfoBtn.Label').text.textColor = COLORS.TEXT_WHITE;

            const evIndex = this._index - 1;
            let targetX = 0;
            if (evIndex > 0) {
                targetX = -(evIndex * 295) + 100; // Desplazar dejando un poco de margen visual (con gap de 15px)
            }

            if (instant) {
                this.tag('TrackBounds.Slider').x = targetX;
            } else {
                this.tag('TrackBounds.Slider').patch({ smooth: { x: targetX } });
            }
        }
    }

    _getFocused() {
        if (this._index === 0) return this; // La propia fila captura enter si estamos en el InfoBtn
        return this._events[this._index - 1]; // Delegamos al EpgEvent
    }

    _handleEnter() {
        if (this._index === 0 && this._toggleInfo) {
            this._toggleInfo();
        }
    }
}

// ==========================================
// 4. Grilla Principal de Horarios (Main Grid)
// ==========================================
export default class ScheduleGrid extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 1080,
            alpha: 1,

            // Selector de Días Horizontal
            DaysRailBounds: {
                x: 60, y: 20, w: 1800, h: 70, clipping: true,
                Slider: { x: 0, y: 0, Items: {} }
            },

            // Mensaje de Vacío
            NoEventsMsg: {
                alpha: 0, mount: 0.5, x: 960, y: 540,
                text: { text: 'No hay transmisiones programadas para este día.', fontSize: TYPOGRAPHY.FONT_SIZE_XLARGE, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_GRAY }
            },

            // Contenedor Vertical de Canales
            EpgContainerBounds: {
                x: 0, y: 100, w: 1920, h: 830, clipping: true,
                Slider: { x: 0, y: 0, Items: {} }
            }
        };
    }

    _construct() {
        this._focusY = 0; // 0 = DaysRail, 1 a N = Filas de Canales
        this._dayIndex = 0; // Indice del día seleccionado visualmente
        this._failedVideos = new Set();
        this._failedChannels = new Set();
        this._rowsComponents = [];

        // Configuración de los 15 días (-7 a +7)
        this._today = new Date();
        this._today.setHours(0, 0, 0, 0);
        this._selectedDate = new Date(this._today);
        this._days = [];

        for (let i = -7; i <= 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            d.setHours(0, 0, 0, 0);
            this._days.push(d);

            if (d.getTime() === this._today.getTime()) {
                this._dayIndex = i + 7; // El índice inicial seleccionado será el "Hoy"
            }
        }
    }

    _init() {
        const daysItems = [];
        let currentX = 0;

        this._days.forEach((d, i) => {
            let label = d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'numeric' });
            if (d.getTime() === this._today.getTime()) {
                label = "Hoy";
            }

            daysItems.push({
                type: DayButton,
                x: currentX,
                item: { date: d, label }
            });
            currentX += 172; // 160 de ancho + 12 de gap (estilos CSS .days-rail gap: 12px)
        });

        this.tag('DaysRailBounds.Slider.Items').children = daysItems;
        this._dayButtons = this.tag('DaysRailBounds.Slider.Items').children;
    }

    // Equivalente a Props de React
    set config(data) {
        this._channels = data.channels || [];
        this._navigateYouTube = data.navigateYouTube;
        this._toggleInfo = data.toggleInfo;
        this._abrirCanal = data.abrirCanal;
        this._abrirCanalOnStreams = data.abrirCanalOnStreams;
        this._abrirCanalOnDemand = data.abrirCanalOnDemand;

        // Reactividad a ExpandedChannels
        if (data.expandedChannels && data.expandedChannels.size > 0) {
            // Obtener el primer canal expandido (en la app TV no se abren múltiples a la vez normalmente)
            const channelName = Array.from(data.expandedChannels)[0];
            const channel = this._channels.find(c => c.ChannelName === channelName);
            if (channel) {
                this.fireAncestors('$openExpandedModal', channel); // Emitimos para que App.js lo muestre en overlay completo
            }
        }

        this._buildGrid();
    }

    // Filtra y genera los datos (Equivalente al useMemo de channelRows en React)
    _buildGrid() {
        const rowsData = [];

        this._channels.forEach(channel => {
            if (this._failedChannels.has(channel.ChannelName)) return;

            const events = [];
            const checkAndAddEvent = (v, isForceLive = false) => {
                if (this._failedVideos.has(v.VideoId)) return;

                const isLive = v.Live || isForceLive;
                const effectiveStartTime = v.ActualStartTime || v.ScheduledStartTime || v.AddedAt;

                if (effectiveStartTime) {
                    const vDate = new Date(effectiveStartTime);
                    if (vDate.getFullYear() === this._selectedDate.getFullYear() &&
                        vDate.getMonth() === this._selectedDate.getMonth() &&
                        vDate.getDate() === this._selectedDate.getDate()) {

                        if (!events.some(e => e.VideoId === v.VideoId)) {
                            events.push({ ...v, ScheduledStartTime: effectiveStartTime, Live: isLive, channel });
                        }
                    }
                }
            };

            if (channel.Upcoming) Object.values(channel.Upcoming).filter(v => v.ScheduledStartTime).forEach(v => checkAndAddEvent(v, false));
            if (channel.Actives) Object.values(channel.Actives).forEach(v => checkAndAddEvent(v, true));
            if (channel.Past) {
                Object.values(channel.Past).forEach(v => {
                    const effectiveStartTime = v.ActualStartTime || v.ScheduledStartTime || v.AddedAt;
                    if (!effectiveStartTime || this._failedVideos.has(v.VideoId)) return;

                    const vDate = new Date(effectiveStartTime);
                    if (!isNaN(vDate.getTime()) && vDate.toDateString() === this._selectedDate.toDateString()) {
                        if (!events.some(e => e.VideoId === v.VideoId)) {
                            events.push({ ...v, ScheduledStartTime: effectiveStartTime, Live: false, IsPast: true, channel });
                        }
                    }
                });
            }

            if (events.length > 0) {
                const getTime = (dateStr) => {
                    if (!dateStr) return new Date().getTime();
                    const t = new Date(dateStr).getTime();
                    return isNaN(t) ? new Date().getTime() : t;
                };
                events.sort((a, b) => getTime(a.ScheduledStartTime) - getTime(b.ScheduledStartTime));
                rowsData.push({ channel, events });
            }
        });

        rowsData.sort((a, b) => a.channel.ChannelName.localeCompare(b.channel.ChannelName));

        // Dibujar Filas
        this.tag('NoEventsMsg').alpha = rowsData.length === 0 ? 1 : 0;

        let currentY = 0;
        const rowItems = [];

        rowsData.forEach(row => {
            rowItems.push({
                type: EpgRow,
                y: currentY,
                item: {
                    row,
                    navigateYouTube: this._navigateYouTube,
                    toggleInfo: this._toggleInfo,
                    onVideoError: (videoId) => {
                        this._failedVideos.add(videoId);
                        this._buildGrid(); // Re-renderizar
                    }
                }
            });
            currentY += 280; // Altura de fila
        });

        this.tag('EpgContainerBounds.Slider.Items').children = rowItems;
        this._rowsComponents = this.tag('EpgContainerBounds.Slider.Items').children;

        // Actualizar visualmente la selección de días
        if (this._dayButtons) {
            this._dayButtons.forEach((btn, idx) => {
                btn.isSelected = this._days[idx].getTime() === this._selectedDate.getTime();
            });
        }

        // Ajustar el foco si nos quedamos sin filas por el filtrado
        if (this._focusY > this._rowsComponents.length) {
            this._focusY = this._rowsComponents.length;
        }
        this._updateScrollVertical();
    }

    // Evento Escuchado desde DayButton
    $onDaySelected(date) {
        this._selectedDate = date;
        this._buildGrid();
    }

    // --- Manejo del Foco Vertical de la Pantalla ---
    _handleUp() {
        if (this._focusY > 0) {
            this._focusY--;
            this._updateScrollVertical();
            this._refocus();
            return true;
        }
        return false; // Escapa hacia AppHeader
    }

    _handleDown() {
        if (this._focusY < this._rowsComponents.length) {
            this._focusY++;
            this._updateScrollVertical();
            this._refocus();
            return true;
        }
        return false; // Escapa hacia AppFooter
    }

    _handleLeft() {
        if (this._focusY === 0 && this._dayIndex > 0) {
            this._dayIndex--;
            this.tag('DaysRailBounds.Slider').patch({ smooth: { x: -(this._dayIndex * 172) + 500 } }); // Ajustado al nuevo gap de 12px
            this._refocus();
            return true;
        }
        return false;
    }

    _handleRight() {
        if (this._focusY === 0 && this._dayIndex < this._dayButtons.length - 1) {
            this._dayIndex++;
            this.tag('DaysRailBounds.Slider').patch({ smooth: { x: -(this._dayIndex * 172) + 500 } }); // Ajustado al nuevo gap de 12px
            this._refocus();
            return true;
        }
        return false;
    }

    _updateScrollVertical() {
        if (this._focusY > 0) {
            const rowIndex = this._focusY - 1;
            // Desplazar contenedor EPG hacia arriba cuando bajamos de la fila 2
            let targetY = 0;
            if (rowIndex > 1) {
                targetY = -((rowIndex - 1) * 280); // Altura de fila: 280px
            }
            this.tag('EpgContainerBounds.Slider').patch({ smooth: { y: targetY } });
        }
    }

    _getFocused() {
        if (this._focusY === 0) {
            return this._dayButtons[this._dayIndex]; // Selector de Días
        } else if (this._rowsComponents.length > 0) {
            return this._rowsComponents[this._focusY - 1]; // EpgRow específico
        }
        return this;
    }
}