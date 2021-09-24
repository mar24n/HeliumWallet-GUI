const getTotalVal = () => {
	const address_n = localStorage.getItem("walletAddress");
	Promise.all([
		fetch(`https://api.helium.io/v1/accounts/${address_n}/validators`),
		fetch("https://api.binance.com/api/v3/ticker/price?symbol=HNTUSDT"),
	])
		.then(function (responses) {
			return Promise.all(
				responses.map(function (response) {
					return response.json();
				})
			);
		})
		.then(function (data) {
			const hnt_price = parseFloat(data[1].price);
			const val_name = data[0]["data"][0]["name"];
			const val_version = data[0]["data"][0]["version_heartbeat"];
			const val_online = data[0]["data"][0]["status"]["online"];
			const val_stake_status = data[0]["data"][0]["stake_status"];
			const val_penalty = data[0]["data"][0]["penalty"];
			const val_last_heartbeat = data[0]["data"][0]["last_heartbeat"];
			const block = data[0]["data"][0]["block"];
			console.log(val_last_heartbeat);
			displayListVal(
				val_name,
				val_online,
				val_stake_status,
				val_penalty,
				val_last_heartbeat,
				val_version,
				block
			);
			setTimeout(getTotalVal, 14000);
		})
		.catch(function (error) {});
};

function displayListVal(
	val_name,
	val_online,
	val_stake_status,
	val_penalty,
	val_last_heartbeat,
	val_version,
	block
) {
	document.getElementById("v_name").innerText = val_name.replace(/-/g, " ");
	document.getElementById("v_online").innerText = val_online;
	document.getElementById("v_stake_status").innerText = val_stake_status;
	document.getElementById("v_penalty").innerText = val_penalty.toLocaleString();
	document.getElementById("v_last_heartbeat").innerText =
		val_last_heartbeat + "/" + block;
	document.getElementById("v_version").innerText = val_version;
}
getTotalVal();
