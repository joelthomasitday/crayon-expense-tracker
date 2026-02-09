import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import CrayonText from '../components/CrayonText';
import CrayonCard from '../components/CrayonCard';
import CrayonButton from '../components/CrayonButton';
import { COLORS, SPACING } from '../constants/Theme';
import { loadExpenses, saveExpenses } from '../store/Storage';
import { Trash2, Plus, Wallet } from 'lucide-react-native';

const HomeScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  const fetchExpenses = async () => {
    const data = await loadExpenses();
    setExpenses(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const deleteExpense = async (id) => {
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    await saveExpenses(updatedExpenses);
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  const renderExpenseItem = ({ item }) => (
    <CrayonCard style={styles.expenseItem}>
      <View style={styles.expenseContent}>
        <View style={styles.expenseLeft}>
          <View style={styles.categoryCircle}>
            <CrayonText style={styles.categoryIcon}>{item.category || '📝'}</CrayonText>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CrayonText style={styles.expenseTitle}>{item.title}</CrayonText>
              {item.isImportant && <CrayonText style={{ marginLeft: 5 }}>⭐</CrayonText>}
            </View>
            <CrayonText style={styles.expenseDate}>{item.date}</CrayonText>
            {item.splitCount > 1 && (
              <CrayonText style={styles.splitIndicator}>
                Shared with {item.splitCount} 🧑‍🤝‍🧑 (₹{item.amountPerPerson.toFixed(2)} each)
              </CrayonText>
            )}
          </View>
        </View>
        <View style={styles.expenseRight}>
          <CrayonText style={styles.expenseAmount}>₹{parseFloat(item.amount).toFixed(2)}</CrayonText>
          <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.deleteBtn}>
            <Trash2 size={20} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </View>
    </CrayonCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <CrayonText style={styles.avatarText}>🧑‍🎨</CrayonText>
          </View>
          <View>
            <CrayonText style={styles.greeting}>Hi there, Doodle!</CrayonText>
            <CrayonText style={styles.subGreeting}>Let's track your gold stars!</CrayonText>
          </View>
        </View>

        <CrayonCard color={COLORS.secondary} style={styles.totalCard}>
          <View style={styles.totalContent}>
            <Wallet size={32} color={COLORS.text} />
            <View style={{ marginLeft: SPACING.m }}>
              <CrayonText style={styles.totalLabel}>Total Spent</CrayonText>
              <CrayonText style={styles.totalValue}>₹{totalAmount.toFixed(2)}</CrayonText>
            </View>
          </View>
        </CrayonCard>
      </View>

      <View style={styles.listContainer}>
        <CrayonText style={styles.sectionTitle}>Recent Doodles 📝</CrayonText>
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderExpenseItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <CrayonText style={styles.emptyText}>No expenses yet! Time to doodle... 🎨</CrayonText>
            </View>
          }
        />
      </View>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => {
          console.log('FAB pressed! Navigating to AddExpense...');
          try {
            navigation.navigate('AddExpense');
            console.log('Navigation called successfully');
          } catch (e) {
            console.error('Navigation error:', e);
          }
        }}
      >
        <Plus size={32} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.m,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  avatarText: {
    fontSize: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subGreeting: {
    fontSize: 14,
    color: COLORS.gray,
  },
  totalCard: {
    marginVertical: SPACING.s,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 30,
  },
  totalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.s,
  },
  totalLabel: {
    fontSize: 18,
    opacity: 0.8,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: SPACING.m,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: SPACING.s,
    color: COLORS.text,
  },
  listContent: {
    paddingBottom: 100,
  },
  expenseItem: {
    marginBottom: SPACING.s,
  },
  expenseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  categoryIcon: {
    fontSize: 20,
  },
  expenseTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  expenseDate: {
    fontSize: 14,
    color: COLORS.gray,
  },
  expenseRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseAmount: {
    fontSize: 20,
    color: COLORS.primary,
    marginRight: SPACING.m,
  },
  deleteBtn: {
    padding: SPACING.s,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    backgroundColor: COLORS.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.text,
  },
  splitIndicator: {
    fontSize: 12,
    color: COLORS.primary,
    fontStyle: 'italic',
    marginTop: 2,
  },
});

export default HomeScreen;
