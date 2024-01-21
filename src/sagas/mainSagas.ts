import { all, takeEvery } from 'typed-redux-saga';
import { mainActions } from '../actions';
import { MainApi } from '../api'
import { select } from 'redux-saga/effects';

export function* addMessage(action: any, socket: WebSocket): Generator<any, void, any> {
    try {
        // Проверяем, что сокет открыт
        if (socket.readyState === WebSocket.OPEN) {
            const username = yield select((state) => state.main.username)
            yield MainApi.sendMessage(socket, username, action.messageText);
        } else {
            console.log('Соединение с сокетом не установлено или закрыто.');
        }

    } catch (error) {
        console.log('Ошибка при отправке сообщения на сокет:', error);
    }
}
export function* watchMainMessagesList(props: any): Generator<any, void, any> {
    yield takeEvery(mainActions.MAIN_SEND_MESSAGE, (action: any) => addMessage(action, props.socket));
}

export default function* rootSaga(props: { socket: WebSocket }): Generator<any, void, any> {
    yield all([
        watchMainMessagesList(props),
    ]);
}