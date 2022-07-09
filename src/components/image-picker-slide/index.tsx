import { View, Text,Image, Pressable, StyleSheet, Alert } from 'react-native'
import React,{useState} from 'react'
import { RNCamera } from 'react-native-camera'
import { useCamera } from "react-native-camera-hooks"
import Button from '../button'

const ImagePickerSlide = () => {
  const [{cameraRef}, {takePicture}] = useCamera(null)
  const handleClick = async () => {
    try{
      const data = await takePicture();
      console.log("cd",data)
    }
    catch(e){
      Alert.alert(e.message);
    }
  }
  return (
    <View style={style.root}>
      {/* <Text style={style.text}> Take a Picture</Text> */}
      <RNCamera 
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={style.preview}
      >
      </RNCamera>
      <Button
          label="Submit"
          onPress={() => handleClick()}
          style={
            {
              backgroundColor:"#000000",
              width:250,
              paddingVertical:20,
              fontSize:30
            }
          }
        />
    </View>
  )
}

const style = StyleSheet.create({
  preview:{

    width:300,
    height:400,
    borderColor:"#d1d1d1",
    borderWidth:1,
    marginBottom:50,
    borderRadius:10
  },
  text:{
    color:"#707070",
    fontSize:20,
    marginBottom:10
  },
  root:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#ffffff"
  }
})
export default ImagePickerSlide