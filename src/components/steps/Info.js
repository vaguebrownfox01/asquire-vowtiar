import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BioData from "../pieces/BioData";
import Survey from "../pieces/Survey";

import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	button: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(1),
	},
}));

const Info = () => {
	const classes = useStyles();
	const { state: userState } = React.useContext(UserContext);
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
		stepSetAction,
	} = React.useContext(StepContext);

	React.useEffect(() => {
		if (
			userState.selectedUser.bioDataDone &&
			userState.selectedUser.surveyDone
		) {
			if (stepState.previousStep < stepState.activeStep) {
				stepNextAction();
			} else if (stepState.previousStep > stepState.activeStep) {
				stepSetAction(1);
			}
		}
		return () => {};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleBack = () => {
		stepPreviousAction();
	};

	return (
		<div>
			<>
				{!userState?.selectedUser?.bioDataDone ? (
					<BioData />
				) : !userState?.selectedUser?.surveyDone ? (
					<Survey />
				) : (
					<CircularProgress color="secondary" size={28} />
				)}
			</>
			<div className={classes.actionsContainer}>
				<div>
					<Button
						disabled={stepState.activeStep === 0}
						onClick={handleBack}
						className={classes.button}
					>
						Back
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Info;
