import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    CheckCircle2,
    XCircle,
    RotateCcw,
    Award,
    Car,
    AlertTriangle,
    MapPin,
    BookOpen,
    ArrowRight,
    Home,
} from 'lucide-react-native';

type QuizQuestion = {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
};

type QuizType = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    questions: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    quizData: QuizQuestion[];
};

const quizTypes: QuizType[] = [
    {
        id: 'road-signs',
        title: 'Road Signs & Signals',
        description: 'Test your knowledge of traffic signs, signals, and road markings',
        icon: <AlertTriangle size={32} color="#EF4444" />,
        color: '#EF4444',
        questions: 8,
        difficulty: 'Beginner',
        quizData: [
            { id: 1, question: 'What does a red octagonal sign indicate?', options: ['Yield', 'Stop', 'Caution', 'No Entry'], correctAnswer: 1, explanation: 'A red octagonal (8-sided) sign always means STOP. You must come to a complete stop.' },
            { id: 2, question: 'What does a yellow diamond-shaped sign typically indicate?', options: ['Construction zone', 'Warning or caution', 'School zone', 'Hospital nearby'], correctAnswer: 1, explanation: 'Yellow diamond-shaped signs are warning signs that alert drivers to potential hazards ahead.' },
            { id: 3, question: 'What does a triangular sign pointing down mean?', options: ['Stop', 'Yield', 'Merge', 'One way'], correctAnswer: 1, explanation: 'A downward-pointing triangle is a yield sign, meaning you must slow down and give right-of-way.' },
            { id: 4, question: 'What does a flashing yellow traffic light mean?', options: ['Stop', 'Proceed with caution', 'Speed up', 'Yield to pedestrians only'], correctAnswer: 1, explanation: 'A flashing yellow light means proceed with caution and be prepared to stop if necessary.' },
            { id: 5, question: 'What does a white rectangular sign typically indicate?', options: ['Warning', 'Regulatory rule', 'Guide information', 'Construction'], correctAnswer: 1, explanation: 'White rectangular signs display regulatory information and traffic laws you must obey.' },
            { id: 6, question: 'What does a green sign typically provide?', options: ['Warnings', 'Regulations', 'Directional/guide information', 'Construction zones'], correctAnswer: 2, explanation: 'Green signs provide directional and guide information like distances and destinations.' },
            { id: 7, question: 'What does a flashing red traffic light mean?', options: ['Slow down', 'Treat it as a stop sign', 'Proceed with caution', 'Yield'], correctAnswer: 1, explanation: 'A flashing red light means the same as a stop sign - come to a complete stop.' },
            { id: 8, question: 'What does an orange sign indicate?', options: ['School zone', 'Work zone/construction', 'Hospital', 'Railroad'], correctAnswer: 1, explanation: 'Orange signs indicate work zones, construction areas, or temporary traffic control.' },
        ],
    },
    {
        id: 'traffic-rules',
        title: 'Traffic Rules & Laws',
        description: 'Master the essential rules of the road and traffic regulations',
        icon: <BookOpen size={32} color="#3B82F6" />,
        color: '#3B82F6',
        questions: 8,
        difficulty: 'Intermediate',
        quizData: [
            { id: 1, question: 'At what distance should you start signaling before making a turn?', options: ['50 feet', '100 feet', '150 feet', '200 feet'], correctAnswer: 1, explanation: 'You should signal at least 100 feet before turning to give other drivers adequate notice.' },
            { id: 2, question: 'What is the safest following distance in normal conditions?', options: ['1 second', '2 seconds', '3 seconds', '5 seconds'], correctAnswer: 2, explanation: 'The 3-second rule is recommended for safe following distance in normal driving conditions.' },
            { id: 3, question: 'When should you use your high beam headlights?', options: ['In city traffic', 'When following another vehicle', 'On open roads with no oncoming traffic', 'Never'], correctAnswer: 2, explanation: "High beams should only be used on open roads when there's no oncoming traffic within 500 feet." },
            { id: 4, question: 'What should you do when approaching a yellow traffic light?', options: ['Speed up to get through', 'Stop if safe to do so', 'Honk your horn', 'Always stop immediately'], correctAnswer: 1, explanation: 'Yellow means caution. You should stop if you can do so safely; otherwise proceed with caution.' },
            { id: 5, question: 'On a highway, which lane is typically for passing?', options: ['Right lane', 'Left lane', 'Middle lane', 'Any lane'], correctAnswer: 1, explanation: 'The left lane is designated for passing. Keep right except to pass.' },
            { id: 6, question: 'At a 4-way stop, who has the right of way?', options: ['Largest vehicle', 'First to arrive', 'Vehicle on the right', 'First to honk'], correctAnswer: 1, explanation: 'At a 4-way stop, the first vehicle to arrive has the right of way. If simultaneous, yield to the right.' },
            { id: 7, question: 'What is the maximum blood alcohol concentration (BAC) legal limit for drivers over 21?', options: ['0.05%', '0.08%', '0.10%', '0.15%'], correctAnswer: 1, explanation: 'The legal BAC limit is 0.08% for drivers 21 and older in most states.' },
            { id: 8, question: 'When can you legally pass a school bus with flashing red lights?', options: ['When it\'s safe', 'When moving slowly', 'Never, you must stop', 'Only on highways'], correctAnswer: 2, explanation: 'You must stop for a school bus with flashing red lights and remain stopped until the lights stop flashing.' },
        ],
    },
    {
        id: 'parking',
        title: 'Parking & Maneuvering',
        description: 'Perfect your parking skills and vehicle maneuvering techniques',
        icon: <Car size={32} color="#22C55E" />,
        color: '#22C55E',
        questions: 8,
        difficulty: 'Beginner',
        quizData: [
            { id: 1, question: 'When parallel parking, your vehicle should be within how many inches from the curb?', options: ['6 inches', '12 inches', '18 inches', '24 inches'], correctAnswer: 1, explanation: 'When parallel parking, your vehicle should be within 12 inches (or one foot) of the curb.' },
            { id: 2, question: 'When parking uphill with a curb, which way should you turn your wheels?', options: ['Away from the curb', 'Toward the curb', 'Straight', 'Either way'], correctAnswer: 0, explanation: 'When parking uphill with a curb, turn wheels away from the curb so the car rolls back into the curb if it moves.' },
            { id: 3, question: 'When parking downhill, which way should you turn your wheels?', options: ['Away from the curb', 'Toward the curb', 'Straight', 'Left only'], correctAnswer: 1, explanation: 'When parking downhill, turn wheels toward the curb so the car rolls into the curb if it moves.' },
            { id: 4, question: 'How far from a fire hydrant must you park?', options: ['5 feet', '10 feet', '15 feet', '20 feet'], correctAnswer: 2, explanation: 'You must park at least 15 feet away from a fire hydrant to allow emergency access.' },
            { id: 5, question: 'What is the first step when parallel parking?', options: ['Turn the wheel', 'Signal and pull alongside the front car', 'Back up immediately', 'Turn on hazards'], correctAnswer: 1, explanation: 'First, signal and pull alongside the vehicle in front of the space, aligning your mirrors.' },
            { id: 6, question: 'When performing a three-point turn, what should you check first?', options: ['Your mirrors only', 'Traffic in both directions', 'Your blind spot only', 'The curb'], correctAnswer: 1, explanation: 'Always check for traffic in both directions before beginning a three-point turn.' },
            { id: 7, question: 'How far from a crosswalk should you park?', options: ['10 feet', '15 feet', '20 feet', '25 feet'], correctAnswer: 2, explanation: 'You must park at least 20 feet from a crosswalk to maintain pedestrian visibility and safety.' },
            { id: 8, question: 'When backing up, where should you primarily look?', options: ['Rearview mirror only', 'Side mirrors only', 'Over your shoulder through rear window', 'Backup camera only'], correctAnswer: 2, explanation: 'When backing up, turn and look over your shoulder through the rear window for the best view.' },
        ],
    },
    {
        id: 'road-safety',
        title: 'Road Safety & Hazards',
        description: 'Learn to identify and respond to road hazards and safety situations',
        icon: <MapPin size={32} color="#A855F7" />,
        color: '#A855F7',
        questions: 8,
        difficulty: 'Advanced',
        quizData: [
            { id: 1, question: 'What should you do if your brakes fail while driving?', options: ['Turn off the engine', 'Pump the brakes and downshift', 'Pull the parking brake hard', 'Swerve off the road'], correctAnswer: 1, explanation: 'If brakes fail, pump them rapidly, downshift to lower gears, and use the parking brake gradually.' },
            { id: 2, question: 'When driving in fog, you should:', options: ['Use high beams', 'Use low beams and fog lights', 'Use parking lights only', 'Drive without lights'], correctAnswer: 1, explanation: 'Use low beams and fog lights in fog. High beams reflect off fog and reduce visibility.' },
            { id: 3, question: 'What is hydroplaning?', options: ['Skidding on ice', 'Tires losing contact with road due to water', 'Engine overheating', 'Brake failure'], correctAnswer: 1, explanation: 'Hydroplaning occurs when tires lose contact with the road surface due to water, causing loss of control.' },
            { id: 4, question: 'If your vehicle starts to skid, you should:', options: ['Brake hard', 'Steer in the direction you want to go', 'Accelerate', 'Turn the opposite way'], correctAnswer: 1, explanation: 'Steer in the direction you want the front of the vehicle to go and avoid sudden braking.' },
            { id: 5, question: 'What is the safest action if an oncoming vehicle is in your lane?', options: ['Flash your lights and honk', 'Brake and move right', 'Speed up to pass', 'Swerve left'], correctAnswer: 1, explanation: 'Slow down and move to the right. If necessary, drive off the road to avoid a collision.' },
            { id: 6, question: 'When should you increase your following distance?', options: ['Only at night', 'In bad weather or poor visibility', 'Only on highways', 'Never needed'], correctAnswer: 1, explanation: 'Increase following distance in bad weather, poor visibility, or challenging road conditions.' },
            { id: 7, question: 'What should you do if a tire blows out while driving?', options: ['Brake immediately', 'Grip wheel firmly and slow gradually', 'Accelerate to maintain control', 'Turn sharply'], correctAnswer: 1, explanation: 'Grip the wheel firmly, ease off the gas, and slow down gradually. Avoid sudden braking or turning.' },
            { id: 8, question: 'At what speed does the risk of hydroplaning significantly increase?', options: ['25 mph', '35 mph', '45 mph', '55 mph'], correctAnswer: 1, explanation: 'Hydroplaning risk significantly increases at speeds above 35 mph on wet roads.' },
        ],
    },
];

