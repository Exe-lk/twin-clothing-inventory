import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import useDarkMode from '../../../hooks/useDarkMode';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { doc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
import COLORS, { getColorNameWithIndex } from '../../../common/data/enumColors';
import { getFirstLetter } from '../../../helpers/helpers';
import TopChart from '../../../components/top-product-chart';
import SellsChart from '../../../components/sells-chart';
import StockChart from '../../../components/stock-chart';
import Cashier from '../../../components/cashier';
import PaginationButtons from '../../../components/PaginationButtons';
import LineWithLabel from '../../../components/sells-chart';
import LineWithLabel1 from '../../../components/sock-monthly';
import ColumnBasic from '../../../components/ColumnBasic';

import PieBasic from '../../../components/top-product-chart';


interface Item {
	cid: string;
	category: number;
	image: string;
	name: string;
	price: number;
	quentity: number;
	reorderlevel: number;
}
interface User {
	cid: string;
	image: string;
	name: string;
	position: string;
	email: string;
	password: string;
	mobile: number;
	pin_number: number;
}
interface Stock {
	cid: string;
	buy_price: number;
	item_id: string;
	location: string;
	quentity: string;
	status: string;
	sublocation: string;
	exp: string;
	currentquentity: string;
	stockHistory: { stockout: string; date: string }[];
}
// Define the functional component for the index page
const Index: NextPage = () => {
	const { darkModeStatus } = useDarkMode(); // Dark mode
	const [searchTerm, setSearchTerm] = useState(''); // State for search term
	const [addModalStatus, setAddModalStatus] = useState<boolean>(false); // State for add modal status
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false); // State for edit modal status
	const [item, setItem] = useState<Item[]>([]); // State for item data
	const [id, setId] = useState<string>(''); // State for current item ID
	const [id1, setId1] = useState<string>('12356'); // State for new item ID
	const [status, setStatus] = useState(true); // State for managing data fetching status
	const [user, setuser] = useState<User[]>([]); // State for user data
	const [stock, setStock] = useState<Stock[]>([]); // State for stock data
	const [currentPage, setCurrentPage] = useState(1); // State for current page number
	const [perPage, setPerPage] = useState<number>(5); // State for number of items per page
	const [data, setData] = useState<{ labels: string[]; data: { [key: string]: number }[] }>({
		labels: [],
		data: [],
	}); 
	// Fetch data from Firestore for items, users, and stocks
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch item data
				const dataCollection = collection(firestore, 'item');
				const q = query(dataCollection, where('status', '==', true));
				const querySnapshot = await getDocs(q);
				const firebaseData = querySnapshot.docs.map((doc) => {
					const data = doc.data() as Item;
					return {
						...data,
						cid: doc.id,
					};
				});
				const tempId = parseInt(firebaseData[firebaseData.length - 1].cid) + 1;
				setId1(tempId.toString());
				setItem(firebaseData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchData();
	}, [editModalStatus, addModalStatus, status]);
	// Fetch user data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = collection(firestore, 'user');
				const querySnapshot = await getDocs(dataCollection);
				const firebaseData = querySnapshot.docs.map((doc) => {
					const data = doc.data() as User;
					return {
						...data,
						cid: doc.id,
					};
				});
				setuser(firebaseData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchData();
	}, [editModalStatus, addModalStatus]); // Fetch data whenever editModalStatus or addModalStatus changes
	// Fetch stock data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = collection(firestore, 'stock');
				const querySnapshot = await getDocs(dataCollection);
				const firebaseData = querySnapshot.docs.map((doc) => {
					const data = doc.data() as Stock;
					return {
						...data,
						cid: doc.id,
					};
				});
				setStock(firebaseData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchData();
	}, [editModalStatus, addModalStatus]); // Fetch data whenever editModalStatus or addModalStatus changes
	// Fetch individual stock data based on ID
	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = collection(firestore, 'stock');
				const q = query(dataCollection, where('__name__', '==', id));
				const querySnapshot = await getDocs(q);
				const firebaseData: any = querySnapshot.docs.map((doc) => {
					const data = doc.data() as Stock;
					return {
						...data,
						cid: doc.id,
						stockHistory: data.stockHistory || [],
					};
				});
				if (firebaseData.length > 0) {
					const stockData = firebaseData[0];
					setStock(stockData);

					const stockHistory = stockData.stockHistory;
					console.log('Stock History:', stockHistory);
				} else {
					console.error('Stock data not found for ID:', id);
				}
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchData();
	}, [id]); // Fetch data whenever ID changes
	// Function to aggregate stock out data by month
	const aggregateStockOutByMonth = (
		stockHistory: { stockout: string; date: string }[] | undefined,
	) => {
		const aggregatedData: { [key: string]: number } = {};
		if (!stockHistory) {
			return aggregatedData;
		}
		stockHistory.forEach((entry) => {
			const date = new Date(entry.date);
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			const key = `${year}-${month}`;
			if (aggregatedData[key]) {
				aggregatedData[key] += parseInt(entry.stockout);
			} else {
				aggregatedData[key] = parseInt(entry.stockout);
			}
		});
		return aggregatedData;
	};
	// Function to prepare data for graph
	const prepareGraphData = () => {
		const graphData: { labels: string[]; data: { [key: string]: number }[] } = {
			labels: [],
			data: [],
		};
		stock.forEach((item) => {
			const stockHistory = item.stockHistory;
			const aggregatedData = aggregateStockOutByMonth(stockHistory);
			graphData.labels = Object.keys(aggregatedData);
			Object.keys(aggregatedData).forEach((month, index) => {
				if (!graphData.data[index]) {
					graphData.data[index] = {};
				}
				graphData.data[index][item.item_id] = aggregatedData[month];
			});
		});
		return graphData;
	};
	useEffect(() => {
		const graphData = prepareGraphData();
		setData(graphData);
	}, [stock]); // Update graph data whenever stock changes
	// Return the JSX for rendering the page
	return (
		<PageWrapper>
			<Page>
				<div className='row'>

				<PieBasic />
				<LineWithLabel />
				<LineWithLabel1 />
{/* 				
				<ColumnBasic />
				<TypeAnalatisk/>
				
				<LineWithLabel />
				<LineWithLabel1 /> */}

				</div>
				
				
			</Page>
		</PageWrapper>
	);
};
export default Index;
