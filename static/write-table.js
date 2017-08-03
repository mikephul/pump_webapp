

// ========== Summary ========== //
function getSummary() {
    var url = "/api/summary_table/" + state;
    d3.json(url, writeSummaryTable);
}

function writeSummaryTable(summary) {
    d3.select("#dynamic-table-summary").selectAll("*").remove()
    d3.select("#summary-canvas").selectAll("*").remove()
    d3.select("#summary-canvas").attr("height", 0);
    var rows = ["name", "num_node", "num_edge", "num_customer", "num_source", "num_tank", "num_pump", "num_valve"]
    var header = ["Name", "# Nodes", "# Edges", "# Customers", "# Sources", "# Tanks", "# Pumps", "# Valves"]
    createVerticleTable("#dynamic-table-summary", summary, rows, header);
}

// ========== Source ========== //
function getSourcesDynamic() {
    var url_sources = "/api/sources_table/" + state;
    d3.json(url_sources, writeSourcesDynamic);
}

function writeSourcesDynamic(nodes) {
    json_data = nodes.json_list;
    for (i = 0; i < json_data.length; i++) {
        json_data[i].pressure = parseFloat(json_data[i].pressure.toFixed(2))
        json_data[i].flow_out = parseFloat(json_data[i].flow_out.toFixed(2))
        json_data[i].min_pressure = parseFloat(json_data[i].min_pressure).toFixed(2)
    }
    var column = ['node_id', 'flow_out', 'pressure', 'min_pressure', 'pressure_satisfied'];
    var header = ['ID', 'Flow out', 'Head', 'Height', 'Satisfy?']
    create_dynamic_table('#dynamic_table_node', json_data, column, header);
}

// ========== Customer ========== //
function getCustomersDynamic() {
    var url_customers = "/api/customers_table/" + state;
    d3.json(url_customers, writeCustomersDynamic);
}

function writeCustomersDynamic(nodes) {
    json_data = nodes.json_list;
    for (i = 0; i < json_data.length; i++) {
        json_data[i].flow_in = parseFloat(json_data[i].flow_in.toFixed(2))
        json_data[i].pressure = parseFloat(json_data[i].pressure.toFixed(2))
        json_data[i].min_pressure = parseFloat(json_data[i].min_pressure).toFixed(2)
    }
    var column = ['node_id', 'demand', 'flow_in', 'flow_satisfied', 'pressure', 'min_pressure', 'pressure_satisfied'];
    var header = ['ID', 'Demand', 'Flow in', 'Satisfy?', 'Head', 'Height', 'Satisfy?']
    create_dynamic_table('#dynamic_table_node', json_data, column, header);
}

// ========== Nodes ========== //
function getNodesDynamic() {
    var url_customers = "/api/nodes/" + state;
    d3.json(url_customers, writeNodesDynamic);
}

function get_specified_node_dynamic() {
    var node_id = document.getElementById('search_dynamic_node_id').value
    var url_specified_node = "/api/nodes/" + state + "/" + node_id;
    d3.json(url_specified_node, writeNodesDynamic);
}

function getKeyNodesDynamicLowest() {
    var url_customers = "/api/five_lowest_pressure/" + state;
    d3.json(url_customers, writeNodesDynamic);
}

function getKeyNodesDynamicHighest() {
    var url_customers = "/api/five_highest_pressure/" + state;
    d3.json(url_customers, writeNodesDynamic);
}

function writeNodesDynamic(nodes) {
    json_data = nodes.json_list;
    for (i = 0; i < json_data.length; i++) {
        json_data[i].pressure = parseFloat(json_data[i].pressure).toFixed(2)
        json_data[i].head = parseFloat(json_data[i].head).toFixed(2)
    }
    var column = ['node_id', 'node_type', 'demand', 'head', 'pressure'];
    var header = ['ID', 'Type', 'Demand', 'Height', 'Head'];
    create_dynamic_table('#dynamic_table_node', json_data, column, header);
}

// ========== Valves ========== //
function getValvesDynamic() {
    var url_valves = "/api/valves_table/" + state;
    d3.json(url_valves, writeValvesDynamic);
}

function writeValvesDynamic(edges) {
    json_data = edges.json_list;
    var column = ['edge_id', 'head_id', 'tail_id', 'valve_status'];
    var header = ['ID', 'Head ID', 'TAIL ID', 'Status'];
    create_dynamic_table('#dynamic_table_edge', json_data, column, header);
}

