import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ContactIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { grey } from "@material-ui/core/colors";

const makeActionStyles = makeStyles((theme) => ({
	root: {
		color: grey[700],
		"&$selected": {
			color: theme.palette.secondary.main,
		},
	},
	selected: {
		color: theme.palette.secondary.main,
	},
}));

export default function LabelBottomNavigation() {
	const classes = useStyles();
	const actionClasses = makeActionStyles();
	const [value, setValue] = React.useState("recents");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation
			value={value}
			showLabels
			onChange={handleChange}
			className={classes.root}
		>
			<BottomNavigationAction
				label="Contact"
				value="contact"
				classes={actionClasses}
				icon={<ContactIcon />}
				href="/contact"
			/>
			<BottomNavigationAction
				label="Home"
				value="homepage"
				classes={actionClasses}
				icon={<HomeIcon />}
				href="/"
			/>
			<BottomNavigationAction
				label="Feedback"
				value="feedback"
				classes={actionClasses}
				icon={<FeedbackIcon />}
				href={"/feedback"}
			/>
		</BottomNavigation>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		bottom: "0",
		width: "100%",
		height: 32 * 2,
	},
	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));
