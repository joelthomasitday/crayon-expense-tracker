import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CrayonText from '../components/CrayonText';
import CrayonCard from '../components/CrayonCard';
import CrayonButton from '../components/CrayonButton';
import { COLORS, SPACING } from '../constants/Theme';
import { loadExpenses, clearAllData } from '../store/Storage';
import { Star, TrendingUp, Award } from 'lucide-react-native';

const SummaryScreen = () => {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const expenses = await loadExpenses();
    const sum = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setTotal(sum);
    setCount(expenses.length);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CrayonCard color={COLORS.secondary} style={styles.headerCard}>
        <Award size={48} color={COLORS.primary} />
        <CrayonText style={styles.headerTitle}>Financial Superstar! ⭐</CrayonText>
      </CrayonCard>

      <View style={styles.statsContainer}>
        <CrayonCard style={styles.statCard}>
          <CrayonText style={styles.statLabel}>Total Notes</CrayonText>
          <CrayonText style={styles.statValue}>{count}</CrayonText>
        </CrayonCard>

        <CrayonCard style={[styles.statCard, { backgroundColor: COLORS.white }]}>
          <CrayonText style={styles.statLabel}>Total Scribbles</CrayonText>
          <CrayonText style={[styles.statValue, { color: COLORS.accent }]}>₹{total.toFixed(2)}</CrayonText>
        </CrayonCard>
      </View>

      <CrayonCard style={styles.chartCard}>
        <CrayonText style={styles.chartTitle}>Spending Scribbles</CrayonText>
        <View style={styles.barChart}>
          <View style={[styles.bar, { height: 80, backgroundColor: COLORS.primary }]} />
          <View style={[styles.bar, { height: 120, backgroundColor: COLORS.secondary }]} />
          <View style={[styles.bar, { height: 60, backgroundColor: COLORS.accent }]} />
          <View style={[styles.bar, { height: 100, backgroundColor: COLORS.primary }]} />
          <View style={[styles.bar, { height: 40, backgroundColor: COLORS.secondary }]} />
        </View>
        <CrayonText style={styles.chartFooter}>You're doing great! Keep it up! 🖍️</CrayonText>
      </CrayonCard>

      <View style={styles.achievementContainer}>
        <Star size={32} color={COLORS.secondary} fill={COLORS.secondary} />
        <View style={{ marginHorizontal: SPACING.m }}>
          <CrayonText style={styles.achievementText}>Unlocked: "The Doodle Saver" badge!</CrayonText>
        </View>
      </View>

      <View style={{ marginTop: SPACING.xl, marginBottom: SPACING.xl }}>
        <CrayonButton 
          title="Clear All Scribbles 🗑️" 
          onPress={async () => {
             await clearAllData();
             fetchSummary();
          }}
          color={COLORS.background}
          textColor={COLORS.accent}
        />
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
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.m,
  },
  headerTitle: {
    fontSize: 28,
    marginTop: SPACING.s,
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 0.48,
    alignItems: 'center',
    padding: SPACING.m,
  },
  statLabel: {
    fontSize: 16,
    color: COLORS.gray,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  chartCard: {
    marginTop: SPACING.m,
  },
  chartTitle: {
    fontSize: 20,
    marginBottom: SPACING.m,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 150,
    marginBottom: SPACING.m,
  },
  bar: {
    width: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.text,
  },
  chartFooter: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.primary,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    padding: SPACING.m,
  },
  achievementText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default SummaryScreen;
