import React, {forwardRef} from 'react';
import {View, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import bottomSheetStyles from './styles';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {colors} from '../../../shared/common/styles';

const WithBottomSheet = forwardRef((props, ref) => {
  const {handleDismissModalPress, snapPoints, children} = props;
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={1}
        style={bottomSheetStyles.bottomSheetWrapper}
        snapPoints={snapPoints}>
        <View style={bottomSheetStyles.bottomSheet}>
          <View style={bottomSheetStyles.contentContainer}>
            <Pressable
              style={bottomSheetStyles.closeButtonContainer}
              onPress={handleDismissModalPress}>
              <AntDesign
                name="closecircle"
                color={colors.darkText}
                styles={{marginLeft: 0}}
                size={32}
              />
            </Pressable>
          </View>
          {children}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default WithBottomSheet;
