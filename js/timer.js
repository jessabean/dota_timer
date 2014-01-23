// Timer library 1.0
// http://www.restyr.com/simple-javascript-jquery-timer/

function _timer(callback)
{
    var time = 0;     //  The default time of the timer
    var mode = 1;     //    Mode: count up or count down
    var status = 0;    //    Status: timer is running or stoped
    var timer_id;    //    This is used by setInterval function

    // this will start the timer ex. start the timer with 1 second interval timer.start(1000)
    this.start = function(interval)
    {
      interval = (typeof(interval) !== 'undefined') ? interval : 1000;
      timer_id = setInterval(function()
      {
        time++;
        generateTime();
        if(typeof(callback) === 'function') callback(time);

      }, interval);
    }

    // Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
    this.reset =  function(sec)
    {
      sec = (typeof(sec) !== 'undefined') ? sec : 0;
      time = sec;
      generateTime(time);
    }


    // This methode return the current value of the timer
    this.getTime = function()
    {
      return time;
    }

    // This method will render the time variable to hour:minute:second format
    function generateTime()
    {
      var second = time % 60;
      var minute = Math.floor(time / 60) % 60;
      var hour = Math.floor(time / 3600) % 60;

      second = (second < 10) ? '0'+second : second;
      minute = (minute < 10) ? '0'+minute : minute;
      hour = (hour < 10) ? '0'+hour : hour;

      $('div.timer span.second').html(second);
      $('div.timer span.minute').html(minute);
      $('div.timer span.hour').html(hour);
    }
}

// example use
var timer;

$(document).ready(function(e)
{
  timer = new _timer();
  timer.reset(0);
  timer.start(1000);
});