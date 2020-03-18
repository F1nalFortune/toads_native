import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


// AMENITIES
// <View style={{flexDirection:'row'}}>
//   {
//     item.amenities[0].parking ?
//     <View style={{textAlign: 'justify'}}>
//       <Icon name={'parking'} size={30} style={{color: 'green'}}/>
//       <Text>Parking</Text>
//     </View> :
//     <View></View>
//   }
//   {
//     item.amenities[0].pets ?
//     <View>
//       <Icon name={'paw'} size={30} style={{color: 'green'}}/>
//       <Text>Pets</Text>
//     </View>
//     : <View></View>
//   }
//   {
//     item.amenities[0]['non-smoking rooms'] ?
//     <View>
//       <Icon name={'smoking-ban'} size={30} style={{color: 'green'}}/>
//       <Text>Non-smoking{"\n"}Rooms</Text>
//     </View>:
//     <View></View>}
//   {
//     item.amenities[0]['fitness center'] ?
//     <View>
//       <Icon name={'dumbbell'} size={30} style={{color: 'green'}}/>
//       <Text>Fitness{"\n"}Center</Text>
//     </View>:
//     <View></View>}
//   {
//     item.amenities[0]['bar'] ?
//     <View>
//       <Icon name={'glass-martini-alt'} size={30} style={{color: 'green'}}/>
//       <Text>Bar</Text>
//     </View>:
//     <View></View>}
//   {
//     item.amenities[0]['tea/coffee'] ?
//     <View>
//       <Icon name={'mug-hot'} size={30} style={{color: 'green'}}/>
//       <Text> Coffee / Tea </Text>
//     </View> :
//     <View></View>}
//   {
//     item.amenities[0]['pool']?
//     <View>
//       <Icon name={'swimmer'} size={30} style={{color: 'green'}}/>
//       <Text>Pool</Text>
//     </View> :
//     <View></View>}
// </View>

export default class Hotels extends Component {




  render() {
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: '100%',
          paddingTop: 10,
          marginBottom: 10
        }}
      />
    );
    var hotels = require("../../../assets/hotels.json")
    hotels = hotels['hotels']
    console.log(hotels[0]['amenities'][0]['parking'])
    // console.log(hotels[0]['amenities']['parking'])
    var images = {
      'Courtyard by Marriott New Haven at Yale': require('../../../assets/images/Hotels/courtyard_yale.jpg'),
      'Omni New Haven Hotel at Yale': require('../../../assets/images/Hotels/omni_yale.jpg'),
      'La Quinta Inn & Suites by Wyndham New Haven': require("../../../assets/images/Hotels/quinta_nh.jpg")
    }
    return (
    <ScrollView>
      <View>
      {hotels.map(item =>
        <View
          key={hotels.indexOf(item)}>
          <Text style={styles.hotelTitle}>
            {item.title}
          </Text>
          <Text style={styles.hotelAddress}>
            {item.address}
          </Text>
          <Text style={styles.hotelDistance}>
            {item.distance} miles away
          </Text>
          <View style={styles.infoContainer}>
              <Image
              style={{width: Dimensions.get('window').width, height: 250}}
              resizeMode={'contain'}   /* <= changed  */
              source={images[item.title]}/>
            <Text style={{width: '50%'}}>
              {item.distance} miles away
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => Linking.openURL(item.phone)}>
              <Text style={styles.btn}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => Linking.openURL(item.website)}>
              <Text style={styles.btn}>Website</Text>
            </TouchableOpacity>
          </View>
          <ColoredLine color="green" />
        </View>
      )}
      </View>
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  btn:{
    color: "#fff",
    textShadowColor: "#66ff66",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    textTransform: 'uppercase',
    padding:10
  },
  buttonRow:{
    flexDirection:'row',
    margin:10
  },
  hotelAddress:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom:2
  },
  hotelDistance:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom:5
  },
  hotelTitle:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    fontSize: 18,
    paddingTop:10,
    paddingBottom:2
  },
  infoContainer:{
    flexDirection: 'row'
  },
  item:{
    backgroundColor: "green",
    width: '33%', // is 50% of container width
    borderColor: 'green',
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    textTransform: 'uppercase',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Merriweather-Bold",
    color: 'white',
    marginLeft: 5,
    marginRight: 5
  },
  title:{
    paddingLeft:10,
    paddingTop:10,
    fontSize: 24,
    color: 'grey',
    fontWeight: 'bold',

  },
  subtitle:{
    fontSize: 16,
    fontFamily: "Merriweather-Regular",
    lineHeight: 30,
  }
})
