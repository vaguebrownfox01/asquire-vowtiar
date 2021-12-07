const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceConfig.json");

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
		console.log("Faled to upload questions");
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
		stimulus[i]["audioDescriptionLink"] = stimsUrls[stimulus[i].tag];
	}

	if (stimulus) {
		await stimRef.set(stimulus);
		console.log("Done uploading stims", stimulus);
	} else {
		console.log("Failed uploading stims");
	}
};

setSurveyQuestions();
setStims();
