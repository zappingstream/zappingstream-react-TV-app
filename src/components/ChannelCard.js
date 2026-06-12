import { Lightning } from '@lightningjs/sdk';
import VideoCard from './VideoCard.js';
import { formatActivityDate, getFreshImage } from '../utils.js'; // Ajusta la ruta si es necesario

export default class ChannelCard extends Lightning.Component {
    static _template() {
        return {
            w: 320,
            h: 300,
            rect: true,
            color: 0xff1a1a1a, // bg-dark
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 15, stroke: 2, strokeColor: 0xff38b6ff }, // border: 2px solid var(--accent-blue)
            clipping: true,

            // Cabecera: Logo y Título
            Header: {
                y: 20,
                x: 20,
                w: 280,
                Logo: {
                    w: 32, h: 32,
                    alpha: 0, // Se muestra solo si hay imagen
                    shader: { type: Lightning.shaders.RoundedRectangle, radius: 16, stroke: 1, strokeColor: 0xff38b6ff }
                },
                Title: {
                    x: 42, y: 4,
                    text: {
                        text: '',
                        fontSize: 22,
                        fontFace: 'Bold',
                        textColor: 0xffffffff,
                        wordWrapWidth: 160,
                        maxLines: 1,
                        textOverflow: 'ellipsis'
                    }
                },
                InfoBtn: {
                    x: 220, y: 0, w: 60, h: 32,
                    rect: true, color: 0x00000000,
                    shader: { type: Lightning.shaders.RoundedRectangle, radius: 8, stroke: 1, strokeColor: 0xff38b6ff },
                    Text: { mount: 0.5, x: 30, y: 17, text: { text: 'Info', fontSize: 16, fontFace: 'Regular', textColor: 0xff38b6ff } }
                }
            },

            // Cuerpo: Contendrá las VideoCards dinámicamente
            Body: {
                y: 65,
                x: 20,
            },

            // Textos para la versión expandida (On-Demand)
            ExpandedInfo: {
                alpha: 0, // Oculto por defecto
                y: 65,
                x: 20,
                City: {
                    y: 190,
                    text: { text: '', fontSize: 18, textColor: 0xff38b6ff, fontFace: 'Bold' }
                },
                Desc: {
                    y: 225,
                    text: { text: '', fontSize: 18, textColor: 0xffdddddd, fontFace: 'Regular', wordWrapWidth: 410, maxLines: 10, lineHeight: 26 }
                }
            },

            // Pie de página: Última actividad
            Footer: {
                y: 250, // Se ajustará dinámicamente según la altura
                x: 160,
                mountX: 0.5,
                alpha: 1,
                Bg: {
                    mountX: 0.5, x: 0, y: 0,
                    rect: true, color: 0xff222222, // var(--bg-panel)
                    shader: { type: Lightning.shaders.RoundedRectangle, radius: 6, stroke: 1, strokeColor: 0xff333333 },
                    w: 200, h: 30
                },
                Text: {
                    mount: 0.5, x: 0, y: 16,

                    text: '',
                    fontSize: 16,
                    fontFace: 'Regular',
                    textColor: 0xffaaaaaa
                }
            }
        };
    }

    _construct() {
        this._failedVideos = new Set();
    }

    // Manejador del estado y propiedades
    set item(data) {
        this._item = data;
        this._updateLayout();
    }

    get item() {
        return this._item;
    }

    _updateLayout() {
        if (!this._item) return;

        const { channel, isExpanded, isLiveGroup } = this._item;

        // Lógica de filtrado de videos fallidos y ordenamiento
        let activeVideos = [];
        if (isLiveGroup && channel.Actives) {
            activeVideos = Object.values(channel.Actives)
                .filter(v => !this._failedVideos.has(v.VideoId))
                .sort((a, b) => {
                    if (a.IsPremiere && !b.IsPremiere) return 1;
                    if (!a.IsPremiere && b.IsPremiere) return -1;

                    const timeA = new Date(a.ActualStartTime || a.ScheduledStartTime || a.AddedAt || 0).getTime();
                    const timeB = new Date(b.ActualStartTime || b.ScheduledStartTime || b.AddedAt || 0).getTime();
                    return timeB - timeA;
                });
        }

        const mainActive = activeVideos.length > 0 ? activeVideos[0] : null;
        const restoActivos = activeVideos.slice(1);

        // Cálculo de dimensiones del componente contenedor
        let targetWidth = 320;
        let targetHeight = 300;

        if (isExpanded) {
            targetWidth = 450;
            targetHeight = 650; // Más alto para acomodar texto expandido
        } else if (isLiveGroup && restoActivos.length > 0) {
            targetWidth = 320 + (restoActivos.length * 295); // 280 de width de VideoCard + 15 de gap
        }

        this.w = targetWidth;
        this.h = targetHeight;

        this.tag('Header').w = targetWidth - 40;
        this.tag('Header.InfoBtn').x = targetWidth - 40 - 60;
        this.tag('Footer').x = targetWidth / 2;

        // --- Render Header ---
        const showMiniLogo = channel.ChannelImgUrl && (isExpanded || (isLiveGroup && mainActive));
        this.tag('Header.Logo').patch({
            src: showMiniLogo ? channel.ChannelImgUrl : null,
            alpha: showMiniLogo ? 1 : 0
        });
        this.tag('Header.Title').patch({
            text: { text: channel.ChannelName },
            x: showMiniLogo ? 45 : 0, // Empujamos el texto si hay logo
            text: { wordWrapWidth: targetWidth - 40 - 60 - (showMiniLogo ? 55 : 10) }
        });
        this.tag('Header.InfoBtn.Text').text.text = isExpanded ? 'Ocultar' : 'Info';

        // --- Render Body ---
        const bodyItems = [];
        this.tag('ExpandedInfo').alpha = 0;

        if (isExpanded) {
            // Modo Expandido
            bodyItems.push({
                type: VideoCard,
                w: 410, h: 256, // Expandido
                item: {
                    imageUrl: channel.ChannelBannerUrl ? `${channel.ChannelBannerUrl}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj` : channel.ChannelImgUrl,
                    altText: channel.ChannelName,
                    fallbackText: channel.ChannelName
                }
            });

            this.tag('ExpandedInfo').alpha = 1;
            this.tag('ExpandedInfo.City').text.text = channel.ChannelCity ? `📍 ${channel.ChannelCity}` : '';
            this.tag('ExpandedInfo.Desc').text.text = channel.ChannelDescription || "Sin descripción disponible.";

        } else if (isLiveGroup && mainActive) {
            // Modo Vivo con videos activos
            const primaryImageUrl = mainActive.ThumbnailUrl
                ? getFreshImage(mainActive.ThumbnailUrl, channel.LastActivityAt)
                : channel.ChannelImgUrl;

            bodyItems.push({
                type: VideoCard,
                item: {
                    imageUrl: primaryImageUrl,
                    altText: mainActive.Title || channel.ChannelName,
                    fallbackText: channel.ChannelName,
                    isLive: mainActive.Live !== false,
                    isPremiere: mainActive.IsPremiere,
                    onImageError: () => this._handleVideoError(mainActive.VideoId)
                }
            });

            restoActivos.forEach((activo, idx) => {
                bodyItems.push({
                    type: VideoCard,
                    x: 295 * (idx + 1), // Lo ubicamos a la derecha (280 + 15 gap)
                    item: {
                        imageUrl: activo.ThumbnailUrl ? getFreshImage(activo.ThumbnailUrl, channel.LastActivityAt) : undefined,
                        altText: activo.Title,
                        fallbackText: channel.ChannelName,
                        isLive: true,
                        isPremiere: activo.IsPremiere,
                        onImageError: () => this._handleVideoError(activo.VideoId)
                    }
                });
            });
        } else {
            // Modo On-Demand estándar
            bodyItems.push({
                type: VideoCard,
                item: {
                    imageUrl: channel.ChannelImgUrl,
                    altText: channel.ChannelName,
                    fallbackText: channel.ChannelName
                }
            });
        }

        this.tag('Body').children = bodyItems;

        // --- Render Footer ---
        this.tag('Footer').y = targetHeight - 40; // Posición al fondo
        const footerText = formatActivityDate ? formatActivityDate(channel.LastActivityAt) : channel.LastActivityAt;
        this.tag('Footer.Text').text.text = footerText;
        this.tag('Footer.Bg').w = footerText.length * 8 + 30;
    }

    // Equivalente a `setFailedVideos(prev => new Set(prev).add(id))`
    _handleVideoError(videoId) {
        if (!this._failedVideos.has(videoId)) {
            this._failedVideos.add(videoId);
        }
    }

    // --- Interacciones del Control Remoto ---

    _focus() {
        // Animación al enfocar la tarjeta (agrandado suave y resaltado de borde exagerado en TV)
        this.patch({
            smooth: { scale: 1.05 },
            color: 0xff333333, // background-color: #333
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 15, stroke: 8, strokeColor: 0xff38b6ff }, // outline: 8px solid var(--accent-blue)
            zIndex: 10
        });
        this.tag('Header.InfoBtn').patch({
            color: 0xff38b6ff, // background-color: var(--accent-blue)
            Text: { text: { textColor: 0xff1a1a1a } } // color: var(--bg-black)
        });
    }

    _unfocus() {
        this.patch({
            smooth: { scale: 1.0 },
            color: 0xff1a1a1a,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 15, stroke: 2, strokeColor: 0xff38b6ff }, // border: 2px solid var(--accent-blue)
            zIndex: 1
        });
        this.tag('Header.InfoBtn').patch({
            color: 0x00000000,
            Text: { text: { textColor: 0xff38b6ff } }
        });
    }

    // Se dispara cuando el usuario presiona "Enter" en el control
    _handleEnter() {
        const { channel, isExpanded, isLiveGroup, abrirCanal, abrirCanalOnStreams } = this._item;
        if (!isExpanded) {
            if (isLiveGroup && abrirCanal) abrirCanal(channel);
            else if (abrirCanalOnStreams) abrirCanalOnStreams(channel);
        }
    }

}