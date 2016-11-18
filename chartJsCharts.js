function drawChartJsLine() {
    var ctxChartJsLine = document.getElementById("chartJsLine");
    var chartJsLine = new Chart(ctxChartJsLine, {
        type: 'line',
        data: {
            labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
            datasets: [{
                label: 'GDP Per Capita in $  (2015)',
                data: [1080, 3144, 9630, 34819, 55805, 85253, 132099],

            }]
        }
    });
}

function drawChartJsBar() {
    var ctxChartJsBar = document.getElementById("chartJsBar");
    var chartJsBar = new Chart(ctxChartJsBar, {
        type: 'bar',
        data: {
            labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
            datasets: [{
                label: 'GDP Per Capita in $  (2015)',
                data: [1080, 3144, 9630, 34819, 55805, 85253, 132099],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#AA6384",
                    "#2CA21B",
                    "#678E86",
                    "#FFAE86"
                ]
            }]
        }
    });
}

function drawChartJsPie() {
    var ctxChartJsPie = document.getElementById("chartJsPie");
    var chartJsPie = new Chart(ctxChartJsPie, {
        type: 'pie',
        data: {
            labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
            datasets: [{
                label: 'GDP Per Capita in $  (2015)',
                data: [1080, 3144, 9630, 34819, 55805, 85253, 132099],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#AA6384",
                    "#2CA21B",
                    "#678E86",
                    "#FFAE86"
                ]
            }]
        }
    });
}

function drawChartJsDoughnut() {
    var ctxChartJsDoughnut = document.getElementById("chartJsDoughnut");
    var chartJsDoughnut = new Chart(ctxChartJsDoughnut, {
        type: 'doughnut',
        data: {
            labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
            datasets: [{
                label: 'GDP Per Capita in $  (2015)',
                data: [1080, 3144, 9630, 34819, 55805, 85253, 132099],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#AA6384",
                    "#2CA21B",
                    "#678E86",
                    "#FFAE86"
                ]
            }]
        }
    });
}

function drawChartJsPolar() {
    var ctxChartJsPolar = document.getElementById("chartJsPolar");
    var chartJsPolar = new Chart(ctxChartJsPolar, {
        type: 'polarArea',
        data: {
            labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
            datasets: [{
                label: 'GDP Per Capita in $  (2015)',
                data: [1080, 3144, 9630, 34819, 55805, 85253, 132099],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#AA6384",
                    "#2CA21B",
                    "#678E86",
                    "#FFAE86"
                ]
            }]
        }
    });
}

function drawChartJsRadar() {
    var ctxChartJsRadar = document.getElementById("chartJsRadar");
    var chartJsRadar = new Chart(ctxChartJsRadar, {
        type: 'radar',
        data: {
            labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
            datasets: [{
                label: 'GDP Per Capita in $  (2015)',
                data: [1080, 3144, 9630, 34819, 55805, 85253, 132099]

            }]
        }
    });
}