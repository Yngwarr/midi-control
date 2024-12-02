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
	// discord doesn't have a usable RPC, the workaround is to simulate keys
	// list of usable keys: https://wiki.linuxquestions.org/wiki/XF86_keyboard_symbols

	// discord deafen/undeafen
	if (msg.note === 36) {
		spawn("xdotool", ["key", "XF86Launch1"]);
	// discord mute/unmute
	} else if (msg.note === 37) {
		spawn("xdotool", ["key", "XF86Launch0"]);
	} else if (msg.note === 38) {
		spawn("espeak", ["you found me, great job!"])
	}
});
