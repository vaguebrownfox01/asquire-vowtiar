import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "90vh",
		background: theme.palette.primary.main,
		padding: theme.spacing(2),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	form: {
		paddingTop: theme.spacing(4),
	},
}));

export default function Feedback() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Feedback
				</Typography>
				{/* <Paper className={classes.form}> */}
				<iframe
					title="Feedback Form"
					src="https://docs.google.com/forms/d/e/1FAIpQLSdh_oCUwF2IDFOFqs_0cxFXbK138EUxopobZK-yYWRdQOjjDA/viewform?embedded=true"
					width="100%"
					height="2000"
					frameborder="0"
					marginheight="0"
					marginwidth="0"
				>
					Loading…
				</iframe>
				{/* </Paper> */}
				<Typography variant="body2" component="p">
					{bull} Google form
				</Typography>
			</CardContent>
		</Card>
	);
}
