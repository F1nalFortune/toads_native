import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";

export default class RainforestCarousel extends Component {
  render() {
    firebase.analytics().setCurrentScreen('rainforest');
    var images = [
        {
          source: require("../../../assets/images/RainForest/rain1.jpg"),
          dimensions: { width: 1080, height: 1920 }
        },
        {
          source: require("../../../assets/images/RainForest/rain3.jpg"),
          dimensions: { width: 1080, height: 1920 }
        },
        {
          source: require("../../../assets/images/RainForest/rain4.jpg"),
          dimensions: { width: 1080, height: 1920 }
        },
        {
          source: require("../../../assets/images/RainForest/rain5.jpg"),
          dimensions: { width: 1080, height: 1920 }
        },
        {
          source: require("../../../assets/images/RainForest/rain6.jpg"),
          dimensions: { width: 1080, height: 1920 }
        },
        {
          source: require("../../../assets/images/RainForest/rain7.jpg"),
          dimensions: { width: 1080, height: 1920 }
        },
    ]
    /**
     * Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     * @param  {Array} array The array to shuffle
     * @return {String}      The first item in the shuffled array
     */
    var shuffle = function (array) {

      var currentIndex = array.length;
      var temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;

    };
    shuffle(images)
    return (
      <GallerySwiper
        style={{ flex: 1, backgroundColor: "black" }}
        images={images}
      />
    );
  }
}
