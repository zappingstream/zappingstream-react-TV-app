const API_URL = 'https://zappingstream-api.vercel.app/channels';

export const getChannels = async () => {
    try {
        // 4. Obtener el token validado por reCAPTCHA
        // Ejemplo de cómo podrías obtenerlo (dependerá de la librería que uses):
        // const token = await getRecaptchaToken();

        // 5. Adjuntar el token en los headers de tu fetch original
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Descomenta la siguiente línea y ajusta la cabecera según lo que espere tu backend:
                // 'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (!data) {
            return [];
        }

        // Recorremos los canales y filtramos los videos internos con ToBeCut = true
        return data.map(channel => {
            const filterVideos = (videos) => {
                if (!videos) return videos;
                // Soportar tanto arrays como diccionarios (objetos)
                if (Array.isArray(videos)) {
                    return videos.filter((v) => v.ToBeCut !== true);
                }
                return Object.fromEntries(
                    Object.entries(videos).filter(([_, v]) => v.ToBeCut !== true)
                );
            };

            return {
                ...channel,
                Actives: filterVideos(channel.Actives),
                Upcoming: filterVideos(channel.Upcoming),
                Past: filterVideos(channel.Past)
            };
        });

    } catch (error) {
        console.error("Error al obtener los canales:", error);
        throw error;
    }
};