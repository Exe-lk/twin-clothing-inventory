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
	const formik = useFormik({
		initialValues: {
			categoryname: '',
			status: true,
			subcategory: [''],
		},
		validate: (values) => {
			const errors: {
				categoryname?: string;
				subcategory?: string;
			} = {};
			if (!values.categoryname) {
				errors.categoryname = 'Required';
			}
			if (values.subcategory) {
				errors.subcategory = 'Required';
			}
			return errors;
		},
		onSubmit: async (values) => {
			try {
				console.log(values);
				values.status = true;
				const collectionRef = collection(firestore, 'category');
				addDoc(collectionRef, values)
					.then(() => {
						showNotification(
							<span className='d-flex align-items-center'>
								<Icon icon='Info' size='lg' className='me-1' />
								<span>Successfully Added</span>
							</span>,
							'category has been added successfully',
						);
						Swal.fire('Added!', 'Category has been added successfully.', 'success');
						formik.resetForm();
						setIsOpen(false);
					})
					.catch((error) => {
						console.error('Error adding document: ', error);
						alert(
							'An error occurred while adding the document. Please try again later.',
						);
					});
			} catch (error) {
				console.error('Error during handleUpload: ', error);
				alert('An error occurred during file upload. Please try again later.');
			}
		},
	});

	const addSubcategoryField = () => {
		formik.setValues({
			...formik.values,
			subcategory: [...formik.values.subcategory, ''],
		});
	};

	const removeSubcategoryField = (index: number) => {
		const newSubcategories = [...formik.values.subcategory];
		newSubcategories.splice(index, 1);
		formik.setValues({
			...formik.values,
			subcategory: newSubcategories,
		});
	};
    interface Category {
        cid: string;
        categoryname: string;
        status:boolean
    }
    const { darkModeStatus } = useDarkMode(); // Dark mode
	const [searchTerm, setSearchTerm] = useState(''); // State for search term
	const [category, setcategory] = useState<Category[]>([]); // State for category data
	// State for current category ID
	const [status, setStatus] = useState(true); // State for managing data fetching status
	// Fetch category data from Firestore on component mount or when add/edit modals are toggled
	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = collection(firestore, 'category');
				const q = query(dataCollection, where('status', '==', false));
				const querySnapshot = await getDocs(q);
				const firebaseData = querySnapshot.docs.map((doc) => {
					const data = doc.data() as Category;
					return {
						...data,
						cid: doc.id,
					};
				});
				setcategory(firebaseData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchData();
	}, []);
	const customOptions = {
		width: 3,
		color: '#FF0000',
	};
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id}>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle id=''>{'New Category'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
			<table className='table table-bordered border-primary table-modern table-hover text-center'>
									<thead>
										<tr>
											<th>Category name</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{category
											.filter((values) => {
												if (searchTerm == '') {
													return values;
												} else if (
													values.categoryname
														.toLowerCase()
														.includes(searchTerm.toLowerCase())
												) {
													return values;
												}
											})
											.map((category, index) => (
												<tr key={category.cid}>
													<td>{category.categoryname}</td>
													<td>
														<Button
															icon='Restore'
															tag='a'
															color='info'
															>
															Restore
														</Button>
                                                        <Button
															className='m-2'
															icon='Delete'
															color='danger'
															>
															Delete
														</Button>
													</td>
												</tr>
											))}
									</tbody>
								</table>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				<Button color='info' onClick={formik.handleSubmit}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};

CategoryEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default CategoryEditModal;
