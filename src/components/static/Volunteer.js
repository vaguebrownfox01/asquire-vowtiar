import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Content from "../pieces/Content";

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

const posts = [
	{
		index: 0,
		// link: "https://firebasestorage.googleapis.com/v0/b/indsca-prod.appspot.com/o/content%2Fmucs2021.md?alt=media&token=07fe7fae-b256-4264-804b-a56312700829",
		link: "/doc/volunteer.md",
		title: "Test",
	},
];

export default function Volunteer() {
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
					Instructions to Volunteers
				</Typography>
				{/* <Paper className={classes.form}> */}
				<Content posts={posts} />
				{/* </Paper> */}
				<Typography variant="body2" component="p">
					{bull} Thank you.
				</Typography>
			</CardContent>
		</Card>
	);
}
