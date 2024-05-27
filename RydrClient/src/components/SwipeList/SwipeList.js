import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../shared/common/styles';
const HOME = [
  {
    id: 1,
    title: 'Home',
    address: '75 Fenton Ave',
    city: 'Thorold',
    province: 'ON',
  },
  {
    id: 2,
    title: 'Work',
    address: '123 Main St',
    city: 'Niagara Falls',
    province: 'ON',
  },
];

const FAVES = [
  {
    id: 1,
    title: 'Johnny',
    address: '85 Winslow Ave',
    city: 'Welland',
    province: 'ON',
  },
  {
    id: 2,
    title: "Buddy's",
    address: '85 St. Paul St',
    city: 'St. Catharines',
    province: 'ON',
  },
  {
    id: 3,
    title: 'Dr. Connoor',
    address: '200 Ralph St',
    city: 'Port Colborne',
    province: 'ON',
  },
];
const Item = ({address, title, section}) => (
  <View style={styles.itemContainer}>
    <View style={styles.item}>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name={
              title === 'Home'
                ? 'home'
                : title === 'Work'
                ? 'toolbox'
                : 'star-circle'
            }
            size={24}
            color={colors.darkBlue}
          />
          <View style={{marginLeft: 15}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Pressable>
        <AntDesign name="minuscircle" size={24} color={colors.darkBlue} />
      </Pressable>
    </View>
  </View>
);

const RenderHomeAndWork = () => {
  return (
    <View style={[styles.listcontainer]}>
      <FlatList
        data={HOME}
        renderItem={({item}) => (
          <Item title={item.title} address={item.address} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const RenderOtherFavesList = () => {
  return (
    <View style={styles.listcontainer}>
      <Text style={styles.listcontainerTitle}>Other</Text>
      <FlatList
        data={FAVES}
        renderItem={({item}) => (
          <Item title={item.title} address={item.address} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const SwipeList = () => {
  return (
    <View style={styles.container}>
      <RenderHomeAndWork />
      <RenderOtherFavesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  itemContainer: {
    backgroundColor: colors.softwhite,
    borderTopColor: colors.darkBlue,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  listcontainerTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.darkBlue,
    borderBottomWidth: 1,
    width: '100%',
    color: colors.white,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    color: colors.lightblack,
  },
  listcontainer: {
    // borderTopWidth: 5,
    // borderTopColor: colors.darkBlue,
  },
});

export default SwipeList;
