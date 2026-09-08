/* Returns edit age in days */
export default function getDaysSinceEdit(timestamp) {
	if (!timestamp) return null;

	const editedDate = new Date(timestamp);
	return (Date.now() - editedDate.getTime()) / (1000 * 60 * 60 * 24);
}
