this.addEventListener("message", (e) => {
	const inputSignal = e.data.channel; // input audio signal
	const fs = e.data.fs; // sampling frequency

	// Constants
	const ENGWP = 0.72; // Energy window
	const THRP = 0.22; // Threshold point
	const PADD = 1.3; // Padding duration

	const MAX_SCR = 10;
	const MIN_SEC = 6; // minimum seconds to sustain a phonation
	const MIN_CNT = 3; // minimum times to repeat a phonation

	// Pad zeros to the signal
	const padLen = Math.ceil(PADD * fs);
	const padArr = new Float32Array(padLen);
	const inputPaddedSignal = new Float32Array(inputSignal.length + 2 * padLen);
	inputPaddedSignal.set(padArr, 0);
	inputPaddedSignal.set(inputSignal, padLen);

	// Calculate energy
	let N = Math.round(ENGWP * fs);
	let nFrames = Math.floor(inputPaddedSignal.length / N);
	let energyArr = new Float32Array(nFrames);
	let timeArr = new Float32Array(nFrames);
	let maxEngy = 0;

	for (let i = 0; i < nFrames; i++) {
		let slice = inputPaddedSignal.slice(i * N, (i + 1) * N);
		let sum = slice.reduce((a, b) => a + Math.pow(b, 2));
		let mean = sum / N;
		maxEngy = mean > maxEngy ? mean : maxEngy;
		energyArr[i] = mean;
		timeArr[i] = (i * N) / fs;
	}

	// Calculate threshold: range
	let countArr = [];
	let tint = [];
	for (let t = 0.02; t < THRP; t += 0.02) {
		let thr = t * maxEngy;
		let sign = energyArr.map((e) => (e - thr > 0 ? 1 : -1)); // signed array
		let temp1 = sign.slice(1); // shifted array
		let signp = temp1.map((s, i) => sign[i] * s); // signed points

		tint = signp.reduce((a, s, i) => (s < 0 ? [...a, timeArr[i]] : a), []);

		// Threshold count array
		countArr.push(Math.ceil(tint.length / 2));
	}

	// Calculate average stim duration
	let time = (tint.length % 2 ? tint.slice(0, -1) : tint).reduce(
		(a, t, i, p) => (i % 2 ? a : [...a, p[i + 1] - t]),
		[]
	);
	let avg = time.reduce((s, t) => s + t, 0) / time.length;
	avg = isNaN(avg) ? 0 : avg.toFixed(1);

	// Calculate stim count : mode
	let count = 0;
	if (countArr.length > 0) {
		let countMap = countArr.reduce((a, c) => {
			if (!a[c]) a[c] = 0;
			a[c] += 1;
			return a;
		}, {});
		count = parseInt(
			Object.keys(countMap).reduce((a, k) =>
				countMap[k] > countMap[a] ? k : a
			)
		);
	}

	// Calculate stim score
	let c = count > MIN_CNT ? MIN_CNT : count;
	let t = avg > MIN_SEC ? MIN_SEC : avg;
	let mxScore = (
		((c * (MAX_SCR / MIN_CNT)) / (MIN_SEC * MIN_SEC)) *
		(t * t)
	).toFixed(1);

	// Return results
	postMessage({ count, avg, score: mxScore });

	this.close();
});
