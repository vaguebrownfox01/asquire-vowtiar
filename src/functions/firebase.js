import firebase from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const stor = firebase.storage();
