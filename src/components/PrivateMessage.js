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
        text: `Send a message to start the conversation.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'The Toad',
          avatar: 'https://firebasestorage.googleapis.com/v0/b/toads-react.appspot.com/o/avatars%2Ftoads_banner.png?alt=media&token=ea10b431-f2e3-4d20-8247-6be492bab1fc',
        },
      },
    ],
    user:{
      _id: firebase.auth().currentUser.uid
    }
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: navigation.state.params.user.name ? navigation.state.params.user.name : navigation.state.params.user.email,
      headerStyle: {
        backgroundColor: "#000000cc",
        opacity: .8
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
        textShadowColor: "#66ff66",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        shadowOpacity: .58,
        textAlign: 'center',
        fontFamily: "Merriweather-Bold",
        textTransform: 'uppercase',
        fontSize: 24,
        padding: 10
      }
    };
  };

  componentDidMount() {
    // create unique chat id
    var user = this.props.navigation.state.params.user;
    var currentUser = this.props.navigation.state.params.currentUser;
    const chatterID = firebase.auth().currentUser.uid;
    const chateeID = user.userId;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    this.setState({
      chat_id: chatIDpre.join('_')
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
    // create user object
    if(currentUser.email && currentUser.avatar){
      this.setState({
        user:{
          _id: firebase.auth().currentUser.uid,
          name: this.props.navigation.state.params.currentUser.email,
          avatar: this.props.navigation.state.params.currentUser.avatar
        }
      })
    }else if (!currentUser.email && currentUser.avatar){
      this.setState({
        user:{
          _id: firebase.auth().currentUser.uid,
          avatar: this.props.navigation.state.params.currentUser.avatar
        }
      })
    }else if (currentUser.email && !currentUser.avatar){
      this.setState({
        user:{
          _id: firebase.auth().currentUser.uid,
          name: this.props.navigation.state.params.currentUser.email
        }
      })
    }else{
      this.setState({
        user:{
          _id: firebase.auth().currentUser.uid
        }
      })
    }
  }
  onSend(messages = []) {
    // save messages into database
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/messages'] = this.state.messages;
    return db.ref(`chats/${this.state.chat_id}`).update(updates);
  }
  render() {
    firebase.analytics().setCurrentScreen('chat');
    const { user } = this.state;
    return (
      <GiftedChat
        isTyping={true}
        alwaysShowSend={true}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={user}
      />
    )
  }
}
