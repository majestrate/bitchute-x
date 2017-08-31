var FileSaver = require("./contrib/FileSaver.js");


function Downloader(root)
{
    this._root = root;
}


Downloader.prototype.inject = function()
{
    var self = this;

    self.button = document.createElement("button");
    self.button.innerHTML = "Download Video";
    var li = document.createElement("li");
    self.button.style = "color: black;";
    li.appendChild(self.button);

    self._root.insertBefore(li, self._root.firstChild);
    self.ready = true;
    self.button.onclick = function() {
        if(self.ready) {
            self.start();
        }
    };
};

Downloader.prototype.start = function()
{
    self.ready = false;
    self.client = new WebTorrent();
    self.torrentId = window.torrentId;
    // Download the torrent
    self.client.add(self.torrentId, function (torrent) {

        var file = torrent.files[0];

        torrent.on('download', function (bytes) {
            var p = self.client.progress;
            self.button.innerHTML = "Progress: "+ (parseInt(p * 1000) / 10) + "%";
        });
        // and save it
        torrent.on('done', function() {
            file.getBlob(function(err, blob) {
                if(err) alert("download fail:" + err);
                else {
                    FileSaver.saveAs(blob, file.name);
                    self.button.innerHTML = "SAVED";
                    torrent.destroy(function() {
                        setTimeout(function() {
                            self.button.innerHTML = "Download Video";
                            self.ready = true;
                        }, 1000);
                    });
                }
            });
        });
    });
};


module.exports = {
    "Downloader": Downloader
};
