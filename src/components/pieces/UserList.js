import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import ProfileIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
	userList: {
		width: "100%",
		maxWidth: 240,
		marginLeft: "auto",
		marginRight: "auto",
	},
	helpertxt: {
		textAlign: "center",
	},
}));

const UserList = ({ users, error, onSelect, wait }) => {
	const classes = useStyles();
	const [selectedUser, selectUser] = React.useState({});

	React.useEffect(() => {
		let userSelect = {};
		users.forEach((u) => {
			userSelect[u.userId] = false;
		});
		selectUser(userSelect);
		return () => {};
	}, [users]);

	const handleChange = (e, user) => {
		selectUser({ [e.target.value]: true });
		onSelect(user);
	};
	return (
		<div className={classes.userList}>
			<FormControl component="fieldset" className={classes.formControl}>
				<FormGroup>
					{users.length > 0 &&
						users.map((user, i) => {
							return (
								<FormControlLabel
									key={i}
									control={
										<Checkbox
											disabled={wait}
											icon={<ProfileIcon />}
											checkedIcon={<ProfileIcon />}
											checked={
												selectedUser[user?.userId] ||
												false
											}
											onChange={(e) =>
												handleChange(e, user)
											}
											name={user?.userName}
											value={user?.userId}
										/>
									}
									label={user.userName}
								/>
							);
						})}
				</FormGroup>
			</FormControl>

			{
				<FormHelperText error component="div">
					<div className={classes.helpertxt}>{error}</div>
				</FormHelperText>
			}

			<Divider />
		</div>
	);
};

export default UserList;
