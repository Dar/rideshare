import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [],
    };
  }

  componentDidMount() {
    const LATITUDE = 43.06936;
    const LONGITUDE = -79.133958;
    const DEST_LATITUDE = 43.1199670620922;
    const DEST_LONGITUDE = -79.21312295672477;
    const LATITUDE_DELTA = 0.005;
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
    this.getDirections(
      `${LATITUDE},${LONGITUDE}`,
      `${DEST_LATITUDE},${DEST_LONGITUDE}`,
    );
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`,
        {
          params: {
            key: 'AIzaSyBsWRhbzYB5VlFI3YrHbEwJZRkwmkQcCLI',
          },
        },
      );

      let respJson = await resp.json();
      console.log('RESP', respJson);
      // let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      // let coords = points.map((point, index) => {
      //   return {
      //     latitude: point[0],
      //     longitude: point[1],
      //   };
      // });
      // this.setState({coords: coords});
      // return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 41.0082,
            longitude: 28.9784,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
