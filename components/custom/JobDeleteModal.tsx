import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import Button from '../bootstrap/Button';
import Swal from 'sweetalert2';
import {
	useDeleteJobMutation,
	useGetJobsQuery,
	useGetDeletedJobsQuery,
	useUpdateJobMutation,
} from '../../redux/slices/jobApiSlice';
interface CategoryEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

const CategoryEditModal: FC<CategoryEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const { data: job, error, isLoading } = useGetDeletedJobsQuery(undefined);
	const [updatejob] = useUpdateJobMutation();
	const [deletejob] = useDeleteJobMutation();
	const { refetch } = useGetDeletedJobsQuery(undefined);
	
	const handleClickDelete = async (job: any) => {
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
				await deletejob(job.id).unwrap();
				Swal.fire('Deleted!', 'The job has been deleted.', 'success');

				// Perform delete action here
				console.log('Delete confirmed');
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete job.', 'error');
		}
	};

	const handleClickRestore = async (job: any) => {
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
					...job,
					status: true,
				};

				await updatejob(values);

				Swal.fire('Restore!', 'The job has been restore.', 'success');
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to delete job.', 'error');
		}
	};

	const handleDeleteAll = async () => {
		try {
			const { value: inputText } = await Swal.fire({
				title: 'Are you sure?',
				text: 'Please type "DELETE ALL" to confirm deleting all job',
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
				confirmButtonText: 'Yes, job all!',
			});

			if (inputText === 'DELETE ALL') {
				for (const jobs of job) {
					await deletejob(jobs.id).unwrap();
				}
				Swal.fire('Deleted!', 'All job have been deleted.', 'success');

				// Refetch categories after deletion
				refetch();
			}
		} catch (error) {
			console.error('Error deleting all categories:', error);
			Swal.fire('Error', 'Failed to delete all job.', 'error');
		}
	};

	// Handle restore all categories
	const handleRestoreAll = async () => {
		try {
			const result = await Swal.fire({
				title: 'Are you sure?',
				text: 'This will restore all job.',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, restore all!',
			});

			if (result.isConfirmed) {
				for (const jobs of job) {
					const values = {
						...jobs,
						status: true, // Assuming restoring means setting status to true
						
					};
					await updatejob(values).unwrap();
				}
				Swal.fire('Restored!', 'All job have been restored.', 'success');

				// Refetch categories after restoring
				refetch();
			}
		} catch (error) {
			console.error('Error restoring all categories:', error);
			Swal.fire('Error', 'Failed to restore all job.', 'error');
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
							<th>Job ID</th>
							<th>Client Name</th>
							<th>Description</th>
							
						
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
						{job &&
							job.map((job: any) => (
								<tr key={job.id}>
									<td>{job.code}</td>
									<td>{job.client}</td>
									<td>{job.description}</td>

									<td>
										<Button
											icon='Restore'
											tag='a'
											color='info'
											onClick={() => handleClickRestore(job)}>
											Restore
										</Button>

										<Button
											className='m-2'
											icon='Delete'
											color='danger'
											onClick={() => handleClickDelete(job)}>
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
