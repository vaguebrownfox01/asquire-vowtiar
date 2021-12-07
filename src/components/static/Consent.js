import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "90vh",
		background: theme.palette.primary.main,
		padding: theme.spacing(4),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		marginBottom: theme.spacing(4),
	},
	pos: {
		marginBottom: 12,
	},

	subtitleDiv: {
		marginRight: "auto",
		marginLeft: "auto",
		maxWidth: 600,
	},
	subtitle: {
		fontWeight: "bold",
	},

	consentbutton: {
		textTransform: "none",
		marginTop: theme.spacing(1),
	},
	terms: {
		paddingTop: theme.spacing(2),
	},
}));

export default function Consent() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					variant="h6"
					component="div"
					color="textSecondary"
					gutterBottom
				>
					Consent to Audio Recording
				</Typography>

				<div className={classes.subtitleDiv}>
					<Typography
						className={classes.subtitle}
						color="textPrimary"
						variant="subtitle1"
						component="div"
						gutterBottom
					>
						Confidentiality of your data
					</Typography>
					<Typography
						color="secondary"
						variant="body2"
						component="div"
						paragraph
					>
						The records of this study will be kept confidential.
						Only the researchers associated with this study will be
						given access to the data provided by you.
					</Typography>
				</div>

				<div className={classes.subtitleDiv}>
					<Typography
						className={classes.subtitle}
						color="textPrimary"
						variant="subtitle1"
						component="div"
						gutterBottom
					>
						Taking part is voluntary
					</Typography>
					<Typography
						color="secondary"
						variant="body2"
						component="div"
						paragraph
					>
						Taking part in this study is completely voluntary.
						Participants can pause whenever they are tired in the
						long recordings and they are free to leave recording at
						any time for any reason. Even after signing the informed
						consent form, a participant may choose to withdraw from
						recording.
					</Typography>
				</div>

				<div className={classes.subtitleDiv}>
					<Typography
						className={classes.subtitle}
						color="textPrimary"
						variant="subtitle1"
						component="div"
						gutterBottom
					>
						Statement of Consent
					</Typography>
					<Typography
						color="secondary"
						variant="body2"
						component="div"
						paragraph
					>
						I have read the above information. I consent to take
						part in the study
					</Typography>
				</div>

				<div className={classes.terms}>
					<Button
						className={classes.consentbutton}
						variant="outlined"
						size="small"
						color="inherit"
						href="/"
					>
						Get started!
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
