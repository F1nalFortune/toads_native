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
import GallerySwiper from "react-native-gallery-swiper";
import { SliderBox } from "react-native-image-slider-box";
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';




export default class Calendar extends Component {
  state = {
  "items": [
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/bearweb.jpg",
      "information": [
        "ADVANCE: $30.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Sat Mar 14 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "BEAR GRILLZ & PHISO",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "14",
        "Sat"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "dubstep"
      ],
      "index": 0,
      "presenter": "AZ Presents, Connecticut Live & Triple Threat Productions Present:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/03/buckweb.jpg",
      "information": [
        "ADVANCE: $n/a",
        "DAY OF SHOW: $n/a",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 10:00",
        "Show is 18+",
        "[ GET TIX ]"
      ],
      "datetime": "Sun Mar 15 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "SKIP MARLEY",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "15",
        "Sun"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "reggae"
      ],
      "index": 1,
      "presenter": "Hot 93.7 Reggae Riddimz Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/01/rodwaveweb.jpg",
      "information": [
        "ADVANCE: $32.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is 16+",
        "[ GET TIX ]"
      ],
      "datetime": "Thu Mar 19 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "ROD WAVE",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "19",
        "Thu"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "hip_hop",
        "rap"
      ],
      "index": 2,
      "presenter": "Big Mike the Ruler Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/pardisonweb.jpg",
      "information": [
        "ADVANCE: $18.00",
        "DAY OF SHOW: $20.00",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 9:00",
        "Show is 16+",
        "[ GET TIX ]"
      ],
      "datetime": "Sun Mar 22 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "PARDISON FONTAINE",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "22",
        "Sun"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "hip_hop",
        "rap"
      ],
      "index": 3
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2019/11/lilmoseyweb.jpg",
      "information": [
        "ADVANCE: $25.00",
        "DAY OF SHOW: $30.00",
        "DOORS OPEN @ 6:30",
        "SHOW STARTS @ 7:30",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Sun Mar 29 2020 18:30:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "Due to circumstances outside of our control, we regret to inform you that Lil Mosey: Certified Hitmaker Tour has been postponed until further notice. Hang on to your tickets, we'll email you as soon as a new date is announced."
      ],
      "title": " LIL MOSEY",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "29",
        "Sun"
      ],
      "year": 2020,
      "genre": [
        "hip_hop",
        "rap"
      ],
      "index": 4,
      "presenter": "Live Nation Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2018/04/zachdeputyweb.jpg",
      "information": [
        "ADVANCE: $17.00",
        "DAY OF SHOW: $20.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Fri Apr 03 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "ZACH DEPUTY",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Apr",
        "3",
        "Fri"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "acoustic",
        "funk",
        "reggae"
      ],
      "index": 5
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/fettyweb.jpg",
      "information": [
        "ADVANCE: $25.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is 16+",
        "[ GET TIX ]"
      ],
      "datetime": "Tue Apr 07 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "Due to circumstances outside of our control, we regret to inform you that Fetty Wap at Toad's Place has been postponed until further notice.Hang on to your tickets, we'll email you as soon as a new date is announced."
      ],
      "title": "FETTY WAP",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Apr",
        "7",
        "Tue"
      ],
      "year": 2020,
      "genre": [
        "hip_hop",
        "rap",
        "r_n_b"
      ],
      "index": 6,
      "presenter": "Live Nation Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2019/04/wybcxlogo.jpg",
      "information": [
        "ADVANCE: $5.00",
        "DAY OF SHOW: $5.00",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 8:30",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Fri Apr 10 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been cancelled.Refunds will be issued at point of purchase."
      ],
      "title": " YALE ANTE-FLING 2020 feat. JAPANESE BREAKFAST & ARMANI WHITE",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Apr",
        "10",
        "Fri"
      ],
      "year": 2020,
      "starInfo": [
        "**CANCELLED**"
      ],
      "genre": [
        "dance"
      ],
      "index": 7,
      "presenter": "WYBCx Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/03/caspaweb.jpg",
      "information": [
        "ADVANCE: $30.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Fri Apr 24 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "Stubbs",
        "Abomnabl",
        "Foreshadow"
      ],
      "title": "CASPA & BRIGHTSIDE",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Apr",
        "24",
        "Fri"
      ],
      "year": 2020,
      "genre": [
        "dubstep",
        "emo"
      ],
      "index": 8,
      "presenter": "AZ Presents, Connecticut Live & Triple Threat Productions Present:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/movementsweb.jpg",
      "information": [
        "ADVANCE: $20.00",
        "DAY OF SHOW: $25.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Sat May 09 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "Teenage Wrist",
        "Queen of Jeans"
      ],
      "title": "MOVEMENTS",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "May",
        "9",
        "Sat"
      ],
      "year": 2020,
      "genre": [
        "emo"
      ],
      "index": 9
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/01/irationweb.jpg",
      "information": [
        "ADVANCE: $25.00",
        "DAY OF SHOW: $30.00",
        "DOORS OPEN @ 6:00",
        "SHOW STARTS @ 6:30",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Wed May 13 2020 18:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "IRATION",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "May",
        "13",
        "Wed"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "reggae"
      ],
      "index": 10
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2019/11/aaweb.jpg",
      "information": [
        "ADVANCE: $n/a",
        "DAY OF SHOW: $n/a",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Sat May 30 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        ""
      ],
      "title": "ANGELS & AIRWAVES - **SOLD OUT**",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "May",
        "30",
        "Sat"
      ],
      "year": 2020,
      "genre": [
        "alternative_rock"
      ],
      "index": 11
    },
    {
      "subtitle": [
        "=LOVE IS NOT DYING TOUR="
      ],
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/jeremyzuckerweb.jpg",
      "information": [
        "ADVANCE: $22.00",
        "DAY OF SHOW: $27.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "title": "JEREMY ZUCKER",
      "date": [
        "Jun",
        "13",
        "Sat"
      ],
      "acts": [
        "cehryl"
      ],
      "year": 2020,
      "infoLinks": [
        {
          "link": "HERE!",
          "text": "**A limited amount of Meet & Greet Packages are available ",
          "href": "https://www.etix.com/ticket/p/4648667/live-nation-presentsjeremy-zucker-love-is-not-dying-tour-new-haven-toads-place-of-new-haven"
        }
      ],
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "genre": [
        "hip_hop",
        "indie"
      ],
      "datetime": "Sat Jun 13 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "index": 12,
      "presenter": "Live Nation Presents:"
    }
  ],
  "isLoading": false,
  "tab": "all",
  "search": "",
  "uid": "YDx3hopOJHcudUbwVx1vlyxokPH2",
  "genrePrefs": [
    "hip_hop",
    "dubstep",
    "rap"
  ],
  "features": [
    "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
    "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
    "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
    "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
    "http://toadsplace.com/2012/slide_images/index_bear.jpg",
    "http://toadsplace.com/2012/slide_images/index_movements.jpg"
  ],
  "recommended": [
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/bearweb.jpg",
      "information": [
        "ADVANCE: $30.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Sat Mar 14 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "BEAR GRILLZ & PHISO",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "14",
        "Sat"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "dubstep"
      ],
      "index": 0,
      "presenter": "AZ Presents, Connecticut Live & Triple Threat Productions Present:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/01/rodwaveweb.jpg",
      "information": [
        "ADVANCE: $32.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is 16+",
        "[ GET TIX ]"
      ],
      "datetime": "Thu Mar 19 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "ROD WAVE",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "19",
        "Thu"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "hip_hop",
        "rap"
      ],
      "index": 2,
      "presenter": "Big Mike the Ruler Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/pardisonweb.jpg",
      "information": [
        "ADVANCE: $18.00",
        "DAY OF SHOW: $20.00",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 9:00",
        "Show is 16+",
        "[ GET TIX ]"
      ],
      "datetime": "Sun Mar 22 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "This show has been postponed.New date TBA.",
        "All tickets for this event will be honored on the new date."
      ],
      "title": "PARDISON FONTAINE",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "22",
        "Sun"
      ],
      "year": 2020,
      "starInfo": [
        "**POSTPONED**"
      ],
      "genre": [
        "hip_hop",
        "rap"
      ],
      "index": 3
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2019/11/lilmoseyweb.jpg",
      "information": [
        "ADVANCE: $25.00",
        "DAY OF SHOW: $30.00",
        "DOORS OPEN @ 6:30",
        "SHOW STARTS @ 7:30",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Sun Mar 29 2020 18:30:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "Due to circumstances outside of our control, we regret to inform you that Lil Mosey: Certified Hitmaker Tour has been postponed until further notice. Hang on to your tickets, we'll email you as soon as a new date is announced."
      ],
      "title": " LIL MOSEY",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Mar",
        "29",
        "Sun"
      ],
      "year": 2020,
      "genre": [
        "hip_hop",
        "rap"
      ],
      "index": 4,
      "presenter": "Live Nation Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/fettyweb.jpg",
      "information": [
        "ADVANCE: $25.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is 16+",
        "[ GET TIX ]"
      ],
      "datetime": "Tue Apr 07 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "Due to circumstances outside of our control, we regret to inform you that Fetty Wap at Toad's Place has been postponed until further notice.Hang on to your tickets, we'll email you as soon as a new date is announced."
      ],
      "title": "FETTY WAP",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Apr",
        "7",
        "Tue"
      ],
      "year": 2020,
      "genre": [
        "hip_hop",
        "rap",
        "r_n_b"
      ],
      "index": 6,
      "presenter": "Live Nation Presents:"
    },
    {
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/03/caspaweb.jpg",
      "information": [
        "ADVANCE: $30.00",
        "DAY OF SHOW: $35.00",
        "DOORS OPEN @ 8:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "datetime": "Fri Apr 24 2020 20:00:00 GMT-0400 (Eastern Daylight Time)",
      "acts": [
        "Stubbs",
        "Abomnabl",
        "Foreshadow"
      ],
      "title": "CASPA & BRIGHTSIDE",
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "date": [
        "Apr",
        "24",
        "Fri"
      ],
      "year": 2020,
      "genre": [
        "dubstep",
        "emo"
      ],
      "index": 8,
      "presenter": "AZ Presents, Connecticut Live & Triple Threat Productions Present:"
    },
    {
      "subtitle": [
        "=LOVE IS NOT DYING TOUR="
      ],
      "ticket": "http://www.etix.com/ticket/v/677/toads-place-of-new-haven",
      "img": "http://www.toadsplace.com/wp/wp-content/uploads/2020/02/jeremyzuckerweb.jpg",
      "information": [
        "ADVANCE: $22.00",
        "DAY OF SHOW: $27.00",
        "DOORS OPEN @ 7:00",
        "SHOW STARTS @ 8:00",
        "Show is All Ages",
        "[ GET TIX ]"
      ],
      "title": "JEREMY ZUCKER",
      "date": [
        "Jun",
        "13",
        "Sat"
      ],
      "acts": [
        "cehryl"
      ],
      "year": 2020,
      "infoLinks": [
        {
          "link": "HERE!",
          "text": "**A limited amount of Meet & Greet Packages are available ",
          "href": "https://www.etix.com/ticket/p/4648667/live-nation-presentsjeremy-zucker-love-is-not-dying-tour-new-haven-toads-place-of-new-haven"
        }
      ],
      "slides": [
        "http://toadsplace.com/2012/slide_images/index_jeremyzucker.jpg",
        "http://toadsplace.com/2012/slide_images/index_rodwave.jpg",
        "http://toadsplace.com/2012/slide_images/index_caspa.jpg",
        "http://toadsplace.com/2012/slide_images/index_fettywap.jpg",
        "http://toadsplace.com/2012/slide_images/index_bear.jpg",
        "http://toadsplace.com/2012/slide_images/index_movements.jpg"
      ],
      "genre": [
        "hip_hop",
        "indie"
      ],
      "datetime": "Sat Jun 13 2020 19:00:00 GMT-0400 (Eastern Daylight Time)",
      "index": 12,
      "presenter": "Live Nation Presents:"
    }
  ]
}
  // constructor(props) {
  //   super(props);
  //   this.unsubscribe = null;
  //   this.state = {
  //     items: [],
  //     isLoading: true,
  //     tab: 'all',
  //     search: ''
  //   }
  // }

  // async componentDidMount() {
  //   const fullDay = function(day) {
  //     switch (day) {
  //       case 'Fri': return "Friday";
  //       case 'Sat': return "Saturday";
  //       case 'Sun': return "Sunday";
  //       case 'Mon': return "Monday";
  //       case 'Tue': return "Tuesday";
  //       case 'Wed': return "Wednesday";
  //       case 'Thu': return "Thursday"
  //     }
  //   }
  //   const fullMonth = function(month){
  //     switch(month) {
  //       case 'Jan': return "January";
  //       case 'Feb': return "February";
  //       case 'Mar': return "March";
  //       case 'Apr': return "April";
  //       case 'May': return "May";
  //       case 'Jun': return "June";
  //       case 'Jul': return "July";
  //       case 'Aug': return "August";
  //       case 'Sep': return "September";
  //       case 'Oct': return "October";
  //       case 'Nov': return "November";
  //       case 'Dec': return "December"
  //     }
  //   }
  //   function myFunction(mystring, variable){
  //       values = ['presented by:', 'presents:', 'present:']
  //       string_length = mystring.length
  //       if (mystring.toLowerCase().includes(values[0])){
  //         var presenter = mystring.toLowerCase().split(values[0])
  //         presenter[0] = presenter[0].trim() + " " + values[0]
  //         var show = presenter[1]
  //
  //         presenter = mystring.substring(0, presenter[0].length)
  //         show = mystring.substring(presenter.length+1, mystring.length)
  //         if(variable=='presenter'){
  //           return presenter
  //         }else if(variable=='show'){
  //           return show
  //         }
  //       }else if(mystring.toLowerCase().includes(values[1])){
  //         var presenter = mystring.toLowerCase().split(values[1])
  //         presenter[0] = presenter[0].trim() + " " + values[1]
  //         presenter = mystring.substring(0, presenter[0].length)
  //         // console.log(presenter)
  //         show = mystring.substring(presenter.length+1, mystring.length)
  //         // console.log(show)
  //         if(variable=='presenter'){
  //           return presenter
  //         }else if(variable=='show'){
  //           return show
  //         }
  //       }else if(mystring.toLowerCase().includes(values[2])){
  //         var presenter = mystring.toLowerCase().split(values[2])
  //         presenter[0] = presenter[0].trim() + " " + values[2]
  //
  //         presenter = mystring.substring(0, presenter[0].length)
  //         show = mystring.substring(presenter.length+1, mystring.length)
  //         if(variable=='presenter'){
  //           return presenter
  //         }else if(variable=='show'){
  //           return show
  //         }
  //       }else{
  //         return false
  //       }
  //   }
  //   this.checkPermission();
  //   this.createNotificationListeners();
  //   uid = firebase.auth().currentUser.uid;
  //   this.setState({
  //     uid: uid
  //   })
  //   console.disableYellowBox = true;
  //   await db.ref(`users/${uid}/genrePref`).once('value')
  //     .then((dataSnapShot) => {
  //       var string = JSON.stringify(dataSnapShot, null, 2)
  //       try{
  //         var object = JSON.parse(string)
  //         var genres = Object.keys(object)
  //         var preferences = Object.values(object)
  //         genrePrefs = []
  //         for (i=0;i<preferences.length;i++){
  //           if(preferences[i]){
  //             genrePrefs.push(genres[i])
  //           }
  //         }
  //         // console.log(JSON.stringify(genrePrefs, null, 2))
  //         this.setState({genrePrefs: genrePrefs})
  //       }catch(e){
  //         console.log("Error: ", e)
  //         this.setState({genrePrefs: false})
  //       }
  //       db.ref('events').once('value')
  //         .then((dataSnapShotTwo) => {
  //           saved_shows = []
  //           dataSnapShotTwo.forEach(function(childSnapshot) {
  //             // childData will be the actual contents of the child
  //             var childData = childSnapshot.val();
  //             saved_shows.push(childData)
  //           });
  //           var items = saved_shows
  //           var matches = []
  //           for(i=0;i<items.length;i++){
  //             var index = items.indexOf(items[i])
  //             items[i]['index'] = index
  //             if(myFunction(items[i].title, 'presenter')){
  //               var title = myFunction(items[i].title, 'show')
  //               var presenter = myFunction(items[i].title, 'presenter')
  //               items[i].title = title
  //               items[i].presenter = presenter
  //             }
  //             //find events with user genre preference
  //             var genres = items[i]['genre']
  //             genres = Object.values(genres)
  //             try{
  //               var match = this.state.genrePrefs.some(r=> genres.includes(r))
  //               if(match){
  //                 matches.push(items[i])
  //               }
  //               var features = items[0]['slides']
  //               this.setState({
  //                 items: items,
  //                 isLoading: false,
  //                 features: features,
  //                 recommended: matches,
  //                 tab: 'all'
  //               })
  //             }catch(e){
  //               console.log("Error: ", e)
  //               var features = items[0]['slides']
  //               this.setState({
  //                 items: items,
  //                 isLoading: false,
  //                 features: features,
  //                 recommended: false,
  //                 tab: 'all'
  //               })
  //             }
  //           }
  //           // console.log("Genre Preferences")
  //           // console.log(JSON.stringify(this.state.genrePrefs, null, 2))
  //           // console.log("Matched Shows")
  //           // console.log(JSON.stringify(matches, null, 2))
  //         })
  //     })
  //   }

//Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {

    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        var app_location = 'foreground'
        const { title, body } = notification;
        const {item} = notification._data;
        // console.log("Item : ", item)
        var parsed_item = JSON.parse(item)
        var show = parsed_item['title']
        var date = parsed_item['datetime']

        // console.log("Show: ", show)
        // console.log("Date: ", date)
        var appData = {
          show: show,
          date: date,
          location: app_location,
          opened: false
        }
        var result = this.writeNotifications(uid, appData)
        // console.log(JSON.stringify(item, null, 2))
        this.showAlert(
          title,
          body,
          item,
          app_location,
          result.newPostKey,
          result.uid
        );
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        var app_location = 'background'
        const { title, body } = notificationOpen.notification;
        const {item} = notificationOpen.notification._data;
        // console.log("Item : ", item)
        var parsed_item = JSON.parse(item)
        var show = parsed_item['title']
        var date = parsed_item['datetime']
        //
        // console.log("Show: ", show)
        // console.log("Date: ", date)
        var appData = {
          show: show,
          date: date,
          location: app_location,
          opened: false
        }
        var result = this.writeNotifications(uid, appData)
        this.showAlert(
          title,
          body,
          item,
          app_location,
          result.newPostKey,
          result.uid
        );
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        var app_location = 'closed'
        const { title, body } = notificationOpen.notification;
        const {item} = notificationOpen.notification._data;
        // console.log("Item : ", item)
        var parsed_item = JSON.parse(item)
        var show = parsed_item['title']
        var date = parsed_item['datetime']
        //
        // console.log("Show: ", show)
        // console.log("Date: ", date)
        var appData = {
          show: show,
          date: date,
          location: app_location,
          opened: false
        }
        var result = this.writeNotifications(uid, appData)
        // console.log(JSON.stringify(item, null, 2))
        this.showAlert(
          title,
          body,
          item,
          app_location,
          result.newPostKey,
          result.uid
        );
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log("Data only payload. Notification clicked, app in background")
      // console.log("Message: ", JSON.stringify(message, null, 2))
      var app_location = 'foreground'
      const {item} = message._data;

      // console.log("Item: ", JSON.stringify(item, null, 2))
      var parsed_item = JSON.parse(item);
      const title = parsed_item.title;
      const body = message._data.message;
      var show = parsed_item['title']
      var date = parsed_item['datetime']

      var appData = {
        show: show,
        date: date,
        location: app_location,
        opened: false
      }
      var result = this.writeNotifications(uid, appData)
      // console.log(JSON.stringify(item, null, 2))
      this.showAlert(
        title,
        body,
        item,
        app_location,
        result.newPostKey,
        result.uid
      );
    });
  }


  showAlert(title, body, item, app_location, openedKey, uid) {
    if(item!=undefined){
      item = JSON.parse(item)
      this.props.navigation.navigate('Details', {item})
    }
    // console.log(JSON.stringify(item, null, 2))
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => {
            var updates = {};
            updates[`/notifications/${openedKey}`] = {
              opened: true,
              show: item['title'],
              date: item['datetime'],
              location: app_location
            }
            return db.ref('users/' + uid).update(updates);
          }},
      ],
      { cancelable: false },
    );
  }
  writeNotifications(uid, appData) {
    // A post entry.
    // appData = {
    //   show: 'show',
    //   date: 'date',
    //   location: 'foreround/background/closed',
    //   opened: true
    // }
    // Get a key for a new Post.
    var newPostKey = db.ref('users/' + uid).child('notifications').push().key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};


    updates['/notifications/' + newPostKey] = appData;
    // console.log("Updates: ")
    // console.log(JSON.stringify(updates, null, 2))
    db.ref('users/' + uid).update(updates);

    return {
      newPostKey: newPostKey,
      uid: uid
    };
  }

    //1
  async checkPermission() {
    console.log("Check Permission!")
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }


  async getToken() {
    await firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        console.log("Get Token Success!")
        if (fcmToken) {
          userId = firebase.auth().currentUser.uid;
          if (userId) {
            //search if currents user already exists
            var object = JSON.stringify(firebase.auth().currentUser, null, 2)
            var parsedObject = JSON.parse(object)
            var xyz = parsedObject['refreshToken']
            db
              .ref("users/" + userId)
              .once('value')
              .then((dataSnapShot) => {
                var user_data = dataSnapShot
                user_data = JSON.parse(JSON.stringify(dataSnapShot, null, 2))
                // console.log(user_data)
                if(user_data == null){
                  db.ref('users/' + userId).set({
                    token: fcmToken,
                    refreshToken: xyz,
                    email: firebase.auth().currentUser.email,
                    created_at: new Date(),
                    genrePref:{
                      acoustic: false,
                      alternative: false,
                      alternative_rock: false,
                      classic_rock: false,
                      american_rock: false,
                      comedy: false,
                      dance: false,
                      dubstep: false,
                      emo: false,
                      hip_hop: false,
                      funk: false,
                      indie: false,
                      metal: false,
                      musical_theatre: false,
                      pop: false,
                      rap: false,
                      reggae: false,
                      r_n_b: false,
                      ska: false
                    },
                    promotions: true
                  })
                } else {
                  function refreshUserToken(userId, postData) {
                    // Write the new post's data simultaneously in the posts list and the user's post list.
                    var updates = {};
                    updates[`/token`] = postData;
                    return db.ref('users/' + userId).update(updates);
                  }
                  refreshUserToken(userId, fcmToken)
                }
              })
            .catch((err)=>{
              console.log(err)
            })
          }
        }
      })
      .catch((err) =>{
        console.log("Get Token Error!")
        console.log(err)
      })
  }

    //2
  async requestPermission() {
    try {
        console.log("Request Permission!")
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }


  render(){
    firebase.analytics().setCurrentScreen('calendar');
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
    console.log(JSON.stringify(this.state, null, 2))
    if (this.state.isLoading) {
      return <LoadingScreen />;
    } else{
      return(
        <ScrollView
          style={{backgroundColor: '#d3e6d7'}}
          refreshControl={this._refreshControl()}>
          <View>
            <SliderBox
              images={this.state.features}
              ImageComponentStyle={{
                borderRadius: 15,
                resizeMode: 'contain',
                flex: 1,
                margin: 25,
                marginLeft: 25,
                marginRight: 25
              }}
              dotColor='#008000'
              autoplay
              circleLoop
              imageLoadingColor="#008000" />

          </View>
          <View>
            {this.state.recommended.length > 0 ? (
              <View style={styles.tabbar}>
                <TouchableOpacity
                  onPress={() => this.setState({tab: 'all'})}
                  style={this.state.tab=='all' ? styles.tabBtnActive : styles.tabBtnInactive}>
                    <Text style={styles.tabBtn}>All Shows</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({tab: 'recommended'})}
                  style={this.state.tab=='recommended' ? styles.tabBtnActive : styles.tabBtnInactive}>
                    <Text style={styles.tabBtn}>Recommended</Text>
                </TouchableOpacity>
              </View>
          ) : <View></View>}
          </View>
          {this.state.tab=='all' ? this.state.items.map(item => <ListShows item={item} key={this.state.items.indexOf(item)}/>) :this.state.recommended.map(item => <ListShows item={item} key={this.state.recommended.indexOf(item)}/>)}
        </ScrollView>
      )
    }
  }

  _refreshControl(){
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this._refreshListView()} />
    )
  }

  _refreshListView(){
    uid = firebase.auth().currentUser.uid;
    //Start Rendering Spinner
    console.log("Checking for new shows...")
    this.setState({
      refreshing:true,
      uid: uid
    })
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
    this.checkPermission();
    this.createNotificationListeners();
    console.disableYellowBox = true;
    db.ref(`users/${uid}/genrePref`).once('value')
      .then((dataSnapShot) => {
        var string = JSON.stringify(dataSnapShot, null, 2)
        var object = JSON.parse(string)
        var genres = Object.keys(object)
        var preferences = Object.values(object)
        genrePrefs = []
        for (i=0;i<preferences.length;i++){
          if(preferences[i]){
            genrePrefs.push(genres[i])
          }
        }
        // console.log(JSON.stringify(genrePrefs, null, 2))
        this.setState({genrePrefs: genrePrefs})
        db.ref('events').once('value')
          .then((dataSnapShotTwo) => {
            saved_shows = []
            dataSnapShotTwo.forEach(function(childSnapshot) {
              // childData will be the actual contents of the child
              var childData = childSnapshot.val();
              saved_shows.push(childData)
            });
            var items = saved_shows
            var matches = []
            for(i=0;i<items.length;i++){
              var index = items.indexOf(items[i])
              items[i]['index'] = index
              if(myFunction(items[i].title, 'presenter')){
                var title = myFunction(items[i].title, 'show')
                var presenter = myFunction(items[i].title, 'presenter')
                items[i].title = title
                items[i].presenter = presenter
              }
              //find events with user genre preference
              var genres = items[i]['genre']
              genres = Object.values(genres)
              var match = this.state.genrePrefs.some(r=> genres.includes(r))
              if(match){
                matches.push(items[i])
              }
            }
            // console.log("Genre Preferences")
            // console.log(JSON.stringify(this.state.genrePrefs, null, 2))
            // console.log("Matched Shows")
            // console.log(JSON.stringify(matches, null, 2))
            var features = items[0]['slides']
            this.setState({
              items: items,
              isLoading: false,
              refreshing:false,
              features: features,
              recommended: matches,
              tab: 'all'
            })
          })
          .catch((err) =>{
            var title = 'Error'
            var body = 'Please check internet connection and try again.'
            Alert.alert(
              title, body,
              [
                  { text: 'OK'},
              ],
              { cancelable: false },
            );
          })

      })


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
