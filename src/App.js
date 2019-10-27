import React from 'react';
import logo from './logo.svg';
import './App.css';

class DatatypeInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numerator: "",
      denominator: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    alert('Form submitted! Input value: \nNumerator: ' + this.state.numerator + "\nDenominator: " + this.state.denominator);
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        
        <div name="numerator-div" className="input-divs">
          <label for="num" className="input-lbl"> Numerator:</label>
          <select className="datatype-inputs" name="numerator" id="num" value={this.state.numerator} onChange={this.handleChange}>
            <option value="decimal">Decimal</option>
            <option value="int">Int</option>
            <option value="float">Float</option>
            <option value="double">Double</option>
          </select>
        </div>
        
        <div name="denominator-div" className="input-divs">
          <label for="denom" className="input-lbl">Denominator:</label>
          <input className="datatype-inputs" name="denominator" id="denom" value={this.state.denominator} onChange={this.handleChange}/>
        </div>

        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    );
  }
}
function App() {
  return (
    <div className="App">
      <DatatypeInput />
    </div>
  );
}

export default App;
