// var BASE_CONFIG_URL = 'http://localhost:4000/';
// var BASE_CONFIG_URL = 'http://192.168.0.103:4000/';
var BASE_CONFIG_URL = 'http://clach04.github.io/pebble/checklist/';


Pebble.addEventListener('ready', function(e) {
  console.log('JS component loaded!');
});

// open the config page when requested
Pebble.addEventListener('showConfiguration', function(e) {
  var configURL = BASE_CONFIG_URL + 'config.html';
  var items_exported = localStorage.getItem('items_exported') || '[]';

    try {
      items_exported = JSON.parse(items_exported);
    }
    catch(error) {
      console.error('items_exported parse failed, defaulting to [] - ' + error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
      items_exported = [];
    }

  console.log('config items_exported = ', JSON.stringify(items_exported));
  //configURL = configURL + '?items_exported=test,notes,here';
  //configURL = configURL + '?items_exported=' + encodeURIComponent(items_exported.join(','));
  configURL = configURL + '?items_exported=' + items_exported.join(',');

  // base64 in emulator needs a proxy web server/page
  // works fine on Phone/Pebble
  configURL = 'data:text/html;base64,PGh0bWw+PGhlYWQ+IDx0aXRsZT5DaGVja2xpc3QgUGViYmxlIEFwcDwvdGl0bGU+IDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4gPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCIvPiA8c3R5bGU+LyogTG9jYWwgQ1NTLCB0cnkgYW5kIGF2b2lkIGV4dGVybmFsIGRlcGVuZGVuY2llcyBldmVuIGlmIHJlc3VsdHMgYXJlIG5vdCBhcyBwcmV0dHkgYXMgd2hlbiB1c2luZyBob3N0ZWQgc29sdXRpb25zIGxpa2UgaHR0cDovL3B1cmVjc3MuaW8vICovIHB7Zm9udC1mYW1pbHk6QXJpYWw7IGZvbnQtc2l6ZToxMXB0O31oMXtmb250LWZhbWlseTpBcmlhbDsgZm9udC1zaXplOjIwcHQ7fS8qIEJ1dHRvbnMgKi8gLyogdXNpbmcgaHR0cDovL3d3dy5iZXN0Y3NzYnV0dG9uZ2VuZXJhdG9yLmNvbS8gKi8gLnNhdmVfYnRue2JhY2tncm91bmQtY29sb3I6IzQ0Yzc2NzsgLW1vei1ib3JkZXItcmFkaXVzOjI4cHg7IC13ZWJraXQtYm9yZGVyLXJhZGl1czoyOHB4OyBib3JkZXItcmFkaXVzOjI4cHg7IGJvcmRlcjoxcHggc29saWQgIzE4YWIyOTsgZGlzcGxheTppbmxpbmUtYmxvY2s7IGN1cnNvcjpwb2ludGVyOyBjb2xvcjojZmZmZmZmOyBmb250LWZhbWlseTpBcmlhbDsgZm9udC1zaXplOjE3cHg7IHBhZGRpbmc6MTZweCAzMXB4OyB0ZXh0LWRlY29yYXRpb246bm9uZTsgdGV4dC1zaGFkb3c6MHB4IDFweCAwcHggIzJmNjYyNzt9LnNhdmVfYnRuOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzVjYmYyYTt9LnNhdmVfYnRuOmFjdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZTsgdG9wOjFweDt9LmNhbmNlbF9idG57YmFja2dyb3VuZC1jb2xvcjojZmYwMDAwOyAtbW96LWJvcmRlci1yYWRpdXM6MjhweDsgLXdlYmtpdC1ib3JkZXItcmFkaXVzOjI4cHg7IGJvcmRlci1yYWRpdXM6MjhweDsgYm9yZGVyOjFweCBzb2xpZCAjYWIxOTM0OyBkaXNwbGF5OmlubGluZS1ibG9jazsgY3Vyc29yOnBvaW50ZXI7IGNvbG9yOiNmZmZmZmY7IGZvbnQtZmFtaWx5OkFyaWFsOyBmb250LXNpemU6MTdweDsgcGFkZGluZzoxNnB4IDMxcHg7IHRleHQtZGVjb3JhdGlvbjpub25lOyB0ZXh0LXNoYWRvdzowcHggMXB4IDBweCAjNjYyODI4O30uY2FuY2VsX2J0bjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiZDJhMmE7fS5jYW5jZWxfYnRuOmFjdGl2ZXtwb3NpdGlvbjpyZWxhdGl2ZTsgdG9wOjFweDt9PC9zdHlsZT48L2hlYWQ+PGJvZHk+IDxoMT5DaGVja2xpc3QgQXBwIGNvbmZpZzo8L2gxPjwhLS0gPHA+IDxidXR0b24gaWQ9InNhdmVfYnV0dG9uIiBjbGFzcz0ic2F2ZV9idG4iPlNhdmU8L2J1dHRvbj4gPGJ1dHRvbiBpZD0iY2FuY2VsX2J1dHRvbiIgY2xhc3M9ImNhbmNlbF9idG4iPkNhbmNlbDwvYnV0dG9uPiA8L3A+LS0+IDxwPiA8bGFiZWwgZm9yPSJpdGVtc1RvQWRkIj5JdGVtcyB0byBhZGQgKGVudGVyICJleHBvcnQiIHRvIHJlYWQgZnJvbSBQZWJibGUpOjwvbGFiZWw+IDxicj48aW5wdXQgdHlwZT0idGV4dCIgbmFtZT0iaXRlbXNUb0FkZCIgaWQ9Iml0ZW1zVG9BZGQiIGF1dG9jYXBpdGFsaXplPSJvZmYiLz4gPC9wPjxwPiBGaXJzdCBpdGVtIGluIHRoZSBsaXN0IGlzIHRoZSBib3R0b20gb2YgdGhlIGxpc3Qgb24gUGViYmxlLiA8YnI+TGFzdCBpdGVtIGluIHRoZSBsaXN0IGlzIHRoZSB0b3Agb2YgdGhlIGxpc3Qgb24gUGViYmxlLiA8L3A+PGhyPiA8cD4gPGxhYmVsIGZvcj0iaXRlbXNfZXhwb3J0ZWQiPkV4cG9ydGVkIEl0ZW1zOjwvbGFiZWw+IDxicj48aW5wdXQgdHlwZT0idGV4dCIgbmFtZT0iaXRlbXNfZXhwb3J0ZWQiIGlkPSJpdGVtc19leHBvcnRlZCIgYXV0b2NhcGl0YWxpemU9Im9mZiIvPiA8L3A+PHA+IDxidXR0b24gaWQ9InNhdmVfYnV0dG9uIiBjbGFzcz0ic2F2ZV9idG4iPlNhdmU8L2J1dHRvbj4gPGJ1dHRvbiBpZD0iY2FuY2VsX2J1dHRvbiIgY2xhc3M9ImNhbmNlbF9idG4iPkNhbmNlbDwvYnV0dG9uPiA8L3A+PC9ib2R5PjwvaHRtbD48c2NyaXB0Pi8qIExvY2FsIGphdmFzY3JpcHQsIHRyeSBhbmQgYXZvaWQgZXh0ZXJuYWwgZGVwZW5kZW5jaWVzIGV2ZW4gaWYgcmVzdWx0cyBhcmUgbm90IGFzIGNvbXBsZXRlIGFzIG90aGVyIG9wdGlvbnMgc3VjaCBhcyBodHRwczovL2pxdWVyeS5jb20vLCBodHRwOi8vemVwdG9qcy5jb20vICovIC8qIGh0dHA6Ly95b3VtaWdodG5vdG5lZWRqcXVlcnkuY29tLyAqLyAvKiBnZXQgVVJMIHF1ZXJ5IHZhcmlhYmxlcyAqLyBmdW5jdGlvbiBnZXRRdWVyeVBhcmFtKHZhcmlhYmxlLCBkZWZhdWx0VmFsdWUpey8qIEZpbmQgYWxsIFVSTCBwYXJhbWV0ZXJzICovIHZhciBxdWVyeT1sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpOyB2YXIgdmFycz1xdWVyeS5zcGxpdCgnJicpOyBmb3IgKHZhciBpPTA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKXt2YXIgcGFpcj12YXJzW2ldLnNwbGl0KCc9Jyk7IC8qIElmIHRoZSBxdWVyeSB2YXJpYWJsZSBwYXJhbWV0ZXIgaXMgZm91bmQsIGRlY29kZSBpdCB0byB1c2UgYW5kIHJldHVybiBpdCBmb3IgdXNlICovIGlmIChwYWlyWzBdPT09dmFyaWFibGUpe3JldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7fX1yZXR1cm4gZGVmYXVsdFZhbHVlIHx8IGZhbHNlO30vKiBTZXR1cCB0byBhbGxvdyBlYXN5IGFkZGluZyBtb3JlIG9wdGlvbnMgbGF0ZXIgKi8gZnVuY3Rpb24gc2F2ZU9wdGlvbnMoKXt2YXIgaXRlbXNUb0FkZD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiaXRlbXNUb0FkZCIpLnZhbHVlOyB2YXIgb3B0aW9ucz17J2l0ZW1zVG9BZGQnOiBpdGVtc1RvQWRkfTsgcmV0dXJuIG9wdGlvbnM7fTsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImNhbmNlbF9idXR0b24iKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpe2NvbnNvbGUubG9nKCJDYW5jZWwiKTsgLyogU2V0IHRoZSByZXR1cm4gVVJMIGRlcGVuZGluZyBvbiB0aGUgcnVudGltZSBlbnZpcm9ubWVudCAoZW11bGF0b3Igb3IgUGViYmxlIFBob25lIEFwcCkgKi8gdmFyIHJldHVybl90bz1nZXRRdWVyeVBhcmFtKCdyZXR1cm5fdG8nLCAncGViYmxlanM6Ly9jbG9zZSNjYW5jZWwnKTsgZG9jdW1lbnQubG9jYXRpb24uaHJlZj1yZXR1cm5fdG87fSwgZmFsc2UpOyAvKiBUT0RPIGRvIHRoaXMgZm9yIGFsbCBpdGVtcyB3aXRoIHRoZSBzYW1lIGlkIChlLmcuIGFsbG93IHR3byBzYXZlIGJ1dHRvbnMsIHRvcCBhbmQgYm90dG9tIG9mIHBhZ2UgKi8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInNhdmVfYnV0dG9uIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKXtjb25zb2xlLmxvZygiU3VibWl0Iik7IHZhciBvcHRpb25zPXNhdmVPcHRpb25zKCk7IC8qIFNldCB0aGUgcmV0dXJuIFVSTCBkZXBlbmRpbmcgb24gdGhlIHJ1bnRpbWUgZW52aXJvbm1lbnQgKGVtdWxhdG9yIG9yIFBlYmJsZSBQaG9uZSBBcHApICovIHZhciByZXR1cm5fdG89Z2V0UXVlcnlQYXJhbSgncmV0dXJuX3RvJywgJ3BlYmJsZWpzOi8vY2xvc2UjJyk7IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9cmV0dXJuX3RvICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTt9LCBmYWxzZSk7IC8qIFRPRE8gb24gcmVhZHkuLi4gKi8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1zX2V4cG9ydGVkJykudmFsdWU9Z2V0UXVlcnlQYXJhbSgnaXRlbXNfZXhwb3J0ZWQnLCAnY29tbWEsc2VwZXJhdGVkX2l0ZW1zJyk7PC9zY3JpcHQ+';
  // data URI does NOT support parameters
  // i.e. does not support export :-(
  Pebble.openURL(configURL);
});

// react to the config page when new data is sent
Pebble.addEventListener('webviewclosed', function(e) {
  var configData = decodeURIComponent(e.response);

  if(configData) {
    configData = JSON.parse(decodeURIComponent(e.response));

    console.log("Config data recieved!" + JSON.stringify(configData));

    // prepare a structure to hold everything we'll send to the watch
    var dict = {};

    // color settings
    if(configData.itemsToAdd) {
      dict.KEY_ITEMS_TO_ADD = configData.itemsToAdd;
    }

    console.log('Preparing message: ', JSON.stringify(dict));

    // Send settings to Pebble watchapp
    Pebble.sendAppMessage(dict, function(){
      console.log('Sent config data to Pebble');
      //itemsToAdd = [];  // reset export list
    }, function() {
      console.log('Failed to send config data!');
    });
  } else {
    console.log("No settings changed!");
  }
});

Pebble.addEventListener("appmessage", function(e) {
   if (e.payload.KEY_ITEMS_TO_ADD) {
      var items_exported = [];

      console.log('Message from Pebble: ' + JSON.stringify(e.payload));
      console.log('Message from Pebble value: ' + e.payload.KEY_ITEMS_TO_ADD);
      console.log('pre add items_exported = ', JSON.stringify(items_exported));
      items_exported.push(e.payload.KEY_ITEMS_TO_ADD);
      console.log('post add items_exported = ', JSON.stringify(items_exported));
      //items_exported.push('static');
      //console.log('post add static items_exported = ', JSON.stringify(items_exported));
      localStorage.setItem('items_exported', JSON.stringify(items_exported));  // global variables do not persist even when watch app is still running, so store now
   }
});
