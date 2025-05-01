import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Send } from 'lucide-react-native';

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
    let isValid = true;

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Subject validation
    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    // Message validation
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (form.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
    
    // Clear error when typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We will get back to you soon.',
        [{ text: 'OK', onPress: () => setSubmitSuccess(false) }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to send message. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              placeholder="Your full name"
              placeholderTextColor="#A1A1AA"
              value={form.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="Your email address"
              placeholderTextColor="#A1A1AA"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={[styles.input, errors.subject ? styles.inputError : null]}
              placeholder="What is this regarding?"
              placeholderTextColor="#A1A1AA"
              value={form.subject}
              onChangeText={(text) => handleChange('subject', text)}
            />
            {errors.subject ? <Text style={styles.errorText}>{errors.subject}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.textArea, errors.message ? styles.inputError : null]}
              placeholder="Your message here..."
              placeholderTextColor="#A1A1AA"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={form.message}
              onChangeText={(text) => handleChange('message', text)}
            />
            {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>Send Message</Text>
                <Send size={20} color="#FFFFFF" style={styles.sendIcon} />
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoTitle}>Other ways to reach us</Text>
          
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>contact@example.com</Text>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>(123) 456-7890</Text>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>123 University Ave, College Town, ST 12345</Text>
          </View>
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
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
  textArea: {
    fontFamily: 'Inter-Regular',
    height: 120,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
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
  submitButton: {
    height: 56,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendIcon: {
    marginLeft: 8,
  },
  contactInfo: {
    padding: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactInfoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 16,
  },
  contactItem: {
    marginBottom: 16,
  },
  contactLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  contactValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0F172A',
  },
});