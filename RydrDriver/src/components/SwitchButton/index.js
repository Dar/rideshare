import React from 'react';
import {Switch} from 'react-native-switch';
import {useAppDispatch, useAppSelector} from '../../store/app/hooks';
import {colors} from '../../shared/common/styles';
import {updateActiveDriver} from '../../store/features/driver/driver-slice';

const SwitchButton = () => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.driver);

  const toggleActive = () => {
    const input = {
      type: 'Standard',
      isActive: !data?.isActive,
    };
    dispatch(updateActiveDriver(input));
  };
  return (
    <Switch
      value={data?.isActive}
      onValueChange={() => toggleActive()}
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
      innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
      outerCircleStyle={{}}
      renderActiveText={true}
      renderInActiveText={true}
      switchLeftPx={3}
      switchRightPx={3}
      switchWidthMultiplier={2.5}
      activeTextStyle={{fontSize: 20}}
      inactiveTextStyle={{fontSize: 20}}
      switchBorderRadius={25}
    />
  );
};

export default SwitchButton;
