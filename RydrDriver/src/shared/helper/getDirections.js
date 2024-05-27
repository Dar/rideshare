import React from 'react';
import {View, Button} from 'react-native';
import getDirections from 'react-native-google-maps-directions';
import {colors} from '../common/styles';

export default class gmapsDirections extends Component {
  handleGetDirections = () => {
    const data = {
      source: {
        latitude: -33.8356372,
        longitude: 18.6947617,
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving',
        },
        {
          key: 'dir_action',
          value: 'navigate',
        },
      ],
      waypoints: [
        {
          latitude: -33.8600025,
          longitude: 18.697452,
        },
        {
          latitude: -33.8600026,
          longitude: 18.697453,
        },
        {
          latitude: -33.8600036,
          longitude: 18.697493,
        },
      ],
    };

    getDirections(data);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
  },
});
