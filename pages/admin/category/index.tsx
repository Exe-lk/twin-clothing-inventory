// pages/index.tsx
import React, { useState } from 'react';
import { NextPage } from 'next';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import useDarkMode from '../../../hooks/useDarkMode';
import Page from '../../../layout/Page/Page';
import { useGetCategoriesQuery } from '../../../redux/slices/categoryApiSlice'; // Import the RTK Query hook
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';
import CategoryAddModal from '../../../components/custom/CategoryAddModal';
import CategoryDeleteModal from '../../../components/custom/CategoryDeleteModal';
import CategoryEditModal from '../../../components/custom/CategoryEditModal';
import Swal from 'sweetalert2';

// Define the functional component for the index page
const Index: NextPage = () => {
	const { darkModeStatus } = useDarkMode();
	const [searchTerm, setSearchTerm] = useState('');
	const [addModalStatus, setAddModalStatus] = useState(false);
	const [deleteModalStatus, setDeleteModalStatus] = useState(false);
	const [editModalStatus, setEditModalStatus] = useState(false);
	const [id, setId] = useState<string>('');

	// Fetch categories using RTK Query from the custom API
	const { data: categories, error, isLoading } = useGetCategoriesQuery(undefined);
	const handleClickDelete = async (category: any) => {
		try {
			const result = await Swal.fire({
				title: 'Are you sure?',
				text: 'You will not be able to recover this category!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			});
			if (result.isConfirmed) {
				// Implement the delete logic here
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete category.', 'error');
		}
	};

	// JSX for rendering the page
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search...'
						onChange={(event: any) => setSearchTerm(event.target.value)}
						value={searchTerm}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<SubheaderSeparator />
					<Button
						icon='AddCircleOutline'
						color='success'
						isLight
						onClick={() => setAddModalStatus(true)}>
						New category
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardTitle className='d-flex justify-content-between align-items-center m-4'>
								<div className='flex-grow-1 text-center text-info'>
									Manage Category
								</div>
								<Button
									icon='UploadFile'
									color='warning'
									onClick={() => setAddModalStatus(true)}>
									Export
								</Button>
							</CardTitle>

							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-bordered border-primary table-hover text-center'>
									<thead>
										<tr>
											<th>Category name</th>
											<th>Sub Category</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{isLoading && (
											<tr>
												<td>Loading...</td>
											</tr>
										)}
										{error && (
											<tr>
												<td>Error fetching categories.</td>
											</tr>
										)}
										{categories &&
											categories
												.filter((category: any) =>
													searchTerm
														? category.name
																.toLowerCase()
																.includes(searchTerm.toLowerCase())
														: true,
												)
												.map((category: any) => (
													<tr key={category.cid}>
														<td>{category.name}</td>
														<td>
															<ul>
																{category.subcategory?.map(
																	(sub: any, index: any) => (
																		<p>{sub}</p>
																	),
																)}
															</ul>
														</td>
														<td>
															<Button
																icon='Edit'
																color='info'
																onClick={() =>
																	setEditModalStatus(true)
																}>
																Edit
															</Button>
															<Button
																className='m-2'
																icon='Delete'
																color='danger'
																onClick={() =>
																	handleClickDelete(category)
																}>
																Delete
															</Button>
														</td>
													</tr>
												))}
									</tbody>
								</table>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
			<CategoryAddModal setIsOpen={setAddModalStatus} isOpen={addModalStatus} id='' />
			<CategoryDeleteModal
				setIsOpen={setDeleteModalStatus}
				isOpen={deleteModalStatus}
				id=''
			/>
			<CategoryEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id={id} />
		</PageWrapper>
	);
};

export default Index;
