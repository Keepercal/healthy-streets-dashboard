export default async function fetchWardBoundary(wardName){
    if (!wardName || wardName === 'none') return null;

    const formatWardName = (wardName) => {
        if (wardName === 'none') return '';

        const name = wardName.replace(/([A-Z])/g, ' $1');
        return name.replace(/^./, str => str.toUpperCase()) + ' Ward';
    }

    const query = `
        [out:json][timeout:25];
        relation["boundary"="political"]["name"~"${formatWardName(wardName)}"]
        out geom;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try{
        const res = await fetch(url)
        const data = await res.json();
        console.log(data); // contains the cordinates of the ward
        return data;
    } catch (error){
        console.error('Error fetching ward boundary:', error);
        return null;
    }
}