import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 10,
		borderRadius: 5,
		margin: theme.spacing(1),
	},
	colorPrimary: {
		backgroundColor: theme.palette.grey[300],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: theme.palette.secondary.main,
	},
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
	root: {
		width: "70%",
		maxWidth: theme.spacing(64),
	},
}));

const TIMES = 1;
const cent = (labels, activeStim) => {
	return (activeStim / TIMES / labels.length || 0) * 100;
};

export default function StimProgress({ labels, activeStim }) {
	const classes = useStyles();

	const [progress, setProgress] = React.useState(cent(labels, activeStim));
	React.useEffect(() => {
		let p = cent(labels, activeStim);
		setProgress(Math.ceil(p));
	}, [activeStim, labels]);

	return (
		<span className={classes.root}>
			<BorderLinearProgress variant="determinate" value={progress} />
			<Typography variant="body2">{progress}% completed</Typography>
		</span>
	);
}
