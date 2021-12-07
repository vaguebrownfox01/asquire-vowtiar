import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { activeQuery } from "../../functions/firestore";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		background: theme.palette.primary.card,
		margin: theme.spacing(1),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	key: {
		margin: theme.spacing(1),
		fontSize: 16,
	},
	value: {
		fontSize: 16,
	},
	content: {
		display: "flex",
		justifyContent: "center",
	},
	span: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textDecoration: "none",
		textTransform: "none",
		width: "100%",
		height: "100%",
	},
	progress: {
		display: "flex",

		alignItems: "center",
	},
}));

export default function Status() {
	const classes = useStyles();

	const [users] = useCollectionData(activeQuery);

	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<Grid container spacing={2}>
					{/* <Grid item className={classes.item} md={4} xs={12}>
						<Paper
							className={classes.span}
							elevation={3}
							variant="outlined"
							color="secondary"
						>
							<Button
								className={classes.value}
								size="small"
								color="secondary"
								variant="text"
							>
								{106}
							</Button>
							<Typography
								className={classes.key}
								color="textPrimary"
								variant="h6"
								component="div"
								gutterBottom
							>
								users recorded so far
							</Typography>
						</Paper>
					</Grid> */}
					<Grid item className={classes.item} md={12} xs={12}>
						<Paper
							className={classes.span}
							elevation={3}
							variant="outlined"
							color="secondary"
						>
							{users?.length ? (
								<Button
									className={classes.value}
									color="secondary"
									variant="text"
								>
									{users?.length}
								</Button>
							) : (
								<CircularProgress
									className={classes.progress}
									color="secondary"
									size={16}
								/>
							)}
							<Typography
								className={classes.key}
								color="textPrimary"
								variant="h6"
								component="div"
								gutterBottom
							>
								{`user${
									users?.length === 1 ? "" : "s"
								} currently recording`}
							</Typography>
						</Paper>
					</Grid>
					{/* <Grid item className={classes.item} md={4} xs={12}>
						<Paper
							className={classes.span}
							variant="outlined"
							color="secondary"
						>
							<Button
								className={classes.value}
								color="secondary"
								variant="text"
							>
								{1000}
							</Button>
							<Typography
								className={classes.key}
								color="textPrimary"
								variant="h6"
								component="div"
								gutterBottom
							>
								recordings required
							</Typography>
						</Paper>
					</Grid> */}
				</Grid>
			</CardContent>
		</Card>
	);
}
