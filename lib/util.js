/** utility functions */

var parseTorrent = require("parse-torrent");
var Buffer = require("buffer/").Buffer;

var get_torrent = function(callback) {
    if(window.bitchute_x.torrent) {
        callback(null, window.bitchute_x.torrent);
        return;
    }
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(ajax.readyState == 4) {
            if(ajax.status == 200) {
                var torrent = parseTorrent(Buffer.from(ajax.response));
                if(torrent) {
                    window.bitchute_x.torrent = torrent;
                }
                callback(null, window.bitchute_x.torrent || null);
            } else {
                callback("http "+ajax.status, null);
            }
        }
    };
    ajax.send("GET", window.torrentId);
    ajax.open();
};

module.exports = {
    "get_torrent_info": get_torrent
};
