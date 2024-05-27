import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import component_styles from './styles';
import {colors, buttons, text} from '../../../shared/common/styles/';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListItems = ({icon, text, iconProvider}) => {
  const onPress = () => {};

  const getIcon = iconProvider => {
    let iconElement = null;
    if (iconProvider === 'Entypo') {
      iconElement = <Entypo name={icon} size={24} color={colors.darkText} />;
    } else {
      iconElement = <AntDesign name={icon} size={24} color={colors.darkText} />;
    }
    return iconElement;
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        component_styles.container,
        {
          backgroundColor: colors.themeColor,
        },
      ]}>
      <View style={component_styles.middleContainer}>
        <View style={component_styles.dateInfo}>
          <View style={component_styles.icon}>{getIcon(iconProvider)}</View>

          <Text style={component_styles.time}>{text}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const List = ({data, handleDismissModalPress}) => {
  const renderItem = ({item}) => (
    <ListItems
      iconProvider={item.iconProvider}
      icon={item.icon}
      text={item.text}
      title={item.title}
    />
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={component_styles.buttonContainer}>
        <Pressable
          onPress={handleDismissModalPress}
          style={buttons.cancelButton}>
          <Text style={text.textLight}>Cancel</Text>
        </Pressable>
        <Pressable style={buttons.cancelButton}>
          <Text style={text.textLight}>Set</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default List;
