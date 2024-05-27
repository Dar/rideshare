import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors, buttons} from '../../../shared/common/styles/';
import component_styles from './styles';

const PageHeader = ({title, textColor, styles, children}) => {
  const navigation = useNavigation();

  return (
    <View style={{...component_styles.pageHeaderContainer, ...styles}}>
      {/*ADD ICON*/}
      {children}
      <Text style={[{...component_styles.pagetitle, color: textColor}]}>
        {title}
      </Text>
    </View>
  );
};

export default PageHeader;
