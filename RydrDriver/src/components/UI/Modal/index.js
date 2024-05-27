import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';

import {colors} from '../../../shared/common/styles';

const ModalHOC = props => {
  const {modalVisible} = props;

  const {children} = props;
  return (
    <View style={componet_styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={componet_styles.centeredView}>
          <View style={componet_styles.modalView}>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

const componet_styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalHOC;
