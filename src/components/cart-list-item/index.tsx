import { View, Text,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import QuantityCounter from '../quantity-counter'
import { useDispatch, useSelector } from 'react-redux'
import { removeProductFromCart, addProductToCart, deleteItemFromCart } from '../../redux/actions/cart.actions'
import { selectTotalPriceInCart } from '../../redux/selectors/cart.selectors'
import Icon from 'react-native-vector-icons/FontAwesome';

const CartListItem = ({item}:{
    item:{
        name:string,
        price:{
            display_price:number,
            sale_price:number
        },
        cartQuantity:number,
        id:number,
        featured_image:string
    }
}) => {
  const dispatch = useDispatch()
  const cartTotal = useSelector(selectTotalPriceInCart())
  return (
    <View style={style.root}>
        <View style={style.details}>
            <Text style={style.title}>{item.name}</Text>
            <Text style={style.totalPrice}>₹{parseInt(item.price.display_price)*item.cartQuantity}</Text>
        </View>
        <View style={style.counter}>
            <QuantityCounter 
                quantity={item.cartQuantity}
                decreaseQty={() => dispatch(removeProductFromCart(item.id))}
                increaseQty={() => dispatch(addProductToCart(item.id))}
            />
        </View>
        <Pressable style={style.delete} onPress={() => dispatch( deleteItemFromCart(item.id))}>
                <Icon name="remove" size={20}  style={style.crossBtn} />
            </Pressable>
        </View>
  )
}

const style = StyleSheet.create({
    root:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:15,
        borderBottomColor:"#d1d1d1",
        paddingHorizontal:15,
        borderBottomWidth:1
    },
    details:{
        flex:3
    },
    title:{
        color:"#000000",
        fontSize:16
    },
    counter:{
        flex:2
    },
    delete:{
        paddingVertical:10
    },
    totalPrice:{
        color:"#000000",
        fontSize:16
    },
    crossBtn:{
        color:"#8e80ff"
    }
})

export default CartListItem