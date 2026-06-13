import { Lightning } from '@lightningjs/sdk';
import VideoCard from './VideoCard.js';
import { formatActivityDate, getFreshImage } from '../utils.js'; // Ajusta la ruta si es necesario

export default class ChannelCard extends Lightning.Component {
    static _template() {
        return {
            w: 380,
            h: 320,
            rect: true,
            color: 0xff1a1a1a, // bg-dark
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 15, stroke: 0, strokeColor: 0x00000000 },
            clipping: true,

            // Cabecera: Logo y Título
            Header: {
                y: 20,
                x: 20,
                w: 340,
                Logo: {
                    w: 32, h: 32,
                    alpha: 0, // Se muestra solo si hay imagen
                    shader: { type: Lightning.shaders.RoundedRectangle, radius: 16 }
                },
                Title: {
                    x: 42, y: 4,
                    text: {
                        text: '',
                        fontSize: 26,
                        fontFace: 'Regular',
                        textColor: 0xffffffff,
                        wordWrapWidth: 200,
                        maxLines: 1,
                        textOverflow: 'ellipsis'
                    }
                },
                InfoBtn: {
                    x: 260, y: 0, w: 80, h: 36,
                    rect: true, color: 0x00000000,
                    shader: { type: Lightning.shaders.RoundedRectangle, radius: 8, stroke: 1, strokeColor: 0xff888888 },
                    Text: { mount: 0.5, x: 40, y: 19, text: { text: 'Info', fontSize: 20, fontFace: 'Regular', textColor: 0xff888888 } }
                }
            },

            // Cuerpo: Contendrá las VideoCards dinámicamente
            Body: {
                y: 75,
                x: 20,
            },

            // Textos para la versión expandida (On-Demand)
            ExpandedInfo: {
                alpha: 0, // Oculto por defecto
                y: 75,
                x: 20,
                City: {
                    y: 280,
                    text: { text: '', fontSize: 22, textColor: 0xff38b6ff, fontFace: 'Bold' }
                },
                Desc: {
                    y: 320,
                    text: { text: '', fontSize: 20, textColor: 0xffdddddd, fontFace: 'Regular', wordWrapWidth: 460, maxLines: 10, lineHeight: 30 }
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

        this._activeVideos = activeVideos;

        const mainActive = activeVideos.length > 0 ? activeVideos[0] : null;
        const restoActivos = activeVideos.slice(1);

        // Cálculo de dimensiones del componente contenedor
        let targetWidth = 380;
        let targetHeight = 320;

        if (isExpanded) {
            targetWidth = 500;
            targetHeight = 720; // Más alto para acomodar texto expandido
        } else if (isLiveGroup && restoActivos.length > 0) {
            targetWidth = 380 + (restoActivos.length * 355); // 340 de width de VideoCard + 15 de gap
        }

        this.w = targetWidth;
        this.h = targetHeight;

        this.tag('Header').w = targetWidth - 40;
        this.tag('Header.InfoBtn').x = targetWidth - 40 - 80;

        // --- Render Header ---
        const showMiniLogo = channel.ChannelImgUrl && (isExpanded || (isLiveGroup && mainActive));
        this.tag('Header.Logo').patch({
            src: showMiniLogo ? channel.ChannelImgUrl : null,
            alpha: showMiniLogo ? 1 : 0
        });
        this.tag('Header.Title').patch({
            x: showMiniLogo ? 45 : 0,
            text: { 
                text: channel.ChannelName + ' ',
                wordWrapWidth: targetWidth - 40 - 80 - (showMiniLogo ? 55 : 10)
            }
        });
        this.tag('Header.InfoBtn.Text').text.text = isExpanded ? 'Ocultar' : 'Info';

        // --- Render Body ---
        const bodyItems = [];
        this.tag('ExpandedInfo').alpha = 0;

        if (isExpanded) {
            // Modo Expandido
            bodyItems.push({
                type: VideoCard,
                w: 460, h: 258, // Expandido
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
                w: 340, h: 191,
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
                    w: 340, h: 191,
                    x: 355 * (idx + 1), // Lo ubicamos a la derecha (340 + 15 gap)
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
                w: 340, h: 191,
                item: {
                    imageUrl: channel.ChannelImgUrl,
                    altText: channel.ChannelName,
                    fallbackText: channel.ChannelName
                }
            });
        }

        this.tag('Body').children = bodyItems;
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
            color: 0xff2a2a2a, // background-color un poquito más claro
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 15, stroke: 4, strokeColor: 0xff38b6ff }, // Borde celeste 4px
            zIndex: 10
        });
    }

    _unfocus() {
        this.patch({
            smooth: { scale: 1.0 },
            color: 0xff1a1a1a,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 15, stroke: 0, strokeColor: 0x00000000 }, // Sin borde inactivo
            zIndex: 1
        });
    }

    // Se dispara cuando el usuario presiona "Enter" en el control
    _handleEnter() {
        const { channel, isExpanded, isLiveGroup, abrirCanal, abrirCanalOnStreams } = this._item;
        if (!isExpanded) {
            if (isLiveGroup) {
                if (this._activeVideos && this._activeVideos.length > 1) {
                    this.fireAncestors('$onSelectStream', { channel, activeVideos: this._activeVideos });
                } else if (abrirCanal) {
                    abrirCanal(channel);
                }
            } else if (abrirCanalOnStreams) {
                abrirCanalOnStreams(channel);
            }
        }
    }

}