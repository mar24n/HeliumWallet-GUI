const { execSync } = require("child_process");
let osStart;

function getStakeInputValue() {
	const stake_amounthnt = document.getElementById("stake_hnt").value;
	const stake_address = document.getElementById("stakeaddress").value;
	const password = document.getElementById("password").value;

	const confirm = `Sending ${stake_amounthnt} HNT, To ${stake_address}`.replace(
		/,/g,
		"\n\n"
	);
	alert(confirm);

	if (process.platform == "win32") {
		osStart = `cd wallet&set HELIUM_WALLET_PASSWORD=${password}&helium-wallet.exe --format json validators stake one ${stake_address} ${stake_amounthnt} --commit`;
	}
	if (process.platform == "linux") {
		osStart = `cd ~/wallet && HELIUM_WALLET_PASSWORD=${password} ./helium-wallet --format json validators stake one ${stake_address} ${stake_amounthnt} --commit`;
	}
	if (process.platform == "darwin") {
		osStart = `cd /Applications/HeliumWallet.app/Contents/wallet/ && HELIUM_WALLET_PASSWORD=${password} ./helium-wallet --format json validators stake one ${stake_address} ${stake_amounthnt} --commit`;
	}

	const stake_output = execSync(osStart);

	const stake_data_sent = JSON.parse(stake_output);
	const validator = stake_data_sent["validator"];
	const staking_hash = stake_data_sent["hash"];
	const transaction_fee = stake_data_sent["fee"];
	const staking_fee = stake_data_sent["staking_fee"];
	const staking_result =
		`Validator: ${validator}, Hash: ${staking_hash}, Fee: ${transaction_fee}, Staking Fee: ${staking_fee}`.replace(
			/,/g,
			"\n\n"
		);
	console.log(staking_result);
	alert(staking_result);
}
