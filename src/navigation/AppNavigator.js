import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import SummaryScreen from '../screens/SummaryScreen';
import SplitExpenseScreen from '../screens/SplitExpenseScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { COLORS, FONTS, SPACING } from '../constants/Theme';
import { TouchableOpacity, View } from 'react-native';
import { BarChart2, Users } from 'lucide-react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 2,
          borderBottomColor: COLORS.text,
        },
        headerTitleStyle: {
          fontFamily: FONTS.regular,
          fontSize: 24,
          color: COLORS.primary,
        },
        headerTintColor: COLORS.primary,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({ navigation }) => ({ 
          title: 'My Expenses 🖍️',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: SPACING.m }}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Split')}
                style={{ marginRight: SPACING.m }}
              >
                <Users size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Summary')}
              >
                <BarChart2 size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ),
        })} 
      />
      <Stack.Screen 
        name="AddExpense" 
        component={AddExpenseScreen} 
        options={{ title: 'New Expense ✨' }} 
      />
      <Stack.Screen 
        name="Summary" 
        component={SummaryScreen} 
        options={{ title: 'Summary 📊' }} 
      />
      <Stack.Screen 
        name="Split" 
        component={SplitExpenseScreen} 
        options={{ title: 'Split Bill 🍕' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
