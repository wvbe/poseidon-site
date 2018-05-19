import React from 'react';

import ForgetFeed from './ui/ForgetFeed';
import Button from './ui/Button';

import startFakeNews from './animations/startFakeNews';
import World from "./World";
import events from "./events";
import HomepageAchievements from "./world/HomepageAchievements";
import LogFeed from './ui/LogFeed';
import AnimatedBackground from "./AnimatedBackground";
import hasBlink from './ui/hasBlink';

import {
	createExplorationGoal,
	createFirstExplorationTrigger
} from './animations/explorationAchievements';

const initialFakeNews = [
	['init', 'Connected to http://wyb.be, welcome ANON'],
	['ws', '0x://websocket'],
	['http', '101 Switching Protocols'],
	['ws', 'Upgrade (websocket)'],
	['', 'permessage-deflate; client_max_window_bits'],
	['', 'MeIy8A1qAhcqufFKmIr/qw=='],
	['', 'aLE6oM0LDpu0+YGAiEbKf4Qnx98='],
	['usr', 'ANON user (wyb.be v1000)'],
	['usr', 'Loading profile'],
	// ['usr', navigator.userAgent]
];
setTimeout(() => {
	startFakeNews('fake-news')
}, 2000);

let i = 0;
const tickerMessages = [
	'/ critical error',
	'- critical error',
	'\\ critical error',
	'| critical error'
];
setInterval(() => events.emit('ticker', tickerMessages[i++ % tickerMessages.length]), 500);

const explorationAchievements = {
	github: createExplorationGoal(),
	linkedin: createExplorationGoal(),
	cat: createFirstExplorationTrigger('cat', 'Clicked the cat pic first lol'),
	cv: createFirstExplorationTrigger('cv', 'Went straight for the CV')
}

const subjects = [
	'web', 'responsive', 'interaction', 'tech', 'schema', 'nodejs', 'full-stack', 'intergalactic',
	'usability', 'experience', 'multi-disciplinary', 'open-source', 'frontend', 'art', 'devops', 'graphic',
	'software', 'creative', 'javascript', 'pixel', 'internet', 'communications'
];

const roles = [
	'developer', 'designer', 'enthousiast', 'guru', 'ninja', 'wizard', 'harry', 'programmer', 'engineer',
	'professional', 'architect', 'evangelist', 'strategist', 'consultant', 'technician', 'master', 'hacker',
	'guy', 'person', 'buddy', 'pusher'
];

function getRandomJobTitle () {
	return [
		subjects[Math.floor(subjects.length * Math.random())],
		roles[Math.floor(subjects.length * Math.random())]
	].join(' ');
}

setTimeout(() => setInterval(() => events.emit('jobTicker', getRandomJobTitle()), 100), 3000);

const BlinkFast = hasBlink(({ children }) => <span>{ children }</span>, { interval: 1000 });
export default function App () {
    return [
		<AnimatedBackground
			key={'the rotating circular thing in the background'}
		/>,
		<World
			key={'the isometric world of html, css transform and svg'}
			renderHeaderSection={() => <div>
				<div>wybe minnebo</div>
				<LogFeed
					eventName={'jobTicker'}
					initial={['(calculating job titles)']}
					maxHistory={1} />
				<div>and shenanigans</div>
				<p><BlinkFast>★</BlinkFast>★★★★</p>
				<Button url={'https://github.com/wvbe'} onClick={explorationAchievements.github}>GitHub </Button>
				<Button url={'https://www.linkedin.com/in/wybeminnebo/'} onClick={explorationAchievements.linkedin}>LinkedIn</Button>
			</div>}

			renderSecondaryButtons={() => <div>
				<Button url={'resume-of-wybe-minnebo--wyb.be--2018.pdf'} small={true} onClick={explorationAchievements.cv}>curriculum vitae</Button>
				<Button url={'picture-of-my-cat.jpg'} small={true} onClick={explorationAchievements.cat}>picture of my cat</Button>
			</div>}

			renderLogSection={() => <ForgetFeed
				initial={initialFakeNews}
				eventName={'fake-news'}a
			/>}

			renderAchievementsSection={() => <HomepageAchievements initialTicker={['critical error']} />}
		/>,

	]
}
