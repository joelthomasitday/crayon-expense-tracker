import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses_data';

export const saveExpenses = async (expenses) => {
  try {
    console.log('Storage: Setting item...', expenses);
    const jsonValue = JSON.stringify(expenses);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    console.log('Storage: Item set successfully!');
  } catch (e) {
    console.error('Error saving expenses', e);
  }
};

export const loadExpenses = async () => {
  try {
    console.log('Storage: Getting item...');
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const data = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log('Storage: Data loaded:', data);
    return data;
  } catch (e) {
    console.error('Error loading expenses', e);
    return [];
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing data', e);
  }
};
