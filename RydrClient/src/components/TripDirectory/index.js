import React, {useState} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';

import component_styles from './styles';
import {colors} from '../../shared/common/styles/';

const ExpandableFavView = props => {
  return (
    <Animated.View style={component_styles.expanedPanel}>
      <View style={component_styles.row}>
        <View style={component_styles.iconContainer}>
          <Entypo name={'home'} size={20} color={colors.darkBlue} />
        </View>
        <Text style={component_styles.destinationText}>Home</Text>
      </View>

      <View style={component_styles.row}>
        <View style={component_styles.iconContainer}>
          <Entypo name={'suitcase'} size={20} color={colors.darkBlue} />
        </View>
        <Text style={component_styles.destinationText}>Work</Text>
      </View>
    </Animated.View>
  );
};

const TripDirectory = props => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={component_styles.container}>
      {/* Home destination */}
      <View style={component_styles.recentContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          style={component_styles.secondaryExpandableToggle}>
          <Text style={component_styles.recentTitle}>Favorites:</Text>
          <Entypo
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            color={colors.darkBlue}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={!isExpanded}>
        <ExpandableFavView />
      </Collapsible>

      <View style={component_styles.recentContainer}>
        <Text style={component_styles.recentTitle}>Recent:</Text>
      </View>
      <View style={component_styles.recentList}>
        <View style={component_styles.row}>
          <View style={component_styles.iconContainer}>
            <AntDesign name={'clockcircle'} size={20} color={colors.darkBlue} />
          </View>
          <Text style={component_styles.destinationText}>Work</Text>
        </View>
        <View style={component_styles.row}>
          <View style={component_styles.iconContainer}>
            <AntDesign name={'clockcircle'} size={20} color={colors.darkBlue} />
          </View>
          <Text style={component_styles.destinationText}>Thorold</Text>
        </View>
      </View>
    </View>
  );
};

export default TripDirectory;
