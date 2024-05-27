import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import {colors} from '../../../shared/common/styles';

const RippleButton = ({onPress, comp, title, style, buttonStyle}) => {
  const [rippleScale] = useState(new Animated.Value(0));
  const [isPressed, setIsPressed] = useState(false);
  const rippleSize = 100;

  const startRippleAnimation = () => {
    Animated.timing(rippleScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      rippleScale.setValue(0);
    });
  };

  const handlePressIn = () => {
    startRippleAnimation();
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  const buttonTextStyle = [
    styles.buttonText,
    buttonStyle,
    isPressed && {color: colors.yellow}, // Add the color you want when pressed
  ];

  const buttonContainerStyle = [
    styles.buttonContainer,
    style,
    isPressed && {backgroundColor: colors.softwhite}, // Add the color you want when pressed
  ];

  const renderButton = () => {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          background={TouchableNativeFeedback.Ripple('#808080', false)}>
          {renderContent()}
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          {renderContent()}
        </TouchableOpacity>
      );
    }
  };

  const renderContent = () => {
    const rippleStyle = {
      position: 'absolute',
      top: 0,
      width: rippleSize,
      height: rippleSize,
      borderRadius: rippleSize / 2,
      transform: [{scale: rippleScale}],
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    };

    return (
      <View style={[buttonContainerStyle, style]}>
        {comp ? comp : <Text style={buttonTextStyle}>{title}</Text>}
        <Animated.View style={rippleStyle} />
      </View>
    );
  };

  return renderButton();
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: colors.darkBlue, // Change the background color as needed
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.softwhite,
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default RippleButton;
