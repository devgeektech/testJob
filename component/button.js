import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Button = () => {
  const joinTextOpacity = useRef(new Animated.Value(0)).current;
  const hideLinearGredeint = useRef(new Animated.Value(1)).current;
  const onPressButton = () => {
    Animated.timing(joinTextOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(hideLinearGredeint, {
        toValue: 2,
        duration: 500,
        useNativeDriver: false,
        delay: 500,
      }).start();
    });
  };
  // tick open
  const tickOpacity = joinTextOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const jointTicktextOpacity = joinTextOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  // hide gradient view
  const gradientViewOpacity = hideLinearGredeint.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  //   joined view
  const joinedTextOpacity = hideLinearGredeint.interpolate({
    inputRange: [1, 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Press prototype to see button animation</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressButton}
        style={styles.button}>
        {joinedTextOpacity !== 1 ? (
          <Animated.View
            style={[styles.buttonContainer, {opacity: gradientViewOpacity}]}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#DC3296', '#CC36A0', '#9449D1', '#824EDF']}
              style={styles.linearGradient}>
              <Animated.View style={{opacity: jointTicktextOpacity}}>
                <Text style={[styles.buttonText]}>Join</Text>
              </Animated.View>
              <Animated.Image
                source={require('../resource/checked.png')}
                style={[styles.image, {opacity: tickOpacity}]}
              />
            </LinearGradient>
          </Animated.View>
        ) : (
          <View></View>
        )}
        <Animated.View style={[styles.btn, {opacity: joinedTextOpacity}]}>
          <Text style={[styles.buttonJoinedText]}>Joined</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('10%'),
    maxWidth: wp('70%'),
    textAlign: 'center',
    marginHorizontal: wp('15%'),
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('30%'),
    borderRadius: wp('5%'),
    borderWidth: 1,
    height: hp('5%'),
  },
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('30%'),
    borderRadius: wp('5%'),
    borderWidth: 1,
    height: hp('5%'),
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  buttonJoinedText: {
    color: '#3E3744',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    position: 'absolute',
  },
  image: {
    height: wp('5%'),
    width: wp('5%'),
    position: 'absolute',
    resizeMode: 'contain',
  },
  btn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
