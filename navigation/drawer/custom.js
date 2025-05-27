import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import d from '../../assets/mini-desawar.png';
import { fetchallapi } from '../../utils/Apicall/fetchallresults';
import { fetchallcategoryapi } from '../../utils/Apicall/FetchAllCategory';

const CustomDrawer = (props) => {
	const { navigation } = props;
	const [data, setdata] = useState([]);

	useEffect(() => {
		fetchallcategoryapi(setdata);
	}, []);

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.container}>
			<View>
				<View style={styles.drawerHeader}>
					<Image
						source={d}
						resizeMode='cover'
						style={{ resizeMode: 'contain', width: 100, height: 100 }}
					/>
					<Text style={styles.appTitle}>Mini Diswar Results</Text>
				</View>
				<View>
					{data.map((item, index) => {
						return (
							<DrawerItem
								label={item.categoryname}
								labelStyle={styles.drawerLabel}
								onPress={() =>
									navigation.navigate('Results', {
										title: item.categoryname,
										item: item.result,
										date: item.date,
									})
								}
							/>
						);
					})}
				</View>
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
	},
	appTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#FFFF',
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
