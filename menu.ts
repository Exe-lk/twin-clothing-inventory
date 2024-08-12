export const summaryPageTopMenu = {
	intro: { id: 'intro', text: 'Intro', path: '#intro', icon: 'Vrpano', subMenu: null },
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap Components',
		path: '#bootstrap',
		icon: 'BootstrapFill',
		subMenu: null,
	},
	storybook: {
		id: 'storybook',
		text: 'Storybook',
		path: '#storybook',
		icon: 'CustomStorybook',
		subMenu: null,
	},
	formik: {
		id: 'formik',
		text: 'Formik',
		path: '#formik',
		icon: 'CheckBox',
		subMenu: null,
	},
	apex: {
		id: 'apex',
		text: 'Apex Charts',
		path: '#apex',
		icon: 'AreaChart',
		subMenu: null,
	},
};

export const addminPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: 'admin/dashboard',
		icon: 'Dashboard',
		subMenu: null,
	},

	category: {
		id: 'category',
		text: 'Category',
		path: 'admin/category',
		icon: 'Category',
		subMenu: null,
	},
	lot: {
		id: 'lot',
		text: 'Lot Management',
		path: 'admin/lot-management',
		icon: 'Ballot',
		subMenu: null,
	},
	seller: {
		id: 'lot',
		text: 'Suppler Management',
		path: 'admin/seller-management',
		icon: 'SelectAll',
		subMenu: null,
	},
	user: {
		id: 'user',
		text: 'User Management',
		path: 'admin/user-management',
		icon: 'SupervisedUserCircle',
		subMenu: null,
	},
	action: {
		id: 'user',
		text: 'User Action ',
		path: 'admin/user-action',
		icon: 'SupervisedUserCircle',
		subMenu: null,
	},
	
	singlePages: {
		id: 'singlePages',
		text: 'Settings',
		path: 'single-pages',
		icon: 'Settings',
		subMenu: {
			boxedSingle: {
				id: 'boxedSingle',
				text: 'Account',
				path: 'admin/setting/account',
				icon: 'Groups',
			},
			color: {
				id: 'fluidSingle',
				text: 'Color',
				path: 'admin/setting/color',
				icon: 'ColorLens',
			},
			fabric: {
				id: 'fluidSingle',
				text: 'fabric',
				path: 'admin/setting/fabric-type',
				icon: 'AppSettingsAlt',
			},
			gsm: {
				id: 'fluidSingle',
				text: 'GSM',
				path: 'admin/setting/gsm',
				icon: 'AlignVerticalCenter',
			},
			knet: {
				id: 'fluidSingle',
				text: 'Knit type',
				path: 'admin/setting/knit-type',
				icon: 'AirlineSeatLegroomExtra',
			},
			singlePages1: {
				id: 'singlePages',
				text: 'Recycle Bin',
				path: 'single-pages',
				icon: 'DeleteSweep',
				subMenu: {
					category: {
						id: 'boxedSingle',
						text: 'Category',
						path: 'admin/setting/recycle-bin/category',
						icon: 'Category',
					},
					users: {
						id: 'fluidSingle',
						text: 'Users',
						path: 'admin/setting/recycle-bin/users',
						icon: 'SupervisedUserCircle',
					},
					fluidSingle: {
						id: 'fluidSingle',
						text: 'Lot',
						path: 'admin/setting/recycle-bin/orders',
						icon: 'HistoryToggleOff',
					},
					color: {
						id: 'fluidSingle',
						text: 'Color',
						path: 'admin/setting/recycle-bin/color',
						icon: 'ColorLens',
					},
					fabric: {
						id: 'fluidSingle',
						text: 'fabric',
						path: 'admin/setting/recycle-bin/fabric',
						icon: 'AppSettingsAlt',
					},
					gsm: {
						id: 'fluidSingle',
						text: 'GSM',
						path: 'admin/setting/recycle-bin/gsm',
						icon: 'AlignVerticalCenter',
					},
					knet: {
						id: 'fluidSingle',
						text: 'Knit type',
						path: 'admin/setting/recycle-bin/knit-type',
						icon: 'AirlineSeatLegroomExtra',
					},
				},
			},
		},
	},
	
	
};





