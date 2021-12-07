import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	textInput: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		alignContent: "center",
		marginTop: 32,
		"& > *": {
			margin: theme.spacing(1),
			minWidth: "20ch",
		},
	},
}));
const TextInput = ({
	added,
	userName,
	userState,
	handleAddUser,
	handleUserName,
}) => {
	const classes = useStyles();

	return (
		<>
			<form
				className={classes.textInput}
				noValidate
				autoComplete="off"
				onSubmit={(e) => {
					e.preventDefault();
					console.log("submit");
					handleAddUser();
				}}
			>
				{userState.loading && (
					<div className={classes.progress}>
						<CircularProgress color="secondary" size={28} />
					</div>
				)}

				{(!added || userState.allUsers.length < 1) && (
					<>
						<Typography
							className={classes.pos}
							color="textSecondary"
						>
							Or
						</Typography>
						<TextField
							id="outlined-basic"
							label="Enter New Username"
							placeholder={`Eg. "cooldude" (a to z only)`}
							variant="standard"
							color="secondary"
							value={userName}
							onChange={handleUserName}
						/>
						<Button
							className={classes.submitButton}
							variant="contained"
							color="secondary"
							onClick={handleAddUser}
						>
							Add User
						</Button>
					</>
				)}
			</form>
		</>
	);
};

export default TextInput;
