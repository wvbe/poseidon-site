import EventEmitter from '../lib/classes/EventEmitter';

const explorationEmitter = new EventEmitter();
const explored = [];
const discovered = [];

export default function explorationAchievements (update) {
	update(update.DISCOVERED);

	const destroyer = explorationEmitter.on('change', () => {
		update(
			explored.length >= discovered.length ? update.ACHIEVED : update.REVEALED,
			`Exploration (${explored.length}/${discovered.length})`);
	});

	return destroyer;
}

export function createExplorationGoal (href = Symbol('unnamed exploration goal')) {
	if (!discovered.includes(href)) {
		discovered.push(href);
	}

	return () => {
		if (explored.includes(href)) {
			return;
		}

		explored.push(href);

		explorationEmitter.emit('change');
	}
}
export function createAchievementOnFirst (update) {
	update(update.DISCOVERED);

	const destroyer = explorationEmitter.on('change', () => {
		update(
			explored.length >= discovered.length ? update.ACHIEVED : update.REVEALED,
			`Exploration (${explored.length}/${discovered.length})`);
	});

	return destroyer;
}