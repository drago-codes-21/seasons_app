import "./App.css";
import { Component } from "react";
import SeasonDisplay from "./SeasonsDisplay";
import Spinner from "./Spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      errorMesage: "",
    };
  }
  componentDidMount(props) {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMesage: err.message });
      }
    );
  }
  renderContent() {
    if (this.state.errorMesage && !this.state.lat) {
      return <div className="border red">ERROR:{this.state.errorMesage}</div>;
    }
    if (!this.state.errorMesage && this.state.lat) {
      return (
        <div className="border red">
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    return (
      <div className="border red">
        <Spinner message="please accept the location request" />
      </div>
    );
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

export default App;
