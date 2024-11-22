import React, { useContext, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Brand from '../../../layout/Brand/Brand';
import Navigation from '../../../layout/Navigation/Navigation';
import { addminPagesMenu} from '../../../menu';
import ThemeContext from '../../../context/themeContext';
import Button from '../../../components/bootstrap/Button';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const DefaultAside = () => {
	// Context for theme
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);
	const router = useRouter();
	useEffect(() => {
		const validateUser = async () => {
			const role = localStorage.getItem('userRole');
		
			if (role !='Admin') {
				router.push('/');
			} 
		};

		validateUser();
	}, []);
	const handleLogout = async () => {
		try {
			const result = await Swal.fire({
				title: 'Are you sure?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, Log out',
			});
			if (result.isConfirmed) {
				try {
					localStorage.removeItem('userRole');

					router.push('/');
				} catch (error) {
					console.error('Error during handleUpload: ', error);
					alert('An error occurred during file upload. Please try again later.');
				}
			}
		} catch (error) {
			console.error('Error deleting document: ', error);
			Swal.fire('Error', 'Failed to Log out user.', 'error');
		}
	};
	return (
		<Aside>
			<AsideHead>
				{/* <img src={logo}style={{width:"50%"}} hidden={!asideStatus}/>  */}
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{/* Navigation menu for 'My Pages' */}
				<Navigation menu={addminPagesMenu} id='aside-dashboard' />
			</AsideBody>
			<AsideFoot>
				{/* <div onClick={() => { localStorage.removeItem('token') }}>
					<Navigation menu={logoutmenu} id='aside-dashboard' />

				</div> */}
				<Button
					icon='Logout'
					className='w-100'
					color='dark'
					size='lg'
					tag='button'
					onClick={handleLogout}></Button>
			</AsideFoot>
		</Aside>
	);
};

// Static props for server-side translations
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default DefaultAside;
