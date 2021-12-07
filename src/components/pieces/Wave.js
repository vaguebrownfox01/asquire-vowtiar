import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	root: {
		// position: "absolute",
		// top: 0,
		// bottom: 0,
		// left: 0,
		// right: 0,

		width: theme.spacing(64),
		height: theme.spacing(24),

		// display: "flex",
		// flexDirection: "column-reverse",
		// justifyContent: "space-between",

		borderWidth: 1,
		borderColor: red[900],
		borderStyle: "solid",
	},
	visualizer: {
		// top: 0,
		// bottom: 0,
		// left: 0,
		// right: 0,

		width: "100%",
		height: "100%",
		// overflow: "hidden",

		borderWidth: 1,
		borderColor: blue[900],
		borderStyle: "solid",
	},

	shape: {
		strokeWidth: 0.1,
		opacity: 0.95,
		zIndex: -1,

		// stroke: "black",
	},
}));
const Worm = ({ width, height, audioBuffer }) => {
	const classes = useStyles();

	const [data, setData] = React.useState([]);

	const drawBinCB = React.useCallback(
		(a, i) => {
			const bw = Math.ceil(width / audioBuffer.length);
			const x = bw * i;
			const ynorm = a;
			const r = Math.round(ynorm * height);
			const y = height;
			const draw = (
				<rect
					key={i}
					className={classes.shape}
					x={x}
					y={y + (y - r) / 2}
					width={bw}
					height={r}
					fill={`hsl(${40 * ynorm}deg, 70%, 50%`}
				/>
			);

			return draw;
		},
		[] // eslint-disable-line react-hooks/exhaustive-deps
	);

	React.useEffect(() => {
		let d = audioBuffer.map((e) => Math.abs(e));
		let m = Math.max.apply(Math, d);
		d = d.map((e) => e / m);

		setData([2, ...d, 2]);
		return () => {
			console.log("Wave component cleanup");
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div className={classes.root}>
				<svg className={classes.visualizer}>
					{data && data.map(drawBinCB)}
				</svg>
			</div>
		</>
	);
};

export default Worm;
