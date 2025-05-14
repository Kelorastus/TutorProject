import { sendData, fetchData } from "./index.html";

const form = document.getElementById("msgForm");
const list = document.getElementById("msgs");

// On form submit: send to Firestore
form.addEventListener("submit", async e => {
  e.preventDefault();
  const text = form.msg.value.trim();
  if (!text) return;
  await sendData({ text, createdAt: Date.now() });
  form.msg.value = "";
  renderMessages(); 
});

// Fetch & render all messages
async function renderMessages() {
  const msgs = await fetchData();
  list.innerHTML = msgs
    .sort((a,b) => a.createdAt - b.createdAt)
    .map(m => `<li>${m.text}</li>`)
    .join("");
}

// Load existing messages on page load
window.addEventListener("DOMContentLoaded", renderMessages);
