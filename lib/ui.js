const Downloader = require("./downloader.js").Downloader;
const SwarmViewer = require("./swarm.js").Swarm;

var inject_ui = function()
{
  var root = document.getElementById("video-status").children[0];
  var dl = new Downloader(root);
  dl.inject();
};

module.exports = {
    "inject" : inject_ui
};
