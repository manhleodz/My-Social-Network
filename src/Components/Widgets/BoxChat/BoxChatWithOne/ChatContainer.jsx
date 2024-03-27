import React, { useEffect, useState } from 'react';
import { ChatApi } from '../../../../Network/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage, seenMessage } from '../../../../Redux/MessagerSlice';
import { isMobile } from 'react-device-detect';
import socket from '../../../../Network/Socket';
import ListMessage from './ListMessage';
import InputForm from './InputForm';

export default function ChatContainer({ chat }) {

    const user = useSelector(state => state.authentication.user);
    const messageCache = useSelector(state => state.messenger.messageCache);
    const dispatch = useDispatch();

    const [listMessage, setListMessage] = useState({});
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        setListMessage({});
    }, []);


    useEffect(() => {
        socket.emit("join_room", `coversation-${chat.RelationshipId}`);

        socket.on("typing", () => setTyping(true));
        socket.on("stop typing", () => setTyping(false));
    }, [])

    useEffect(() => {

        if (chat.seen === false) {
            ChatApi.seenMessage(chat.RelationshipId);
            dispatch(seenMessage(chat.RelationshipId));
        }

        const idx = messageCache.findIndex(e => e.RelationshipId === chat.RelationshipId);

        if (idx === -1) {

            ChatApi.getMessage(chat.RelationshipId).then((res) => {
                if (res.status === 200) {
                    const messages = res.data.data;
                    const messagesByDate = {};

                    // Lặp qua từng tin nhắn
                    for (const message of messages) {
                        // Trích xuất ngày từ createdAt (bỏ phần giờ)
                        const date = new Date(message.createdAt).toLocaleDateString();

                        // Kiểm tra ngày đã tồn tại trong dictionary hay chưa
                        if (!messagesByDate.hasOwnProperty(date)) {
                            // Tạo list mới để lưu trữ tin nhắn của ngày
                            messagesByDate[date] = [];
                        }

                        // Thêm tin nhắn vào list của ngày tương ứng
                        messagesByDate[date].push(message);
                    }
                    setListMessage(messagesByDate);
                    dispatch(saveMessage({
                        RelationshipId: chat.RelationshipId,
                        messages: res.data.data
                    }));
                } else
                    setListMessage([]);
            })
        } else {
            setListMessage(messageCache[idx].messages);
        }

    }, [chat]);

    return (
        <>
            <div className={`${isMobile ? 'w-[300px] h-[290px]' : 'w-80 h-[300px]'}`}>
                {JSON.stringify(listMessage) !== "{}" && (
                    <ListMessage listMessage={listMessage} chat={chat} setListMessage={setListMessage} />
                )}
            </div>
            <InputForm
                listMessage={listMessage}
                setListMessage={setListMessage}
                chat={chat}
                user={user}
                typing={typing}
                setTyping={setTyping}
            />
        </>
    )
}
