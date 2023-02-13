import { INodeProperties } from 'n8n-workflow';
import { mediaMessage, requestURL } from './Generic.func';

const optionsProperties: INodeProperties[] = [
	{
		displayName: 'Delay',
		name: 'dalay',
		type: 'number',
		default: 0,
		placeholder: '1200',
		hint: 'milliseconds - optional',
		description: 'Enter the delay value in milliseconds for message delivery',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'options.delay' },
		},
	},

	{
		displayName: 'Presence',
		name: 'presence',
		placeholder: '',
		description: 'Inform the status of your presence while sending the message',
		type: 'options',
		default: false,
		options: [
			{
				name: 'Availabble',
				value: 'available',
			},
			{
				name: 'Composing',
				value: 'composing',
			},
			{
				name: 'Empty',
				value: false,
			},
			{
				name: 'Paused',
				value: 'paused',
			},
			{
				name: 'Recording',
				value: 'recording',
			},
			{
				name: 'Unavailable',
				value: 'unavailable',
			},
		],
		displayOptions: {
			show: {
				resource: ['sendMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'options.presence' },
		},
	},
];

const numberProperty: INodeProperties[] = [
	{
		displayName: 'Recipient',
		name: 'number',
		type: 'string',
		default: '',
		required: true,
		placeholder: '5531900000000',
		description: 'When entering a phone number, make sure to include the country code',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'number' },
		},
	},
];

const operationProperty: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		placeholder: '',
		required: true,
		type: 'options',
		noDataExpression: true,
		default: 'textMessage',
		options: [
			{
				name: 'Send Buttons',
				value: 'buttonMessage',
				action: 'Send buttons a send message',
			},
			{
				name: 'Send Contact',
				value: 'contactMessage',
				action: 'Send contact a send message',
			},
			{
				name: 'Send List',
				value: 'listMessage',
				action: 'Send list a send message',
			},
			{
				name: 'Send Location',
				value: 'locationMessage',
				action: 'Send location a send message',
			},
			{
				name: 'Send Media',
				value: 'mediaMessage',
				action: 'Send media a send message',
			},
			{
				name: 'Send Text',
				value: 'textMessage',
				action: 'Send text a send message',
			},
		],
		displayOptions: {
			show: {
				resource: ['sendMessage'],
			},
		},
	},
];

const textProperties: INodeProperties[] = [
	{
		displayName: 'Text Message',
		name: 'textProperty',
		type: 'string',
		default: '',
		required: true,
		description: 'The body of the message (max 4096 characters)',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['textMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'textMessage.text' },
			request: {
				url: '=' + requestURL('sendText'),
				method: 'POST',
			},
		},
	},
];

const mediaProperties: INodeProperties[] = [
	{
		displayName: 'Media Type',
		name: 'mediaType',
		required: true,
		type: 'options',
		default: 'image',
		options: [
			{ name: 'Audio', value: 'audio' },
			{ name: 'Document', value: 'document' },
			{ name: 'Image', value: 'image' },
			{ name: 'Video', value: 'video' },
			{ name: 'WhatsApp Audio', value: 'waAudio' },
		],
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['mediaMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'mediaMessage.mediatype' },
		},
	},

	{
		displayName: 'File Name',
		name: 'fileNameProperty',
		description: 'Required for base64 files',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['mediaMessage'],
				mediaType: ['audio', 'document', 'image', 'video'],
			},
		},
		routing: {
			send: { type: 'body', property: 'mediaMessage.fileName' },
		},
	},

	{
		displayName: 'Caption',
		name: 'caprionProperty',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['mediaMessage'],
				mediaType: ['image','document', 'video'],
			},
		},
		routing: {
			send: { type: 'body', property: 'mediaMessage.caption' },
		},
	},

	{
		displayName: 'Media',
		name: 'mediaProperty',
		placeholder: 'url or base64',
		description: 'URL or base64',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['mediaMessage'],
				mediaType: ['image','document', 'video', 'audio', 'waAudio'],
			},
		},
		routing: {
			send: { type: 'body', property: 'mediaMessage.media' },
		},
	},

	{
		displayName: 'Set Routing',
		name: 'setRouting',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['mediaMessage'],
			},
		},
		routing: {
			request: {
				url: '=' + requestURL('sendMedia'),
				method: 'POST',
			},
			send: { preSend: [mediaMessage] },
		},
	},
];

