import { aboutImages } from '../config/aboutImages';

export default function DataTypePage() {
	return (
		<>
			<h2>OpenStreetMap Data Types</h2>
			<p>
				There are three different types of data in OpenStreetMap, those
				being<strong> Nodes</strong>,<strong> Ways</strong> and
				<strong> Relations</strong>.
			</p>
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
			<img
				src={aboutImages.nodeExample}
				alt={`An example of a node data type displayed on a map`}
			/>
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
			<img
				src={aboutImages.wayExample}
				alt={`An example of a way data type displayed on a map`}
			/>
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
			<img
				src={aboutImages.relationExample}
				alt={`An example of a relation data type displayed on a map`}
			/>
		</>
	);
}
