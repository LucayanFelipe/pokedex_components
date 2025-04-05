import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const sampleData = [
    {
      id: "1",
      title: "Bulbasaur",
      type: "Grass/Poison",
      weakness: "Fire, Psychic, Flying, Ice",
      evolution: "Ivysaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: "2",
      title: "Charmander",
      type: "Fire",
      weakness: "Water, Ground, Rock",
      evolution: "Charmeleon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      id: "3",
      title: "Squirtle",
      type: "Water",
      weakness: "Electric, Grass",
      evolution: "Wartortle",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    {
      id: "4",
      title: "Pikachu",
      type: "Electric",
      weakness: "Ground",
      evolution: "Raichu",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
    {
      id: "5",
      title: "Jigglypuff",
      type: "Normal/Fairy",
      weakness: "Steel, Poison",
      evolution: "Wigglytuff",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
    },
    {
      id: "6",
      title: "Mewtwo",
      type: "Psychic",
      weakness: "Bug, Ghost, Dark",
      evolution: "Mega Mewtwo X/Y",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setData(sampleData);
      setFilteredData(sampleData);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleButtonPress = () => {
    Alert.alert("Alerta", "Você clicou no botão principal!");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Pokémons</Text>
        <TextInput
          style={styles.input}
          placeholder="Filtrar..."
          value={search}
          onChangeText={handleSearch}
        />
        <Button title="Clique Aqui" onPress={handleButtonPress} />
      </View>


      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>

      {selectedItem && (
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedItem.title}</Text>
            <Image
              source={{ uri: selectedItem.image }}
              style={styles.modalImage}
            />
            <Text>Tipo: {selectedItem.type}</Text>
            <Text>Fraquezas: {selectedItem.weakness}</Text>
            <Text>Evolução: {selectedItem.evolution}</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, backgroundColor: '#f2f2f2' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  content: { flex: 1, paddingHorizontal: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    marginLeft: 12,
    fontSize: 18
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
});

export default App;