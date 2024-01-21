const WebSocket = require('ws');
const moment = require('moment');
const dbConfig = require('./dbConfig');

const db = dbConfig.db
dbConfig.createTable()

// WebSocket сервер
const wsServer = new WebSocket.Server({ port: 9000 });
wsServer.on('connection', onConnect);

// Функция для отправки текущего списка записей клиенту
function sendMessagesToClient(wsClient) {
  db.all("SELECT * FROM messages", (err, rows) => {
    if (err) {
      console.error('Error retrieving messages:', err.message);
    } else {
      // Отправляем текущий список записей клиенту в виде массива JSON
      wsClient.send("Отправляем текущий список записей клиенту")
      wsClient.send(JSON.stringify({action:"UPDATE_MESSAGES",list:rows}));
    }
  });
}

// Функция для отправки сообщения всем клиентам
function broadcastMessage(message) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({action:"ADD_MESSAGE",newMessage:message}));
    }
  });
}

function onConnect(wsClient) {
    console.log('Новый пользователь');
    sendMessagesToClient(wsClient)

    wsClient.on('close', function() {
      console.log('Пользователь отключился');
    });

    wsClient.on('message', function(message) {
        try {
            const jsonMessage = JSON.parse(message);
            switch (jsonMessage.action) {
                case 'ADD_MESSAGE':
                  const newMessage = {
                    time: moment().format('HH:mm'),
                    sender: jsonMessage.sender,
                    text: jsonMessage.text,
                  };
                  console.log(newMessage);
                  // Вставляем новую запись в таблицу
                  db.run(`
                    INSERT INTO messages (time, sender, text)
                    VALUES ('${newMessage.time}', '${newMessage.sender}', '${newMessage.text}')
                  `, [], (err) => {
                    if (err) {
                      console.error('Во время добавления записи в таблицу произошла ошибка:', err.message);
                      wsClient.send(`Не удалось сохранить сообщение от ${newMessage.sender} в базу данных`);
                    } else {
                      console.log('База данных успешно обновлена');
                      // Отправляем обновленный список всем клиентам
                      broadcastMessage(newMessage);
                    }
                  });
                  break;
                default:
                    console.log('Неизвестная команда');
                    break;
            }
        } catch (error) {
            console.log('Ошибка', error);
        }
    });
}

console.log('Сервер запущен на 9000 порту');
