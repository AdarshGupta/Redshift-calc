import React from 'react';
import logo from './logo.svg';
import './App.css';

function interpretDecimalInput(inputType, inputPrecision, inputScale) {
  let precision = 0;
  let scale = 0;

  if (inputType === "decimal") {
    if (inputPrecision) {
      precision = parseInt(inputPrecision);
    }
    else {
      alert("Please specify the 'Precision' value for the decimal data type."); //else the default value of 18 is used
      return;
      // fop_precision = 18;
    }

    if (inputScale) {
      scale = parseInt(inputScale);
    }
    else {
      alert("Please specify the 'Scale' value for the decimal data type."); // else the default value of 0 is used
      return;
      // fop_scale = 0;
    }
  }
  else {
    if (inputType === "smallint") {
      precision = 5;
    }
    else if (inputType === "int") {
      precision = 10;
    }
    else if (inputType === "bigint") {
      precision = 19;
    }
    else {
      alert("Invalid data type: " + inputType);
      return;
    }
    scale = 0;
  }

  return { "precision": precision, "scale": scale };
}


function calcResultantDecimal(calcDetails) {
  const fop = calcDetails.first_operand;
  const sop = calcDetails.second_operand;
  const operator = calcDetails.operator;
  let fop_precision = 0;
  let fop_scale = 0;
  let sop_precision = 0;
  let sop_scale = 0;
  let result_precision = 0;
  let result_scale = 0;

  let fop_decimal = interpretDecimalInput(fop, calcDetails.first_precision_input, calcDetails.first_scale_input);
  if (fop_decimal) {
    fop_precision = fop_decimal.precision;
    fop_scale = fop_decimal.scale;
  }
  else {
    return;
  }

  let sop_decimal = interpretDecimalInput(sop, calcDetails.second_precision_input, calcDetails.second_scale_input);
  if (sop_decimal) {
    sop_precision = sop_decimal.precision;
    sop_scale = sop_decimal.scale;
  }
  else {
    return;
  }

  if (fop_scale > fop_precision || sop_scale > sop_precision) {
    alert("The scale value must be less than or equal to the precision value.");
    return;
  }

  if (operator === "add" || operator === "sub") {
    result_scale = Math.max(fop_scale, sop_scale)
    result_precision = Math.max(fop_precision - fop_scale, sop_precision - sop_scale) + 1 + result_scale;
  }
  else if (operator === "mul") {
    result_scale = fop_scale + sop_scale;
    result_precision = fop_precision + sop_precision + 1;
  }
  else if (operator === "divi") {
    result_scale = Math.max(4, fop_scale + sop_precision - sop_scale + 1);
    result_precision = fop_precision - fop_scale + sop_scale + result_scale;

    if (result_scale > 100) {
      result_precision = result_precision - (result_scale - 37);
      result_scale = 37;
    }

    if (result_precision > 38) {
      result_precision = 38;
      result_scale = Math.max(38 + result_scale - result_precision, 4);
    }
  }
  else {
    alert("Operator not supported yet!");
    return;
  }

  result_precision = Math.min(38, result_precision)
  result_scale = Math.min(37, result_scale)

  return "decimal(" + result_precision + ", " + result_scale + ")";
}

