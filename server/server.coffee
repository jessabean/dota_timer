require("coffee-script")
io       = require('socket.io')
fs       = require('fs')
express  = require('express')
path     = require('path')
app      = express()
redis    = require('redis')
process  = require('process')
PROTOCOL = "http"
PORT     = process.env.PORT || 8090
ROOT     = path.dirname(__dirname)

if PROTOCOL == "http"
  http   = require("http")
  server = http.createServer(app)

server.listen(PORT)

app.use '/public', express.static("#{ROOT}/public")
app.use '/css', express.static("#{ROOT}/css")
app.use '/js', express.static("#{ROOT}/js")
app.use '/img', express.static("#{ROOT}/img")

app.get "/*", (req, res) ->
        res.sendfile("#{ROOT}/index.html")

sio = io.listen(server)
sio.enable "browser client minification"
sio.enable "browser client gzip"
sio.set "log level", 1

latestTime = new Date()

sio.sockets.on 'connection', (socket) ->

  socket.emit 'clock_reset', {
    newTime: latestTime.toJSON()
  }

  socket.on 'timer_was_reset', ->
    console.log
    latestTime = new Date()
    # to the clicker
    socket.emit 'clock_reset',
      newTime: latestTime.toJSON()
    # to all others
    socket.broadcast.emit 'clock_reset',
      newTime: latestTime.toJSON()
