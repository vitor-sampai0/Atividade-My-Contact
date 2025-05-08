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
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]); // Lista de contatos
  const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
  const [newName, setNewName] = useState(""); // Texto da nova contato
  const [newNumber, setNewNumber] = useState(""); // Texto da nova contato
  const [newCategory, setNewCategory] = useState(""); // Texto da nova contato
  const [editIndex, setEditIndex] = useState(null); // Índice da contato em edição

  // Função para adicionar ou editar contato
  function addOrEditContact() {
    if (!newName) return; // Se o campo estiver vazio (sem espaços ou texto), não faz nada

    if (editIndex === null) {
      // Adiciona uma nova contato diretamente ao estado
      contacts.push(newName); // Modifica o array diretamente
    } else {
      // Edita uma contato existente
      contacts[editIndex] = newName; // Atualiza a contato no índice de edição
      setEditIndex(null); // Limpa o índice de edição
    }

    setContacts(contacts); // Atualiza o estado com a lista de contatos modificada
    setNewName(""); // Limpa o campo de texto
    setModalVisible(false); // Fecha o modal
  }

  // Função para confirmar exclusão de contato
  function confirmDelete(index) {
    Alert.alert("Excluir Contato?", `Remover "${contacts[index]}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          contacts.splice(index, 1); // Remove a contato diretamente do array
          setContacts(contacts); // Atualiza o estado com a lista modificada
        },
      },
    ]);
  }

  // Função para abrir o modal em modo de edição
  function openEditModal(index) {
    setNewName(contacts[index]); // Carrega o texto da contato no campo de edição
    setEditIndex(index); // Define o índice da contato a ser editada
    setModalVisible(true); // Abre o modal
  }

  return (
    <View style={styles.container}>
      {/* Botão para abrir o modal */}
      <Pressable
        onPress={() => {
          setNewName("");
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
        keyExtractor={(_, i) => String(i)} // Identificador único para cada item
        renderItem={({ item, index }) => (
          <View style={styles.contactItemContainer}>
            <Text style={styles.contactItem}>{item}</Text>
            <View style={styles.contactButtons}>
              {/* Botões para editar e excluir */}
              <Pressable
                onPress={() => openEditModal(index)} // Abre o modal para editar
                style={[styles.contactButton, styles.editButton]}
              >
                <Text style={styles.buttonText}>✏️</Text>
              </Pressable>
              <Pressable
                onPress={() => confirmDelete(index)} // Exclui a contato
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null
                ? "Digite o nome do Contato:"
                : "Edite a contato:"}
            </Text>
            <TextInput
              value={newName} // O valor do campo de texto é controlado pelo estado `newName`
              onChangeText={setNewName} // Atualiza o estado com o novo texto
              placeholder="Ex: Estudar Hooks"
              style={styles.input}
            />
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null
                ? "Digite o numero do contato:"
                : "Edite a contato:"}
            </Text>
            <TextInput
              value={newNumber} // O valor do campo de texto é controlado pelo estado `newNumber`
              onChangeText={setNewNumber} // Atualiza o estado com o novo texto
              placeholder="Ex: Estudar Hooks"
              style={styles.input}
            />
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null ? "Digite a categoria:" : "Edite a contato:"}
            </Text>
            <List.Section>
            <TouchableOpacity>
              <List.Item
              style={{ marginLeft: 10}}
                title="Pessoal"
                left={() => <FontAwesome6 name="person" size={24} color="black" />}
              />
              </TouchableOpacity>
              <TouchableOpacity>
              <List.Item
              
              style={{ marginLeft: 10 }}
                title="Trabalho"
                left={() => <FontAwesome6 name="briefcase" size={24} color="black" />}
              />
              </TouchableOpacity>
              <TouchableOpacity>
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
              <Text style={{ color: "#6200ee", textAlign: "center" }}>
                {editIndex === null ? "Adicionar" : "Salvar alterações"}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
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
  addButton: {
    marginBottom: 16,
    alignSelf: "center",
    backgroundColor: "#e30613", // Vermelho (Pantone 485)
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
    color: "#f3f",
  },
});
