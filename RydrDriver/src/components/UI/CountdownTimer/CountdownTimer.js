import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../store/app/hooks';
import {colors} from '../../../shared/common/styles';
const CountdownTimer = ({interval = 10000, onSlice}) => {
  const [timer, setTimer] = useState(interval);
  const [countdown, showCountdownn] = useState(true);
  const {ordersdata} = useAppSelector(state => state.ordersState);

  // useEffect(() => {
  //   const countdown = setInterval(() => {
  //     setTimer(prevTimer => prevTimer - 1000);
  //   }, 1000);

  //   const resetTimer = () => {
  //     clearInterval(countdown);
  //     setTimer(interval);
  //   };

  //   if (timer < 1) {
  //     resetTimer();
  //     onSlice();
  //   }

  //   if (ordersdata.length < 1) {
  //     clearInterval(countdown);
  //   }

  //   return () => {
  //     clearInterval(countdown);
  //   };
  // }, [timer]);

  // Format the timer value into minutes and seconds
  const formatTime = time => {
    const seconds = Math.floor((time % 60000) / 1000);
    return `${seconds}`;
  };

  return (
    <View style={[styles.container, {opacity: timer < 5500 ? 1 : 0}]}>
      <Text style={styles.timerText}>{formatTime(timer)}</Text>
    </View>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    width: 80,
    height: 80,
    textAlign: 'center',
  },
  timerText: {
    textAlign: 'center',
    color: colors.softwhite,
    fontSize: 48,
  },
});
