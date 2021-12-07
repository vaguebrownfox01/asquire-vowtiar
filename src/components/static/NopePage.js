import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Voice from "../pieces/Voice";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		minHeight: "90vh",
		background: theme.palette.secondary.background_o,
		display: "flex",
		justifyContent: "center",
		width: "100%",
		padding: theme.spacing(2),
	},
	voice: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
	},
}));

export default function NopePage() {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<div className={classes.voice}>
				<Voice
					{...{
						completed: 8,
					}}
				/>
			</div>
		</Card>
	);
}
