import React from 'react';
import MapCont from './MapCont.js';

const fetchURL = 'http://bus-app-env.p8v4neygau.us-west-1.elasticbeanstalk.com'

class Root extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			'locationArr':null
		}
	}

	componentDidMount(){
		let url = fetchURL+'/operations/getStops';

		fetch(url)
		.then(res => res.json())
		.then(data => this.setState({
			'locationArr': data.stopArr
		}))
	}

	render(){
		return(
			<div>
				<MapCont locationArr={this.state.locationArr} />
			</div>
		)
	}
}

export default Root;