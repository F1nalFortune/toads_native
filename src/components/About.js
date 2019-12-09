import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const width = '40%';
const height = '20%';
export default class About extends Component {
  render() {
    return (
    <ScrollView style={styles.background}>
      <View style={styles.imgWrapper}>
          <Image
            styles={{width: 50, height: 50}}
            source={require("../../assets/images/toads_banner.png")}/>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.wrapper}>
          Toad's Place has been hoppin' since 1975, establishing itself as one
          of the premier music halls in the country. Virtually every major
          touring act has appeared on Toad's stage in the past twenty years.
          {"\n"}{"\n"}
          Toad's place remains a favorite venue for many of the megastars when
          they wish to perform in a smaller, more intimate atmosphere where they
          can be closer to their fans. For this very reason, The Rolling Stones
          chose to kick off their 1989 "Steel Wheels" tour at Toad's Place!
          {"\n"}{"\n"}
          How has Toad's managed to stay on top for all of these years? It's
          simple... We at Toad's Place realize that everyone doesn't like the
          same kind of music! In any given month, Toad's features a broad
          spectrum of live performers, as well as some of the most talented DJs
          on the East Coast. Rock and Roll, Blues, Reggae, Techno... We have it
          all, from classic favorites to the most exciting new talent!
          {"\n"}{"\n"}
          Check out our calendar !!! There is something for everyone. If you are
          under 21, don't despair...come in and kick it with us on our All Ages nights.
          Toad's Place...where the legends play!
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 50
      }}>
        <Text style={styles.socialIcon}>
          <Icon
            onPress={() => Linking.openURL("https://www.facebook.com/toadsplaceofficial/")}
            name={'facebook-square'}
            size={40}
            style={styles.facebook}/>
        </Text>
        <Text style={styles.socialIcon}>
          <Icon
            onPress={() => Linking.openURL("https://www.instagram.com/toadsplace/")}
            name={'instagram'}
            size={40}
            style={styles.instagram}/>
        </Text>
        <Text style={styles.socialIcon}>
          <Icon
            onPress={() => Linking.openURL("https://twitter.com/toadsplace")}
            name={'twitter'}
            size={40}
            style={styles.twitter}/>
        </Text>
      </View>
      <View>
        <Text style={styles.toads}>Toad's Place</Text>
        <Text  style={styles.contact}>
          300 York St, New Haven, CT 06511{"\n"}
          203-624-8623{"\n"}
          toadsplac@aol.com
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("https://www.toadsplacemerch.com/")}>
          <Text style={{color:'black'}}>Official Merchandise</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  background:{
    backgroundColor: '#c0dfc066'
  },
  box:{
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3D1B0',
  },
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
  contact: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  facebook:{
    color: '#4968ad',
    marginHorizontal: 100
  },
  instagram:{
    color: 'black',
    marginHorizontal: 100
  },
  twitter:{
    color: '#49a1eb',
    marginHorizontal: 100
  },
  image: {
      width: 50,
      resizeMode: 'contain',
      height: 50
  },
  imgWrapper:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialTitle:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialIcon:{
    padding: 5
  },
  toads: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrapper:{
      padding: 15,
      fontSize: 16
  }
})
