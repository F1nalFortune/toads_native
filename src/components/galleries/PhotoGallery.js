import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";

export default class PhotoGallery extends Component {

  //// TODO:
  // add infinite scroll
  render() {
    var images = [
      {
        source: require('../../../assets/images/Dance/IMG_2134.jpg'),
        dimensions: { width: 1080, height: 1920 }
      },
      {
        source: require('../../../assets/images/Dance/IMG_1354.jpg'),
        dimensions: { width: 1080, height: 1920 }
      },
      {
        source: require('../../../assets/images/Dance/IMG_1355.jpg'),
        dimensions: { width: 1080, height: 1920 }
      },
      {
        source: require('../../../assets/images/Dance/IMG_1358.jpg'),
        dimensions: { width: 1080, height: 1920 }
      },
      {
        source: require('../../../assets/images/Dance/IMG_1359.jpg'),
        dimensions: { width: 1080, height: 1920 }
      },
      {
        source: require('../../../assets/images/Dance/IMG_1361.jpg'),
        dimensions: { width: 1080, height: 1920 }
      },
      {
        source: require('../../../assets/images/Dance/IMG_1363.jpg'),
        dimensions: { width: 1080, height: 1920 }
      },
      {
        source: require('../../../assets/images/Dance/IMG_1364.jpg'),
        dimensions: { width: 1080, height: 1920 }
      }
    ];
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
    // add infinite scroll here
    return (
        <GallerySwiper
            style={{ flex: 1, backgroundColor: "black" }}
            images={images}
        />
    );
  }
}
