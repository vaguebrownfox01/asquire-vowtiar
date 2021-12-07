const { OfflineAudioContext } = require("standardized-audio-context");

const changeSpeed = (channels, speed) =>
	new Promise((resolve, reject) => {
		var changeSpeed = new Worker("./workers/speedWorker.js");

		changeSpeed.addEventListener("message", (e) => {
			resolve(e.data);
		});

		changeSpeed.postMessage({ channels, speed });
	});

export const speedTransformSpeed = (speed) => {
	return async (audioBuffer) => {
		let channels = [];
		for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
			channels[i] = new Float32Array(audioBuffer.getChannelData(i));
		}

		const outputChannels = await changeSpeed(channels, speed);
		console.log("speed js :: opchannels", outputChannels);

		let ctx = new OfflineAudioContext(
			audioBuffer.numberOfChannels,
			outputChannels[0].length,
			audioBuffer.sampleRate
		);

		let outputAudioBuffer = ctx.createBuffer(
			outputChannels.length,
			outputChannels[0].length,
			audioBuffer.sampleRate
		);
		for (let i = 0; i < outputChannels.length; i++) {
			outputAudioBuffer.copyToChannel(outputChannels[i], i);
		}

		return outputAudioBuffer;
	};
};
