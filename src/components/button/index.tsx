import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface buttonSchema{
    label: string,
    onPress: () => void,
    style?:object
}

const Button = ({label,onPress,style={}}:buttonSchema) => {
  return (
    <Pressable style={[styles.root,style]} onPress={onPress}>
      <Text style={styles.label}> {label} </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    root:{
        backgroundColor:'#8e80ff',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:8
    },
    label:{ 
        fontSize:16,
        color:'#ffffff',
        textAlign:'center'
    }
});
export default Button