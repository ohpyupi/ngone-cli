const fs = require('fs');

function addLineToFile (filePath, line, targetLine, cb) {
	fs.readFile(filePath, (err, data)=>{
		if (err) return console.log(`! Failed to read ${filePath}`);
		let dataStr = data.toString();
		let dataStrArr = dataStr.split('\n');
		dataStrArr.forEach((_line, idx)=>{
			if (_line === targetLine) {
				dataStrArr.splice(idx+2, 0, line);
			}
		});
		dataStr = dataStrArr.join('\n');
		fs.writeFile(filePath, dataStr, err=>{
			cb();
		});
	});
}

function removeLineFromFile (filePath, line, cb) {
	fs.readFile(filePath, (err, data)=>{
		if (err) return console.log(`! Failed to read ${filePath}`);
		let dataStr = data.toString();
		let dataStrArr = dataStr.split('\n');
		dataStrArr.forEach((_line, idx)=>{
			if (_line === line) {
				dataStrArr.splice(idx, 1);
			}
		});
		dataStr = dataStrArr.join('\n');
		fs.writeFile(filePath, dataStr, err=>{
			cb();
		});
	});
}

module.exports = {
	addLineToFile,
	removeLineFromFile,
};
