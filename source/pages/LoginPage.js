
import React, {useState} from 'react';
import {Text,Box,Newline} from 'ink';
import {EmailInput,PasswordInput} from '@inkjs/ui';
import {fetchAllKeys} from "../keycloak.js";
export function LoginPage(props){
	const [currentState,setState] = useState("email")
	return <>
		<Text>Please login with your MPP Account</Text>
		<Box flexDirection="column" borderStyle="round" borderColor="cyan" width={30}>
		<EmailInput
			placeholder="Enter email..."
			isDisabled={currentState !== 'email'}
			onSubmit={email => {
				// `email` contains user input
				setState("passwort")
				props.setEmail(email);
			}}
		/>

		<PasswordInput
			placeholder ="Enter passwort..."

			isDisabled={currentState !== 'passwort'}
			onSubmit={passwort => {
				// `email` contains user input
				props.setPasswort(passwort);
				async function login() {
					const data = await fetchAllKeys(props.email,passwort)
					if(data == null) {
						console.log("Invalid Login...")
						props.setEmail("")
						props.setPasswort("")
						props.setKey(props.idofpage+1)
					}else {
						props.setData(data);
					}

				}
				login()
			}}
			></PasswordInput>

		</Box>
	</>

}
