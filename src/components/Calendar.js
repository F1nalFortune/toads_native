import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
    Dimensions,
    Button
} from 'react-native';
import LoadingScreen from './LoadingScreen';
import GallerySwiper from "react-native-gallery-swiper";
import { SliderBox } from "react-native-image-slider-box";
import cio from 'cheerio-without-node-native';
import {useNetInfo} from "@react-native-community/netinfo";
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';



export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      items: [],
      isLoading: true
    }
  }

componentDidMount(){
    const savedShows = require('../shows/shows.json');
    console.log(JSON.stringify(savedShows, null, 2))
    var items = savedShows['events']
    var features = savedShows['events'][0]['slides']
    // var new_features = []
    // for(i=0;i<features.length;i++){
    //   var feature = {
    //     uri: features[i],
    //     dimensions: {width: Dimensions.get('window').width}
    //   }
    //   new_features.push(feature)
    // }
    // console.log(new_features)
    this.setState({
      items: items,
      isLoading: false,
      features: features
    })
    //READ VALUES FROM DATABASE
    // db.ref('events').once('value')
    //   .then((dataSnapShot) => {
    //     saved_shows = []
    //     dataSnapShot.forEach(function(childSnapshot) {
    //       // childData will be the actual contents of the child
    //       var childData = childSnapshot.val();
    //       saved_shows.push(childData)
    //     });
    //     console.log(JSON.stringify(saved_shows, null, 2))
    //     var items = saved_shows
    //     this.setState({
    //       items: items,
    //       isLoading: false
    //     })
    //     // console.log(this.state.items)
    //   })
      console.log("here")
  }

  render(){


    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1
        }}
      />
    );
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }

    return(
      <ScrollView>
        <View style={{height: 250}}>
          <SliderBox
            images={this.state.features}
            autoplay
            circleloop />

        </View>
        {this.state.items.map(item =>
          <View key={this.state.items.indexOf(item)}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this.props.navigation.navigate('Details', {item})}
            >
              <View style={styles.imgWrapper}>
                <Image style={styles.img} source={{uri: item.img}}/>
              </View>
              <View style = {styles.wrapper}>
                <View style={styles.dateWrapper}>
                  <Text style= {styles.date}>{item.date[0]}</Text>
                  <Text style= {styles.dateNumber}>{item.date[1]}</Text>
                  <ColoredLine color="green" />
                  <Text style= {styles.date}>{item.date[2]}</Text>
                </View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>{item.title}</Text>
                  {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}{"\n"}</Text> : <Text></Text>}
                  <Text style={styles.info}>{item.information[2]}</Text>
                  <Text style={styles.info}>{item.information[3]}</Text>
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={styles.info}>{item.information[4]}</Text>
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Details', {item})}
              >
                <Text>TICKETS & EVENT DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create ({
 touchable:{
   // justifyContent: 'center',
   // alignItems: 'center',
   borderTopColor: 'green',
   borderStyle: 'solid',
   borderTopWidth: 2,
 },
 wrapper: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'flex-start',
   flexWrap: 'wrap',
   // width: 100,
   paddingTop: 10
 },
 dateWrapper:{
   paddingTop: 10,
   width: '20%',
   marginLeft: 10,
   paddingRight: 10,
 },
 date:{
   height: 30,
   lineHeight: 30,
   textAlign: 'center',
   textTransform: 'uppercase',
   fontSize: 14,
   fontWeight: 'bold'
 },
 dateNumber:{
   height: 30,
   lineHeight: 30,
   textAlign: 'center',
   textTransform: 'uppercase',
   fontSize: 32
 },
 imgWrapper:{
   width: '90%'
 },
 img:{
   width: '100%',
   height: 200,
   marginTop: 10,
   marginLeft: '5%'
 },
 titleWrapper:{
   width: '65%'
 },
 title:{
   paddingTop: 5,
   fontWeight: 'bold',
   fontSize: 18
 },
 footer:{
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginVertical: 10
 },
 info:{

 },
 buttonContainer:{
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   paddingHorizontal: 10
 },
 button:{
   borderColor: 'green',
   borderRadius: 10,
   borderWidth: 1,
   borderStyle: 'solid',
   padding: 10,
   textTransform: 'uppercase',
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   margin: 10
 }
})
