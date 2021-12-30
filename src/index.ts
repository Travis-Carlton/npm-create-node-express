#!/usr/bin/env node

import fs from "fs";
import readline from "readline";
import shell from "shelljs";

const { log, error } = console;

const cli = (args: string[]) => {
	const realArgs = args.slice(2);
	const ts = realArgs.includes("-ts");

	const rL = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rL.question("Express App Name: ", app_name => {
		rL.question("Specify relative dir (default is current dir .): ", dir => {
			if (!dir) dir = ".";
			if (fs.existsSync(dir)) {
				try {
					if (dir.length > 1 && dir[dir.length - 1] === "/") {
						dir = dir.substring(0, dir.length - 1);
					}
					const URL = 'https://github.com/Travis-Carlton/node-express-template.git';
					const BRANCH = ts ? 'ts' : 'main';

					log(`Placing ${app_name} in ${dir}`);

					shell.cd(dir);
					shell.exec(
						`git clone --single-branch --branch ${BRANCH} ${URL} ${app_name} && cd ${dir}/${app_name} && rm -rf .git`
					);
				} catch (e) {
					log("Failed to create Express App");
					error(e);
				}
				rL.close();
			}
		});
	});

	rL.on("close", () => {
		log("\n----------------");
		process.exit(0);
	});
};

cli(process.argv);
