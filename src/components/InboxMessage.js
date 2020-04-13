import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

export default class InboxMessage extends React.Component {
  state = {
    conversation: false,
    messages: [
      {
        _id: 1,
        text: 'Send a message to start the conversation.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'The Toad',
          avatar: 'https://firebasestorage.googleapis.com/v0/b/toads-react.appspot.com/o/avatars%2Ftoads_banner.png?alt=media&token=ea10b431-f2e3-4d20-8247-6be492bab1fc',
        },
      },
    ],
    currentUserId: firebase.auth().currentUser.uid
  }

  componentDidMount() {
    var message = this.props.navigation.state.params.message;
    this.setState({
      chat_id: Object.keys(message)[0],
      messages: message[Object.keys(message)[0]].conversation,
      conversation: true
    })
  }
  onSend(messages = []) {
    // save messages into database
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/messages'] = this.state.messages;
    var user = this.props.navigation.state.params.user;
    updates[`/users/${this.state.currentUserId}`] = this.state.currentAvatar;
    updates[`/users/${user.userId}`] = user.avatar;
    return db.ref(`chats/${this.state.chat_id}`).update(updates);
  }

  render() {
    firebase.analytics().setCurrentScreen('chat');
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: firebase.auth().currentUser.uid
        }}
      />
    )
  }
}
