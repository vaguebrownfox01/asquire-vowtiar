import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const Toggle = withStyles((theme) => ({
	root: {
		width: 64,
		height: 26,
		padding: 0,
		margin: theme.spacing(1),
		alignSelf: "center",
	},
	switchBase: {
		padding: 1,
		color: theme.palette.secondary.main,
		"&$checked": {
			transform: "translateX(38px)",
			"& + $track": {
				backgroundColor: theme.palette.grey[300],
				opacity: 1,
				border: "none",
			},
		},
		"&$focusVisible $thumb": {
			color: theme.palette.secondary.main,
			border: "6px solid #fff",
		},
	},
	thumb: {
		width: 24,
		height: 24,
	},
	track: {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.grey[300],
		opacity: 1,
		transition: theme.transitions.create(["background-color", "border"]),
	},
	checked: {},
	focusVisible: {},
}))(({ classes, ...props }) => {
	return (
		<Switch
			focusVisibleClassName={classes.focusVisible}
			disableRipple
			classes={{
				root: classes.root,
				switchBase: classes.switchBase,
				thumb: classes.thumb,
				track: classes.track,
				checked: classes.checked,
			}}
			{...props}
		/>
	);
});
export default Toggle;
