import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Backdrop,
	Button,
	CircularProgress,
	Divider,
	Fade,
	Modal,
	Typography,
} from "@material-ui/core";
import { lightGreen, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "rgb(255, 255, 255, 0.9)",
		border: "2px solid",
		borderColor: theme.palette.secondary.main,
		borderRadius: 8,
		boxShadow: theme.shadows[5],
		minHeight: "20vh",
		minWidth: "20ch",
		padding: theme.spacing(2, 2, 3),
		margin: theme.spacing(1),
	},
	button: {
		textTransform: "none",
		marginTop: theme.spacing(4),
		alignSelf: "flex-end",
	},
	divider: {
		marginBottom: theme.spacing(2),
	},
	scoreOk: {
		color: lightGreen[700],
	},
	scoreBad: {
		color: red[700],
	},
}));

const VadRes = ({ modalOpen, handleClose, vadRes }) => {
	const classes = useStyles();

	return (
		<Modal
			className={classes.modal}
			style={{ overflow: "scroll" }}
			open={modalOpen}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={modalOpen}>
				<div className={classes.modalContent}>
					{!vadRes.calc ? (
						<EvalRes vadRes={vadRes} />
					) : (
						<>
							<Typography
								variant="body"
								color="secondary"
								align="center"
								gutterBottom
							>
								<b>Evaluating your recording... Please wait!</b>
							</Typography>
							<CircularProgress color="secondary" size={28} />
						</>
					)}
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleClose}
						className={classes.button}
					>
						Continue...
					</Button>
				</div>
			</Fade>
		</Modal>
	);
};

const EvalRes = ({ vadRes }) => {
	const classes = useStyles();
	return (
		<div>
			<Typography variant="h5" component="h6" gutterBottom align="center">
				Your recording score!
			</Typography>
			<Divider className={classes.divider} />
			<Typography variant="body1" align="center">
				{`Number of repetition detected`}
			</Typography>
			<Typography variant="h5" align="center" gutterBottom>
				<b>{vadRes.count}</b>
			</Typography>

			<Typography variant="body1" align="center">
				{`Average sustain duration`}
			</Typography>
			<Typography variant="h5" align="center" gutterBottom>
				<b>{vadRes.avg}s</b>
			</Typography>

			<Typography variant="body1" align="center">
				{`Score`}
			</Typography>
			<Typography variant="h4" align="center" gutterBottom>
				<b
					className={
						vadRes.score > 5 ? classes.scoreOk : classes.scoreBad
					}
				>{`${vadRes.score}`}</b>
				<b>/10</b>
			</Typography>

			{vadRes.score < 5 && (
				<Typography
					variant="caption"
					style={{ color: red[700] }}
					align="center"
					gutterBottom
				>
					<b>
						*Please make sure you followed the instruction properly.
					</b>
				</Typography>
			)}
		</div>
	);
};

export default VadRes;