function writePumpsDynamic(edges) {
    json_data = edges.json_list;
    for (i = 0; i < json_data.length; i++) {
        json_data[i].flow = parseFloat(json_data[i].flow).toFixed(2)
        json_data[i].gap = parseFloat(json_data[i].gap).toFixed(2)
    }

    var dh_max = pump_data.coeff[1]
    var gamma = pump_data.coeff[0]
    var xMax = parseFloat(json_data[0].flow) / 1000
    var q = linspace(0, xMax, 20)
    var dh = q.map(function(i) { return dh_max + gamma * Math.pow(i, 2) })
    plot_area("#pump-curve-canvas", pump_data.x, pump_data.y, q, dh, "Pressure")

    var column = ['edge_id', 'edge_type', 'head_id', 'tail_id', 'flow', 'gap']
    var header = ['ID', 'Type', 'Head ID', 'TAIL ID', 'Flow', 'Gap'];
    create_dynamic_table('#dynamic_table_pump', json_data, column, header);
}

// ========== Edges ========== //
function getEdgesDynamic() {
    var url_customers = "/api/edges/" + state;
    d3.json(url_customers, writeEdgesDynamic);
}

function getKeyEdgesDynamicLowest() {
    var url_customers = "/api/five_lowest_flow/" + state;
    d3.json(url_customers, writeEdgesDynamic);
}

function getKeyEdgesDynamicHighest() {
    var url_customers = "/api/five_highest_flow/" + state;
    d3.json(url_customers, writeEdgesDynamic);
}

function get_specified_edge_dynamic() {
    var edge_id = document.getElementById('search_dynamic_edge_id').value
    var url_specified_edge = "/api/edges/" + state + "/" + edge_id;
    d3.json(url_specified_edge, writeEdgesDynamic);
}

function writeEdgesDynamic(edges) {
    json_data = edges.json_list;
    for (i = 0; i < json_data.length; i++) {
        json_data[i].flow = parseFloat(json_data[i].flow).toFixed(2)
        json_data[i].gap = parseFloat(json_data[i].gap).toFixed(2)
    }
    var column = ['edge_id', 'edge_type', 'head_id', 'tail_id', 'flow', 'gap']
    var header = ['ID', 'Type', 'Head ID', 'TAIL ID', 'Flow', 'Gap'];
    create_dynamic_table('#dynamic_table_edge', json_data, column, header);
}

// ========== Pump ========== //
function get_pump_curve() {
    var pump_id = document.getElementById('search_pump_id').value
    var url = "/api/pumps/" + state + "/" + pump_id
    d3.json(url, function(pump) {
        d3.select("#pump-curve-canvas").selectAll("*").remove();
        pump_data = pump.json_list[0]
        // get edge information
        var url_specified_edge = "/api/edges/" + state + "/" + pump_data.edge_id;
        d3.json(url_specified_edge, writePumpsDynamic);
    });
}


