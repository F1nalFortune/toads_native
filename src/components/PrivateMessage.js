import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

export default class PrivateMessage extends React.Component {
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
    var user = this.props.navigation.state.params.user;
    const chatterID = firebase.auth().currentUser.uid;
    const chateeID = user.userId;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    this.setState({
      chat_id: chatIDpre.join('_')
    })
    //grab current user's avatar
    //check if conversation exists
    db.ref(`attendance`).once('value')
      .then((dataSnapShot) => {
        saved_events = []
        var data = JSON.stringify(dataSnapShot, null, 2)
        var data = JSON.parse(data)
        var keys = Object.keys(data)
        var concertgoers = []
        for(i=0;i<keys.length;i++){
          var email = data[keys[i]].user;
          var avatar = data[keys[i]].avatar;
          if(email==firebase.auth().currentUser.email){
            this.setState({
              currentAvatar: avatar
            })
          }
        }
        this.setState({
          users: concertgoers
        })
      })
      .catch((error) =>{
        console.log("Failed to fetch concertgoers: ", error)
      })

    //check if conversation exists
    db.ref(`chats/`).once('value')
      .then((dataSnapShot) => {
        saved_events = []
        var data = JSON.stringify(dataSnapShot, null, 2)
        var data = JSON.parse(data)
        var keys = Object.keys(data)
        for (i=0;i<keys.length;i++){
          if(keys[i]==chatIDpre.join('_')){
            // load conversation into state
            var conversation = data[keys[i]].messages
          }
        }
        this.setState({
          messages: conversation,
          conversation: true
        })
      })
      .catch((error) =>{
        console.log("Failed to fetch messages: ", error)
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