export const stockkeeperPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: 'stock-keeper/dashboard',
		icon: 'Dashboard',
		subMenu: null,
	},
	stock: {
		id: 'stock',
		text: 'Stock Management',
		path: 'stock-keeper/stock-management',
		icon: 'Article',
		subMenu: null,
	},
	// stockout: {
	// 	id: 'stock',
	// 	text: 'Stock out Management',
	// 	path: 'stock-keeper/stock-out-management',
	// 	icon: 'Article',
	// 	subMenu: null,
	// },
	stockout: {
		id: 'stockout',
		text: 'Transaction History',
		path: 'stock-keeper/stock-out-management',
		icon: 'CallMissedOutgoing',
		subMenu: null,
	},
	
	item: {
		id: 'item',
		text: 'Lot Management',
		path: 'stock-keeper/lot-management',
		icon: 'AssignmentTurnedIn',
		subMenu: null,
	},
	
	
	singlePages: {
		id: 'singlePages',
		text: 'Settings',
		path: 'single-pages',
		icon: 'Settings',
		subMenu: {
			category: {
				id: 'category',
				text: 'Category',
				path: 'stock-keeper/category',
				icon: 'Category',
				subMenu: null,
			},
			singlePages1: {
				id: 'singlePages',
				text: 'Recycle Bin',
				path: 'single-pages',
				icon: 'DeleteSweep',
				subMenu: {
					category: {
						id: 'boxedSingle',
						text: 'Category',
						path: 'stock-keeper/recycle-bin/category',
						icon: 'Category',
					},
					
					fluidSingle: {
						id: 'fluidSingle',
						text: 'Lot',
						path: 'stock-keeper/recycle-bin/item',
						icon: 'HistoryToggleOff',
					},
					
					
				},
			},
		},
	},
	

	
	
};

export const supperaddminmenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: 'super-admin/dashboard',
		icon: 'Dashboard',
		subMenu: null,
	},
	user: {
		id: 'seller',
		text: 'User Management',
		path: 'super-admin/user-management',
		icon: 'Groups',
		subMenu: null,
	},
	service: {
		id: 'seller',
		text: 'Service Management',
		path: 'super-admin/service',
		icon: 'Circle',
		subMenu: null,
	},
};

export const officemenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: 'production-coordinator/dashboard',
		icon: 'Dashboard',
		subMenu: null,
	},
	seller: {
		id: 'seller',
		text: 'Job Management',
		path: 'production-coordinator/job-management',
		icon: 'Groups',
		subMenu: null,
	},
};
export const viewmenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: 'viewer/dashboard',
		icon: 'Dashboard',
		subMenu: null,
	},
	order: {
		id: 'order',
		text: 'Order History',
		path: 'viewer/order-history',
		icon: 'StarBorderPurple500',
		subMenu: null,
	},
	purchasing: {
		id: 'order',
		text: 'Purchasing History',
		path: 'viewer/purchasing-history',
		icon: 'Money',
		subMenu: null,
	},
	restore: {
		id: 'restore',
		text: 'Transaction History',
		path: 'viewer/restore-history',
		icon: 'Groups',
		subMenu: null,
	},
	// stock: {
	// 	id: 'restore',
	// 	text: 'Stock in History',
	// 	path: 'viewer/stock-in-history',
	// 	icon: 'ScatterPlot',
	// 	subMenu: null,
	// },
	stockout: {
		id: 'restore',
		text: 'supplier History',
		path: 'viewer/supplier-history',
		icon: 'SupervisedUserCircle',
		subMenu: null,
	},

};


