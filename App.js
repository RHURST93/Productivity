import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  Image,
} from "react-native";
import TaskList from "./TaskList";
import { Divider } from "@rneui/themed";
import TaskModal from "./TaskModal";
import styles from "./components/styles";

const App = () => {
  // Array of tasks and state
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
    createdAt: "",
  });
  // Modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  // Task currently editing
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false); // Validation flag
  // Function to add a new task or update an existing task
  const handleAddTask = () => {
    if (task.title.trim() !== "" && task.deadline !== "") {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      if (editingTask) {
        // editing
        const updatedTasks = tasks.map((t) =>
          t.id === editingTask.id ? { ...t, ...task } : t
        );
        setTasks(updatedTasks);
        setEditingTask(null);
      } else {
        // new task
        const newTask = {
          id: Date.now(),
          ...task,

          // Set the creation date and time as a string
          createdAt: formattedDate,
        };
        setTasks([...tasks, newTask]);
      }

      // Clear and reset
      setTask({
        title: "",
        description: "",
        status: "Pending",
        deadline: "",
        createdAt: "",
      });

      // Close modal
      setModalVisible(false);

      // Reset validation error
      setValidationError(false);
    } else {
      // Show validation error if no input
      setValidationError(true);
    }
  };

  // Function to handle task editing
  const handleEditTask = (task) => {
    // Set the task
    setEditingTask(task);

    // Pre-fill input with task data
    setTask(task);

    // Open modal for editing
    setModalVisible(true);
  };

  // Function to delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to toggle task to completion
  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status: t.status === "Pending" ? "Completed" : "Pending",
          }
        : t
    );
    setTasks(updatedTasks);
  };

  // Return for rendering component
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/pen.png")}
        style={{
          height: 100,
          width: 100,
          marginLeft: "42%",
          marginBottom: "-5%",
        }}
      />
      <Text style={styles.title}>TrackIt</Text>
      <Divider
        width={6}
        style={{}}
        inset={true}
        insetType="middle"
        color="green"
      />
      <Text
        style={{
          fontSize: 40,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: -1,
        }}
      >
        Productivity
      </Text>

      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleToggleCompletion={handleToggleCompletion}
        handleDeleteTask={handleDeleteTask}
      />
      {/* Button- add or edit*/}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(true);
          setValidationError(false);
        }}
        va
      >
        <Text style={styles.addButtonText}>
          {editingTask ? "Edit Task" : "+"}
        </Text>
      </TouchableOpacity>
      {/* Render TaskModal */}
      <TaskModal
        modalVisible={modalVisible}
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        handleCancel={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(false);
          setValidationError(false);
        }}
        validationError={validationError}
      />
    </View>
  );
};

export default App;
