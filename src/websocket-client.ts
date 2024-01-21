import { Dispatch } from 'redux';
import { mainActions } from './actions';
import { TAction } from 'actions/mainActions';

const setupSocket = (dispatch: Dispatch<TAction>) => {
  const socket = new WebSocket('ws://localhost:9000');

  socket.addEventListener('open', (event: Event) => {
    console.log('Соединение установлено');
  });

  // Обработка сообщений от сервера
  socket.addEventListener('message', (event: MessageEvent) => {
    const message = JSON.parse(event.data);

    if (message?.action === 'UPDATE_MESSAGES') {
      dispatch(mainActions.mainMessagesListSuccess(message.list));
      return;
    }
    if (message?.action === 'ADD_MESSAGE') {
      dispatch(mainActions.mainMessagesListAddNew(message.newMessage));
      return;
    }
    if (!message?.action) console.log('Получено сообщение от сервера:', message);
    return;
  });

  socket.addEventListener('close', (event: CloseEvent) => {
    console.log('Соединение закрыто');
  });

  socket.addEventListener('error', (error: Event) => {
    console.error('Ошибка соединения:', error);
  });

  return socket;
};

export default setupSocket;