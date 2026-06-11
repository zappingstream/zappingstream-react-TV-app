import { useEffect, useRef } from 'react';
import './TVPlayer.css';

interface TVPlayerProps {
    videoId: string;
    onClose: () => void;
}

export const TVPlayer = ({ videoId, onClose }: TVPlayerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const onCloseRef = useRef(onClose);
    const isClosing = useRef(false);

    // Mantenemos la referencia de onClose actualizada sin reiniciar el effect principal
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        containerRef.current?.focus();

        // Usar un hash (#) fuerza al WebView de Android a crear un paso real en el historial nativo.
        // pushState con URL vacía suele ser ignorado por el botón "Atrás" físico en las APKs.
        window.location.hash = 'player';

        const handleHashChange = () => {
            // Si el hash ya no es '#player', significa que el usuario retrocedió con el control
            if (window.location.hash !== '#player') {
                isClosing.current = true;
                onCloseRef.current();
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            // Si el componente se desmonta de otra manera, limpiamos el hash
            if (window.location.hash === '#player') {
                window.history.back();
            }
        };
    }, []);

    const handleManualClose = () => {
        if (isClosing.current) return;
        isClosing.current = true;
        
        if (window.location.hash === '#player') {
            window.history.back(); // Esto dispara hashchange y cierra orgánicamente
        } else {
            onCloseRef.current();
        }
    };

    return (
        <div 
            className="tv-player-overlay" 
            ref={containerRef} 
            tabIndex={0} 
            onKeyDown={(e) => {
                if (e.key === 'Escape' || e.key === 'Backspace') {
                    e.preventDefault(); // Evita que Android TV haga doble retroceso accidental
                    handleManualClose();
                }
            }}
        >
            <button className="tv-close-btn" onClick={handleManualClose} autoFocus>
                Atrás / Esc para salir
            </button>
            <iframe
                className="tv-iframe"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1&modestbranding=1&rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};