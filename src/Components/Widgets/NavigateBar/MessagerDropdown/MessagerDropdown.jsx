import React from 'react'

import { useSelector } from 'react-redux';
import { MobileView, BrowserView } from 'react-device-detect';
import Mailbox from './Mailbox';
import MessageButton from './MessageButton';


export default function MessagerDropdown() {

    const allChat = useSelector(state => state.messenger.allChat);
    const isOpen = useSelector(state => state.messenger.isOpen);

    return (
        <>
            <BrowserView>

                <MessageButton isOpen={isOpen} />
                {isOpen && (
                    <Mailbox allChat={allChat} />
                )}

            </BrowserView>

            <MobileView>
                <MessageButton />
            </MobileView>
        </>
    )
}
