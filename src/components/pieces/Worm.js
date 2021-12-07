import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,

		zindex: -100,

		// display: "flex",
		// flexDirection: "column-reverse",
		// justifyContent: "space-between",

		// borderWidth: 1,
		// borderColor: red[900],
		// borderStyle: "solid",
	},
	visualizer: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,

		width: "100%",
		height: "100%",
		overflow: "visible",

		// borderWidth: 1,
		// borderColor: blue[900],
		// borderStyle: "solid",
	},

	shape: {
		strokeWidth: 0.1,
		opacity: 0.95,
		zIndex: -1,

		// stroke: "black",
	},
}));
const Worm = ({ width, height, shape, analyserNode }) => {
	const classes = useStyles();
	const animRef = React.useRef();

	const [spectrum, setSpectrum] = React.useState({ bins: [] });

	const drawBinCB = React.useCallback(
		(a, i) => {
			const bw = Math.ceil(width / spectrum.bins.length);
			const x = bw * i;
			const ynorm = a / 255;
			const r = Math.round((ynorm * height) / 6);
			const y = height;
			const draw = shape ? (
				<circle
					key={i}
					className={classes.shape}
					cx={x}
					cy={y - r}
					r={r}
					fill={`hsl(${70 * ynorm}deg, 70%, 50%`}
				/>
			) : (
				<rect
					key={i}
					className={classes.shape}
					x={x}
					y={height - r}
					width={bw}
					height={r}
					fill={`hsl(${70 * ynorm}deg, 70%, 50%`}
				/>
			);
			return draw;
		},
		[spectrum] // eslint-disable-line react-hooks/exhaustive-deps
	);

	React.useEffect(() => {
		const setAnalyserNode = async () => {
			const animate = () => {
				animRef.current = requestAnimationFrame(animate);

				if (analyserNode) {
					const bufferLength = analyserNode.frequencyBinCount;
					const dataArrayBuffer = new Uint8Array(bufferLength);
					analyserNode.getByteFrequencyData(dataArrayBuffer);

					// let dataArray = [...dataArrayBuffer].slice(
					// 	0,
					// 	Math.floor(bufferLength / 3)
					// );

					// dataArray = dataArray.map((d) => (d < 255 / 70 ? 0 : d));

					setSpectrum({ bins: [...dataArrayBuffer] });
				}
			};

			animRef.current = requestAnimationFrame(animate);
			console.log("worm effect");
		};
		setAnalyserNode();

		return () => {
			cancelAnimationFrame(animRef.current);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div className={classes.root}>
				<svg className={classes.visualizer}>
					{spectrum.bins && spectrum.bins.map(drawBinCB)}
				</svg>
			</div>
		</>
	);
};

export default Worm;
