import React from 'react';
import type { NextPage } from 'next';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardTitle } from '../../../components/bootstrap/Card';
import QRCode from "react-qr-code";
import Qr from '../../../assets/img/QR.png';
const Index: NextPage = () => {
	const data = {
		email: 'achinthawijethunga@gmail.com',
		password: '200133701291',
	};
	// Create a string to encode in the QR code
	const qrData = `email: ${data.email}, password: ${data.password}`;

	// JSX for rendering the page
	return (
		<PageWrapper>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						{/* Card for displaying QR code */}
						<Card stretch>
							<CardTitle className='d-flex justify-content-between align-items-center m-4'>
								<div className='flex-grow-1 text-center text-info'>QR Code</div>
							</CardTitle>

							<CardBody isScrollable className='table-responsive'>
								<div className='d-flex justify-content-center'>
									{/* Render QR code here */}
									<QRCode
										value={qrData}
										size={256} // Size of the QR code
										bgColor='#ffffff' // Background color
										fgColor='#000000' // Foreground color
										level='Q' // Error correction level (L, M, Q, H)
										// Include margin around the QR code
									/>
									{/* <img src={Qr}/> */}
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Index;
