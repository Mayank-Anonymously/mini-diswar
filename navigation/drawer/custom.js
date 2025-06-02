import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import d from '../../assets/mini-desawar.png';
import { fetchallcategoryapi } from '../../utils/Apicall/FetchAllCategory';

const CustomDrawer = (props) => {
	const { navigation } = props;
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchallcategoryapi(setData);
	}, []);

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.drawerItem}
			onPress={() =>
				navigation.navigate('Results', {
					title: item.categoryname,
					item: item.result,
					date: item.date,
					mode: item.mode,
					loadingg: false,
				})
			}>
			<Text style={styles.drawerLabel}>{item.categoryname}</Text>
		</TouchableOpacity>
	);

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.container}>
			<View>
				<View style={styles.drawerHeader}>
					<Image
						source={d}
						resizeMode='contain'
						style={{ width: 100, height: 100 }}
					/>
					<Text style={styles.appTitle}>Mini Diswar Results</Text>
				</View>

				<TouchableOpacity
					style={styles.drawerItem}
					onPress={() => navigation.navigate('HomeStack')}>
					<Text style={styles.drawerLabel}>Home</Text>
				</TouchableOpacity>

				<FlatList
					data={data}
					keyExtractor={(item, index) =>
						item.id?.toString() || `${item.categoryname}-${index}`
					}
					renderItem={renderItem}
					extraData={data}
				/>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>App Version 1.0.0</Text>
				<Text style={styles.footerText}>© 2025 Mini Diswar</Text>
			</View>
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
		justifyContent: 'space-between',
	},

	drawerHeader: {
		backgroundColor: '#01796F',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginBottom: 10,
		height: 150,
		alignItems: 'center',
		justifyContent: 'center',
	},
	appTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFFF',
		marginTop: 10,
	},
	drawerItem: {
		paddingVertical: 15,
		paddingHorizontal: 20,
	},
	drawerLabel: {
		fontSize: 16,
		color: '#444',
	},
	footer: {
		padding: 20,
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		backgroundColor: '#01796F',
	},
	footerText: {
		fontSize: 12,
		color: '#fff',
		textAlign: 'center',
	},
});

export default CustomDrawer;
