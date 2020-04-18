import React from 'react'
import {
  Alert
} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: navigation.state.params.message[Object.keys(navigation.state.params.message)[0]].contactInfo.email,
      headerRight: <Icon
        style={{
          color:'#fff',
          padding: 10
         }}
        name={'info-circle'}
        size={20}
        onPress={()=>{
          var title = 'Contact Info'
          var contactInfo = navigation.state.params.message[Object.keys(navigation.state.params.message)[0]].contactInfo;
          var email = contactInfo.email;
          body = email;
          Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => {
                  console.log("OK pressed")
                }},
                { text: 'Block User', onPress: () => {
                  console.log("Block User")
                }}
            ],
            { cancelable: false },
          );
        }}/>,
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
    var message = this.props.navigation.state.params.message;
    db.ref(`users/${firebase.auth().currentUser.uid}`).once('value')
      .then((dataSnapShot) => {
        saved_events = []
        var data = JSON.stringify(dataSnapShot, null, 2)
        var data = JSON.parse(data)
        var data = data['info']
        try{
          var name = data.name
        }catch(e){
          var name = false
        }
        try{
          var avatar = data.avatar
        }catch(e){
          var avatar = false
        }

        this.setState({
          users: concertgoers,
          name: name,
          avatar: avatar
        })
      })
      .catch((error) =>{
        console.log("Failed to fetch concertgoers: ", error)
      })
    this.setState({
      saved_message: message,
      chat_id: Object.keys(message)[0],
      messages: message[Object.keys(message)[0]].conversation,
      conversation: true,
      currentAvatar: message[Object.keys(message)[0]].avatar
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
    return db.ref(`chats/${this.state.chat_id}`).update(updates);
  }

  render() {
    firebase.analytics().setCurrentScreen('chat');
    if(this.state.name && this.state.avatar){
      var user = {
        _id: firebase.auth().currentUser.uid,
        name: this.state.name,
        avatar: this.state.avatar
      }
    }else if(this.state.name && !this.state.avatar){
      var user = {
        _id: firebase.auth().currentUser.uid,
        name: this.state.name
      }
    }else if (!this.state.name && this.state.avatar){
      var user = {
        _id: firebase.auth().currentUser.uid,
        avatar: this.state.avatar
      }
    }else{
      var user = {
        _id: firebase.auth().currentUser.uid
      }
    }
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
