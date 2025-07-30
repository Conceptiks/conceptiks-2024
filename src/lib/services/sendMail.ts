import sgMail from '@sendgrid/mail';
import { PRIVATE_SENDGRID_API_KEY } from '$env/static/private';

interface DynamicTemplateData {
	[key: string]: string;
}

interface Options {
	from?: {
		email: string;
		name: string;
	};
	to: string;
	replyTo?: string;
	asm?: {
		group_id: number;
	};
	templateId: string;
	variables: DynamicTemplateData;
}

export const sendMail = async (data: Options) => {
	sgMail.setApiKey(PRIVATE_SENDGRID_API_KEY);
	const msg = {
		from: {
			email: data.from?.email || 'kontakt@conceptiks.com',
			name: data.from?.name || 'Conceptiks Website'
		},
		to: data.to,
		replyTo: data.replyTo,
		templateId: data.templateId,
		dynamicTemplateData: data.variables
	};
	const res = await sgMail.send(msg);

	return res;
};
