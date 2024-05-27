import React, {useState, useEffect} from 'react';
import {Text, Animated, View, useWindowDimensions} from 'react-native';
import {useStyle} from './styles.js';
import RenderHtml from 'react-native-render-html';
import {useAppSelector} from '../../store/app/hooks';
import {
  hideNavigationCard,
  showNavigationCard,
} from '../../constants/animations.js';

// HTML Description styles
const customStyles = {
  p: {
    color: 'white',
    fontSize: '32px',
    textAlign: 'center',
  },
  b: {
    color: 'yellow', // Example text color
  },
  div: {
    width: '100%',
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const RouteNavigation = ({
  currentAddress,
  currentLatitude,
  currentLongitude,
  heading,
  directions,
}) => {
  const {height, width} = useWindowDimensions();
  const navigationBox = useState(new Animated.Value(-height))[0];
  //get ORDERS
  const {ordersdata, modalVisible} = useAppSelector(state => state.ordersState);
  //get ORDER
  const {order} = useAppSelector(state => state.orderState);
  // DATA
  const {data} = useAppSelector(state => state.driver);
  //USE STYLE
  const styles = useStyle();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (order && order.status === 'PICKING_UP_CLIENT') {
        // dispatch(
        //   setOrigin({
        //     latitude: origin.geometry.location.lat,
        //     longitude: origin.geometry.location.lng,
        //   }),
        // );
        // dispatch(
        //   setDestination({
        //     latitude: destination.geometry.location.lat,
        //     longitude: destination.geometry.location.lng,
        //   }),
        // );
      }

      if (order && data?.isActive) {
        console.log('ACTIVE');
        showNavigationCard(navigationBox);
      } else {
        hideNavigationCard(navigationBox, height);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [order]);
  return (
    <Animated.View
      style={[
        styles.navigationContainer,
        {
          transform: [{translateY: navigationBox}],
        },
      ]}>
      {directions ? (
        <View style={styles.navigationText}>
          <View style={styles.directionalIconContainer}>
            <Text style={styles.directionalIcon}>
              {directions[1]?.maneuver}
            </Text>
            <Text style={styles.directionalDistance}>
              {directions[0].distance.text}
            </Text>
          </View>
          <View style={styles.htmlContainer}>
            <RenderHtml
              source={{
                html: `<div><p>${directions[0].html_instructions}<p></div>`,
              }}
              tagsStyles={customStyles}
              enableExperimentalMarginCollapsing={true}
            />
          </View>
        </View>
      ) : null}
    </Animated.View>
  );
};

export default RouteNavigation;
