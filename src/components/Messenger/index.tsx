import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { mainActions } from "../../actions";
import { AppState } from "../../reducers";
import {
  getMainUsername,
  getMainMessagesList,
} from "../../selectors/mainSelector";
import { MessagesList } from "../../types";
import {
  Card,
  CardMedia,
  Container,
  FormControl,
  IconButton,
  InputBase,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

export interface Props {
  username: string;
  messages: MessagesList;

  getMessagesList: Function;
  sendMessage: Function;
  setUsername: Function;
}

const mapStateToProps = (state: AppState) => ({
  messages: getMainMessagesList(state),
  username: getMainUsername(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMessagesList: () => dispatch(mainActions.mainMessagesListFetch()),
  sendMessage: (messageText: string) =>
    dispatch(mainActions.mainSendMessage(messageText)),
  setUsername: (newUsername: string) =>
    dispatch(mainActions.setMainUsername(newUsername)),
});

const Home = (props: Props) => {
  const { username, messages, getMessagesList, sendMessage, setUsername } =
    props;

  const [messageText, setMessageText] = React.useState("");
  const listRef = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    getMessagesList();
  }, []);
  React.useEffect(() => {
    if (listRef.current && messages?.length > 1) {
      const children = listRef.current.children;
      const last =
        children && (children?.[children.length - 1] as HTMLLIElement);
      last?.scrollIntoView({ block: "end", behavior: "smooth", });
    }
  }, [messages, listRef.current]);

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (messageText) {
      sendMessage(messageText);
      setMessageText("");
    }
  };
  return (
    <Container maxWidth={false} disableGutters>
      <List disablePadding ref={listRef}>
        {messages === null && (
          <ListItem>
            <Typography variant="body2" className="noMessage">
              Загрузка...
            </Typography>
          </ListItem>
        )}
        {messages !== null && !messages.length && (
          <ListItem>
            <Typography variant="body2" className="noMessage">
              Нет сообщений
            </Typography>
          </ListItem>
        )}
        {messages !== null &&
          messages.length>0 &&
          messages.map((message, index) => (
            <ListItem
              className="messageItem"
              key={message.text + index}
              disableGutters
            >
              <Typography
                variant="body1"
                className="messageText"
                component={"div"}
              >
                <Typography
                  variant="body2"
                  className="messageSender"
                  component={"span"}
                >
                  {message.sender}
                </Typography>
                {message.text}
                <Typography
                  variant="body2"
                  className="messageTime"
                  component={"span"}
                >
                  {message.time}
                </Typography>
              </Typography>
            </ListItem>
          ))}
      </List>
      <Card component={"form"} elevation={0}>
        <FormControl>
          <Typography component={"label"} variant="caption" htmlFor="username">
            Ваше имя:
          </Typography>
          <InputBase
            name="username"
            value={username}
            className="usernameValue"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </FormControl>
        <InputBase
          className={"messageInput"}
          value={messageText}
          onChange={(event) => {
            setMessageText(event.target.value);
          }}
          onKeyDown={handleEnterPress}
          placeholder="Введите сообщение"
          autoFocus
        />
        <IconButton
          disableFocusRipple={true}
          disableRipple={true}
          onClick={handleSubmit}
        >
          <CardMedia
            alt="send-message"
            component={"img"}
            style={{
              width: "20px",
              height: "20px",
            }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADe0lEQVR4nO3bTahVVRQH8J8v6z0ry6KIPknySTUoSKIIIwJHhTRIaVDpLGyUM6EEkz5oFjWLRtnMaiQ0eSF9YkWkFGQEFYXSJ0WKPS2ft8G6l32M+/x47+x9jp77hzu55+y9/nvdvdde/7X3ZYQRRhhhBDvxNTbi4oa5NIIv0Ot/DuBlTDbKqDDukxww+BzDFFZjQXPUyuFtMfD38Sr+lpzxFTbggsbYFcCN+AczWCFiwRP4QXLEX3gJ1zfEMTteFAP9QJr2Y2IZTEmOmMEOrGqAY1Yswa9ikGuGPL8Nr2BacsZuPIZFhThmxwYxsB9x/izvXIFN2Cc54he8gGsLcMyKc7BHDOqpk7x7HtZil+SII9iOuzJyzI57xWAO4bpTbLMC2/Cv5IzPsA7nZuCYHW+KQWw7zXZX4mn8Ljnip/53l9VJMDeWimB3DCvn0H5c/PpfSo44LBx6S00cs+M5aSqPzaOflSIuHJWc8aGIHwvnyTErLsR+QfjRGvq7QewUf0qO+FbsKJfW0H8WrJPW8UU19blY5A57JUccFDnGzTXZqA0L8LEg+WzNfY+JbHKHiDWtFWF3CmKHsSyTjeVCZxySZsU3Qo+0QoS9Lki9kdlOa0XY1WKd9pQRQa0UYZv7RPaIlLkUWiPCFuH7PoEtmChpXGSZW/Gz40XY1v6zIlhbMf6HqB+WzuzGsR6fV7gcEXHq9hIEHsanFeM9fCKm5OISBCq4W+iWapb5ER5SQITdJDK73yrGp0Xau0rZfbxRETYulsaUlND0xFnDJlyem8D/uDQqwpYJr1f38UGRZLWyu0ejImwhHhD7dpXAu7kND8GkCNYHKjzeY34Sd67oNWBzGLLxmNTBJTBbENyrfBCcUDAItmkbvErBbbDTidCaiqHOpcITOi6GBnJ4tw7K4WpB5J4C9lpXEBmUxLZnttPKktigKDqdkURri6LVsvgzNfc9rCw+o2Vl8fWC2D5xUlQHzpiDkerR2CM19Heio7FLaui/djwvSO4yv+l4Rh6OVo/H75hD+6KiJAfeEqRfO812RUVJLgyuyBwUAzoVnDVXZKqXpJ48ybtn5SWpx8VAvjO72DnRNblrCnDMhiVScePBIc9bIUpyYnBVdmflu9aJklwYXJY+ilu1VJTkRKevy9/v+PpeK0VJTnT+LzPv6PifpkYYYYQROon/AMqXkYAs2UHIAAAAAElFTkSuQmCC"
          />
        </IconButton>
      </Card>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
