import { keyword } from 'chalk';
import { func } from 'prop-types';
import React,{useState,useEffect,useRef} from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView, Alert,Keyboard } from 'react-native';
import api from './src/services/api';
// import { Container } from './styles';

export default function App(){
  const [cep,setCep] = useState("")
  const inputRef = useRef(null)
  const [apiResposta,setApiResposta] = useState(null)
  
  async function buscar(){
    if (cep ===""){
      Alert.alert("digite um Cep valido")
      setCep('')
      return
    }else{
      try{
        const response = await api.get(`/${cep}/json`)
        console.log(response.data)
        setApiResposta(response.data)
        Keyboard.dismiss()//fecha o teclado
      }catch(erro){
        Alert.alert(`API viaCep esta fora do ar: ${erro}`)
        
      }
      
    }
  }

  function limpar(){
    setCep('')
    inputRef.current.focus()
    setApiResposta(null)
  }

  return(
    <SafeAreaView style={styles.container}>
    <View style={{alignItems:'center'}}>
      <Text style={styles.text}>Digite o CEP</Text>
      <TextInput
      style={styles.input}
      placeholder='12345678'
      value={cep}
      onChangeText={ (cep)=> setCep(cep)}
      keyboardType="numeric"
      ref={inputRef}
      ></TextInput>
    </View>
    <View style={styles.viewButtons}>
      <TouchableOpacity 
      style={[styles.Buttons,{backgroundColor:'blue'}]}
      onPress={buscar}>
        <Text style={styles.buttonsText}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.Buttons,{backgroundColor:'red'}]}
      onPress={limpar}>
        <Text style={styles.buttonsText}>Limpar</Text>
      </TouchableOpacity>
    </View>
    
    {apiResposta !=null ?  <View style={styles.viewResult}> 
      <Text style={[styles.TextResult,{marginBottom:10,color:'purple'}]}>RESULTADO DA API</Text>
      <Text style={styles.TextResult}>CEP:{apiResposta.cep}</Text>
      <Text style={styles.TextResult}>Logradouro:{apiResposta.logradouro}</Text>
      <Text style={styles.TextResult}>Bairro:{apiResposta.bairro}</Text>
      <Text style={styles.TextResult}>Cidade:{apiResposta.localidade}</Text>
      <Text style={styles.TextResult}>Estado:{apiResposta.uf}</Text>
      </View> : 
      <View style={styles.viewResult}>
        <Text style={[,styles.TextResult,{marginBottom:10,color:'green'}]}>FAÇA SUA BUSCA !</Text>
      </View>
    }
    
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  input:{
    backgroundColor:"#FFF",
    borderWidth:3,
    width:'90%',
    padding:10,
    borderColor:'#DDD',
    borderRadius:5,
    fontSize:18,

  },
  text:{
    marginTop:25,
    marginBottom:25,
    fontSize:25,
    fontWeight:'bold'
  },
  viewButtons:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:15,
    justifyContent:'space-around'
  },
  Buttons:{
    height:50,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    borderRadius:5,
    
    
  },
  buttonsText:{
    fontSize:22,  
    fontWeight:'bold',
    color:'white'
  },
  viewResult:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  TextResult:{
    fontSize:22,
    fontWeight:'bold',

  }
  

})

