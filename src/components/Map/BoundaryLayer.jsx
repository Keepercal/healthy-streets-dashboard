import { GeoJSON } from 'react-leaflet'

export default function BoundarLayer({ boundary }) {
    return (
        <GeoJSON
            data={boundary}
            style={{
                color: "red",
                weight: 2,
                fillOpacity: 0.05,
            }}
        />
    )
}