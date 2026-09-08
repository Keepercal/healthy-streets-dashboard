import { helpImages } from '../config/helpImages';

export default function GettingStartedPage() {
	return (
		<>
			<h2>Getting started with {__APP_NAME__}</h2>

			<p>
				In order to make the most of {__APP_NAME__}, it is recommended
				that you farmiliarise yourself with OpenStreetMap. OpenStreetMap
				is a free, open-source map of the entire world that is built,
				edited and maintained by a global community of volunteers.
				Places from the largest of cities to the tiniest of hamlets will
				have at least some OpenStreetMap data.
			</p>

			<img
				src={helpImages.openStreetMap}
				alt="A screenshot of the OpenStreetMap interface."
			/>

			<p>
				{__APP_NAME__} uses OpenStreetMap boundaries for querying, where
				every feature has a relation to a boundary. Some boundaries are
				simple to find, such as "Bristol" which will appear as one of
				the first results. Others, such as electoral ward boundaries
				within Bristol, may be more difficult to search if you don't
				know what you are looking for.
			</p>

			<p>
				If you cannot find the particular boundary you are looking for
				in the boundary search, head to
				<a href="https://www.openstreetmap.org/"> OpenStreetMap.org</a>.
				Find your desired location on the map, and click the "Query"
				button (the question mark on the right side of the interface).
			</p>

			<img
				src={helpImages.queryOSM}
				alt="A screenshot of the OpenStreetMap interface with an arrow pointing at the query button."
			/>

			<p>
				Typically you will want to look for Administrative Boundaries,
				however most of the boundaries under the "Enclosing features"
				section will work. The value you will want to type into the
				boundary search box within {__APP_NAME__} will be the text
				highlighted in blue.
			</p>

			<img
				src={helpImages.locateBoundary}
				alt="A screenshot of the OpenStreetMap interface with an arrow pointing at the query button."
			/>

			<p>
				When you have found your desired boundary, simply type it into
				the search box and click search. After a loading period your
				boundary should then appear in the list. Click on it to load it,
				and if successful your boundary will be highlighted on the map.
				<br />
				<br />
				Clicking the <strong>Remove Boundary</strong> button will delete
				the current boundary, as well as any layers you have loaded, so
				be careful!
			</p>

			<img
				src={helpImages.searchBoundary}
				alt={`A screenshot of the ${__APP_NAME__} interface, showing the boundary select drawer and Bristol as the selected boundary`}
			/>

			<p>
				When trying to load boundaries and layers, you may encounter
				timeout errors. As {__APP_NAME__} uses an API to interact with
				the OpenStreetMap server, the request may timeout due to a lack
				of bandwidth. Simply try loading the boundary or layer again.
			</p>
		</>
	);
}
