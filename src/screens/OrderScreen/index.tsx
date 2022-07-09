import { View, ScrollView, Text, StyleSheet, SafeAreaView, Alert } from 'react-native'
import React,{useState} from 'react'
import ShowProductWithQuantity from '../../components/show-product-with-quantity'
import { FlatList } from 'react-native-gesture-handler'
import {useSelector,useDispatch} from 'react-redux'
import { selectCartProducts, selectDetailedCart, selectTotalPriceInCart } from '../../redux/selectors/cart.selectors'
import CartListItem from '../../components/cart-list-item'
import RadioBtns from '../../components/radio-btns'
import Button from '../../components/button'
import { useNavigation } from '@react-navigation/native'
import { createOrder } from '../../utils/wordpress.utils'
import { setOrderPaymentMethod, setOrderProductList, setOrderState } from '../../redux/actions/order.actions'
import { selectCurrentOrder, selectOrderState } from '../../redux/selectors/orders.selectors'
import styles from './styles'
import { FAILED, NOT_STARTED, PENDING } from '../../constants/request.constants'
import { orderStates } from '../../redux/reducers/orderReducer'

const OrderScreen = () => {
  const cartList = useSelector(selectDetailedCart());
  const cartTotal = useSelector(selectTotalPriceInCart());
  const currentOrder = useSelector(selectCurrentOrder());
  const dispatch = useDispatch();
  const currentOrderState = useSelector(selectOrderState());
  const navigation = useNavigation();

  const renderCartItem = ({item}) => {
    return (
      <CartListItem item={item}/>
    )
  }
  const handleSubmit = () => {
    if(!currentOrder.data.paymentMethod){
      Alert.alert("please select payment type")
      return;
    }
    const mapedCart = cartList.map((item) => {
      return {
        product_id:item.id,
        quantity:item.cartQuantity
      }
    })
    dispatch(
      setOrderProductList(mapedCart)
    )
    if(currentOrder.data.paymentMethod==='cash'){
      dispatch(setOrderState(orderStates.ORDER_COMPLETED));
    }
    else{
      dispatch(setOrderState(orderStates.SELECT_PAYMENT_PROOF));
    }
    // try{
    //   const order = await createOrder({
    //     line_items: cartList.map(({ id, cartQuantity }) => ({
    //       product_id: id,
    //       quantity:cartQuantity
    //     })),
    //     status:'completed',
    //     fields:{
    //       payment_method:currentOrder.data.paymentType,
    //       payment_proof:currentOrder.data.paymentMethod,
    //       ordered_from:65
    //     }
    //   })
    //   console.log("ordered",order.data)
    // }
    // catch(e){
    //   console.log("error",e)
    // }
  }
  const paymentList = [
    {
      label:"Cash",
      value:"cash"
    },
    {
      label:"Card",
      value:"card"
    },{
      label:"UPI",
      value:"upi"
    }
  ]
  if(currentOrder.status===FAILED)
    return(
      <Text>Re try page</Text>
    )

  if(currentOrder.status===PENDING)
      return (
        <Text>Loading animation</Text>
      )
  if(currentOrderState===orderStates.SELECT_PAYMENT_TYPE)
    return (
      <ScrollView style={styles.root} nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.productListCont}>
              <Text style={styles.title}>Sale Order</Text>
              <SafeAreaView>
                <FlatList
                  data={cartList}
                  renderItem={renderCartItem}
                  keyExtractor={(item) => item.id}
                  style={styles.cartList}
                  nestedScrollEnabled={true}
                />
              </SafeAreaView>
          </View>

          <View style={styles.orderCharges}>
            {
              <>
                <View style={styles.chargeCont}>
                  <Text style={styles.chargeName}>
                    Item Total
                  </Text>
                  <Text style={styles.amount}>
                    ₹{cartTotal}
                  </Text>
                </View>
                <View style={styles.chargeCont}>
                  <Text style={styles.chargeName}>
                    Taxes & Charges
                  </Text>
                  <Text style={styles.amount}>
                    ₹{cartTotal}
                  </Text>
                </View>
              </>
            }
          </View>
          <View style={styles.totalChargesCont}>
            <Text style={styles.totalChargeName}>
              Total Amount
            </Text>
            <Text style={styles.totalChargeAmount}>
              ₹{cartTotal}
            </Text>
          </View>
        </View>
        <View style={[styles.container,styles.paymentType]}>
            <Text style={styles.title}>
              Payment Type
            </Text>
            <RadioBtns 
              handleSelect={(label) => dispatch( setOrderPaymentMethod(label) )}
              list={paymentList}
              style={{
                marginBottom:30,
                marginTop:20
              }}
            />
        </View>
        <View style={[styles.container,styles.btnCont]}>
          <Button label="Back" onPress={() => navigation.navigate("Home")} style={{
            backgroundColor:"#000000",
            flex:1,
            paddingVertical:15
          }}/>
          <Button 
            label="Proceed" 
            onPress={() => handleSubmit()} 
            style={{
              flex:1,
              marginLeft:10,
              justifyContent:'center'
            }}
          />
        </View>
      </ScrollView>
  )

  if(orderStates.SELECT_PAYMENT_PROOF===currentOrderState)
    return(
      <Text> select proof </Text>
    )

  if(orderStates.ORDER_COMPLETED===currentOrderState)
  return(
      <Text> select completed</Text>
  )
}


export default OrderScreen