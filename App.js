import './shim';
import React from 'react';
import { Text, View } from 'react-native';
import Web3 from 'web3';
var web3 = new Web3('http://192.168.42.105:8545');
var accounts;
web3.eth.getAccounts()
.then((acc)=>{
   accounts = acc;
});

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
       hello
       {accounts[0]}
      </Text>
    </View>
  );
}
