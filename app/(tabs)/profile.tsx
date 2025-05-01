import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { LogOut, ChevronRight, Bell, Moon, Lock, CircleHelp as HelpCircle, Settings } from 'lucide-react-native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState({ email: 'user@example.com' });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    // Fetch user data from storage
    const getUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              // Clear user session data
              await AsyncStorage.removeItem('userToken');
              
              // Navigate to sign-in screen
              router.replace('/sign-in');
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleToggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    // In a real app, this would apply the theme change
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>User Profile</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
              <Bell size={20} color="#3B82F6" />
            </View>
            <Text style={styles.settingLabel}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={notificationsEnabled ? '#3B82F6' : '#F3F4F6'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: '#F8FAFC' }]}>
              <Moon size={20} color="#64748B" />
            </View>
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={handleToggleDarkMode}
            trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
            thumbColor={darkModeEnabled ? '#3B82F6' : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer, { backgroundColor: '#FEF2F2' }]}>
              <Lock size={20} color="#EF4444" />
            </View>
            <Text style={styles.menuItemLabel}>Privacy & Security</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0F9FF' }]}>
              <HelpCircle size={20} color="#0EA5E9" />
            </View>
            <Text style={styles.menuItemLabel}>Help & Support</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer, { backgroundColor: '#F5F5F5' }]}>
              <Settings size={20} color="#64748B" />
            </View>
            <Text style={styles.menuItemLabel}>App Settings</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.copyrightText}>Senior Capstone Project © 2025</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: '#F8FAFC',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#0F172A',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#0F172A',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#0F172A',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  copyrightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
});