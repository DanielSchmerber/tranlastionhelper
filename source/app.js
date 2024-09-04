import React from 'react';
import {Text} from 'ink';
import {LoginPage} from "./pages/LoginPage.js";
import {useState} from 'react'
import {EmailInput,Spinner} from '@inkjs/ui';
import {HomePage} from "./pages/HomePage.js";
let keys = [];
let login = false;

export default function App({name = 'Stranger'}) {

	const [email, setEmail] = useState("");
	const [passwort,setPasswort] = useState("")
	const [data,setData] = useState("")
	const [key,setKey] = useState(0)
	return (
		<>
		<Text color={"orange"}>
			Translation Helper 🌍💬
		</Text>
			{
				passwort == "" ?
					<LoginPage
						idofpage={key}
						setKey={setKey}
						email = {email}
						passswort = {passwort}
						setEmail={setEmail}
						setPasswort={setPasswort}
						setData ={setData}></LoginPage>
					: data==[] ?
						<Spinner label="Logging in and fetching keys" />
					: <HomePage
							keys={data}>

						</HomePage>
			}
		</>
	);
}
