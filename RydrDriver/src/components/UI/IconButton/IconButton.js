import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from '../../../shared/common/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const nativeStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

const IconButton = ({
  size,
  handler,
  bgColor,
  iconColor,
  brand,
  style,
  iconName,
  isClickable,
}) => {
  const buttonRef = useRef(null);

  const Icon = () => {
    switch (brand) {
      case 'AntDesign':
        return <AntDesign name={iconName} size={size} color={iconColor} />;
      default:
        return null;
    }
  };

  const renderIcon = isClickable ? (
    <TouchableOpacity
      style={[
        {
          backgroundColor: bgColor,
        },
        style ? style : nativeStyle,
      ]}
      ref={buttonRef}
      onPress={handler}>
      {Icon()}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        {
          backgroundColor: bgColor,
        },
        style ? style : nativeStyle,
      ]}>
      {Icon()}
    </View>
  );

  return renderIcon;
};

export default IconButton;
