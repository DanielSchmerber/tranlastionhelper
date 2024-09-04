import qs from "qs";
import axios from "axios";




// Keycloak configuration
const keycloakConfig = {
	url: 'https://auth.myplayplanet.services/realms/development/protocol/openid-connect/token',
	clientId: 'dashboard-pkce-client',
	grantType: 'password',
};

// Function to get the JWT token from Keycloak
async function getKeycloakToken(username,passwords) {
	const data = qs.stringify({
		client_id: keycloakConfig.clientId,
		client_secret: "",
		username: username,
		password: passwords,
		grant_type: keycloakConfig.grantType,
	});

	const config = {
		method: 'post',
		url: keycloakConfig.url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data,
	};

	try {
		const response = await axios(config);
		return response.data.access_token;
	} catch (error) {
		console.error('Error getting token:', error.response ? error.response.data : error.message);
		throw error;
	}
}

// Function to fetch protected data
async function fetchProtectedData(token) {
	const apiUrl = 'https://api.myplayplanet.dev/translation/api/v1/translations?key=&limit=2000000000&offset=0';

	const config = {
		method: 'get',
		url: apiUrl,
		headers: {
			'apikey':'mpp-oauth',
			'Authorization': `Bearer ${token}`,
		},
	};

	try {
		const response = await axios(config);
		return response;
	} catch (error) {
		return false;
	}
}


export async function fetchAllKeys(username,passwords){
	try {
		var key = await getKeycloakToken(username, passwords)
	}catch (e){
		return null
	}
	let data = await fetchProtectedData(key)
	data = data.data.items
	return data;
}
