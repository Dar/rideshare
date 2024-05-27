import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Path, G} from 'react-native-svg';

const SVGPointer = () => {
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsing(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.pointer}>
        <Svg height="100%" width="100%" viewBox="0 0 24 24">
          <G>
            <Circle
              cx="12"
              cy="12"
              r={pulsing ? '10' : '8'}
              fill={pulsing ? '#3498db' : '#2ecc71'}
            />
            <Path
              d="M12 16l-3.71-3.71 1.41-1.41L12 13.17l4.29-4.29 1.41 1.41L12 16z"
              fill="#fff"
            />
          </G>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SVGPointer;
