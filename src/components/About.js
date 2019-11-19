import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

export default class About extends Component {
  render() {
    return (
    <ScrollView style={styles.background}>
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
        <View>
          <Text style={styles.toads}>Toad's Place</Text>
          <Text  style={styles.contact}>
            300 York St, New Haven, CT 06511{"\n"}
            203-624-8623{"\n"}
            toadsplac@aol.com
          </Text>
        </View>
      </View>
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  background:{
    backgroundColor: '#c0dfc066'
  },
  wrapper:{
    padding: 15,
    fontSize: 16
  },
  contact: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  toads: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
