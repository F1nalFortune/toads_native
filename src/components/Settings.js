import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { db } from '../../Firebase';



export default class Settings extends Component {
  state = {
    currentUser: null,
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    //Pull Genre Prefs from Database
    var user_id = firebase.auth().currentUser.uid
  }

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
  }
  render() {
    firebase.analytics().setCurrentScreen('settings');
    const ColoredLine = ({ color, width, pad }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: width,
          paddingTop: pad,
          marginBottom: pad
        }}
      />
    );
    const { currentUser } = this.state

    return (
    <ScrollView>
      <View style={styles.container}>
        <ColoredLine color="grey" width="100%" pad={5}/>
        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => this.props.navigation.navigate('Profile')}>
          <View style={styles.menuTabText}>
            <Text>
              Profile
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Icon
               style={styles.menuTabIcon}
              name={'chevron-right'}
              size={20}/>
          </View>
        </TouchableOpacity>
        <ColoredLine color="grey" width="100%" pad={5}/>

        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => this.props.navigation.navigate('Promotions')}>
          <View style={styles.menuTabText}>
            <Text>
              Promotions
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Icon
               style={styles.menuTabIcon}
              name={'chevron-right'}
              size={20}/>
          </View>
        </TouchableOpacity>
        <ColoredLine color="grey" width="100%" pad={5}/>

        <TouchableOpacity
          style={[styles.menuTabs, {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
          <View style={styles.menuTabText}>
            <Text>
              Use My Current Location
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Switch
              onValueChange= {this.toggle_promotions}
              value = {this.state.promotions}
              trackColor = {{true: '#008000b3'}}/>
          </View>
        </TouchableOpacity>

        <ColoredLine color="grey" width="100%" pad={5}/>

        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => {
            var url = "http://www.toadsplace.com/wp/venue_info"
            this.props.navigation.navigate('SettingsBrowser', {url})
          }}
        >
          <View style={styles.menuTabText}>
            <Text>
              Help
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Icon
               style={styles.menuTabIcon}
              name={'chevron-right'}
              size={20}/>
          </View>
        </TouchableOpacity>

        <ColoredLine color="grey" width="100%" pad={5}/>


        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => {
            var url = "https://toadsdanceparty.com/contact"
            this.props.navigation.navigate('SettingsBrowser', {url})
          }}
        >
          <View style={styles.menuTabText}>
            <Text>
              Contact Us
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Icon
               style={styles.menuTabIcon}
              name={'chevron-right'}
              size={20}/>
          </View>
        </TouchableOpacity>

        <ColoredLine color="grey" width="100%" pad={5}/>

        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => {
            var url = "https://toadsdanceparty.com/privacypolicy"
            this.props.navigation.navigate('SettingsBrowser', {url})
          }}
        >
          <View style={styles.menuTabText}>
            <Text>
              Privacy
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Icon
               style={styles.menuTabIcon}
              name={'chevron-right'}
              size={20}/>
          </View>
        </TouchableOpacity>

        <ColoredLine color="grey" width="100%" pad={5}/>

        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => {
            var url ="https://toadsdanceparty.com/terms"
            this.props.navigation.navigate('SettingsBrowser', {url})}
          }
        >
          <View style={styles.menuTabText}>
            <Text>
              Terms of Service
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Icon
               style={styles.menuTabIcon}
              name={'chevron-right'}
              size={20}/>
          </View>
        </TouchableOpacity>

        <ColoredLine color="grey" width="100%" pad={5}/>

        <TouchableOpacity
          style={styles.menuTabs}>
          <View style={styles.menuTabText}>
            <Text>
              Version
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Text numberOfLines={1}>
            1.2.1
            </Text>
          </View>
        </TouchableOpacity>

        <ColoredLine color="grey" width="100%" pad={5}/>
        <View style={styles.bottomFooter}>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.signOutUser()
              }}
            >
              <Text>Signout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  bottomFooter:{
    marginTop: 25
  },
  container:{
    flex: 1,
    padding: 10
  },
  currentUser:{
    textAlign: 'right'
  },
  genre: {
    fontSize: 18,
    padding: 5
  },
  switchContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15
  },
  menuTabs:{
    flexDirection: 'row',
    padding: 20
  },
  menuTabText:{
    flexDirection: 'row',
    width: '80%',
    fontSize: 18
  },
  menuTabIcon:{
    flex: 1,
    zIndex: 100000,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '20%'
  }
})
