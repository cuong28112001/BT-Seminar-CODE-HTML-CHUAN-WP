$(document).ready(function () {
    // rate action
    $(".price__table--link-img").on("click", function () {
        $(this).toggleClass("price__table--link-active");
    });

    //chartJS

    //call api

    let coin = "BTC";
    let timeFrame = 119;

    const coinData = async (coin, timeFrame) => {
        const response = await fetch(
            "https://min-api.cryptocompare.com/data/v2/histominute?fsym=" +
                coin +
                "&tsym=USD&limit=" +
                timeFrame +
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

    /// Charts ///

    async function printCoinChart(coin, timeFrame) {
        let { times, prices } = await coinData(coin, timeFrame);

        let coinChart = document
            .getElementById("price__table--infor-print")
            .getContext("2d");

        let gradient = coinChart.createLinearGradient(0, 0, 0, 400);

        createCoinChart = new Chart(coinChart, {
            type: "line",
            data: {
                labels: times,
                datasets: [
                    {
                        label: "$",
                        data: prices,
                        backgroundColor: gradient,
                        borderColor: "rgba(220,20,60,1)",
                        // borderJoinStyle: "round",
                        // borderCapStyle: "round",
                        borderWidth: 1,
                        pointRadius: 0,
                        // pointHitRadius: 10,
                        // lineTension: 0.2,
                    },
                ],
            },

            options: {
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
                        top: 0,
                        bottom: 0,
                    },
                },

                scales: {
                    xAxes: [
                        {
                            display: false,
                            gridLines: {},
                        },
                    ],
                    yAxes: [
                        {
                            display: false,
                            gridLines: {},
                        },
                    ],
                },

                tooltips: {
                    callbacks: {
                        //This removes the tooltip title
                        title: function () {},
                    },
                    //this removes legend color
                    displayColors: false,
                    yPadding: 10,
                    xPadding: 10,
                    position: "nearest",
                    caretSize: 10,
                    backgroundColor: "rgba(255,255,255,.9)",
                    bodyFontSize: 12,
                    bodyFontColor: "#303030",
                },
            },
        });
    }

    printCoinChart(coin, timeFrame);
});
