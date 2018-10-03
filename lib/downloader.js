var FileSaver = require("./contrib/FileSaver.js");
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
  self.client = window.webtorrent;
  self.progress("Starting download...");
  var torrent = self.client.torrents[0];
  torrent.on("download", function() {
    var p = torrent.progress;
    self.progress("Progress: "+ (parseInt(p * 1000) / 10) + "%");
  });
  torrent.on("done", function() {
    var f = torrent.files[0];
    f.getBlob(function(err, blob) {
      if(err) self.progress("Failed: " + err);
      else
      {
        FileSaver.saveAs(blob, f.name);
        self.progress("saved");
      }
    });
  });
};


module.exports = {
    "Downloader": Downloader
};
