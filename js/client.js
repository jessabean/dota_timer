$(document).on("ready", function () {
  window.Client = function () {

    var socket = io.connect(window.location.origin);

    function setTimer (data) {
      now = new Date(); // assuming EST cause I'm lazy
      serverTime = new Date(data.newTime);
      elapsed = (now - serverTime) / 1000; // ms -> s
      timer.reset(parseInt(elapsed, 10));
    }

    // initial render of time server injected into HTML:
    setTimer({
      newTime: window.latestTime
    })

    socket.on('clock_reset', function (data) {
      setTimer(data);
    });

    this.resetTimer = function () {
      console.log("emitting reset");
      socket.emit('timer_was_reset');
    }
  };

  window.client = new Client();

});
