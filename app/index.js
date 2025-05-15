// app/index.js
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { List, MD3Colors } from "react-native-paper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
export default function HomeScreen() {
  const [contacts, setContacts] = useState([]); // Lista de contatos
  const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
  const [newName, setNewName] = useState(""); // Texto da nova contato
  const [newNumber, setNewNumber] = useState(""); // Texto da nova contato
  const [newCategory, setNewCategory] = useState(""); // Texto da nova contato
  const [editIndex, setEditIndex] = useState(null); // Índice da contato em edição
  const [originalContact, setOriginalContact] = useState(null); // Contato original antes de edição

  // Função para adicionar ou editar contato
  function addOrEditContact() {
    if (!newName) return; // Se o campo estiver vazio (sem espaços ou texto), não faz nada

    if (editIndex === null) {
      // Adiciona um novo contato ao estado
      const newContact = {
        name: newName,
        number: newNumber,
        category: newCategory,
      };
      setContacts([...contacts, newContact]);
    } else {
      // Edita um contato existente
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = {
        name: newName,
        number: newNumber,
        category: newCategory,
      };
      setContacts(updatedContacts);
      setEditIndex(null);
    }

    // Limpa os campos e fecha o modal
    setNewName("");
    setNewNumber("");
    setNewCategory("");
    setModalVisible(false);
  }

  // Função para confirmar exclusão de contato
  function confirmDelete(index) {
    Alert.alert("Excluir Contato?", `Remover "${contacts[index].name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const updatedContacts = contacts.filter((_, i) => i !== index);
          setContacts(updatedContacts);
        },
      },
    ]);
  }

  // Função para abrir o modal em modo de edição
  function openEditModal(index) {
    const contact = contacts[index];
    setOriginalContact(contact); // Armazena o contato original
    setNewName(contact.name);
    setNewNumber(contact.number);
    setNewCategory(contact.category);
    setEditIndex(index);
    setModalVisible(true);
  }

  // Função para fechar o modal e restaurar os valores originais
  function cancelEdit() {
    if (originalContact) {
      setNewName(originalContact.name);
      setNewNumber(originalContact.number);
      setNewCategory(originalContact.category);
    }
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* Botão para abrir o modal */}
      <Pressable
        onPress={() => {
          setNewName("");
          setNewNumber("");
          setNewCategory("");
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Novo Contato</Text>
      </Pressable>

      {/* Lista de contatos */}
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <View style={styles.contactItemContainer}>
            <Text style={styles.contactItem}>
              {item.name}
            </Text>
            <View style={styles.contactButtons}>
              {/* Botões para editar e excluir */}
              <Pressable
                onPress={() => openEditModal(index)}
                style={[styles.contactButton, styles.editButton]}
              >
                <Text style={styles.buttonText}>✏️</Text>
              </Pressable>
              <Pressable
                onPress={() => confirmDelete(index)}
                style={[styles.contactButton, styles.deleteButton]}
              >
                <Text style={styles.buttonText}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma Contato ainda!</Text>
        }
      />

      {/* Modal para adicionar ou editar contato */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={cancelEdit} // Chama cancelEdit ao fechar o modal
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null
                ? "Digite o nome do Contato:"
                : "Edite o nome do contato:"}
            </Text>
            <TextInput
              value={newName}
              keyboardType="default"
              onChangeText={setNewName}
              placeholder="Nome do seu contato"
              style={styles.input}
            />
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null
                ? "Digite o numero do contato:"
                : "Edite o número do contato:"}
            </Text>
            <TextInput
              keyboardType="numeric"
              value={newNumber}
              onChangeText={setNewNumber}
              placeholder="Número do seu contato"
              style={styles.input}
            />
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null
                ? "Escolha a categoria:"
                : "Edite a categoria:"}
            </Text>
            <List.Section>
              <TouchableOpacity
                onPress={() => setNewCategory("Pessoal")}
                style={[
                  styles.categoryButton,
                  newCategory === "Pessoal" && styles.selectedCategoryButton,
                ]}
              >
                <List.Item
                  style={{ marginLeft: 10 }}
                  title="Pessoal"
                  left={() => (
                    <FontAwesome6 name="person" size={24} color="black" />
                  )}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewCategory("Trabalho")}
                style={[
                  styles.categoryButton,
                  newCategory === "Trabalho" && styles.selectedCategoryButton,
                ]}
              >
                <List.Item
                  style={{ marginLeft: 10 }}
                  title="Trabalho"
                  left={() => (
                    <FontAwesome6 name="briefcase" size={24} color="black" />
                  )}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewCategory("Família")}
                style={[
                  styles.categoryButton,
                  newCategory === "Família" && styles.selectedCategoryButton,
                ]}
              >
                <List.Item
                  style={{ marginLeft: 10 }}
                  title="Família"
                  left={() => (
                    <FontAwesome6 name="people-line" size={24} color="black" />
                  )}
                />
              </TouchableOpacity>
            </List.Section>
            <Pressable onPress={addOrEditContact} style={{ marginBottom: 8 }}>
              <Text style={{ color: "#3774d4", textAlign: "center" }}>
                {editIndex === null ? "Adicionar" : "Salvar alterações"}
              </Text>
            </Pressable>
            <Pressable onPress={cancelEdit}>
              <Text style={{ color: "#999", textAlign: "center" }}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryButton: {
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
    marginBottom: 8,
  },
  selectedCategoryButton: {
    backgroundColor: "#3774d4", 
  },
  addButton: {
    marginBottom: 16,
    alignSelf: "center",
    backgroundColor: "#523f9e", // Vermelho (Pantone 485)
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  contactItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
  },
  contactItem: {
    flex: 1,
    fontSize: 16,
  },
  contactButtons: {
    flexDirection: "row",
  },
  contactButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: "#ffca28", // Cor de edição (amarelo)
  },
  deleteButton: {
    backgroundColor: "#f44336", // Cor de exclusão (vermelho)
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#666",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo escuro com transparência
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
    color: "#3774d4",
  },
});
