var Downloader = require("./downloader.js").Downloader;
//var Chat = require("./chat.js").Chat;

var inject_ui = function()
{
    var dl_root = document.getElementsByClassName("info-ul")[0];
    var dl = new Downloader(dl_root);
    dl.inject();

    //var chat_root = document.getElementById("comment-frm-container");
    //var chat = new Chat(chat_root);
    //chat.inject();
};

module.exports = {
    "inject" : inject_ui
};
