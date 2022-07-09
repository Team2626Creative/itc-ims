import { View, Text,StyleSheet, Image, Pressable } from 'react-native'
import React,{useState} from 'react'
import QuantityCounter from '../quantity-counter'
import Button from '../button'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./style"
import {useSelector, useDispatch} from "react-redux"
import { selectProductFromId } from '../../redux/selectors/product.selector';
import {selectProductQuantityFromId, selectTotalItemsInCart, selectTotalPriceInCart} from "../../redux/selectors/cart.selectors";
import { addProductToCart, removeProductFromCart } from '../../redux/actions/cart.actions'

interface bottomCartShowSchema{
    cartEditMode:{
        isActive:boolean,
        productId:number
    },
    setCartEditMode:()=>void,
    cartList:[]
}
const BottomCartShow = ({cartEditMode,setCartEditMode,handleCheckout}:bottomCartShowSchema) => {
  const currentProduct = useSelector(selectProductFromId(cartEditMode.productId))
  const currentProdQuantity = useSelector( selectProductQuantityFromId(cartEditMode.productId) )
  const totalItems = useSelector( selectTotalItemsInCart());
  const totalPrice = useSelector( selectTotalPriceInCart());
  const dispatch = useDispatch();

  const handleDecreaseQty = () => {
    if(currentProdQuantity===1) {
        setCartEditMode({
            isActive:false,
            productId:0
        });
    }
    dispatch(removeProductFromCart(cartEditMode.productId));
  }
  const handleIncreaseQty = () => {
    dispatch(addProductToCart(cartEditMode.productId));
  }

  return (
    <View style={styles.root}>
        {
            cartEditMode.isActive?(
                <View style={styles.selectedProduct}>
                    <View style={styles.leftSection}>
                        <Image source={{ uri:currentProduct.featured_image?currentProduct.featured_image:"https://itc.2626.today/wp-content/uploads/woocommerce-placeholder.png" }} style={ styles.productImage }/>
                        <Text style={styles.productName}> {currentProduct.name} </Text>
                    </View>
                    <View style={styles.rightSection}>
                        <QuantityCounter 
                            quantity={currentProdQuantity} 
                            increaseQty = {handleIncreaseQty}
                            decreaseQty = {handleDecreaseQty}
                        />
                        <Button label="Add item" onPress={() => setCartEditMode({
                            isActive:false,
                            productId:0
                        })}/>
                    </View>
                </View>
            ):(
                <View style={styles.cartTotal}>
                    <View style={styles.details}>
                        <Text style={styles.mdWhite}> {totalItems} items</Text>
                        <View style={styles.cost}>
                            <Text style={styles.lgWhite}>₹{totalPrice}</Text>
                            <Text style={styles.mdWhite}> plus taxes</Text>
                        </View>
                    </View>
                    <Pressable style={styles.proceedBtn} onPress={handleCheckout}>
                        <View style={styles.proceedBtnContent}>
                            <Text style={styles.proceedBtnText}>Proceed</Text>
                            <Icon name="caret-right" size={30}  style={styles.proceedBtnIcon} />
                        </View>
                    </Pressable>
                </View>
            )
        }
    </View>
  )
}


export default BottomCartShow