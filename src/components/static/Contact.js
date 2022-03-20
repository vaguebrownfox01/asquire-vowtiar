import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	Avatar,
	Tooltip,
	ListItemText,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemAvatar } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import { spire_logo_url } from "../../functions/firebaseSetup";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "90vh",
		background: theme.palette.primary.main,
		padding: theme.spacing(4),
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	title: {
		fontSize: 16,
	},
	avatar: {
		width: theme.spacing(24),
		height: theme.spacing(24),
		borderWidth: 1,
		background: theme.palette.background.default,
		borderColor: theme.palette.primary.contrastText,
	},
	listroot: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	listitem: {
		cursor: "pointer",
		margin: theme.spacing(0, 0, 1, 0),
	},
	link: {
		color: theme.palette.secondary.main,
	},
	note2: {
		width: "40%",
		minWidth: theme.spacing(24),
		padding: theme.spacing(1),
		margin: theme.spacing(1),
		borderRadius: theme.spacing(1),
		border: `1px solid ${theme.palette.secondary.main}`,
	},
}));

export default function Contact() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<Typography
					className={classes.title}
					color="textSecondary"
					variant="h6"
					gutterBottom
				>
					Contact us
				</Typography>
				<Avatar
					alt="Spire lab logo"
					variant="circular"
					src={`/image/spire_logo_sq.png`}
					className={classes.avatar}
				/>
				<Typography color="secondary" variant="h6" gutterBottom>
					SPIRE Lab |&nbsp;
					<a
						className={classes.link}
						href="https://spire.ee.iisc.ac.in/spire/"
					>
						spire.ee.iisc.ac.in/spire
					</a>
				</Typography>

				<ContactList />
				<Typography
					className={classes.note2}
					color="textPrimary"
					variant="body1"
				>
					<b>
						Please let us know if you are facing any problem in the
						application! <br />
						Thank you.
					</b>
				</Typography>
			</CardContent>
		</Card>
	);
}

const contacts = [
	{
		name: "SPIRE Lab",
		email: "spirelab.ee@iisc.ac.in",
		pos: "IISc",
	},
	{
		name: "Shaique Solanki",
		email: "mohammads@iisc.ac.in",
		pos: "JRF",
	},
	{
		name: "Jeevan K",
		email: "jeevank@iisc.ac.in",
		pos: "Research Assistant",
	},
];

const ContactList = () => {
	const classes = useStyles();

	return (
		<List className={classes.listroot}>
			{contacts.map((c, i) => (
				<div
					className={classes.listitem}
					key={i}
					onClick={(e) => copyToClipboard(e, c.email)}
				>
					<Tooltip title="Click to copy email" placement="right">
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<MailIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={`${c.name}`}
								secondary={`${c.pos} | ${c.email}`}
							/>
						</ListItem>
					</Tooltip>
				</div>
			))}
		</List>
	);
};

const copyToClipboard = (e, text) => {
	navigator.clipboard.writeText(text);
};
