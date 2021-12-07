addEventListener("message", (e) => {
	let inputChannels = e.data.channels;
	let speed = e.data.speed;

	let outputChannels = [];

	for (let i = 0; i < inputChannels.length; i++) {
		outputChannels[i] = new Float32Array(
			Math.floor(inputChannels[i].length / speed)
		);
		for (let j = 0; j < outputChannels[i].length; j++) {
			outputChannels[i][j] = inputChannels[i][Math.floor(j * speed)];
		}
	}

	postMessage(outputChannels, [
		...outputChannels.map((c) => c.buffer),
		...inputChannels.map((c) => c.buffer),
	]);
	close();
});
