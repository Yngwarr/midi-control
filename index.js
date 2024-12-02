import { spawn } from "node:child_process";
import { getInputs, Input } from "easymidi";

const nanopad = getInputs().filter((x) => x.includes("nanoPAD2"))[0];

if (nanopad === undefined) {
	throw Error("No nanoPAD2 found");
}

const input = new Input(nanopad);

console.log('nanoPAD2 controller is ready!')

input.on("noteon", function (msg) {
	console.log(msg);
	// list of usable keys: https://wiki.linuxquestions.org/wiki/XF86_keyboard_symbols
	if (msg.note === 36) {
		const cmd = spawn("xdotool", ["key", "XF86Launch0"]);
	} else if (msg.note === 37) {
		const cmd = spawn("xdotool", ["key", "XF86Launch1"]);
	}
});
