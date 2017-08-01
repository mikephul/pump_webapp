$(window).load(function () {	
	initialize(state);
	getSummary();	
	if (loop) {
		flowLoop = setInterval(function() {
       		showDirection();
    	}, 2000);			
	} 
	w3.includeHTML();
});

function updateTable() {
	getCustomers();
	getSources();
	getValves();
	getKeyNodes();
	getKeyEdges();
}

function loopAnimation() {
	loop = !loop;
	if (loop) {
		$("#direction-button")
		.attr('class', 'btn btn-danger')
		.attr('value', 'Pause');
		flowLoop = setInterval(function() {
       		showDirection();
    	}, 2000);			
	} else {
		$("#direction-button")
		.attr('class', 'btn btn-default')
		.attr('value', 'Play');
		clearInterval(flowLoop)
	}

}
 
function getSummary() {
	var url_summary = "/api/summary/" + state;
	d3.json(url_summary, writeSummaryTable);
}

function getCustomers() {
	var url_customers = "/api/customers_table_info/" + state;
	d3.json(url_customers, writeCustomersTable);
}

function getSources() {
	var url_sources = "/api/sources_table_info/" + state;
	d3.json(url_sources, writeSourcesTable);
}

function getValves() {
	var url_valves = "/api/valves_table_info/" + state;
	d3.json(url_valves, writeValvesTable);
}

function getKeyNodes() {
	document.getElementById("top-five-flow").click();
}

function getKeyEdges() {
	document.getElementById("top-five-pressure").click();
}

function get_top_five_highest_pressure_nodes() {
	var url_top_five_pressure_nodes = "/api/five_highest_pressure/" + state;
	d3.json(url_top_five_pressure_nodes, writeTopFivePressureTable);
	
}

function get_top_five_lowest_pressure_nodes() {
	var url_top_five_pressure_nodes = "/api/five_lowest_pressure/" + state;
	d3.json(url_top_five_pressure_nodes, writeTopFivePressureTable);
	
}


function get_top_five_highest_flow_edges() {
	var url_top_five_flow_edges = "/api/five_highest_flow/" + state;
	d3.json(url_top_five_flow_edges, writeTopFiveFlowTable);
	
}

function get_top_five_lowest_flow_edges() {
	var url_top_five_flow_edges= "/api/five_lowest_flow/" + state;
	d3.json(url_top_five_flow_edges, writeTopFiveFlowTable);
	
}
function get_specified_node() {
	var node_id = document.getElementById('search_node_id').value
	var url_specified_node= "/api/nodes/" + state + "/" + node_id;
	d3.json(url_specified_node, writeTopFivePressureTable);
}


function get_specified_edge() {
	var edge_id = document.getElementById('search_edge_id').value
	var url_specified_edge= "/api/edges/" + state + "/" + edge_id;
	d3.json(url_specified_edge, writeTopFiveFlowTable);
}

function writeSummaryTable(summary) {
	d3.select("#td-name").text(summary.name);
    d3.select("#td-num_node").text(summary.num_node);
    d3.select("#td-num_edge").text(summary.num_edge);
    d3.select("#td-num_customer").text(summary.num_customer);
    d3.select("#td-num_source").text(summary.num_source);
    d3.select("#td-num_tank").text(summary.num_tank);
    d3.select("#td-num_pump").text(summary.num_pump);
    d3.select("#td-num_valve").text(summary.num_valve);
}