function DatatypeInput(props) {
  return (
    <div id={props.operand + "-operand-div"} className="input-divs">
      <label for={props.operand} className="input-lbl" id={props.operand + "-lbl"} > {props.operand} Operand:</label>
      <div className="datatype-section">
        <select className="datatype-inputs" name={props.operand + "_operand"} id={props.operand} value={props.operandValue} onChange={props.handleChange}>
          <option value="decimal">Decimal</option>  
          <option value="smallint">SmallInt/Int2</option>
          <option value="int">Int/Int4</option>
          <option value="bigint">BigInt/Int8</option>
          <option value="float">Float/Float4</option>
          <option value="double">Double/Float8</option>
        </select>

        <div className="decimal_section">
          <div className="prec_section">
            <label for="precision_input" className={"prec_arg_lbl" + (props.operandValue === "decimal" ? "" : " element_hidden")}> Precision</label>
            <input type="text" name={props.operand + "_precision_input"} className={"precision_input" + (props.operandValue === "decimal" ? "" : " element_hidden")} value={props.precision_input} onChange={props.handleChange} />
          </div>

          <div className="scale_section">
            <label for="scale_input" className={"scale_arg_lbl" + (props.operandValue === "decimal" ? "" : " element_hidden")}> Scale</label>
            <input type="text" name={props.operand + "_scale_input"} className={"scale_input" + (props.operandValue === "decimal" ? "" : " element_hidden")} value={props.scale_input} onChange={props.handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}


class CalculatorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_operand: "decimal",
      second_operand: "decimal",
      first_precision_input: "",
      first_scale_input: "",
      second_precision_input: "",
      second_scale_input: "",
      operator: "",
      resultant_datatype: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, data) {
    const target = event.target;
    const name = target.getAttribute('name');
    let value = data === undefined ? target.value : data;
    console.log("name: " + name);
    console.log("value: " + value);
    if ((name === "first_precision_input" || name === "second_precision_input") && parseInt(value) > 38) {
      alert("Max. precision possible is 38");
      value = 38;
    }

    if ((name === "first_scale_input" || name === "second_scale_input") && parseInt(value) > 37) {
      alert("Max. scale possible is 37.");
      value = 37;
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const fop = this.state.first_operand;
    const sop = this.state.second_operand;
    let result_dt = "";

    if (!this.state.operator) {
      alert("Please select the operator involved in the computation by clicking on it.");
      return;
    }

    if (fop === "double" || sop === "double") {
      result_dt = "double";
    }
    else if (fop === "float" || sop === "float") {
      if (fop === sop) {
        result_dt = "float";
      }
      else {
        result_dt = "double";
      }
    }
    else if (fop === "decimal" || sop === "decimal") {
      result_dt = calcResultantDecimal(this.state);
    }
    else if (fop === "bigint" || sop === "bigint") {
      result_dt = "bigint";
    }
    else if (fop === "int" || sop === "int") {
      result_dt = "int";
    }
    else {
      result_dt = "smallint";
    }

    if (result_dt) {
      this.setState({
        resultant_datatype: result_dt
      });
    }
  }

  render() {
    return (
      <div>
        <div className="App-header">Redshift Calculator</div>
        <div>
          <form onSubmit={this.handleSubmit}>

            <DatatypeInput operand="first" operandValue={this.state.first_operand} precision_input={this.state.first_precision_input} scale_input={this.state.first_scale_input} handleChange={this.handleChange} />

            <ul className="operator-container">
              <li className="operator-item">
                <div name="operator" className={this.state.operator === "add" ? "selected" : ""} onClick={e => this.handleChange(e, "add")}>
                  <span className={this.state.operator === "add" ? "selected" : ""}>+</span>
                </div>
              </li>
              <li className="operator-item">
                <div name="operator" className={this.state.operator === "sub" ? " selected" : ""} onClick={e => this.handleChange(e, "sub")}>
                  <span className={this.state.operator === "sub" ? " selected" : ""}>-</span>
                </div>
              </li>
              <li className="operator-item">
                <div name="operator" className={this.state.operator === "divi" ? " selected" : ""} onClick={e => this.handleChange(e, "divi")}>
                  <span className={this.state.operator === "divi" ? " selected" : ""}>/</span>
                </div>
              </li>
              <li className="operator-item">
                <div name="operator" className={this.state.operator === "mul" ? " selected" : ""} onClick={e => this.handleChange(e, "mul")}>
                  <span className={this.state.operator === "mul" ? " selected" : ""}>X</span>
                </div>
              </li>
            </ul>

            <DatatypeInput operand="second" operandValue={this.state.second_operand} precision_input={this.state.second_precision_input} scale_input={this.state.second_scale_input} handleChange={this.handleChange} />

            <div className="resultant-div">
              <input type="submit" value="Submit" className="submit-btn" />
              <div className={"resultant-datatype"}>
                <span className={this.state.resultant_datatype.length > 0 ? "res_avail" : ""}>
                  {this.state.resultant_datatype.length > 0 ? this.state.resultant_datatype.toUpperCase() : "Resultant Data Type" }
                </span>
              </div>
            </div>

            <div className="footer">
              <a href="https://docs.aws.amazon.com/redshift/latest/dg/r_numeric_computations201.html" className="reference" target="blank">Redshift documentation on "Numeric Computation"</a>
              <br/>
              Designed &amp; Built by <a href="https://adarshgupta.github.io/" target="blank">Adarsh Gupta</a>
              &nbsp;<a href="https://github.com/AdarshGupta/Redshift-calc" target="blank"><i class="fa-brands fa-github"></i></a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <CalculatorForm />
    </div>
  );
}

export default App;
