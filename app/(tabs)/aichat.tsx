import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const { width } = Dimensions.get('window');

// Replace this with your actual OpenAI API key
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  // Typing indicator animation
  useEffect(() => {
    if (isLoading) {
      const animations = animatedValues.map((value, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 200),
            Animated.timing(value, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        )
      );
      
      animations.forEach(animation => animation.start());
      
      return () => animations.forEach(animation => animation.stop());
    }
  }, [isLoading]);

  const scrollToBottom = () => {
    if (scrollViewRef.current && messages.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: messageText }],
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0].message.content,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      let errorText = 'Sorry, I encountered an error. Please try again.';
      
      if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
        const message = (error as any).message as string;
        if (message.includes('401')) {
          errorText = 'Invalid API key. Please check your OpenAI API key.';
        } else if (message.includes('429')) {
          errorText = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (message.includes('500')) {
          errorText = 'OpenAI server error. Please try again later.';
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => setMessages([]) }
      ]
    );
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
            {item.text}
          </Text>
          <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.botTimestamp]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isLoading) return null;
    
    return (
      <View style={[styles.messageContainer, styles.botMessageContainer]}>
        <View style={[styles.messageBubble, styles.botBubble, styles.typingBubble]}>
          <View style={styles.typingIndicator}>
            {animatedValues.map((value, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.typingDot,
                  {
                    opacity: value,
                    transform: [
                      {
                        translateY: value.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#25D366" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ChatGPT Assistant</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearChat}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Messages Area */}
      <View style={styles.messagesArea}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>🤖</Text>
              <Text style={styles.emptySubtext}>Start a conversation with ChatGPT!</Text>
            </View>
          ) : (
            messages.map((item) => {
              const isUser = item.sender === 'user';
              return (
                <View key={item.id} style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
                  <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
                    <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
                      {item.text}
                    </Text>
                    <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.botTimestamp]}>
                      {item.timestamp}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
          {renderTypingIndicator()}
        </ScrollView>
      </View>

      {/* Input Area with Keyboard Avoiding */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -30 : -60}
        enabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Type a message..."
                placeholderTextColor="#999"
                multiline
                maxLength={1000}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!inputValue.trim() || isLoading) && styles.sendButtonDisabled
                ]}
                onPress={sendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Text style={styles.sendButtonText}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  flex: {
    flex: 1,
  },
  messagesArea: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  header: {
    backgroundColor: '#25D366',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  clearButton: {
    backgroundColor: '#1DA851',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  messagesList: {
    flex: 1,
  },
  // increase bottom padding so messages can scroll above the input/keyboard
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    // larger padding bottom helps ensure recent messages aren't hidden by the input/keyboard
    paddingBottom: Platform.OS === 'ios' ? 200 : 140,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: width * 0.8,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userBubble: {
    backgroundColor: '#25D366',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  botTimestamp: {
    color: '#666',
  },
  typingBubble: {
    paddingVertical: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#999',
    marginHorizontal: 2,
  },
  inputWrapper: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    // slightly increased bottom padding so the input sits higher when keyboard is shown
    paddingBottom: Platform.OS === 'ios' ? 85 : 12,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // reduce the extra bottom margin to raise the input a bit
    marginBottom: Platform.OS === 'ios' ? 12 : 8,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 120,
    backgroundColor: '#F5F5F5',
  },
  sendButton: {
    backgroundColor: '#25D366',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ChatApp;