function writeCustomersTable(nodes) {
	console.log(nodes)
	var customers_nodes_list = nodes.customers_nodes_list;

	for (i = 1; i <= 5; i++) {
		d3.select("#customers-name" + i).text("");
    	d3.select("#customers-id" + i).text("");
    	d3.select("#customers-demand" + i).text("");
    	d3.select("#customers-flow_in" + i).text("");
	    d3.select("#customers-flow_satisfied" + i).selectAll("span").remove();
	    d3.select("#customers-pressure" + i).text("");
	    d3.select("#customers-min_pressure" + i).text("");
	    d3.select("#customers-pressure_satisfied" + i).selectAll("span").remove();
	}

	for (i = 1; i <= customers_nodes_list.length; i++) {
		d3.select("#customers-name" + i).text(customers_nodes_list[i-1].name);
    	d3.select("#customers-id" + i).text(customers_nodes_list[i-1].node_id);
    	d3.select("#customers-demand" + i).text(customers_nodes_list[i-1].demand);
    	d3.select("#customers-flow_in" + i).text(parseFloat(customers_nodes_list[i-1].flow_in).toFixed(2));

	    if (customers_nodes_list[i-1].flow_satisfied) {
	    	d3.select("#customers-flow_satisfied" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-ok")
		    .attr("style", "color:#5cb85c");
	    } else {
	    	d3.select("#customers-flow_satisfied" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-remove")
		    .attr("style", "color:#d9534f");
	    }

	    d3.select("#customers-pressure" + i).text(parseFloat(customers_nodes_list[i-1].pressure).toFixed(2));
	    d3.select("#customers-min_pressure" + i).text(customers_nodes_list[i-1].min_pressure);

	    if (customers_nodes_list[i-1].pressure_satisfied) {
	    	d3.select("#customers-pressure_satisfied" + i)
	    	.append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-ok")
		    .attr("style", "color:#5cb85c");
	    } else {
	    	d3.select("#customers-pressure_satisfied" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-remove")
		    .attr("style", "color:#d9534f");
	    }
	}
}


function writeSourcesTable(nodes) {
	console.log(nodes)
	var sources_nodes_list = nodes.sources_nodes_list;

	for (i = 1; i <= 5; i++) {
		d3.select("#sources-id" + i).text("");
	    d3.select("#sources-flow_out" + i).text("");
	    d3.select("#sources-pressure" + i).text("");
	    d3.select("#sources-min_pressure" + i).text("");
	    d3.select("#sources-pressure_satisfied" + i).selectAll("span").remove();
	}

	for (i = 1; i <= 5; i++) {
		d3.select("#sources-id" + i).text(sources_nodes_list[i-1].node_id);
	    d3.select("#sources-flow_out" + i).text(parseFloat(sources_nodes_list[i-1].flow_out).toFixed(2));
	    d3.select("#sources-pressure" + i).text(parseFloat(sources_nodes_list[i-1].pressure).toFixed(2));
	    d3.select("#sources-min_pressure" + i).text(sources_nodes_list[i-1].min_pressure);

	    if (sources_nodes_list[i-1].pressure >= sources_nodes_list[i-1].min_pressure) {
	    	d3.select("#sources-pressure_satisfied" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-ok")
		    .attr("style", "color:#5cb85c");
	    } else {
	    	d3.select("#sources-pressure_satisfied" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-remove")
		    .attr("style", "color:#d9534f");
	    }
	}
}

function writeValvesTable(valves) {
	console.log(valves)
	var valves_edges_list = valves.valves_edges_list;

	for (i = 1; i <= 5; i++) {
		d3.select("#valves-edge_id" + i).text("");
	    d3.select("#valves-head_id" + i).text("");
	    d3.select("#valves-tail_id" + i).text("");
	    d3.select("#valves-valve_flow" + i).text("");
	    d3.select("#valves-valve_status" + i).selectAll("span").remove();
	}

	for (i = 1; i <= 5; i++) {
		d3.select("#valves-edge_id" + i).text(valves_edges_list[i-1].edge_id);
	    d3.select("#valves-head_id" + i).text(valves_edges_list[i-1].head_id);
	    d3.select("#valves-tail_id" + i).text(valves_edges_list[i-1].tail_id);
	    d3.select("#valves-valve_flow" + i).text(parseFloat(valves_edges_list[i-1].valve_flow).toFixed(2));

	    if (valves_edges_list[0].valve_status) {
	    	d3.select("#valves-valve_status" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-ok-circle")
		    .attr("style", "color:#5cb85c");
	    } else {
	    	d3.select("#valves-valve_status" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-ban-circle")
		    .attr("style", "color:#d9534f");
	    }
	}
}


function writeTopFivePressureTable(nodes){
	console.log(nodes)
	var top_five_pressure_nodes_list = nodes.json_list;

	for (i = 1; i <= 5; i++) {
		d3.select("#top_five_pressure-id" + i).text("");
	    d3.select("#top_five_pressure-min_pressure" + i).text("");
	    d3.select("#top_five_pressure-pressure" + i).text("");
	    d3.select("#top_five_pressure-type" + i).selectAll("span").remove();
	    d3.select("#top_five_pressure-satisfied" + i).selectAll("span").remove();
	}

	for (i = 1; i <= top_five_pressure_nodes_list.length; i++) {
		d3.select("#top_five_pressure-id" + i).text(top_five_pressure_nodes_list[i-1].node_id);
	    d3.select("#top_five_pressure-min_pressure" + i).text(parseFloat(top_five_pressure_nodes_list[i-1].head).toFixed(2));
	    d3.select("#top_five_pressure-pressure" + i).text(parseFloat(top_five_pressure_nodes_list[i-1].pressure).toFixed(2));
	    var node_type = top_five_pressure_nodes_list[i-1].node_type;
	    switch (node_type) {
	    	case CONSUMER:
	            d3.select("#top_five_pressure-type" + i).append("xhtml:span")
			    .attr("class", "label label-danger")
			    .text("consumer");
			    break;
	        case SOURCE:
	            d3.select("#top_five_pressure-type" + i).append("xhtml:span")
			    .attr("class", "label label-warning")
			    .text("source");
			    break;
	        case TANK:
	            d3.select("#top_five_pressure-type" + i).append("xhtml:span")
			    .attr("class", "label label-success")
			    .text("tank");
			    break;
	        default:
	            d3.select("#top_five_pressure-type" + i).append("xhtml:span")
			    .attr("class", "label label-primary")
			    .text("junction");
	    }
	    d3.select("#top_five_pressure-type" + i).text();	   
	    if (top_five_pressure_nodes_list[i-1].pressure >= top_five_pressure_nodes_list[i-1].head) {	    		    	
	    	d3.select("#top_five_pressure-satisfied" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-ok")
		    .attr("style", "color:#5cb85c");
	    } else {	    		    
	    	d3.select("#top_five_pressure-satisfied" + i).append("xhtml:span")
		    .attr("class", "control glyphicon glyphicon-remove")
		    .attr("style", "color:#d9534f");
	    }
	}
}


function writeTopFiveFlowTable(edges){
	console.log(edges)
	var top_five_flow_edges_list = edges.json_list;

	for (i = 1; i <= 5; i++) {
		d3.select("#top_five_flow-edge_id" + i).text("");
	    d3.select("#top_five_flow-head_id" + i).text("");
	    d3.select("#top_five_flow-tail_id" + i).text("");
	    d3.select("#top_five_flow-flow" + i).text("");
	    d3.select("#top_five_flow-type" + i).selectAll("span").remove();
	    // d3.select("#top_five_pressure-satisfied" + i).selectAll("span").remove();
	}

	for (i = 1; i <= top_five_flow_edges_list.length; i++) {
		d3.select("#top_five_flow-edge_id" + i)
		.text(top_five_flow_edges_list[i-1].edge_id)
		.on("mouseover", function(d) {
			d3.select(this)			
    		.style('background-color', "red");	
    		
    		var thisID = d3.select(this).text()

    		d3.select("#graph-canvas").selectAll("line")	
	    	.filter(function(d) {		    		
	            return d.edge_id == parseInt(thisID);
	        })	       
	        .attr("stroke-width", 100)	     
	        .attr("stroke", "red");	
		})
		.on("mouseout", function(d) {
			d3.select(this)
    		.style('background-color', "white");	
    		var thisID = d3.select(this).text()

    		d3.select("#graph-canvas").selectAll("line")	
	    	.filter(function(d) {		    		
	            return d.edge_id == parseInt(thisID);
	        })	       
	        .attr("stroke-width", 4)	     
	        .attr("stroke", "steelblue");						
		});
	    d3.select("#top_five_flow-head_id" + i).text(top_five_flow_edges_list[i-1].head_id);
	    d3.select("#top_five_flow-tail_id" + i).text(top_five_flow_edges_list[i-1].tail_id);
	    d3.select("#top_five_flow-flow" + i).text(parseFloat(top_five_flow_edges_list[0].flow).toFixed(2));	   
	    

	    var edge_type = top_five_flow_edges_list[i-1].edge_type;
	    switch (edge_type) {
	    	case PUMP:
	            d3.select("#top_five_flow-type" + i).append("xhtml:span")
			    .attr("class", "label label-warning")
			    .text("pump");
			    break;		  
	        case VALVE:
	        	d3.select("#top_five_flow-type" + i).append("xhtml:span")
			    .attr("class", "label label-success")
			    .text("valve");	            
			    break;
	        default:
	        	d3.select("#top_five_flow-type" + i).append("xhtml:span")
			    .attr("class", "label label-primary")
			    .text("pipe");	            
	    }   
	    // if (top_five_pressure_nodes_list[i-1].pressure >= top_five_pressure_nodes_list[i-1].head) {	    		    	
	    // 	d3.select("#top_five_pressure-satisfied" + i).append("xhtml:span")
		   //  .attr("class", "control glyphicon glyphicon-ok")
		   //  .attr("style", "color:#5cb85c");
	    // } else {	    		    
	    // 	d3.select("#top_five_pressure-satisfied" + i).append("xhtml:span")
		   //  .attr("class", "control glyphicon glyphicon-remove")
		   //  .attr("style", "color:#d9534f");
	    // }
	}

}

function writeTopSpecificNodeTable(nodes){
	console.log(nodes)
	var json_list = nodes.json_list;
	var specified_node_id = document.getElementById('search_node_id').value
	document.getElementById("top_five_pressure-id").innerHTML = json_list[specified_node_id-1].node_id
	document.getElementById("top_five_pressure-pressure").innerHTML = parseFloat(json_list[specified_node_id-1].pressure).toFixed(2)
	document.getElementById("top_five_pressure-min_pressure").innerHTML = json_list[specified_node_id-1].head
	document.getElementById("top_five_pressure-type").innerHTML = json_list[specified_node_id-1].node_type
	
	document.getElementById("top_five_pressure-id2").innerHTML = []
	document.getElementById("top_five_pressure-pressure2").innerHTML = []
	document.getElementById("top_five_pressure-min_pressure2").innerHTML = []
	document.getElementById("top_five_pressure-type2").innerHTML = []
	
	document.getElementById("top_five_pressure-id3").innerHTML = []
	document.getElementById("top_five_pressure-pressure3").innerHTML = []
	document.getElementById("top_five_pressure-min_pressure3").innerHTML = []
		document.getElementById("top_five_pressure-type3").innerHTML = []
	
	document.getElementById("top_five_pressure-id4").innerHTML = []
	document.getElementById("top_five_pressure-pressure4").innerHTML = []
	document.getElementById("top_five_pressure-min_pressure4").innerHTML = []
		document.getElementById("top_five_pressure-type4").innerHTML = []
	
	document.getElementById("top_five_pressure-id5").innerHTML = []
	document.getElementById("top_five_pressure-pressure5").innerHTML = []
	document.getElementById("top_five_pressure-min_pressure5").innerHTML = []	
	document.getElementById("top_five_pressure-type5").innerHTML = []

}

function writeTopSpecificEdgeTable(edges){
	console.log(edges)
	var json_list = edges.json_list;
	var specified_edge_id = document.getElementById('search_edge_id').value
	
	document.getElementById("top_five_flow-edge_id").innerHTML = json_list[specified_edge_id-1].edge_id
	document.getElementById("top_five_flow-head_id").innerHTML = json_list[specified_edge_id-1].head_id
	document.getElementById("top_five_flow-tail_id").innerHTML = json_list[specified_edge_id-1].tail_id
	document.getElementById("top_five_flow-flow").innerHTML = parseFloat(json_list[specified_edge_id-1].flow).toFixed(4)
	document.getElementById("top_five_flow-type").innerHTML = json_list[specified_edge_id-1].edge_type
	
	document.getElementById("top_five_flow-edge_id2").innerHTML = []
	document.getElementById("top_five_flow-head_id2").innerHTML = []
	document.getElementById("top_five_flow-tail_id2").innerHTML = []
	document.getElementById("top_five_flow-flow2").innerHTML = []
	document.getElementById("top_five_flow-type2").innerHTML = []
	
	document.getElementById("top_five_flow-edge_id3").innerHTML = []
	document.getElementById("top_five_flow-head_id3").innerHTML = []
	document.getElementById("top_five_flow-tail_id3").innerHTML = []
	document.getElementById("top_five_flow-flow3").innerHTML = []
	document.getElementById("top_five_flow-type3").innerHTML = []
	
	document.getElementById("top_five_flow-edge_id4").innerHTML = []
	document.getElementById("top_five_flow-head_id4").innerHTML = []
	document.getElementById("top_five_flow-tail_id4").innerHTML = []
	document.getElementById("top_five_flow-flow4").innerHTML = []
	document.getElementById("top_five_flow-type4").innerHTML = []
	
	document.getElementById("top_five_flow-edge_id5").innerHTML = []
	document.getElementById("top_five_flow-head_id5").innerHTML = []
	document.getElementById("top_five_flow-tail_id5").innerHTML = []
	document.getElementById("top_five_flow-flow5").innerHTML = []
	document.getElementById("top_five_flow-type5").innerHTML = []
	
}

function print_test() {
	console.log("testtest");
}