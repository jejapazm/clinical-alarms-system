$(document).ready(function () {

  let audio = new Audio('/static/music/test2.mp3');

  let camas = [
      "203-A", "203-B", "203-C",
      "204-A", "204-B", "204-C", "204-D",
      "205-A", "205-B", "205-C", "205-D",
      "206-A", "206-B", "206-C", "206-D"
  ]

  for ( let i = 0; i < camas.length; i++ ) {
    document.getElementById(camas[i]).addEventListener("click", () => myFunction(camas[i]));
  }

  function myFunction(value) {
    if (document.getElementById(value).innerHTML !== "SIN ALERTAS") {
      document.getElementById(value).innerHTML = "SIN ALERTAS";
      document.getElementById(value).style.background = "#2196F3";
      let isAnyCalling = false;
      for ( let i = 0; i < camas.length; i++ ) {
        if ( document.getElementById(camas[i]).innerHTML === "LLAMANDO" ) {
          isAnyCalling = true;
        }
        document.getElementById(camas[i]).addEventListener("click", () => myFunction(camas[i]));
      }
      if ( !isAnyCalling ) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }

  //connect to the socket server.
  //   var socket = io.connect("http://" + document.domain + ":" + location.port);
  var socket = io.connect();

  //receive details from server
  socket.on("updateAlerts", async function (msg)  {

    if (msg.estado === "1") {
      document.getElementById(msg.cama).style.background = "#FC1B00";
      document.getElementById(msg.cama).innerText = "LLAMANDO";
      var checked = document.querySelector('#myCheck').checked;
      if (checked === true)  {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        // setInterval(function() {
        //     document.getElementById(msg.cama).style.background = "#2196F3";
        //     document.getElementById(msg.cama).innerHTML = "SIN ALERTAS";
        // }, 15000);
      }
    }

    if (msg.estado === "0") {
      document.getElementById(msg.cama).style.background = "#2196F3";
      document.getElementById(msg.cama).innerHTML = "SIN ALERTAS";
    }

  });
});