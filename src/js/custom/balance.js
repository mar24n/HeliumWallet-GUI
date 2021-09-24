const { exec } = require("child_process");
let osBalance;

const getTotal = () => {
	if (process.platform == "win32") {
		osBalance = "cd wallet && helium-wallet.exe --format json balance";
	}
	if (process.platform == "linux") {
		osBalance = "cd ~/wallet && ./helium-wallet --format json balance";
	}
	if (process.platform == "darwin") {
		osBalance =
			"cd /Applications/HeliumWallet.app/Contents/wallet/ && ./helium-wallet --format json balance";
	}
	console.log(osBalance);
	exec(osBalance, (error, stdout, stderr) => {
		if (error) {
			return;
		}
		if (stderr) {
			return;
		}
		console.log(stdout);

		const data = JSON.parse(stdout);
		const balance = data[0]["balance"];
		console.log("balance" + balance);
		const dc_balance = data[0]["dc_balance"];
		const sec_balance = data[0]["sec_balance"];
		const address = data[0]["address"];
		localStorage.setItem("walletAddress", address);

		displayBalance(balance, dc_balance, sec_balance, address);

		setTimeout(getTotal, 7000);
	});
};

function displayBalance(balance, dc_balance, sec_balance, address) {
	document.getElementById("total").innerText = balance.toLocaleString();
	document.getElementById("dc").innerText = dc_balance.toLocaleString();
	document.getElementById("sec").innerText = dc_balance.toLocaleString();
	document.getElementById("address").innerText = address;
	document.getElementById("total_hnt").value = balance;
}
getTotal();
