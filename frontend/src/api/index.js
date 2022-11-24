const SERVER_URL = process.env.REACT_APP_SERVER_URL || "ws://localhost:8000/ws";
const socket = new WebSocket(SERVER_URL);

export const connect = (cb) => {
    socket.onopen = () => {
        console.log("Connected");
    }

    socket.onclose = (e) => {
        console.log("Disconnected:", e);
    }

    socket.onmessage = (msg) => {
        console.log("New message:", msg);
        cb(msg);
    }

    socket.onerror = (error) => {
        console.log("socket error:", error)
    }
}

export const sendMsg = (msg) => {
    console.log("sending: ", msg)
    socket.send(msg);
}