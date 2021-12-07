import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FormHelperText, IconButton, Tooltip } from "@material-ui/core";
import RecordStartIcon from "@material-ui/icons/Adjust";
import RecordStopIcon from "@material-ui/icons/Album";
import Chip from "@material-ui/core/Chip";
import BlurOn from "@material-ui/icons/BlurOn";
import LockIcon from "@material-ui/icons/Lock";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";

import Timer from "../pieces/Timer";

// Context
import { Context as VoiceContext } from "../../context/data/VoiceContext";
import { Context as RecordContext } from "../../context/data/RecordContext";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "80%",
		maxWidth: theme.spacing(82),
		marginTop: 0,
		padding: theme.spacing(2),
		borderWidth: 2,
		borderRadius: 8,
		borderColor: theme.palette.secondary.main,
		borderStyle: "solid",
	},
	player: {
		width: 0,
		height: 0,
		margin: theme.spacing(1),
	},
	chipDiv: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		"& > *": {
			marginRight: theme.spacing(4),
			marginLeft: theme.spacing(4),
			marginBottom: theme.spacing(2),
		},
	},
	chip: {
		transform: "scale(1.2)",
		color: theme.palette.grey[800],
	},
	msg: {
		height: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	recButton: {
		borderWidth: 4,
		borderColor: theme.palette.secondary.main,
		borderStyle: "dotted",
		margin: theme.spacing(2),
	},
	recButtonAction: {
		borderWidth: 4,
		borderColor: theme.palette.secondary.main,
		borderStyle: "dotted",
		margin: theme.spacing(2),
		animation: `$spin 8000ms  infinite linear`,
	},
	controlIcon: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(1),
	},
	controlIconAction: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(1),
		animation: `$zoomies 2000ms ${theme.transitions.easing.easeInOut} 200ms infinite`,
	},
	"@keyframes zoomies": {
		"0%": {
			transform: "scale(1)",
		},
		"50%": {
			transform: "scale(1.1)",
		},
		"100%": {
			transform: "scale(1)",
		},
	},
	"@keyframes spin": {
		from: {
			transform: "rotate(0deg)",
		},
		to: {
			transform: "rotate(360deg)",
		},
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		cursor: "crosshair",
		transform: "scale(1.55)",
		"&:hover": {
			transform: "scale(2)",
		},
	},
}));
const sampleAudioPath = "/impulse/breath.wav";
const Voice = ({ completed }) => {
	const classes = useStyles();

	const { state: voiceState, voiceTransformAction } =
		React.useContext(VoiceContext);

	const {
		state: recordState,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
		recordResetAction,
	} = React.useContext(RecordContext);

	const timeoutRef = React.useRef();
	const playerRef = React.useRef();

	const [play, setPlay] = React.useState(false);
	const [msg, setMsg] = React.useState("");
	const [unlock, setUnlock] = React.useState(false);

	const bull = (
		<span className={classes.bullet} onClick={() => setUnlock(!unlock)}>
			•
		</span>
	);

	const handleRecord = async () => {
		if (!recordState.inputStream) {
			await recordGetDevicesAction();
		}

		if (play) {
			playerRef.current.pause();
			setPlay(false);
		}

		if (recordState.isRecording) {
			clearInterval(timeoutRef.current);
			recordStopAction();
		} else if (recordState.inputStream) {
			recordStartAction(recordState.inputStream);
			timeoutRef.current = setTimeout(() => {
				recordStopAction();
			}, 121 * 1000);
			recordState.inputStream && setMsg("");
		} else {
			setMsg("click again");
		}
	};

	const handleTransform = async (type) => {
		console.log("transforming");
		let url;
		if (recordState.playUrl !== "") {
			url = recordState.playUrl;
		} else {
			url = sampleAudioPath;
			setMsg("Record your voice before transformation!");
			setTimeout(() => {
				setMsg("");
			}, 7 * 1000);
		}
		if (play) {
			playerRef.current.pause();
			setPlay(false);
			setMsg("paused");
		} else {
			setMsg("processing...");
			await voiceTransformAction(url, type);
			playerRef.current.play();
			setMsg("playing...");
			playerRef.current.addEventListener("ended", () => {
				setPlay(false);
				setMsg("");
			});
			setPlay(true);
		}
	};

	React.useEffect(() => {
		recordGetDevicesAction();
		return () => {
			console.log("voice cleanup");
			recordResetAction();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={classes.root}>
			<IconButton
				aria-label="record"
				className={
					recordState.isRecording
						? classes.recButtonAction
						: classes.recButton
				}
				onClick={handleRecord}
			>
				<Tooltip
					title={`${
						recordState.isRecording ? "Stop" : "Start"
					} recording`}
				>
					{recordState.isRecording ? (
						<RecordStopIcon className={classes.controlIconAction} />
					) : (
						<RecordStartIcon className={classes.controlIcon} />
					)}
				</Tooltip>
			</IconButton>
			<Timer seconds={recordState.seconds} />

			<FormHelperText
				className={classes.msg}
				error
				style={{ textAlign: "center" }}
				components="p"
			>
				{`${msg}`}
			</FormHelperText>

			<audio
				id="transform-player"
				ref={playerRef}
				className={classes.player}
				src={voiceState.playUrl}
				controls
			/>

			<div className={classes.chipDiv}>
				{voiceState.txDetes.map((v, i) => {
					const a = unlock;
					const b = recordState.isRecording;
					const c = i >= completed;
					return (
						<Tooltip key={i} title={v.description}>
							<Chip
								className={classes.chip}
								disabled={b || (!a && c)}
								icon={
									i >= completed && !unlock ? (
										<LockIcon />
									) : (
										<BlurOn />
									)
								}
								color="secondary"
								variant="outlined"
								label={v.name}
								onClick={() => handleTransform(v.key)}
								onDelete={() => handleTransform(v.key)}
								deleteIcon={<PlayIcon />}
							/>
						</Tooltip>
					);
				})}
			</div>
			<Typography color="textSecondary" variant="caption" gutterBottom>
				::Record yourself saying something and click on any button!
				{bull}
			</Typography>
		</div>
	);
};

export default Voice;
