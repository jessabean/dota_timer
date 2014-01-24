window.Client = function () {

  var socket = io.connect(window.location.origin);

  socket.on('clock_reset', function (data) {
    // assuming EST cause I'm lazy
    now = new Date();
    serverTime = new Date(data.newTime);
    elapsed = (now - serverTime) / 1000; // ms -> s
    timer.reset(parseInt(elapsed, 10));
  });

  this.resetTimer = function () {
    console.log("emitting reset");
    socket.emit('timer_was_reset');
  }
};

window.client = new Client();
