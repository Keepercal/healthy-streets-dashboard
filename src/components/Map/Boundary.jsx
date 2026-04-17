import { GeoJSON } from 'react-leaflet'

export default function Boundary({ boundary }) {
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