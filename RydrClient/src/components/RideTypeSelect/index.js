import React, {useState} from 'react';
import {View, Text, Pressable, Modal} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RideType from '../RideType';
import component_styles from './styles';
import {colors} from '../../shared/common/styles';
import {useAppSelector} from '../../store/app/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import {getFare} from '../../shared/helper/helperFunction';

const RideTypeSelect = ({typeState}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {order} = useAppSelector(state => state.orderState);
  const {distance, duration} = useAppSelector(state => state.mapState);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={component_styles.container}>
          <View style={component_styles.toggleOptions}>
            <Fontisto name={'automobile'} size={50} color={colors.darkBlue} />
          </View>
          <View style={component_styles.middleContainer}>
            <Text style={component_styles.text}>
              {order?.type ? order.type : 'Standard'}
            </Text>
            <Text style={component_styles.distanceText}>
              {duration.toFixed(2)} min
            </Text>
          </View>
          <View style={component_styles.fareContainer}>
            <Text style={component_styles.fareText}>
              {getFare(order, distance)}
            </Text>
            <Pressable>
              <Icon
                name="information-circle"
                color={colors.softwhite}
                styles={{marginLeft: 0}}
                size={20}
              />
            </Pressable>
          </View>
          <View style={component_styles.rightContainer}>
            <Entypo name={'chevron-down'} color={colors.darkBlue} size={24} />
          </View>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}>
        <View style={component_styles.centeredView}>
          <View style={component_styles.modalView}>
            <RideType typeState={typeState}></RideType>
            <Pressable
              style={[component_styles.button, component_styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={component_styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RideTypeSelect;
