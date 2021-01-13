import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.localVideoRef = React.createRef();
    this.remoteVideoref = React.createRef();
  }
  componentDidMount() {
    const pc_config = null;
    this.pc = new RTCPeerConnection(pc_config);

    this.pc.onicecandidate = (e) => {
      if (e.candidate) console.log(JSON.stringify(e.candidate));
    };

    this.pc.onconnectionstatechange = (e) => {
      console.log(e);
    };

    this.pc.onaddstream = (e) => {
      this.remoteVideoref.current.srcObject = e.stream;
    };
    const constraints = { video: true };
    //if media success
    const success = (stream) => {
      window.localStream = stream;
      this.localVideoRef.current.srcObject = stream;
      this.pc.addStream(stream);
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
  createOffer = () => {
    console.log("OFFER");
    this.pc.createOffer({ offerToReceiveVideo: 1 }).then(
      (sdp) => {
        console.log(JSON.stringify(sdp));
        this.pc.setLocalDescription(sdp);
      },
      (e) => {}
    );
  };
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
