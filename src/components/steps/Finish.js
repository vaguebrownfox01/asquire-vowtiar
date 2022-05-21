import { Button, Collapse, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { blue, green, lightGreen, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GoodMoodIcon from "@material-ui/icons/Mood";
import BadMoodIcon from "@material-ui/icons/MoodBad";
import PagesIcon from "@material-ui/icons/Pages";
import OKMoodIcon from "@material-ui/icons/SentimentSatisfiedAltRounded";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
// Context
import { Context as RecordContext } from "../../context/data/RecordContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { volconQuery } from "../../functions/firestore";
import useContainerDimensions from "../../hooks/useContainerDimensions";
import Voice from "../pieces/Voice";
import Worm from "../pieces/Worm";

export default function Finish() {
	const classes = useStyles();

	const { state: recordState } = React.useContext(RecordContext);

	const { state: userState } = React.useContext(UserContext);

	const vizRef = React.useRef();

	const [anim, setAnim] = React.useState(false);
	const [done, setDone] = React.useState(false);
	const [link, setLink] = React.useState({
		volunteerLink: "",
		msg: "",
		query: null,
		cons: "0",
		s: "s",
	});

	const [volcons] = useCollectionData(link.query);

	React.useEffect(() => {
		if (!volcons) return;

		const cons = `${
			volcons?.filter((c) => c.recordingDone)?.length || "0"
		}`;
		setLink((p) => ({ ...p, cons, s: cons === 1 ? "" : "s" }));
	}, [volcons]);

	React.useEffect(() => {
		let d =
			userState.selectedUser.completed >=
			userState.selectedUser.stimOrder.length;
		setDone(d);

		let vLink = `https://asquire.web.app/?volunteerId=${userState.selectedUser.userId}`;
		let rLink = `https://spire-remuneration.web.app/?userid=${userState.selectedUser.userId}&volunteerId=${userState.selectedUser.volunteerId}`;

		let query = volconQuery(userState.selectedUser.userId);
		setLink({
			volunteerLink: vLink,
			remunLink: rLink,
			msg: "Volunteers: click on the link above to copy!",
			query: query,
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleAnim = () => {
		setAnim(true);
	};

	const handleCopyLink = () => {
		copyToClipboard(link.volunteerLink);
		setLink({
			...link,
			msg: "Link copied! Share it with your friends and family!",
		});

		setTimeout(() => {
			setLink({
				...link,
				msg: "Volunteers: click on the link above to copy, again!",
			});
		}, 10e3);
	};

	const { width, height } = useContainerDimensions(vizRef, recordState);

	return (
		<Card ref={vizRef} className={classes.root} elevation={8}>
			{recordState.isRecording && (
				<Worm
					{...{
						width,
						height,
						shape: "circle",
						analyserNode: recordState.analyserNode,
					}}
				/>
			)}
			<CardContent className={classes.content}>
				<>
					<div className={classes.title}>
						<Typography
							className={classes.title}
							color="textPrimary"
							variant="h6"
							gutterBottom
						>
							<b>Thank you</b>
						</Typography>
						<Typography
							className={classes.title}
							color="secondary"
							variant="h6"
							gutterBottom
						>
							<b>{` ${userState.selectedUser.userName} `}</b>
						</Typography>
					</div>
					<Typography
						className={classes.title}
						color="textPrimary"
						variant="h6"
						gutterBottom
					>
						<b>for supporting the development of Asquire.</b>
					</Typography>

					<Typography
						className={classes.note}
						color="textPrimary"
						variant="body1"
						gutterBottom
					>
						Your data is saved,
						<br />
						You may close this application.
						<br />
					</Typography>

					{done ? (
						<>
							<Button
								className={classes.button}
								fullWidth
								variant="contained"
								size="large"
								color="secondary"
								href={link.remunLink}
								target="_blank"
							>
								Register for compensation
							</Button>
						</>
					) : (
						<>
							<Typography
								className={classes.note2}
								color="textPrimary"
								variant="body2"
								gutterBottom
							>
								<b>Note: </b>
								Please complete all the tasks to register for
								compensation.{" "}
								<a href="/contact">
									{" "}
									<b>Contact us</b>{" "}
								</a>{" "}
								if you have any queries.
							</Typography>
						</>
					)}

					<>
						<div className={classes.vcount}>
							<Typography variant="body1" gutterBottom>
								{`You have invited...`}
							</Typography>
							<Button
								className={classes.value}
								color="secondary"
								variant="text"
							>
								{`${link.cons ? link.cons : "0"}`}
							</Button>
							<Typography variant="body1" gutterBottom>
								{`contributor${link.s ? link.s : "s"} so far!`}
							</Typography>
						</div>
						<Button
							className={classes.copyLinkButton}
							variant="outlined"
							onClick={handleCopyLink}
							size="small"
							color="secondary"
							gutterBottom
						>
							{link.volunteerLink}
						</Button>
						<Typography
							className={classes.linkMsg}
							variant="body2"
							gutterBottom
						>
							{link.msg}
						</Typography>
					</>

					<Button
						className={classes.button}
						fullWidth
						variant="outlined"
						size="large"
						color="secondary"
						href="/feedback"
						target="_blank"
					>
						Please Give feedback!
					</Button>

					<span>
						<IconButton href="/feedback" target="_blank">
							<BadMoodIcon
								className={classes.feedback}
								fontSize="large"
								style={{ color: red[700] }}
							/>
						</IconButton>
						<IconButton
							color="secondary"
							href="/feedback"
							target="_blank"
						>
							<OKMoodIcon
								className={classes.feedback}
								fontSize="large"
							/>
						</IconButton>
						<IconButton href="/feedback" target="_blank">
							<GoodMoodIcon
								className={classes.feedback}
								fontSize="large"
								style={{ color: lightGreen[700] }}
							/>
						</IconButton>
					</span>
				</>

				<Typography
					className={classes.title}
					color="textSecondary"
					variant="body2"
					gutterBottom
				>
					{`Here's something fun! click it! :)`}
				</Typography>

				{!anim && (
					<IconButton
						className={classes.funIcon}
						color="secondary"
						onClick={handleAnim}
					>
						<PagesIcon className={classes.feedback} />
					</IconButton>
				)}

				<Collapse in={anim}>
					<div className={classes.voice}>
						<Voice
							{...{
								userState,
								completed: userState.selectedUser.completed,
							}}
						/>
					</div>
				</Collapse>
			</CardContent>
		</Card>
	);
}

const copyToClipboard = (text) => {
	navigator.clipboard.writeText(text);
};

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		background: theme.palette.background.default,
	},
	title: {
		display: "flex",
		justifyContent: "center",
		cursor: "none",
		whiteSpace: "pre-wrap",
	},
	note: {
		width: "50%",
		minWidth: theme.spacing(32),
	},
	note2: {
		width: "40%",
		minWidth: theme.spacing(24),
		padding: theme.spacing(1),
		borderRadius: theme.spacing(1),
		border: `1px solid ${theme.palette.secondary.main}`,
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	feedback: {
		margin: theme.spacing(1),
		fontSize: theme.spacing(6),
	},
	voice: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
	},
	funIcon: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(1),
		animation: `$spin 4096ms  infinite linear`,
	},
	button: {
		maxWidth: theme.spacing(32),
		margin: theme.spacing(2),
		textTransform: "none",
	},
	copyLinkButton: {
		textTransform: "none",
		padding: theme.spacing(0, 2),
		margin: theme.spacing(2, 0, 1),
		fontWeight: "900",
	},
	linkMsg: {
		color: blue[700],
		fontWeight: "bold",
	},
	vcount: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		border: "4px dotted",
		borderRadius: "8px",
		borderColor: green[700],
		padding: theme.spacing(2),
		margin: theme.spacing(2, 0, 0),
	},
	value: {
		fontSize: 42,
		color: green[900],
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
}));
