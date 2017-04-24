const program = require('commander');
const service_template = require('../templates/service');
const _hfunc = require('../lib/functions.js');
const fs = require('fs-extra');

program
.command(`service <name>`)
.option(`-g, --generate`, `Generate a service.`)
.option(`-t, --terminate`, `Terminate a service.`)
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
		 * (2) Checks if services directory is installed in app.
		 */
		if (!fs.existsSync(service_root)) {
			fs.mkdirSync(service_root);
			fs.writeFileSync(`${service_root}/index.js`, service_template.index);
			_hfunc.addLineToFile(`./app/app.module.js`, `import AppService from './services';`, `** internal dependencies`, ()=>{
				console.log(`# Imported AppService to the app.`);
				_hfunc.addLineToFile(`./app/app.module.js`, `AppService,`, `** injected dependencies`, ()=>{
					console.log(`# Registered AppService to the app.`);
				});
			});
			console.log(`# Created ${service_root}/index.js`);
		}
		/*
		 * (3) Register service to the app.
		 */
		fs.mkdir(service_dir, err=>{
			if (err) {
				switch (err.errno) {
					case -17:
						return console.log(`! Service ${name} is already registered.`);
						break;
					default:
						return console.log(`! Failed to initialize service ${name}.`);
				}
			}
			_hfunc.addLineToFile(`${service_root}/index.js`,`import ${capName}Service from './${name}';`, `** services`, ()=>{
				console.log(`# Imported ${capName}Service to the app.`);
				_hfunc.addLineToFile(`${service_root}/index.js`,`.service('my${capName}', ${capName}Service)`, `** registered services`, ()=>{
					console.log(`# Registered ${capName}Service as "my-${name}" to the app.`);
				});
			});
			console.log(`# Created ${service_dir}`);
			fs.writeFile(`${service_dir}/index.js`, service_template.js, err=>{
				console.log(`# Created ${service_dir}/index.js`);
			});
		});
	} else if (options.terminate === true) {
		console.log('terminate service');
	} else {
		return console.log(`Please specify option. "ngone -h"`);
	}
})

