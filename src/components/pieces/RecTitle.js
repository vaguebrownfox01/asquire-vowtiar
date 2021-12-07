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
		fontSize: 14,
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
const RecTitle = ({ userName, s }) => {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<div className={classes.titleDiv}>
			<Typography
				className={classes.title}
				color="textSecondary"
				components="div"
				onClick={() => s()}
			>
				{`Recording for `}
				{bull}
			</Typography>
			<Typography
				className={classes.title}
				color="textSecondary"
				components="div"
				onClick={() => s()}
			>
				{bull}
			</Typography>
			<Typography
				className={classes.title}
				color="secondary"
				components="div"
				onClick={() => s()}
			>
				{bull}
				{` ${userName}`}
			</Typography>
		</div>
	);
};

export default RecTitle;
