// step context
import createDataContext from "../createDataContext";

// Initial State
const stepInitialState = {
	loading: false,
	previousStep: 0,
	activeStep: 0,
};

// Reducer
const stepReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "STEP_NEXT":
			return {
				...state,
				previousStep: state.activeStep,
				activeStep: state.activeStep + 1,
			};
		case "STEP_PREVIOUS":
			return {
				...state,
				previousStep: state.activeStep,
				activeStep: state.activeStep - 1,
			};
		case "STEP_SET":
			return {
				...state,
				previousStep: state.activeStep,
				activeStep: action.payload,
			};
		default:
			return state;
	}
};

// Actions
const stepLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("step action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const stepNextAction = (dispatch) => {
	return () => {
		dispatch({ type: "STEP_NEXT", payload: null });
	};
};

const stepPreviousAction = (dispatch) => {
	return () => {
		dispatch({ type: "STEP_PREVIOUS", payload: null });
	};
};

const stepSetAction = (dispatch) => {
	return (stepNumber) => {
		dispatch({ type: "STEP_SET", payload: stepNumber });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	stepReducer,
	{
		stepLoadAction,
		stepNextAction,
		stepPreviousAction,
		stepSetAction,
	},
	stepInitialState
);
