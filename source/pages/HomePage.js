import React, {useState} from 'react';
import {Text,Box,Newline} from 'ink';
import {TextInput} from '@inkjs/ui';
import {useInput} from 'ink'
import chalk from "chalk";
import levenshtein from "string-comparison"
export function HomePage(props){



	const [filter,setFilter] = useState("")
	const [index,setIndex] = useState(0);
	const keys = filterKeys(props.keys,filter);

	useInput((input, key) => {
		//(key)
		if (key.upArrow) {
			setIndex(index-20)
		}
		if (key.downArrow) {
			// Left arrow key pressed
			setIndex(index+20)
		}
	});

	//(typeof keys)
	//(keys)
	////(keys)
	return <>
		<Text>Search For Content of key 🔍</Text>
		<Text>Searching through {keys.length} keys</Text>
	<TextInput
		focus={true}
		value={filter} onChange={function (state){
		setFilter(state)
		setIndex(0)
	}} />
	<Box flexDirection="row">

		<Box   borderStyle="round" borderColor="cyan" >
			<Newline/>
			{
				<Text>
					{
						[1].map((x)=> {
								return "Key\n"+createKeyList(keys, filter, index)
							}
						)
					}
				</Text>
			}
		</Box>
		<Box   borderStyle="round" borderColor="cyan" >
			<Newline/>
			<Text>
				{
					[1].map((x)=> {
							return "German\n"+createLangList(keys, filter, index,"de-DE")
						}
					)
				}
			</Text>
		</Box>

		<Box  borderStyle="round" borderColor="cyan">
			<Newline/>
			<Text>
				{
					[1].map((x)=> {
							return "English\n"+createLangList(keys, filter, index,"en-US")
						}
					)
				}
			</Text>
		</Box>
	</Box>

		<Text>Use ↔ for new pages (20 keys per page)</Text>
		<Text>Currently on Page {""+index/20} out of {keys.length/20+1+""}</Text>
</>
}
function createKeyList(keys,filter,index){
	let s  ="\n";
	let len = keys.length;
	const start = Math.max(0, index - 20);
	const end = Math.min(index + 20, len);

// Loop from start to end
	for (let i = start; i < end; ++i) {
		// Your code here
		s+=highLight(keys[i].key ,filter)+ "\n";
	}
	return s;
}

function createLangList(keys,filter,index,lang){
	let s  ="\n";
	let len = keys.length;
	const start = Math.max(0, index - 20);
	const end = Math.min(index + 20, len);

// Loop from start to end
	for (let i = start; i < end; ++i) {
		// Your code here
		s+=highLight(getLang(keys[i],lang) ,filter)+ "\n";
	}
	return s;
}

function highLight(text,filter){
	if(filter ==""){
		return text;
	}
	const regex = new RegExp(filter, 'gi');

	// Replace all occurrences of the filter text with highlighted text
	return text.replaceAll(regex, (match) => chalk.bold(chalk.green(match)));
}

function getLang(key,langTag){

	if(key.labels == null|| key.labels === undefined || key.labels.length == 0){
		return "No Match"
	}

	for(let label of key.labels){
		if(label.languageTag === langTag){
			return label.label;
		}
	}
	return "No Translation for " + langTag;
}


function containsFilter(inputString, filter) {
	// Create a new regular expression with the filter string and case-insensitive flag
	const regex = new RegExp(filter, 'i');
	// Test if the regex matches the input string
	return regex.test(inputString);
}
function filterKeys(keys,filter){
	if(filter ===""){
		return keys;
	}
	filter = filter.toLowerCase();
	return keys.filter(
		(key)=>isValid(key,filter)
	)
}

function isValid(key,filter){
	if(key.key.toLowerCase().includes(filter)){
		return true;
	}
	if(key.labels == null){
		return false;
	}
	let bool = false
	key.labels.forEach((label)=>{
		let text = label.label.toLowerCase()
		bool |= text.includes(filter)
	});
	return bool;
}
