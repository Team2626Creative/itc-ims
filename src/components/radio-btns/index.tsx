import { View, Text, StyleSheet, Pressable } from 'react-native';
import React,{useState} from 'react'

interface radioBtnSchema {
    list:[{
        label:string,
        value:string
    }],
    handleSelect:(label:string) => void,
    defaultActive?:string,
    style:object
}
const RadioBtns = ({list, handleSelect,defaultActive,style={}}:radioBtnSchema) => {
  const [activeItem,setActiveItem] = useState(defaultActive);
  const handlePress = (label:string) => {
    handleSelect(label);
    setActiveItem(label);
  }
  return (
    <View style={[styles.root,style]}>
        {
            list.map( item => (
                <Pressable style={styles.item} onPress={() => handlePress(item.label)} key={item.label}>
                    <View style={[styles.radio,(activeItem===item.label?styles.active:{})]}></View>
                    <Text style={styles.label}>{item.label}</Text>
                </Pressable>
            ))
        }
    </View>
  )
}

const styles = StyleSheet.create({
    root:{

    },
    radio:{
        borderColor:"#d1d1d1",
        borderWidth:1,
        borderRadius:50,
        width:20,
        height:20,
        marginRight:10
    },
    item:{
        flexDirection:"row",
        marginVertical:5,
        alignItems:'center',
    },
    label:{
        fontSize:18,
        fontWeight:"600",
        color:"#707070",
    },
    active:{
        backgroundColor:"#20db6f"
    }
})
export default RadioBtns