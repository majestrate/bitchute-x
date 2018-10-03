
function Swarm(root) {
  this._root = root;
};


Swarm.prototype.inject = function()
{
  var self = this;
  self.canvas = document.createElement("canvas");
  self._root.appendChild(self.canvas);
  self.client = window.webtorrent;
  self.client.torrents[0].on("wire", function(wire, addr) {
    if(!addr) return;
    console.log("got address " + addr);
  });
};

module.exports = {
  "Swarm": Swarm
};
