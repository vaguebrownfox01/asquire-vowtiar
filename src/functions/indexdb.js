import { openDB } from "idb";

const IDB = "asq-db";
const VERSION = 1;

export const USERS_STORE = "users";

const idb = {
	userIdb: openDB(IDB, VERSION, {
		upgrade(db, oldVersion, newVersion, transaction) {
			db.createObjectStore(USERS_STORE);
		},
	}),
};

export const addUserToIdb = async (user) => {
	const db = await idb.userIdb;
	user = await db
		.add(USERS_STORE, user, user.userName)
		.then((result) => {
			console.log(`success! ${user.userName} added to idb`, result);
			return user;
		})
		.catch((err) => {
			console.error(`error while adding ${user.userName} to idb`, err);
			return null;
		});
	return user;
};

export const getAllUsersFromIdb = async () => {
	const db = await idb.userIdb;
	const transaction = db.transaction(USERS_STORE, "readwrite");

	// const users = await db.getAll(USERS_STORE);
	const users = await transaction.store.getAll(); //.getAll(USERS_STORE);
	return users;
};

export const updateUserInIdb = async (user) => {
	const db = await idb.userIdb;

	user = await db
		.delete(USERS_STORE, user.userName)
		.then(() => addUserToIdb(user))
		.then(() => user)
		.catch((err) => {
			console.error(`error while updating ${user.userName} to idb`, err);
			return null;
		});
	return user;
};
