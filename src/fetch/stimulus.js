const getStimObj = (array) => {
	let obj = {};

	array.forEach((s, i) => {
		obj[i] = { ...s, sno: i };
	});

	return obj;
};

const stimArray = [
	{
		label: "breathe",
		tag: "breath",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fbreath.WAV?alt=media&token=c607da11-1ead-4cd7-9d64-42a85a356cf2",

		description:
			"Start recording and **breathe** in and out through your mouth. **Repeat 3 times**",
	},
	{
		label: "cough",
		tag: "cough",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fcough.WAV?alt=media&token=1bfdc549-bc07-42d9-aa2b-b7e016f541f4",

		description: "Start recording and **cough** 3 times.",
	},
	{
		label: "Aaa",
		tag: "aa",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-mox.appspot.com/o/instructions_audio%2Faa.mp3?alt=media&token=4da621d0-fbab-460c-a14e-679e32b537b9",
		description:
			"Take a deep breath in and say '**Aaaaaaa**' as in '**Hu**t' until you're out of breath. **Repeat 3 times**",
	},
	{
		label: "Eee",
		tag: "ee",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fee.WAV?alt=media&token=f81b1d40-bd0d-44a7-a2eb-259a1679dcce",

		description:
			"Take a deep breath in and say '**Eeeeeee**' as in 'H**e**at'  until you're out of breath. **Repeat 3 times**",
	},
	{
		label: "Uuu",
		tag: "uu",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fuu.WAV?alt=media&token=6e09159b-4ba0-4d71-88b5-0031553a1a6d",

		description:
			"Take a deep breath in and say '**Uuuuuuu**' as in 'H**oo**d'  until you're out of breath. **Repeat 3 times**",
	},
	{
		label: "Ooo",
		tag: "oo",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Foo.WAV?alt=media&token=08b46138-d744-48ac-87ae-314d6ba89f99",

		description:
			"Take a deep breath in and say '**Ooooooo**' as in 'G**o**'  until you're out of breath. **Repeat 3 times**",
	},
	{
		label: "Sss",
		tag: "ss",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fss.WAV?alt=media&token=2515b11e-ccd4-49a9-a33a-9fa77cebeb2d",

		description:
			"Take a deep breath in and say '**Sssssss**' as in '**S**at'  until you're out of breath. **Repeat 3 times**",
	},
	{
		label: "Yee",
		tag: "yee",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fyee.WAV?alt=media&token=23838e64-171f-4867-b236-108205c18ab8",

		description:
			"Take a deep breath in and say '**Yeeeeee**' as in 'S**ay**'  until you're out of breath. **Repeat 3 times**",
	},
	{
		label: "Zzz",
		tag: "zz",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fzz.WAV?alt=media&token=aa8f5434-8879-4410-ade9-c16825ad12f9",

		description:
			"Take a deep breath in and say '**Zzzzzzz**' as in 'Pi**zz**a' until you're out of breath. **Repeat 3 times**",
	},
	{
		label: "cough",
		tag: "cough",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fcough.WAV?alt=media&token=1bfdc549-bc07-42d9-aa2b-b7e016f541f4",

		description: "Record your **cough** again. **Repeat 3 times**",
	},
];

module.exports = { stimulus: getStimObj(stimArray) };
