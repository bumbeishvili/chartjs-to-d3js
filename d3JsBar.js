function drawD3JsBar(selector) {
    var info = packData({
        labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
        datasets: [{
            label: 'GDP Per Capita  in $ (2015)',
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
    });
    var data = info.data;

    // ########   hard coded and dynamically calculated attributes  #######

    var attrs = {
        titleText: info.title,
        svgWidth: 500,
        svgHeight: 500,
        marginLeft: 70,
        marginBottom: 70,
        marginRight: 20,
        marginTop: 20,
        textColor: '#7f7777',
        fontSize: '13px',
        xTextRotation: 40,
        axisColor: '#877676',
        tickLineStrokeWidth: 0.2,
        rectColor: '#FF6384',
        animationDuration: 2200,
        animationEase: 'out',
        titleHeight: 30,
        rectWidth: 50,
        rectHeight: 15,
        titleTextTopMargin: 12,
        tooltipTextColor: 'white',
        tooltipBackgroundColor: 'black',
        marginBetweenBars: 13,
        initialLayerBarOpacity: 0
    }

    var dynamic = {}
    dynamic.chartWidth = attrs.svgWidth - attrs.marginLeft - attrs.marginRight
    dynamic.chartHeight = attrs.svgHeight - attrs.marginTop - attrs.marginBottom - attrs.titleHeight
    dynamic.rectLeftMargin = dynamic.chartWidth * 0.25;
    dynamic.titleTextLeftmargin = dynamic.rectLeftMargin + attrs.rectWidth + 10
    dynamic.chartTopMargin = attrs.marginTop + attrs.titleHeight
    dynamic.barWidth = dynamic.chartWidth / (data.length) - attrs.marginBetweenBars
    dynamic.barCellLeftMargin = attrs.marginBetweenBars / 2;
    dynamic.xAxisTextLeftMargin = dynamic.chartWidth / (data.length * 2)

    //  ##############     SCALES     #########
    var xScale = d3.scale.linear()
        .domain([0, data.length])
        .range([0, dynamic.chartWidth]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function (d) {
            return d.value;
        }) * 1.1])
        .range([dynamic.chartHeight, 0])

    //  ##############   AXES   ###############
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .outerTickSize(0)
        .innerTickSize(-dynamic.chartHeight)
        .ticks(data.length)
        .tickFormat(function (index) {
            if (index < data.length) return data[index].label;
        })
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .outerTickSize(0)
        .innerTickSize(-dynamic.chartWidth)
        .orient('left');



    //  ########### RESPONSIVE SVG DRAWING  ##############
    var svg = d3.select(selector)
        .append('svg')
        .attr("viewBox", "0 0 " + attrs.svgWidth + " " + attrs.svgHeight)
        .attr("preserveAspectRatio", "xMidYMid meet")

    // ############   TITLE BLOCK DRAWING  ##############
    var title = svg.append('g')
        .attr('width', dynamic.chartWidth)
        .attr('height', attrs.titleHeight)
        .attr('transform', 'translate(0,' + attrs.marginTop + ')');

    title.append('rect')
        .attr('x', dynamic.rectLeftMargin)
        .attr('width', attrs.rectWidth)
        .attr('height', attrs.rectHeight)
        .attr('fill', attrs.rectColor)

    title.append('text')
        .attr('x', dynamic.titleTextLeftmargin)
        .attr('y', attrs.titleTextTopMargin)
        .text(attrs.titleText)
        .attr('fill', attrs.textColor)

    //   #################  CHART CONTENT DRAWING  ###############

    var chart = svg.append('g')
        .attr('width', dynamic.chartWidth)
        .attr('height', dynamic.chartHeight)
        .attr('transform', 'translate(' + attrs.marginLeft + ',' + dynamic.chartTopMargin + ')');


    //  #################  X AXIS AND LINES DRAWING  #################
    var xTicks = chart.append('g')
        .attr('class', 'x-axis')
        .call(xAxis)
        .attr('transform', 'translate(0,' + dynamic.chartHeight + ')')

    xTicks.select('.domain').attr('stroke', attrs.axisColor)

    xTicks.selectAll('text')
        .attr("transform", "translate(" + dynamic.xAxisTextLeftMargin + ",0)" + " rotate(-" + attrs.xTextRotation + ") ")
        .attr('fill', attrs.textColor)
        .attr('stroke', 'none')
        .style('text-anchor', 'end')
        .style('font-size', attrs.fontSize)

    //  #################  Y AXIS AND LINES DRAWING  #################

    var yTicks = chart.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)

    yTicks.select('.domain')
        .attr('stroke', attrs.axisColor)

    yTicks.selectAll('text')
        .attr('fill', attrs.textColor)
        .attr('stroke', 'none')
        .style('font-size', attrs.fontSize)
        .attr('transform', 'translate(-5,0)')

    d3.selectAll('.tick line')
        .attr('stroke', 'gray')
        .attr('stroke-width', attrs.tickLineStrokeWidth)

    // ########### BARS DRAWING  ########

    var body = chart.append('g');





    var bars = body.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d, i) {
            return xScale(i) + dynamic.barCellLeftMargin;
        })
        .attr('y', function (d) {
            return dynamic.chartHeight;
        })
        .attr('width', dynamic.barWidth)
        .attr('fill', function (d) {
            return d.backgroundColor;
        })
        .attr('stroke', attrs.pointStrokeColor)

        .attr('height', 0)
        .attr("transform", function (d) {
            return 'translate(0,0)';
        })
        .transition()
        .duration(attrs.animationDuration)
        .attr('height', function (d) {
            return dynamic.chartHeight - yScale(d.value);
        })
        .attr("transform", function (d) {
            return 'translate(0,' + (yScale(d.value) - dynamic.chartHeight) + ')';
        })


    body.selectAll('.layer-bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'layer-bar')
        .attr('x', function (d, i) {
            return xScale(i) + dynamic.barCellLeftMargin;
        })
        .attr('y', function (d) {
            return dynamic.chartHeight;
        })
        .attr('width', dynamic.barWidth)
        .attr('fill', 'black')
        .style('cursor', 'pointer')
        .attr('stroke', attrs.pointStrokeColor)
        .attr('height', 0)
        .attr('fill-opacity', attrs.initialLayerBarOpacity)
        .attr("transform", function (d) {
            return 'translate(0,0)';
        })
        .transition()
        .duration(attrs.animationDuration)
        .attr('height', function (d) {
            return dynamic.chartHeight - yScale(d.value);
        })
        .attr("transform", function (d) {
            return 'translate(0,' + (yScale(d.value) - dynamic.chartHeight) + ')';
        })











    //  ################   ADDING TOOLTIP ##################
    var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", 'absolute')
        .style("text-align", 'left')
        .style("font", '12px sans-serif')
        .style("background", attrs.tooltipBackgroundColor)
        .style("padding", '5px')
        .style("color", attrs.tooltipTextColor)
        .style("border", '0px')
        .style("border-radius", '4px')
        .style("pointer-events", 'none')

    body.selectAll('.layer-bar')
        .on("mouseover", function (d, i) {
            var buffer = d.value.toString().length;
            if (i > data.length / 2) {
                buffer = -buffer - 200;
            } else {
                buffer *= 4;
            }
            div.transition()
                .duration(100)
                .style("opacity", .9);
            div.html("<b>" + d.label + "</b><br/>" + attrs.titleText + ' : ' + d.value)
                .style("left", (d3.event.pageX + buffer) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            var bar = d3.select(this).attr('fill-opacity', 0.3)

        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);

            var bar = d3.select(this)
                .attr('fill-opacity', attrs.initialLayerBarOpacity)

        });

}


