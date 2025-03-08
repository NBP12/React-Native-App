// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GLView } from 'expo-gl';

function Car({ carX }) {
  const { scene } = useGLTF('https://threejs.org/examples/models/gltf/Car/glTF/Car.gltf');

  useFrame(() => {
    scene.position.x = carX;
    scene.position.z -= 0.1; // Move forward
  });

  return <primitive object={scene} scale={0.5} />;
}

export default function App() {
  const [carX, setCarX] = useState(0);

  const moveLeft = () => setCarX(carX - 0.5);
  const moveRight = () => setCarX(carX + 0.5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 3D Car Racing Game 🚗</Text>

      <GLView
        style={styles.canvas}
        onContextCreate={(gl) => {
          gl.canvas = gl;
        }}
      >
        <Canvas>
          <ambientLight intensity={0.5} />
          <Car carX={carX} />
        </Canvas>
      </GLView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={moveLeft}>
          <Text style={styles.buttonText}>⬅️ Left</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={moveRight}>
          <Text style={styles.buttonText}>➡️ Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  canvas: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#e62429',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
