// voice context
import createDataContext from "../createDataContext";

// functions
import {
	createAudioBuffer,
	audioBufferToWaveBlob,
} from "../../functions/recorder";
import { transforms, txDetes } from "../../voice";

// Initial State
const voiceInitialState = {
	loading: false,
	playUrl: "",
	txDetes,
};

// Reducer
const voiceReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_PLY_URL":
			return { ...state, playUrl: action.payload };
		default:
			return state;
	}
};

// Actions
const voiceLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("voice action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const voiceTransformAction = (dispatch) => {
	return async (audioUrl, type) => {
		dispatch({ type: "SET_LOADING", payload: true });

		const audioBuffer = await createAudioBuffer(audioUrl);

		const outputAudioBuffer = await transforms[type](audioBuffer);

		const outputWavBlob = await audioBufferToWaveBlob(outputAudioBuffer);
		let voiceUrl = URL.createObjectURL(outputWavBlob);
		dispatch({ type: "SET_PLY_URL", payload: voiceUrl });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	voiceReducer,
	{
		voiceLoadAction,
		voiceTransformAction,
	},
	voiceInitialState
);
