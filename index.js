#!/usr/bin/env node
'use strict';
const program = require('commander');
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
		console.log(`! Exisiting angular app has been detected.\n! Terminate the command ...`);
	}
})

require('./commands/service.js')
require('./commands/component.js')

program
.parse(process.argv)
if(!program.args.length) return program.help();
