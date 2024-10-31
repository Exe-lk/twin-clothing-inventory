import React, { useState } from 'react';
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
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
const Index: NextPage = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['50']);
	const [searchTerm, setSearchTerm] = useState('');
	const { data: transaction, error, isLoading } = useGetTransactionsQuery(undefined);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const position = [{ position: 'Return' }, { position: 'Restore' }, { position: 'Stock Out' }];
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
									<FormGroup label='Category' className='col-12'>
										<ChecksGroup>
											{position.map((category: any, index) => (
												<Checks
													key={category.position}
													id={category.position}
													label={category.position}
													name={category.position}
													value={category.position}
													checked={selectedCategories.includes(
														category.position,
													)}
													onChange={(event: any) => {
														const { checked, value } = event.target;
														setSelectedCategories((prevCategories) =>
															checked
																? [...prevCategories, value]
																: prevCategories.filter(
																		(category) =>
																			category !== value,
																  ),
														);
													}}
												/>
											))}
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
						</DropdownMenu>
					</Dropdown>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardTitle className='d-flex justify-content-between align-items-center m-4'>
								<div className='flex-grow-1 text-center text-info'>
									Transaction History
								</div>
							</CardTitle>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-hover table-bordered border-primary'>
									<thead className={'table-dark border-primary'}>
										<tr>
											<th>Code</th>
											<th>Date</th>
											<th>Type</th>
											<th>Quantity</th>
											<th>Lot Type</th>
											<th>Category</th>
											<th>Sub Category</th>
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
											dataPagination(transaction, currentPage, perPage)
												.filter((transaction: any) =>
													searchTerm
														? transaction.code
																.toLowerCase()
																.includes(searchTerm.toLowerCase())
														: true,
												)
												.filter((transaction: any) =>
													selectedCategories.length > 0
														? selectedCategories.includes(
																transaction.order_type,
														  )
														: true,
												)
												.map((transaction: any) => {
													let textColorClass = '';
													if (transaction.order_type == 'Restore') {
														textColorClass = 'text-warning';
													} else if (
														transaction.order_type === 'Return'
													) {
														textColorClass = 'text-danger';
													} else if (
														transaction.order_type === 'Stock Out'
													) {
														textColorClass = 'text-success';
													}
													return (
														<tr
															key={transaction.id}
															className={textColorClass}>
															<td className={textColorClass}>
																{transaction.code}
															</td>
															<td className={textColorClass}>
																{transaction.date}
															</td>
															<td className={textColorClass}>
																{transaction.order_type}
															</td>
															<td className={textColorClass}>
																{transaction.quentity}{' '}
																{transaction.uom}
															</td>
															<td className={textColorClass}>
																{transaction.lot_type}
															</td>
															<td className={textColorClass}>
																{transaction.category ||
																	transaction.type}
															</td>
															<td className={textColorClass}>
																{transaction.subcategory}
															</td>
														</tr>
													);
												})}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={transaction || []}
								label='parts'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
export default Index;
