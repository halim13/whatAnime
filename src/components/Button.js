import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

const Button = (props) => {
	const {nav, title} = props
	return (
    <TouchableRipple
      style={styles.button}
      onPress={nav}
      rippleColor="rgba(0, 0, 0, .3)">
      <Text style={styles.text}>{title}</Text>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2BCE59',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  text: {color: 'white', fontWeight: 'bold', fontSize: 20, alignSelf:'center'},
});

export default Button
