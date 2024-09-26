import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';
import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import { useGetTransactionsQuery } from '../../../redux/slices/transactionHistoryApiSlice';

const Index: NextPage = () => {
	const [searchTerm, setSearchTerm] = useState(''); // State for search term
	const { data: transaction, error, isLoading } = useGetTransactionsQuery(undefined);
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					{/* Search input */}
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
						onChange={(event: any) => {
							setSearchTerm(event.target.value);
						}}
						value={searchTerm}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='FilterAlt'
								color='dark'
								isLight
								className='btn-only-icon position-relative'></Button>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg'>
							<div className='container py-2'>
								<div className='row g-3'>
									<FormGroup label='Category type' className='col-12'>
										<ChecksGroup>
											<Checks
												key='check'
												id='check'
												label='Outgoing'
												name='check'
												value='check'></Checks>
											<Checks
												key='check'
												id='check'
												label='Return'
												name='check'
												value='check'></Checks>
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
						</DropdownMenu>
					</Dropdown>
					{/* Button to open  New Item modal */}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						{/* Table for displaying customer data */}
						<Card stretch>
							<CardTitle className='d-flex justify-content-between align-items-center m-4'>
								<div className='flex-grow-1 text-center text-info'>
									Transaction History
								</div>
								<Button icon='UploadFile' color='warning'>
									Export
								</Button>
							</CardTitle>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-bordered border-primary table-hover '>
									<thead>
										<tr>
											<th>Code</th>
											<th>Date</th>
											<th>Type</th>
											<th>Quentity</th>
											<th>Lot Type</th>
											<th>Category</th>
											<th>Sub cCategory</th>
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
										{transaction &&
											transaction
												.filter((transaction: any) =>
													searchTerm
														? transaction.code
																.toLowerCase()
																.includes(searchTerm.toLowerCase())
														: true,
												)
												.map((transaction: any) => {
													// Determine the appropriate Bootstrap text color class based on order_type
													let textColorClass = '';
													if (transaction.order_type == 'Restore') {
														textColorClass = 'text-warning';
													} else if (transaction.order_type === 'Return') {
														textColorClass = 'text-danger';
													} else if (transaction.order_type === 'Stock Out') {
														textColorClass = 'text-success';
													}
									
													return (
														<tr key={transaction.id} className={textColorClass}>
															<td className={textColorClass}>{transaction.code}</td>
															<td className={textColorClass}>{transaction.date}</td>
															<td className={textColorClass}>{transaction.order_type}</td>
															<td className={textColorClass}>{transaction.quentity}</td>
															<td className={textColorClass}>{transaction.lot_type}</td>
															<td className={textColorClass}>{transaction.category}</td>
															<td className={textColorClass}>{transaction.subcategory}</td>
															
														</tr>
													);
												})}
									</tbody>
								</table>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
export default Index;