// ========== Dynamic Table ========== //
function createVerticleTable(label_identifier, data, rows, header) {
    d3.select(label_identifier).selectAll('table').remove()
    var table = d3.select(label_identifier).append('table')
        .style("width", "100%")
        .attr("class", "table");

    var zip = rows.map(function(d, i) {
        return { "row": header[i], "value": data[d] }
    })

    var tbody = table.append('tbody')
    var rows = tbody.selectAll('tr')
        .data(zip)
        .enter()
        .append('tr')
        .on("mouseover", function(d) {
            d3.select(this)
                .style('background-color', "#F9F2F4");

            var node_type = -1;
            switch (d.row) {
                case "# Nodes":
                    node_type = 0;
                    break;
                case "# Customers":
                    node_type = CONSUMER;
                    break;
                case "# Sources":
                    node_type = SOURCE;
                    break;
                case "# Tanks":
                    node_type = TANK;
                    break;
            }

            var edge_type = -1;
            switch (d.row) {
                case "# Edges":
                    edge_type = 0;
                    break;
                case "# Pumps":
                    edge_type = PUMP;
                    break;
                case "# Valves":
                    edge_type = VALVE;
                    break;
            }

            if (node_type > 0) {
                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        return d.node_type == node_type;
                    })
                    .moveToFront()
                    .attr("r", 6);
            } else if (node_type == 0) {
                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        var first = d.node_type == JUNCTION;
                        var second = d.node_type == CONSUMER;
                        var third = d.node_type == SOURCE;
                        var fourth = d.node_type == TANK;
                        return first || second || third || fourth;
                    })
                    .moveToFront()
                    .attr("r", 6);
            }

            if (edge_type > 0) {
                d3.select("#graph-canvas").selectAll("line")
                    .filter(function(d) {
                        return d.edge_type == edge_type;
                    })
                    .attr("stroke", "red");

            } else if (edge_type == 0) {
                d3.select("#graph-canvas").selectAll("line")
                    .attr("stroke", "red");
            }

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style('background-color', "white");
            d3.select(this)
            var node_type = -1;
            switch (d.row) {
                case "# Nodes":
                    node_type = 0;
                    break;
                case "# Customers":
                    node_type = CONSUMER;
                    break;
                case "# Sources":
                    node_type = SOURCE;
                    break;
                case "# Tanks":
                    node_type = TANK;
                    break;
            }

            var edge_type = -1;
            switch (d.row) {
                case "# Edges":
                    edge_type = 0;
                    break;
                case "# Pumps":
                    edge_type = PUMP;
                    break;
                case "# Valves":
                    edge_type = VALVE;
                    break;
            }

            if (node_type > 0) {
                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        return d.node_type == node_type;
                    })
                    .moveToFront()
                    .attr("r", 4);
            } else if (node_type == 0) {
                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        var first = d.node_type == JUNCTION;
                        var second = d.node_type == CONSUMER;
                        var third = d.node_type == SOURCE;
                        var fourth = d.node_type == TANK;
                        return first || second || third || fourth;
                    })
                    .moveToFront()
                    .attr("r", 4);
            }

            if (edge_type > 0) {
                d3.select("#graph-canvas").selectAll("line")
                    .filter(function(d) {
                        return d.edge_type == edge_type;
                    })
                    .attr("stroke", "steelblue");

            } else if (edge_type == 0) {
                d3.select("#graph-canvas").selectAll("line")
                    .attr("stroke", "steelblue");
            }

        });

    rows.append('th').text(function(d) { return d.row; });
    rows.append('td')
        .style("text-align", "center")
        .text(function(d) { return d.value; });
}

