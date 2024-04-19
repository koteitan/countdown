//cowntdown maker
var id2e = function(id) {
  return document.getElementById(id);
}

var target_date; // target date to count down to

window.onload = function() {
  // load date from query string
  var urlsp = new URLSearchParams(window.location.search);
  if(urlsp.has("date")) {
    target_date = new Date(urlsp.get("date"));
    // for example
    // target_date = new Date("2021-12-31T23:59:59");
  }
  if(urlsp.has("title")) {
    id2e("cdheadline").innerHTML = urlsp.get("title");
  }
  update_countdown();
  setInterval(update_countdown, 500);
}

var update_countdown = function() {
  // get current time
  var current_date = new Date().getTime();

  // get the difference in time
  var difference = target_date - current_date;
  
  // set the time for the countdown
  var seconds = Math.floor((difference / 1000) % 60);
  var minutes = Math.floor((difference / 1000 / 60) % 60);
  var hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  
  // set the display
  id2e("cdd").innerHTML = days;
  id2e("cdh").innerHTML = hours;
  id2e("cdm").innerHTML = minutes;
  id2e("cds").innerHTML = seconds;
}


