import { Chip, Collapse, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import React from "react";
import { Context as RecordContext } from "../../context/data/RecordContext";
// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { firebaseSetActive } from "../../functions/firestore";
// Hooks
import useContainerDimensions from "../../hooks/useContainerDimensions";
import InstructionModal from "../pieces/Instructions";
import RecControl from "../pieces/RecControls";
// Pieces
import RecTitle from "../pieces/RecTitle";
import StimContent from "../pieces/StimContent";
import Timer from "../pieces/Timer";
import VadRes from "../pieces/VadRes";
import Worm from "../pieces/Worm";

const MAX_REC_DURATION = 121000;

export default function Record() {
	const classes = useStyles();

	const { stepNextAction, stepPreviousAction } =
		React.useContext(StepContext);

	const {
		state: recordState,
		recordLoadStimsAction,
		recordNextStimAction,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
		recordPlayAction,
		recordPlayInstAction,
		recordUploadAction,
		recordResetAction,
		recordVadAction,
	} = React.useContext(RecordContext);

	const { state: userState, userUpdateAction } =
		React.useContext(UserContext);

	const vizRef = React.useRef();
	const playRef = React.useRef();
	const timeoutRef = React.useRef();

	const [plytip, setPlytip] = React.useState("Play");

	const [shape, setShape] = React.useState(false);

	const [instModalOpen, setInstOpen] = React.useState(true);

	const [vadModalOpen, setVadOpen] = React.useState(false);

	const handleInstOpen = () => setInstOpen(true);
	const handleInstClose = () => {
		setInstOpen(false);
		window.scrollTo({ top: vizRef.current.offsetTop, behavior: "smooth" });
	};
	const handleVadClose = () => setVadOpen(false);

	const handleSpectrumShape = () => setShape((preshape) => !preshape);

	React.useEffect(() => {
		recordLoadStimsAction(userState.selectedUser).then((user) =>
			user ? userUpdateAction(user) : null
		);

		recordGetDevicesAction();
		firebaseSetActive(userState.selectedUser, "true");

		const playRefE = playRef.current;
		const stopPlay = () => {
			recordPlayAction(false);
			setPlytip("Play");
		};
		if (playRefE) {
			playRefE?.addEventListener("play", () => recordPlayAction(true));
			playRefE?.addEventListener("pause", stopPlay);
		}

		return () => {
			if (playRefE) {
				playRefE?.removeEventListener("play", () =>
					recordPlayAction(false)
				);
				playRefE?.removeEventListener("pause", stopPlay);
			}

			firebaseSetActive(userState.selectedUser, "false");
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleNextStep = () => {
		recordState.analyserNode?.disconnect();
		recordResetAction();
		stepNextAction();
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	const handleRecord = () => {
		clearInterval(timeoutRef.current);
		if (recordState.isRecording) {
			timeoutRef.current = setTimeout(() => {
				handleRecStop();
			}, 250);
		} else {
			vizRef.current.scrollIntoView(false);
			recordStartAction(recordState.inputStream);
			timeoutRef.current = setTimeout(() => {
				handleRecStop();
			}, MAX_REC_DURATION);
		}
	};

	const handleRecStop = async () => {
		const res = await recordStopAction();

		switch (recordState.currentStim.tag) {
			case "breath":
				break;
			case "cough":
				setVadOpen(true);
				res && (await recordVadAction(res.audioUrl, false));
				break;
			default:
				setVadOpen(true);
				res && (await recordVadAction(res.audioUrl, true));
				break;
		}
	};

	const handlePlay = () => {
		if (recordState.isPlaying) {
			playRef.current.pause();
		} else {
			playRef.current.play();
			setPlytip("Pause");
		}
	};

	const handleDone = () => {
		const finishedStim = { ...recordState.currentStim };
		const completed = userState.selectedUser?.completed + 1;
		recordUploadAction({
			...userState.selectedUser,
			stimTag: finishedStim.tag,
			score: recordState.vadRes.score,
		}).then(() => {
			const user = {
				...userState.selectedUser,
				stimCount: finishedStim.sno + 1,
				completed: completed,
			};
			userUpdateAction(user);
			recordNextStimAction(completed);
		});
	};

	const { width, height } = useContainerDimensions(vizRef, recordState);

	return (
		<>
			<Card ref={vizRef} className={classes.root} elevation={8}>
				{recordState.isRecording && (
					<Worm
						{...{
							width,
							height,
							shape,
							analyserNode: recordState.analyserNode,
						}}
					/>
				)}
				<Chip
					className={classes.instChip}
					avatar={<ListIcon fontSize="large" />}
					aria-label="Show instructions"
					label="Show instructions"
					onClick={handleInstOpen}
					variant="outlined"
				/>
				<CardContent>
					<RecTitle
						s={handleSpectrumShape}
						userName={userState.selectedUser?.userName}
					/>

					<div className={classes.cardaction}>
						<StimContent
							stim={recordState.currentStim}
							labels={recordState.stimLabels}
							activeStim={userState.selectedUser?.completed || 0}
							anim={recordState.stimAnim}
							isRecording={recordState.isRecording}
							isPlaying={recordState.isPlayingInst}
							{...{
								playRec: recordPlayInstAction,
								modalOpen: instModalOpen || vadModalOpen,
							}}
						/>

						{userState.selectedUser?.completed <
							recordState.totalStimCount ||
						recordState.loading ? (
							<Typography
								variant="caption"
								component="p"
								gutterBottom
							>
								{`Completed: ${
									userState.selectedUser?.completed || 0
								}/${recordState.totalStimCount}`}
							</Typography>
						) : (
							<Typography
								variant="caption"
								component="p"
								style={{ color: green[900] }}
								gutterBottom
							>
								{`Yay! You have completed all the tasks...`}
							</Typography>
						)}

						<Timer seconds={recordState.seconds} />

						<RecControl
							isRecording={recordState.isRecording}
							isPlaying={recordState.isPlaying}
							isPlayingInst={recordState.isPlayingInst}
							recDone={recordState.recDone}
							playTip={plytip}
							{...{ handleRecord, handleDone, handlePlay }}
						/>

						<div className={classes.playerDiv}>
							<Collapse
								in={
									recordState.recDone &&
									!recordState.isPlayingInst
								}
							>
								<Typography
									variant="body2"
									color="textPrimary"
									component="p"
									gutterBottom
								>
									<b>Play recorded audio</b>
								</Typography>
							</Collapse>
							<Collapse
								in={
									recordState.recDone &&
									!recordState.isPlayingInst
								}
							>
								<audio
									ref={playRef}
									id="stim-player"
									className={classes.player}
									src={recordState.playUrl}
									controls
								/>
							</Collapse>
						</div>
					</div>
					<>
						<InstructionModal
							{...{
								modalOpen: instModalOpen,
								handleClose: handleInstClose,
							}}
						/>
						<VadRes
							{...{
								modalOpen: vadModalOpen,
								handleClose: handleVadClose,
								vadRes: recordState.vadRes,
							}}
						/>
					</>
				</CardContent>
			</Card>

			<div className={classes.actionsContainer}>
				<div>
					<Button onClick={handleBack} className={classes.button}>
						Back
					</Button>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={handleNextStep}
					>
						Exit
					</Button>
				</div>
			</div>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		overflow: "hidden",
		background: theme.palette.background.default,
	},
	cardaction: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
	player: {
		background: theme.palette.background.default,
		transform: "scale(0.8)",
	},
	playerDiv: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: theme.spacing(10),
		padding: theme.spacing(2, 0),
	},
	inshelp: {
		color: theme.palette.secondary.main,
	},
	instChip: {
		position: "absolute",
		bottom: 0,
		right: 0,
		margin: theme.spacing(0, 2, 2, 0),
	},
}));
