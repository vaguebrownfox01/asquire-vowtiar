import { db } from "./firebase";

const {
	ACTIVE_DOCS,
	USERS_COLLECTION,
	CONTENT_COLLECTION,
	STIM_DOC,
	SURVEY_DOC,
} = require("./firebaseSetup");

export const firebaseUserData = async (data) => {
	const userDocRef = db.collection(USERS_COLLECTION).doc(data.userId);

	data = await userDocRef
		.set(data)
		.then(() => data)
		.catch((err) => {
			console.log("fb firestore error :: ", err);
			return null;
		});

	return data;
};

export const firebaseSurvey = async () => {
	const docRefSurvey = db.collection(CONTENT_COLLECTION).doc(SURVEY_DOC);
	const survey = (await docRefSurvey.get()).data();
	return survey;
};

export const firebaseStims = async () => {
	const docRefSurvey = db.collection(CONTENT_COLLECTION).doc(STIM_DOC);
	const stimuli = (await docRefSurvey.get()).data();
	return stimuli;
};

export const activeQuery = db
	.collection(ACTIVE_DOCS)
	.where("online", "==", "true");

export const firebaseSetActive = async (user, stat) => {
	const docRefActive = db.collection(ACTIVE_DOCS).doc(user.userId);
	const data = {
		online: stat,
	};

	await docRefActive.set(data).catch((err) => {
		console.log("fb firestore active set err :: ", err);
		return null;
	});
};
