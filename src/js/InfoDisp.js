import React from 'react';
import Style from '../scss/InfoDisp.scss';

class InfoDisp extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let rendDiv = "Choose a stop";
		let noTrips;
		let stationRend;
		if(this.props.stopInfo){
			rendDiv = this.props.stopInfo.map(timeArr => 
				<div className={Style.infoCont}>
					<div>Route ID: {timeArr[1][0]}</div>
					<div>Route Name: {timeArr[1][2]}</div>
					<div>Arrival Time: {timeArr[0]}</div>
				</div>)
		}

		if(this.props.tripAvail){
			noTrips = null
		}
		else{
			noTrips = "No trips currently available";
			rendDiv = null;
		}

		if(this.props.stationInfo){
			stationRend = <div className={Style.title}>
					Stop: {this.props.stationInfo.name}
					<br />
					Stop ID: {this.props.stationInfo.id}
				</div>
		}

		return(
			<div className={Style.mainCont}>
				{stationRend}
				{rendDiv}
				{noTrips}
			</div>
		)
	}
}

export default InfoDisp;