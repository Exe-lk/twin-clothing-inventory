import React, { FC, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Button from '../bootstrap/Button';
import Swal from 'sweetalert2';
import { useUpdateJobMutation, useGetJobsQuery } from '../../redux/slices/jobApiSlice';

// Define the props for the ItemAddModal component
interface ItemAddModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
interface Category {
	categoryname: string;
	subcategory: string[];
}
// ItemAddModal component definition
const ItemAddModal: FC<ItemAddModalProps> = ({ id, isOpen, setIsOpen }) => {
	const { data: job } = useGetJobsQuery(undefined);
	const [updatejob, { isLoading }] = useUpdateJobMutation();
	const jobToEdit = job?.find((job: any) => job.id === id);

	const divRef: any = useRef(null);
	// Initialize formik for form management
	const formik = useFormik({
		initialValues: {
			id: jobToEdit?.id,
			code: jobToEdit?.code || '',
			description: jobToEdit?.description || '',
			client: jobToEdit?.client || '',
			status: true,
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: {
				code?: string;
				description?: string;
				client?: string;
			} = {};
			if (!values.code) {
				errors.code = 'Required';
			}
			if (!values.description) {
				errors.description = 'Required';
			}
			if (!values.client) {
				errors.client = 'Required';
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
				await updatejob(values).unwrap();

				Swal.fire('Edited!', 'job has been update successfully.', 'success');
				formik.resetForm();
			} catch (error) {
				console.error('Error during handleUpload: ', error);
				Swal.close();
			}
		},
	});

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id}   aria-hidden={!isOpen}>
			<ModalHeader
				setIsOpen={() => {
					setIsOpen(false);
					formik.resetForm();
				}}
				className='p-4'>
				<ModalTitle id=''>{'Edit Job '}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row g-4'>
					<FormGroup id='code' label='Job ID' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.code}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
							isTouched={formik.touched.code}
							invalidFeedback={formik.errors.code}
						/>
					</FormGroup>
					<FormGroup id='description' label='Description' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.description}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
							isTouched={formik.touched.description}
							invalidFeedback={formik.errors.description}
						/>
					</FormGroup>
					<FormGroup id='client' label='Client Name' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.client}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.client}
							invalidFeedback={formik.errors.client}
							validFeedback='Looks good!'
						/>
					</FormGroup>

					<div ref={divRef}>{/* <Barcode value={formik.values.barcode} /> */}</div>
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				{/* Save button to submit the form */}
				<Button color='info' onClick={formik.handleSubmit}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};
// Prop types definition for ItemAddModal component
ItemAddModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};
export default ItemAddModal;
function async() {
	throw new Error('Function not implemented.');
}
