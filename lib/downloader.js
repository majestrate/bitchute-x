var FileSaver = require("./contrib/FileSaver.js");
var WebTorrent = require("webtorrent");
var util = require("./util.js");

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

Downloader.prototype.progress = function(msg)
{
  var self = this;
  self.button.innerHTML = msg;
};

Downloader.prototype.reset = function()
{
  var self = this;
  setTimeout(function() {
    self.progress("Download Video");
    self.ready = true;
  }, 1000);
};

Downloader.prototype.start = function()
{
  var self = this;
  self.ready = false;
  self.client = new WebTorrent();
  self.progress("Starting download...");
  // Download the torrent
  var url = util.get_torrent_url();
  console.log(url);
  self.client.add(url, function (torrent) {
    var file = torrent.files[0];
    self.progress("Download "+file.name);
    torrent.on('download', function (bytes) {
      var p = self.client.progress;
      self.progress("Progress: "+ (parseInt(p * 1000) / 10) + "%");
    });
    // and save it
    torrent.on('done', function() {
      file.getBlob(function(err, blob) {
        if(err) self.progress("download fail:" + err)
        else {
          FileSaver.saveAs(blob, file.name);
          self.progress("Saved");
          torrent.destroy(function() {
            self.reset();
          });
        }
      });
    });
  });
};


module.exports = {
    "Downloader": Downloader
};
