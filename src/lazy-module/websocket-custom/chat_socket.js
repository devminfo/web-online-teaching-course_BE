  // the server of nodejs
//   const server = "wss://socket1.crudcode.tk";
const server = "ws://s21haqua.izisoft.io";

// the server api of spring boot
const serverAPI = "https://api.giadinhsunkun.com/p5sohadriving/P1Controller/C1Admin/SelectAllByWhat.php";

// sending message from client !
var socket = io(server, { transports: ['websocket', 'polling', 'flashsocket'] });


// send message chat room
function sendMessageChatRoom() {
    debugger;

    // get message and information
    var message = document.getElementById("message");
    var IdEmployee = document.getElementById("IdEmployee");
    var CreatedAt = document.getElementById("CreatedAt");

    // create object 
    let object = {
        'what':"9301",
        'Message':message.value,
        'IdEmployee':IdEmployee.value,
        'CreatedAt':CreatedAt.value
    };  

    var http = new XMLHttpRequest();
    
    var params = 'orem=ipsum&name=binny';
    http.open('POST', serverAPI, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function() {//Call a function when the state changes.
    
    }
    http.send(JSON.stringify(object));

    // sending message from client to socket
    socket.emit("new_message", object);

    // sending message from client to api

    // this will prevent the form from submitting
    return false;
}



// client will listen from server
socket.on('new_message', function (data) {
    // display message
    console.log("Server says", data);

    // creates a new DOM element for li tag
    var li = document.createElement("li");

    // show message in li item
    li.innerHTML = data;

    // append the message at the end of list
    var messages = document.getElementById("messages");
    messages.appendChild(li)
})