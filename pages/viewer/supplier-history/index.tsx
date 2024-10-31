import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';
import { useGetSuppliersQuery } from '../../../redux/slices/supplierAPISlice';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import ExportDropdown from '../../../components/ExportDropdown';

const Index: NextPage = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['50']);
	const [searchTerm, setSearchTerm] = useState('');
	const { data: supplier, error, isLoading } = useGetSuppliersQuery(undefined);

	return (
		<PageWrapper>
			<Head>
				<></>
			</Head>
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
						placeholder='Search Supplier...'
						onChange={(event: any) => {
							setSearchTerm(event.target.value);
						}}
						value={searchTerm}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardTitle className='d-flex justify-content-between align-items-center m-4'>
								<div className='flex-grow-1 text-center text-info '>Suppliers</div>
								<ExportDropdown
									tableSelector='table'
									title='Supplier Management Report'
								/>
							</CardTitle>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-hover table-bordered border-primary'>
									<thead className={'table-dark border-primary'}>
										<tr>
											<th>Supplier Name</th>
											<th>Company Name</th>
											<th>Company Email</th>
											<th>Phone Number</th>
											<th>Supplier Email</th>
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
										{supplier &&
											dataPagination(supplier, currentPage, perPage)
												.filter((supplier: any) =>
													searchTerm
														? supplier.name
																.toLowerCase()
																.includes(searchTerm.toLowerCase())
														: true,
												)
												.map((supplier: any) => (
													<tr key={supplier.id}>
														<td>{supplier.name}</td>
														<td>{supplier.company_name}</td>
														<td>{supplier.company_email}</td>
														<td>{supplier.phone}</td>
														<td>{supplier.email}</td>
													</tr>
												))}
									</tbody>
								</table>
							</CardBody>

							<PaginationButtons
								data={supplier || []}
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
