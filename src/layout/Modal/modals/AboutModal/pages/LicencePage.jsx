export default function LicencePage() {
	return (
		<>
			<h2>Licence Information</h2>

			<h3>OpenStreetMap Data</h3>

			<p>Streets Dashboard uses data from OpenStreetMap.</p>

			<p>
				OpenStreetMap data is made available under the{' '}
				<strong>Open Database Licence (ODbL) v1.0</strong>, which allows
				users to copy, distribute, modify, and build upon the data,
				provided that appropriate attribution is given and any publicly
				shared derivative databases are distributed under the same
				licence.
			</p>

			<p>© OpenStreetMap contributors.</p>

			<h3>{__APP_NAME__}</h3>

			<p>
				Streets Dashboard is an independent application that provides a
				graphical interface for exploring and exporting OpenStreetMap
				data. It is not affiliated with or endorsed by the OpenStreetMap
				Foundation.
			</p>

			<p>
				The licence for the application is separate from the
				OpenStreetMap data licence. Please refer to the project's source
				code repository or accompanying documentation for details of the
				application's software licence.
			</p>

			<h3>Third-Party Software</h3>

			<p>
				Streets Dashboard makes use of a number of open-source libraries
				and frameworks. These components remain subject to their own
				individual licences.
			</p>
		</>
	);
}
