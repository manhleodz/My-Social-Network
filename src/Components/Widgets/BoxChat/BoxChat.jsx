import BoxChatWithOne from "./BoxChatWithOne/BoxChatWithOne";
import BoxGroupChat from "./BoxGroupChat/BoxGroupChat";

export default function BoxChat({ chat }) {

    if (chat.RelationshipId) {
        return <BoxChatWithOne chat={chat} />
    } else {
        return <BoxGroupChat chat={chat} />
    }
}