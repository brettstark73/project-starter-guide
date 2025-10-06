import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Expo!</Text>
      <Text style={styles.subtitle}>Mobile App Starter Template</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>Counter Example</Text>
        <Text style={styles.counterText}>{count}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonDecrement]}
            onPress={() => setCount(count - 1)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonIncrement]}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.buttonReset]}
          onPress={() => setCount(0)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instructions}>
        Edit App.tsx to start building your app
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonIncrement: {
    backgroundColor: '#10b981',
  },
  buttonDecrement: {
    backgroundColor: '#ef4444',
  },
  buttonReset: {
    backgroundColor: '#6b7280',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  instructions: {
    marginTop: 40,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
