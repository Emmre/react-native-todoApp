import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';

const App = () => {
  const [search, setSearch] = useState('');

  const [todo, setTodo] = useState([
    {id: 1, task: 'Read the book', isDone: true},
    {id: 2, task: 'Drink water', isDone: false},
  ]);

  const handleChangeInput = e => {
    setSearch(e);
  };

  const addTodo = e => {
    if (search.length) {
      const newTodo = {
        id: Math.random(),
        task: search,
        isDone: false,
      };
      setTodo([...todo, newTodo]);
      setSearch('');
    } else {
      Alert.alert('Please write something...');
    }
  };

  const completeTodo = todoId => {
    const newTodo = todo.map(item => {
      if (item.id === todoId) {
        return {...item, isDone: !item.isDone};
      }
      return item;
    });
    setTodo(newTodo);
  };

  const deleteTodo = todoId => {
    const newTodosItem = todo?.filter(item => item.id != todoId);
    setTodo(newTodosItem);
  };

  const ListItem = ({todo}) => {
    const {id, task, isDone} = todo;
    return (
      <View style={styles.todoList}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: '#000',
              textDecorationLine: isDone ? 'line-through' : 'none',
            }}>
            {task}
          </Text>
        </View>
        <TouchableOpacity onPress={() => completeTodo(id)}>
          <Text style={styles.todoStatus}>
            {isDone ? 'Not Completed' : 'Complete'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(id)}>
          <Text style={styles.todoStatus}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Todo App</Text>
        <View style={styles.inputContent}>
          <TextInput
            style={styles.input}
            placeholder="Please add your todo..."
            onChangeText={e => handleChangeInput(e)}
            value={search}
          />
          <Pressable style={styles.button} onPress={() => addTodo()}>
            <Text style={styles.buttonText}>Add Todo</Text>
          </Pressable>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todo}
          renderItem={({item}) => <ListItem todo={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#2dc44d',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    padding: 4,
    borderRadius: 4,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },

  buttonText: {
    color: '#ffffff',
  },

  inputContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 32,
  },

  input: {
    height: 40,
    marginTop: 16,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    display: 'flex',
    flex: 1,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },

  todoList: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#d7dddb',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    elevation: 12,
    marginVertical: 10,
  },

  todoStatus: {
    fontSize: 16,
    color: '#53605e',
    marginLeft: 30,
    fontWeight: 'bold',
  },
});

export default App;
