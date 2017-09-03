var ui = require("./ui.js");
var init = require("./init.js").Init;


window.onload = function() {
    init();
    ui.inject();
};
