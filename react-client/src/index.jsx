import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 15,
      showMap: false
    }
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/places',
    //   success: (data) => {
    //     console.log('hello')
    //     // this.setState({
    //     //   items: data
    //     // })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
    navigator.geolocation.getCurrentPosition(result => {
      var center = {lat: result.coords.latitude, lng: result.coords.longitude}
      this.setState({
        center: center,
        showMap: true
      })
    })
  }

  render () {
    const showMap = this.state.showMap
    let map;
    if (showMap) {
      map = <div>
        <h1>Item List</h1>
        <List items={this.state.items}/>
  
        <div style={{ height: '500px', width: '500px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '[API_KEY_HERE]' }}
            center={this.state.center}
            defaultZoom={this.state.zoom}
          >
            <AnyReactComponent
              lat={this.state.center.lat}
              lng={this.state.center.lng}
              text="YOU ARE HERE"
            />
          </GoogleMapReact>
        </div>
      </div>
    } else {
      map = <div>Loading...</div>
    }
    return map
  }
}

ReactDOM.render(<App />, document.getElementById('app'));