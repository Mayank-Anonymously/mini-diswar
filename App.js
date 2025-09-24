import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from './navigation/drawer/navigtor';
import { store } from './components/redux/reducer';
import { Provider } from 'react-redux';

export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<DrawerNavigator />
			</Provider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
