import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	titleDiv: {
		display: "flex",
		justifyContent: "center",
		cursor: "none",
	},
	title: {
		fontSize: theme.spacing(2),
	},

	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(1.25)",
		"&:hover": {
			transform: "scale(2)",
		},
	},
}));

const RecTitle = ({ userName }) => {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<div className={classes.titleDiv}>
			<Typography
				className={classes.title}
				color="textSecondary"
				components="div"
				gutterBottom
			>
				{`Biodata `}
				{bull}
			</Typography>
			<Typography
				className={classes.title}
				color="textSecondary"
				components="div"
				gutterBottom
			>
				{bull}
			</Typography>
			<Typography
				className={classes.title}
				color="secondary"
				components="div"
				gutterBottom
			>
				{bull}
				{` ${userName}`}
			</Typography>
		</div>
	);
};

export default RecTitle;
