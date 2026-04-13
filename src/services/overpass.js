export async function fetchWardBoundary(wardName){
    if (!wardName || wardName === 'none') return null;

    const formatWardName = (wardName) => {
        if (wardName === 'none') return '';

        const name = wardName.replace(/([A-Z])/g, ' $1');
        return name.replace(/^./, str => str.toUpperCase()) + ' Ward';
    }

    const query = `
        [out:json][timeout:100];
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

    if(!data?.elements?.length){
        throw new Error(`Bug: Invalid ward value "${wardName}". This mismatch likely caused an empty Overpass result.`)
    }

    return data;
}

export async function fetchMapFeature(wardName, feature){
    if(!wardName || wardName === 'none') return null;

    const formatWardName = (wardName) => {
        if (wardName === 'none') return '';

        const name = wardName.replace(/([A-Z])/g, ' $1');
        return name.replace(/^./, str => str.toUpperCase()) + ' Ward';
    }

    const query = `
        [out:json][timeout:100];
        relation["boundary"="political"]["name"~"${formatWardName(wardName)}"];
        out geom;
    `;

    console.log(formatWardName(wardName))
}