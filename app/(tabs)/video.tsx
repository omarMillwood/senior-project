import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Sample video data
const videos = [
  {
    id: '1',
    title: 'Introduction to React Native',
    description: 'Learn the basics of React Native development',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    duration: '3:24',
  },
  {
    id: '2',
    title: 'Advanced Component Design',
    description: 'Create beautiful and reusable components',
    thumbnail: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    duration: '4:15',
  },
  {
    id: '3',
    title: 'State Management in React Native',
    description: 'Mastering state management for mobile apps',
    thumbnail: 'https://images.pexels.com/photos/16129877/pexels-photo-16129877/free-photo-of-coding-on-screen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    duration: '5:42',
  },
  {
    id: '4',
    title: 'Deployment and Publishing',
    description: 'Learn how to deploy your app to app stores',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    duration: '3:58',
  },
];

export default function VideoScreen() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [status, setStatus] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handleVideoSelection = (video) => {
    setSelectedVideo(video);
    // Reset video playback when changing videos
    if (videoRef.current) {
      videoRef.current.stopAsync();
    }
  };

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (status.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const toggleMute = async () => {
    if (videoRef.current) {
      setIsMuted(!isMuted);
      await videoRef.current.setIsMutedAsync(!isMuted);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: selectedVideo.url }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.videoControls}>
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={togglePlayPause}
          >
            {status.isPlaying ? (
              <Pause size={24} color="#FFF" />
            ) : (
              <Play size={24} color="#FFF" />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={toggleMute}
          >
            {isMuted ? (
              <VolumeX size={24} color="#FFF" />
            ) : (
              <Volume2 size={24} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
        <Text style={styles.videoDescription}>{selectedVideo.description}</Text>
      </View>

      <View style={styles.playlistSection}>
        <Text style={styles.playlistTitle}>More Videos</Text>
        {videos.map(video => (
          <TouchableOpacity 
            key={video.id} 
            style={[
              styles.playlistItem,
              selectedVideo.id === video.id && styles.selectedPlaylistItem
            ]}
            onPress={() => handleVideoSelection(video)}
          >
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <View style={styles.playlistItemInfo}>
              <Text style={styles.playlistItemTitle}>{video.title}</Text>
              <Text style={styles.playlistItemDuration}>{video.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  videoContainer: {
    width: width,
    height: width * 9/16,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoControls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  videoInfo: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  videoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0F172A',
    marginBottom: 8,
  },
  videoDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  playlistSection: {
    padding: 24,
  },
  playlistTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedPlaylistItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  playlistItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  playlistItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  playlistItemDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});