const getDifficultyColor = (difficulty: QuizType['difficulty']) => {
    switch (difficulty) {
        case 'Beginner':
            return '#16A34A';
        case 'Intermediate':
            return '#2563EB';
        case 'Advanced':
            return '#9333EA';
        default:
            return '#4B5563';
    }
};

const DrivingQuizApp: React.FC = () => {
    const [currentView, setCurrentView] = useState<'home' | 'quiz'>('home');
    const [selectedQuizType, setSelectedQuizType] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<
        { questionId: number; correct: boolean }[]
    >([]);

    const activeQuiz = useMemo(
        () => quizTypes.find((q) => q.id === selectedQuizType),
        [selectedQuizType],
    );
    const quizData = activeQuiz?.quizData ?? [];

    const progress =
        quizData.length > 0
            ? ((currentQuestion + (showExplanation ? 1 : 0)) / quizData.length) * 100
            : 0;

    const startQuiz = (quizType: string) => {
        setSelectedQuizType(quizType);
        setCurrentView('quiz');
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setQuizComplete(false);
        setAnsweredQuestions([]);
    };

    const returnToHome = () => {
        setCurrentView('home');
        setSelectedQuizType(null);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setQuizComplete(false);
        setAnsweredQuestions([]);
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (showExplanation || !quizData[currentQuestion]) return;

        setSelectedAnswer(answerIndex);
        setShowExplanation(true);

        const isCorrect = answerIndex === quizData[currentQuestion].correctAnswer;
        if (isCorrect) setScore((prev) => prev + 1);

        setAnsweredQuestions((prev) => [
            ...prev,
            { questionId: quizData[currentQuestion].id, correct: isCorrect },
        ]);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizComplete(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setQuizComplete(false);
        setAnsweredQuestions([]);
    };

    const getScoreMessage = () => {
        const percentage = quizData.length
            ? (score / quizData.length) * 100
            : 0;
        if (percentage === 100) return "Perfect! You're ready to hit the road! 🚗";
        if (percentage >= 80) return 'Great job! You know your driving rules well!';
        if (percentage >= 60) return "Good effort! A bit more practice and you'll ace it!";
        return 'Keep studying! Review the road rules and try again.';
    };

    if (currentView === 'home') {
        return (
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Car size={56} color="#4F46E5" />
                        <Text style={styles.title}>Driving Quiz Center</Text>
                        <Text style={styles.subtitle}>
                            Choose a quiz category below and test your knowledge of the road.
                        </Text>
                    </View>

                    {quizTypes.map((quiz) => (
                        <TouchableOpacity
                            key={quiz.id}
                            style={styles.card}
                            onPress={() => startQuiz(quiz.id)}
                        >
                            <View style={[styles.iconRow, { borderLeftColor: quiz.color }]}>
                                <View style={{ paddingTop: 4 }}>
                                    {quiz.icon}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>{quiz.title}</Text>
                                    <Text style={styles.cardDesc}>{quiz.description}</Text>
                                </View>
                            </View>
                            <View style={styles.cardFooter}>
                                <Text style={styles.meta}>
                                    {quiz.questions} Questions • {quiz.difficulty}
                                </Text>
                                <View
                                    style={[
                                        styles.difficultyDot,
                                        { backgroundColor: getDifficultyColor(quiz.difficulty) },
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (quizComplete) {
        return (
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.centered}>
                    <View style={styles.resultCard}>
                        <Award size={72} color="#FACC15" />
                        <Text style={styles.resultTitle}>Quiz Complete!</Text>
                        <Text style={styles.resultSubtitle}>{activeQuiz?.title}</Text>

                        <View style={styles.scoreBox}>
                            <Text style={styles.scoreText}>
                                {score}/{quizData.length}
                            </Text>
                            <Text style={styles.scoreLabel}>Questions Correct</Text>
                        </View>

                        <Text style={styles.resultMessage}>{getScoreMessage()}</Text>

                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, styles.primary]} onPress={handleRestart}>
                                <RotateCcw size={20} color="#fff" />
                                <Text style={styles.buttonText}>Retake Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.secondary]} onPress={returnToHome}>
                                <Home size={20} color="#fff" />
                                <Text style={styles.buttonText}>All Quizzes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <ScrollView contentContainerStyle={styles.quizContainer}>
                <TouchableOpacity onPress={returnToHome} style={styles.backRow}>
                    <Home size={16} color="#4F46E5" />
                    <Text style={styles.backText}>Back to All Quizzes</Text>
                </TouchableOpacity>

                <Text style={styles.quizTitle}>{activeQuiz?.title}</Text>
                <Text style={styles.quizSubtitle}>{activeQuiz?.description}</Text>

                <View style={styles.statusRow}>
                    <Text style={styles.statusText}>
                        Question {currentQuestion + 1}/{quizData.length}
                    </Text>
                    <Text style={styles.statusText}>Score: {score}</Text>
                </View>

                {quizData[currentQuestion] && (
                    <View style={styles.questionCard}>
                        <Text style={styles.questionLabel}>
                            Question {currentQuestion + 1}
                        </Text>
                        <Text style={styles.questionText}>
                            {quizData[currentQuestion].question}
                        </Text>

                        {quizData[currentQuestion].options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect =
                                index === quizData[currentQuestion].correctAnswer;
                            const showResult = showExplanation;

                            let bg = '#F3F4F6';
                            if (showResult) {
                                if (isCorrect) bg = '#DCFCE7';
                                else if (isSelected && !isCorrect) bg = '#FEE2E2';
                            } else if (isSelected) {
                                bg = '#E0E7FF';
                            }

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.option, { backgroundColor: bg }]}
                                    onPress={() => handleAnswerSelect(index)}
                                    disabled={showExplanation}
                                >
                                    <Text style={styles.optionText}>
                                        {String.fromCharCode(65 + index)}. {option}
                                    </Text>
                                    {showResult && isCorrect && (
                                        <CheckCircle2 size={20} color="#16A34A" />
                                    )}
                                    {showResult && isSelected && !isCorrect && (
                                        <XCircle size={20} color="#DC2626" />
                                    )}
                                </TouchableOpacity>
                            );
                        })}

                        {showExplanation && (
                            <View style={styles.explanation}>
                                <Text style={styles.explanationText}>
                                    {quizData[currentQuestion].explanation}
                                </Text>
                            </View>
                        )}

                        {showExplanation && (
                            <TouchableOpacity style={[styles.button, styles.primary]} onPress={handleNext}>
                                <Text style={styles.buttonText}>
                                    {currentQuestion < quizData.length - 1
                                        ? 'Next Question →'
                                        : 'See Results 🎯'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: { padding: 16, gap: 12 },
    header: { alignItems: 'center', gap: 8, marginBottom: 12 },
    title: { fontSize: 28, fontWeight: '700', color: '#111827' },
    subtitle: { fontSize: 14, color: '#4B5563', textAlign: 'center' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 12,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingVertical: 8,
        borderLeftWidth: 4,
        paddingLeft: 12,
        flex: 1,
    },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: '#111827',
        flexShrink: 1,
    },
    cardDesc: { 
        fontSize: 14, 
        color: '#4B5563',
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    meta: { color: '#6B7280', fontSize: 13 },
    difficultyDot: { width: 12, height: 12, borderRadius: 6 },
    centered: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
    },
    resultTitle: { fontSize: 24, fontWeight: '700', color: '#111827' },
    resultSubtitle: { fontSize: 16, color: '#4B5563' },
    scoreBox: {
        backgroundColor: '#4F46E5',
        width: '100%',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    scoreText: { fontSize: 36, color: '#fff', fontWeight: '800' },
    scoreLabel: { color: '#E0E7FF', fontSize: 14 },
    resultMessage: { textAlign: 'center', color: '#374151', fontSize: 15 },
    row: { flexDirection: 'row', gap: 10, width: '100%' },
    button: {
        flex: 1,
        padding: 14,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        alignItems: 'center',
    },
    primary: { backgroundColor: '#4F46E5' },
    secondary: { backgroundColor: '#4B5563' },
    buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    quizContainer: { padding: 16, gap: 12 },
    backRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    backText: { color: '#4F46E5', fontWeight: '600' },
    quizTitle: { fontSize: 24, fontWeight: '800', color: '#111827' },
    quizSubtitle: { color: '#4B5563', fontSize: 14 },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    statusText: { color: '#1F2937', fontWeight: '700' },
    questionCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        gap: 10,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
    },
    questionLabel: { color: '#4F46E5', fontWeight: '700' },
    questionText: { fontSize: 18, fontWeight: '700', color: '#111827' },
    option: {
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: { color: '#111827', fontSize: 15 },
    explanation: {
        backgroundColor: '#EFF6FF',
        borderRadius: 10,
        padding: 12,
    },
    explanationText: { color: '#1F2937' },
});

export default DrivingQuizApp;
