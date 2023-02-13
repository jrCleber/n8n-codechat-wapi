import {
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	IN8nHttpFullResponse,
	INodeExecutionData,
} from 'n8n-workflow';
import { ApiError, Credentials, wa } from './CodeChatApi';

function join(...paths: string[]) {
	let url = '/';
	paths.forEach((path) => (url += `${path}/`));
	return url;
}

export function requestURL(path: string) {
	return join('message', path, '{{$credentials.instanceName}}');
}

export async function sendErrorPostReceive(
	this: IExecuteSingleFunctions,
	data: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const body = response?.body as ApiError;
	if (!body?.error) {
		return data;
	}

	const node = this.getNode();
	const creds = (await this.getCredentials('codeChatCredsApi')) as Credentials;
	const key = creds.authType === 'jwt' ? 'authJwt' : 'apikey';
	creds[key] = creds.authType === 'jwt' ? 'Bearer ' + creds.authJwt : creds.apikey;
	Object.assign(node.credentials as {}, { creds });

	throw {
		httpCode: body.status,
		context: body.error,
		cause: { error: body.error, message: body.message },
		node,
		workflow: this.getWorkflow(),
		message: `${body.error} - statusCode ${body.status}`,
		description: 'Check the type of properties and values entered',
	};
}

export async function setAutHeader(
	this: IExecuteSingleFunctions,
	requestOpyions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const creds = (await this.getCredentials('codeChatCredsApi')) as Credentials;

	const header = creds.authType === 'jwt' ? 'Authorization' : 'apikey';
	const value = creds.authType === 'jwt' ? 'Bearer ' + creds.authJwt : creds.apikey;
	Object.assign(requestOpyions.headers as {}, { [header]: value });

	return requestOpyions;
}

export async function adjustOptionalFields(
	this: IExecuteSingleFunctions,
	requestOpyions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOpyions.body as { options: wa.OptionsMessage };

	if (body.options.presence === false) {
		delete body.options.presence;
		requestOpyions.body = body;
	}

	return requestOpyions;
}

export async function mediaMessage(
	this: IExecuteSingleFunctions,
	requestOpyions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const params = this.getNode().parameters;
	const creds = (await this.getCredentials('codeChatCredsApi')) as Credentials;
	if(params?.mediaType === 'waAudio') {
		requestOpyions.url = `/message/sendWhatsAppAudio/${creds.instanceName}`;
		const body = {  ...(requestOpyions.body as wa.MediaMessge) };
		requestOpyions.body = {
			number: body.number,
			audioMessage: {
				audio: body.mediaMessage?.media,
			},
			options: body.options,
		};
	}

	return requestOpyions;
}
