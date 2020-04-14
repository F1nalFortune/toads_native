import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet
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
            console.log(JSON.stringify(data[keys[i]]))
            var conversation = data[keys[i]].messages
            for(i=0;i<keys.length;i++){
              if(keys[i]!=firebase.auth().currentUser.uid){
                //grab avatar to display in inbox
                for(x=0;x<conversation.length;x++){
                  var id = conversation[x].user._id;
                  var user = conversation[x].user
                  var avatar = conversation[x].user.avatar ? conversation[x].user.avatar : false;
                  var name = conversation[x].user.name;
                  if(id!=firebase.auth().currentUser.uid){
                    var contactInfo = {
                      email: name,
                      avatar: avatar,
                      _id: id
                    }
                    break;
                  }
                }
              }
            }
            //add conversation
            current_conversation = {
              [chat_id]:{
                conversation: conversation,
                contactInfo: contactInfo
              }
            }
            conversations.push(current_conversation)
          }
        }
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
    firebase.analytics().setCurrentScreen('inbox');
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
    );
    const ListMessages = ({message}) => (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push('InboxMessage', {message})
          }}
          style={styles.container}>
          <Image
            source={{uri: message[Object.keys(message)[0]].contactInfo.avatar}}
            style={styles.avatar}/>
        <Text
          style={styles.text}>{message[Object.keys(message)[0]].contactInfo.email}</Text>
        </TouchableOpacity>
        <ColoredLine color="green" />
      </View>
    );
    if(this.state.loading){
      return <LoadingScreen />;
    } else {
      console.log(JSON.stringify(this.state.conversations, null, 2))
      return (
        <ScrollView>
          {this.state.conversations.map(message => <ListMessages message={message} key={this.state.conversations.indexOf(message)}/>)}
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  avatar:{
    width: 75,
    height: 75,
    borderRadius: 50
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  text:{
    paddingLeft: 15
  }
 })
