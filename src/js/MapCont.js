import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Style from '../scss/MapCont.scss';
import InfoDisp from './InfoDisp.js';

const mapStyles = {
	width: '100%',
	height: '100%',
}

class MapCont extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			'serverURL': "http://bus-app-env.p8v4neygau.us-west-1.elasticbeanstalk.com",
			'stopID': null,
			'locationArr': null,
			'serverErr': null,
			'locationInfo': null,
			'locationAvail': true,
			'stationObj': null
		}

		this.handleMarkerClick = this.handleMarkerClick.bind(this);
	}

	handleMarkerClick(props, marker, e){
		let stopID = props.id;
		let stopName = marker.title;
		this.setState({
			'stationObj': {
				'name': stopName,
				'id': stopID
			}
		})

		let reqObj = {'stopID': stopID};
		let url = this.state.serverURL + "/operations/locationUpdate";

		fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(reqObj)
		})
		.then(res => res.json())
		.then(data => {
			if(data.available){
				data.time = data.time.map(timeArr => {
					let timeDenom;
					if(Math.floor(timeArr[0]) == 24){
						timeArr[0] -= 12;
						timeDenom = 'AM'
					}
					else if(Math.floor(timeArr[0]) == 0){
						timeArr[0] += 12;
						timeDenom = 'AM'
					}
					else if(timeArr[0] > 12){
						timeArr[0] -= 12;
						timeDenom = 'PM';
					}
					else{
						timeDenom = 'AM'
					}
					timeArr[0] = Math.floor(timeArr[0]).toString() + ":" + Math.round(timeArr[0]%1 * 60) + timeDenom
					return timeArr;
				})

				this.setState({
					'locationInfo': data.time,
					'locationAvail': true
				});
			}
			else{
				this.setState({
					'locationInfo': null,
					'locationAvail': false
				});
			}
		})
	}

	render(){
		let markerArr;

		if(this.props.locationArr){
			markerArr = this.props.locationArr.map((stopArr => <Marker id={stopArr[0]} onClick={this.handleMarkerClick} title={stopArr[1]} position={{lat: stopArr[2][0], lng: stopArr[2][1]}} />))
		}

		return(
			<div>
				<div className={Style.header}>
					Bus Stop Schedule App
				</div>
				<InfoDisp stationInfo={this.state.stationObj} stopInfo={this.state.locationInfo} tripAvail={this.state.locationAvail} />
				<div className={Style.mapDiv}>
					<Map google={this.props.google} zoom={15} style={mapStyles} initialCenter={{lat: 42.7245, lng:-84.4204}} >
						{markerArr}
					</Map>
				</div>
			</div>
		)
	}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDuKS_Z1jVp443behy4qKsyJUw2T0N78X8')
})(MapCont);