import BoxChatWithOne from "./BoxChatWithOne";
import BoxGroupChat from "./BoxGroupChat";

export default function BoxChat({ chat }) {

    if (chat.relationshipId) {
        return <BoxChatWithOne chat={chat} />
    } else {
        return <BoxGroupChat chat={chat} />
    }
}