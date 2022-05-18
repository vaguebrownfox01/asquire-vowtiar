const yin = require("./users_remun_yin.json");
const yang = require("./users_remun_yang.json");
const koi = require("./users_remun_koi.json");
const fs = require("fs");

// console.log(koi);

const ex = {
	userName: "hmrishav",
	stimOrder: [],
	recordingDone: false,
	bioDataDone: true,

	recordCount: 0,
	stimCount: 0,
	bio: { weight: "70", gender: "m", height: "180", age: "22" },
	volunteerId: "saiforindia-a3e9036e",
	userId: "hmrishav-6b62eb0c",
	surveyDone: true,
	completed: 0,
	stepCount: 1,
};

const getVolCon = (d, filename) => {
	let data = d.reduce((p, c, a) => {
		p = {
			...p,
			[c.volunteerId]: p[c.volunteerId]
				? [...p[c.volunteerId], c.userId]
				: [c.userId],
		};

		return p;
	}, {});

	data = JSON.stringify(data);

	fs.writeFileSync(
		`/home/darwin/Desktop/SPIRE_Lab/Asquire/Webapp/asquire-nr/src/functions/${filename}.json`,
		data
	);
};

console.log(getVolCon([...yin, ...yang, ...koi], "volconcol"));
