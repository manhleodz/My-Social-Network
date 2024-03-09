import socketIOClient from "socket.io-client";
const socket = socketIOClient(import.meta.env.VITE_CHAT_URL);
export default socket;