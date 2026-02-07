import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const HomePage = () => {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      title: 'Theory Questions',
      subtitle: 'Practice mock tests',
      icon: '📝',
      gradient: ['#667eea', '#764ba2'] as const,
      route: '/quiz',
    },
    {
      id: 2,
      title: 'Road Signs',
      subtitle: 'Learn UK road signs',
      icon: '🚦',
      gradient: ['#f093fb', '#f5576c'] as const,
      route: '/roadsigns',
    },
    {
      id: 3,
      title: 'Driving Videos',
      subtitle: 'Hazard perception',
      icon: '🎥',
      gradient: ['#4facfe', '#00f2fe'] as const,
      route: null,
    },
    {
      id: 4,
      title: 'Highway Code',
      subtitle: 'Official guidelines',
      icon: '📖',
      gradient: ['#43e97b', '#38f9d7'] as const,
      route: null,
    },
    {
      id: 5,
      title: 'My Thoughts',
      subtitle: 'Journal & notes',
      icon: '💭',
      gradient: ['#fa709a', '#fee140'] as const,
      route: null,
    },
    {
      id: 6,
      title: 'Bookmarks',
      subtitle: 'Saved questions',
      icon: '🔖',
      gradient: ['#ffecd2', '#fcb69f'] as const,
      route: '/bookmarks',
    },
    {
      id: 7,
      title: 'Flashcards',
      subtitle: 'Quick revision',
      icon: '🃏',
      gradient: ['#ffecd2', '#fcb69f'] as const,
      route: '/flashcards',
    }
  ];

  const handlePress = (item: typeof menuItems[0]) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <LinearGradient
          colors={['#f8f9fa', '#e9ecef']}
          style={styles.gradientBackground}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.greeting}>Ready to Learn?</Text>
              <Text style={styles.title}>Driving Theory Test</Text>
              <Text style={styles.subtitle}>Master your UK driving theory exam</Text>
            </View>

            {/* Menu Grid */}
            <View style={styles.gridContainer}>
              {menuItems.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() => handlePress(item)}
                  style={({ pressed }) => [
                    styles.cardWrapper,
                    pressed && styles.cardPressed,
                  ]}
                  android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <LinearGradient
                    colors={item.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                  >
                    <View style={styles.iconContainer}>
                      <Text style={styles.icon}>{item.icon}</Text>
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                      <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <Text style={styles.arrow}>→</Text>
                    </View>
                  </LinearGradient>
                </Pressable>
              ))}
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Questions Practiced</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 16 : 20,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
    marginBottom: 4,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  title: {
    fontSize: 32,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#212529',
    marginBottom: 8,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '400',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  gridContainer: {
    paddingHorizontal: 16,
  },
  cardWrapper: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  cardPressed: {
    opacity: 0.8,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  icon: {
    fontSize: 28,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#ffffff',
    marginBottom: 4,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statNumber: {
    fontSize: 28,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#212529',
    marginBottom: 4,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  statLabel: {
    fontSize: 13,
    color: '#6c757d',
    fontWeight: '500',
    textAlign: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
});