export const logoutmenu = {
	dashboard: {
		id: 'logout',
		text: 'Logout',
		path: 'v',
		icon: 'Logout',
		subMenu: null,
	},


	
	
};

export const dashboardPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'Dashboard',
		subMenu: null,
	},
	dashboardProject: {
		id: 'dashboardProject',
		text: 'Dashboard Projects',
		path: 'project-management/list',
		icon: 'AutoStories',
		notification: true,
		subMenu: null,
	},
	dashboardBooking: {
		id: 'dashboard-booking',
		text: 'Dashboard Booking',
		path: 'dashboard-booking',
		icon: 'emoji_transportation',
		subMenu: null,
	},
	crmDashboard: {
		id: 'crmDashboard',
		text: 'CRM Dashboard',
		path: 'crm/dashboard',
		icon: 'RecentActors',
	},
	summary: {
		id: 'summary',
		text: 'Summary',
		path: 'summary',
		icon: 'sticky_note_2',
		subMenu: null,
	},
};

export const demoPagesMenu = {
	pages: {
		id: 'pages',
		text: 'Pages',
		icon: 'Extension',
	},
	singlePages: {
		id: 'singlePages',
		text: 'Single Pages',
		path: 'single-pages',
		icon: 'Article',
		subMenu: {
			boxedSingle: {
				id: 'boxedSingle',
				text: 'Boxed',
				path: 'single-pages/boxed',
				icon: 'ViewArray',
			},
			fluidSingle: {
				id: 'fluidSingle',
				text: 'Fluid',
				path: 'single-pages/fluid',
				icon: 'ViewDay',
			},
		},
	},
	listPages: {
		id: 'listPages',
		text: 'List Pages',
		path: 'list-pages',
		icon: 'Dvr',
		subMenu: {
			listBoxed: {
				id: 'listBoxed',
				text: 'Boxed List',
				path: 'list-pages/boxed-list',
				icon: 'ViewArray',
			},
			listFluid: {
				id: 'listFluid',
				text: 'Fluid List',
				path: 'list-pages/fluid-list',
				icon: 'ViewDay',
			},
		},
	},
	gridPages: {
		id: 'gridPages',
		text: 'Grid Pages',
		path: 'grid-pages',
		icon: 'Window',
		subMenu: {
			gridBoxed: {
				id: 'gridBoxed',
				text: 'Boxed Grid',
				path: 'grid-pages/boxed',
				icon: 'ViewArray',
			},
			gridFluid: {
				id: 'gridFluid',
				text: 'Fluid Grid',
				path: 'grid-pages/fluid',
				icon: 'ViewDay',
			},
		},
	},
	editPages: {
		id: 'editPages',
		text: 'Edit Pages',
		path: 'edit-pages',
		icon: 'drive_file_rename_outline ',
		subMenu: {
			editModern: {
				id: 'editModern',
				text: 'Modern Edit',
				path: 'edit-pages/modern',
				icon: 'AutoAwesomeMosaic',
				notification: 'primary',
			},
			editBoxed: {
				id: 'editBoxed',
				text: 'Boxed Edit',
				path: 'edit-pages/boxed',
				icon: 'ViewArray',
			},
			editFluid: {
				id: 'editFluid',
				text: 'Fluid Edit',
				path: 'edit-pages/fluid',
				icon: 'ViewDay',
			},
			editWizard: {
				id: 'editWizard',
				text: 'Wizard Edit',
				path: 'edit-pages/wizard',
				icon: 'LinearScale',
			},
			editInCanvas: {
				id: 'editInCanvas',
				text: 'In Canvas Edit',
				path: 'edit-pages/in-canvas',
				icon: 'VerticalSplit',
			},
			editInModal: {
				id: 'editInModal',
				text: 'In Modal Edit',
				path: 'edit-pages/in-modal',
				icon: 'PictureInPicture',
			},
		},
	},
	pricingTable: {
		id: 'pricingTable',
		text: 'Pricing Table',
		path: 'pricing-table',
		icon: 'Local Offer',
	},

	auth: {
		id: 'auth',
		text: 'Auth Pages',
		icon: 'Extension',
	},
	login: {
		id: 'login',
		text: 'Login',
		path: 'auth-pages/login',
		icon: 'Login',
	},
	signUp: {
		id: 'signUp',
		text: 'Sign Up',
		path: 'auth-pages/sign-up',
		icon: 'PersonAdd',
	},

	page404: {
		id: 'Page404',
		text: '404 Page',
		path: '404',
		icon: 'ReportGmailerrorred',
	},

	app: {
		id: 'app',
		text: 'Apps',
		icon: 'Extension',
	},
	projectManagement: {
		id: 'projectManagement',
		text: 'Project Management',
		path: 'project-management',
		icon: 'AutoStories',
		subMenu: {
			list: {
				id: 'list',
				text: 'Projects',
				path: 'project-management/list',
				icon: 'AutoStories',
			},
			itemID: {
				id: 'projectID',
				text: 'projectID',
				path: 'project-management/project',
				hide: true,
			},
			item: {
				id: 'item',
				text: 'Project',
				path: 'project-management/project/1', // TODO
				icon: 'Book',
			},
		},
	},
	knowledge: {
		id: 'knowledge',
		text: 'Knowledge',
		path: 'knowledge',
		icon: 'AutoStories',
		subMenu: {
			grid: {
				id: 'grid',
				text: 'Knowledge Grid',
				path: 'knowledge/grid',
				icon: 'AutoStories',
			},
			itemID: {
				id: 'itemID',
				text: 'itemID',
				path: 'knowledge/item',
				hide: true,
			},
			item: {
				id: 'item',
				text: 'Item',
				path: 'knowledge/item/[id]',
				as: 'knowledge/item/1',
				icon: 'Book',
			},
		},
	},
	sales: {
		id: 'sales',
		text: 'Sales',
		path: 'sales',
		icon: 'Store',
		subMenu: {
			dashboard: dashboardPagesMenu.dashboard,
			salesList: {
				id: 'products',
				text: 'Sales List',
				path: 'sales/sales-list',
				icon: 'FactCheck',
			},
			productsGrid: {
				id: 'productsGrid',
				text: 'Products Grid',
				path: 'sales/grid',
				icon: 'CalendarViewMonth',
			},
			productID: {
				id: 'productID',
				text: 'productID',
				path: 'sales/product',
				hide: true,
			},
			product: {
				id: 'product',
				text: 'Product',
				path: 'sales/product/[id]',
				as: 'sales/product/1',
				icon: 'QrCode2',
			},
			transactions: {
				id: 'transactions',
				text: 'Transactions',
				path: 'sales/transactions',
				icon: 'PublishedWithChanges',
			},
		},
	},
	appointment: {
		id: 'appointment',
		text: 'Appointment',
		path: 'appointment',
		icon: 'Today',
		subMenu: {
			dashboard: dashboardPagesMenu.dashboardBooking,
			calendar: {
				id: 'calendar',
				text: 'Calendar',
				path: 'appointment/calendar',
				icon: 'EditCalendar',
				notification: true,
			},
			employeeList: {
				id: 'employeeList',
				text: 'Employee List',
				path: 'appointment/employee-list',
				icon: 'PersonSearch',
			},
			employeeID: {
				id: 'employeeID',
				text: 'employeeID',
				path: 'appointment/employee',
				hide: true,
			},
			employee: {
				id: 'employee',
				text: 'Employee',
				path: 'appointment/employee/[id]',
				as: 'appointment/employee/1',
				icon: 'QrCode2',
			},
			appointmentList: {
				id: 'appointmentList',
				text: 'Appointment List',
				path: 'appointment/appointment-list',
				icon: 'Event',
			},
		},
	},
	crm: {
		id: 'crm',
		text: 'CRM',
		path: 'crm',
		icon: 'Contacts',
		subMenu: {
			dashboard: {
				id: 'dashboard',
				text: 'CRM Dashboard',
				path: 'crm/dashboard',
				icon: 'RecentActors',
			},
			customersList: {
				id: 'customersList',
				text: 'Customers',
				path: 'crm/customers',
				icon: 'PersonSearch',
			},
			customerID: {
				id: 'customerID',
				text: 'customerID',
				path: 'crm/customer',
				hide: true,
			},
			customer: {
				id: 'customer',
				text: 'Customer',
				path: 'crm/customer/[id]',
				as: 'crm/customer/1',
				icon: 'Badge',
			},
			// sales: {
			// 	id: 'sales',
			// 	text: 'Sales',
			// 	path: 'crm/sales',
			// 	icon: 'Storefront',
			// },
			// invoiceID: {
			// 	id: 'invoiceID',
			// 	text: 'invoiceID',
			// 	path: 'crm/invoice',
			// 	hide: true,
			// },
			// invoice: {
			// 	id: 'invoice',
			// 	text: 'Invoice',
			// 	path: 'crm/invoice/1',
			// 	icon: 'Receipt',
			// },
		},
	},
	chat: {
		id: 'chat',
		text: 'Chat',
		path: 'chat',
		icon: 'Forum',
		subMenu: {
			withListChat: {
				id: 'withListChat',
				text: 'With List',
				path: 'chat/with-list',
				icon: 'Quickreply',
			},
			onlyListChat: {
				id: 'onlyListChat',
				text: 'Only List',
				path: 'chat/only-list',
				icon: 'Dns',
			},
		},
	},
};

