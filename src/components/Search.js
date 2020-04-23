import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Button,
  Alert,
  RefreshControl
} from 'react-native';
import LoadingScreen from './LoadingScreen';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      isLoading: false,
      items: []
    }
  }

  updateSearch = search => {
    uid = firebase.auth().currentUser.uid;
    this.setState({
      uid: uid,
      isLoading: true
    })
    search = search.toLowerCase()
    this.setState({ search });
    const fullDay = function(day) {
      switch (day) {
        case 'Fri': return "Friday";
        case 'Sat': return "Saturday";
        case 'Sun': return "Sunday";
        case 'Mon': return "Monday";
        case 'Tue': return "Tuesday";
        case 'Wed': return "Wednesday";
        case 'Thu': return "Thursday"
      }
    }
    const fullMonth = function(month){
      switch(month) {
        case 'Jan': return "January";
        case 'Feb': return "February";
        case 'Mar': return "March";
        case 'Apr': return "April";
        case 'May': return "May";
        case 'Jun': return "June";
        case 'Jul': return "July";
        case 'Aug': return "August";
        case 'Sep': return "September";
        case 'Oct': return "October";
        case 'Nov': return "November";
        case 'Dec': return "December"
      }
    }
    function myFunction(mystring, variable){
        values = ['presented by:', 'presents:', 'present:']
        string_length = mystring.length
        if (mystring.toLowerCase().includes(values[0])){
          var presenter = mystring.toLowerCase().split(values[0])
          presenter[0] = presenter[0].trim() + " " + values[0]
          var show = presenter[1]

          presenter = mystring.substring(0, presenter[0].length)
          show = mystring.substring(presenter.length+1, mystring.length)
          if(variable=='presenter'){
            return presenter
          }else if(variable=='show'){
            return show
          }
        }else if(mystring.toLowerCase().includes(values[1])){
          var presenter = mystring.toLowerCase().split(values[1])
          presenter[0] = presenter[0].trim() + " " + values[1]
          presenter = mystring.substring(0, presenter[0].length)
          // console.log(presenter)
          show = mystring.substring(presenter.length+1, mystring.length)
          // console.log(show)
          if(variable=='presenter'){
            return presenter
          }else if(variable=='show'){
            return show
          }
        }else if(mystring.toLowerCase().includes(values[2])){
          var presenter = mystring.toLowerCase().split(values[2])
          presenter[0] = presenter[0].trim() + " " + values[2]

          presenter = mystring.substring(0, presenter[0].length)
          show = mystring.substring(presenter.length+1, mystring.length)
          if(variable=='presenter'){
            return presenter
          }else if(variable=='show'){
            return show
          }
        }else{
          return false
        }
    }


    console.disableYellowBox = true;
    if(search!=''){
      db.ref('events').once('value')
        .then((dataSnapShotTwo) => {
          saved_shows = []
          dataSnapShotTwo.forEach(function(childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            saved_shows.push(childData)
          });
          var items = saved_shows
          console.log(JSON.stringify(items, null, 2))
          var matches = []
          for(i=0;i<items.length;i++){
            // find matches on search query or opening acts
            match_titles = []
            match_titles.push(items[i].title.toLowerCase()) // push title
            if(items[i].acts){
              for(x=0;x<items[i].acts.length;x++){
                match_titles.push(items[i].acts[x].toLowerCase()) // push opening acts
              }
            }
            var index = items.indexOf(items[i])
            items[i]['index'] = index
            if(myFunction(items[i].title, 'presenter')){
              var title = myFunction(items[i].title, 'show')
              var presenter = myFunction(items[i].title, 'presenter')
              items[i].title = title
              items[i].presenter = presenter
            }
            var features = items[0]['slides']
            match_flag = false
            for(y=0;y<match_titles.length;y++){
              if (match_titles[y].includes(search)){
                match_flag=true
              }
            }
            if(match_flag){
              matches.push(items[i])
            }
            this.setState({
              items: matches,
              isLoading: false,
              features: features
            })
          }
          this.setState({
            isLoading: false
          })
        })
    }else{
      this.setState({
        isLoading:false,
        items:[]
      })
    }
    query = {
      search: search,
      createdOn: new Date()
    }
    return db.ref('searches').push(query);
  };


  render(){
    firebase.analytics().setCurrentScreen('search');
    const { search } = this.state;
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1
        }}
      />
    );
    const ListShows = ({item}) => (<View         style={styles.touchable}>
      <TouchableOpacity
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

              {
                  item.presenter ?
                  <View>
                    <Text style={styles.subTitle}>
                      {item.presenter}
                    </Text>
                    <Text style={styles.title}>
                      {item.title}
                    </Text>
                  </View> :
                  <View>
                    <Text style={styles.title}>
                      {item.title}
                    </Text>
                  </View>
              }

            {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}{"\n"}</Text> : <Text></Text>}
            <Text style={styles.info}>{item.information[2]}</Text>
            <Text style={styles.info}>{item.information[3]}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.info}>{item.information[4]}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Details', {item})}
        >
          <Text style={styles.buttonTxt}>BUY TIX</Text>
        </TouchableOpacity>
      </View>
    </View>);
      return(
        <ScrollView
          style={{backgroundColor: '#d3e6d7'}}>
          <View>
            <SearchBar
              placeholder="Search for artists..."
              onChangeText={this.updateSearch}
              value={search}
              lightTheme={true}
              showLoading={this.state.isLoading}
              icon={{ type: 'font-awesome', name: 'search' }}
              onClearText={()=>{
                this.setState({items:[]})
              }}
            />
            <Text> Search for artists that are coming to the venue, or search
            for artists that you would like to see. </Text>
            {this.state.items ? this.state.items.map(item => <ListShows item={item} key={this.state.items.indexOf(item)}/>) :this.state.recommended.map(item => <ListShows item={item} key={this.state.recommended.indexOf(item)}/>)}
          </View>
        </ScrollView>
      )
  }


}




