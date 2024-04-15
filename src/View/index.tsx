import React, { useState } from 'react'; 6.9k (gzipped: 2,7k)
import { View, Text, TextInput, Button, FlatList } from "react-native"

import CepModel from "../Model/CepModel";
import CepController from "../Controller/CepController";

export function Home() {
    const [cep, setCep] = useState<string>("");
    const [ceps, setCeps] = useState<CepModel[]>([]);

    const handleSearch = () => {
        console.log(cep);
        try{
          CepController.fetchCep(cep).then(()=> {
            setCeps([...CepController.getCeps()]);
          });
        } catch (error) {
              console.error("Error fetching data:", error);
        }
    };

    return (
       <View 
         style={{
           flex:1, 
           justifyContent: "center", 
           alignItems: "center", 
           paddingTop: 60, 
           }}
        >
         <TextInput
             style= {{
                width: "95%",
                height: 40, 
                borderColor: 'gray', 
                borderWidth: 1, 
                marginBottom: 10, 
                padding: 5,
            }}
            placeholder= "Digite o cep..."
            onChangeText={(text) => setCep(text)}
            value={cep}
          />
         <Button title="Buscar" onPress={handleSearch} />
         <FlatList
           data={ceps}
           keyExtractor={(item) => item.cep}
           renderItem={({ item }) => (
            <View style={{ marginTop: 20 }}>
                <Text>Cep: {item.cep}</Text>
                <Text>Logradouro: {item.logradouro}</Text>
                <Text>Bairro: {item.bairro}</Text>
                <Text>
                  Cidade/UF:{item.localidade}/{item.uf}
                </Text>  
            </View>    

           )}
         
         />  
       </View>
    );
}
