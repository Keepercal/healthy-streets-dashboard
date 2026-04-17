// Helper function to format the boundary name from a key (e.g. windmillHill) to a OSM value (e.g. Windmill Hill Ward)
const formatBoundaryName = (boundaryName) => {
    if (boundaryName === 'none') return '';

    const name = boundaryName
        .split('_') // split snake_case
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
        .join(' '); // join with spaces

    return name + ' Ward';
}

function callOverpass(query){
    // TODO: Modularise API call into its own function
}

// Fetch the boundary from Overpass
export async function fetchBoundary(boundaryName){
    try{
        console.info("ENTER fetchBoundary", {boundaryName})
        if (!boundaryName || boundaryName === 'none') return null;

        const formattedBoundaryName = formatBoundaryName(boundaryName);

        const query = `
            [out:json][timeout:60];
            relation["boundary"="political"]["name"~"${formatBoundaryName(boundaryName)}"];
            out geom meta;
        `;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        console.log(`fetching "${formattedBoundaryName}" boundary from Overpass...`)

        const res = await fetch(url);
        console.log("HTTP Status", res.status)

        if (res.status === 504){ // If HTTP 504, call function again
            console.warn(`fetchBoundary returned ${res.status}, retrying...`)
            return fetchBoundary(boundaryName);
        }

        if (!res.ok && res.status !== 504){ // Any other type of HTTP error, throw error to user
            console.info("EXIT fetchBoundary", {boundaryName});
            if (res.status === 429){
                throw new Error(
                    `HTTP Error: ${res.status} (${res.statusText}), try selecting the boundary again or wait a minute before selecting again`
                ); 
            } else{
                throw new Error(
                    `HTTP Error: ${res.status} (${res.statusText}), try selecting the boundary again`
                ); 
            }
            
        }

        const data = await res.json();

        if(!data?.elements?.length){ // Throw error if Overpass API returns empty object
            throw new Error(`Invalid boundary value "${boundaryName}". This mismatch likely caused an empty Overpass result.`)
        } else {
            console.clear()
            console.log(`success! recieved HTTP status ${res.status} (OK)`)
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

            out tags geom meta;
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
            console.log("Feature data:", data)
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