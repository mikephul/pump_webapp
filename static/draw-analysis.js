function plotAnalysis() {
    var url_data = "/api/get_gap_statistics/" + state;
    d3.json(url_data, create_bp_chart);
}

function create_bp_chart(nodes) {
    d3.select("#dynamic-table-summary").selectAll("*").remove()
    d3.select("#summary-canvas").selectAll("*").remove()
    // console.log(nodes)
    d3_ver3 = d3
    d3 = d3_version4

    nodes = nodes.json_list
    console.log(nodes)
    nodes = nodes.map(function(d) { return [
            ['gap_flow_positive', d.gap_flow_positive],
            ['gap_flow_zero', d.gap_flow_zero],
            ['no_gap', d.no_gap]
        ] })


    var data = [
        ['gap_flow_positive', 'valves', 0],
        ['gap_flow_zero', 'valves', 0],
        ['no_gap', 'valves', 0],
        ['gap_flow_positive', 'pump', 0],
        ['gap_flow_zero', 'pump', 0],
        ['no_gap', 'pump', 0],
        ['gap_flow_positive', 'pipe', 0],
        ['gap_flow_zero', 'pipe', 0],
        ['no_gap', 'pipe', 0]
    ];
    // console.log(data)

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            data[i * 3 + j][2] = nodes[i][j][1]
        }
    }

    // console.log(data)

    var color = { gap_flow_positive: "#3366CC", gap_flow_zero: "#DC3912", no_gap: "#FF9900" };

    var margin = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 10
    };

    var width = 350 - margin.left - margin.right
    height = 250 - margin.top - margin.bottom;

    var svg = d3.select("#summary-canvas")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        // .append("g")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // svg.append("text").attr("x", 0).attr("y", 0)
        // .attr("class", "header").text("Gap");


    var g =[svg.append("g").attr("transform","translate(15,10)"),
            svg.append("g").attr("transform","translate(65,10)")];

    var bp = [viz.bP()
        .data(data)
        .min(12)
        .pad(1)
        .height(200)
        .width(width-80)
        .barSize(30)
        .fill(d => color[d.primary]), 
        viz.bP()
        .data(data)
        .value(d => d[3])
        .min(12)
        .pad(1)
        .height(200)
        .width(width-80)
        .barSize(30)
        .fill(d => color[d.primary])
    ];

    [0].forEach(function(i) {
        console.log(i);
        g[i].call(bp[i])

        g[i].append("text").attr("x", 0).attr("y", 10).style("text-anchor", "middle").text("Gap");
        g[i].append("text").attr("x", 150).attr("y", 10).style("text-anchor", "middle").text("Type");

        // g[i].append("line").attr("x1", -100).attr("x2", 0);
        // g[i].append("line").attr("x1", 200).attr("x2", 300);

        // g[i].append("line").attr("y1", 610).attr("y2", 610).attr("x1", -100).attr("x2", 0);
        // g[i].append("line").attr("y1", 610).attr("y2", 610).attr("x1", 200).attr("x2", 300);

        g[i].selectAll(".mainBars")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        g[i].selectAll(".mainBars").append("text").attr("class", "label")
            .attr("x", d => (d.part == "primary" ? 0 : 30))
            .attr("y", d => +6)
            .text(d => d.key)
            .attr("text-anchor", d => (d.part == "primary" ? "end" : "start"));

        g[i].selectAll(".mainBars").append("text").attr("class", "perc")
            .attr("x", d => (d.part == "primary" ? 0 : 80))
            .attr("y", d => +6)
            .text(function(d) { return d3.format("0.0%")(d.percent) })
            .attr("text-anchor", d => (d.part == "primary" ? "end" : "start"));
    });


    function mouseover(d) {
        d3_ver3 = d3
        d3 = d3_version4
        [0].forEach(function(i) {
            bp[i].mouseover(d);

            g[i].selectAll(".mainBars").select(".perc")
                .text(function(d) { return d3.format("0.0%")(d.percent) });
        });
        d3 = d3_ver3
        
    }

    function mouseout(d) {
        d3_ver3 = d3
        d3 = d3_version4
        [0].forEach(function(i) {
            bp[i].mouseout(d);

            g[i].selectAll(".mainBars").select(".perc")
                .text(function(d) { return d3.format("0.0%")(d.percent) });
        });

    }
    d3 = d3_ver3

    

}