import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Eye, EyeOff, ArrowRight } from 'lucide-react-native';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid format credentials
      // In a real app, this would be an actual authentication API call
      await AsyncStorage.setItem('userToken', 'demo-token');
      await AsyncStorage.setItem('userData', JSON.stringify({ email }));
      
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Authentication Error', 
        'Failed to sign in. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/6896328/pexels-photo-6896328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
            style={styles.logo}
          />
          <Text style={styles.title}>Senior Capstone Project</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="Your email address"
              placeholderTextColor="#A1A1AA"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.passwordContainer, errors.password ? styles.inputError : null]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Your password"
                placeholderTextColor="#A1A1AA"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                {showPassword ? 
                  <EyeOff size={20} color="#64748B" /> : 
                  <Eye size={20} color="#64748B" />
                }
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <TouchableOpacity 
            style={styles.signInButton} 
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Text style={styles.signInButtonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
            {!isLoading && <ArrowRight size={20} color="#fff" style={styles.buttonIcon} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Alert.alert('Demo Mode', 'Enter any valid email and password (6+ characters) to sign in.')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.demoText}>
            For demo purposes: Use any valid email and password (min 6 characters)
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    height: 56,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0F172A',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#EF4444',
    marginTop: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0F172A',
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  signInButton: {
    height: 56,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  signInButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  forgotPassword: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
    textAlign: 'center',
    marginTop: 24,
  },
  footer: {
    marginTop: 'auto',
  },
  demoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});