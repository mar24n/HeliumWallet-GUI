const { execSync } = require("child_process");
const { verify } = require("crypto");
let osCreate;
let sharded;
let verified;

function getSettingsInputValue() {
	const password = document.getElementById("password").value;

	if (process.platform == "win32") {
		osCreate = `cd wallet&set HELIUM_WALLET_PASSWORD=${password}&helium-wallet.exe --format json create basic`;
	}
	if (process.platform == "linux") {
		osCreate = `cd ~/wallet && HELIUM_WALLET_PASSWORD=${password} ./helium-wallet --format json create basic`;
	}
	if (process.platform == "darwin") {
		osCreate = `cd /Applications/HeliumWallet.app/Contents/wallet/ && HELIUM_WALLET_PASSWORD=${password} ./helium-wallet --format json create basic`;
	}
	console.log(osCreate);
	const confirm = `Create Wallet`;
	alert(confirm);

	const output = execSync(osCreate);

	const data_create = JSON.parse(output);
	console.log(data_create);
	const address = data_create["address"];
	const pwhash = data_create["pwhash"];
	if (data_create["sharded"] == false) {
		sharded = "Not Sharded";
	} else {
		sharded = "Sharded";
	}
	if (data_create["verify"] == true) {
		verified = "Verified";
	} else {
		verified = " Not Verified";
	}
	const result =
		`Wallet Created, ${address}, ${pwhash}, ${sharded}, ${verified}`.replace(
			/,/g,
			"\n\n"
		);
	alert(result);
}
