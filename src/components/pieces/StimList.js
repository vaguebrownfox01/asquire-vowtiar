import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import { grey } from "@material-ui/core/colors";

const QontoConnector = withStyles((theme) => ({
	alternativeLabel: {
		top: 10,
		left: "calc(-50% + 16px)",
		right: "calc(50% + 16px)",
	},
	active: {
		"& $line": {
			borderColor: theme.palette.secondary.main,
		},
	},
	completed: {
		"& $line": {
			borderColor: theme.palette.secondary.main,
		},
	},
	line: {
		borderColor: grey[500],
		borderTopWidth: 2,
		borderRadius: 8,
	},
}))(StepConnector);

const useQontoStepIconStyles = makeStyles((theme) => ({
	root: {
		color: grey[600],
		display: "flex",
		height: 22,
		alignItems: "center",
	},
	active: {
		color: theme.palette.secondary.main,
	},
	circle: {
		width: 8,
		height: 8,
		borderRadius: "50%",
		backgroundColor: "currentColor",
	},
	completed: {
		color: theme.palette.secondary.main,
		zIndex: 1,
		fontSize: 22,
	},
}));

function QontoStepIcon(props) {
	const classes = useQontoStepIconStyles();
	const { active, completed } = props;

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
			})}
		>
			{completed ? (
				<Check className={classes.completed} />
			) : (
				<div className={classes.circle} />
			)}
		</div>
	);
}

const StimList = ({ labels, activeStim }) => {
	return (
		<div style={{ transform: "scale(75%)" }}>
			<Stepper
				style={{ backgroundColor: "inherit", padding: 0 }}
				alternativeLabel
				activeStep={activeStim}
				connector={<QontoConnector />}
			>
				{labels.map((label, i) => (
					<Step key={i}>
						<StepLabel StepIconComponent={QontoStepIcon}>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
};

export default StimList;
