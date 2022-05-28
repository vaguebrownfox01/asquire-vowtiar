const fs = require("fs");
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceConfig3.json");

const {
	DATABASE_URL,
	CONTENT_COLLECTION,
	STIM_DOC,
	SURVEY_DOC,
	STORAGE_BUCKET,
	INSTRUCTION_AUDIO_FOLDER,
} = require("./firebaseSetup");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: DATABASE_URL,
	storageBucket: STORAGE_BUCKET,
});

const db = admin.firestore();
const stor = admin.storage();
const bucket = stor.bucket();

const setSurveyQuestions = async () => {
	const questionRef = db.collection(CONTENT_COLLECTION).doc(SURVEY_DOC);
	const { questions } = require("../fetch/questions");

	if (questions) {
		await questionRef.set(questions);
		console.log("Done uploading questions");
	} else {
		console.log("Failed to upload questions");
	}
};

const setStims = async () => {
	const stimRef = db.collection(CONTENT_COLLECTION).doc(STIM_DOC);
	const { stimulus } = require("../fetch/stimulus");

	const data = await bucket.getFiles({ prefix: INSTRUCTION_AUDIO_FOLDER });

	let files = data[0];
	let stimsUrls = {};

	for (let file of files) {
		let url = await file
			.getSignedUrl({ action: "read", expires: "04-19-2025" })
			.catch((err) => console.log("url error", err));

		let name = file.name.replace(/^.*[\\\/]/, "").slice(0, -4);
		stimsUrls[name] = url[0];
	}

	for (let i in Object.keys(stimulus)) {
		stimulus[i]["audioDescriptionLink"] = stimsUrls[stimulus[i].tag]
			? stimsUrls[stimulus[i].tag]
			: "";
	}

	if (stimulus) {
		await stimRef.set(stimulus);
		console.log("Done uploading stims", stimulus);
	} else {
		console.log("Failed uploading stims");
	}
};

const expConRemunDeets = async () => {
	const remunRef = db.collection("remun-register-dsp");
	const d = await remunRef.get();
	d.forEach(async (doc) => {
		console.log("doc: ", doc.data());

		const remunRefSub = db.collection(
			`/remun-register-dsp/${doc.id}/registered-users`
		);
		const dd = await remunRefSub.get();

		if (dd.docs.length > 0) {
			dd.forEach((docc) => {
				console.log("doc: ", docc.data());
			});
		} else {
			console.log("doc: ", doc.data());
		}
	});
};

const expConSurvey = async (collection) => {
	const surveyRef = db.collection(collection);
	const d = await surveyRef.get();

	const cons = [];
	d.forEach((doc) => {
		cons.push(doc.data());
	});
	let data = JSON.stringify(cons);

	fs.writeFileSync(
		`/home/jeevan/Documents/developer/webapps/asquire-vowtiar/src/functions/exports/latest/${collection}.json`,
		data
	);

	console.log(`done for ${collection}\n`);

	return cons;
};

const confiles = async (version, userId) => {
	const path = `${version}_weekly_data_1/${userId}`;

	const data = await bucket.getFiles({ prefix: path });

	let files = data[0];
	let conUrls = {};

	for (let file of files) {
		let url = await file
			.getSignedUrl({ action: "read", expires: "04-19-2025" })
			.catch((err) => console.log("url error", err));

		// let name = file.name.replace(/^.*[\\\/]/, "").slice(0, -4);
		conUrls[file.name] = url[0];
	}

	console.log(conUrls);
};

/* SET to server */
// setSurveyQuestions();
// setStims();

/* GET from server */
// expConRemunDeets();

const main = async () => {
	// User Meta data collection

	let all_cons = [];
	const meta_docs = [
		// user docs
		"users",
		"users_final",
		"users_remun",
		"users_remun_dsp",
		"users_remun_fin",
		"users_remun_lap",
		"users_remun_yin",
		"users_remun_yang",
		"users_remun_koi",

		// //remun docs
		// "remun-register-yin-1",
		// "remun-register-koi-1",
	];

	for (let doc in meta_docs) {
		const c = await expConSurvey(meta_docs[doc]);
		all_cons = [...all_cons, ...c];
	}
	// Remuneration
	// await expConSurvey("remun-register-yin-1");
	// await expConSurvey("remun-register-koi-1");

	// write all cons
	fs.writeFileSync(
		`/home/jeevan/Documents/developer/webapps/asquire-vowtiar/src/functions/exports/latest/${`all_cons`}.json`,
		JSON.stringify(all_cons)
	);

	console.log("done");
};

main();

/* Contributors files */
// confiles("yang", "anqa-18ddc889").catch((e) => console.log(e));
