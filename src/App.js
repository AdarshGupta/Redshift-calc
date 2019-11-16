import React from 'react';
import logo from './logo.svg';
import './App.css';

function interpretDecimalInput(inputType, inputPrecision, inputScale){
  let precision = 0;
  let scale = 0;

  if(inputType === "decimal"){
    if(inputPrecision){
      precision = parseInt(inputPrecision);
    }
    else{
      alert("Please specify the 'Precision' value for the decimal data type."); //else the default value of 18 is used
      return;
      // fop_precision = 18;
    }

    if(inputScale){
      scale = parseInt(inputScale);
    }
    else{
      alert("Please specify the 'Scale' value for the decimal data type."); // else the default value of 0 is used
      return;
      // fop_scale = 0;
    }
  }
  else{
    if(inputType === "smallint"){
      precision = 5;
    }
    else if(inputType === "int"){
      precision = 10;
    }
    else if(inputType === "bigint"){
      precision = 19;
    }
    else{
      alert("Invalid data type: " + inputType);
    }
    scale = 0;
  }

  return {"precision": precision, "scale": scale};
}


function calcResultantDecimal(calcDetails){
  const fop = calcDetails.first_operand;
  const sop = calcDetails.second_operand;
  const operator = calcDetails.operator;
  let fop_precision = 0;
  let fop_scale = 0;
  let sop_precision = 0;
  let sop_scale = 0;
  let result_precision = 0;
  let result_scale = 0;

  let fop_decimal = interpretDecimalInput(fop, calcDetails.fop_precision_input, calcDetails.fop_scale_input);
  fop_precision = fop_decimal.precision;
  fop_scale = fop_decimal.scale;
  

  // if(fop === "decimal"){
  //   if(calcDetails.fop_precision_input){
  //     fop_precision = parseInt(calcDetails.fop_precision_input);
  //   }
  //   else{
  //     alert("Please specify the 'Precision' value for the decimal data type of first operand."); //else the default value of 18 is used
  //     return;
  //     // fop_precision = 18;
  //   }

  //   if(calcDetails.fop_scale_input){
  //     fop_scale = parseInt(calcDetails.fop_scale_input);
  //   }
  //   else{
  //     alert("Please specify the 'Scale' value for the decimal data type of first operand."); // else the default value of 0 is used
  //     return;
  //     // fop_scale = 0;
  //   }
  // }
  // else{
  //   if(fop === "smallint"){
  //     fop_precision = 5;
  //   }
  //   else if(fop === "int"){
  //     fop_precision = 10;
  //   }
  //   else if(fop === "bigint"){
  //     fop_precision = 19;
  //   }
  //   else{
  //     alert("Invalid data type: " + fop);
  //   }
  //   fop_scale = 0;
  // }

  let sop_decimal = interpretDecimalInput(sop, calcDetails.sop_precision_input, calcDetails.sop_scale_input);
  sop_precision = sop_decimal.precision;
  sop_scale = sop_decimal.scale;

  // if(sop === "decimal"){
  //   if(calcDetails.sop_precision_input){
  //     sop_precision = parseInt(calcDetails.sop_precision_input);
  //   }
  //   else{
  //     alert("Please specify the 'Precision' value for the decimal data type of second operand."); // else the default value of 18 is used
  //     return;
  //     // sop_precision = 18;
  //   }

  //   if(calcDetails.sop_scale_input){
  //     sop_scale = parseInt(calcDetails.sop_scale_input);
  //   }
  //   else{
  //     alert("Please specify the 'Scale' value for the decimal data type of second operand"); // else default value of 0 is used.
  //     return;
  //     // sop_scale = 0;
  //   }
  // }
  // else{
  //   if(sop === "smallint"){
  //     sop_precision = 5;
  //   }
  //   else if(sop === "int"){
  //     sop_precision = 10;
  //   }
  //   else if(sop === "bigint"){
  //     sop_precision = 19;
  //   }
  //   else{
  //     alert("Invalid data type: " + sop);
  //   }
  //   sop_scale = 0;
  // }

  if(fop_scale > fop_precision || sop_scale > sop_precision){
    alert("The scale value must be less than or equal to the precision value.");
    return;
  }

  if(operator === "add" || operator === "sub"){
    result_scale = Math.max(fop_scale, sop_scale)
    result_precision = Math.max(fop_precision - fop_scale, sop_precision - sop_scale) + 1 + result_scale;
  }
  else if(operator === "mul"){
    result_scale = fop_scale + sop_scale;
    result_precision = fop_precision + sop_precision + 1;
  }
  else if(operator === "divi"){
    result_scale = Math.max(4, fop_scale + sop_precision - sop_scale + 1);
    result_precision = fop_precision - fop_scale + sop_scale + result_scale;

    if(result_scale > 100){
      result_precision = result_precision - (result_scale - 37);
      result_scale = 37;
    }

    if(result_precision > 38){
      result_precision = 38;
      result_scale = Math.max(38 + result_scale - result_precision, 4);
    }
  }
  else{
    alert("Operator not supported yet!");
    return;
  }

  result_precision = Math.min(38, result_precision)
  result_scale = Math.min(37, result_scale)

  return "decimal(" + result_precision + ", " + result_scale + ")";
}

class DatatypeInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      first_operand: "decimal",
      second_operand: "decimal",
      fop_precision_input: "",
      fop_scale_input: "",
      sop_precision_input: "",
      sop_scale_input: "",
      operator: "",
      resultant_datatype: "Resultant Data type"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, data){
    const target = event.target;
    const name = target.getAttribute('name');
    let value = data === undefined ? target.value : data;
    console.log("value: " + value);
    if((name === "fop_precision_input" || name === "sop_precision_input") && parseInt(value) > 38){
      alert("Max. precision possible is 38");
      value = 38;
    }

    if((name === "fop_scale_input" || name === "sop_scale_input") && parseInt(value) > 37){
      alert("Max. scale possible is 37.");
      value = 37;
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    // alert('Form submitted! Input value: \nFirst Operand: ' + this.state.first_operand + "\nSecond Operand: " + this.state.second_operand);
    const fop = this.state.first_operand;
    const sop = this.state.second_operand;
    let result_dt = "";
    event.preventDefault();

    if(!this.state.operator){
      alert("Please select the operator involved in the computation by clicking on it.");
      return;
    }
    
    if(fop === "double" || sop === "double"){
      result_dt = "double";
    }
    else if(fop === "float" || sop === "float"){
      if(fop === sop){
        result_dt = "float";
      }
      else{
        result_dt = "double";
      }
    }
    else if (fop === "decimal" || sop === "decimal"){
      result_dt = calcResultantDecimal(this.state);
    }
    else if (fop === "bigint" || sop === "bigint"){
      result_dt = "bigint";
    }
    else if (fop === "int" || sop === "int"){
      result_dt = "int";
    }
    else{
      result_dt = "smallint";
    }

    if(result_dt){
      this.setState({
        resultant_datatype: result_dt
      });
    }
  }

  render(){
    return (
      <div>
        <div className="App-header">Redshift Calculator</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            
            <div id="first-operand-div" className="input-divs">
              <label for="fop" className="input-lbl" id ="fop-lbl" > First Operand:</label>
              <select className="datatype-inputs" name="first_operand" id="fop" value={this.state.first_operand} onChange={this.handleChange}>
                <option value="decimal">Decimal</option>
                <option value="smallint">SmallInt/Int2</option>
                <option value="int">Int/Int4</option>
                <option value="bigint">BigInt/Int8</option>
                <option value="float">Float/Float4</option>
                <option value="double">Double/Float8</option>
              </select>

              <label for="precision_input" className={this.state.first_operand === "decimal" ? "prec_arg_lbl" : "prec_arg_lbl element_hidden" }> Precision</label>
              <input type="text" name="fop_precision_input" id="precision_input" className={this.state.first_operand === "decimal" ? "" : "element_hidden" } value={this.state.fop_precision_input} onChange={this.handleChange} />

              <label for="scale_input" className={this.state.first_operand === "decimal" ? "scale_arg_lbl" : "scale_arg_lbl element_hidden" }> Scale</label>
              <input type="text" name="fop_scale_input" className={this.state.first_operand === "decimal" ? "scale_input" : "scale_input element_hidden" } value={this.state.fop_scale_input} onChange={this.handleChange} />
            </div>

            <ul className="operator-container">
              <li name="operator" className={this.state.operator === "add" ? "operator-item selected" : "operator-item"} onClick={e => this.handleChange(e, "add")}>+</li>
              <li name="operator" className={this.state.operator === "sub" ? "operator-item selected" : "operator-item"} onClick={e => this.handleChange(e, "sub")}>-</li>
              <li name="operator" className={this.state.operator === "divi" ? "operator-item selected" : "operator-item"} onClick={e => this.handleChange(e, "divi")}>/</li>
              <li name="operator" className={this.state.operator === "mul" ? "operator-item selected" : "operator-item"} onClick={e => this.handleChange(e, "mul")}>X</li>
            </ul>
            
            <div id="second-operand-div" className="input-divs">
              <label for="sop" className="input-lbl">Second Operand:</label>
              <select className="datatype-inputs" name="second_operand" id="sop" value={this.state.second_operand} onChange={this.handleChange}>
                <option value="decimal">Decimal</option>
                <option value="smallint">SmallInt/Int2</option>
                <option value="int">Int/Int4</option>
                <option value="bigint">BigInt/Int8</option>
                <option value="float">Float/Float4</option>
                <option value="double">Double/Float8</option>
              </select>

              <label for="precision_input" className={this.state.second_operand === "decimal" ? "prec_arg_lbl" : "prec_arg_lbl element_hidden" }> Precision</label>
              <input type="text" name="sop_precision_input" id="precision_input" className={this.state.second_operand === "decimal" ? "" : "element_hidden" } value={this.state.sop_precision_input} onChange={this.handleChange} />

              <label for="scale_input" className={this.state.second_operand === "decimal" ? "scale_arg_lbl" : "scale_arg_lbl element_hidden" }> Scale</label>
              <input type="text" name="sop_scale_input" className={this.state.second_operand === "decimal" ? "scale_input" : "scale_input element_hidden" } value={this.state.sop_scale_input} onChange={this.handleChange} />
            </div>

            
            <div className="resultant-div">
              <input type="submit" value="Submit" className="submit-btn" />
              <div className="resultant-datatype">{this.state.resultant_datatype.toUpperCase()}</div>  
            </div>

            <div className="footer">Made with &hearts; by Adarsh</div>
          </form>
        </div>
      </div>
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
