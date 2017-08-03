var state = 1;
var loop = true;
var flowLoop;

var energyHistory = [];
var gapHistory = [];
var pumpEnergyHistory = [];

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// ========== Open App ========== //
window.onload = openingCode;

function openingCode() {
    initializeGraph(state);
    getSummary();
    if (loop) {
        flowLoop = setInterval(function() {
            showDirection();
        }, 2000);
    }
}

// ========== Close App ========== //
window.onbeforeunload = closingCode;

function closingCode() {
    var url_reset = "/api/reset/" + state;
    d3.json(url_reset, function() {
        console.log('RESET')
    })
    return null;
}

// ========== Flow animation ========== // 
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