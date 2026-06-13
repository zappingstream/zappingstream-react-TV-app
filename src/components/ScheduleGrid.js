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
            w: 200, h: 60,
            rect: true,
            color: COLORS.BG_PANEL,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.PILL },
            Label: {
                mount: 0.5, x: 100, y: 32,
                text: { text: '', fontSize: 24, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE }
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
            w: 380, h: 400,
            rect: true,
            color: COLORS.BG_DARK,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.LARGE },
            TimeBadge: {
                y: 12, x: 12, h: 36, rect: true, color: COLORS.BG_PANEL,
                shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.MEDIUM },
                Label: {
                    x: 12, mountY: 0.5, y: 20,
                    text: { text: '', fontSize: 20, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE }
                }
            },
            VideoWrapper: {
                y: 60, w: 380, h: 214,
                type: VideoCard
            },
            Title: {
                y: 290, x: 16, w: 348,
                text: { text: '', fontSize: 24, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE, maxLines: 3, textOverflow: 'ellipsis', wordWrapWidth: 348, lineHeight: 30 }
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
        this.tag('TimeBadge').w = Math.max(timeText.length * 12 + 30, 80);

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
            w: 1920, h: 460, // Altura fija de la fila
            Sidebar: {
                w: 180, h: 440, rect: true, color: COLORS.BG_BLACK,
                Logo: { x: 50, y: 30, w: COMPONENT_SIZE.LOGO_MEDIUM, h: COMPONENT_SIZE.LOGO_MEDIUM, shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.CIRCLE } },
                Name: { x: 10, y: 130, w: 160, text: { text: '', fontSize: 24, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.ACCENT_BLUE, wordWrapWidth: 160, maxLines: 2, textAlign: 'center', lineHeight: 32 } },
                InfoBtn: {
                    x: 30, y: 280, w: 120, h: 54, rect: true, color: COLORS.BG_PANEL, shader: { type: Lightning.shaders.RoundedRectangle, radius: BORDER_RADIUS.PILL },
                    Label: { mount: 0.5, x: 60, y: 29, text: { text: 'Info', fontSize: 22, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_WHITE } }
                }
            },
            // Slider horizontal de videos
            TrackBounds: {
                x: 200, y: -10, w: 1720, h: 480, clipping: true,
                Slider: { x: 0, y: 10, Items: {} }
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
            currentX += 400; // 380 de ancho + 20 de gap
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
                targetX = -(evIndex * 400) + 60; // Desplazar exacto dejando 60px de margen respecto a la columna
            }

            if (instant) {
                this.tag('TrackBounds.Slider').x = targetX;
            } else {
                this.tag('TrackBounds.Slider').patch({ smooth: { x: targetX } });
            }
        }

        // PERFORMANCE: Culling horizontal en EpgRow (desconectar de la GPU lo lejano)
        const safeEvIndex = Math.max(0, this._index - 1);
        this._events.forEach((ev, idx) => {
            const distance = Math.abs(idx - safeEvIndex);
            ev.visible = distance <= 5; // Mostrar solo 5 videos a la izquierda/derecha
        });
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
                x: 60, y: 20, w: 1800, h: 80, clipping: true,
                Slider: { x: 0, y: 0, Items: {} }
            },

            // Mensaje de Vacío
            NoEventsMsg: {
                alpha: 0, mount: 0.5, x: 960, y: 540,
                text: { text: 'No hay transmisiones programadas para este día.', fontSize: 36, fontFace: TYPOGRAPHY.FONT_FAMILY, textColor: COLORS.TEXT_GRAY }
            },

            // Contenedor Vertical de Canales
            EpgContainerBounds: {
                x: 0, y: 110, w: 1920, h: 820, clipping: true,
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
            currentX += 212; // 200 de ancho + 12 de gap
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
            currentY += 460; // Altura de fila
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
            this.tag('DaysRailBounds.Slider').patch({ smooth: { x: -(this._dayIndex * 212) + 500 } });
            this._refocus();
            return true;
        }
        return false;
    }

    _handleRight() {
        if (this._focusY === 0 && this._dayIndex < this._dayButtons.length - 1) {
            this._dayIndex++;
            this.tag('DaysRailBounds.Slider').patch({ smooth: { x: -(this._dayIndex * 212) + 500 } });
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
                targetY = -((rowIndex - 1) * 460); // Altura de fila: 460px
            }
            this.tag('EpgContainerBounds.Slider').patch({ smooth: { y: targetY } });

            // PERFORMANCE: Culling vertical (ocultar filas lejanas)
            this._rowsComponents.forEach((row, idx) => {
                const distance = Math.abs(idx - rowIndex);
                row.visible = distance <= 3; // Mostrar solo 3 filas hacia arriba/abajo
            });
        } else {
            // Si el foco está en el selector de días, renderizamos las primeras filas
            this._rowsComponents.forEach((row, idx) => {
                row.visible = idx <= 3;
            });
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