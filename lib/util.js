/** utility functions */

var get_torrent_url = function() {
  var elems = document.getElementsByClassName("video-magnet");
  if(elems && elems.length > 0)
    return elems[0].children[0].href;
  return null;
};
  

module.exports = {
    "get_torrent_url": get_torrent_url
};