export const pageLayoutTypesPagesMenu = {
	layoutTypes: {
		id: 'layoutTypes',
		text: 'Page Layout Types',
	},
	blank: {
		id: 'blank',
		text: 'Blank',
		path: 'page-layouts/blank',
		icon: 'check_box_outline_blank ',
	},
	pageLayout: {
		id: 'pageLayout',
		text: 'Page Layout',
		path: 'page-layouts',
		icon: 'BackupTable',
		subMenu: {
			headerAndSubheader: {
				id: 'headerAndSubheader',
				text: 'Header & Subheader',
				path: 'page-layouts/header-and-subheader',
				icon: 'ViewAgenda',
			},
			onlyHeader: {
				id: 'onlyHeader',
				text: 'Only Header',
				path: 'page-layouts/only-header',
				icon: 'ViewStream',
			},
			onlySubheader: {
				id: 'onlySubheader',
				text: 'Only Subheader',
				path: 'page-layouts/only-subheader',
				icon: 'ViewStream',
			},
			onlyContent: {
				id: 'onlyContent',
				text: 'Only Content',
				path: 'page-layouts/only-content',
				icon: 'WebAsset',
			},
		},
	},
	asideTypes: {
		id: 'asideTypes',
		text: 'Aside Types',
		path: 'aside-types',
		icon: 'Vertical Split',
		subMenu: {
			defaultAside: {
				id: 'defaultAside',
				text: 'Default Aside',
				path: 'aside-types/default-aside',
				icon: 'ViewQuilt',
			},
			minimizeAside: {
				id: 'minimizeAside',
				text: 'Minimize Aside',
				path: 'aside-types/minimize-aside',
				icon: 'View Compact',
			},
		},
	},
};

