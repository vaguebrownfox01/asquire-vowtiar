import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// import { components } from "../../App";

// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";

// Pieces
import UserList from "../pieces/UserList";
import TextInput from "../pieces/TextInput";

const AddUserComponent = () => {
	const classes = useStyles();
	const {
		state: userState,
		userGetAllAction,
		userAddAction,
		userSelectAction,
		userLoginAction,
	} = React.useContext(UserContext);
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
	} = React.useContext(StepContext);

	const [userName, setUserName] = React.useState("");
	const [added, setAdded] = React.useState(false);
	const regxUN = /^[a-z]+(-[a-z]+)*$/;

	React.useEffect(() => {
		userGetAllAction();
		return () => {};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleNext = async (user) => {
		userLoginAction(user)
			.then((auth) => {
				auth && stepNextAction();
			})
			.catch((err) => {
				console.error("add user step ::next error", err);
			});
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	const handleUserName = (e) => {
		var input = e.target.value.toLowerCase();
		input =
			regxUN.test(input) || input === ""
				? input.length > 16
					? input.slice(0, 16)
					: input
				: userName;

		setUserName(input);
	};

	const handleAddUser = (e) => {
		userName.length > 0 &&
			userAddAction(userName).then((res) => {
				if (!res) {
					setAdded(false);
				} else {
					handleUserSelect(res);
				}
			});
		setUserName("");
		setAdded(true);
	};

	const handleUserSelect = (user) => {
		userSelectAction(user);
		handleNext(user);
	};

	const bull = <span className={classes.bullet}>•</span>;

	return (
		<>
			<Card className={classes.root} elevation={8}>
				<CardContent>
					<Typography className={classes.pos} color="textSecondary">
						Select User
					</Typography>

					<UserList
						users={userState.allUsers}
						wait={userState.loading}
						error={userState.error}
						onSelect={handleUserSelect}
					/>

					<TextInput
						{...{
							added,
							userState,
							userName,
							handleAddUser,
							handleUserName,
						}}
					/>
					<Typography
						className={classes.inst}
						variant="body2"
						component="p"
						color="textPrimary"
					>
						{bull} Enter your name and click <b>ADD USER</b>. <br />
						{bull} <b>Username</b> will be used to save your
						progress. <br />
						{bull} You can record for your <b>family and friends</b>{" "}
						in the same app.
						<br />
					</Typography>
				</CardContent>
			</Card>
			<div className={classes.actionsContainer}>
				<div>
					<Button
						disabled={stepState.activeStep === 0}
						onClick={handleBack}
						className={classes.button}
					>
						Back
					</Button>
					{/* {userState.allUsers.length > 0 && (
						<Button
							variant="contained"
							color="secondary"
							onClick={handleNext}
							className={classes.button}
						>
							{stepState.activeStep === components.length - 1
								? "Finish"
								: "Next"}
						</Button>
					)} */}
				</div>
			</div>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
	},
	pos: {
		marginBottom: 12,
	},
	inst: {
		marginTop: 12,
		marginBottom: 12,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(2)",
		color: theme.palette.secondary.main,
		"&:hover": {
			transform: "scale(2.5)",
		},
	},
	submitButton: {
		maxWidth: 120,
		borderRadius: 18,
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
}));

export default AddUserComponent;
