import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import RecordStartIcon from "@material-ui/icons/Mic";
import DropArrowIcon from "@material-ui/icons/ArrowDropDown";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeviceList from "../pieces/DevList";

const useStyles = makeStyles((theme) => ({
	devices: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "flex-start",
		alignContent: "flex-start",
		padding: theme.spacing(0),
	},
	deviceSelect: {
		maxWidth: theme.spacing(16),
	},
	buttonRefresh: {
		textTransform: "none",
		marginBottom: theme.spacing(4),
	},
	progress: {
		minHeight: 34,
	},
}));
const RecDevices = ({ recordState, handleRefresh }) => {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.devices}>
				<div className={classes.deviceSelect}>
					<DeviceList
						type="input"
						devices={recordState.audioDevices.inputDevices}
						iconStart={<RecordStartIcon />}
						iconEnd={<DropArrowIcon />}
					/>

					<Typography
						color="textSecondary"
						variant="body2"
						container="div"
						gutterBottom
						noWrap
						style={{ zIndex: 100 }}
					>
						{`${recordState.inputDevice?.label}`}
					</Typography>
				</div>
			</div>

			<div className={classes.progress}>
				{recordState.loading && (
					<CircularProgress color="secondary" size={28} />
				)}
			</div>

			<IconButton
				className={classes.buttonRefresh}
				aria-label="refresh-devices"
				size="medium"
				onClick={handleRefresh}
			>
				<RefreshIcon />
			</IconButton>
		</div>
	);
};

export default RecDevices;
