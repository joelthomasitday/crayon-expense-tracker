import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import CrayonText from '../components/CrayonText';
import CrayonInput from '../components/CrayonInput';
import CrayonButton from '../components/CrayonButton';
import CrayonCard from '../components/CrayonCard';
import CrayonToggle from '../components/CrayonToggle';
import { COLORS, SPACING } from '../constants/Theme';
import { loadExpenses, saveExpenses } from '../store/Storage';

const AddExpenseScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [category, setCategory] = useState('🍔');
  const [isImportant, setIsImportant] = useState(false);
  const [splitCount, setSplitCount] = useState(1);

  const categories = [
    { label: 'Food', emoji: '🍔' },
    { label: 'Travel', emoji: '🚌' },
    { label: 'Fun', emoji: '🎮' },
    { label: 'Other', emoji: '🎒' },
  ];

  const handleSave = async () => {
    console.log('Save button pressed! 🖍️');
    if (!title || !amount) {
      console.log('Validation failed: Missing title or amount');
      Alert.alert('Oops!', 'Please fill in both title and amount 🖍️');
      return;
    }

    if (isNaN(amount)) {
      console.log('Validation failed: Amount is not a number', amount);
      Alert.alert('Wait!', 'The amount should be a number 🔢');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      date,
      category,
      isImportant,
      splitCount,
      amountPerPerson: parseFloat(amount) / splitCount,
    };

    console.log('Saving new expense:', newExpense);

    try {
      const currentExpenses = await loadExpenses();
      console.log('Current expenses from storage:', currentExpenses);
      const updatedExpenses = [...currentExpenses, newExpense];
      await saveExpenses(updatedExpenses);
      console.log('Expenses saved successfully! Total count:', updatedExpenses.length);
      navigation.goBack();
    } catch (error) {
      console.error('Error in handleSave:', error);
      Alert.alert('Error', 'Could not save your scribble 😢');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CrayonCard style={styles.formCard}>
        <CrayonText style={styles.headerText}>What did we buy? 🤔</CrayonText>
        
        <CrayonInput
          label="Item Name"
          placeholder="e.g. Magic Crayons"
          value={title}
          onChangeText={setTitle}
        />

        <CrayonInput
          label="How much?"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <CrayonInput
          label="When?"
          placeholder="YYYY/MM/DD"
          value={date}
          onChangeText={setDate}
        />

        <CrayonText style={styles.label}>Which category? 🏷️</CrayonText>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.label}
              style={[
                styles.categoryItem,
                category === cat.emoji && styles.selectedCategory
              ]}
              onPress={() => setCategory(cat.emoji)}
            >
              <CrayonText style={styles.categoryEmoji}>{cat.emoji}</CrayonText>
              <CrayonText style={styles.categoryLabel}>{cat.label}</CrayonText>
            </TouchableOpacity>
          ))}
        </View>

        <CrayonToggle 
          label="Gold Star Expense? ⭐" 
          value={isImportant} 
          onValueChange={setIsImportant} 
        />

        <View style={styles.splitSection}>
          <CrayonText style={styles.label}>Split with how many? 🧑‍🤝‍🧑</CrayonText>
          <View style={styles.splitControls}>
            <TouchableOpacity 
              onPress={() => setSplitCount(Math.max(1, splitCount - 1))}
              style={styles.splitBtn}
            >
              <CrayonText style={styles.splitBtnText}>-</CrayonText>
            </TouchableOpacity>
            <CrayonText style={styles.splitCountText}>{splitCount}</CrayonText>
            <TouchableOpacity 
              onPress={() => setSplitCount(splitCount + 1)}
              style={styles.splitBtn}
            >
              <CrayonText style={styles.splitBtnText}>+</CrayonText>
            </TouchableOpacity>
          </View>
          {splitCount > 1 && amount > 0 && (
            <CrayonText style={styles.splitResult}>
              That's ₹{ (parseFloat(amount) / splitCount).toFixed(2) } each! 🍕
            </CrayonText>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CrayonButton
            title="Add to My List ✨"
            onPress={handleSave}
            color={COLORS.primary}
          />
          <CrayonButton
            title="Cancel"
            onPress={() => {
              console.log('Cancel pressed! Going back...');
              navigation.goBack();
            }}
            color={COLORS.background}
            textColor={COLORS.accent}
            style={{ marginTop: SPACING.s, borderWidth: 0 }}
          />
        </View>
      </CrayonCard>

      <View style={styles.decorationContainer}>
        <CrayonText style={styles.decorationText}>⭐ Remember to save your gold stars! ⭐</CrayonText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.m,
  },
  formCard: {
    padding: SPACING.l,
    marginTop: SPACING.m,
  },
  headerText: {
    fontSize: 24,
    color: COLORS.primary,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
  label: {
    marginTop: SPACING.m,
    marginBottom: SPACING.xs,
    fontSize: 16,
    color: COLORS.primary,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.s,
  },
  categoryItem: {
    padding: SPACING.s,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    flex: 0.22,
  },
  selectedCategory: {
    borderColor: COLORS.secondary,
    backgroundColor: '#FFF9C4', // light yellow highlight
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryLabel: {
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: SPACING.xl,
  },
  decorationContainer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  decorationText: {
    color: COLORS.secondary,
    fontSize: 16,
  },
  splitSection: {
    marginTop: SPACING.m,
    padding: SPACING.s,
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.text,
  },
  splitControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.s,
  },
  splitBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitBtnText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  splitCountText: {
    fontSize: 24,
    marginHorizontal: SPACING.l,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  splitResult: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.primary,
    fontStyle: 'italic',
  },
});

export default AddExpenseScreen;
