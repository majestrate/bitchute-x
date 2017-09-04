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
                var buf = Buffer.from(ajax.responseText);
                var torrent = parseTorrent(buf);
                if(torrent) {
                    window.bitchute_x.torrent = torrent;
                }
                callback(null, window.bitchute_x.torrent || null);
            } else {
                callback("http "+ajax.status, null);
            }
        }
    };
    var url = window.torrentId;
    console.log("GET "+url);
    ajax.open("GET", url);
    ajax.send();
};

var get_torrent_id = function() {
    var metas = document.head.getElementsByTagName("meta");
    for(var idx = 0 ; idx < metas.length; idx ++) {
        if(metas[idx].name == "twitter:image:src") {
            return metas[idx].content.replace(".jpg", ".torrent");
        }
    }
    return null;
}

module.exports = {
    "get_torrent_id": get_torrent_id,
    "get_torrent_info": get_torrent
};
