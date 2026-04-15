// Format the boundary name from a key (e.g. windmillHill) to a OSM value (e.g. Windmill Hill Ward)
const formatBoundaryName = (boundaryName) => {
    if (boundaryName === 'none') return '';

    const name = boundaryName.replace(/([A-Z])/g, ' $1');
    return name.replace(/^./, str => str.toUpperCase()) + ' Ward';
}

export async function fetchBoundary(boundaryName){
    try{
        console.info("ENTER fetchBoundary", {boundaryName})
        if (!boundaryName || boundaryName === 'none') return null;

        const formattedBoundaryName = formatBoundaryName(boundaryName);

        const query = `
            [out:json][timeout:60];
            relation["boundary"="political"]["name"~"${formatBoundaryName(boundaryName)}"];
            out geom;
        `;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        console.log(`fetching "${formattedBoundaryName}" boundary from Overpass...`)

        const res = await fetch(url);
        console.log("HTTP Status", res.status)

        if (res.status === 504){
            console.warn(`fetchBoundary returned ${res.status}, retrying...`)
            return fetchBoundary(boundaryName);
        }

        if (!res.ok && res.status !== 504){
            console.info("EXIT fetchBoundary", {boundaryName});
            throw new Error(
                `HTTP Error: ${res.status} (${res.statusText}), try selecting the boundary again`
            );
        }

        const data = await res.json();

        if(!data?.elements?.length){
            throw new Error(`Invalid boundary value "${boundaryName}". This mismatch likely caused an empty Overpass result.`)
        } else {
            console.clear()
            console.log(`success! recieved HTTP status ${res.status}, clearing console...`)
            console.log("Boundary data:", data)

            return data;
        }
    }catch(err){
        console.error("fetchBoundary failed:", err);
        throw err;
    }
}

export async function fetchMapFeature(boundaryName, tag, value, type){
    try{
        console.log("ENTER fetchMapFeature", { boundaryName, tag, value, type })
        if(!boundaryName || boundaryName === 'none') return null;

        const formattedBoundaryName = formatBoundaryName(boundaryName);

        const query = `
            [out:json][timeout:60];

            relation
                ["boundary"="political"]
                ["name"~"${formattedBoundaryName}", i]->.rels;
            .rels map_to_area -> .area;

            ${type}(area.area)["${tag}"="${value}"];

            out tags geom;
            `;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        console.log("Fetching features from Overpass...")

        const res = await fetch(url);
        console.log("HTTP Status", res.status)

        if (res.status === 504){
            console.warn(`fetchMapFeature returned ${res.status}, retrying...`)
            return fetchMapFeature(boundaryName, tag, value, type);
        }

        if (!res.ok && res.status !== 504){
            console.info("EXIT fetchMapFeature", {boundaryName});
            throw new Error(
                `HTTP Error: ${res.status} (${res.statusText}), try selecting the feature again`
            );
        }

        const data = await res.json();

        if(!data?.elements?.length){
            throw new Error(`Overpass API returned an empty result`)
        }else{
            console.clear()
            console.log(`success! recieved HTTP status ${res.status}, clearing console...`)
            console.log("Feature data:", data)

            return data;
        }

    } catch(err){
        console.error("fetchMapFeature failed:", err)
        throw err;
    }

}