import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Calendar, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const imageWidth = (width - 64) / 2;

const scheduleData = [
  { id: '1', title: 'AP Chemistry Lab', time: '8:30 AM', date: 'Mon, May 24', location: 'Science Lab 301' },
  { id: '2', title: 'Student Council', time: '12:30 PM', date: 'Tue, May 25', location: 'Room 204' },
  { id: '3', title: 'Basketball Practice', time: '3:00 PM', date: 'Wed, May 26', location: 'Main Gym' },
  { id: '4', title: 'Drama Club', time: '4:00 PM', date: 'Thu, May 27', location: 'Auditorium' },
  { id: '5', title: 'Math Club', time: '3:30 PM', date: 'Fri, May 28', location: 'Room 105' },
];

const galleryImages = [
  { id: '1', url: 'https://images.pexels.com/photos/8617769/pexels-photo-8617769.jpeg', title: 'Science Fair' },
  { id: '2', url: 'https://images.pexels.com/photos/8617742/pexels-photo-8617742.jpeg', title: 'Art Exhibition' },
  { id: '3', url: 'https://images.pexels.com/photos/8471991/pexels-photo-8471991.jpeg', title: 'Robotics Club' },
  { id: '4', url: 'https://images.pexels.com/photos/8617962/pexels-photo-8617962.jpeg', title: 'Sports Day' },
];

export default function HomeScreen() {
  const renderScheduleItem = ({ item }: { item: typeof scheduleData[0] }) => (
    <TouchableOpacity style={styles.scheduleItem}>
      <View style={styles.scheduleLeft}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.scheduleRight}>
        <Text style={styles.scheduleTitle}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderGalleryItem = ({ item }: { item: typeof galleryImages[0] }) => (
    <TouchableOpacity style={styles.galleryItem}>
      <Image source={{ uri: item.url }} style={styles.galleryImage} />
      <Text style={styles.galleryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, Student!</Text>
        <Text style={styles.date}>Senior Year 2025</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Calendar size={20} color="#4F46E5" />
            <Text style={styles.sectionTitle}>Your Schedule</Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={scheduleData}
          renderItem={renderScheduleItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.scheduleList}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>School Life</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        <View style={styles.galleryGrid}>
          {galleryImages.map(item => renderGalleryItem({ item }))}
        </View>
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
    padding: 24,
    paddingTop: 16,
    backgroundColor: '#F8FAFC',
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E1B4B',
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6366F1',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E1B4B',
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4F46E5',
    marginRight: 4,
  },
  scheduleList: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scheduleItem: {
    flexDirection: 'row',
    padding: 16,
  },
  scheduleLeft: {
    marginRight: 16,
  },
  timeContainer: {
    alignItems: 'center',
    minWidth: 80,
  },
  time: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4F46E5',
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6366F1',
  },
  scheduleRight: {
    flex: 1,
    justifyContent: 'center',
  },
  scheduleTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E1B4B',
    marginBottom: 4,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6366F1',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E7FF',
    marginLeft: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryItem: {
    width: imageWidth,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  galleryImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  galleryTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E1B4B',
    padding: 12,
  },
});