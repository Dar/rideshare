import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import component_styles from './styles';
import {colors, buttons} from '../../shared/common/styles/';
import {updateOrderData} from '../../store/features/order/order-slice';
import {useAppDispatch} from '../../store/app/hooks';

const TripDetails = ({handlePresentModalPress}) => {
  const dispatch = useAppDispatch();
  return (
    <View style={component_styles.rideDetailsWrapper}>
      <View style={component_styles.rideDetailsContainer}>
        <View
          style={[
            component_styles.rideDetailsContainerBlock,
            {
              borderRightWidth: 1,
            },
          ]}>
          <MaterialCommunityIcons
            name="seat-passenger"
            color={colors.darkBlue}
            size={24}
          />
          <View>
            <RNPickerSelect
              onValueChange={value =>
                dispatch(updateOrderData({passengerNumber: value}))
              }
              style={component_styles.picker}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: '1 - 4',
                value: '1 - 4',
              }}
              items={[
                {label: '5', value: '5'},
                {label: '6', value: '6'},
                {label: '7', value: '7'},
              ]}
            />
          </View>
          <View style={component_styles.chevron}>
            <Entypo name={'chevron-down'} color={colors.darkBlue} size={18} />
          </View>
        </View>
        <View
          style={[
            component_styles.rideDetailsContainerBlock,
            {
              borderRightWidth: 1,
              borderColor: colors.darkBlue,
            },
          ]}>
          <View style={[buttons.modalToggle, {width: '100%'}]}>
            <Ionicons
              name="ios-person-circle-outline"
              color={colors.darkBlue}
              size={20}
            />
            <RNPickerSelect
              onValueChange={value =>
                dispatch(updateOrderData({designate: value}))
              }
              style={component_styles.picker_no_border}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                color: colors.darkText,
                label: 'Personal ',
                value: 'personal',
              }}
              items={[{label: 'Someone Else', value: 'someone_else'}]}
            />

            <View style={component_styles.chevron}>
              <Entypo name={'chevron-down'} color={colors.darkBlue} size={18} />
            </View>
          </View>
        </View>
      </View>
      <View style={component_styles.rideDetailsContainer}>
        <View
          style={[
            component_styles.rideDetailsContainerBlock,
            {
              borderRightWidth: 1,
            },
          ]}>
          <Pressable style={[buttons.modalToggle, {width: '100%'}]}>
            <FontAwesome
              name="cc-mastercard"
              color={colors.darkBlue}
              size={20}
            />
            <View style={{alignItems: 'center'}}>
              <RNPickerSelect
                onValueChange={value =>
                  dispatch(updateOrderData({paymentType: value}))
                }
                style={component_styles.picker_no_border}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  color: colors.darkText,
                  label: '.... .... 1234',
                  value: 'credit_card',
                }}
                items={[
                  {
                    label: `Wallet`,
                    value: `Wallet`,
                  },
                  {
                    label: 'Cash',
                    value: 'cash',
                  },
                ]}
              />
            </View>
            <View style={component_styles.chevron}>
              <Entypo name={'chevron-down'} color={colors.darkBlue} size={18} />
            </View>
          </Pressable>
        </View>
        <Pressable
          onPress={handlePresentModalPress}
          style={component_styles.rideDetailsContainerBlock}>
          <FontAwesome name="sticky-note" color={colors.darkBlue} size={20} />
          <View>
            <Text style={component_styles.rideDetailsText}>Notes</Text>
          </View>
          <View style={component_styles.chevron}>
            <Entypo name={'chevron-down'} color={colors.darkBlue} size={18} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default TripDetails;
