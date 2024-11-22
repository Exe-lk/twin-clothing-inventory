import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';
import { useGetLotsQuery } from '../../../redux/slices/lotAPISlice';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import ExportDropdown from '../../../components/ExportDropdown';
const Index: NextPage = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['50']);
	const [searchTerm, setSearchTerm] = useState('');
	const { data: lot, error, isLoading } = useGetLotsQuery(undefined);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [lot]);
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
						ref={inputRef}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardTitle className='d-flex justify-content-between align-items-center m-4'>
								<div className='flex-grow-1 text-center text-info '> Lots</div>
								<ExportDropdown
									tableSelector='table'
									title='Lot Management Report'
								/>
							</CardTitle>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-hover table-bordered border-primary'>
									<thead className={'table-dark border-primary'}>
										<tr>
											<th>Date</th>
											<th>Code</th>
											<th>GRN number</th>
											<th>Quantity</th>
											<th>Current Quantity</th>
											<th>Category</th>
											<th>Sub Category</th>
											<th>Supplier</th>
											<th>Description</th>
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
										{lot &&
											dataPagination(lot, currentPage, perPage)
												.filter((lot: any) =>
													searchTerm
														? lot.code
																.toString()
																.includes(
																	searchTerm.toLowerCase(),
																) ||
														  lot.GRN_number.toString().includes(
																searchTerm.toLowerCase(),
														  ) ||
														  lot.category
																.toLowerCase()
																.includes(
																	searchTerm.toLowerCase(),
																) ||
														  lot.subcategory
																.toLowerCase()
																.includes(searchTerm.toLowerCase())
														: true,
												)
												.map((lot: any) => (
													<tr key={lot.id}>
														<td>{lot.date}</td>
														<td>{lot.code}</td>
														<td>{lot.GRN_number}</td>
														<td>
															{lot.qty} {lot.uom}
														</td>
														<td>
															{lot.current_quantity} {lot.uom}
														</td>
														<td>{lot.category || lot.type}</td>
														<td>{lot.subcategory}</td>
														<td>{lot.supplier}</td>
														<td>{lot.description}</td>
													</tr>
												))}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={lot || []}
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
