const { execSync } = require("child_process");
let osSend;

function getInputValue() {
	const amounthnt = document.getElementById("hnt").value;
	const address = document.getElementById("address").value;
	const password = document.getElementById("password").value;

	if (process.platform == "win32") {
		osSend = `cd wallet&set HELIUM_WALLET_PASSWORD=${password}&helium-wallet.exe --format json pay one ${address} ${amounthnt} --commit`;
	}
	if (process.platform == "linux") {
		osSend = `cd ~/wallet && HELIUM_WALLET_PASSWORD=${password} ./helium-wallet --format json pay one ${address} ${amounthnt} --commit`;
	}
	if (process.platform == "darwin") {
		osSend = `cd /Applications/HeliumWallet.app/Contents/wallet/ && HELIUM_WALLET_PASSWORD=${password} ./helium-wallet --format json pay one ${address} ${amounthnt} --commit`;
	}

	const confirm = `Sending ${amounthnt} HNT, To ${address}`.replace(
		/,/g,
		"\n\n"
	);
	alert(confirm);

	const output = execSync(osSend);

	const data_sent = JSON.parse(output);
	console.log(data_sent);
	const fee = data_sent["fee"];
	const hash = data_sent["hash"];
	const nonce = data_sent["nonce"];
	const memo = data_sent["payments"][0]["memo"];
	const hnt_sent = data_sent["payments"][0]["amount"];
	const payee = data_sent["payments"][0]["payee"];
	const txn = data_sent["txn"];
	const result =
		`Payee: ${payee}, Amount: ${hnt_sent} HNT, Fee: ${fee}, Nonce: ${nonce}, Memo: ${memo}, Hash: ${hash} `.replace(
			/,/g,
			"\n\n"
		);
	alert(result);
}
