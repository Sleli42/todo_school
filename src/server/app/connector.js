import R from 'ramda';

class Connector {
  constructor(emitters) {
    this.emitters = emitters;
    this.initEmitters();
  }
  // emitters === models
  initEmitters() {
    const registerModel = model => model.on('action', console.log)
    R.compose(R.map(registerModel), R.values)(this.emitters);
  }
}

export default Connector;
