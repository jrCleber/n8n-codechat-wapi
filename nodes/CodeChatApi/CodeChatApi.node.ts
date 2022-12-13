import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { messageRessource } from './CodeChatApi.fields';
import { adjustOptionalFields, sendErrorPostReceive, setAutHeader } from './Generic.func';

export class CodeChatApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CodeChat - WhatsApp Free Api',
		name: 'CodeChatApi',
		icon: 'file:codechatapi.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Rest api for communication with WhatsApp',
		defaults: { name: 'CodeChat Api' },
		credentials: [{ name: 'codeChatCredsApi', required: true }],
		inputs: ['main'],
		outputs: ['main'],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			ignoreHttpStatusErrors: true,
		},
		properties: [
			{
				displayName: 'Resource',
				required: true,
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [{ name: 'Send Message', value: 'sendMessage' }],
				default: 'sendMessage',
				routing: {
					send: { preSend: [setAutHeader, adjustOptionalFields] },
					output: { postReceive: [sendErrorPostReceive] },
				},
			},

			...messageRessource,
		],
	};
}
