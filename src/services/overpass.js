export async function fetchWardBoundary(wardName){
    if (!wardName || wardName === 'none') return null;

    const formatWardName = (wardName) => {
        if (wardName === 'none') return '';

        const name = wardName.replace(/([A-Z])/g, ' $1');
        return name.replace(/^./, str => str.toUpperCase()) + ' Ward';
    }

    const query = `
        [out:json][timeout:25];
        relation["boundary"="political"]["name"~"${formatWardName(wardName)}"];
        out geom;
    `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const res = await fetch(url);

    if (!res.ok){
        throw new Error(`HTTP Error: ${res.status} (${res.statusText}), try selecting the ward again`)
    }

    const data = await res.json();

    console.log("boundary data:", data)

    return data;
}