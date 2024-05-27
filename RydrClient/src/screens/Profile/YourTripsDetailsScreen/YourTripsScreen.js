import React from 'react';
import {View, SectionList, Pressable, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import screen_styles from './styles';
import PageHeader from '../../../components/UI/PageHeader';
import {colors} from '../../../shared/common/styles';
import BoxContainer from '../../../components/UI/BoxContainer';
import BoxItem from '../../../components/UI/BoxItem';

const YourTripsDetailsScreen = props => {
  return (
    <View style={screen_styles.container}>
      <PageHeader
        styles={{backgroundColor: colors.softwhite}}
        textColor={colors.darkBlue}
        title={props.title}>
        <Entypo
          name="back-in-time"
          color={colors.darkBlue}
          styles={{marginLeft: 0}}
          size={32}
        />
      </PageHeader>
      <Text>Text Details Screen</Text>
    </View>
  );
};

export default YourTripsDetailsScreen;
