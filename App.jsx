import React, { Component } from "react";
import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";

const stamenTonerTiles =
	"http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";
const stamenTonerAttr =
	'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.9528, -75.1638];
const zoomLevel = 12;

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { currentZoomLevel: zoomLevel };
	}

	componentDidMount() {
		const leafletMap = this.leafletMap.leafletElement;
		leafletMap.on("zoomend", () => {
			const updatedZoomLevel = leafletMap.getZoom();
			this.handleZoomlevelChange(updatedZoomLevel);
		});
	}

	handleZoomlevelChange(newZoomLevel) {
		this.setState({ currentZoomLevel: newZoomLevel });
	}

	render() {
		window.console.log(
			"this.state.currentZoomLevel ->",
			this.state.currentZoomLevel
		);
		return (
			<div>
				<Map
					ref={m => {
						this.leafletMap = m;
					}}
					center={mapCenter}
					zoom={zoomLevel}
				>
					<TileLayer attribution={stamenTonerAttr} url={stamenTonerTiles} />
				</Map>
			</div>
		);
	}
}

render(<App />, document.getElementById("mount"));
