import React, {useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ImgToBase64 from 'react-native-image-base64'
import Button from '../components/Button'

const HomeScreen = ({navigation}) => {

  const selectImage = async () => {
    ImagePicker.showImagePicker(
      {
        noData: true,
        mediaType: 'photo',
        allowsEditing: false,
      },
      response => {
        // console.log('response = ', response)
        if (response.didCancel) {
          console.log('user cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker error: ', response.error)
        } else if (response.customButton) {
          console.log('user tapped custom button', response.customButton)
        } else {
          const source = {uri: response.uri, type: response.type};
          ImgToBase64.getBase64String(source.uri)
            .then(base64String => {
			  const source64 = `data:${source.type};base64,${base64String}` 
			//   const source64 = `${base64String}`
			  console.log({ source64 })
              navigation.navigate('Detail', {source64})
            })
            .catch(err => console.log(err))
        }
      },
    )
  }

  return (
    <View style={[styles.flex, styles.center]}>
      <Button title="Load Image" nav={() => selectImage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  center: {justifyContent: 'center', alignItems: 'center'},
})

export default HomeScreen
