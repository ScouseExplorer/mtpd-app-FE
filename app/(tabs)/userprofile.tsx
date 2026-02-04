import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.avatar} 
          />
          <Text style={styles.userName}>Alex Thompson</Text>
          <Text style={styles.userTag}>@alex_dev</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>124</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={[styles.statBox, styles.borderLeft]}>
            <Text style={styles.statNumber}>25k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        {/* Menu/Settings Section */}
        <View style={styles.menuWrapper}>
          <MenuItem icon="settings-outline" text="Settings" />
          <MenuItem icon="card-outline" text="Billing Details" />
          <MenuItem icon="share-social-outline" text="Invite Friends" />
          <MenuItem icon="log-out-outline" text="Logout" color="#FF3B30" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Sub-component for Menu Items
const MenuItem = ({ icon, text, color = '#000' }: { icon: ComponentProps<typeof Ionicons>['name']; text: string; color?: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemContent}>
      <Ionicons name={icon as any} size={22} color={color} />
      <Text style={[styles.menuText, { color }]}>{text}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#CCC" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  userName: { fontSize: 22, fontWeight: 'bold' },
  userTag: { fontSize: 14, color: 'gray', marginBottom: 15 },
  editButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  editButtonText: { color: '#fff', fontWeight: '600' },
  statsContainer: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#EEE', marginVertical: 20 },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 15 },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#EEE' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: 'gray' },
  menuWrapper: { marginTop: 10 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: '#EEE' },
  menuItemContent: { flexDirection: 'row', alignItems: 'center' },
  menuText: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
});

export default ProfileScreen;