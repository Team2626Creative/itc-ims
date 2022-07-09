import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    root:{
        flex:1
    },
    topSection:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:'#ffffff',
        flex:1
    },
    productCont:{
        flex:1,
        marginRight:15
    },
    showProducts:{
        flex:3,
        marginTop:20
    },
    productList:{
    },
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default style;