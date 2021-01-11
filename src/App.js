import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.localVideoRef = React.createRef();
    this.remoteVideoref = React.createRef();
  }
  componentDidMount() {
    this.pc = new RTCPeerConnection(null);
    const constraints = { video: true };
    //if media success
    const success = (stream) => {
      this.localVideoRef.current.srcObject = stream;
    };
    //if media failed
    const failure = (e) => {
      console.log(e);
    };
    //video and audio access
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(success)
      .catch(failure);
  }
  render() {
    return (
      <div>
        <video
          style={{
            width: 240,
            height: 240,
            margin: 5,
            backgroundColor: "black",
          }}
          ref={this.localVideoRef}
          autoPlay
        ></video>
        <video
          style={{
            width: 240,
            height: 240,
            margin: 5,
            backgroundColor: "black",
          }}
          ref={this.remoteVideoref}
          autoPlay
        ></video>
        <button onClick={this.createOffer}>Offer</button>
        <button onClick={this.createOffer}>Answer</button>
        <br />
        <textarea
          ref={(ref) => {
            this.textref = ref;
          }}
        />
        <br />
        <button onClick={this.setRemoteDescription}>Set Remote Desc</button>
        <button onClick={this.addCandidate}>Add Candidate</button>
      </div>
    );
  }
}

export default App;
