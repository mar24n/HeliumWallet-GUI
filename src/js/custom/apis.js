let hnt_price;

const getTotalUsd = (address_let) => {
    Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=HNTUSDT')
    ]).then(function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
       hnt_price = parseFloat(data[0].price);

        const hnt_balance = document.getElementById("total_hnt").value;
        const balance_usd = hnt_balance * hnt_price;
        displaySum(hnt_price, balance_usd);
        setTimeout(getTotalUsd, 14000);

    }).catch(function (error) {
    });
}

function displaySum(hnt_price, balance_usd) {

  document.getElementById("usd_total").innerText = "$" + " " + balance_usd.toLocaleString();  
  document.getElementById("price").innerText = "$" + " " + hnt_price.toLocaleString();
 }
getTotalUsd()
