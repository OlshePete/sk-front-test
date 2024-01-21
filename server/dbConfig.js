const sqlite3 = require('sqlite3').verbose();

// Создаем и открываем соединение с базой данных
const db = new sqlite3.Database('server/chatbase.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('База данных подключена');
  }
});

module.exports = {
  db: db,
  createTable: function() {
    // Создаем таблицу messages, если ее еще нет
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        time TEXT,
        sender TEXT,
        text TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Ошибка при создании таблицы  "messages"', err.message);
      } else {
        console.log('Таблица "messages" успешно добавлена');
      }
    });
  }
};