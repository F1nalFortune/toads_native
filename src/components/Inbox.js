import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';
import LoadingScreen from './LoadingScreen';

export default class Inbox extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    //check if conversation exists
    db.ref(`chats/`).once('value')
      .then((dataSnapShot) => {
        saved_events = []
        var data = JSON.stringify(dataSnapShot, null, 2)
        var data = JSON.parse(data)
        var keys = Object.keys(data)
        var conversations = []
        for (i=0;i<keys.length;i++){
          var chat_id = keys[i]
          unique_id = keys[i].split("_")
          console.log("Unique Id: ", unique_id)
          console.log("User Id: ", userId)
          if(unique_id.includes(userId)){
            var conversation = data[keys[i]].messages
            var users = data[keys[i]].users
            var keys = Object.keys(users)
            for(i=0;i<keys.length;i++){
              if(keys[i]!=firebase.auth().currentUser.uid){
                conversation = {
                  [chat_id]:{
                    conversation: conversation,
                    avatar: users[keys[i]],
                    user: keys[i]
                  }
                }
              }
            }
            conversations.push(conversation)
          }
        }
        console.log(JSON.stringify(conversations, null,2))
        this.setState({
          conversations: conversations,
          loading: false
        })
      })
      .catch((error) =>{
        console.log("Failed to fetch messages: ", error)
      })
  }

  render() {
    const ListMessages = ({message}) => (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push('InboxMessage', {message})
        }}>
        <Image
          source={{uri: message[Object.keys(message)[0]].avatar}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 5
          }} />
        <Text>{message[Object.keys(message)[0]].user}</Text>
      </TouchableOpacity>
    );
    firebase.analytics().setCurrentScreen('inbox');
    if(this.state.loading){
      return <LoadingScreen />;
    } else {
      return (
        <ScrollView>
          {this.state.conversations.map(message => <ListMessages message={message} key={this.state.conversations.indexOf(message)}/>)}
        </ScrollView>
      )
    }
  }
}
