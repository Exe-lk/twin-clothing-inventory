import React, { FC, useCallback, useContext, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/authContext';
import useDarkMode from '../../../hooks/useDarkMode';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Swal from 'sweetalert2';
import Logo from '../../../components/Logo';
import { useAddUserMutation } from '../../../redux/slices/userApiSlice';
import { QrReader } from 'react-qr-reader';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = () => {
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Scan QR to continue!</div>
		</>
	);
};

interface User {
	password: string;
	email: string;
	position: string;
}

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: NextPage<ILoginProps> = ({ isSignUp }) => {
	const router = useRouter();
	const { darkModeStatus } = useDarkMode();
	const [users, setUsers] = useState<User[]>([]);
	const { setUser } = useContext(AuthContext);
	const [addUser] = useAddUserMutation();
	const [data, setData] = useState('No result');
	//login
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors: { email?: string; password?: string } = {};

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},

		onSubmit: async (values) => {
			try {
				const response = await addUser(values).unwrap();
				const email = response.user.email;
				localStorage.setItem('email', email);
				console.log(response);
				if (response.user) {
					await Swal.fire({
						icon: 'success',
						title: 'Login Successful',
						text: 'You have successfully logged in!',
					});
					switch (response.user.position) {
						case 'admin':
							router.push('/admin/dashboard');
							break;
						case 'Viewer':
							router.push('/viewer/dashboard');
							break;
						case 'Production Coordinator':
							router.push('/production-coordinator/dashboard');
							break;
						case 'Stock Keeper':
							router.push('/stock-keeper/dashboard');
							break;

						default:
							break;
					}
				} else {
					await Swal.fire({
						icon: 'error',
						title: 'Invalid Credentials',
						text: 'Username and password do not match. Please try again.',
					});
				}
			} catch (error) {
				console.error('Error occurred:', error);
				Swal.fire('Error', 'An unexpected error occurred', 'error');
			}
		},
	});

	return (
		<PageWrapper
			isProtected={false}
			// className={classNames({ 'bg-dark': !singUpStatus, 'bg-light': singUpStatus })}
		>
			<Head>
				<title> Login</title>
			</Head>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										href='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>

								<LoginHeader />
								<QrReader
									onResult={(result: any, error: Error | null | undefined) => {
										if (!!result) {
											setData(result?.text);
										}

										if (!!error) {
											console.info(error);
										}
									}}
									constraints={{
										facingMode: 'environment', // 'user' for front camera
									}}
									// style={{ width: '100%' }}
								/>
								{data && <p>Scanned QR Data: {data}</p>}
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Login;
