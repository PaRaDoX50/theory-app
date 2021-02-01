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



import axios from "axios";
// import { API_URL } from "../utils/constants"

function TheoryList(props) {

	const [theory, setTheory] = useState([])
	const [loading, setLoading] = useState(false)
	const [conceptWiseClusteredTheory, setConceptWiseClusteredTheory] = useState()  //{"concept1":[{theory where concept is concept1},{theory where concept is concept1}]}

	useEffect(() => {
		setLoading(true)

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		axios
			.post(
				`http://localhost:1234/theory/list`,
				{ chapter: "chapter" },
				config
			)
			.then(function (response) {
				console.log("response is ", response)
				if (response && response.data) {
					let clusteredData = new Map()
					for (let i = 0; i < response.data.theories.length; i++) {
						var tempTheory = response.data.theories[i];
						console.log("tempTheory is", tempTheory)
						if (clusteredData.get(tempTheory.concept)) {
							clusteredData.get(tempTheory.concept).push(tempTheory)
						} else {
							clusteredData.set(tempTheory.concept, [tempTheory])

						}
						console.log("clustered is", clusteredData)

					}
					setConceptWiseClusteredTheory(clusteredData)
					setTheory(response.data.theories)

				}
				setLoading(false)
			})
			.catch(err => {
				console.log("error handling ", err)
				setLoading(false)
			})
	}, [])





	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
			<div className="container" style={{ minHeight: '80vh', backgroundColor: 'white' }}>
				<div style={{ backgroundColor: 'purple' }}>
					<h2 style={{ textAlign: 'center', color: 'white' }}>Theory</h2>
				</div>

				{(conceptWiseClusteredTheory) ?

					Array.from(conceptWiseClusteredTheory).map(([concept, theoryObjectsArray]) => (
						<div>
							<h1>{concept}</h1>
							{theoryObjectsArray.map(item => (
								<div>
									<h3 >{item.subConcept}</h3>

									<Link to={{
										pathname: '/editTheory',
										state: {
											id: item._id
										}
									}}>Edit Theory</Link>
								</div>

							))}</div>))
					: <h1>null</h1>
				}
			</div>
		</div>
	)
}


export default withRouter(TheoryList)