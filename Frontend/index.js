// JavaScript
const url = "http://localhost:2020";

const reschat = document.getElementById("reschat");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", sendMessage);

async function sendMessage() {
  const message = userInput.value.trim();
  if (message !== "") {
    addMessageToChatbox("user", message);
    userInput.value = "";

    try {
      const response = await fetch(`${url}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chats: message }),
      });

      const data = await response.json();
      console.log(data);

      const botReply = data.output; // Corrected line

      addMessageToChatbox("bot", botReply);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  }
}

function addMessageToChatbox(role, message) {
  const div = document.createElement("div");
  div.classList.add("chat", role);
  div.textContent = message;
  reschat.appendChild(div);
  reschat.scrollTop = reschat.scrollHeight;
}
