import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Menu, MenuItem } from "@material-ui/core";

// Context
import { Context as RecordContext } from "../../context/data/RecordContext";

const useDeviceListStyle = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	button: {
		textTransform: "none",
		margin: theme.spacing(1),
	},
}));

const DeviceList = ({ type, devices, iconStart, iconEnd }) => {
	const classes = useDeviceListStyle();
	const { recordSetInputAction, recordSetOutputAction } = React.useContext(
		RecordContext
	);

	// Menu UI State
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelect = (dev) => {
		switch (type) {
			case "input":
				recordSetInputAction(dev);
				break;
			case "output":
				recordSetOutputAction(dev);
				break;
			default:
				break;
		}
		setAnchorEl(null);
	};
	return (
		<div className={classes.root}>
			<Button
				className={classes.button}
				aria-controls="simple-menu"
				aria-haspopup="true"
				variant="outlined"
				onClick={handleClick}
				startIcon={iconStart}
				endIcon={iconEnd}
			></Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{devices.map((dev, i) => (
					<MenuItem key={i} onClick={() => handleSelect(dev)}>
						{dev.label}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default DeviceList;
