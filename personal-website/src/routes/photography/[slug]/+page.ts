import { error } from '@sveltejs/kit';
import { getPhotoTrip, photoTrips } from '$lib/content/photography';

export const entries = () => photoTrips.map((trip) => ({ slug: trip.slug }));

export const load = ({ params }) => {
	const trip = getPhotoTrip(params.slug);

	if (!trip) {
		error(404, 'Photo trip not found');
	}

	return { trip };
};
