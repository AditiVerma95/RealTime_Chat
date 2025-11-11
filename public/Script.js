const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Ask username
let username = "";
while (!username) {
  username = prompt("Enter your username:");
}

socket.emit("new user", username);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const messageData = {
      user: username,
      text: input.value,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    socket.emit("chat message", messageData);
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.innerHTML = `
    <div style="flex:1">
      <strong>${data.user}</strong> ${data.text}
    </div>
    <span class="timestamp">${data.time}</span>
  `;
  messages.insertBefore(item, messages.firstChild);
});


