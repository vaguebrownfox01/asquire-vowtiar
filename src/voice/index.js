const { anonymousTransform } = require("./anonymous");
const { trollTransform } = require("./troll");
const { underwaterTransform } = require("./underwater");
const { reverseTimeTransform } = require("./reverseTime");
const { speedTransformSpeed } = require("./speed");
const { astronautTransform } = require("./astronaut");
const { insectTransform } = require("./insect");

export const txDetes = [
	{
		name: "Anonymous",
		key: "anon",
		description: "Distorted voice",
	},

	{
		name: "Slow",
		key: "slow",
		description: "Slow down time",
	},
	{
		name: "Quick",
		key: "quick",
		description: "Say it quick!",
	},
	{
		name: "Reverse",
		key: "reverse",
		description: "Do you speak in reverse?",
	},
	{
		name: "Maelstrom",
		key: "maelstrom",
		description: "Maelstrom Gang",
	},
	{
		name: "Underwater",
		key: "underwater",
		description: "Talking under water",
	},
	{
		name: "Astronaut",
		key: "astronaut",
		description: "On moon",
	},
	{
		name: "Insect",
		key: "insect",
		description: "Quite annoying...",
	},
];
export const transforms = {
	anon: anonymousTransform,
	slow: speedTransformSpeed(0.5),
	quick: speedTransformSpeed(1.5),
	reverse: reverseTimeTransform,
	maelstrom: trollTransform,
	underwater: underwaterTransform,
	astronaut: astronautTransform,
	insect: insectTransform,
};
