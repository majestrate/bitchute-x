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
};

Chat.prototype.on_chat = function(nick, message)
{
    var self = this;
};

Chat.prototype.start = function()
{
    var self = this;
    self.ipfs.once('ready', function() {
        // node is ready
        get_channel_name(function(name) {
            self.ipfs.pubsub.subscribe(name, function(message) {
                var j = JSON.parse(message.data.toString());
                if(j && j.nick && j.message) {
                    self.on_chat(j.nick, j.message);
                }
            });
        });
    });
};
