import React, { useEffect, useRef, useState } from 'react';
import CommonRightPanel from '../../../components/CommonRightPanel';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import 'react-simple-keyboard/build/css/index.css';
import Swal from 'sweetalert2';
import Additem from '../../../components/add-item';
import Edit from '../../../components/edit-item';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { useGetTransactionsQuery, useAddTransactionMutation} from '../../../redux/slices/transactionHistoryApiSlice'; // Import the query

function index() {
	const [toggleRightPanel, setToggleRightPanel] = useState(false);
	const [orderedItems, setOrderedItems] = useState<any>([]);
	const [addtransaction, { isLoading }] = useAddTransactionMutation();
	const { refetch } = useGetTransactionsQuery(undefined);
	const [id, setId] = useState<number>(1530);
	const [activeComponent, setActiveComponent] = useState<'additem' | 'edit'>('additem');
	const currentTime = new Date().toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
	});
console.log(orderedItems)
	const addbill = async () => {
		try {
			const result = await Swal.fire({
				title: 'Are you sure?',
				text: 'You will not be able to recover this status!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, update it!',
			});
			if (result.isConfirmed) {
				const currentDate = new Date();
				const formattedDate = currentDate.toLocaleDateString();
				const year = currentDate.getFullYear();
				const month = String(currentDate.getMonth() + 1).padStart(2, '0');
				const day = String(currentDate.getDate()).padStart(2, '0');
				const formattedDate1 = `${year}-${month}-${day}`;

				for (const orderedItem of orderedItems) {
					const values = {
						stock_id: orderedItem.id,
						fabric_type: orderedItem.fabric_type,
						order_type: orderedItem.order_type,
						type: orderedItem.type,
						code: orderedItem.code,
						category: orderedItem.category,
						subcategory: orderedItem.subcategory,
						time: currentTime,
						date: formattedDate1,
						quentity: orderedItem.quentity,
						Job_ID: orderedItem.Job_ID,
						lot_type:orderedItem.type,
						uom:orderedItem.uom,
						GRN_number:orderedItem.GRN_number

					};
					const response: any = await addtransaction(values).unwrap();
				}
				setOrderedItems([])
				refetch();
				Swal.fire('Added!', 'transaction has been added successfully.', 'success');
			}
		} catch (error) {
			console.error('Error during handleUpload: ', error);
			alert('An error occurred during file upload. Please try again later.');
		}
	};
	interface Category {
		cid: string;
		categoryname: string;
	}
	const cdata = [
		{ status: true, categoryname: 'Main', cid: '0bc5HUELspDzvrUdt5u6' },
		{ status: true, categoryname: 'Embroider', cid: 'LKcV57ThRnHtE9bxBHMb' },
		{ status: true, categoryname: 'Painting', cid: 'La1K7XLguIsFPZN19vp4' },
		{ categoryname: 'clothes', cid: 'NowdRVU0K7hDZiMRkksn', status: true },
		{ categoryname: 'other', status: true, cid: 'irufyXKsbSNPk3z8ziC8' },
	];
	const [category, setCategory] = useState<Category[]>(cdata);
	return (
		<PageWrapper className=''>
			{/* <div>
				<div className='mt-5'>
					<Button className='btn btn-outline-warning '>All</Button>
					{category.map((category, index) => (
						<Button key={index} className='btn btn-outline-warning'>
							{category.categoryname}
						</Button>
					))}
				</div>
			</div> */}
			<div className='row'>
				<div className='col-4  mb-sm-0'>
					<Additem
						orderedItems={orderedItems}
						setOrderedItems={setOrderedItems}
						isActive={activeComponent === 'additem'}
						setActiveComponent={setActiveComponent}
					/>
				</div>
				<div className='col-4 '>
					<Edit
						orderedItems={orderedItems}
						setOrderedItems={setOrderedItems}
						isActive={activeComponent === 'edit'}
						setActiveComponent={setActiveComponent}
					/>
				</div>
				<div className='col-4 mt-4 '>
					<Card stretch className=' p-4' style={{ height: '75vh' }}>
						<CardBody isScrollable>
							<Button
								className='btn btn-success w-100 mt-3 fs-4 p-3 mb-3'
								onClick={addbill}>
								Proceed
							</Button>
						</CardBody>
					</Card>
				</div>
			</div>
			<CommonRightPanel
				setOpen={setToggleRightPanel}
				isOpen={toggleRightPanel}
				orderedItems={orderedItems}
				id={id}
			/>
		</PageWrapper>
	);
}

export default index;
