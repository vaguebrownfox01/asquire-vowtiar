import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as SurveyContext } from "../../context/data/SurveyContext";
import { Context as UserContext } from "../../context/data/UserContext";
// Pieces
import Question from "../pieces/Question";
import SurveyProgress from "./SurveyProgress";

const Survey = () => {
	const classes = useStyles();

	const { stepNextAction } = React.useContext(StepContext);

	const { state: surveyState, surveyLoadQuestionsAction } =
		React.useContext(SurveyContext);

	const {
		state: userState,
		userUpdateAction,
		userUpdateCloud,
	} = React.useContext(UserContext);

	React.useEffect(() => {
		if (!userState.selectedUser.surveyDone) {
			surveyLoadQuestionsAction();
		}
		return () => {};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleNext = async () => {
		const user = {
			...userState.selectedUser,
			surveyDone: true,
			survey: surveyState.previousQuestions,
		};
		await userUpdateAction(user);
		await userUpdateCloud(user);
		stepNextAction();
	};

	return (
		<Card className={classes.root} elevation={8}>
			<CardContent>
				<Question anim={surveyState.surveyAnim} />
				{surveyState.allQuestions && (
					<div className={classes.surveyProg}>
						<SurveyProgress
							{...{
								questions: Object.keys(
									surveyState.allQuestions
								),
								activeQno: surveyState.currentQuestion.qno,
							}}
						/>
					</div>
				)}
				{userState.loading && (
					<CircularProgress color="secondary" size={28} />
				)}

				{surveyState.surveyDone && (
					<Button
						variant="contained"
						color="secondary"
						onClick={handleNext}
						className={classes.button}
					>
						Next
					</Button>
				)}
			</CardContent>
		</Card>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
	},
	button: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(1),
	},
	surveyProg: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		maxWidth: "50ch",
		margin: "auto",
	},
}));

export default Survey;
