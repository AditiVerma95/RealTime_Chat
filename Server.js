// Import required modules
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serve files from the "public" folder
app.use(express.static("public"));

// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (data) => {
        io.emit("chat message", data);
    });


    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start server on port 3000
http.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
