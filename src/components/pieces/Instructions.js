import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Backdrop,
	Button,
	CardMedia,
	Divider,
	Fade,
	Modal,
	Typography,
} from "@material-ui/core";
import RecordStartIcon from "@material-ui/icons/FiberManualRecordRounded";
import RecordStopIcon from "@material-ui/icons/StopRounded";
import DoneIcon from "@material-ui/icons/ArrowForwardRounded";
import Toggle from "./Toggle";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgb(255, 255, 255, 0.9)",
		border: "2px solid",
		borderColor: theme.palette.secondary.main,
		borderRadius: 8,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 2, 3),
		margin: theme.spacing(1),
	},
	button: {
		textTransform: "none",
		marginTop: theme.spacing(4),
		alignSelf: "flex-end",
	},
}));

export const INSTRUCTION_VID_URL = `https://www.youtube-nocookie.com/embed/AWMUhRCMXt8`;

const InstructionModal = ({ modalOpen, handleClose }) => {
	const classes = useStyles();

	const [instcount, setinstcount] = React.useState(0);

	const handleContinue = () => {
		if (instcount < contents.length - 1) {
			setinstcount((p) => p + 1);
		} else {
			handleClose();
		}
	};

	React.useEffect(() => {
		if (modalOpen) {
			setinstcount(0);
		}
	}, [modalOpen]);

	const contents = [<NoiseInst />, <VideoInst />, <ControlInst />];

	return (
		<Modal
			className={classes.modal}
			style={{ overflow: "scroll" }}
			open={modalOpen}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={modalOpen}>
				<div className={classes.modalContent}>
					{contents[instcount]}
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleContinue}
						className={classes.button}
					>
						Understood, continue...
					</Button>
				</div>
			</Fade>
		</Modal>
	);
};

const useContStyles = makeStyles((theme) => ({
	recIcon: {
		color: theme.palette.secondary.main,
		background: theme.palette.primary,
		boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		animation: `$glowee 3000ms ${theme.transitions.easing.easeInOut} 400ms infinite`,
		borderRadius: "50%",
	},
	divider: {
		marginBottom: theme.spacing(2),
	},
	media: {
		height: 200,
		width: 200,
		margin: "auto",
		borderRadius: theme.spacing(1),
	},
	mediaDiv: {
		position: "relative",
		maxWidth: theme.spacing(96),
	},
	"@keyframes glowee": {
		"0%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
		"50%": {
			boxShadow: `0 0 7px 4px ${theme.palette.secondary.main}`,
		},
		"100%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
	},
}));
const ControlInst = () => {
	const classes = useContStyles();

	return (
		<>
			<Typography variant="h6" component="h6" gutterBottom>
				Please read the instructions..
			</Typography>

			<div>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{1}. Click <Toggle fontSize="default" /> to toggle between{" "}
					<b>Audio and Video Instructions</b> for recording.
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{2}. Click{"   "}
					<RecordStartIcon
						classes={{ root: classes.recIcon }}
						fontSize="default"
					/>{" "}
					to <b>Start</b> recording your voice.
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{3}. Click{"   "}
					<RecordStopIcon
						classes={{ root: classes.recIcon }}
						fontSize="default"
					/>{" "}
					to <b>Stop</b> recording your voice.
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{4}. Click <DoneIcon fontSize="default" /> to for recording{" "}
					<b>next Task</b>.
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{5}. Click <b>EXIT</b> after finishing all the tasks.
				</Typography>{" "}
				<Divider className={classes.divider} />
			</div>
		</>
	);
};

const NoiseInst = () => {
	const classes = useContStyles();
	return (
		<div>
			<Typography variant="h5" component="h6" gutterBottom align="center">
				Record in a quite environment!
			</Typography>
			<Divider className={classes.divider} />
			<CardMedia
				className={classes.media}
				image="/image/kitty.png"
				title="kitty image"
			/>
			<Typography variant="h4" component="h6" gutterBottom align="center">
				Shush!
			</Typography>
			<Typography variant="body1" align="center">
				Make sure your surrounding is absolutely{" "}
				<b>silent and disturbance free!</b>
			</Typography>
			<Typography variant="body1" align="center" gutterBottom>
				Also, drink a <b>glass of water</b>! Keep your throat
				hydrated...
			</Typography>
		</div>
	);
};

const VideoInst = () => {
	const classes = useContStyles();
	return (
		<div>
			<Typography variant="h5" component="h6" gutterBottom align="center">
				Demo video
			</Typography>
			<Divider className={classes.divider} />
			<iframe
				id="vid-player-instruction"
				width="100%"
				height="300"
				src={INSTRUCTION_VID_URL}
				title="YouTube video player: Asquire Instructions"
				frameborder="4"
				allow="autoplay; encrypted-media; picture-in-picture"
				allowFullScreen
			/>
			<Divider className={classes.divider} />
			<Typography variant="body1" align="center" gutterBottom>
				Please <b>watch the video</b> to make sure you understand the
				procedure before recording.
			</Typography>
		</div>
	);
};

export default InstructionModal;
