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
};

var get_channel_name = function(callback) {
    util.get_torrent(function(torrent) {
        var ih = torrent.infohash || "";
        callback("bitchute_x_chat_"+ih);
    });
};

Chat.prototype.inject = function()
{
    var self = this;
    self.start(function() {
        self.elem = document.createElement("pre");
        self.input = document.createElement("input");
        self.button = document.createElement("button");
        self.root.insertBefore(self.root.firstChild, self.input);
        self.root.insertBefore(self.root.firstChild, self.button);
        self.root.insertBefore(self.root.firstChild, self.elem);
        self.button.innerHTML = "Send";
        var send = function() {
            self.button.innerHTML = "Sending...";
            self.send_chat(self.input.value, function(err) {
                self.button.innerHTML = "Send";
            });
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
        self.ipfs.pubsub.publish(name, JSON.stringify(chat), function(err) {
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
    self.elem.appendChild(document.createTextNode(txt+"\n"));
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
