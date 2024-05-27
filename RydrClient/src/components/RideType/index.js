import React, {useState} from 'react';
import {View, Text} from 'react-native';
import RideTypeRow from '../RideTypeRow';
import typesData from '../../assets/data/types';
import {colors} from '../../shared/common/styles/';
import {useAppDispatch} from '../../store/app/hooks';
import {updateOrderData} from '../../store/features/order/order-slice';

const RideType = ({typeState}) => {
  const [selectedType, setSelectedType] = useState(typeState);
  const dispatch = useAppDispatch();
  const getSelectedType = type => {
    dispatch(updateOrderData({type: type.type}));
    setSelectedType(type.type);
  };

  return (
    <View
      style={{
        backgroundColor: colors.softwhite,
        paddingVertical: 10,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-start',
      }}>
      {typesData.map(type => (
        <RideTypeRow
          type={type}
          key={type.id}
          isSelected={type.type === selectedType}
          onPress={() => {
            getSelectedType(type);
          }}
        />
      ))}
    </View>
  );
};

export default RideType;
