let yin = require("./exports/users_remun_yin.json");
let yang = require("./exports/users_remun_yang.json");
let koi = require("./exports/users_remun_koi.json");
let koi_remun = require("./exports/remun-register-koi-1.json");
let yin_remun = require("./exports/remun-register-yin-1.json");

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

const dataObj = { yin, yang, koi };

const putVer = (data) => {
	let keys = Object.keys(data);
	let all = [];
	keys.forEach((k) => {
		let d = data[k].map((p) => ({ ...p, ver: k }));
		all = [...all, ...d];
	});

	return all;
};

const data = putVer(dataObj);

console.log();

const getVolCon = (d, filename) => {
	let data = d.reduce((p, c, a) => {
		p = {
			...p,
			[c.volunteerId]: p[c.volunteerId]
				? [...p[c.volunteerId], { id: c.userId, ver: c.ver }]
				: [{ id: c.userId, ver: c.ver }],
		};

		return p;
	}, {});

	data = JSON.stringify(data);

	fs.writeFileSync(
		`/home/jeevan/Documents/developer/asquire-vowtiar/src/functions/exports/${filename}.json`,
		data
	);
};

getVolCon(data, "volconcol");
