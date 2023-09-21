$(document).ready(function () {
    //chartJS

    let coin = "BTC";
    let timeFrame = 7;

    //get api
    const coinData = async (coin, timeframe) => {
        const response = await fetch(
            "https://min-api.cryptocompare.com/data/v2/histominute?fsym=" +
                coin +
                "&tsym=USD&limit=" +
                timeframe +
                "&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146"
        );
        const json = await response.json();
        const data = json.Data.Data;
        const times = data.map((obj) => obj.time);
        const prices = data.map((obj) => obj.high);

        return {
            times,
            prices,
        };
    };

    async function printCoinChart(coin, timeFrame) {
        let { times, prices } = await coinData(coin, timeFrame);

        // reset element
        $("#coin__chart--print").remove();
        $("#coin__chart").append(
            '<canvas class="coin__chart--print" id="coin__chart--print"></canvas>'
        );

        if ($(".chartjs-size-monitor")) {
            $(".chartjs-size-monitor").remove();
        }

        let coinChart = document
            .getElementById("coin__chart--print")
            .getContext("2d");

        let gradient = coinChart.createLinearGradient(0, 0, 0, 300);

        //shadow of chart
        gradient.addColorStop(0, "rgba(247,147,26,.5)");
        gradient.addColorStop(0.425, "rgba(255,193,119,0)");

        //create chart
        var createCoinChart;

        createCoinChart = new Chart(coinChart, {
            type: "line",
            data: {
                labels: times,
                datasets: [
                    {
                        label: "$",
                        data: prices,
                        backgroundColor: gradient,
                        borderColor: "rgba(247,147,26,1)",
                        borderJoinStyle: "round",
                        borderCapStyle: "round",
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 2,
                        tension: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false,
                },

                legend: {
                    display: false,
                },

                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 20,
                    },
                },

                scales: {
                    xAxes: [
                        {
                            display: false,
                        },
                    ],
                    yAxes: [
                        {
                            display: false,
                        },
                    ],
                },

                tooltips: {
                    callbacks: {
                        title: function () {},
                        beforeBody: function (context) {
                            // return `Date: ${Date(context[0].label)}`;
                            return `Date: ${context[0].label}`;
                        },
                    },
                    displayColors: false,
                    yPadding: 10,
                    xPadding: 10,
                    position: "nearest",
                },
            },
        });
    }

    async function updateBitcoinPrice(coin, timeFrame) {
        let { prices } = await coinData(coin, timeFrame);
        let currentPrice = prices[prices.length - 1].toFixed(2);

        document.getElementById("coin__main--bottom-amount").innerHTML =
            currentPrice;
    }

    printCoinChart(coin, timeFrame);
    updateBitcoinPrice(coin, 1);

    // Timeframe selector
    $("input:radio[name=options]").on("click", function () {
        if (timeFrame != $("input[name=options]:checked").val()) {
            timeFrame = $("input[name=options]:checked").val();
            printCoinChart(coin, timeFrame);
        }
    });
});
