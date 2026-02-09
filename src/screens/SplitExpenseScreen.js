import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CrayonText from '../components/CrayonText';
import CrayonCard from '../components/CrayonCard';
import CrayonButton from '../components/CrayonButton';
import CrayonInput from '../components/CrayonInput';
import { COLORS, SPACING } from '../constants/Theme';
import { loadExpenses, saveExpenses } from '../store/Storage';
import { Users, Trash2, PlusCircle } from 'lucide-react-native';

const SplitExpenseScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [people, setPeople] = useState(['Me']);
  const [newPerson, setNewPerson] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  const fetchExpenses = async () => {
    const data = await loadExpenses();
    setExpenses(data);
  };

  const addPerson = () => {
    if (!newPerson.trim()) return;
    if (people.includes(newPerson.trim())) {
      Alert.alert('Wait!', 'That person is already in the group! 🧑‍🤝‍🧑');
      return;
    }
    setPeople([...people, newPerson.trim()]);
    setNewPerson('');
  };

  const removePerson = (name) => {
    if (name === 'Me') return;
    setPeople(people.filter(p => p !== name));
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const splitAmount = people.length > 0 ? totalAmount / people.length : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CrayonCard color={COLORS.secondary} style={styles.headerCard}>
        <Users size={48} color={COLORS.primary} />
        <CrayonText style={styles.headerTitle}>Split the Bill! 🍕</CrayonText>
        <CrayonText style={styles.headerSub}>Share the doodles with friends</CrayonText>
      </CrayonCard>

      <CrayonCard style={styles.mainCard}>
        <View style={styles.summaryRow}>
          <CrayonText style={styles.label}>Total Group Spend:</CrayonText>
          <CrayonText style={styles.totalValue}>₹{totalAmount.toFixed(2)}</CrayonText>
        </View>
        <View style={styles.summaryRow}>
          <CrayonText style={styles.label}>Each Person Pays:</CrayonText>
          <CrayonText style={styles.splitValue}>₹{splitAmount.toFixed(2)}</CrayonText>
        </View>
      </CrayonCard>

      <View style={styles.peopleSection}>
        <CrayonText style={styles.sectionTitle}>Who's tagging along? 🧑‍🤝‍🧑</CrayonText>
        
        <View style={styles.addPersonContainer}>
          <View style={{ flex: 1 }}>
            <CrayonInput
              placeholder="Friend's name..."
              value={newPerson}
              onChangeText={setNewPerson}
            />
          </View>
          <TouchableOpacity onPress={addPerson} style={styles.addButton}>
            <PlusCircle size={32} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.peopleList}>
          {people.map((person) => (
            <CrayonCard key={person} style={styles.personCard}>
              <View style={styles.personContent}>
                <CrayonText style={styles.personName}>
                  {person === 'Me' ? '🙋‍♂️ Me' : `👤 ${person}`}
                </CrayonText>
                <CrayonText style={styles.personOwes}>₹{splitAmount.toFixed(2)}</CrayonText>
                {person !== 'Me' && (
                  <TouchableOpacity onPress={() => removePerson(person)}>
                    <Trash2 size={18} color={COLORS.accent} />
                  </TouchableOpacity>
                )}
              </View>
            </CrayonCard>
          ))}
        </View>
      </View>

      <View style={styles.infoBox}>
        <CrayonText style={styles.infoText}>
          Tip: Add all your shared expenses in the Home screen first, then come here to see everyone's share! 🖍️
        </CrayonText>
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
  headerCard: {
    alignItems: 'center',
    paddingVertical: SPACING.l,
    marginBottom: SPACING.m,
  },
  headerTitle: {
    fontSize: 28,
    color: COLORS.primary,
    marginTop: SPACING.s,
  },
  headerSub: {
    fontSize: 16,
    color: COLORS.gray,
  },
  mainCard: {
    marginBottom: SPACING.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  label: {
    fontSize: 18,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  splitValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  peopleSection: {
    marginTop: SPACING.m,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: SPACING.s,
  },
  addPersonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  addButton: {
    marginLeft: SPACING.s,
    marginTop: SPACING.s,
  },
  peopleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  personCard: {
    width: '48%',
    padding: SPACING.s,
    marginBottom: SPACING.s,
  },
  personContent: {
    alignItems: 'center',
  },
  personName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  personOwes: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  infoBox: {
    marginTop: SPACING.xl,
    padding: SPACING.m,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SplitExpenseScreen;
