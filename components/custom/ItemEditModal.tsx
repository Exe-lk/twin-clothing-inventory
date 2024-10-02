import React, { FC, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Button from '../bootstrap/Button';
import Swal from 'sweetalert2';
import Select from '../bootstrap/forms/Select';
import Option from '../bootstrap/Option';
import { useUpdateLotMutation, useGetLotsQuery } from '../../redux/slices/lotAPISlice';
import Checks, { ChecksGroup } from '../bootstrap/forms/Checks';
import { useGetFabricsQuery } from '../../redux/slices/fabricApiSlice';
import { useGetGSMsQuery } from '../../redux/slices/gsmApiSlice';
import { useGetKnitTypesQuery } from '../../redux/slices/knitTypeApiSlice';
import { useGetCategoriesQuery } from '../../redux/slices/categoryApiSlice'; // Import the RTK Query hook
import { useGetColorsQuery } from '../../redux/slices/colorApiSlice';
import { useGetSuppliersQuery } from '../../redux/slices/supplierAPISlice';

interface ItemAddModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

interface SelectOption {
	value: string;
	label: string;
}

const ItemAddModal: FC<ItemAddModalProps> = ({ id, isOpen, setIsOpen }) => {
	const [subcategories, setSubcategories] = useState<SelectOption[]>([]);
	const [isAddingNewColor, setIsAddingNewColor] = useState(false);
	const [isAddingNewFabric, setIsAddingNewFabric] = useState(false);
	const [isAddingNewGSM, setIsAddingNewGSM] = useState(false);
	const [isAddingNewKnitType, setIsAddingNewKnitType] = useState(false);
	const [selectedOption, setSelectedOption] = useState('Fabric');
	const { refetch } = useGetLotsQuery(undefined);
	const { data: fabric } = useGetFabricsQuery(undefined);
	const { data: gsm } = useGetGSMsQuery(undefined);
	const { data: knit } = useGetKnitTypesQuery(undefined);
	const { data: supplier } = useGetSuppliersQuery(undefined);
	const { data: categories } = useGetCategoriesQuery(undefined);
	const { data: color } = useGetColorsQuery(undefined);

	const { data: lots } = useGetLotsQuery(undefined);
	const [updateLot, { isLoading }] = useUpdateLotMutation();

	const lotToEdit = lots?.find((lot: any) => lot.id === id);

	console.log(lotToEdit);
	const formik = useFormik({
		initialValues: {
			id: lotToEdit?.id,
			code: lotToEdit?.code || '',
			date: lotToEdit?.date || '',
			description: lotToEdit?.description || '',
			color: lotToEdit?.color || '',
			fabric_type: lotToEdit?.fabric_type || '',
			gsm: lotToEdit?.gsm || '',
			width: lotToEdit?.width || '',
			knit_type: lotToEdit?.knit_type || '',
			GRN_number: lotToEdit?.GRN_number || '',
			GRA_number: lotToEdit?.GRA_number || '',
			status: true,
			category: lotToEdit?.category || '',
			subcategory: lotToEdit?.subcategory || '',
			supplier: lotToEdit?.supplier || '',
			order: lotToEdit?.order || '',
			uom: lotToEdit?.uom || '',
			Job_ID: lotToEdit?.Job_ID || '',
			Yrds: lotToEdit?.Yrds || '',
			bales: lotToEdit?.bales || '',
			qty: lotToEdit?.qty || '',
		},
		enableReinitialize: true,
		validate: (values) => {
			const errors: Record<string, string> = {};
			if (!values.code) errors.code = 'Required';
			if (!values.date) errors.date = 'Required';
			if (!values.GRN_number) errors.GRN_number = 'Required';
			if (!values.order) errors.order = 'Required';
			if (!values.qty) errors.qty = 'Required';
			if (!values.supplier) errors.supplier = 'Required';
			if (!values.uom) errors.uom = 'Required';
			if (!values.description) errors.description = 'Required';
			if (selectedOption == 'Fabric' && !values.bales) errors.bales = 'Required';
			if (selectedOption == 'Other' && !values.category) errors.category = 'Required';
			if (selectedOption != 'Fabric' && !values.subcategory) errors.subcategory = 'Required';
			if ( !values.color) errors.color = 'Required';
			if (selectedOption == 'Fabric' && !values.fabric_type) errors.fabric_type = 'Required';
			if (selectedOption == 'Fabric' && !values.gsm) errors.gsm = 'Required';
			if (selectedOption == 'Fabric' && !values.width) errors.width = 'Required';
			if (selectedOption == 'Fabric' && !values.knit_type) errors.knit_type = 'Required';
			if (selectedOption == 'Thread' && !values.Yrds) errors.Yrds = 'Required';


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
				await updateLot(values).unwrap();

				Swal.fire('update!', 'Lot has been update successfully.', 'success');
				formik.resetForm();
			} catch (error) {
				console.error('Error during handleUpload: ', error);
				Swal.close();
				alert('An error occurred during file upload. Please try again later.');
			}
		},
	});

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};
	const handleCategoryChange = (e: any) => {
		const selectedCategory = e.target.value;
		formik.handleChange(e);
		setSelectedOption(e.target.value);
		const selectedCategoryData = categories.find((cat: any) => cat.name === selectedCategory);
		if (selectedCategoryData) {
			const options = selectedCategoryData.subcategory.map((subcat: any) => ({
				value: subcat,
				label: subcat,
			}));
			setSubcategories(options);
			console.log(options);
		} else {
			setSubcategories([]);
		}
	};

	const handleResetForm = () => {
		formik.resetForm();
		setIsAddingNewColor(false);
		setIsAddingNewFabric(false);
		setIsAddingNewGSM(false);
		setIsAddingNewKnitType(false);
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id}>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle id=''>{'Edit LOT'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				<div className='row g-4'>
					{/*checked buttons for Fabric and Thread */}
					<FormGroup id='typeSelection' className='col-md-12'>
						<ChecksGroup isInline>
							<Checks
								type='radio'
								id='fabricOption'
								label='Fabric'
								name='type'
								value='Fabric'
								onChange={handleOptionChange}
								checked={selectedOption}
							/>
							<Checks
								type='radio'
								id='threadOption'
								label='Thread'
								name='type'
								value='Thread'
								onChange={handleOptionChange}
								checked={selectedOption}
							/>
							<Checks
								type='radio'
								id='other'
								label='Other'
								name='type'
								value='Other'
								onChange={handleOptionChange}
								checked={selectedOption}
							/>
						</ChecksGroup>
					</FormGroup>

					{/* Common input fields */}
					{selectedOption === 'Other' && (
						<FormGroup
							id='category'
							label='Category'
							onChange={formik.handleChange}
							className='col-md-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select category'
								onChange={handleCategoryChange}
								value={formik.values.category}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								validFeedback='Looks good!'>
								{categories &&
									categories.map((category: any) => (
										<>
											<Option value={category.name}>{category.name}</Option>
										</>
									))}
							</Select>
						</FormGroup>
					)}

					{/* Common input fields */}
					{selectedOption === 'Thread' && (
						<FormGroup id='subcategory' label='Sub Category' className='col-md-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select sub category'
								onChange={formik.handleChange}
								value={formik.values.subcategory}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								validFeedback='Looks good!'>
								{subcategories &&
									subcategories.map((category: any) => (
										<>
											<Option value={category.value}>{category.label}</Option>
										</>
									))}
							</Select>
						</FormGroup>
					)}
					{selectedOption === 'Other' && (
						<FormGroup id='subcategory' label='Sub Category' className='col-md-6'>
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select sub category'
								onChange={formik.handleChange}
								value={formik.values.subcategory}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								validFeedback='Looks good!'>
								{subcategories &&
									subcategories.map((category: any) => (
										<>
											<Option value={category.value}>{category.label}</Option>
										</>
									))}
							</Select>
						</FormGroup>
					)}

					<FormGroup id='code' label='Code' className='col-md-6'>
						<Input
							disabled
							onChange={formik.handleChange}
							value={formik.values.code}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='date' label='date' className='col-md-6'>
						<Input
							type='date'
							onChange={formik.handleChange}
							value={formik.values.date}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='description' label='Description' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.description}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
						/>
					</FormGroup>

					<FormGroup id='color' label='Color' className='col-md-6'>
						{!isAddingNewColor ? (
							<Select
								ariaLabel='Default select example'
								placeholder='Open this select color'
								onChange={(e: any) => {
									if (e.target.value === 'Add new') {
										setIsAddingNewColor(true); // Switch to input field
									} else {
										formik.handleChange(e);
									}
								}}
								value={formik.values.color}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								validFeedback='Looks good!'>
								<Option value='Add new'>Add new</Option>

								{color &&
									color.map((color: any) => (
										<>
											<Option value={color.name}>{color.name}</Option>
										</>
									))}
							</Select>
						) : (
							<Input
								type='text'
								placeholder='Enter new color'
								onChange={formik.handleChange}
								value={formik.values.color}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								validFeedback='Looks good!'
							/>
						)}
					</FormGroup>
					<FormGroup id='GRN_number' label='GRN Number' className='col-md-6'>
						<Input
							type='number'
							onChange={formik.handleChange}
							value={formik.values.GRN_number}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='supplier' label='supplier Name' className='col-md-6'>
						<Select
							ariaLabel='Default select example'
							placeholder='Open this select supplier'
							onChange={formik.handleChange}
							value={formik.values.supplier}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'>
							{supplier &&
								supplier.map((supplier: any) => (
									<>
										<Option value={supplier.name}>{supplier.name}</Option>
									</>
								))}
						</Select>
					</FormGroup>
					<FormGroup id='order' label='Order Details' className='col-md-6'>
						<Input
							type='text'
							onChange={formik.handleChange}
							value={formik.values.order}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='uom' label='UOM' className='col-md-6'>
						<Select
							ariaLabel='Default select example'
							placeholder='Open this select UOM'
							onChange={formik.handleChange}
							value={formik.values.uom}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'>
							<Option value='Pieces'>Pieces</Option>
							<Option value='Yards'>Yards</Option>
							<Option value='Cones'>Cones</Option>
							<Option value='Kg'>Kg</Option>
						</Select>
					</FormGroup>
					<FormGroup id='qty' label='Qty' className='col-md-6'>
						<Input
							type='number'
							onChange={formik.handleChange}
							value={formik.values.qty}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							validFeedback='Looks good!'
						/>
					</FormGroup>

					{/* when Fabric selected */}
					{selectedOption === 'Fabric' && (
						<>
							<p>Fabric</p>

							<FormGroup id='fabric_type' label='Fabric Type' className='col-md-6'>
								{isAddingNewFabric ? (
									<Input
										placeholder='Add new fabric type'
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										onChange={(e: any) =>
											formik.setFieldValue('fabric_type', e.target.value)
										}
										value={formik.values.fabric_type}
									/>
								) : (
									<Select
										ariaLabel='Fabric type select'
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										onChange={(e: any) => {
											if (e.target.value === 'Add new') {
												setIsAddingNewFabric(true);
											} else {
												formik.handleChange(e);
											}
										}}
										value={formik.values.fabric_type}>
										<Option value=''>Select Fabric Type</Option>
										<Option value='Add new'>Add New</Option>
										{/* Existing fabric type options can be dynamically loaded here */}

										{fabric &&
											fabric.map((fabric: any) => (
												<>
													<Option value={fabric.name}>
														{fabric.name}
													</Option>
												</>
											))}
									</Select>
								)}
							</FormGroup>
							<FormGroup id='gsm' label='GSM' className='col-md-6'>
								{isAddingNewGSM ? (
									<Input
										placeholder='Add new GSM'
										onChange={(e: any) =>
											formik.setFieldValue('gsm', e.target.value)
										}
										value={formik.values.gsm}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
									/>
								) : (
									<Select
										ariaLabel='GSM select'
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										onChange={(e: any) => {
											if (e.target.value === 'Add new') {
												setIsAddingNewGSM(true);
											} else {
												formik.handleChange(e);
											}
										}}
										value={formik.values.gsm}>
										<Option value=''>Select GSM</Option>
										<Option value='Add new'>Add New</Option>
										{gsm &&
											gsm.map((gsm: any) => (
												<>
													<Option value={gsm.name}>{gsm.name}</Option>
												</>
											))}
									</Select>
								)}
							</FormGroup>
							<FormGroup id='width' label='Width' className='col-md-6'>
								<Input
									type='number'
									onChange={formik.handleChange}
									value={formik.values.width}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							{/* Knit Type FormGroup with Dynamic Input */}
							<FormGroup id='knit_type' label='Knit Type' className='col-md-6'>
								{isAddingNewKnitType ? (
									<Input
										placeholder='Add new knit type'
										onChange={(e: any) =>
											formik.setFieldValue('knit_type', e.target.value)
										}
										value={formik.values.knit_type}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
									/>
								) : (
									<Select
										ariaLabel='Default select example'
										placeholder='Open this select knit type'
										onChange={(e: any) => {
											if (e.target.value === 'Add new') {
												setIsAddingNewKnitType(true);
											} else {
												formik.handleChange(e);
											}
										}}
										value={formik.values.knit_type}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										validFeedback='Looks good!'>
										{/* <Option value=''>Select Knit Type</Option> */}

										<Option value='Add new'>Add new</Option>
										{knit &&
											knit.map((knit: any) => (
												<>
													<Option value={knit.name}>{knit.name}</Option>
												</>
											))}
									</Select>
								)}
							</FormGroup>

							{/* <FormGroup id='Job_ID' label='Job ID' className='col-md-6'>
								<Input
									type='text'
									onChange={formik.handleChange}
									value={formik.values.Job_ID}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									isTouched={formik.touched.Job_ID}
									invalidFeedback={formik.errors.Job_ID}
									validFeedback='Looks good!'
								/>
							</FormGroup> */}

							<FormGroup id='bales' label='Bales' className='col-md-6'>
								<Input
									type='number'
									onChange={formik.handleChange}
									value={formik.values.bales}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</>
					)}

					{/*  when Thread selected */}
					{selectedOption === 'Thread' && (
						<>
							<p>Thread</p>
							<FormGroup id='Yrds' label='Yrds per cone' className='col-md-6'>
								<Input
									type='number'
									onChange={formik.handleChange}
									value={formik.values.Yrds}
									onBlur={formik.handleBlur}
									isValid={formik.isValid}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</>
					)}
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				{/* Save button to submit the form */}
				<Button color='warning' onClick={handleResetForm}>
					Reset
				</Button>
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
