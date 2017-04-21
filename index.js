#!/usr/bin/env node
'use strict';
const program = require('commander');
const component_template = require('./templates/component');
const app_template = require('./templates/app');
const fs = require('fs');

program
	.version('0.0.1')
	.usage('<keyword>')

program
.command('init')
.description('Initialize angular.js app.')
.action((env, options)=>{
	let app_root_dir = `./app`;
	let app_module = `./app/app.module.js`;
	let app_config = `./app/app.config.js`;
	if (!fs.existsSync(app_root_dir)) {
		fs.mkdirSync(app_root_dir);
		console.log(`# Created ./app`);
		fs.writeFile(app_config, app_template.config, err=>{
			console.log(`# Created ./app/app.module.js`);
		});
		fs.writeFile(app_module, app_template.module, err=>{
			console.log(`# Created ./app/app.config.js`);
		});
	} else {
		console.log(`! Exisiting angular app has been detected. Terminate the command ...`);
	}
})

program
.command(`component <name>`)
.description('Generate angular component.')
.option(`-g, --generate`, `Generate a component.`)
.action((name, options)=>{
	if (options.generate === true) {
		let component_root = `./app/components`;
		let component_dir = `${component_root}/${name}`;
		let capName = name.charAt(0).toUpperCase() + name.slice(1);
		/*
		 * (1) Checks if angular app is initialized.
		 */
		if (!fs.existsSync(`./app`)) return console.log(`! No angular app has been detected. To initialze the angular application, "ngone init".`);
		/*
		 * (2) Checks if components directory is installed in app.
		 */
		if (!fs.existsSync(component_root)) {
			fs.mkdirSync(component_root);
			fs.writeFileSync(`${component_root}/index.js`, component_template.index);
			addLineToFile(`./app/app.module.js`, `import AppComponent from './components';`, `// internal dependencies`, ()=>{
				console.log(`# Imported AppComponent to the app.`);
				addLineToFile(`./app/app.module.js`, `AppComponent,`, `// dependencies`, ()=>{
					console.log(`# Registered AppComponent to the app.`);
				});
			});
			console.log(`# Created ${component_root}/index.js`);
		}
		/*
		 * (3) Register component to the app.
		 */
		fs.mkdir(component_dir, err=>{
			if (err) {
				switch (err.errno) {
					case -17:
						return console.log(`! Component ${name} is already registered.`);
						break;
					default:
						return console.log(`! Failed to initialize component ${name}.`);
				}
			}
			addLineToFile(`${component_root}/index.js`,`import ${capName}Component from './${name}';`, `// import components`, ()=>{
				console.log(`# Imported ${capName}Component to the app.`);
				addLineToFile(`${component_root}/index.js`,`.component('my${capName}', ${capName}Component)`, `// register components`, ()=>{
					console.log(`# Registered ${capName}Component as "my-${name}" to the app.`);
				});
			});
			console.log(`# Created ${component_dir}`);
			fs.writeFile(`${component_dir}/index.js`, component_template.js, err=>{
				console.log(`# Created ${component_dir}/index.js`);
			});
			fs.writeFile(`${component_dir}/index.html`, component_template.html, err=>{
				console.log(`# Created ${component_dir}/index.html`);
			});
		});
	} else {
		return console.log(`Please specify option. "ngone -h"`);
	}
})

program
.parse(process.argv)
if(!program.args.length) return program.help();

function addLineToFile (filePath, line, targetLine, cb) {
	fs.readFile(filePath, (err, data)=>{
		if (err) return console.log(`! Failed to read ${filePath}`);
		let dataStr = data.toString();
		let dataStrArr = dataStr.split('\n');
		dataStrArr.forEach((_line, idx)=>{
			if (_line === targetLine) {
				dataStrArr.splice(idx+1, 0, line);
				dataStr = dataStrArr.join('\n');
				fs.writeFile(filePath, dataStr, err=>{
					cb();
				});
			}
		});
	});
}
