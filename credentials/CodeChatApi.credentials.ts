import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class CodeChatApi implements ICredentialType {
	name = 'codeChatCredsApi';
	displayName = 'CodeChatApi API';
	documentationUrl = 'https://github.com/code-chat-br/whatsapp-api';
	properties: INodeProperties[] = [
		{
			displayName: 'Instance Name',
			name: 'instanceName',
			type: 'string',
			noDataExpression: true,
			default: '',
			required: true,
			description: 'Name of the created instance.',
		},

		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			noDataExpression: true,
			required: true,
			default: '',
			placeholder: 'https://api.codechat.rest',
			hint: 'Enter the default url for requests.',
		},

		{
			displayName: 'Authentication type',
			name: 'authType',
			type: 'options',
			required: true,
			noDataExpression: true,
			options: [
				{ name: 'JSON Web Token', value: 'jwt' },
				{ name: 'Api Key', value: 'apikey' },
			],
			default: 'jwt',
		},

		{
			displayName: 'Authentication - Jwt',
			name: 'authJwt',
			required: true,
			placeholder: 'json web token',
			type: 'string',
			default: '',
			noDataExpression: true,
			typeOptions: { password: true },
			description:
				'Suggestion: for this authentication, set EXPIRIN_IN value in env.yml file with zero (0)',
			hint: 'EXPIRIN_IN: 0',
			displayOptions: {
				show: {
					authType: ['jwt'],
				},
			},
		},

		{
			displayName: 'Authentication - ApiKey',
			name: 'apikey',
			required: true,
			placeholder: 'auth-apikey',
			type: 'string',
			default: '',
			noDataExpression: true,
			typeOptions: { password: true },
			displayOptions: {
				show: {
					authType: ['apikey'],
				},
			},
		},
	];
}
