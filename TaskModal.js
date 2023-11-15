import React from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { Button} from '@rneui/themed'
import styles from "./components/styles";
import DatePicker from "react-native-modern-datepicker";

const TaskModal = ({
  modalVisible,
  task,
  setTask,
  handleAddTask,
  handleCancel,
  validationError,
}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={task.title}
          onChangeText={(text) => setTask({ ...task, title: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={task.description}
          onChangeText={(text) =>
            setTask({
              ...task,
              description: text,
            })
          }
        />

        <Text style={styles.inputLabel}>Deadline:</Text>

        <DatePicker
          style={styles.datePicker}
          mode="date"
          selected={task.deadline}
          onDateChange={(date) => setTask({ ...task, deadline: date })}
        />

        {validationError && (
          <Text style={styles.errorText}>
            Please fill in all fields correctly.
          </Text>
        )}
        
        <TouchableOpacity
          title={task.id ? "Update" : "Add"}
          onPress={handleAddTask}
         color="green"
          style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        <TouchableOpacity
          title="Cancel"
          onPress={handleCancel}
          color="#FF0000"
          style={styles.modalCancel}
        ><Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        
      </View>
    </Modal>
  );
};

export default TaskModal;
