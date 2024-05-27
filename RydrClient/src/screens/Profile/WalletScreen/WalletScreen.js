import React, {useCallback, useState, useEffect, useMemo, useRef} from 'react';
import {Button} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import {ScrollView, View, Text, Pressable, Animated} from 'react-native';
import {useForm} from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PageHeader from '../../../components/UI/PageHeader';
import {colors} from '../../../shared/common/styles';
import BoxContainer from '../../../components/UI/BoxContainer';
import BoxItem from '../../../components/UI/BoxItem';
import CustomInputEdit from '../../../components/UI/CustomInputEdit';
import screen_styles from './styles';
import CustomButton from '../../../components/UI/CustomButton';

const ExpandableAddFundsView = props => {
  const {control, handleSubmit, watch} = useForm();
  return (
    <Animated.View style={screen_styles.expanedPanel}>
      <View style={screen_styles.row}>
        <View style={screen_styles.formFields}>
          <Text style={screen_styles.formTitle}>Bank Name</Text>
          <CustomInputEdit
            name="name"
            control={control}
            placeholder="Bank Name"
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Name should be max 24 characters long',
              },
            }}>
            <FontAwesome
              name={'bank'}
              size={20}
              style={screen_styles.inputIcon}
              color={colors.darkBlue}
            />
          </CustomInputEdit>
        </View>
      </View>
      <View style={screen_styles.row}>
        <View style={screen_styles.formFields}>
          <Text style={screen_styles.formTitle}>Account Holder Name</Text>
          <CustomInputEdit
            name="name"
            control={control}
            placeholder="Account Holder Name"
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Name should be max 24 characters long',
              },
            }}>
            <FontAwesome
              name={'drivers-license'}
              size={20}
              style={screen_styles.inputIcon}
              color={colors.darkBlue}
            />
          </CustomInputEdit>
        </View>
      </View>

      <View style={screen_styles.row}>
        <View style={screen_styles.formFields}>
          <Text style={screen_styles.formTitle}>Account Number</Text>
          <CustomInputEdit
            name="account_number"
            control={control}
            placeholder="Account Number"
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Name should be max 24 characters long',
              },
            }}>
            <FontAwesome
              name={'money'}
              size={20}
              style={screen_styles.inputIcon}
              color={colors.darkBlue}
            />
          </CustomInputEdit>
        </View>
      </View>

      <View style={screen_styles.formFooter}>
        <View style={screen_styles.switch}>
          <Text style={screen_styles.tileText}>Auto Refill</Text>
        </View>

        <CustomButton
          text="Add to Wallet"
          onPress={() => {}}
          type="PRIMARY"
          width={150}
          fgColor={colors.softwhite}
        />
      </View>
    </Animated.View>
  );
};

const ExpandableCCView = props => {
  const {control, handleSubmit, watch} = useForm();
  return (
    <Animated.View style={screen_styles.expanedPanel}>
      <View style={screen_styles.row}>
        <View style={screen_styles.formFields}>
          <Text style={screen_styles.formTitle}>Name on Card</Text>
          <CustomInputEdit
            name="cardholdername"
            control={control}
            placeholder="Card Holder Name"
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Name should be max 24 characters long',
              },
            }}>
            <FontAwesome
              name="user-o"
              style={screen_styles.inputIcon}
              color={colors.darkBlue}
              size={20}
            />
          </CustomInputEdit>
        </View>
      </View>
      <View style={screen_styles.row}>
        <View style={screen_styles.formFields}>
          <Text style={screen_styles.formTitle}>Credit Card Number </Text>
          <CustomInputEdit
            name="creditcardnumber"
            control={control}
            placeholder="Credit Card Number"
            rules={{
              required: 'Credit Card Number is required',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Name should be max 24 characters long',
              },
            }}>
            <FontAwesome
              name={'drivers-license'}
              size={20}
              style={screen_styles.inputIcon}
              color={colors.darkBlue}
            />
          </CustomInputEdit>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={[screen_styles.row, {width: 150}]}>
          <View style={screen_styles.formFields}>
            <Text style={screen_styles.formTitle}>CVV</Text>
            <CustomInputEdit
              name="securitycode"
              control={control}
              placeholder="CVV"
              rules={{
                required: 'Security code is required',
                minLength: {
                  value: 3,
                  message: 'Security Code should be at least 3 characters long',
                },
                maxLength: {
                  value: 3,
                  message: 'Security Code should be max 3 characters long',
                },
              }}>
              <MaterialCommunityIcons
                name={'credit-card-check'}
                size={25}
                style={screen_styles.inputIcon}
                color={colors.darkBlue}
              />
            </CustomInputEdit>
          </View>
        </View>

        <View style={[screen_styles.row, {width: 150}]}>
          <View style={screen_styles.formFields}>
            <Text style={screen_styles.formTitle}>Expiry Date</Text>
            <CustomInputEdit
              name="expirydate"
              control={control}
              placeholder="Expire Date"
              rules={{
                required: 'Expire Date is required',
                minLength: {
                  value: 3,
                  message: 'Expire Date should be at least 3 characters long',
                },
                maxLength: {
                  value: 24,
                  message: 'Expire Date should be max 24 characters long',
                },
              }}>
              <FontAwesome
                name={'calendar'}
                size={20}
                style={screen_styles.inputIcon}
                color={colors.darkBlue}
              />
            </CustomInputEdit>
          </View>
        </View>
      </View>
      <View style={screen_styles.formFooter}>
        <CustomButton
          text="Remove Card"
          onPress={() => {}}
          type="TERTIARY"
          width={150}
          fgColor={colors.red}
        />
        <CustomButton
          text="Save Card"
          onPress={() => {}}
          type="PRIMARY"
          width={100}
          fgColor={colors.softwhite}
        />
      </View>
    </Animated.View>
  );
};

