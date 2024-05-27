import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {colors} from '../../shared/common/styles';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 0;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class TermsAndConditions extends Component {
  state = {
    accepted: false,
  };

  render() {
    const openExternalURL = () => {
      const url = 'https://cloud.google.com/maps-platform/terms';
      Linking.openURL(url).catch(err =>
        console.error('An error occurred', err),
      );
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Terms of Service for Niagara Ride Share
        </Text>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              this.setState({
                accepted: true,
              });
            }
          }}>
          <Text style={styles.tcP}>Last Updated: November 1, 2023</Text>
          <Text style={styles.tcP}>
            These terms of service ("Terms") constitute a legally binding
            agreement between you ("User" or "You") and Niagara Ride Share
            ("Company," "We," or "Us") governing your use of the Google Maps API
            services provided by Google, Inc. ("Google"). By accessing or using
            Google Maps API services on our website, you acknowledge and agree
            to these Terms. If you do not agree with these Terms, please do not
            use the Google Maps API services on our website.
          </Text>
          <Text style={styles.tcP}>1. Use of Google Maps API Services.</Text>

          <Text style={styles.tcP}>
            <Text style={styles.listItem}>
              a. License: We use Google Maps API services to provide mapping and
              location-based services on our website. Your use of Google Maps
              API services is subject to Google's Terms of Service, which can be
              found at
              <TouchableOpacity onPress={openExternalURL}>
                <Text style={[styles.tcP, {color: 'blue'}]}>
                  Google Maps Terms
                </Text>
              </TouchableOpacity>
              . You are solely responsible for complying with Google's Terms of
              Service.
            </Text>
          </Text>

          <Text style={[styles.listItem, styles.tcP]}>
            b. User Responsibilities: You agree to use Google Maps API services
            only for lawful and legitimate purposes. You shall not use the
            services for any illegal, malicious, or harmful activities,
            including but not limited to, hacking, data scraping, or any
            activities that violate Google's Terms of Service.
          </Text>

          <Text style={styles.tcP}>2. Use of Google Maps API Services.</Text>

          <Text style={[styles.listItem, styles.tcP]}>
            a. Privacy Policy: We collect and process data as described in our
            Privacy Policy. By using Google Maps API services on our website,
            you also acknowledge and accept our Privacy Policy.
          </Text>
          <Text style={[styles.listItem, styles.tcP]}>
            b. Google's Data Collection: Google may collect and process data
            from your use of Google Maps API services as described in their
            Privacy Policy. You are encouraged to review Google's Privacy Policy
            to understand how they collect, use, and protect data.
          </Text>
          <Text style={styles.tcP}>3. Disclaimers.</Text>

          <Text style={[styles.listItem, styles.tcP]}>
            a. Service Availability: We do not guarantee the continuous
            availability of Google Maps API services, as it is provided by
            Google. Service interruptions may occur, and we are not responsible
            for any damages caused by service unavailability.
          </Text>
          <Text style={[styles.listItem, styles.tcP]}>
            b. Accuracy: We strive for accuracy in mapping and location-based
            services, but we do not guarantee the accuracy of the information
            provided by Google Maps API services. You should exercise caution
            and verify critical information.
          </Text>
          <Text style={styles.tcP}>4. Limitation of Liability.</Text>

          <Text style={[styles.listItem, styles.tcP]}>
            You agree that neither Company nor Google shall be liable for any
            direct, indirect, consequential, or incidental damages, including
            but not limited to loss of profits, data, or business interruption,
            arising from your use of Google Maps API services on our website.
          </Text>
          <Text style={styles.tcP}>5. Limitation of Liability.</Text>

          <Text style={[styles.listItem, styles.tcP]}>
            We reserve the right to modify these Terms of Service at any time.
            Changes will be effective when posted on our website. It is your
            responsibility to review the Terms regularly, and your continued use
            of the Google Maps API services on our website constitutes
            acceptance of any changes.
          </Text>
          <Text style={styles.tcP}>6. Contact Information.</Text>

          <Text style={[styles.listItem, styles.tcP]}>
            If you have any questions or concerns about these Terms, please
            contact us at: email@address.com
          </Text>
          <Text style={styles.tcP}>7. Governing Law.</Text>

          <Text style={[styles.listItem, styles.tcP]}>
            These Terms are governed by and construed in accordance with the
            laws of [Your Jurisdiction], without regard to its conflict of laws
            principles. By using Google Maps API services on our website, you
            acknowledge that you have read and understood these Terms and agree
            to be bound by them. Niagara Ride Share 123 Main St, Niagara Falls,
            Ontario P2C C5C
          </Text>
        </ScrollView>

        <TouchableOpacity
          disabled={!this.state.accepted}
          onPress={() => alert('Terms and conditions accepted')}
          style={this.state.accepted ? styles.button : styles.buttonDisabled}>
          <Text style={styles.buttonLabel}>Accept</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    color: colors.darkText,
  },

  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
  listItem: {
    paddingLeft: 10,
    width: '100%',
  },
};

export default TermsAndConditions;
