/** ipfs chat */

const IPFS = require('ipfs');
const util = require("./util.js");

function Chat(root)
{
    this.ipfs = new IPFS({
        EXPERIMENTAL: {
            pubsub: true // required, enables pubsub
        }
    });
    this.root = root;
    this.limit = 10;
};

var get_channel_name = function(callback) {
    /*
    util.get_torrent_info(function(torrent) {
        var ih = torrent.infohash || "";
        callback("bitchute_x_chat_"+ih);
    });
    */
    var e = document.getElementById("video_id");
    callback("bitchute_x_chat_"+e.innerHTML);
};

Chat.prototype.inject = function()
{
    var self = this;
    self.start(function() {
        self.elem = document.createElement("pre");
        self.input = document.createElement("input");
        self.button = document.createElement("button");
        self.root.insertBefore(self.input, self.root.firstChild);
        self.root.insertBefore(self.button, self.root.firstChild);
        self.root.insertBefore(self.elem, self.root.firstChild);
        self.button.innerHTML = "Send";
        var send = function() {
            var txt = self.input.value;
            self.input.value = "";
            self.button.innerHTML = "Sending...";
            self.send_chat(txt, function(err) {
                self.button.innerHTML = "Send";
            });
        };
        self.input.onkeyup = function(ev) {
            if(ev.keyCode == 13) {
                send();
            }
        };
        self.button.onclick = function() {
            send();
        };
    });
};

Chat.prototype.send_chat = function(text, callback)
{
    var self = this;
    get_channel_name(function(name) {
        var chat = {
            nick: "anon",
            message: text
        };
        self.ipfs.pubsub.publish(name, Buffer.from(JSON.stringify(chat)), function(err) {
            if(err) console.log("publish error: "+err);
            callback(err);
        });
    });
};

Chat.prototype.on_chat = function(nick, message)
{
    var self = this;
    var txt = "<"+nick+"> "+message;
    console.log("Chat.on_chat(): "+txt);
    var t = document.createTextNode(txt+"\n");
    var e = document.createElement("chat");
    e.appendChild(t);
    self.elem.appendChild(e);
    while(self.elem.childNodes.length > self.limit) {
        self.elem.removeChild(self.elem.childNodes[0]);
    }

};

Chat.prototype.start = function(callback)
{
    var self = this;
    console.log("starting chat");
    self.ipfs.once('ready', function() {
        console.log("chat started ipfs ready");
        // node is ready
        get_channel_name(function(name) {
            self.ipfs.pubsub.subscribe(name, function(message) {
                var j = JSON.parse(message.data.toString());
                if(j && j.nick && j.message) {
                    self.on_chat(j.nick, j.message);
                }
            });
        });
        callback();
    });
};

module.exports = {
    "Chat": Chat
};