export const componentPagesMenu = {
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap',
		icon: 'Extension',
	},
	content: {
		id: 'content',
		text: 'Content',
		path: 'content',
		icon: 'format_size',
		subMenu: {
			typography: {
				id: 'typography',
				text: 'Typography',
				path: 'content/typography',
				icon: 'text_fields',
			},
			images: {
				id: 'images',
				text: 'Images',
				path: 'content/images',
				icon: 'Image ',
			},
			tables: {
				id: 'tables',
				text: 'Tables',
				path: 'content/tables',
				icon: 'table_chart',
			},
			figures: {
				id: 'figures',
				text: 'Figures',
				path: 'content/figures',
				icon: 'Photo Library ',
			},
		},
	},
	forms: {
		id: 'forms',
		text: 'Forms',
		path: 'forms',
		icon: 'CheckBox',
		notification: 'success',
		subMenu: {
			formGroup: {
				id: 'formGroup',
				text: 'Form Group',
				path: 'forms/form-group',
				icon: 'Source',
			},
			formControl: {
				id: 'formControl',
				text: 'Form Controls',
				path: 'forms/form-controls',
				icon: 'Create',
			},
			select: {
				id: 'select',
				text: 'Select',
				path: 'forms/select',
				icon: 'Checklist',
			},
			checksAndRadio: {
				id: 'checksAndRadio',
				text: 'Checks & Radio',
				path: 'forms/checks-and-radio',
				icon: 'CheckBox',
			},
			range: {
				id: 'range',
				text: 'Range',
				path: 'forms/range',
				icon: 'HdrStrong',
			},
			inputGroup: {
				id: 'inputGroup',
				text: 'Input Group',
				path: 'forms/input-group',
				icon: 'PowerInput',
			},
			validation: {
				id: 'validation',
				text: 'Validation',
				path: 'forms/validation',
				icon: 'VerifiedUser',
			},
			wizard: {
				id: 'wizard',
				text: 'Wizard',
				path: 'forms/wizard',
				icon: 'LinearScale',
			},
		},
	},
	components: {
		id: 'components',
		text: 'Component',
		path: 'components',
		icon: 'Extension',
		notification: 'success',
		subMenu: {
			accordion: {
				id: 'accordion',
				text: 'Accordion',
				path: 'components/accordion',
				icon: 'ViewDay',
			},
			alert: {
				id: 'alert',
				text: 'Alert',
				path: 'components/alert',
				icon: 'Announcement',
			},
			badge: {
				id: 'badge',
				text: 'Badge',
				path: 'components/badge',
				icon: 'Vibration',
			},
			breadcrumb: {
				id: 'breadcrumb',
				text: 'Breadcrumb',
				path: 'components/breadcrumb',
				icon: 'AddRoad',
			},
			button: {
				id: 'button',
				text: 'Button',
				path: 'components/button',
				icon: 'SmartButton',
			},
			buttonGroup: {
				id: 'buttonGroup',
				text: 'Button Group',
				path: 'components/button-group',
				icon: 'Splitscreen',
			},
			card: {
				id: 'card',
				text: 'Card',
				path: 'components/card',
				icon: 'Crop32',
			},
			carousel: {
				id: 'carousel',
				text: 'Carousel',
				path: 'components/carousel',
				icon: 'RecentActors',
			},
			// Close
			collapse: {
				id: 'collapse',
				text: 'Collapse',
				path: 'components/collapse',
				icon: 'UnfoldLess',
			},
			dropdowns: {
				id: 'dropdowns',
				text: 'Dropdowns',
				path: 'components/dropdowns',
				icon: 'Inventory',
			},
			listGroup: {
				id: 'listGroup',
				text: 'List Group',
				path: 'components/list-group',
				icon: 'ListAlt',
			},
			modal: {
				id: 'modal',
				text: 'Modal',
				path: 'components/modal',
				icon: 'PictureInPicture',
			},
			navsTabs: {
				id: 'navsTabs',
				text: 'Navs & Tabs',
				path: 'components/navs-and-tabs',
				icon: 'PivotTableChart',
			},
			// Navbar
			offcanvas: {
				id: 'offcanvas',
				text: 'Offcanvas',
				path: 'components/offcanvas',
				icon: 'VerticalSplit',
			},
			pagination: {
				id: 'pagination',
				text: 'Pagination',
				path: 'components/pagination',
				icon: 'Money',
			},
			popovers: {
				id: 'popovers',
				text: 'Popovers',
				path: 'components/popovers',
				icon: 'Assistant',
			},
			progress: {
				id: 'progress',
				text: 'Progress',
				path: 'components/progress',
				icon: 'HourglassTop',
			},
			scrollspy: {
				id: 'scrollspy',
				text: 'Scrollspy',
				path: 'components/scrollspy',
				icon: 'KeyboardHide',
			},
			spinners: {
				id: 'spinners',
				text: 'Spinners',
				path: 'components/spinners',
				icon: 'RotateRight',
			},
			table: {
				id: 'table',
				text: 'Table',
				path: 'components/table',
				icon: 'TableChart',
			},
			toasts: {
				id: 'toasts',
				text: 'Toasts',
				path: 'components/toasts',
				icon: 'RotateRight',
			},
			tooltip: {
				id: 'tooltip',
				text: 'Tooltip',
				path: 'components/tooltip',
				icon: 'Assistant',
			},
		},
	},
	utilities: {
		id: 'utilities',
		text: 'Utilities',
		path: 'utilities',
		icon: 'Support',
		subMenu: {
			api: {
				id: 'api',
				text: 'API',
				path: 'utilities/api',
				icon: 'Api',
			},
			background: {
				id: 'background',
				text: 'Background',
				path: 'utilities/background',
				icon: 'FormatColorFill',
			},
			borders: {
				id: 'borders',
				text: 'Borders',
				path: 'utilities/borders',
				icon: 'BorderStyle',
			},
			colors: {
				id: 'colors',
				text: 'Colors',
				path: 'utilities/colors',
				icon: 'InvertColors',
			},
			display: {
				id: 'display',
				text: 'Display',
				path: 'utilities/display',
				icon: 'LaptopMac',
			},
			flex: {
				id: 'flex',
				text: 'Flex',
				path: 'utilities/flex',
				icon: 'SettingsOverscan',
			},
			float: {
				id: 'float',
				text: 'Float',
				path: 'utilities/float',
				icon: 'ViewArray',
			},
			interactions: {
				id: 'interactions',
				text: 'Interactions',
				path: 'utilities/interactions',
				icon: 'Mouse',
			},
			overflow: {
				id: 'overflow',
				text: 'Overflow',
				path: 'utilities/overflow',
				icon: 'TableRows',
			},
			position: {
				id: 'position',
				text: 'Position',
				path: 'utilities/position',
				icon: 'Adjust',
			},
			shadows: {
				id: 'shadows',
				text: 'Shadows',
				path: 'utilities/shadows',
				icon: 'ContentCopy',
			},
			sizing: {
				id: 'sizing',
				text: 'Sizing',
				path: 'utilities/sizing',
				icon: 'Straighten',
			},
			spacing: {
				id: 'spacing',
				text: 'Spacing',
				path: 'utilities/spacing',
				icon: 'SpaceBar',
			},
			textPage: {
				id: 'text',
				text: 'Text',
				path: 'utilities/text',
				icon: 'TextFields',
			},
			verticalAlign: {
				id: 'vertical-align',
				text: 'Vertical Align',
				path: 'utilities/vertical-align',
				icon: 'VerticalAlignCenter',
			},
			visibility: {
				id: 'visibility',
				text: 'Visibility',
				path: 'utilities/visibility',
				icon: 'Visibility',
			},
		},
	},
	extra: {
		id: 'extra',
		text: 'Extra Library',
		icon: 'Extension',
		path: undefined,
	},
	icons: {
		id: 'icons',
		text: 'Icons',
		path: 'icons',
		icon: 'Grain',
		notification: 'success',
		subMenu: {
			iconPage: {
				id: 'icon',
				text: 'Icon',
				path: 'icons/icon',
				icon: 'Lightbulb',
			},
			material: {
				id: 'material',
				text: 'Material',
				path: 'icons/material',
				icon: 'Verified',
			},
		},
	},
	charts: {
		id: 'charts',
		text: 'Charts',
		path: 'charts',
		icon: 'AreaChart',
		notification: 'success',
		subMenu: {
			chartsUsage: {
				id: 'chartsUsage',
				text: 'General Usage',
				path: 'charts/general-usage',
				icon: 'Description',
			},
			chartsSparkline: {
				id: 'chartsSparkline',
				text: 'Sparkline',
				path: 'charts/sparkline',
				icon: 'AddChart',
			},
			chartsLine: {
				id: 'chartsLine',
				text: 'Line',
				path: 'charts/line',
				icon: 'ShowChart',
			},
			chartsArea: {
				id: 'chartsArea',
				text: 'Area',
				path: 'charts/area',
				icon: 'AreaChart',
			},
			chartsColumn: {
				id: 'chartsColumn',
				text: 'Column',
				path: 'charts/column',
				icon: 'BarChart',
			},
			chartsBar: {
				id: 'chartsBar',
				text: 'Bar',
				path: 'charts/bar',
				icon: 'StackedBarChart',
			},
			chartsMixed: {
				id: 'chartsMixed',
				text: 'Mixed',
				path: 'charts/mixed',
				icon: 'MultilineChart',
			},
			chartsTimeline: {
				id: 'chartsTimeline',
				text: 'Timeline',
				path: 'charts/timeline',
				icon: 'WaterfallChart',
			},
			chartsCandleStick: {
				id: 'chartsCandleStick',
				text: 'Candlestick',
				path: 'charts/candlestick',
				icon: 'Cake',
			},
			chartsBoxWhisker: {
				id: 'chartsBoxWhisker',
				text: 'Box Whisker',
				path: 'charts/box-whisker',
				icon: 'SportsMma',
			},
			chartsPieDonut: {
				id: 'chartsPieDonut',
				text: 'Pie & Donut',
				path: 'charts/pie-donut',
				icon: 'PieChart',
			},
			chartsRadar: {
				id: 'chartsRadar',
				text: 'Radar',
				path: 'charts/radar',
				icon: 'BrightnessLow',
			},
			chartsPolar: {
				id: 'chartsPolar',
				text: 'Polar',
				path: 'charts/polar',
				icon: 'TrackChanges',
			},
			chartsRadialBar: {
				id: 'chartsRadialBar',
				text: 'Radial Bar',
				path: 'charts/radial-bar',
				icon: 'DonutLarge',
			},
			chartsBubble: {
				id: 'chartsBubble',
				text: 'Bubble',
				path: 'charts/bubble',
				icon: 'BubbleChart',
			},
			chartsScatter: {
				id: 'chartsScatter',
				text: 'Scatter',
				path: 'charts/scatter',
				icon: 'ScatterPlot',
			},
			chartsHeatMap: {
				id: 'chartsHeatMap',
				text: 'Heat Map',
				path: 'charts/heat-map',
				icon: 'GridOn',
			},
			chartsTreeMap: {
				id: 'chartsTreeMap',
				text: 'Tree Map',
				path: 'charts/tree-map',
				icon: 'AccountTree',
			},
		},
	},
	notification: {
		id: 'notification',
		text: 'Notification',
		path: 'notifications',
		icon: 'NotificationsNone',
	},
	hooks: {
		id: 'hooks',
		text: 'Hooks',
		path: 'hooks',
		icon: 'Anchor',
	},
};

export const productsMenu = {
	companyA: { id: 'companyA', text: 'Company A', path: 'grid-pages/products', subMenu: null },
	companyB: { id: 'companyB', text: 'Company B', path: '/', subMenu: null },
	companyC: { id: 'companyC', text: 'Company C', path: '/', subMenu: null },
	companyD: { id: 'companyD', text: 'Company D', path: '/', subMenu: null },
};
