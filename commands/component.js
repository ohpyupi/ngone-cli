const program = require('commander');
const component_template = require('../templates/component');
const _hfunc = require('../lib/functions.js');
const fs = require('fs-extra');

program
.command(`component <name>`)
.description('Generate angular component.')
.option(`-g, --generate`, `Generate a component.`)
.option(`-t, --terminate`, `Terminate a component.`)
.action((name, options)=>{
	let component_root = `./app/components`;
	let component_dir = `${component_root}/${name}`;
	let capName = name.charAt(0).toUpperCase() + name.slice(1);
	if (options.generate === true) {
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
			_hfunc.addLineToFile(`./app/app.module.js`, `import AppComponent from './components';`, `** internal dependencies`, ()=>{
				console.log(`# Imported AppComponent to the app.`);
				_hfunc.addLineToFile(`./app/app.module.js`, `AppComponent,`, `** injected dependencies`, ()=>{
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
			_hfunc.addLineToFile(`${component_root}/index.js`,`import ${capName}Component from './${name}';`, `** components`, ()=>{
				console.log(`# Imported ${capName}Component to the app.`);
				_hfunc.addLineToFile(`${component_root}/index.js`,`.component('my${capName}', ${capName}Component)`, `** registered components`, ()=>{
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
	} else if (options.terminate === true) {
		/*
		** (1) Delete component directory from the app.
		*/
		if (!fs.existsSync(component_dir)) return console.error(`! Failed to find ${capName}Component from the app.\n! Terminate the process ...`);
		fs.remove(component_dir, err=>{
			if (err) return console.error(`! Failed to remove ${component_dir}.`);
			console.log(`! Deleted ${component_dir} from the app.`);
			_hfunc.removeLineFromFile(`${component_root}/index.js`, `import ${capName}Component from './${name}';`, ()=>{
				_hfunc.removeLineFromFile(`${component_root}/index.js`, `.component('my${capName}', ${capName}Component)`, ()=>{
					console.log(`! Unregistered ${capName}Component from the app.`);
				});
			});
		})
		
	} else {
		return console.log(`Please specify option. "ngone -h"`);
	}
})














