//cowntdown maker
window.onload = function() {
  update_lang(navigator.language);

  // load date from query string
  var isquery = query2form();
  if(!isquery){ // there is no date in query string
    // display editor
    id2e("edbox").style.display = "flex";
    document.title = "countdown maker";
  }else{
    // edit html title
    document.title = title;
  }

  // calculate countdown
  update_countdown();

  // add event listener to input
  id2e("edname").addEventListener("input", edit_form);
  id2e("eddate").addEventListener("input", edit_form);
  id2e("edtime").addEventListener("input", edit_form);

  // display countdown
  id2e("cdbox").style.display = "block";

  // update countdown periodically
  setInterval(update_countdown, 500);
}

var target_date; // target date to count down to
var title = "Title of countdown"; // title of the countdown

var id2e = function(id) {
  return document.getElementById(id);
}

var query2form = function() {
  var urlsp = new URLSearchParams(window.location.search);
  if(urlsp.has("date")) {
    target_date = new Date(urlsp.get("date"));
    if(urlsp.has("title")) {
      title = urlsp.get("title");
    }
  }else{
    return false;
  }
  return true;
}

var update_countdown = function() {
  
  // get current time
  var current_date = new Date().getTime();

  // get the difference in time
  var difference = target_date - current_date;
  
  //fix minus
  if(isNaN(difference)) difference = 0;
  if(difference < 0) difference = 0;

  // set the time for the countdown
  var seconds = Math.floor((difference / 1000) % 60);
  var minutes = Math.floor((difference / 1000 / 60) % 60);
  var hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  var days = Math.floor(difference / (1000 * 60 * 60 * 24));

  // fix zero
  if(seconds < 10) seconds = "0" + seconds;
  if(minutes < 10) minutes = "0" + minutes;
  if(hours   < 10) hours   = "0" + hours;

  // sanitize the title
  title = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // set the display
  id2e("cdd").innerHTML = days;
  id2e("cdh").innerHTML = hours;
  id2e("cdm").innerHTML = minutes;
  id2e("cds").innerHTML = seconds;
  id2e("cdname").innerHTML = title;
}

var update_lang=(lang)=>{
  if(lang!='ja') lang='en';
  var ja = Array.from(document.getElementsByClassName('langja'));
  var en = Array.from(document.getElementsByClassName('langen'));
  if(lang=='ja'){
    ja.map((x)=>x.style.display='inline-block');
    en.map((x)=>x.style.display='none'  );
  }else{
    en.map((x)=>x.style.display='inline-block');
    ja.map((x)=>x.style.display='none'  );
  }
}

var edit_form = function() {
  // get the input value
  title = id2e("edname").value;
  var date = id2e("eddate").value;
  var time = id2e("edtime").value;

  // check if the date is valid
  if(date.match(/^2[0-9]{3}-[0-1][0-9]-[0-3][0-9]$/) == null) {
    return;
  }
  if(time.match(/^[0-2][0-9]:[0-5][0-9]$/) == null) {
    time = "00:00";
  }
  var localtime = new Date(date + "T" + time + ":00Z");
  if(isNaN(localtime)) {
    return;
  }
  // convert to UTC
  target_date = new Date(localtime.getTime() + localtime.getTimezoneOffset() * 60000);

  // update countdown
  update_countdown();
  update_link();
}

var update_link = function() {
  var urlsp = new URLSearchParams(window.location.search);
  urlsp.set("date", target_date.toISOString());
  urlsp.set("title", title);
  window.history.replaceState(null, null, "?" + urlsp.toString());
}
  
