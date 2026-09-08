import { helpImages } from '../config/helpImages';

export default function AddingLayersPage() {
	return (
		<>
			<h2>Adding layers to the map</h2>

			<p>
				To add layers to your map, you will first need to have a
				boundary selected. Any layers you subsequently load will be
				within the confines of that boundary, although some layers may
				creep outside of the boundary.
			</p>

			<p>
				The Add Layers panel contains a predefined list of features that
				OpenStreetMap has data of. To add a layer to your map, simply
				click on any of the options. In the buttom right corner you will
				see an indicator that your feature is loading.
			</p>

			<img
				src={helpImages.addLayersDraw}
				alt={`A screenshot of the ${__APP_NAME__} interface while a layer is loading.`}
			/>

			<p>
				If the layer you selected loads successfully, it will be added
				to the map. In this example, the map shows all pubs within
				Bristol.
			</p>

			<img
				src={helpImages.bristolPubs}
				alt={`A screenshot of the ${__APP_NAME__} interface with all pubs in Bristol displayed on the map`}
			/>

			<p>
				Simply repeat the process to add more layers to the map. Now the
				map is showing pubs as well as the Local Cycling Network in
				Bristol.
			</p>

			<img
				src={helpImages.multiplLayers}
				alt={`A screenshot of the ${__APP_NAME__} interface with all pubs in Bristol and the Local Cycling Network`}
			/>

			<p>
				Like selecting a boundary, you may encounter a timeout error. If
				this happens simply try loading the layer again. In the event
				that your selected boundary doesn't contain any feautres for the
				layer you selected, an error will popup in the bottom right
				corner.
				<br />
				<br />
				Be aware that as you add more data to your map, the application
				may slow down. Some layers can also be very large, for example
				if you were to load the whole bus network within Greater London.
			</p>

			<h2>Nodes, Ways & Relations</h2>

			<p>
				There are three different types of data in OpenStreetMap, those
				being<strong> Nodes</strong>,<strong> Ways</strong> and
				<strong> Relations</strong>.
			</p>

			<img
				src={helpImages.nodesWaysRelations}
				alt={`A screenshot of the ${__APP_NAME__} interface with all pubs in Bristol displayed on the map`}
			/>

			<h3>Node</h3>

			<p>
				A <strong>Node</strong> is a single point on the map that
				represents a specific location.
			</p>

			<p>
				Nodes are commonly used for features that exist at one location,
				such as a post box, bench, bus stop, or tree. They can also be
				used as the points that make up lines and areas.
			</p>

			<h3>Way</h3>

			<p>
				A <strong>Way</strong> is a series of connected points that
				forms either a line or an enclosed area.
			</p>

			<p>
				Ways are used to represent features such as roads, footpaths,
				rivers, buildings, parks, and fields. If the first and last
				points are connected, the way forms a closed shape representing
				an area.
			</p>

			<h3>Relation</h3>

			<p>
				A <strong>Relation</strong> is a collection of nodes, ways, and
				sometimes other relations that together describe a larger or
				more complex feature.
			</p>

			<p>
				Relations are used when a feature cannot be represented by a
				single node or way. For example, they can represent bus routes,
				hiking trails, administrative boundaries, or large areas made up
				of multiple sections.
			</p>
		</>
	);
}
