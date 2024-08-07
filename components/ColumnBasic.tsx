import React, { useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../components/bootstrap/Card';
import Chart, { IChartOptions } from '../components/extras/Chart';
import CommonStoryBtn from '../common/partial/other/CommonStoryBtn';

const ColumnBasic = () => {
	const [columnBasic] = useState<IChartOptions>({
		series: [
			{
				name: 'Net Profit',
				data: [44, 55, 57, 56, 61,],
			},
			{
				name: 'Revenue',
				data: [76, 85, 101, 98, 87, ],
			},
			{
				name: 'Free Cash Flow',
				data: [35, 41, 36, 26, 45,],
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
					// @ts-ignore
					endingShape: 'rounded',
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent'],
			},
			xaxis: {
				categories: ['abc', 'efd', 'hig', 'fabric', 'color'],
			},
			yaxis: {
				title: {
					text: '$ (thousands)',
				},
			},
			fill: {
				opacity: 1,
			},
			tooltip: {
				y: {
					formatter(val) {
						return `$ ${val} thousands`;
					},
				},
			},
		},
	});
	return (
		<div className='col-lg-6'>
			<Card stretch>
				<CardHeader>
					<CardLabel icon='BarChart'>
						<CardTitle>
							Category <small></small>
						</CardTitle>
						<CardSubTitle>Analytics</CardSubTitle>
					</CardLabel>
					
				</CardHeader>
				<CardBody>
					<Chart
						series={columnBasic.series}
						options={columnBasic.options}
						type='bar'
						height={350}
					/>
				</CardBody>
			</Card>
		</div>
	);
};

export default ColumnBasic;
