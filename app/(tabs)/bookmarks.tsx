import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plus, X, Send, Trash2, Edit2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Entry = {
    id: string;
    content: string;
    date: string;
    editedDate?: string;
};

export default function Bookmarks() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isWriting, setIsWriting] = useState(false);
    const [currentEntry, setCurrentEntry] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const entryKeys = keys.filter((k) => k.startsWith('entry:'));
                const loadedEntries = await Promise.all(
                    entryKeys.map(async (key) => {
                        const value = await AsyncStorage.getItem(key);
                        return value ? (JSON.parse(value) as Entry) : null;
                    })
                );
                const validEntries = loadedEntries
                    .filter(Boolean)
                    .sort((a, b) => new Date((b as Entry).date).getTime() - new Date((a as Entry).date).getTime()) as Entry[];
                setEntries(validEntries);
            } catch {
                // ignore
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleSave = async () => {
        if (!currentEntry.trim()) return;

        if (editingId) {
            const original = entries.find((e) => e.id === editingId);
            if (!original) return;
            const updatedEntry: Entry = {
                ...original,
                content: currentEntry,
                editedDate: new Date().toISOString(),
            };
            await AsyncStorage.setItem(`entry:${editingId}`, JSON.stringify(updatedEntry));
            setEntries(entries.map(e => e.id === editingId ? updatedEntry : e));
            setEditingId(null);
        } else {
            const newEntry: Entry = {
                id: Date.now().toString(),
                content: currentEntry,
                date: new Date().toISOString(),
            };
            await AsyncStorage.setItem(`entry:${newEntry.id}`, JSON.stringify(newEntry));
            setEntries([newEntry, ...entries]);
        }
        setCurrentEntry('');
        setIsWriting(false);
    };

    const handleDelete = async (id: string) => {
        Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.removeItem(`entry:${id}`);
                    setEntries((prev) => prev.filter((entry) => entry.id !== id));
                },
            },
        ]);
    };

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer} edges={['top', 'bottom']}>
                <ActivityIndicator size="large" color="#4F46E5" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={[ 'bottom']}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>My Bookmarks</Text>
                <Text style={styles.subtitle}>Write your thoughts, one entry at a time</Text>
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {isWriting && (
                    <View style={styles.entryForm}>
                        <View style={styles.formHeader}>
                            <Text style={styles.formTitle}>{editingId ? 'Edit Entry' : 'New Entry'}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsWriting(false);
                                    setCurrentEntry('');
                                    setEditingId(null);
                                }}
                            >
                                <X color="#64748B" size={24} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            multiline
                            value={currentEntry}
                            onChangeText={setCurrentEntry}
                            placeholder="What's on your mind?"
                            placeholderTextColor="#94A3B8"
                            style={styles.textInput}
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            onPress={handleSave}
                            disabled={!currentEntry.trim()}
                            style={[styles.saveButton, !currentEntry.trim() && styles.saveButtonDisabled]}
                        >
                            <Send color="white" size={18} />
                            <Text style={styles.saveButtonText}>Save Entry</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {entries.length === 0 && !isWriting ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No entries yet</Text>
                        <Text style={styles.emptySubtext}>Tap the + button to create your first entry</Text>
                    </View>
                ) : (
                    entries.map((item) => (
                        <View key={item.id} style={styles.entryItem}>
                            <View style={styles.entryHeader}>
                                <Text style={styles.entryDate}>
                                    {formatDate(item.date)}
                                    {item.editedDate && <Text style={styles.editedBadge}> • Edited</Text>}
                                </Text>
                                <View style={styles.entryActions}>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setCurrentEntry(item.content);
                                            setEditingId(item.id);
                                            setIsWriting(true);
                                        }}
                                        style={styles.actionButton}
                                    >
                                        <Edit2 color="#64748B" size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => handleDelete(item.id)}
                                        style={styles.actionButton}
                                    >
                                        <Trash2 color="#EF4444" size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.entryContent}>{item.content}</Text>
                        </View>
                    ))
                )}
            </ScrollView>

            {!isWriting && (
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setIsWriting(true)}
                    activeOpacity={0.8}
                >
                    <Plus color="white" size={28} strokeWidth={2.5} />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 20,
        backgroundColor: '#4F46E5',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    entryForm: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    formHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0F172A',
    },
    textInput: {
        minHeight: 160,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        fontSize: 16,
        color: '#1E293B',
        backgroundColor: '#F8FAFC',
        marginBottom: 16,
    },
    saveButton: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4F46E5',
        gap: 8,
    },
    saveButtonDisabled: {
        backgroundColor: '#CBD5E1',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 80,
    },
    emptyText: {
        color: '#94A3B8',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        color: '#64748B',
        fontSize: 15,
    },
    entryItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    entryDate: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    editedBadge: {
        color: '#94A3B8',
        fontSize: 12,
    },
    entryActions: {
        flexDirection: 'row',
        gap: 16,
    },
    actionButton: {
        padding: 4,
    },
    entryContent: {
        fontSize: 16,
        color: '#1E293B',
        lineHeight: 24,
    },
});

