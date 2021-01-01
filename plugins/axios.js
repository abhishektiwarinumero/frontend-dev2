import https from 'https';

export default function ({
	$axios,
	redirect
}, inject) {
	const agent = new https.Agent({
		rejectUnauthorized: false
	});
	$axios.onRequest(config => {
		config.httpsAgent = agent;
	});
}