const buttonsProperties: INodeProperties[] = [
	{
		displayName: 'Button Title',
		name: 'titleProperty',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['buttonMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'buttonMessage.title' },
		},
	},

	{
		displayName: 'Button Description',
		name: 'descriptionProperty',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['buttonMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'buttonMessage.description' },
		},
	},

	{
		displayName: 'Button Footer Text',
		name: 'footerTextProperty',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['buttonMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'buttonMessage.footerText' },
		},
	},

	{
		displayName: 'Buttons',
		name: 'buttonsProperty',
		description: 'Three (3) is the maximum number of buttons supported',
		required: true,
		placeholder: `[Array:[{displayText: 'Button Text', buttonId: 'btnId01'}]]`,
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['buttonMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'buttonMessage.buttons' },
		},
	},

	{
		displayName: 'Media Message',
		name: 'mediaMessageProperty',
		description: 'Embed media message to button',
		placeholder: 'Add Media Message',
		type: 'fixedCollection',
		default: {},
		typeOptions: { multipleValues: false },
		options: [
			{
				displayName: 'Media',
				name: 'mediaProperty',
				values: [
					{
						displayName: 'Media Type',
						name: 'mediaTypeProerty',
						type: 'options',
						required: true,
						default: 'image',
						options: [
							{ name: 'Image', value: 'image' },
							{ name: 'Document', value: 'document' },
							{ name: 'Video', value: 'video' },
						],
						routing: {
							send: {
								type: 'body',
								property: 'buttonMessage.mediaMessage.mediatype',
							},
						},
					},

					{
						displayName: 'File Name',
						name: 'fileNameProperty',
						description: 'Required for base64 files',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'buttonMessage.mediaMessage.fileName',
							},
						},
					},

					{
						displayName: 'Media',
						name: 'mediaProperty',
						description: 'URL or base64',
						type: 'string',
						required: true,
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'buttonMessage.mediaMessage.media',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['buttonMessage'],
			},
		},
	},

	{
		displayName: 'Set Routing',
		name: 'setRouting',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['buttonMessage'],
			},
		},
		routing: {
			request: {
				url: '=' + requestURL('sendButtons'),
				method: 'POST',
			},
		},
	},
];

const locationProperties: INodeProperties[] = [
	{
		displayName: 'Location Name',
		name: 'locationNameProperty',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['locationMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'locationMessage.name' },
		},
	},

	{
		displayName: 'Addreess',
		name: 'addressProperty',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['locationMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'locationMessage.address' },
		},
	},

	{
		displayName: 'Latitude',
		name: 'latitudeProperty',
		required: true,
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['locationMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'locationMessage.latitude' },
		},
	},

	{
		displayName: 'Longitude',
		name: 'longitudeProperty',
		required: true,
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['locationMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'locationMessage.longitude' },
		},
	},

	{
		displayName: 'Set Routing',
		name: 'setRouting',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['locationMessage'],
			},
		},
		routing: {
			request: {
				url: '=' + requestURL('sendLocation'),
				method: 'POST',
			},
		},
	},
];

const listProperties: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'titleProperty',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['listMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'listMessage.title' },
		},
	},

	{
		displayName: 'Description',
		name: 'descriptionProperty',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['listMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'listMessage.description' },
		},
	},

	{
		displayName: 'Button Text',
		name: 'buttonTextProperty',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['listMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'listMessage.buttonText' },
		},
	},

	{
		displayName: 'Footer Text',
		name: 'footerTextProperty',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['listMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'listMessage.footerText' },
		},
	},

	{
		displayName: 'Sections',
		name: 'sectionProperty',
		placeholder: `[Array:[title:'Section Title',rows:[{title:'Row Title',description:'Description',rowId:'rowId01'}]]]`,
		required: true,
		default: '',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['listMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'listMessage.sections' },
		},
	},

	{
		displayName: 'Set Routing',
		name: 'setRouting',
		type: 'hidden',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['listMessage'],
			},
		},
		routing: {
			request: {
				url: '=' + requestURL('sendList'),
				method: 'POST',
			},
		},
	},
];

const contactProperties: INodeProperties[] = [
	{
		displayName: 'Contacts',
		name: 'contactsProperty',
		required: true,
		description: 'Single elements Array',
		placeholder: `[Array:[fullName:'Contact name',wuid:'5531900000000',phoneNumber]]`,
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['sendMessage'],
				operation: ['contactMessage'],
			},
		},
		routing: {
			send: { type: 'body', property: 'contactMessage' },
			request: {
				url: '=' + requestURL('sendContact'),
				method: 'POST',
			},
		},
	},
];

export const messageRessource: INodeProperties[] = [
	...numberProperty,

	...optionsProperties,

	...operationProperty,

	...textProperties,

	...mediaProperties,

	...buttonsProperties,

	...locationProperties,

	...listProperties,

	...contactProperties,
];
