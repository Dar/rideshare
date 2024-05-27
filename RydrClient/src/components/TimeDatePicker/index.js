import {View, Text} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import component_styles from './styles';
import {colors} from '../../shared/common/styles/';
import List from '../UI/List';
import {LISTDATA} from '../../shared/common/data';
import {updateOrderData} from '../../store/features/order/order-slice';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';

const TimeDatePicker = ({handleDismissModalPress}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState('');
  const [expanded, setExpanded] = useState(true);
  const {order} = useAppSelector(state => state.orderState);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateString(
      currentDate.toLocaleString([], {timeStyle: 'short', dateStyle: 'medium'}),
    );
    setExpanded(false);
  };

  const setTimeToStore = () => {
    dispatch(updateOrderData({scheduleDate: dateString}));
    handleDismissModalPress();
    navigation.navigate('MapSearchScreen');
  };

  // const onChangeTime = (event, selectedTime) => {
  //   const currentTime = selectedTime;
  //   setExpanded(false);
  //   setDate(currentTime);
  // };

  return (
    <View style={component_styles.blockContainer}>
      <View style={component_styles.blockRow}>
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="datetime"
          onChange={onChangeDate}
          textColor={colors.darkText}
          darkBlueVariant="light"
          display="spinner"
        />
        <View style={component_styles.dateTextRow}>
          <Text style={component_styles.dateText}>
            {dateString ? dateString : 'Select Date for Pickup'}
          </Text>
        </View>
      </View>
      <View style={component_styles.row}>
        <List
          data={LISTDATA}
          setTimeToStore={setTimeToStore}
          style={{
            alignItems: 'center',
            backgroundColor: colors.softwhite,
          }}
          handleDismissModalPress={handleDismissModalPress}
        />
      </View>
    </View>
  );
};

export default TimeDatePicker;
