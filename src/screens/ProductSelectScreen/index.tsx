import { View, Text, ScrollView,FlatList, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import style from "./styles"
import LeftListItem from '../../components/left-list-item'
import CAT_DATA from "../../data/brands"
import PROD_DATA from "../../data/products"
import ProductListItem from '../../components/product-list-item'
import BottomCartShow from '../../components/bottom-cart-show'
import { useDispatch,useSelector } from 'react-redux'
import { loadCategories, loadProducts } from '../../redux/actions/product.actions'
import { selectAllCategories, selectAllProducts } from '../../redux/selectors/product.selector'
import { FAILED, PENDING, SUCCESS } from '../../constants/request.constants'
import { addProductToCart } from '../../redux/actions/cart.actions'
import { selectCartProducts } from '../../redux/selectors/cart.selectors'
import { useNavigation } from '@react-navigation/native';
interface renderProductListItemSchema {
  item:{
      name:string,
      sku:string,
      prices:{
          price:string,
          regular_price:string,
          sale_price:string,
          currency_code:string,
          currency_symbol:string
      },
      images:[
          {
              id:number,
              src:string,
              thumbnail:string
          }
      ]
      categories:[
          {
              name:string,
              id:number,
              slug:string
          }
      ]
  }
}


const ProductSelectScreen = () => {
  const [selectedCategory,setSelectedCategory] = useState(0);
  const [selectedProducts,setSelectedProducts] = useState([]);
  const [ cartEditMode, setCartEditMode ] = useState({
    isActive:false,
    productId:0
  })
  const dispatch = useDispatch();
  const productsList = useSelector(selectAllProducts());
  const categoryList = useSelector(selectAllCategories());
  const cartList = useSelector(selectCartProducts());
  // const selector = useSelector()
  const navigation = useNavigation();
  const renderCategoryListItem = ({item} : {item:{ name:string, id:number }}) => {
    const backgroundColor = selectedCategory === item.id ? "#ffffff":"#f6f5ff"
    const borderLeftColor = selectedCategory === item.id ? "#998cff":"#f6f5ff"

    return (
        <LeftListItem 
            item={item} 
            backgroundColor={{
                backgroundColor,
                borderLeftColor
            }} 
            textColor={{color:"#181818"}} 
            onPress={() => handleCategorySelect(item.id)}
        />
    )
  }
  const getProductQuantityFromCartList = (id) => {
    const isProductInCart = cartList.find( cartItem => cartItem.productId === id);
    return isProductInCart?isProductInCart.quantity:0;
  }
  const renderProductListItem = ({item} : renderProductListItemSchema) => {
    const quantityInCart = getProductQuantityFromCartList(item.id);
    return <ProductListItem item={item} onPress={() => handleProductSelect(item.id)} quantity={quantityInCart}/>
  }
  const handleProductSelect = (id:number) => {
    console.log(id,"product pressed")
    if(getProductQuantityFromCartList(id)<1){
      dispatch(addProductToCart(id));
    }
    setCartEditMode({
      isActive:true,
      productId:id
    })
  }
  const handleCategorySelect = (id : number) => {
    console.log("handle catefory select",id)
    setSelectedCategory(id)
    const tempProduct = productsList.data.filter((item) =>{
        return item.categories.reduce((isPresent,current)=>{
            if(current===id) return true;
            return isPresent
        },false)
    })
    setSelectedProducts(tempProduct)
  }
  useEffect(()=>{
     dispatch(loadProducts(65));
     dispatch(loadCategories())
  },[])
  useEffect(() => {
    if( 
      (categoryList.status===SUCCESS && categoryList.data.length) 
      &&(productsList.status === SUCCESS && productsList.data.length)
    ){
      handleCategorySelect(categoryList.data[0].id)
    }
  },[categoryList,productsList])
  if(categoryList.status===PENDING || productsList.status === PENDING){
    return (
      <View style={style.loader}>
        <ActivityIndicator size="large" color="#8e80ff"/>
      </View>
    )
  }
  if(categoryList.status===FAILED || productsList.status === FAILED){
    return (
      <View style={style.errorCont}>
        {
          categoryList.status === FAILED&&(
            <Text>
              {categoryList.message}
            </Text>
          )
        }
        {
          productsList.status === FAILED&&(
            <Text>
              {productsList.message}
            </Text>
          )
        }
      </View>
    )
  }
  return (
    <View style={style.root}>
      <View style={style.topSection}>
        <View style={style.productCont}>
            <FlatList
                data={categoryList.data}
                renderItem={renderCategoryListItem}
                keyExtractor={(item : {id:number}) => item.id}
                style={style.categoryList}
            />
        </View>
        <View style={style.showProducts}>
            <FlatList
                    data={selectedProducts}
                    renderItem={renderProductListItem}
                    keyExtractor={ (item : {id:number}) => item.id}
                    numColumns={3}
                    columnWrapperStyle={style.productList}
                />
        </View>
      </View>

      {
        cartList.reduce((total,curr)=>{return total+curr.quantity},0)?
        (
          <View style={style.footerCont}>
            <BottomCartShow 
              cartEditMode={cartEditMode} 
              setCartEditMode={setCartEditMode} 
              handleCheckout = {() => navigation.navigate('Order')} 
            />
          </View>
        ):null
      }
    </View>
  )
}

export default ProductSelectScreen