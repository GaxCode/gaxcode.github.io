const ws = new WebSocket("ws://localhost:3000");

const state = {
    name: "User-" + Math.floor(Math.random() * 999)
};

const input = document.getElementById("chat-input");
const btn = document.getElementById("chat-send");
const box = document.getElementById("messages");

function addMessage(from, text) {
    const div = document.createElement("div");
    div.style.margin = "6px 0";
    div.innerHTML = `<b>${from}:</b> ${text}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function send() {
    const text = input.value.trim();
    if (!text) return;

    const msg = {
        from: state.name,
        text,
        time: Date.now()
    };

    ws.send(JSON.stringify(msg));
    input.value = "";
}

btn.onclick = send;
input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});

ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    addMessage(data.from, data.text);
};

ws.onopen = () => {
    addMessage("system", "bağlandı ✔");
};

ws.onclose = () => {
    addMessage("system", "bağlantı koptu ❌");
};
