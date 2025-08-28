const app = require("express")();
const http = require("http").Server(app);
const  io = require("socket.io")(http);
const path = require("path")

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
var user = [];
io.on("connection", (socket)=>{

    socket.on("addUser",(data)=>{
        if(!user.includes(data)){
            user.push(data);
            socket.emit("newUser",{username : data});
        }else{
            socket.emit("userExists", data + " username is taken! Try some other username.")
        }
    })
})

http.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})