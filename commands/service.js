const program = require('commander');
const service_template = require('../templates/service');
const _hfunc = require('../lib/functions.js');
const fs = require('fs-extra');

program
.command(`service <name>`)
.option(`-g, --generate`, `Generate a component.`)
.option(`-t, --terminate`, `Terminate a component.`)
.action((name, options)=>{
	let service_root = `./app/services`;
	let service_dir = `${service_root}/${name}`;
	let capName = name.charAt(0).toUpperCase() + name.slice(1);
	if (options.generate === true) {
		/*
		 * (1) Checks if angular app is initialized.
		 */
		if (!fs.existsSync(`./app`)) return console.log(`! No angular app has been detected. To initialze the angular application, "ngone init".`);
		/*
		 * (2) Checks is services directory is installed in app.
		 */
		console.log('generate service');
	} else if (options.terminate === true) {
		console.log('terminate service');
	} else {
		return console.log(`Please specify option. "ngone -h"`);
	}
})
