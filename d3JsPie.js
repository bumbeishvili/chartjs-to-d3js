function drawD3JsPie(selector) {

    var info = packData({
        labels: ["Niger", "Cameroon", "Georgia", "Spain", "United States", "Singapore", "Qatar"],
        datasets: [{
            label: 'GDP   Per Capita in $ (2015)',
            data: [1080, 3144, 9630, 34819, 55805, 85253, 132099],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#AA6384", "#2CA21B", "#678E86", "#FFAE86"]
        }]
    });
    var data = info.data;
    // ########   hard coded and dynamically calculated attributes  #######

    var attrs = {
        svgWidth: 600,
        svgHeight: 600,
        marginLeft: 4,
        marginBottom: 20,
        marginRight: 4,
        marginTop: 20,
        textColor: '#7f7777',
        fontSize: '13px',
        pieStroke: 'white',
        pieStrokeWidth: 3,
        titleText: info.title,

        animationDuration: 1200,
        animationEase: 'out',
        titleHeight: 30,
        tooltipTextColor: 'white',
        tooltipBackgroundColor: 'black',

    }

    var dynamic = {}
    dynamic.chartWidth = attrs.svgWidth - attrs.marginLeft - attrs.marginRight
    dynamic.chartHeight = attrs.svgHeight - attrs.marginTop - attrs.marginBottom - attrs.titleHeight;
    dynamic.pieOuterRadius = Math.min(dynamic.chartWidth, dynamic.chartHeight) / 2;
    dynamic.chartTopMargin = attrs.marginTop + attrs.titleHeight

    //  ##############     SCALES     #########


    //  ##############   ARCS   ###############
    var arcs = {}
    arcs.pie = d3.svg.arc()
        .outerRadius(dynamic.pieOuterRadius - 10)
        .innerRadius(0);


    //  ##########     layouts  #######
    var layouts = {};
    layouts.pie = d3.layout.pie()
        .sort(null)
        .value(function (d) { return d.value; });



    //  ########### RESPONSIVE SVG DRAWING  ##############
    var svg = d3.select(selector)
        .append('svg')
        .attr("viewBox", "0 0 " + attrs.svgWidth + " " + attrs.svgHeight)
        .attr("preserveAspectRatio", "xMidYMid meet")



    //   #################  CHART CONTENT DRAWING  ###############

    var chart = svg.append('g')
        .attr('width', dynamic.chartWidth)
        .attr('height', dynamic.chartHeight)
        .attr('transform', 'translate(' + (attrs.marginLeft + dynamic.pieOuterRadius) + ',' + (dynamic.chartTopMargin + dynamic.pieOuterRadius) + ')');


    var pieArcs = chart.selectAll('.arc')
        .data(layouts.pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");


    pieArcs.append("path")
        .attr("d", arcs.pie)
        .attr('stroke-width', attrs.pieStrokeWidth)
        .attr('stroke', attrs.pieStroke)
        .attr("fill", function (d) { return d.data.backgroundColor; });


    //############### ADDING STARTUP ANIMATIONS ###############

    var startData = data.map(function () {
        return {
            value: 0
        }
    });




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

    d3.selectAll('.arc')
        .on("mouseover", function (d, i) {
            var buffer = d.value.toString().length;
            if (i > data.length / 2) {
                buffer = -buffer - 180;
            } else {
                buffer *= 4;
            }
            div.transition()
                .duration(100)
                .style("opacity", .9);
                
            div.html("<b>" + attrs.titleText + "</b><br/>" + d.data.label + ' : ' + d.data.value)
                .style("left", (d3.event.pageX + buffer) + "px")
                .style("top", (d3.event.pageY - 28) + "px");


            var currPath = d3.select(this).select('path');
            var darkenedColor = d3.rgb(currPath.attr('fill')).darker(1);
            currPath.attr('fill', darkenedColor);


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);

            var currPath = d3.select(this).select('path');
            var changedColor = d3.rgb(currPath.attr('fill')).darker(-1);
            currPath.attr('fill', changedColor);

        });




}
