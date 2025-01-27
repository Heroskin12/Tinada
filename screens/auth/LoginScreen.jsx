import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ onLogin }) {
  return (
    <LinearGradient colors={["#FF6B6B", "#FFE66D"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Tinada</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Find your musical soulmate</Text>
          <Text style={styles.subText}>Sign in to begin</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.authButton} onPress={onLogin}>
              <Ionicons name="logo-google" size={24} color="black" />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authButton} onPress={onLogin}>
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              <Text style={styles.buttonText}>Continue with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authButton} onPress={onLogin}>
              <Ionicons name="logo-apple" size={24} color="black" />
              <Text style={styles.buttonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
  contentContainer: {
    flex: 3,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  authButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
