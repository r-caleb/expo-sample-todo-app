import { useState } from "react";
import { StyleSheet, View, Button, FlatList, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItems from "./components/GoalItems";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);

  function startAddGoalHandler() {
    setModal(true);
  }
  function cancelAddGoalHandler() {
    setModal(false);
  }

  function goalInputHandler(enterText) {
    setText(enterText);
  }
  function addGoalHandler() {
    setGoals((currentGoals) =>
      text
        ? [...currentGoals, { mytext: text, id: Math.random().toString() }]
        : currentGoals
    );
    cancelAddGoalHandler();
    setText("");
  }
  function deleteGoalHandler(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="dark" />

      <View style={styles.appContainer}>
        <SafeAreaView>
          <Button
            title="Add new Goal"
            color="#5e0acc"
            onPress={startAddGoalHandler}
          />
        </SafeAreaView>
        {
          <GoalInput
            visible={modal}
            value={text}
            onChangeText={goalInputHandler}
            onPress={addGoalHandler}
            onCancel={cancelAddGoalHandler}
          />
        }
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItems
                  text={itemData.item.mytext}
                  id={itemData.item.id}
                  onPress={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  goalsContainer: {
    flex: 5,
  },
});
