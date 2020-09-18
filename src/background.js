import browser from 'webextension-polyfill'


// match pattern for the URLs to redirect
var pattern = []

browser.runtime.onInstalled.addListener(function(){
  browser.storage.sync.set({url:[]});
  var site = browser.tabs.create({
    index:0,
    url: "./options.html",
    active:true,
})

})


browser.storage.onChanged.addListener(function(){
  let list = browser.storage.sync.get("url")
  list.then((data) => {
    pattern = data.url;
  })
  console.log("value has changed", pattern);
})

// cancel function returns an object
// which contains a property `cancel` set to `true`
function cancel(requestDetails) {
  if (pattern.length > 0){
  console.log("Canceling: " + requestDetails.url);
  return {cancel: true};
  }
}


browser.webRequest.onBeforeRequest.addListener(
    cancel,
    {urls: pattern},
    ["blocking"]
);