import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Context
import { Context as StepContext } from "../context/data/StepContext";

// Pieces
import Status from "./pieces/Status";
import Finish from "./steps/Finish";
// const Finish = React.lazy(() => import("./steps/Finish"));

export default function VerticalLinearStepper({ components }) {
	const classes = useStyles();
	const {
		state: stepState,
		stepSetAction,
		stepPreviousAction,
	} = React.useContext(StepContext);

	React.useEffect(() => {
		return () => {
			console.log("step nav effect clean up");
		};
	});

	const handleReset = () => {
		stepSetAction(1);
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	return (
		<div className={classes.root}>
			<Status />
			<Stepper
				className={classes.stepper}
				activeStep={stepState.activeStep}
				orientation="vertical"
			>
				{components.map((item, index) => (
					<Step key={index} color="primary">
						<StepLabel>
							<Typography
								className={classes.steptitle}
								variant="body1"
								component="div"
							>
								{item.title}
							</Typography>
						</StepLabel>
						<StepContent>
							<React.Suspense
								fallback={
									<CircularProgress
										color="secondary"
										size={28}
									/>
								}
							>
								{item.component}
							</React.Suspense>
						</StepContent>
					</Step>
				))}
			</Stepper>

			{stepState.activeStep === components.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					{/* <React.Suspense
						fallback={
							<CircularProgress color="secondary" size={28} />
						}
					> */}
					<Finish />
					{/* </React.Suspense> */}
					<Button
						variant="outlined"
						disabled={stepState.activeStep === 0}
						onClick={handleBack}
						className={classes.button}
					>
						Back
					</Button>

					<Button
						onClick={handleReset}
						variant="contained"
						color="secondary"
						className={classes.button}
					>
						Record another person?
					</Button>
				</Paper>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		minHeight: "80vh",
		marginBottom: 32 * 3,
	},
	stepper: {
		background: theme.palette.background.default,
		iconColor: theme.palette.secondary.main,
	},
	button: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
		background: theme.palette.background.default,

		height: "100%",
	},
	steptitle: {
		display: "flex",
		textAlign: "flex-start",
		paddingLeft: theme.spacing(2),
	},
}));
