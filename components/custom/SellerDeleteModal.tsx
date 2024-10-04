import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import Button from '../bootstrap/Button';
import Swal from 'sweetalert2';
import Dropdown, { DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';
import {
	useDeleteSupplierMutation,
	useGetSuppliersQuery,
	useGetDeletedSuppliersQuery,
	useUpdateSupplierMutation,
} from '../../redux/slices/supplierAPISlice'

interface CategoryEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const CategoryEditModal: FC<CategoryEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const { data: supplier, error, isLoading } = useGetDeletedSuppliersQuery(undefined);
	const [updateSupplier] = useUpdateSupplierMutation();
	const [deleteSupplier] = useDeleteSupplierMutation();
	const { refetch } = useGetDeletedSuppliersQuery(undefined);

	const handleClickDelete = async (supplier: any) => {
		try {
			const { value: inputText } = await Swal.fire({
				title: 'Are you sure?',
				text: 'Please type "DELETE" to confirm ',
				input: 'text',
				icon: 'warning',
				inputValidator: (value) => {
					if (value !== 'DELETE') {
						return 'You need to type "DELETE" to confirm!';
					}
				},
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			});

			if (inputText === 'DELETE') {
				await deleteSupplier(supplier.id).unwrap();
				Swal.fire('Deleted!', 'The supplier has been deleted.', 'success');

				// Perform delete action here
				console.log('Delete confirmed');
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete supplier.', 'error');
		}
	};
	const handleClickRestore = async (supplier: any) => {
		try {
			const result = await Swal.fire({
				title: 'Are you sure?',

				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Restore it!',
			});
			if (result.isConfirmed) {
				const values = await {
					...supplier,
					status: true,
				};

				await updateSupplier(values);

				Swal.fire('Restored!', 'The supplier has been restored.', 'success');
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete supplier.', 'error');
		}
	};

	const handleDeleteAll = async () => {
		try {
			const { value: inputText } = await Swal.fire({
				title: 'Are you sure?',
				text: 'Please type "DELETE ALL" to confirm deleting all Suppliers',
				input: 'text',
				icon: 'warning',
				inputValidator: (value) => {
					if (value !== 'DELETE ALL') {
						return 'You need to type "DELETE ALL" to confirm!';
					}
				},
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete all!',
			});

			if (inputText === 'DELETE ALL') {
				for (const suppliers of supplier) {
					await deleteSupplier(suppliers.id).unwrap();
				}
				Swal.fire('Deleted!', 'All suppliers have been deleted.', 'success');

				// Refetch categories after deletion
				refetch();
			}
		} catch (error) {
			console.error('Error deleting all categories:', error);
			Swal.fire('Error', 'Failed to delete all suppliers.', 'error');
		}
	};

	// Handle restore all categories
	const handleRestoreAll = async () => {
		try {
			const result = await Swal.fire({
				title: 'Are you sure?',
				text: 'This will restore all suppliers.',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, restore all!',
			});

			if (result.isConfirmed) {
				for (const suppliers of supplier) {
					const values = {
						...suppliers,
						status: true, // Assuming restoring means setting status to true
						
					};
					await updateSupplier(values).unwrap();
				}
				Swal.fire('Restored!', 'All supplier have been restored.', 'success');

				// Refetch categories after restoring
				refetch();
			}
		} catch (error) {
			
			Swal.fire('Error', 'Failed to restore all suppliers.', 'error');
		}
	};
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id}>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle id=''>{'Recycle Bin'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<table className='table table-bordered border-primary table-modern table-hover'>
					<thead>
						<tr>
							<th>Supplier Name</th>
							<th>Company Name</th>
							<th>Company Email</th>
							<th>Phone Number</th>

						
							<th>
								<Button
									icon='Delete'
									onClick={handleDeleteAll}
									color='danger'
									isLight>
									Delete All
								</Button>
								<Button
									icon='Restore'
									className='ms-3'
									onClick={handleRestoreAll}
									color='primary'>
									Restore All
								</Button>
							</th>
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
							supplier.map((supplier: any) => (
								<tr key={supplier.id}>
									<td>{supplier.name}</td>
									<td>{supplier.company_name}</td>
									<td>{supplier.company_email}</td>
									<td>{supplier.phone}</td>

									<td>
										<Button
											icon='Restore'
											tag='a'
											color='info'
											onClick={() => handleClickRestore(supplier)}>
											Restore
										</Button>

										<Button
											className='m-2'
											icon='Delete'
											color='danger'
											onClick={() => handleClickDelete(supplier)}>
											Delete
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</ModalBody>
		</Modal>
	);
};

CategoryEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default CategoryEditModal;
