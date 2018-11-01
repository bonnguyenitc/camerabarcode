/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTesseractOcr from 'react-native-tesseract-ocr';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const tessOptions = {
  whitelist: null, 
  blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};

export default class App extends Component {
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      const nameFile = data.uri.replace('file://', '');
      // CameraRoll.saveToCameraRoll(data.uri).then((a) => {
      //   console.log(nameFile);
      //   this.doOcr(a + nameFile );
      // });
      this.doOcr(nameFile );
      
    }
  };
  doOcr = async (path) => {
    await RNTesseractOcr.recognize(path, 'LANG_VIETNAMESE', tessOptions)
      .then((result) => {
        console.log('OCR Result: ', result);
        alert(`Result : ${result}`);
      })
      .catch((err) => {
        console.log('OCR Error: ', err);
        alert('Lỗi rồi' + err);
      })
      .done();
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
