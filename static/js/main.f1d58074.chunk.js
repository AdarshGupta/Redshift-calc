(this["webpackJsonpredshift-calc"]=this["webpackJsonpredshift-calc"]||[]).push([[0],[,,,,,,,,,,function(e,a,t){e.exports=t(18)},,,,,function(e,a,t){},function(e,a,t){e.exports=t.p+"static/media/logo.25bf045c.svg"},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),i=t.n(n),l=t(3),s=t.n(l),r=(t(15),t(4)),c=t(5),o=t(6),d=t(8),p=t(7),m=t(1),u=t(9);t(16),t(17);function h(e,a,t){var n=0,i=0;if("decimal"===e){if(!a)return void alert("Please specify the 'Precision' value for the decimal data type.");if(n=parseInt(a),!t)return void alert("Please specify the 'Scale' value for the decimal data type.");i=parseInt(t)}else{if("smallint"===e)n=5;else if("int"===e)n=10;else{if("bigint"!==e)return void alert("Invalid data type: "+e);n=19}i=0}return{precision:n,scale:i}}function _(e){return i.a.createElement("div",{id:e.operand+"-operand-div",className:"input-divs"},i.a.createElement("label",{for:e.operand,className:"input-lbl",id:e.operand+"-lbl"}," ",e.operand," Operand:"),i.a.createElement("div",{className:"datatype-section"},i.a.createElement("select",{className:"datatype-inputs",name:e.operand+"_operand",id:e.operand,value:e.operandValue,onChange:e.handleChange},i.a.createElement("option",{value:"decimal"},"Decimal"),i.a.createElement("option",{value:"smallint"},"SmallInt/Int2"),i.a.createElement("option",{value:"int"},"Int/Int4"),i.a.createElement("option",{value:"bigint"},"BigInt/Int8"),i.a.createElement("option",{value:"float"},"Float/Float4"),i.a.createElement("option",{value:"double"},"Double/Float8")),i.a.createElement("div",{className:"decimal_section"},i.a.createElement("div",{className:"prec_section"},i.a.createElement("label",{for:"precision_input",className:"prec_arg_lbl"+("decimal"===e.operandValue?"":" element_hidden")}," Precision"),i.a.createElement("input",{type:"text",name:e.operand+"_precision_input",className:"precision_input"+("decimal"===e.operandValue?"":" element_hidden"),value:e.precision_input,onChange:e.handleChange})),i.a.createElement("div",{className:"scale_section"},i.a.createElement("label",{for:"scale_input",className:"scale_arg_lbl"+("decimal"===e.operandValue?"":" element_hidden")}," Scale"),i.a.createElement("input",{type:"text",name:e.operand+"_scale_input",className:"scale_input"+("decimal"===e.operandValue?"":" element_hidden"),value:e.scale_input,onChange:e.handleChange})))))}var f=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(d.a)(this,Object(p.a)(a).call(this,e))).state={first_operand:"decimal",second_operand:"decimal",first_precision_input:"",first_scale_input:"",second_precision_input:"",second_scale_input:"",operator:"",resultant_datatype:""},t.handleChange=t.handleChange.bind(Object(m.a)(t)),t.handleSubmit=t.handleSubmit.bind(Object(m.a)(t)),t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"handleChange",value:function(e,a){var t=e.target,n=t.getAttribute("name"),i=void 0===a?t.value:a;console.log("name: "+n),console.log("value: "+i),("first_precision_input"===n||"second_precision_input"===n)&&parseInt(i)>38&&(alert("Max. precision possible is 38"),i=38),("first_scale_input"===n||"second_scale_input"===n)&&parseInt(i)>37&&(alert("Max. scale possible is 37."),i=37),this.setState(Object(r.a)({},n,i))}},{key:"handleSubmit",value:function(e){e.preventDefault();var a=this.state.first_operand,t=this.state.second_operand,n="";this.state.operator?(n="double"===a||"double"===t?"double":"float"===a||"float"===t?a===t?"float":"double":"decimal"===a||"decimal"===t?function(e){var a=e.first_operand,t=e.second_operand,n=e.operator,i=0,l=0,s=0,r=0,c=0,o=0,d=h(a,e.first_precision_input,e.first_scale_input);if(d){i=d.precision,l=d.scale;var p=h(t,e.second_precision_input,e.second_scale_input);if(p){if(s=p.precision,r=p.scale,!(l>i||r>s)){if("add"===n||"sub"===n)o=Math.max(l,r),c=Math.max(i-l,s-r)+1+o;else if("mul"===n)o=l+r,c=i+s+1;else{if("divi"!==n)return void alert("Operator not supported yet!");c=i-l+r+(o=Math.max(4,l+s-r+1)),o>100&&(c-=o-37,o=37),c>38&&(c=38,o=Math.max(38+o-c,4))}return"decimal("+(c=Math.min(38,c))+", "+(o=Math.min(37,o))+")"}alert("The scale value must be less than or equal to the precision value.")}}}(this.state):"bigint"===a||"bigint"===t?"bigint":"int"===a||"int"===t?"int":"smallint")&&this.setState({resultant_datatype:n}):alert("Please select the operator involved in the computation by clicking on it.")}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",{className:"App-header"},"Redshift Calculator"),i.a.createElement("div",null,i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement(_,{operand:"first",operandValue:this.state.first_operand,precision_input:this.state.first_precision_input,scale_input:this.state.first_scale_input,handleChange:this.handleChange}),i.a.createElement("ul",{className:"operator-container"},i.a.createElement("li",{className:"operator-item"},i.a.createElement("div",{name:"operator",className:"add"===this.state.operator?"selected":"",onClick:function(a){return e.handleChange(a,"add")}},i.a.createElement("span",{className:"add"===this.state.operator?"selected":""},"+"))),i.a.createElement("li",{className:"operator-item"},i.a.createElement("div",{name:"operator",className:"sub"===this.state.operator?" selected":"",onClick:function(a){return e.handleChange(a,"sub")}},i.a.createElement("span",{className:"sub"===this.state.operator?" selected":""},"-"))),i.a.createElement("li",{className:"operator-item"},i.a.createElement("div",{name:"operator",className:"divi"===this.state.operator?" selected":"",onClick:function(a){return e.handleChange(a,"divi")}},i.a.createElement("span",{className:"divi"===this.state.operator?" selected":""},"/"))),i.a.createElement("li",{className:"operator-item"},i.a.createElement("div",{name:"operator",className:"mul"===this.state.operator?" selected":"",onClick:function(a){return e.handleChange(a,"mul")}},i.a.createElement("span",{className:"mul"===this.state.operator?" selected":""},"X")))),i.a.createElement(_,{operand:"second",operandValue:this.state.second_operand,precision_input:this.state.second_precision_input,scale_input:this.state.second_scale_input,handleChange:this.handleChange}),i.a.createElement("div",{className:"resultant-div"},i.a.createElement("input",{type:"submit",value:"Submit",className:"submit-btn"}),i.a.createElement("div",{className:"resultant-datatype"},i.a.createElement("span",{className:this.state.resultant_datatype.length>0?"res_avail":""},this.state.resultant_datatype.length>0?this.state.resultant_datatype.toUpperCase():"Resultant Data Type"))),i.a.createElement("div",{className:"footer"},i.a.createElement("a",{href:"https://docs.aws.amazon.com/redshift/latest/dg/r_numeric_computations201.html",className:"reference",target:"blank"},'Redshift documentation on "Numeric Computation"'),i.a.createElement("br",null),"Designed & Built by ",i.a.createElement("a",{href:"https://adarshgupta.github.io/",target:"blank"},"Adarsh Gupta"),"\xa0",i.a.createElement("a",{href:"https://github.com/AdarshGupta/Redshift-calc",target:"blank"},i.a.createElement("i",{className:"fa-brands fa-github"}))))))}}]),a}(i.a.Component);var v=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.f1d58074.chunk.js.map