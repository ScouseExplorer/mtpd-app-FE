import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  category: 'rules' | 'safety' | 'signs' | 'maneuvers';
  difficulty: 'easy' | 'medium' | 'hard';
};

const flashcards: Flashcard[] = [
  {
    id: '1',
    question: 'What is the national speed limit on a single carriageway road for cars?',
    answer: '60 mph. This applies unless road signs show a lower limit. Always adjust your speed to road and weather conditions.',
    category: 'rules',
    difficulty: 'easy',
  },
  {
    id: '2',
    question: 'What does a solid white line along the center of the road mean?',
    answer: 'You must not cross or straddle it unless entering/leaving a side road, passing a stationary vehicle, or overtaking a cyclist, horse, or road maintenance vehicle moving at 10 mph or less.',
    category: 'rules',
    difficulty: 'medium',
  },
  {
    id: '3',
    question: 'What is the minimum tread depth required for car tyres in the UK?',
    answer: '1.6mm across the central three-quarters of the tread width and around the entire outer circumference. Driving with illegal tyres can result in a fine and penalty points.',
    category: 'safety',
    difficulty: 'easy',
  },
  {
    id: '4',
    question: 'At a pelican crossing, what does a flashing amber light mean?',
    answer: 'You must give way to pedestrians already on the crossing, but you may proceed if the crossing is clear. Always approach with caution.',
    category: 'rules',
    difficulty: 'medium',
  },
  {
    id: '5',
    question: 'What should you do if your vehicle starts to aquaplane?',
    answer: 'Ease off the accelerator gradually. Do not brake suddenly or turn the steering wheel sharply. Hold the steering wheel firmly and allow the vehicle to slow down naturally.',
    category: 'safety',
    difficulty: 'hard',
  },
  {
    id: '6',
    question: 'How far should you stay behind the vehicle in front in good dry conditions?',
    answer: 'At least 2 seconds (a 2-second gap). Use the "only a fool breaks the two-second rule" method. In wet conditions, double this to 4 seconds.',
    category: 'safety',
    difficulty: 'easy',
  },
  {
    id: '7',
    question: 'What does a red triangle warning sign indicate?',
    answer: 'It warns of a hazard ahead. The pictogram inside the triangle shows the type of hazard (e.g., bends, junctions, pedestrians). Slow down and be prepared.',
    category: 'signs',
    difficulty: 'easy',
  },
  {
    id: '8',
    question: 'When are you allowed to use your horn in a built-up area?',
    answer: 'Only between 7am and 11:30pm, and only when another road user poses a danger. Never use your horn to attract attention or show annoyance.',
    category: 'rules',
    difficulty: 'medium',
  },
  {
    id: '9',
    question: 'What is the correct procedure for a hill start?',
    answer: 'Apply the handbrake, select first gear, set the gas (revs), find the biting point with the clutch, release the handbrake, and smoothly release the clutch while applying more gas.',
    category: 'maneuvers',
    difficulty: 'medium',
  },
  {
    id: '10',
    question: 'What should you do before opening your car door?',
    answer: 'Check mirrors and blind spots for cyclists, pedestrians, and other vehicles. Use the "Dutch Reach" method (open with your far hand) to naturally turn your body and check.',
    category: 'safety',
    difficulty: 'easy',
  },
];

const FlashcardsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [filter, setFilter] = useState<'all' | 'rules' | 'safety' | 'signs' | 'maneuvers'>('all');

  const flipCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCards = filter === 'all' 
    ? flashcards 
    : flashcards.filter(card => card.category === filter);

  const nextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setFlippedCards({});
  };

  const currentCard = filteredCards[currentIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rules': return ['#dbeafe', '#93c5fd'] as const;
      case 'safety': return ['#fef3c7', '#fde047'] as const;
      case 'signs': return ['#fce7f3', '#f9a8d4'] as const;
      case 'maneuvers': return ['#d1fae5', '#6ee7b7'] as const;
      default: return ['#f3f4f6', '#e5e7eb'] as const;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '📚' },
    { id: 'rules', name: 'Rules', icon: '📋' },
    { id: 'safety', name: 'Safety', icon: '🛡️' },
    { id: 'signs', name: 'Signs', icon: '🚸' },
    { id: 'maneuvers', name: 'Maneuvers', icon: '🚗' },
  ];

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
            <Text style={styles.headerTitle}>Driving Flashcards</Text>
            <Text style={styles.headerSubtitle}>
              {filteredCards.length} essential questions
            </Text>
          </View>
          <TouchableOpacity onPress={resetProgress} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>🔄</Text>
          </TouchableOpacity>
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
                setFilter(category.id as any);
                setCurrentIndex(0);
              }}
              style={[
                styles.categoryChip,
                filter === category.id && styles.categoryChipActive,
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryText,
                  filter === category.id && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {filteredCards.length}
        </Text>
      </View>

      {/* Flashcard */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          onPress={() => flipCard(currentCard.id)}
          activeOpacity={0.9}
          style={styles.cardTouchable}
        >
          <LinearGradient
            colors={getCategoryColor(currentCard.category) as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <ScrollView 
              style={styles.cardScrollView}
              contentContainerStyle={styles.cardContent}
              showsVerticalScrollIndicator={true}
              scrollEnabled={true}
              nestedScrollEnabled={true}
            >
              {/* Category Badge */}
              <View style={styles.badges}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>
                    {currentCard.category.toUpperCase()}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(currentCard.difficulty) }
                  ]}
                >
                  <Text style={styles.difficultyBadgeText}>
                    {currentCard.difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Card Side */}
              <View style={styles.cardTextContainer}>
                {!flippedCards[currentCard.id] ? (
                  <>
                    <Text style={styles.questionLabel}>QUESTION</Text>
                    <Text style={styles.questionText}>{currentCard.question}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.answerLabel}>ANSWER</Text>
                    <Text style={styles.answerText}>{currentCard.answer}</Text>
                  </>
                )}
              </View>

              <View style={styles.tapHint}>
                <Text style={styles.tapHintText}>
                  {!flippedCards[currentCard.id] ? '👆 Tap to reveal answer' : ''}
                </Text>
              </View>
            </ScrollView>
          </LinearGradient>
        </TouchableOpacity>

        {/* Flip Indicator */}
        <View style={styles.flipIndicator}>
          <View style={[styles.flipDot, !flippedCards[currentCard.id] && styles.flipDotActive]} />
          <View style={[styles.flipDot, flippedCards[currentCard.id] && styles.flipDotActive]} />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={previousCard}
          disabled={currentIndex === 0}
          style={[
            styles.navButton,
            currentIndex === 0 && styles.navButtonDisabled,
          ]}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={currentIndex === 0 ? ['#e5e7eb', '#d1d5db'] : ['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.navButtonGradient}
          >
            <Text style={styles.navButtonText}>← Previous</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={nextCard}
          disabled={currentIndex === filteredCards.length - 1}
          style={[
            styles.navButton,
            currentIndex === filteredCards.length - 1 && styles.navButtonDisabled,
          ]}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={currentIndex === filteredCards.length - 1 ? ['#e5e7eb', '#d1d5db'] : ['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.navButtonGradient}
          >
            <Text style={styles.navButtonText}>Next →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsIcon}>💡</Text>
        <Text style={styles.tipsText}>
          Study tip: Try to answer before flipping. Repeat cards you find difficult!
        </Text>
      </View>
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
  resetButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  resetButtonText: {
    fontSize: 24,
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
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#4f46e5',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  categoryText: {
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
  categoryTextActive: {
    color: '#ffffff',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressText: {
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
  cardContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24, // Increased from 8 to give more space
    maxHeight: 400, // Reduced from 450 to make room for buttons
  },
  cardTouchable: {
    width: '100%',
    flex: 1,
    minHeight: 300,
  },
  card: {
    borderRadius: 24,
    flex: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardScrollView: {
    flex: 1,
  },
  cardContent: {
    padding: 24,
    paddingBottom: 40, // Extra padding at bottom for scroll
    flexGrow: 1, // Changed from minHeight
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
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
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  cardTextContainer: {
    marginBottom: 24,
    flexShrink: 1, // Allow text to shrink
  },
  questionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    marginBottom: 16,
    letterSpacing: 1,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  questionText: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '700' : 'bold',
    color: '#1f2937',
    lineHeight: 26,
    flexShrink: 1, // Allow text to wrap
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  answerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 16,
    letterSpacing: 1,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  answerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    lineHeight: 24,
    flexShrink: 1, // Allow text to wrap
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  tapHint: {
    alignItems: 'center',
    paddingTop: 8,
  },
  tapHintText: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
  flipIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20, // Increased from 16 to add more space
  },
  flipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  flipDotActive: {
    backgroundColor: '#6366f1',
    width: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16, // Increased from 12 for more breathing room
    gap: 12,
    marginTop: 8, // Added margin to push buttons down
  },
  navButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 8, // Added margin top
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  tipsIcon: {
    fontSize: 24,
    marginRight: 12,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
      },
    }),
  },
  tipsText: {
    flex: 1,
    fontSize: 13,
    color: '#92400e',
    fontWeight: '500',
    lineHeight: 18,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        includeFontPadding: false,
      },
    }),
  },
});

export default FlashcardsPage;