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
	if ([36, 38, 40, 42, 44, 46, 48, 50].includes(msg.note)) {
		spawn("xdotool", ["key", "XF86Launch1"]);
	// discord mute/unmute
	} else if ([37, 39, 41, 43, 45, 47, 49, 51].includes(msg.note)) {
		spawn("xdotool", ["key", "XF86Launch0"]);
	}
});
