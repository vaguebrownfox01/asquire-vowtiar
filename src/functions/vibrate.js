export const startVibrate = (duration) => {
	try {
		navigator.vibrate(duration);
	} catch (e) {
		console.log("device doesn't support vibrate");
	}
};