const ExpandableGiftCardView = props => {
  const {control, handleSubmit, watch} = useForm();
  return (
    <Animated.View style={screen_styles.expanedPanel}>
      <View style={screen_styles.row}>
        <View style={screen_styles.formFields}>
          <Text style={screen_styles.formTitle}>Gift Card Number</Text>
          <CustomInputEdit
            name="giftcardnumber"
            control={control}
            placeholder="Gift Card Number"
            rules={{
              required: 'Card number is required',
              minLength: {
                value: 7,
                message: 'Card number should be at least 7 digits long',
              },
              maxLength: {
                value: 7,
                message: 'Card number should be max 7 digits long',
              },
            }}>
            <FontAwesome
              name={'gift'}
              size={24}
              style={screen_styles.inputIcon}
              color={colors.darkBlue}
            />
          </CustomInputEdit>
        </View>
        <View style={screen_styles.formFooter}>
          <CustomButton
            text="Enter Card"
            width={'30%'}
            onPress={() => {}}
            type="PRIMARY"
            fgColor={colors.softwhite}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const WalletScreen = props => {
  const [isFundsExpanded, setIsFundsExpanded] = useState(false);
  const [isCCExpanded, setCCExpanded] = useState(false);
  const [isGiftCardExpanded, setGiftCardExpanded] = useState(false);
  return (
    <ScrollView style={screen_styles.container}>
      <PageHeader
        styles={{backgroundColor: colors.softwhite}}
        textColor={colors.darkBlue}
        title={props.title}>
        <AntDesign
          name="wallet"
          color={colors.darkBlue}
          styles={{marginLeft: 0}}
          size={32}
        />
      </PageHeader>
      <View style={screen_styles.wrapper}>
        <BoxContainer style={{backgroundColor: colors.softwhite}}>
          <BoxItem>
            <Text style={screen_styles.tileTitle}>Funds</Text>
            <View style={screen_styles.blockLayout}>
              <View style={screen_styles.blockLayoutInner}>
                <FontAwesome name={'dollar'} size={32} color={colors.green} />
                <Text style={screen_styles.tileLargeText}>0.00</Text>
              </View>
            </View>
            <View style={screen_styles.autoFillContainer}>
              <Text style={screen_styles.tileText}>Auto-refill is OFF</Text>
            </View>
            <View
              style={{
                marginTop: 10,
              }}>
              <Button
                buttonStyle={{
                  backgroundColor: colors.yellow,
                }}
                titleStyle={{color: colors.darkText}}
                raised={true}
                type="outline"
                icon={
                  <AntDesign name="plus" size={15} color={colors.darkText} />
                }
                onPress={() => {
                  setIsFundsExpanded(!isFundsExpanded);
                  setCCExpanded(false);
                  setGiftCardExpanded(false);
                }}
                title="Add from Bank Account"
              />
            </View>
          </BoxItem>
          <Collapsible collapsed={!isFundsExpanded}>
            <ExpandableAddFundsView />
          </Collapsible>
        </BoxContainer>

        <BoxContainer style={{backgroundColor: colors.softwhite}}>
          <BoxItem>
            <Text style={screen_styles.tileTitle}>Credit Card</Text>
            <Pressable
              style={screen_styles.blockLayout}
              onPress={() => {
                setCCExpanded(!isCCExpanded);
                setIsFundsExpanded(false);
                setGiftCardExpanded(false);
              }}>
              <View style={screen_styles.blockLayoutInner}>
                <FontAwesome
                  name={'cc-visa'}
                  size={32}
                  color={colors.darkBlue}
                />
                <Text style={screen_styles.tileText}>.... .... 1234</Text>
              </View>
              <Entypo
                name={isCCExpanded ? 'chevron-up' : 'chevron-down'}
                color={colors.darkBlue}
                size={24}
              />
            </Pressable>
          </BoxItem>
          <Collapsible collapsed={!isCCExpanded}>
            <ExpandableCCView />
          </Collapsible>
        </BoxContainer>
        <BoxContainer style={{backgroundColor: colors.softwhite}}>
          <BoxItem>
            <Text style={screen_styles.tileTitle}>Gift Card</Text>
            <Pressable
              style={screen_styles.blockLayout}
              onPress={() => {
                setGiftCardExpanded(!isGiftCardExpanded);
                setCCExpanded(false);
                setIsFundsExpanded(false);
              }}>
              <View style={screen_styles.blockLayoutInner}>
                <MaterialIcons
                  name={'card-giftcard'}
                  size={32}
                  color={colors.red}
                />
                <Text style={screen_styles.tileText}>07812</Text>
              </View>
              <Entypo
                name={isGiftCardExpanded ? 'chevron-up' : 'chevron-down'}
                color={colors.darkBlue}
                size={24}
              />
            </Pressable>
          </BoxItem>
          <Collapsible collapsed={!isGiftCardExpanded}>
            <ExpandableGiftCardView />
          </Collapsible>
        </BoxContainer>
      </View>
    </ScrollView>
  );
};

export default WalletScreen;
