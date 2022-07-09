import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import style from '../../screens/ProductSelectScreen/styles'

interface quantityCounterSchema {
    increaseQty:() => void,
    decreaseQty:() => void,
    quantity:number,
    upperLimit?:number
}
const QuantityCounter = ({decreaseQty,increaseQty,quantity,upperLimit}:quantityCounterSchema) => {

  return (
    <View style={styles.root}>
      <Pressable onPress={decreaseQty} style={styles.minus}>
        <Text style={styles.btns}>-</Text>
      </Pressable>
      <Text style={styles.num}>{quantity}</Text>
      <Pressable onPress={increaseQty} style={styles.plus}>
        <Text style={styles.btns}>+</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    root:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:90,
        borderWidth:1,
        borderColor:'#212121',
        borderRadius:8,
    },
    plus:{
        width:30,
        flexDirection:'row',
        paddingVertical:10,
        justifyContent:'center',
        
    },
    minus:{
        width:30,
        paddingVertical:10,
        justifyContent:'center',
        flexDirection:'row'
    },
    btns:{
        fontSize:16,
        color:'#212121',
        fontWeight:'600'
    },
    num:{
        fontSize:16,
        color:'#212121'
    }
})
export default QuantityCounter