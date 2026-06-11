import { Lightning } from '@lightningjs/sdk';

export default class InfoModal extends Lightning.Component {
    static _template() {
        return {
            w: 1920,
            h: 1080,
            rect: true,
            color: 0xcc000000, // modal-overlay (fondo oscuro semi-transparente)
            alpha: 0, // Inicia oculto para poder animar su aparición

            Content: {
                mount: 0.5,
                x: 960,
                y: 540,
                w: 1300,
                h: 850,
                rect: true,
                color: 0xff1e1e1e, // Color de fondo del modal
                shader: { type: Lightning.shaders.RoundedRectangle, radius: 16 },

                Title: {
                    x: 650,
                    y: 60,
                    mountX: 0.5,
                    text: {
                        text: '¿Qué es Zapping Stream?',
                        fontSize: 48,
                        fontFace: 'Regular',
                        textColor: 0xffffffff
                    }
                },

                Body: {
                    x: 80,
                    y: 150,
                    text: {
                        // Unimos los párrafos con saltos de línea (\n)
                        text: 'Zapping Stream reúne todos los canales de streaming de Argentina en un solo lugar. El objetivo es brindarle a la comunidad un punto de acceso de descubrimiento de canales y contenido por fuera del algoritmo.\n\nEl sitio interactúa directo con YouTube: si se hace click en una tarjeta, el sitio enlaza directo al video o canal de Youtube. El sitio también permite buscar canales por nombre o ciudad.\n\nSe puede visualizar por canal o por transmisiones programadas. Nuestro propósito es facilitar el descubrimiento de contenido local y promover la visibilidad de todos los creadores y medios independientes.',
                        fontSize: 28,
                        fontFace: 'Regular',
                        textColor: 0xddffffff,
                        wordWrapWidth: 1140,
                        lineHeight: 40
                    }
                },

                Contact: {
                    x: 650,
                    y: 470,
                    mountX: 0.5,
                    text: {
                        text: 'Si tu canal no aparece en la lista y querés sumarlo, o si deseás solicitar\nla baja de tu contenido, escribinos a: contacto@zappingstream.com',
                        fontSize: 26,
                        fontFace: 'Regular',
                        textColor: 0xfffbb03b, // Color de acento
                        wordWrapWidth: 1140,
                        lineHeight: 40,
                        textAlign: 'center'
                    }
                },

                Legal: {
                    x: 80,
                    y: 600,
                    text: {
                        text: 'Al utilizar este sitio, aceptas los Términos de Servicio de YouTube y la Política de Privacidad de Google. Los logos, miniaturas, nombres y descripciones son extraídos directamente de YouTube API Services.\n\nEste sitio es un directorio de canales independiente. No alojamos ni retransmitimos contenido propio. Todos los videos, marcas y logotipos son propiedad exclusiva de sus respectivos creadores y se visualizan a través del reproductor oficial de YouTube.',
                        fontSize: 22,
                        fontFace: 'Regular',
                        textColor: 0xffaaaaaa,
                        wordWrapWidth: 1140,
                        lineHeight: 32
                    }
                },

                // Nuestro botón de "Volver"
                Button: {
                    x: 650,
                    y: 750,
                    mountX: 0.5,
                    w: 240,
                    h: 60,
                    rect: true,
                    color: 0xff444444, // Fondo del botón por defecto
                    shader: { type: Lightning.shaders.RoundedRectangle, radius: 8 },
                    Text: {
                        mount: 0.5,
                        x: 120,
                        y: 30,
                        text: {
                            text: 'Volver',
                            fontSize: 28,
                            fontFace: 'Regular',
                            textColor: 0xffffffff
                        }
                    }
                }
            }
        };
    }

    // Equivalente al "props.onClose"
    set onClose(callback) {
        this._onCloseCallback = callback;
    }

    // Cuando el modal pasa a estar activo (se muestra en pantalla)
    _active() {
        this.patch({
            smooth: { alpha: 1 } // Fade In suave
        });
    }

    // Cuando el componente pasa a estar inactivo (se oculta)
    _inactive() {
        this.alpha = 0;
    }

    // === Manejo del Control Remoto ===

    // Este método captura el foco general del componente
    _getFocused() {
        return this;
    }

    // Se dispara cuando el usuario aprieta la tecla OK/Enter
    _handleEnter() {
        if (this._onCloseCallback) this._onCloseCallback();
    }

    // Se dispara cuando el usuario aprieta la tecla Atrás/Back
    _handleBack() {
        if (this._onCloseCallback) this._onCloseCallback();
    }

    // Efecto visual de "Seleccionado" sobre el botón Volver
    _focus() {
        this.tag('Button').patch({
            color: 0xfffbb03b, // Cambia al color de acento
            Text: { text: { textColor: 0xff000000 } }, // Texto negro
            smooth: { scale: 1.05 } // Se agranda un poquito
        });
    }

    // Efecto visual cuando pierde el foco (en este caso, cuando se cierra)
    _unfocus() {
        this.tag('Button').patch({
            color: 0xff444444,
            Text: { text: { textColor: 0xffffffff } },
            smooth: { scale: 1.0 }
        });
    }
}