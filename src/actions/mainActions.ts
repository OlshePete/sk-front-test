import { Message, MessagesList } from '../types';
import { makeActionCreator } from './helpers';


export const MAIN_MESSAGES_LIST_FETCH = 'MAIN_MESSAGES_LIST_FETCH';
export const MAIN_MESSAGES_LIST_SUCCESS = 'MAIN_MESSAGES_LIST_SUCCESS';
export const MAIN_MESSAGES_LIST_FAILED = 'MAIN_MESSAGES_LIST_FAILED';

export const MAIN_MESSAGES_ADD_NEW = 'MAIN_MESSAGES_ADD_NEW';

export const MAIN_SEND_MESSAGE = 'MAIN_SEND_MESSAGE';
export const MAIN_SEND_MESSAGE_SUCCESS = 'MAIN_SEND_MESSAGE_SUCCESS';
export const MAIN_SEND_MESSAGE_FAILED = 'MAIN_SEND_MESSAGE_FAILED';

export const SET_MAIN_USERNAME = 'SET_MAIN_USERNAME';

export type TAction =
    | Readonly<{ type: 'SET_MAIN_USERNAME', newUsername: string; }>
    | Readonly<{ type: 'MAIN_MESSAGES_ADD_NEW', newMessage: Message; }>
    | Readonly<{ type: 'MAIN_MESSAGES_LIST_FETCH' }>
    | Readonly<{
        type: 'MAIN_MESSAGES_LIST_SUCCESS';
        messagesList: MessagesList;
    }>
    | Readonly<{
        type: 'MAIN_MESSAGES_LIST_FAILED';
        error: Error;
    }>
    | Readonly<{
        type: 'MAIN_SEND_MESSAGE';
        messageText: string;
    }>
    | Readonly<{ type: 'MAIN_SEND_MESSAGE_SUCCESS' }>
    | Readonly<{
        type: 'MAIN_SEND_MESSAGE_FAILED';
        error: Error;
    }>

export default {
    SET_MAIN_USERNAME,

    MAIN_MESSAGES_LIST_FETCH,
    MAIN_MESSAGES_LIST_SUCCESS,
    MAIN_MESSAGES_LIST_FAILED,

    MAIN_SEND_MESSAGE,
    MAIN_SEND_MESSAGE_SUCCESS,
    MAIN_SEND_MESSAGE_FAILED,

    setMainUsername: makeActionCreator(SET_MAIN_USERNAME, 'newUsername'),

    mainMessagesListFetch: makeActionCreator(MAIN_MESSAGES_LIST_FETCH),
    mainMessagesListSuccess: makeActionCreator(MAIN_MESSAGES_LIST_SUCCESS, 'messagesList'),
    mainMessagesListFailed: makeActionCreator(MAIN_MESSAGES_LIST_FAILED, 'error'),

    mainMessagesListAddNew: makeActionCreator(MAIN_MESSAGES_ADD_NEW, 'newMessage'),

    mainSendMessage: makeActionCreator(MAIN_SEND_MESSAGE, 'messageText'),
    mainSendMessageSuccess: makeActionCreator(MAIN_SEND_MESSAGE_SUCCESS),
    mainSendMessageFailed: makeActionCreator(MAIN_SEND_MESSAGE_FAILED, 'error'),
}