function create_dynamic_table(label_identifier, data, columns, header) {
    d3.select(label_identifier).selectAll('table').remove()
    var table = d3.select(label_identifier).append('table')
        .style("width", "100%")
        .attr("class", "table");
    var thead = table.append('thead')

    var tbody = table.append('tbody')

    thead.append('tr')
        .selectAll('th')
        .style("padding-top", 10)
        .style("padding-left", 2)
        .style("text-align", "center")
        .data(header).enter()
        .append('th')
        .style("padding-top", 10)
        .style("padding-left", 2)
        .style("text-align", "center")
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .attr("id", "new_row")
        .style("padding-top", 10)
        .style("padding-left", 2)
        .style("text-align", "center")
        .on("mouseover", function(d) {
            d3.select(this)
                .style('background-color', "#F9F2F4");

            var cells = d3.select(this).selectAll('td')
            var cell_select_node_id = cells.filter(function(d) { return d.column == "node_id" ? this : null })
            if (cell_select_node_id[0].length > 0) {
                var node_id = cell_select_node_id.text()
                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        return d.node_id == parseInt(node_id);
                    })
                    .moveToFront()
                    .attr("r", 8);
            }

            var cell_select_edge_id = cells.filter(function(d) { return d.column == "edge_id" ? this : null })
            if (cell_select_edge_id[0].length > 0) {
                var cell_select_head_id = cells.filter(function(d) { return d.column == "head_id" ? this : null })
                var cell_select_tail_id = cells.filter(function(d) { return d.column == "tail_id" ? this : null })
                var head_id = cell_select_head_id.text()
                var tail_id = cell_select_tail_id.text()

                var edge_id = cell_select_edge_id.text()
                d3.select("#graph-canvas").selectAll("line")
                    .filter(function(d) {
                        return d.edge_id == parseInt(edge_id);
                    })
                    .attr("stroke", "red");

                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        return (d.node_id == parseInt(head_id)) || (d.node_id == parseInt(tail_id));
                    })
                    .moveToFront()
                    .attr("r", 8);
            }
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style('background-color', "white");

            var cells = d3.select(this).selectAll('td')
            var cell_select_node_id = cells.filter(function(d) { return d.column == "node_id" ? this : null })
            if (cell_select_node_id[0].length > 0) {
                var node_id = cell_select_node_id.text()
                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        return d.node_id == parseInt(node_id);
                    })
                    .attr("r", 4);
            }

            var cell_select_edge_id = cells.filter(function(d) { return d.column == "edge_id" ? this : null })
            if (cell_select_edge_id[0].length > 0) {
                var cell_select_head_id = cells.filter(function(d) { return d.column == "head_id" ? this : null })
                var cell_select_tail_id = cells.filter(function(d) { return d.column == "tail_id" ? this : null })
                var head_id = cell_select_head_id.text()
                var tail_id = cell_select_tail_id.text()

                var edge_id = cell_select_edge_id.text()
                d3.select("#graph-canvas").selectAll("line")
                    .filter(function(d) {
                        return d.edge_id == parseInt(edge_id);
                    })
                    .attr("stroke", "steelblue");

                d3.select("#graph-canvas").selectAll("circle")
                    .filter(function(d) {
                        return (d.node_id == parseInt(head_id)) || (d.node_id == parseInt(tail_id));
                    })
                    .moveToFront()
                    .attr("r", 4);
            }


        });

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
        .attr("id", "new_cell")
        .style("padding-top", 10)
        .style("padding-left", 2)
        .style("text-align", "center")
        .data(function(row) {
            return columns.map(function(column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append('td')
        .attr("id", "new_cell")
        .style("padding-top", 15)
        .style("padding-left", 2)
        .style("text-align", "center")
        .text(function(d) {
            return d.value;
        });

    var cell_select = cells.filter(function(d) { return d.column == "valve_status" ? this : null })
        .filter(function(d) { return d.value == 1 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "control glyphicon glyphicon-ok-circle")
        .attr("style", "color:#5cb85c");
    var cell_select = cells.filter(function(d) { return d.column == "valve_status" ? this : null })
        .filter(function(d) { return d.value == 0 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "control glyphicon glyphicon-ban-circle")
        .attr("style", "color:#d9534f");

    var cell_select = cells.filter(function(d) { return d.column == "flow_satisfied" ? this : null })
        .filter(function(d) { return d.value == 1 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "control glyphicon glyphicon-ok-circle")
        .attr("style", "color:#5cb85c");
    var cell_select = cells.filter(function(d) { return d.column == "flow_satisfied" ? this : null })
        .filter(function(d) { return d.value == 0 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "control glyphicon glyphicon-ban-circle")
        .attr("style", "color:#d9534f");

    var cell_select = cells.filter(function(d) { return d.column == "pressure_satisfied" ? this : null })
        .filter(function(d) { return d.value == 1 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "control glyphicon glyphicon-ok-circle")
        .attr("style", "color:#5cb85c");
    var cell_select = cells.filter(function(d) { return d.column == "pressure_satisfied" ? this : null })
        .filter(function(d) { return d.value == 0 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "control glyphicon glyphicon-ban-circle")
        .attr("style", "color:#d9534f");


    var cell_select = cells.filter(function(d) { return d.column == "edge_type" ? this : null })
        .filter(function(d) { return d.value == 1 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "label label-warning")
        .text("pump");
    var cell_select = cells.filter(function(d) { return d.column == "edge_type" ? this : null })
        .filter(function(d) { return d.value == 2 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "label label-success")
        .text("valve");
    var cell_select = cells.filter(function(d) { return d.column == "edge_type" ? this : null })
        .filter(function(d) { return d.value == 0 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "label label-primary")
        .text("pipe");

    var cell_select = cells.filter(function(d) { return d.column == "node_type" ? this : null })
        .filter(function(d) { return d.value == 1 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "label label-danger")
        .text("customer");
    var cell_select = cells.filter(function(d) { return d.column == "node_type" ? this : null })
        .filter(function(d) { return d.value == 2 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "label label-warning")
        .text("source");
    var cell_select = cells.filter(function(d) { return d.column == "node_type" ? this : null })
        .filter(function(d) { return d.value == 3 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "label label-success")
        .text("tank");
    var cell_select = cells.filter(function(d) { return d.column == "node_type" ? this : null })
        .filter(function(d) { return d.value == 0 ? this : null })
        .text("")
        .append("xhtml:span")
        .attr("class", "label label-primary")
        .text("junction");
}