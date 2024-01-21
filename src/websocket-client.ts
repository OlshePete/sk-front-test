import { Dispatch } from "redux";
import { mainActions } from "./actions";
import { TAction } from "actions/mainActions";
import { MainApi } from "api";

const setupSocket = (dispatch: Dispatch<TAction>) => {
  const socket = new WebSocket(MainApi.socketUrl);

  socket.addEventListener("open", (event: Event) => {
    console.log("Соединение установлено");
  });

  // Обработка сообщений от сервера
  socket.addEventListener("message", (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);

      if (message?.action === "UPDATE_MESSAGES") {
        dispatch(mainActions.mainMessagesListSuccess(message.list));
        return;
      }
      if (message?.action === "ADD_MESSAGE") {
        dispatch(mainActions.mainMessagesListAddNew(message.newMessage));
        return;
      }
    } catch (error) {
      console.log("Получено сообщение от сервера:", event.data);
    }
    return;
  });

  socket.addEventListener("close", (event: CloseEvent) => {
    console.log("Соединение закрыто");
  });

  socket.addEventListener("error", (error: Event) => {
    console.error("Ошибка соединения:", error);
  });

  return socket;
};

export default setupSocket;