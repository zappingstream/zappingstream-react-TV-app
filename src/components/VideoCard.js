import { Lightning } from '@lightningjs/sdk';

export default class VideoCard extends Lightning.Component {
    static _template() {
        return {
            w: 280, // Candado base para grilla normal
            h: 175, // Aspect ratio 16:10
            rect: true,
            color: 0xff111111, // var(--bg-black)
            clipping: true, // Evita que la imagen se salga de los bordes
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 8 },

            Fallback: {
                w: w => w,
                h: h => h,
                rect: true,
                color: 0xff333333, // Fondo gris del fallback
                Text: {
                    mount: 0.5,
                    x: w => w / 2,
                    y: h => h / 2,
                    text: {
                        text: '?',
                        fontSize: 64,
                        fontFace: 'Regular',
                        textColor: 0xff38b6ff, // Letra color celeste
                    }
                }
            },

            Image: {
                w: w => w,
                h: h => h,
                alpha: 1, // DEBE iniciar en 1 para que WebGL fuerce la descarga de la textura
            },

            Badge: {
                mountX: 1,
                mountY: 1,
                x: w => w - 8,
                y: h => h - 8,
                rect: true,
                color: 0x00000000, // Transparente por defecto
                alpha: 0,
                shader: { type: Lightning.shaders.RoundedRectangle, radius: 4 },

                Dot: {
                    w: 6, h: 6,
                    x: 8, mountY: 0.5, y: 13,
                    rect: true,
                    color: 0xffffffff,
                    shader: { type: Lightning.shaders.RoundedRectangle, radius: 3 },
                    alpha: 0 // Oculto por defecto
                },
                Text: {
                    x: 8, // Dinámico si hay punto
                    mountY: 0.5, y: 14, // Compensación visual vertical
                    text: {
                        text: '',
                        fontSize: 14, // Equivalente a 0.75rem
                        fontFace: 'Regular',
                        textColor: 0xffffffff,
                    }
                }
            }
        };
    }

    _init() {
        // Animación de titilar para el badge de Vivo/Estreno
        this._blinkAnim = this.tag('Badge.Dot').animation({
            duration: 1.2,
            repeat: -1,
            actions: [
                { p: 'alpha', v: { 0: 1, 1: 0.3 } }
            ]
        });

        // Escuchar error en la carga de la imagen
        this.tag('Image').on('txError', () => {
            this._handleImageError();
        });

        // Escuchar cuando la imagen carga exitosamente
        this.tag('Image').on('txLoaded', () => {
            // Si está todo bien, mostramos la imagen
            this.tag('Image').alpha = 1;
            this.tag('Fallback').alpha = 0;
        });
    }

    _handleImageError() {
        this.tag('Image').alpha = 0;
        this.tag('Fallback').alpha = 1;
        const letter = this._fallbackText ? this._fallbackText.substring(0, 1).toUpperCase() : '?';
        this.tag('Fallback.Text').text.text = letter;

        // Llama al callback de error si fue provisto
        if (this.onImageError) {
            this.onImageError();
        }
    }

    // Setter equivalente a pasarle "props" desde React
    set item(data) {
        this._imageUrl = data.imageUrl;
        this._fallbackText = data.fallbackText;
        this.onClick = data.onClick;
        this.onImageError = data.onImageError;

        // Si hay imagen, asigarla para iniciar la carga
        if (this._imageUrl) {
            this.tag('Fallback').alpha = 1; // Aseguramos que el fallback se vea mientras carga
            this.tag('Image').alpha = 1; // Restauramos la visibilidad por si se reusa la tarjeta

            // OPTIMIZACIÓN: Pedir miniatura de menor peso (mqdefault 320x180) de YouTube
            let finalSrc = this._imageUrl.replace(/(maxresdefault|hqdefault|sddefault)\.jpg/i, 'mqdefault.jpg');

            // --- SOLUCIÓN DEFINITIVA A CORS EN WEBGL ---
            // WebGL es estricto: si YouTube no envía la cabecera CORS, la textura colapsa.
            // Pasamos las imágenes de Google/YouTube por un Image CDN (wsrv.nl) que fuerza el CORS.
            if (finalSrc.includes('ytimg.com') || finalSrc.includes('youtube.com') || finalSrc.includes('ggpht.com')) {
                finalSrc = `https://wsrv.nl/?url=${encodeURIComponent(finalSrc)}&w=400&output=webp`;
            }

            this.tag('Image').src = finalSrc;
        } else {
            this._handleImageError();
        }

        this._updateBadge(data);
    }

    _updateBadge({ isLive, isPremiere, isPast, isUpcoming }) {
        const badge = this.tag('Badge');
        const label = this.tag('Badge.Text');
        const dot = this.tag('Badge.Dot');
        badge.alpha = 1;

        let text = '';
        let hasDot = false;
        let textColor = 0xffffffff;
        let strokeColor = 0x00000000;
        let strokeWidth = 0;

        // Colores base equivalentes a las variables de tu CSS original
        const PREMIERE_COLOR = 0xff0055ff; // Azul
        const LIVE_COLOR = 0xffff0000; // Rojo
        const PAST_BG = 0xe6000000; // rgba(0,0,0,0.9)
        const PAST_TEXT = 0xffbbbbbb; // Gris texto
        const UPCOMING_BG = 0xc03d3d3c; // rgba(61,61,60,0.75)

        if (isLive) {
            badge.color = isPremiere ? PREMIERE_COLOR : LIVE_COLOR;
            text = isPremiere ? 'ESTRENO' : 'EN VIVO';
            hasDot = true;
            strokeWidth = isPremiere ? 1 : 0;
            strokeColor = PREMIERE_COLOR;
        } else if (isPast) {
            badge.color = PAST_BG;
            textColor = PAST_TEXT;
            text = isPremiere ? 'ESTRENADO' : 'FINALIZADO';
            strokeWidth = 1;
            strokeColor = isPremiere ? 0xff002a80 : 0xff800000; // color-mix black 50%
        } else if (isUpcoming) {
            badge.color = UPCOMING_BG;
            text = isPremiere ? 'ESTRENO PROG.' : 'PROGRAMADO';
            strokeWidth = 1;
            strokeColor = isPremiere ? PREMIERE_COLOR : LIVE_COLOR;
        } else {
            badge.alpha = 0; // Ocultar si no cumple ninguna condición
            if (this._blinkAnim) this._blinkAnim.pause();
            return;
        }

        label.text.text = text;
        label.text.textColor = textColor;

        if (hasDot) {
            dot.alpha = 1;
            label.x = 20; // Hacemos lugar para el punto
            if (this._blinkAnim && !this._blinkAnim.isPlaying()) this._blinkAnim.play();
            badge.w = text.length * 8 + 30; // Aproximación ancho con punto
        } else {
            dot.alpha = 0;
            label.x = 8;
            if (this._blinkAnim) this._blinkAnim.pause();
            badge.w = text.length * 8 + 16; // Aproximación ancho sin punto
        }

        badge.h = 26; // Alto fijo para el fondo
        badge.shader = { type: Lightning.shaders.RoundedRectangle, radius: 4, stroke: strokeWidth, strokeColor };
    }

    // Equivalente al onClick en la TV (Apretar OK/Enter en el control remoto)
    _handleEnter() {
        if (this.onClick) {
            this.onClick(this);
        }
    }

    // Efecto visual cuando navegas hacia la tarjeta
    _focus() {
        this.patch({
            smooth: { scale: 1.05 }
        });
    }

    // Efecto visual cuando sales de la tarjeta
    _unfocus() {
        this.patch({
            smooth: { scale: 1.0 }
        });
    }
}