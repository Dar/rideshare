import React from 'react';
import {View, SectionList, Pressable, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import screen_styles from './styles';
import PageHeader from '../../../components/UI/PageHeader';
import {colors} from '../../../shared/common/styles';
import BoxContainer from '../../../components/UI/BoxContainer';
import BoxItem from '../../../components/UI/BoxItem';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
];

const Item = ({title}) => (
  <View style={screen_styles.item}>
    <BoxContainer style={screen_styles.tripDetailsContainer} col={'full'}>
      <View style={screen_styles.tripHeader}>
        <View>
          <Text style={screen_styles.title}>Comfort</Text>
          <Text style={screen_styles.title}>
            3:08 PM, Tuesday January 17 2023
          </Text>
        </View>
        <View>
          <Text style={screen_styles.title}>$ 15.08</Text>
          <Pressable>
            <Text
              style={[
                screen_styles.title,
                {color: colors.darkBlue, textAlign: 'right'},
              ]}>
              Add tip
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={screen_styles.tripHistoryLocationDetails}>
        <View>
          {/* Circle near Origin input */}
          <View style={screen_styles.circle} />
          {/* Line between dots */}
          <View style={screen_styles.line} />
          {/* Square near Destination input */}
          <View style={screen_styles.square} />
        </View>

        <BoxItem style={screen_styles.tripHistoryLocationNames}>
          <Text style={screen_styles.tripHistoryText}>
            225 Wellington St W, Toronto, ON M5V 3G7
          </Text>
          <Text style={screen_styles.tripHistoryText}>
            484 Crawford St, Toronto, ON M6G 3J8
          </Text>
        </BoxItem>
      </View>
      <View style={screen_styles.tripHistoryFooter}>
        <Pressable style={screen_styles.tripHistoryFooterButton}>
          <Text style={screen_styles.tripHistoryFooterButtonText}>Details</Text>
        </Pressable>
      </View>
    </BoxContainer>
  </View>
);

const YourTripsScreen = props => {
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
      <SectionList
        sections={DATA}
        style={{marginVertical: 20, paddingHorizontal: 20}}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        // renderSectionHeader={({section: {title}}) => (
        //   <Text style={screen_styles.header}>{title}</Text>
        // )}
      />
    </View>
  );
};

export default YourTripsScreen;
