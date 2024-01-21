class MainApi {
    static socketUrl = 'ws://localhost:9000';
    static async sendMessage(socket: WebSocket, sender: string, messageText: string): Promise<void> {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                    action: 'ADD_MESSAGE',
                    sender,
                    text: messageText,
                })
            );
        } else {
            console.log('Соединение с сокетом не установлено или закрыто.');
        }
    }
}

export default MainApi;