const styles = StyleSheet.create ({
 touchable:{
   // justifyContent: 'center',
   // alignItems: 'center',
   borderBottomColor: 'green',
   borderStyle: 'solid',
   borderBottomWidth: 2,
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
   width: '100%',
   flex: 1,
   alignItems: "center",
   justifyContent: 'center'
 },
 img:{
   width: '100%',
   height: 250,
   marginTop: 10,
   paddingBottom: 10,
   marginLeft: 10,
   marginRight: 10,
   // marginTop: 10,
   // marginLeft: '5%',
   borderRadius: 5,
   resizeMode: 'contain'
 },
 subTitle:{
   fontSize: 16
 },
 titleWrapper:{
   width: '65%'
 },
 title:{
   paddingTop: 5,
   fontWeight: 'bold',
   fontSize: 24
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
   flexDirection:'row',
   justifyContent: 'center',
   flex:1,
   alignItems: 'center',
   width: '75%',
   marginLeft: 'auto',
   marginRight: 'auto'
 },
 button:{
   borderColor: 'green',
   backgroundColor: 'darkgreen',
   borderRadius: 10,
   borderWidth: 1,
   borderStyle: 'solid',
   padding: 10,
   textTransform: 'uppercase',
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   margin: 10,
   width: '75%'
 },
 buttonTxt:{
   color: 'white',
   fontWeight: 'bold'
 },
 tabbar:{
   flexDirection: 'row',
   paddingLeft:20,
   paddingRight: 20
 },
 tabBtn:{
   padding:10,
   fontWeight: 'bold',
   fontSize: 16
 },
 tabBtnActive: {
   width: '50%',
   textAlign: 'center',
   justifyContent: 'center',
   alignItems: 'center',
   fontWeight: 'bold',
   fontSize: 16,
   borderBottomColor: 'green',
   borderBottomWidth: 1,
 },
 tabBtnInactive: {
   width: '50%',
   textAlign: 'center',
   justifyContent: 'center',
   alignItems: 'center',
   fontWeight: 'bold',
   fontSize: 16
 },
})
