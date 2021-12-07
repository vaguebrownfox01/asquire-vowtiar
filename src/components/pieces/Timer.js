import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	timer: {
		color: theme.palette.secondary.main,
	},
}));
const Timer = ({ seconds }) => {
	const classes = useStyles();

	return (
		<Typography variant="h6" className={classes.timer} gutterBottom>
			<b>{time(seconds)}</b>
		</Typography>
	);
};

export default Timer;

const time = (secs) => {
	var min = Math.floor(secs / 60) || 0;
	var sec = Math.floor(secs % 60) || 0;
	if (sec < 10) {
		return `0${min}:0${sec}`;
	} else {
		return `0${min}:${sec}`;
	}
};
