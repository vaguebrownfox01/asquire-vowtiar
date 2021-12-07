// sample context
import createDataContext from "../createDataContext";

// Initial State
const sampleInitialState = {
	loading: false,
};

// Reducer
const sampleReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

// Actions

const sampleLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("sample action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	sampleReducer,
	{
		sampleLoadAction,
	},
	sampleInitialState
);
