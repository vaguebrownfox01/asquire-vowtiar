// user context
import createDataContext from "../createDataContext";
import { v4 as uuid } from "uuid";

// functions
import {
	getAllUsersFromIdb,
	addUserToIdb,
	updateUserInIdb,
} from "../../functions/indexdb";
import {
	firebaseSignUp,
	firebaseSignIn,
	// firebaseSignOut,
} from "../../functions/auth";
import { firebaseUserData } from "../../functions/firestore";

// Initial State
const userInitialState = {
	loading: false,
	allUsers: [],
	selectedUser: null,
	error: "",
};

// User Attributes
const typicalUser = {
	userName: "",
	userId: "",
	volunteerId: "",
	stepCount: 1,
	bioDataDone: false,
	surveyDone: false,
	recordCount: 0,
	recordingDone: false,
	stimCount: 0,
	stimOrder: [],
	completed: 0,
};

// Reducer
const userReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_ALLUSERS":
			return { ...state, allUsers: action.payload, selectedUser: null };
		case "ADD_USER":
			return { ...state, allUsers: [...state.allUsers, action.payload] };
		case "SELECT_USER":
			return { ...state, selectedUser: action.payload };
		case "ERROR":
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

// Actions
const userLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("user action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userGetAllAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		const allUsers = await getAllUsersFromIdb();
		console.log("user action log:: all users", allUsers);
		if (allUsers.length === 0) {
			dispatch({
				type: "ERROR",
				payload: "no users exist, create an user!",
			});
		} else {
			dispatch({ type: "SET_ALLUSERS", payload: allUsers });
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userAddAction = (dispatch) => {
	return async ({ userName, volunteerId }) => {
		dispatch({ type: "SET_LOADING", payload: true });

		let res = false;

		let userId = `${userName}-${uuid().slice(0, 8)}`;
		let user = {
			...typicalUser,
			userName: userName,
			userId: userId,
			volunteerId: volunteerId ? volunteerId : userId,
		};

		let uAuth = await firebaseSignUp(user.userId, user.userName); // firebase sign up
		uAuth && (user = await addUserToIdb(user));

		if (uAuth && user) {
			dispatch({ type: "ADD_USER", payload: user });

			dispatch({ type: "ERROR", payload: "" });
			res = user;
		} else {
			dispatch({
				type: "ERROR",
				payload: "Error adding user, try again!",
			});

			setTimeout(() => {
				dispatch({ type: "ERROR", payload: "" });
			}, 3000);
			res = false;
		}

		dispatch({ type: "SET_LOADING", payload: false });
		return res;
	};
};

const userSelectAction = (dispatch) => {
	return (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "SELECT_USER", payload: user });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userLoginAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });
		let uAuth = null;

		if (user) {
			uAuth = await firebaseSignIn(user.userId, user.userName);
		} else {
			dispatch({
				type: "ERROR",
				payload: "You have to select an user to continue!",
			});
			setTimeout(() => {
				dispatch({ type: "ERROR", payload: "" });
			}, 5000);
		}

		dispatch({ type: "SET_LOADING", payload: false });
		return uAuth;
	};
};

const userUpdateAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		user = await updateUserInIdb(user);
		user && dispatch({ type: "SELECT_USER", payload: user });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userUpdateCloud = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		await firebaseUserData(user);

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// const userLogoutAction = (dispatch) => {
// 	return async () => {
// 		dispatch({ type: "SET_LOADING", payload: true });
// 		let f = false;

// 		firebaseSignIn = await firebaseSignOut();

// 		if (!f) {
// 			dispatch({
// 				type: "ERROR",
// 				payload: "Log out error",
// 			});
// 			setTimeout(() => {
// 				dispatch({ type: "ERROR", payload: "" });
// 			}, 5000);
// 		} else {
// 			dispatch({ type: "SELECT_USER", payload: null });
// 		}

// 		dispatch({ type: "SET_LOADING", payload: false });
// 		return f;
// 	};
// };

// Export
export const { Context, Provider } = createDataContext(
	userReducer,
	{
		userLoadAction,
		userGetAllAction,
		userAddAction,
		userSelectAction,
		userLoginAction,
		userUpdateAction,
		userUpdateCloud,
		// userLogoutAction,
	},
	userInitialState
);
