Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");
		
const Cc = Components.classes;	
const Ci = Components.interfaces;

function initClock() {
  	showCurrentTime();
  	var historyService = Components.classes["@mozilla.org/browser/nav-history-service;1"]
                               .getService(Components.interfaces.nsINavHistoryService);

    var options = historyService.getNewQueryOptions();
	// No query parameters will return everything
	var query = historyService.getNewQuery();
  	
  	var bookmarkService = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"]
                                .getService(Components.interfaces.nsINavBookmarksService);
    // |query| and |options| are objects created in the previous section
	query.setFolders([bookmarkService.toolbarFolder], 1);
	var result = historyService.executeQuery(query, options);
	console.log("test");
	console.log(result);
	var cont = result.root;
	cont.containerOpen = true;
		
	for (var i = 0; i < cont.childCount; i ++) {

	    var node = cont.getChild(i);
		
	    // "node" attributes contains the information (e.g. uri, title, time, icon...)
	    // see : https://developer.mozilla.org/en/nsINavHistoryResultNode
	    dump(node.uri+ "\n");
		
	}
	// Close container when done
	// see : https://developer.mozilla.org/en/nsINavHistoryContainerResultNode
	cont.containerOpen = false;
  	window.setInterval(showCurrentTime, 1000);
}

function showCurrentTime() {
  var textbox = document.getElementById("currentTime");
  textbox.value = new Date().toLocaleTimeString();
  textbox.select();
}		