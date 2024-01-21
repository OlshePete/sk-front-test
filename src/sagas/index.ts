import { all } from 'typed-redux-saga';
import mainSagas from './mainSagas';

export default function* rootSaga(props: { socket: WebSocket }): Generator<any, void, any> {
    yield all([
        mainSagas(props),
    ]);
}
