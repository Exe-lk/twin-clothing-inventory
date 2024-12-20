import React, { FC} from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Button from '../bootstrap/Button';
import Swal from 'sweetalert2';
import Select from '../bootstrap/forms/Select';
import Option from '../bootstrap/Option';
import { useGetUsersQuery, useUpdateUserMutation } from '../../redux/slices/userManagementApiSlice';

interface UserEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	refetch(...args: unknown[]): unknown;
}

const UserEditModal: FC<UserEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const { data: users, refetch } = useGetUsersQuery(undefined);
	const [updateUser] = useUpdateUserMutation();
	const userToEdit = users?.find((user: any) => user.id === id);

	const formik = useFormik({
		initialValues: {
			id: '',
			name: userToEdit?.name || '',
			role: userToEdit?.role || '',
			mobile: userToEdit?.mobile || '',
			email: userToEdit?.email || '',
			nic: userToEdit?.nic || '',
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				name?: string;
				role?: string;
				mobile?: string;
				email?: string;
				nic?: string;
			} = {};
			if (!values.role) {
				errors.role = 'Required';
			}
			if (!values.name) {
				errors.name = 'Required';
			}
			if (!values.mobile) {
				errors.mobile = 'Required';
			} else if (values.mobile.length !== 10) {
				errors.mobile = 'Mobile number must be exactly 10 digits';
			} else if (!/^0\d{9}$/.test(values.mobile)) {
				errors.mobile = 'Mobile number must start with 0 and be exactly 10 digits';
			}
			if (!values.nic) {
				errors.nic = 'Required';
			} else if (!/^\d{9}[Vv]$/.test(values.nic) && !/^\d{12}$/.test(values.nic)) {
				errors.nic = 'NIC must be 9 digits followed by "V" or 12 digits';
			}
			if (!values.email) {
				errors.email = 'Required';
			} else if (!values.email.includes('@')) {
				errors.email = 'Invalid email format.';
			} else if (values.email.includes(' ')) {
				errors.email = 'Email should not contain spaces.';
			} else if (/[A-Z]/.test(values.email)) {
				errors.email = 'Email should be in lowercase only.';
			}		
			return errors;
		},
		onSubmit: async (values) => {
			try {
				Swal.fire({
					title: 'Processing...',
					html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
					allowOutsideClick: false,
					showCancelButton: false,
					showConfirmButton: false,
				});
				try {
					const data = {
						name: values.name,
						role: values.role,
						mobile: values.mobile,
						email: values.email,
						nic: values.nic,
						status: true,
						id: id,
					};
					await updateUser(data).unwrap();
					refetch();
					await Swal.fire({
						icon: 'success',
						title: 'User Updated Successfully',
					});
					formik.resetForm();
					setIsOpen(false);
				} catch (error) {
					await Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Failed to update the user. Please try again.',
					});
				}
			} catch (error) {
				console.error('Error during handleUpload: ', error);
				alert('An error occurred during file upload. Please try again later.');
			}
		},
	});
	
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id}>
			<ModalHeader
				setIsOpen={() => {
					setIsOpen(false);
					formik.resetForm();
				}}
				className='p-4'>
				<ModalTitle id=''>{'Edit User'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row g-4'>
					<FormGroup id='name' label='Name' className='col-md-6'>
						<Input
							name='name'
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.name}
							invalidFeedback={formik.errors.name}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='role' label='Role' className='col-md-6'>
						<Select
							disabled={
								formik.values.role == 'Admin' || formik.values.role == 'Viewer'
							}
							name='role'
							placeholder='Select user role'
							value={formik.values.role}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.role}
							invalidFeedback={formik.errors.role}
							ariaLabel={''}>
							<Option value={'Production Coordinator'}>Production Coordinator</Option>
							<Option value={'Stock Keeper'}>Stock Keeper</Option>
						</Select>
					</FormGroup>
					<FormGroup id='mobile' label='Mobile number' className='col-md-6'>
						<Input
							name='mobile'
							value={formik.values.mobile}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.mobile}
							invalidFeedback={formik.errors.mobile}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='email' label='Email' className='col-md-6'>
						<Input
							disabled
							name='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.email}
							invalidFeedback={formik.errors.email}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='nic' label='NIC' className='col-md-6'>
						<Input
							name='nic'
							value={formik.values.nic}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.nic}
							invalidFeedback={formik.errors.nic}
							validFeedback='Looks good!'
						/>
					</FormGroup>
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				<Button color='info' onClick={formik.handleSubmit}>
					Edit User
				</Button>
			</ModalFooter>
		</Modal>
	);
};
// Prop types definition for CustomerEditModal component
UserEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};
export default UserEditModal;
