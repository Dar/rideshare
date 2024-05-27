import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Animated} from 'react-native';
import {useAppSelector} from '../../store/app/hooks';
import {styles} from './style';
import {colors} from '../../shared/common/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StatusBox = () => {
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(0);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [scrollY] = useState(new Animated.Value(0));
  const {order} = useAppSelector(state => state.orderState);
  const {distance, distanceTravelled, tripDistance, duration} = useAppSelector(
    state => state.mapState,
  );

  const formatTimer = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    let interval;
    switch (order?.status) {
      case 'ARRIVED_FOR_PICKUP':
        setMessages(['Rider notified', 'Waiting for rider']);
        interval = setInterval(() => {
          setTimer(prevTimer => prevTimer + 1);
        }, 1000);
        break;
      default:
        setMessages([]);
        clearInterval(interval);
        setTimer(0);
    }

    return () => clearInterval(interval);
  }, [order?.status]);

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages]);

  return (
    <>
      {order?.status === 'ARRIVED_FOR_PICKUP' ? (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTimer(timer)}</Text>
        </View>
      ) : null}
      {order?.status === 'PICKING_UP_CLIENT' ||
      order?.status === 'STARTING_TRIP' ||
      order?.status === 'ARRIVED_AT_DESTINATION' ? (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.bottomText}>
              {duration ? duration.toFixed(1) : 0} min
            </Text>
            <View
              style={{
                backgroundColor: colors.darkBlue,
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome
                name={'user'}
                color={
                  order?.status === 'ARRIVED_AT_DESTINATION' ? 'red' : 'white'
                }
                size={20}
              />
            </View>
            <Text style={styles.bottomText}>
              {distance ? distance.toFixed(1) : 0} km
            </Text>
          </View>
          {order?.status === 'ARRIVED_AT_DESTINATION' ? (
            <Text style={styles.bottomText}>Arrived At Destination</Text>
          ) : null}
        </>
      ) : null}
      {order?.status === 'PICKING_UP_CLIENT' ? (
        <Text
          style={
            styles.bottomText
          }>{`Picking up ${order?.user?.given_name}`}</Text>
      ) : null}

      {order?.status === 'ARRIVED_FOR_PICKUP' ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{paddingBottom: 0}}
          scrollEnabled={false}>
          <Animated.Text
            style={[styles.message, {transform: [{translateY: scrollY}]}]}>
            {messages[currentMessageIndex]}
          </Animated.Text>
        </ScrollView>
      ) : null}
      {order?.status === 'STARTING_TRIP' ? (
        <Text style={styles.bottomText}>Starting ride</Text>
      ) : null}
      {order?.status === 'ARRIVED_AT_DESTINATION' ? (
        <Text style={styles.bottomBarContent}>
          Distance Travelled: {parseFloat(distanceTravelled).toFixed(2)} km
        </Text>
      ) : null}

      {/* */}
    </>
  );
};

export default StatusBox;
