// record context
import createDataContext from "../createDataContext";
import { firebaseStims } from "../../functions/firestore";
import { batch } from "react-redux";

// functions
import {
	getAudioInputDevices,
	getAudioOutputDevices,
	getAudioInputStream,
	audioRecord,
	createAudioBuffer,
	audioBufferToWaveBlob,
} from "../../functions/recorder";
import { firebaseUserAudio } from "../../functions/storage";
import { startVibrate } from "../../functions/vibrate";
import { detectStims } from "../../vad/detect";

// Initial State
const recordInitialState = {
	loading: false,
	audioDevices: { inputDevices: [], outputDevices: [] },
	inputDevice: {},
	outputDevice: {},
	analyserNode: {},
	inputStream: null,

	isRecording: false,
	isPlaying: false,
	isPlayingInst: false,
	recDone: false,
	plyDone: false,
	playUrl: "",
	audioBuffer: [],

	stims: {},
	stimLabels: [],
	currentStim: {},
	totalStimCount: 0,
	stimOrder: [],
	stimAnim: true,

	seconds: 0,

	vadRes: {
		count: 0,
		avg: 0,
		score: 0,
		calc: false,
	},
};

// Reducer
const recordReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "REC_RESET":
			return { ...action.payload };
		case "LOAD_STIMS":
			let keys = Object.keys(action.payload.stims);
			let nostims0 = keys.length;
			let csno0 = action.payload.stimCount;

			return {
				...state,
				stims: action.payload.stims,
				stimLabels: action.payload.stimLabels,
				totalStimCount: nostims0,
				currentStim: action.payload.stims[csno0 % nostims0],
			};
		case "NEXT_STIM":
			return {
				...state,
				currentStim:
					state.stims[
						action.payload.completed % state.totalStimCount
					],
				// stimCount: state.stimCount + 1,
			};
		case "STIM_ANIM":
			return {
				...state,
				stimAnim: action.payload,
			};
		case "GET_DEVICES":
			return {
				...state,
				audioDevices: action.payload,
				inputDevice: action.payload.inputDevices[0],
				outputDevice: action.payload.outputDevices[0],
				inputStream: action.payload.audioInputStream,
				analyserNode: action.payload.analyserNode,
			};
		case "SET_INPUT_DEVICE":
			return {
				...state,
				inputDevice: action.payload,
			};
		case "SET_OUTPUT_DEVICE":
			return {
				...state,
				outputDevice: action.payload,
			};
		case "SET_INPUT_STREAM":
			return {
				...state,
				inputStream: action.payload,
			};
		case "SET_REC_STATE":
			return { ...state, isRecording: action.payload };
		case "SET_PLY_STATE":
			return { ...state, isPlaying: action.payload };
		case "SET_PLYINST_STATE":
			return { ...state, isPlayingInst: action.payload };
		case "SET_REC_DONE":
			return { ...state, recDone: action.payload };
		case "SET_PLY_URL":
			return { ...state, playUrl: action.payload };
		case "SET_AUD_BUF":
			return {
				...state,
				audioBuffer: action.payload,
			};
		case "SECONDS":
			let secs = state.seconds;
			switch (action.payload) {
				case "up":
					secs += 1;
					break;
				case "down":
					secs -= 1;
					break;
				case "reset":
					secs = 0;
					break;
				default:
					break;
			}
			return { ...state, seconds: secs };
		case "UPDATE_VAD":
			return {
				...state,
				vadRes: action.payload,
			};
		default:
			return state;
	}
};

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Actions
const recordLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordLoadStimsAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		const stims = await firebaseStims().catch(() => {
			alert(
				"Failed to load stimuli! Make sure you have internet connection. Please refresh page!"
			);
			dispatch({ type: "SET_LOADING", payload: false });
			window.location.href = "/";
			return null;
		});

		if (stims) {
			console.log(stims);
			let fixed = [0, 1, 2, 3, 4];
			if (user.stimOrder ? user.stimOrder.length === 0 : true) {
				let keys = [
					...fixed,
					...shuffleArray(Object.keys(stims).slice(fixed.length)),
				];
				user = { ...user, stimOrder: keys };
			}
			let ranStims = {};
			let stimLabels = [];
			user.stimOrder.forEach((k, i) => {
				ranStims[i] = stims[k];
				stimLabels.push(stims[k].label);
			});

			console.log("record contxt : ", { ranStims });
			dispatch({
				type: "LOAD_STIMS",
				payload: {
					stims: ranStims,
					stimCount: user.completed,
					stimLabels,
				},
			});
		} else return null;

		dispatch({ type: "SET_LOADING", payload: false });
		return user;
	};
};

