import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface LeftListItemSchema {
  onPress:() => void,
  item:{
    name:string
  },
  backgroundColor:{
    backgroundColor:string
  },
  textColor:{
    color:string
  }
}

const LeftListItem = ({onPress,item,backgroundColor,textColor}:LeftListItemSchema) => {

  return (
  <TouchableOpacity onPress={onPress} style={[styles.root, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root:{
    borderBottomColor:'#d1d1d1',
    borderBottomWidth:1,
    borderLeftWidth:3,
    paddingVertical:20,
    paddingHorizontal:5
  },
  title:{
    fontSize:15,
    textAlign:'center',
    
  }
});

export default LeftListItem