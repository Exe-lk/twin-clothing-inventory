import React, { FC, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Button from '../bootstrap/Button';
import Swal from 'sweetalert2';
import { useGetJobsQuery, useAddJobMutation } from '../../redux/slices/jobApiSlice';

interface ItemAddModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const ItemAddModal: FC<ItemAddModalProps> = ({ id, isOpen, setIsOpen }) => {
	const [addjob] = useAddJobMutation();
	const { refetch } = useGetJobsQuery(undefined);
	const divRef: any = useRef(null);

	const formik = useFormik({
		initialValues: {
			code: '',
			description: '',
			client: '',
			status: true,
		},
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
				await addjob(values).unwrap();
				refetch();
				setIsOpen(false);
				Swal.fire('Added!', 'job has been added successfully.', 'success');
				formik.resetForm();
			} catch (error) {
				Swal.close();
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
				<ModalTitle id=''>{'New Job '}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row g-4'>
					<FormGroup id='code' label='Job ID' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.code}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.code}
							invalidFeedback={formik.errors.code}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='description' label='Description' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.description}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.description}
							invalidFeedback={formik.errors.description}
							validFeedback='Looks good!'
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
					<div ref={divRef}></div>
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				<Button color='info' onClick={formik.handleSubmit}>
					Add Job
				</Button>
			</ModalFooter>
		</Modal>
	);
};

ItemAddModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};
export default ItemAddModal;
