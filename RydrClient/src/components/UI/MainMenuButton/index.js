import React from 'react';
import {Pressable, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors, buttons} from '../../../shared/common/styles/';
import component_styles from './styles';

const MainMenuButton = props => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{...component_styles.mainMenuButtonsContainer, ...props.styles}}>
      {props.isBackVisible ? (
        <View style={[buttons.headerButton, {left: 15, top: 10}]}>
          <Pressable onPress={() => goBack()} style={buttons.roundButton}>
            <AntDesign name="arrowleft" color={colors.darkText} size={20} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default MainMenuButton;
