let socket = new WebSocket("ws://localhost:8080/ws/chat");

socket.onopen = function (event) {
    console.log("Connected to the WebSocket");
};
socket.onmessage = function (event) {
    console.log("Received:", event.data);
};
socket.onerror = function (error) {
    console.log(`WebSocket Error: ${error}`);
};

let allowAutoScroll = true; // Variable to track whether to allow auto-scrolling

socket.onmessage = function (event) {
    let chatContainer = document.getElementById("chatContainer");

    // Create and append the new message
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.innerText = event.data;
    chatContainer.appendChild(msgDiv);

    // Remove old messages if there are more than 50 messages
    let allMessages = chatContainer.querySelectorAll(".message");
    while (allMessages.length > 150) {
        chatContainer.removeChild(allMessages[0]);
        allMessages = chatContainer.querySelectorAll(".message");
    }

    // Auto-scroll to the bottom only if allowed
    if (allowAutoScroll) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
};

// Detect scroll events to disable/enable auto-scrolling
document.getElementById("chatContainer").addEventListener('scroll', function () {
    let chatContainer = this;

    // If user scrolls up, stop auto-scrolling
    if (chatContainer.scrollTop + chatContainer.clientHeight < chatContainer.scrollHeight) {
        allowAutoScroll = false;
    } else {
        allowAutoScroll = true;
    }
});

// Make chatContainer draggable
let dragObj = null;
document.getElementById('chatContainer').addEventListener('mousedown', function(event) {
    // Ensure we're not in the middle of resizing
    if (event.target === this) {
        dragObj = this;
        // Store the initial position of the mouse relative to the chat container
        dragObj.offsetX = event.clientX - dragObj.getBoundingClientRect().left;
        dragObj.offsetY = event.clientY - dragObj.getBoundingClientRect().top;
        event.preventDefault();
    }
});

document.addEventListener('mousemove', function(event) {
    if (dragObj) {
        // Adjust the position of the chat container based on the mouse's current position and the stored offsets
        dragObj.style.left = (event.clientX - dragObj.offsetX) + "px";
        dragObj.style.top = (event.clientY - dragObj.offsetY) + "px";
    }
});

document.addEventListener('mouseup', function() {
    dragObj = null; // Reset when mouse is released
});