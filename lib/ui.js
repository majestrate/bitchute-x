var Downloader = require("./downloader.js").Downloader;


var inject_ui = function()
{
    var dl_root = document.getElementsByClassName("info-ul")[0];
    var dl = new Downloader(dl_root);
    dl.inject();
};

modules.export = {
    "inject" : inject_ui
};