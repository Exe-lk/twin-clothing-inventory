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

interface CategoryEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const CategoryEditModal: FC<CategoryEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const handleClickDelete = async () => {
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
				console.log('Delete confirmed');
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete category.', 'error');
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
							<th>Code</th>
							<th>Color</th>
							<th>Description</th>
							<th>GSM</th>
							<th>Knit Type</th>
							<th>GRN number</th>

							<th>
								<Button
									icon='Delete'
									color='primary'
									isLight
									onClick={handleClickDelete}>
									Delete All
								</Button>
								<Button icon='Restore' className='ms-3' color='primary'>
									Restore All
								</Button>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>5641</td>
							<td>green</td>
							<td>abc</td>
							<td>70</td>
							<td>123</td>
							<td>785</td>

							<td>
								<Button icon='Restore' tag='a' color='info'>
									{' '}
									Restore
								</Button>
								<Button
									className='m-2'
									icon='Delete'
									color='danger'
									onClick={handleClickDelete}
									// onClick={() =>
									// 	handleClickDelete(stock.cid)
									// }
								>
									Delete
								</Button>
							</td>
						</tr>
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
