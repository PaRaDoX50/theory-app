import React, { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory,
    useLocation,
    withRouter
  } from "react-router-dom";
  import CKEditor from 'ckeditor4-react';




import axios from "axios";
// import { API_URL } from "../utils/constants"

function EditTheory(props)  {
	const history = useHistory();
	const [theory, setTheory] = useState({})
	const [loading, setLoading] = useState(false)
	const [conceptWiseClusteredTheory, setConceptWiseClusteredTheory] = useState()  //{"concept1":[{theory where concept is concept1},{theory where concept is concept1}]}
	const [theoryData,setTheoryData] = useState("")
	useEffect(() => {
        console.log("props",props)
		setLoading(true)

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		axios
			.post(
				`http://localhost:1234/theory/getById`,
				{ id:props.location.state.id },
				config
			)
			.then(function (response) {
				console.log("response is ", response)
				if (response && response.data) {
					
					
					setTheory(response.data)
					setTheoryData(response.data.theory)

				}
				setLoading(false)
			})
			.catch(err => {
				console.log("error handling ", err)
				setLoading(false)
			})
			
	}, [])

	const onEditorChange = ( evt ) =>{
        // this.setState( {
        //     data: evt.editor.getData()
		// } );
		setTheoryData(evt.editor.getData())
		var tempTheory = theory
		tempTheory.theory = evt.editor.getData()
		setTheory(tempTheory)
    }

    const handleChange = ( changeEvent )=> {
        // this.setState( {
        //     data: changeEvent.target.value
		// } );
		setTheoryData(changeEvent.target.value)
	}
	
	const handleSave=()=>{
		const config = {
			headers: {
				"Content-Type": "application/json",
				"theoryid":theory._id
			},
		};
		axios
			.put(
				`http://localhost:1234/theory/updateTheory`,
				{ theory },
				config
			)
			.then(function (response) {
				console.log("response is ", response)
				if (response && response.data) {
					
					
				history.push("/")

				}
				setLoading(false)
			})
			.catch(err => {
				console.log("error handling ", err)
				setLoading(false)
			})

	}


	return (
		(theory) ? 
		(<div className="App">
		<h2>Using CKEditor 4 in React</h2>
		<CKEditor
			data={theoryData}
			onChange={onEditorChange}
		/>
		 <label>
                        Change value:
                        <textarea defaultValue={theoryData} onChange={handleChange} />
                    </label>
					<button onClick={handleSave}>Save</button>
	</div>) : <h3>Loading</h3>			
					
	)

	}
export default withRouter(EditTheory)