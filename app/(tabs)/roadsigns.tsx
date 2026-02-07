import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Animated,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type RoadSign = {
  id: string;
  name: string;
  emoji: string;
  category: 'warning' | 'mandatory' | 'prohibitory' | 'informative';
  description: string;
  meaning: string;
  action: string;
};

const roadSigns: RoadSign[] = [
  {
    id: '1',
    name: 'Stop Sign',
    emoji: '🛑',
    category: 'mandatory',
    description: 'Red octagonal sign with white text',
    meaning: 'You must come to a complete stop at the line',
    action: 'Stop completely, check for traffic, and proceed only when safe',
  },
  {
    id: '2',
    name: 'Give Way',
    emoji: '🔻',
    category: 'mandatory',
    description: 'Inverted red triangle with white background',
    meaning: 'You must give priority to traffic on the major road',
    action: 'Slow down and be prepared to stop if necessary',
  },
  {
    id: '3',
    name: 'No Entry',
    emoji: '⛔',
    category: 'prohibitory',
    description: 'Red circle with white horizontal bar',
    meaning: 'You must not enter this road or area',
    action: 'Find an alternative route',
  },
  {
    id: '4',
    name: 'Speed Limit',
    emoji: '🔴',
    category: 'prohibitory',
    description: 'Red circle with number inside',
    meaning: 'Maximum speed allowed on this road',
    action: 'Do not exceed the displayed speed',
  },
  {
    id: '5',
    name: 'Roundabout',
    emoji: '🔄',
    category: 'informative',
    description: 'Blue circle with white arrows',
    meaning: 'Roundabout ahead - traffic circulates clockwise',
    action: 'Give way to traffic from the right and signal appropriately',
  },
  {
    id: '6',
    name: 'Pedestrian Crossing',
    emoji: '🚶',
    category: 'warning',
    description: 'Red triangle with pedestrian symbol',
    meaning: 'Pedestrian crossing ahead',
    action: 'Slow down and be prepared to stop for pedestrians',
  },
  {
    id: '7',
    name: 'School Zone',
    emoji: '👶',
    category: 'warning',
    description: 'Red triangle with children symbol',
    meaning: 'School or children crossing area ahead',
    action: 'Reduce speed and watch for children',
  },
  {
    id: '8',
    name: 'Slippery Road',
    emoji: '⚠️',
    category: 'warning',
    description: 'Red triangle with car skidding symbol',
    meaning: 'Road surface may be slippery',
    action: 'Reduce speed and increase following distance',
  },
  {
    id: '9',
    name: 'No Parking',
    emoji: '🅿️',
    category: 'prohibitory',
    description: 'Red circle with red diagonal line over P',
    meaning: 'Parking is not permitted',
    action: 'Do not stop or park in this area',
  },
  {
    id: '10',
    name: 'One Way',
    emoji: '➡️',
    category: 'informative',
    description: 'Blue rectangle with white arrow',
    meaning: 'Traffic flows in one direction only',
    action: 'Follow the direction indicated by the arrow',
  },
  {
    id: '11',
    name: 'Traffic Lights',
    emoji: '🚦',
    category: 'warning',
    description: 'Red triangle with traffic light symbol',
    meaning: 'Traffic signals ahead',
    action: 'Be prepared to stop if lights are red or amber',
  },
  {
    id: '12',
    name: 'Sharp Bend',
    emoji: '↪️',
    category: 'warning',
    description: 'Red triangle with curved arrow',
    meaning: 'Sharp bend or curve ahead',
    action: 'Reduce speed before the bend',
  },
  {
    id: '13',
    name: 'Two-Way Traffic',
    emoji: '⬌',
    category: 'warning',
    description: 'Red triangle with two-way arrows',
    meaning: 'Two-way traffic crosses your path',
    action: 'Be aware of oncoming traffic',
  },
  {
    id: '14',
    name: 'Height Restriction',
    emoji: '📏',
    category: 'warning',
    description: 'Red triangle or circle with height measurement',
    meaning: 'Low bridge or overhead obstruction',
    action: 'Check your vehicle height before proceeding',
  },
  {
    id: '15',
    name: 'Motorway',
    emoji: '🛣️',
    category: 'informative',
    description: 'Blue rectangle with white motorway symbol',
    meaning: 'Start of motorway regulations',
    action: 'Follow motorway rules - minimum speed, no stopping except emergency',
  },
];

const RoadSignsPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Signs', color: '#6366f1' },
    { id: 'warning', name: 'Warning', color: '#ef4444' },
    { id: 'mandatory', name: 'Mandatory', color: '#3b82f6' },
    { id: 'prohibitory', name: 'Prohibitory', color: '#dc2626' },
    { id: 'informative', name: 'Info', color: '#10b981' },
  ];

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredSigns = selectedCategory === 'all' 
    ? roadSigns 
    : roadSigns.filter(sign => sign.category === selectedCategory);

  const getCategoryColor = (category: string): [string, string] => {
    switch (category) {
      case 'warning': return ['#fef3c7', '#fde047'];
      case 'mandatory': return ['#dbeafe', '#93c5fd'];
      case 'prohibitory': return ['#fee2e2', '#fca5a5'];
      case 'informative': return ['#d1fae5', '#6ee7b7'];
      default: return ['#f3f4f6', '#e5e7eb'];
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>UK Road Signs</Text>
            <Text style={styles.headerSubtitle}>
              {filteredSigns.length} signs
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🚸</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setSelectedCategory(category.id);
              }}
              style={[
                styles.filterChip,
                selectedCategory === category.id && styles.filterChipActive,
              ]}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={selectedCategory === category.id 
                  ? [category.color, category.color] 
                  : ['#ffffff', '#ffffff']
                }
                style={styles.filterChipGradient}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCategory === category.id && styles.filterChipTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Road Signs List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredSigns.map((sign) => {
          const isExpanded = expandedId === sign.id;
          return (
            <TouchableOpacity
              key={sign.id}
              onPress={() => toggleExpand(sign.id)}
              activeOpacity={0.9}
              style={styles.signCardWrapper}
            >
              <LinearGradient
                colors={getCategoryColor(sign.category)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.signCard,
                  isExpanded && styles.signCardExpanded,
                ]}
              >
                {/* Card Header */}
                <View style={styles.signCardHeader}>
                  <View style={styles.signIconContainer}>
                    <Text style={styles.signEmoji}>{sign.emoji}</Text>
                  </View>
                  <View style={styles.signInfo}>
                    <Text style={styles.signName}>{sign.name}</Text>
                    <Text style={styles.signDescription}>{sign.description}</Text>
                  </View>
                  <View style={styles.expandIcon}>
                    <Text style={styles.expandIconText}>
                      {isExpanded ? '▲' : '▼'}
                    </Text>
                  </View>
                </View>

                {/* Expanded Content */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.divider} />
                    
                    <View style={styles.detailSection}>
                      <View style={styles.detailIconContainer}>
                        <Text style={styles.detailIcon}>📖</Text>
                      </View>
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Meaning</Text>
                        <Text style={styles.detailText}>{sign.meaning}</Text>
                      </View>
                    </View>

                    <View style={styles.detailSection}>
                      <View style={styles.detailIconContainer}>
                        <Text style={styles.detailIcon}>✅</Text>
                      </View>
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>What to do</Text>
                        <Text style={styles.detailText}>{sign.action}</Text>
                      </View>
                    </View>

                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>
                        {sign.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerGradient: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#ffffff',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    fontWeight: '500',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerIconText: {
    fontSize: 28,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  filterChipActive: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  filterChipGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  signCardWrapper: {
    marginBottom: 12,
  },
  signCard: {
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  signCardExpanded: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  signCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  signEmoji: {
    fontSize: 32,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  signInfo: {
    flex: 1,
  },
  signName: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#1f2937',
    marginBottom: 4,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  signDescription: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  expandIconText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  expandedContent: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 16,
  },
  detailSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  detailIcon: {
    fontSize: 20,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  detailText: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
    fontWeight: '500',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4b5563',
    letterSpacing: 0.5,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
});

export default RoadSignsPage;