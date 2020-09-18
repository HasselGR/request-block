import browser from 'webextension-polyfill'


let button = document.getElementById("entersite");
let input = document.getElementById("userinput");

button.addEventListener("click", function(){
  if (input.value.length > 0){
    let list = browser.storage.sync.get("url");
    list.then((data) => {
      let urls = data.url
      urls.push(input.value);
      // console.log("sync", data.url);
      // console.log("url", urls);
      browser.storage.sync.set({url: urls});
      alert("Site fully added!");
      console.log(data);
    })
  }
})