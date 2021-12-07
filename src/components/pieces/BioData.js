import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import BioTitle from "./BioTitle";

// Context
import { Context as UserContext } from "../../context/data/UserContext";

const BioData = () => {
	const classes = useStyles();

	const { state: userState, userUpdateAction } =
		React.useContext(UserContext);

	const [bio, setBio] = React.useState({});
	const [error, setError] = React.useState({ field: "", isErr: false });

	// inputs handles
	const handleInputs = (type, event) => {
		let data = event.target.value.trim();
		if (data === "") return setBio({ ...bio, [type]: data });

		switch (type) {
			case fields[0]: // age
				data = r_digit.test(data) ? data : bio["age"] || "";
				break;
			case fields[1]: // gender
				data = r_gender.test(data) ? data : bio["gender"] || "";
				break;
			case fields[2]: // height
				data = r_digit.test(data) ? data : bio["height"] || "";
				break;
			case fields[3]: // weight
				data = r_digit.test(data) ? data : bio["weight"] || "";
				break;
			default:
				return;
		}
		setBio({ ...bio, [type]: data });
	};

	const onNextHelper = () => {
		let f = true;

		for (let field in fields) {
			if (bio[fields[field]]?.length > 0) {
				setError({ field: "", isErr: false });
				continue;
			} else {
				setError({ field: fields[field], isErr: true });
				f = false;
				break;
			}
		}
		return f;
	};

	const handleNext = async () => {
		if (onNextHelper()) {
			const user = {
				...userState.selectedUser,
				bioDataDone: true,
				bio,
			};
			await userUpdateAction(user);
		}
	};

	return (
		<Card className={classes.root} elevation={8}>
			<BioTitle userName={userState?.selectedUser?.userName} />
			<CardContent>
				<form
					className={classes.textInput}
					noValidate
					autoComplete="off"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<TextField
						className={classes.textbox}
						id="bio-input-age"
						label="Age"
						fullWidth
						placeholder="12 to 99"
						variant="standard"
						color="secondary"
						value={bio.age || ""}
						onChange={(e) => handleInputs(fields[0], e)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									yrs
								</InputAdornment>
							),
						}}
					/>
					<TextField
						className={classes.textbox}
						id="bio-input-height"
						label="Height"
						fullWidth
						placeholder=" 62 cm  to  272 cm"
						variant="standard"
						color="secondary"
						value={bio.height || ""}
						onChange={(e) => handleInputs(fields[2], e)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									cm
								</InputAdornment>
							),
						}}
					/>
					<TextField
						className={classes.textbox}
						id="bio-input-weight"
						label="Weight"
						fullWidth
						placeholder=""
						variant="standard"
						color="secondary"
						value={bio.weight || ""}
						onChange={(e) => handleInputs(fields[3], e)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									kg
								</InputAdornment>
							),
						}}
					/>

					<TextField
						className={classes.textbox}
						id="bio-input-gender"
						select
						fullWidth
						label="Gender"
						color="secondary"
						value={bio.gender || ""}
						onChange={(e) => handleInputs(fields[1], e)}
						variant="outlined"
						helperText="Select your gender"
					>
						{genders.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</form>
			</CardContent>
			{error.isErr && (
				<FormHelperText error components="div">
					<div
						className={classes.helpertxt}
					>{`Please fill ${error.field} properly`}</div>
				</FormHelperText>
			)}
			{userState.loading && (
				<div className={classes.progress}>
					<CircularProgress color="secondary" size={28} />
				</div>
			)}
			<Button
				variant="contained"
				color="secondary"
				onClick={handleNext}
				className={classes.button}
			>
				Next
			</Button>
		</Card>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	textInput: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		maxWidth: theme.spacing(32),
		margin: "auto",
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		"& > *": {
			minWidth: "10ch",
		},
	},
	textbox: {
		marginBottom: theme.spacing(3),
	},
	button: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(1),
	},
	helpertxt: {
		textAlign: "center",
		paddingBottom: theme.spacing(2),
	},
}));

const fields = ["age", "gender", "height", "weight"];

const genders = [
	{
		value: "m",
		label: "Male",
	},
	{
		value: "f",
		label: "Female",
	},
	{
		value: "o",
		label: "Other",
	},
];

const r_digit = /^[\d+]{0,3}$/;
const r_gender = /^(m|f|o)$/;

export default BioData;
