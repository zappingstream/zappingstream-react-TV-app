const API_URL = 'https://zappingstream-api.vercel.app/provinces';

export const getProvinces = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        const cityProvinceMap = {};
        const provinces = [];

        data.forEach(prov => {
            provinces.push(prov.name);
            prov.cities.forEach(city => {
                cityProvinceMap[city] = prov.name;
            });
        });

        return { cityProvinceMap, provinces: provinces.sort() };

    } catch (error) {
        console.error("Error al obtener las provincias:", error);
        throw error;
    }
};