const recordNextStimAction = (dispatch) => {
	return (completed) => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "STIM_ANIM", payload: false });

		setTimeout(() => {
			dispatch({ type: "NEXT_STIM", payload: { completed } });
			dispatch({ type: "SECONDS", payload: "reset" });
			dispatch({ type: "STIM_ANIM", payload: true });
		}, 500);

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordGetDevicesAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		const {
			audioDevices: inputDevices,
			audioInputStream,
			analyserNode,
		} = await getAudioInputDevices();
		const outputDevices = await getAudioOutputDevices();

		dispatch({
			type: "GET_DEVICES",
			payload: {
				inputDevices,
				outputDevices,
				audioInputStream,
				analyserNode,
			},
		});

		console.log("record context ::get devices");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetInputAction = (dispatch) => {
	return async (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		const stream = await getAudioInputStream(device);
		dispatch({ type: "SET_INPUT_DEVICE", payload: device });
		dispatch({ type: "SET_INPUT_STREAM", payload: stream });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetOutputAction = (dispatch) => {
	return (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "SET_OUTPUT_DEVICE", payload: device });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let recorder = null;
let interval = null;

const recordStartAction = (dispatch) => {
	return async (inputStream) => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (!recorder) {
			recorder = await audioRecord(inputStream).catch((e) => {
				console.log("audioRecord error", e);
				return null;
			});
		}
		if (!recorder) {
			return null;
		}
		const isRecStart = await recorder
			.startRecord()
			.then((e) => {
				startVibrate(70);
				return e;
			})
			.catch((e) => {
				console.log("audioRecord start error", e);
				return null;
			});
		console.log("record action log:: start record", isRecStart);

		if (isRecStart) {
			console.log("record action log:: start record");
			batch(() => {
				dispatch({ type: "SET_REC_DONE", payload: false });
				dispatch({ type: "SET_REC_STATE", payload: true });
				dispatch({ type: "SET_PLY_STATE", payload: false });
				dispatch({ type: "SECONDS", payload: "reset" });
			});

			interval = setInterval(() => {
				dispatch({ type: "SECONDS", payload: "up" });
			}, 1000);
		} else {
			dispatch({ type: "SET_REC_STATE", payload: false });
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let audio = null;

const recordStopAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (!recorder) {
			console.log("record action log:: recorder not defined");
			return null;
		}

		audio = await recorder
			.stopRecord()
			.then((e) => {
				startVibrate(70);
				return e;
			})
			.catch(() => null);

		if (audio) {
			// const audioBuffer = await createAudioBuffer(audio.audioUrl);
			// const audioData = audioBuffer.getChannelData(0);
			// const skip = Math.floor(audioData.length / (256 * 4));
			// const audioDataF = audioData.filter((e, i) => i % skip === 0);

			batch(() => {
				dispatch({ type: "SET_REC_STATE", payload: false });
				dispatch({ type: "SET_REC_DONE", payload: true });
				dispatch({ type: "SET_PLY_URL", payload: audio.audioUrl });
			});

			// const res = await detectStims(audio.audioUrl);
			// console.table(res);

			// dispatch({ type: "SET_AUD_BUF", payload: audioDataF });
			clearInterval(interval);
		}

		dispatch({ type: "SET_LOADING", payload: false });

		return audio;
	};
};

const recordPlayAction = (dispatch) => {
	return (isPly) => {
		dispatch({ type: "SET_PLY_STATE", payload: isPly });
	};
};

const recordPlayInstAction = (dispatch) => {
	return (isPly) => {
		dispatch({ type: "SET_PLYINST_STATE", payload: isPly });
	};
};

const recordResetAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "REC_RESET", payload: { ...recordInitialState } });

		console.log("record reset log", recordInitialState);
		if (recorder) {
			recorder.stopRecord().catch(() => null);
			clearInterval(interval);
			recorder = null;
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordUploadAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (audio) {
			// Convert to wav format
			const audioBuffer = await createAudioBuffer(audio.audioUrl);
			audio.wavBlob = await audioBufferToWaveBlob(audioBuffer);

			firebaseUserAudio(user, audio);
			dispatch({ type: "SET_REC_DONE", payload: false });
		} else {
			console.error("record action log:: audio not defined");
			throw new Error("Upload error");
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordVadAction = (dispatch) => {
	return async (audioUrl, isPhone) => {
		dispatch({ type: "SET_LOADING", payload: true });

		let vad = {
			count: 0,
			avg: 0,
			score: 0,
			spectrum: 0,
			calc: true,
		};

		dispatch({ type: "UPDATE_VAD", payload: vad });

		// for test : delay
		// await new Promise((res) => setTimeout(res, 3000));

		// VAD stuff
		const res = await detectStims(audioUrl);
		vad = {
			count: res.count,
			avg: res.avg,
			score: res.score,
			spectrum: res.spectrum,
			calc: false,
		};

		if (!isPhone)
			vad.score = (vad.count >= 3 ? 1 : vad.count / 3).toFixed(1) * 10;

		dispatch({ type: "UPDATE_VAD", payload: vad });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	recordReducer,
	{
		recordLoadAction,
		recordLoadStimsAction,
		recordNextStimAction,

		recordGetDevicesAction,
		recordSetInputAction,
		recordSetOutputAction,

		recordStartAction,
		recordStopAction,
		recordPlayAction,
		recordPlayInstAction,

		recordUploadAction,

		recordResetAction,

		recordVadAction,
	},
	recordInitialState
);
