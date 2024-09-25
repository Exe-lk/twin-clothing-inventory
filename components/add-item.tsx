import React, { useEffect, useRef, useState } from 'react';
import Button from './bootstrap/Button';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from './bootstrap/Card';
import classNames from 'classnames';
import useDarkMode from '../hooks/useDarkMode';
import { getFirstLetter, priceFormat } from '../helpers/helpers';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import Input from './bootstrap/forms/Input';
import FormGroup from './bootstrap/forms/FormGroup';
import Label from './bootstrap/forms/Label';
import Checks, { ChecksGroup } from './bootstrap/forms/Checks';
import { useUpdateLotMutation, useGetLotsQuery } from '../redux/slices/lotAPISlice';

// Define TypeScript interfaces for Category and Item
interface Category {
	cid: string;
	categoryname: string;
}

interface Item {
	cid: string;
	category: string;
	image: string;
	name: string;
	price: number;
	quentity: number;
	reorderlevel: number;
}

// Define props for the Keyboard component
interface KeyboardProps {
	orderedItems: Item[];
	setOrderedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	isActive: boolean;
	setActiveComponent: React.Dispatch<React.SetStateAction<'additem' | 'edit'>>;

}

const Index: React.FC<KeyboardProps> = ({
	orderedItems,
	setOrderedItems,
	isActive,
	setActiveComponent,

}) => {

	const cdata = [
		{ status: true, categoryname: 'Main', cid: '0bc5HUELspDzvrUdt5u6' },


		{ status: true, categoryname: 'Embroider', cid: 'LKcV57ThRnHtE9bxBHMb' },


		{ status: true, categoryname: 'Painting', cid: 'La1K7XLguIsFPZN19vp4' },


		{ categoryname: 'clothes', cid: 'NowdRVU0K7hDZiMRkksn', status: true },


		{ categoryname: 'other', status: true, cid: 'irufyXKsbSNPk3z8ziC8' },


	]
	const idata = [
		{
			price: 1000,
			cid: "12356",
			status: true,
			image: "",
			quentity: 0,
			name: "button",
			category: "clothes",
			reorderlevel: "1500"
		},
		{
			category: "clothes",
			status: false,
			quentity: 0,
			image: "",
			cid: "12358",
			reorderlevel: 3,
			name: "fabric",
			price: 10
		}
	]
	// Custom hook to manage dark mode
	const { darkModeStatus } = useDarkMode();

	// State variables
	const [category1, setCategory1] = useState<string>('');
	const [category, setCategory] = useState<Category[]>(cdata);
	
	const [input, setInput] = useState<string>('');
	const keyboard = useRef<any>(null);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [popupInput, setPopupInput] = useState<any>("");
	const [popupInput1, setPopupInput1] = useState<any>();
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const popupInputRef = useRef<HTMLInputElement>(null);
	const [selectedType, setSelectedType] = useState<any>(''); 
	const [layout, setLayout] = useState<string>('default');
	const [focusedIndex, setFocusedIndex] = useState<number>(0);
	const { data: items, error, isLoading } = useGetLotsQuery(undefined);
	const [updatelot] = useUpdateLotMutation();
	
	// Handle input change
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		const numericInput = input.replace(/\D/g, '');
		setInput(numericInput);
		if (keyboard.current) {
			keyboard.current.setInput(numericInput);
		}
	};

	// Handle virtual keyboard input change
	const onChange = (input: string) => {
		const numericInput = input.replace(/\D/g, '');
		if (showPopup) {
			//   setPopupInput(numericInput);
		} else {
			setInput(numericInput);
		}
		console.log('Input changed', numericInput);
	};

	// Handle key press events on virtual keyboard
	const onKeyPress = (button: string) => {
		console.log('Button pressed', button);
		if (button === '{shift}' || button === '{lock}') handleShift();
	};

	// Toggle between default and shift layouts on virtual keyboard
	const handleShift = () => {
		const newLayoutName = layout === 'default' ? 'shift' : 'default';
		setLayout(newLayoutName);
	};

	// Handle OK button click in the popup
	const handlePopupOk = async () => {
		if (popupInput <= 0 || selectedType==="" ||( selectedType!="Return" && popupInput1==null)) {
			return
		}
		if (selectedItem) {
			console.log(popupInput);
			const updatedItem = { ...selectedItem, quentity: Number(popupInput),  order_type: selectedType, Job_ID:	popupInput1	};
			console.log(updatedItem);
			await setOrderedItems((prevItems: any) => {
				const itemIndex = prevItems.findIndex((item: any) => item.id === updatedItem.id);
				if (itemIndex > -1) {
					const updatedItems = [...prevItems];
					updatedItems[itemIndex] = updatedItem;
					return updatedItems;
				} else {
					return [...prevItems, updatedItem];
				}
			});
			setPopupInput("");
			setPopupInput1("");
			setSelectedType(''); 
			console.log('Selected item data:', orderedItems);
		}
		setShowPopup(false);
		setFocusedIndex(-1);
	};

	// Handle Cancel button click in the popup
	const handlePopupCancel = () => {
		setShowPopup(false);
	};

	// Open the popup to enter quantity
	const handlePopupOpen = async (selectedIndex1: any) => {
		setSelectedItem(items[selectedIndex1] || null);
		setShowPopup(true);
	};

	// Handle input change in the popup
	const onChangePopupInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const input: any = event.target.value;

		await setPopupInput(input);
		await console.log(popupInput);
	};

	// Handle keyboard events for navigation and actions
	const handleKeyPress = async (event: KeyboardEvent) => {
		if (!isActive) return;
		if (event.key === 'ArrowDown') {
			setFocusedIndex((prevIndex) => (prevIndex + 1) % items.length);
		} else if (event.key === 'ArrowUp') {
			setFocusedIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			if (showPopup) {
				const button = document.querySelector('.btn.btn-success') as HTMLButtonElement;
				if (button) {
					button.click();
				}
			} else if (focusedIndex >= 0) {
				handlePopupOpen(focusedIndex);
			}
		} else if (event.key === 'ArrowLeft') {
			setActiveComponent('additem');
			setFocusedIndex(0);
		} else if (event.key === 'ArrowRight') {
			setActiveComponent('edit');
			setFocusedIndex(-1);
		}
	};

	// Add event listener for keyboard events
	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [items, focusedIndex, showPopup, isActive]);

	// Focus input in the popup when it is shown
	useEffect(() => {
		if (showPopup) {
			popupInputRef.current?.focus();
		}
	}, [showPopup]);
	const handleTypeChange = async (e:any) => {
       await setSelectedType(e.target.value);
    };
	return (
		<div>

			<div>
				<Card className='mt-4' style={{ height: '40vh' }}>
					<CardHeader>
						<CardLabel>
							<CardTitle>Lot</CardTitle>
						</CardLabel>
						{/* <CardActions>
						 <Button color='info' isLink icon='Summarize' tag='a'>
								View
							</Button> 
						</CardActions> */}
					</CardHeader>
					<CardBody isScrollable>
						<div className='row g-3'>
							{items &&
							items
								.filter((val:any) => {
									if (input === '') {
										if (category1 === '') {
											return val;
										} else if (category1.includes(val.category)) {
											return val;
										}
									} else if (val.code.includes(input)) {
										if (category1 === '') {
											return val;
										} else if (category1.includes(val.category)) {
											return val;
										}
									}
									return null;
								})
								.map((item:any, index: any) => (
									<div
										key={index}
										className={classNames('col-12 ', {
											'bg-info': index === focusedIndex,
										})}
										onClick={async () => {
											handlePopupOpen(index);
										}}>
										<div className='row p-1'>
											<div className='col d-flex align-items-center'>
												<div className='flex-shrink-0'>
													<div
														className='ratio ratio-1x1 me-3'
														style={{ width: 48 }}>
														<div
															className={classNames(
																'rounded-2',
																'd-flex align-items-center justify-content-center',
																{
																	'bg-l10-dark': !darkModeStatus,
																	'bg-l90-dark': darkModeStatus,
																},
															)}>
															<span className='fw-bold'>
																{getFirstLetter(item.category)}
															</span>
														</div>
													</div>
												</div>
												<div className='flex-grow-1'>
													<div className='fs-6'>{item.subcategory}</div>
													<div className='text-muted'>
														<small>{item.category}</small>
													</div>
												</div>
											</div>
											<div className='col-auto text-end'>
												<div>
													<strong>{item.code}</strong>
												</div>
												<div className='text-muted'>
													<small>{item.qty}</small>
												</div>
											</div>
										</div>
									</div>
								))}
						</div>
					</CardBody>
				</Card>
				<div>
					<Input
						id='keyboardinput'
						className='form-control mb-4 p-2'
						value={input}
						placeholder='Tap on the virtual keyboard to start'
						onChange={onChangeInput}
						ref={inputRef}
					/>
					<Keyboard
						className='keyboard w-100 bg-dark text-light'
						keyboardRef={(r) => (keyboard.current = r)}
						layoutName={layout}
						onChange={onChange}
						onKeyPress={onKeyPress}
						layout={{
							default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
						}}
					/>
					<style>
						{`
            .hg-button {
                background-color: #1F2128 !important;
                color: #fff !important;
                border: 1px solid #555 !important;
                 
            }

            .hg-button:hover {
                background-color: #555 !important;
            }

            .hg-button:active {
                background-color: #666 !important;
            }
            .simple-keyboard {
                  background-color: #343a40;
                 
            }

            .simple-keyboard .hg-button {
                  background-color: #495057;
                  color: #ffffff;
                  height:6vh
            }

            .simple-keyboard .hg-button:active,
            .simple-keyboard .hg-button:hover {
                      background-color: #6c757d;
            }
            `}
					</style>
				</div>
			</div>
			{showPopup && (
                <div
                    className='position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50'
                    style={{ zIndex: 1050 }}>
                    <div className='p-4 rounded-4' style={{ zIndex: 1051, width: 600, backgroundColor: "#1D1F27" }}>
					<FormGroup id='membershipDate' className='col-md-6'>
                            <Label htmlFor='ChecksGroup'>Type</Label>
                            <ChecksGroup isInline>
                                <Checks
                                    type='radio'
                                    id={"return"}
                                    label={"Return"}
                                    name='type'
                                    value={"Return"}
                                    onClick={(e:any)=>{setSelectedType(e.target.value)}}
                                    checked={selectedType}
                                />
                                <Checks
                                    type='radio'
                                    id={"restore"}
                                    label={"Restore"}
                                    name='type'
                                    value={"Restore"}
                                    onClick={(e:any)=>{setSelectedType(e.target.value)}}
                                    checked={selectedType}
                                />
                                <Checks
                                    type='radio'
                                    id={"stockout"}
                                    label={"Stock Out"}
                                    name='type'
                                    value={"Stock Out"}
									onClick={(e:any)=>{setSelectedType(e.target.value)}}
									checked={selectedType}
                                />
                            </ChecksGroup>
                        </FormGroup>
                        <h6 className='mt-4'>Enter a Quantity</h6>
                        <Input
                            type='number'
                            value={popupInput}
                            onChange={(e:any) => setPopupInput(e.target.value)}
                            min={1}
                            className='form-control mb-4 p-2'
                            ref={popupInputRef}
                        />
                       {selectedType !== "Return" && (
                <>
                    <h6 className='mb-4'>Job ID</h6>
                    <Input
                        type='text'
                        value={popupInput1}
                        onChange={(e: any) => setPopupInput1(e.target.value)}
                        className='form-control mb-4 p-2'
                        ref={popupInputRef}
                    />
                </>
            )}
                       

                        <div className='d-flex justify-content-end'>
                            <button onClick={() => setShowPopup(false)} className='btn btn-danger me-2'>
                                Cancel
                            </button>
                            <button className='btn btn-success' onClick={handlePopupOk}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
		</div>
	);
};

export default Index;
