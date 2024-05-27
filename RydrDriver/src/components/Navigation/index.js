const Navigation = ({}) => {
  const renderers = {
    p: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      return (
        <Text style={[styles.paragraph, convertedCSSStyles]}>{children}</Text>
      );
    },
    strong: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      return <Text style={styles.strong}>{children}</Text>;
    },
  };

  const renderNavigation = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.navigationContainer,
          {
            transform: [{translateY: navigationBox}],
          },
        ]}>
        <View style={styles.navigationDisplay}>
          <Text style={styles.text}>
            {currentAddress ? currentAddress : ''}
          </Text>

          <Text style={styles.text}>
            CurLat: {currentLatitude ? currentLatitude : ''}
          </Text>
          <Text style={styles.text}>
            CurLng: {currentLongitude ? currentLongitude : ''}
          </Text>
          <Text style={styles.text}>Heading: {heading ? heading : ''}</Text>
          {directions ? (
            <HTML
              source={{html: directions[0].html_instructions}}
              baseStyle={customStyles}
              renderers={renderers}
            />
          ) : null}
        </View>
      </Animated.View>
    );
  }, [currentAddress, currentLatitude, currentLongitude, heading, directions]);
};

export default Navigation;
