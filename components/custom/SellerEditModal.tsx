import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Button from '../bootstrap/Button';
import Swal from 'sweetalert2';
import {
	useUpdateSupplierMutation,
	useGetSuppliersQuery,
} from '../../redux/slices/supplierAPISlice';

interface SellerAddModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const SellerAddModal: FC<SellerAddModalProps> = ({ id, isOpen, setIsOpen }) => {
	const { data: supplier } = useGetSuppliersQuery(undefined);
	const [updateSupplier] = useUpdateSupplierMutation();
	const SupplierToEdit = supplier?.find((supplier: any) => supplier.id === id);

	// Initialize formik for form management
	const formik = useFormik({
		initialValues: {
			id: SupplierToEdit?.id,
			name: SupplierToEdit?.name || '',
			phone: SupplierToEdit?.phone || '',
			email: SupplierToEdit?.email || '',
			company_name: SupplierToEdit?.company_name || '',
			company_email: SupplierToEdit?.company_email || '',
			product: [{ category: '', name: '' }],
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				name?: string;
				phone?: string;
				email?: string;
				company_name?: string;
				company_email?: string;
				products?: string[];
			} = {};

			if (!values.name) {
				errors.name = 'Required';
			}
			if (!values.phone) {
				errors.phone = 'Required';
			} else if (values.phone.length !== 10) {
				errors.phone = 'Mobile number must be exactly 10 digits';
			} else if (!/^0\d{9}$/.test(values.phone)) {
				errors.phone = 'Mobile number must start with 0 and be exactly 10 digits';
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
			if (!values.company_name) {
				errors.company_name = 'Required';
			}
			if (!values.company_email) {
				errors.company_email = 'Required';
			} else if (
				!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.company_email)
			) {
				errors.company_email = 'Email should not contain spaces or uppercase latters ';
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
				await updateSupplier(values).unwrap();
				Swal.fire('Updated!', 'Supplier has been update successfully.', 'success');
				formik.resetForm();
			} catch (error) {
				console.error('Error during handleUpload: ', error);
				Swal.close();
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
				<ModalTitle id=''>{'Edit Supplier'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row g-4'>
					<FormGroup id='name' label='Name' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.name}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='phone' label='Phone' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.phone}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.phone}
							invalidFeedback={formik.errors.phone}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='email' label='Email' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.email}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.email}
							invalidFeedback={formik.errors.email}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='company_name' label='Company Name' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.company_name}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.company_name}
							invalidFeedback={formik.errors.company_name}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='company_email' label='Company Email' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.company_email}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.company_email}
							invalidFeedback={formik.errors.company_email}
							validFeedback='Looks good!'
						/>
					</FormGroup>
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				<Button color='info' onClick={formik.handleSubmit}>
					Edit Supplier
				</Button>
			</ModalFooter>
		</Modal>
	);
};
// Prop types definition for SellerEditModal component
SellerAddModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};
export default SellerAddModal;
