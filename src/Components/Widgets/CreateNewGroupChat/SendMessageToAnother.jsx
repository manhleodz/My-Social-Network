import React, { useEffect, useState } from 'react';
import { FriendApi } from '../../../Network/Friend';
import ChatContainer from '../BoxChat/BoxChatWithOne/ChatContainer';

export default function SendMessageToAnother({ newUser }) {

    // const user = useSelector(state => state.authentication.user);
    const [chat, setChat] = useState(null);

    useEffect(() => {

        FriendApi.openChannelMessageRequest({ user: newUser.id }).then(res => {
            setChat({
                id: newUser.id,
                nickname: newUser.nickname,
                username: newUser.username,
                smallAvatar: newUser.smallAvatar,
                RelationshipId: res.data.relationshipId.id
            })
        })
    }, [newUser]);

    if (!chat) return (
        <div>

        </div>
    )
    return (
        <>
            <ChatContainer chat={chat} />
        </>
    )
}
