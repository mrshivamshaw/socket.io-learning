const app = require("express")();
const http = require("http").Server(app);
const  io = require("socket.io")(http);
const path = require("path")

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
var user = [];
io.on("connection", (socket)=>{

    socket.on("addUser",(username)=>{
        if(!user.includes(username)){
            user.push(username);
            socket.emit("addedUser",username);
            socket.broadcast.emit("newMsg",{user:username, msg: "Just joined the chat 🚀🚀🚀"});
        }else{
            socket.emit("userExists", username + " username is taken! Try some other username.")
        }
    })

    socket.on("msg",(data)=>{
        io.emit("newMsg",data);
    })
})

http.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})