import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import component_styles from './styles';

const PageHeader = ({title, styles, children}) => {
  const navigation = useNavigation();

  return (
    <View style={{...component_styles.pageHeaderContainer, ...styles}}>
      {/*ADD ICON*/}
      {children}
      <Text style={component_styles.pagetitle}>{title}</Text>
    </View>
  );
};

export default PageHeader;
