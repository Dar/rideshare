import React, { useState, useCallback } from 'react';
import { Switch } from 'react-native-switch';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { colors } from '../../shared/common/styles';
import { updateActiveDriver } from '../../store/features/driver/driver-slice';
import throttle from 'lodash.throttle';

const SwitchButton = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.driver);

  // Local state for immediate responsiveness
  const [isDriverActive, setIsDriverActive] = useState(data?.isActive);

  const toggleActive = useCallback(
    throttle(
      (value) => {
        const input = {
          type: 'Standard',
          isActive: value,
        };
        dispatch(updateActiveDriver(input));
      },
      1000,
      { trailing: true, leading: false } 
    ),
    [dispatch]
  );

  const handleSwitchChange = (value) => {
    setIsDriverActive(value); 
    toggleActive(value); 
  };

  return (
    <Switch
      value={isDriverActive}
      onValueChange={handleSwitchChange}
      disabled={false}
      activeText={'Active'}
      inActiveText={'Offline'}
      circleSize={50}
      barHeight={50}
      circleBorderWidth={1}
      backgroundActive={colors.green}
      backgroundInactive={colors.red}
      circleActiveColor={colors.softwhite}
      circleInActiveColor={colors.softwhite}
      changeValueImmediately={true}
      innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }}
      outerCircleStyle={{}}
      renderActiveText={true}
      renderInActiveText={true}
      switchLeftPx={3}
      switchRightPx={3}
      switchWidthMultiplier={2.5}
      activeTextStyle={{ fontSize: 20 }}
      inactiveTextStyle={{ fontSize: 20 }}
      switchBorderRadius={25}
    />
  );
};

export default SwitchButton;
