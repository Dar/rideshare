import {View, Text, StyleSheet, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {colors, transparentColor} from '../../shared/common/styles';
import {useNavigation} from '@react-navigation/native';

const OrderCardDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={componentStyle.orderCardDetails}>
      <View style={componentStyle.orderCardDetailsTop}>
        <Text style={componentStyle.cardTitle}>Last Fare:</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}>
        <Pressable style={componentStyle.orderCardDetailsBottom}>
          <View style={componentStyle.orderItemLeft}>
            <AntDesign
              name="clockcircle"
              size={24}
              style={componentStyle.icon}
              color={colors.darkBlue}
            />

            <AntDesign
              style={componentStyle.icon}
              name="user"
              size={24}
              color={colors.darkBlue}
            />
          </View>
          <View style={componentStyle.orderItemRight}>
            <Text style={componentStyle.cardText}>3:04 pm</Text>
            <Text style={componentStyle.cardText}>Donna</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('ProfileScreen')}
          style={componentStyle.buttonContainer}>
          <Text style={componentStyle.buttonText}>View Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const componentStyle = StyleSheet.create({
  orderCardDetails: {
    width: '100%',
  },
  orderCardDetailsTop: {
    width: '100%',
    marginTop: 75,
  },
  orderCardDetailsBottom: {
    top: 0,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightblack,
  },
  orderItemLeft: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '50%',
    textAlign: 'left',
    right: 20,
  },
  orderItemRight: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '50%',
  },
  cardText: {
    fontSize: 20,
    color: colors.lightblack,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.lightblack,
    bottom: 0,
    textAlign: 'center',
    paddingVertical: 10,
    marginLeft: 5,
  },

  buttonContainer: {
    position: 'relative',
    marginTop: 0,
    paddingVertical: 20,
    backgroundColor: transparentColor.darkBlue,

    width: '100%',
  },
  buttonText: {
    fontSize: 22,
    color: colors.softwhite,
    textAlign: 'center',
    width: '100%',
    fontWeight: '500',
  },
  icon: {
    width: 24,
    marginVertical: 10,
  },
});

export default OrderCardDetails;
