
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handlePress = (value) => {
    if (value === 'C') {
      setInput('');
      setResult(null);
      return;
    }

    if (value === '=') {
      try {
        // Use `eval` with caution, ideally replace with a safer parser for production apps.
        setResult(eval(input));
      } catch {
        setResult('Error');
      }
      return;
    }

    setInput((prev) => prev + value);
  };

  const buttons = [
    ['C', '/', '*', 'DEL'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '(', ')'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{input}</Text>
        {result !== null && <Text style={styles.resultText}>{result}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonValue) => (
              <TouchableOpacity
                key={buttonValue}
                style={styles.button}
                onPress={() =>
                  buttonValue === 'DEL'
                    ? setInput((prev) => prev.slice(0, -1))
                    : handlePress(buttonValue)
                }
              >
                <Text style={styles.buttonText}>{buttonValue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  displayContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 32,
    color: '#000',
  },
  resultText: {
    fontSize: 24,
    color: '#888',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 3,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#d4d4d2',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 70,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});

export default App;

