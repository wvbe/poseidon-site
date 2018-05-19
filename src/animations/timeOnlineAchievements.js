export default function timeOnlineAchievements (update) {
	update(update.REVEALED, 'Time  online');

	const timeOuts = [
		// setTimeout(() => update(update.REVEALED, 'Time online'), 3 * 1000),
		setTimeout(() => update(update.ACHIEVED, '15 seconds online'), 15 * 1000),
		// setTimeout(() => update(update.ACHIEVED, '1 minute online'), 60 * 1000),
		// setTimeout(() => update(update.ACHIEVED, '2.5 minutes online'), 2.5 * 60 * 1000),
	];

	const timeStart = Date.now();
	const intervals = [
		setInterval(() => update(update.ACHIEVED, Math.round((Date.now() - timeStart) / 60 / 1000) + ' minutes online'), 1 * 60 * 1000)
	];

	return () => {
		timeOuts.forEach(t => clearTimeout(t));
		intervals.forEach(i => clearInterval(i));
	};
}
