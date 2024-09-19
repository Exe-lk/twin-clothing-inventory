import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import showNotification from '../extras/showNotification';
import Icon from '../icon/Icon';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Button from '../bootstrap/Button';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import Swal from 'sweetalert2';
import useDarkMode from '../../hooks/useDarkMode';
import Dropdown, { DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';

import {
	useDeleteUserMutation,
	useGetUsersQuery,
	useGetDeleteUsersQuery,
	useUpdateUserMutation,
} from '../../redux/slices/userManagementApiSlice';
interface CategoryEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const CategoryEditModal: FC<CategoryEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	
	const { data: user, error, isLoading } = useGetDeleteUsersQuery(undefined);
	const [updateuser] = useUpdateUserMutation();
	const [deleteuser] = useDeleteUserMutation();
	const { refetch } = useGetDeleteUsersQuery(undefined)
	const handleClickDelete = async (user:any) => {
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
				// Perform delete action here
				await deleteuser(user.id).unwrap();
				Swal.fire('Deleted!', 'The user has been deleted.', 'success');

				console.log('Delete confirmed');
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete user.', 'error');
		}
	};
	const handleClickRestore = async (user: any) => {
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
					...user,
					status: true,
				};

				await updateuser(values);

				Swal.fire('Restored!', 'The user has been restored.', 'success');
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete category.', 'error');
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
				for (const users of user) {
					await deleteuser(users.id).unwrap();
				}
				Swal.fire('Deleted!', 'All users have been deleted.', 'success');

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
				for (const users of user) {
					const values = {
						...users,
						status: true, // Assuming restoring means setting status to true
						
					};
					await updateuser(values).unwrap();
				}
				Swal.fire('Restored!', 'All categories have been restored.', 'success');

				// Refetch categories after restoring
				refetch();
			}
		} catch (error) {
			console.error('Error restoring all categories:', error);
			Swal.fire('Error', 'Failed to restore all categories.', 'error');
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
							<th>User</th>
							<th>Position</th>
							<th>Email</th>
							<th>Mobile number</th>

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
						{user &&
							user.map((user: any) => (
								<tr key={user.id}>
									<td>{user.name}</td>
									<td>{user.role}</td>
									<td>{user.email}</td>
									<td>{user.mobile}</td>

									<td>
										<Button
											icon='Restore'
											tag='a'
											color='info'
											onClick={() => handleClickRestore(user)}>
											Restore
										</Button>

										<Button
											className='m-2'
											icon='Delete'
											color='danger'
											onClick={() => handleClickDelete(user)}>
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
