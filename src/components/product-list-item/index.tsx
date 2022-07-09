import React from 'react'
import { View , Text, Pressable,Image, StyleSheet } from 'react-native'
import style from '../../screens/ProductSelectScreen/styles'

interface productListSchema {
    item:{
        name:string,
        featured_image:string
    },
    onPress:() => void,
    quantity?:number
}
const ProductListItem = ({item,onPress,quantity=0}:productListSchema) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      {
        quantity?(
          <View style={styles.quantityCont}>
            <Text style={styles.quantity}>{quantity}</Text>
          </View>
        ):null
      }
      <Image source={{uri:item.featured_image?item.featured_image:"https://itc.2626.today/wp-content/uploads/woocommerce-placeholder.png"}} style={styles.image}/>
      <Text style={styles.name}>
        {item.name}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root:{
    flexDirection:"column",
    alignItems:'center',
    // marginHorizontal:5,
    marginHorizontal:5,
    marginBottom:20,
    width:80,
    paddingTop:10
  },
  image:{
    height:100,
    width:70,
    resizeMode:"contain",
    backgroundColor:"#d1d1d1",
    marginBottom:5,
  },
  name:{
    textAlign:'center',
    color:"#000000",
    fontSize:14,
  },
  quantityCont:{
    position:'absolute',
    top:0,
    right:0,
    backgroundColor:'#ff0000',
    zIndex:2,
    borderRadius:20,
    width:20,
    height:20,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  quantity:{
    color:'#ffffff',
    fontWeight:'600'
  }
})
export default ProductListItem