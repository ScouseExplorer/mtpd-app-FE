import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HomePage = () => {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      title: 'Theory Questions',
      subtitle: 'Practice mock tests',
      icon: '📝',
      gradient: ['#667eea', '#764ba2'] as const,
      href: '/quiz',
    },
    {
      id: 2,
      title: 'Road Signs',
      subtitle: 'Learn UK road signs',
      icon: '🚦',
      gradient: ['#f093fb', '#f5576c'] as const,
      href: null,
    },
    {
      id: 3,
      title: 'Driving Videos',
      subtitle: 'Hazard perception',
      icon: '🎥',
      gradient: ['#4facfe', '#00f2fe'] as const,
      href: null,
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
      href: '/bookmarks',
    },
    {
      id: 7,
      title: 'Flashcards',
      subtitle: 'Official Question',
      icon: '🃏',
      gradient: ['#ffecd2', '#a89ffc'] as const,
      href: '/null',
    },
  ];

  const handlePress = (item: typeof menuItems[0]) => {
    if (item.href) {
      router.push(item.href as any);
    }
  };

  return (
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
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>→</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </View>

        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
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
    paddingTop: 20,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '400',
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
    transform: [{ scale: 0.98 }],
  },
  card: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    minHeight: 100,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6c757d',
    fontWeight: '500',
    textAlign: 'center',
  },
});