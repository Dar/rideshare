import React, {forwardRef, useMemo} from 'react';
import {View, Pressable} from 'react-native';
import 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import bottomSheetStyles from './styles';

const WithBottomSheet = forwardRef((props, ref) => {
  const {children, snapPoints, handleBottomSheetClose} = props;
  return (
    <BottomSheet
      afterClose={handleBottomSheetClose}
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={bottomSheetStyles.bottomSheetHandleStyle}
      backgroundStyle={bottomSheetStyles.bottomSheetBackgroundStyle}>
      <View style={bottomSheetStyles.bottomSheet}>{children}</View>
    </BottomSheet>
  );
});

export default WithBottomSheet;
