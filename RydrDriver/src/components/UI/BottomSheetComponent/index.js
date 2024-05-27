import {useCallback, useMemo, useEffect, useState, forwardRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export const BottomSheetComponent = forwardRef(({children}, ref) => {
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <BottomSheet
      enablePanDownToClose={true}
      ref={ref}
      handleStyle={styles.handle}
      index={0}
      snapPoints={snapPoints}
      // onPress={() => {
      //   if (currentIndex == 1) {
      //     bottomSheetRef.current?.snapToIndex(0);
      //   } else {
      //     bottomSheetRef.current?.snapToIndex(1);
      //   }
      // }}
    >
      {children}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  handle: {
    display: 'none',
  },
});
