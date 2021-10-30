(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[11],{145:function(e,t,a){"use strict";a.r(t);var n=a(21),r=a(2),l=a(7),s=a(8),c=a(10),i=a(9),o=a(0),u=a.n(o),m=a(143),d=a(98),b=a(150),f=a(144),E=a(160),h=a(137),v=(a(146),a(19)),g=a(53),p=a(61),k=(a(66),function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).handleChange=function(t){var a,l=t.target,s=l.name,c=l.value,i=e.state,o=i.form,u=i.formErrors;a=Object(r.a)(Object(r.a)({},o),{},Object(n.a)({},s,c)),e.setState({form:a},(function(){if(Object.keys(u).includes(s)){var t,a=e.validateField(s,c);t=Object(r.a)(Object(r.a)({},u),{},Object(n.a)({},s,a)),e.setState({formErrors:t})}}))},e.validateField=function(e,t){var a=null;switch(e){case"licensePlates":t||(a="Ingrese n\xfamero de placa,"),/^(C|P)+[A-Z0-9]{6}$/.test(t)||(a="N\xfamero de placa incorrecto, Ejemplo: C123ABC");break;case"driverAssigned":t||(a="Seleccione un conductor");break;default:a=null}return a},e.validateForm=function(e,t,a){var n={};return Object.keys(t).forEach((function(t){var r=a(t,e[t]);r&&(n[t]=r)})),n},e.handleSubmit=function(){var t=e.state,a=t.form,n=t.formErrors,l=e.validateForm(a,n,e.validateField);if(0!==Object.keys(l).length)return e.setState({formErrors:Object(r.a)(Object(r.a)({},n),l)}),!1;var s=a.driverAssigned,c=a.licensePlates;g.a.post("/bus",{driverAssigned:s,licensePlates:c}).then((function(e){p.b.success("Bus creado correctamente.")})).catch((function(e){p.b.error(e.data.msg)})),console.log("Data: ",a)},e.getBuses=function(){g.a.get("/bus").then((function(t){e.setState({busList:t.data.buses})})).catch((function(e){console.log(e)}))},e.editBus=function(t){var a=t._id,n=t.driverAssigned,r=t.licensePlates;e.setState({btn:!0,form:{busID:a,driverAssigned:n._id,licensePlates:r}})},e.busModify=function(){var t=e.state,a=t.form,n=t.formErrors,l=e.validateForm(a,n,e.validateField);if(0!==Object.keys(l).length)return e.setState({formErrors:Object(r.a)(Object(r.a)({},n),l)}),!1;var s=a.driverAssigned,c=a.licensePlates,i=a.busID;g.a.put("/bus/".concat(i),{driverAssigned:s,licensePlates:c}).then((function(t){p.b.success("Bus modifcado correctamente."),e.cleanForm()})).catch((function(e){p.b.error(JSON.stringify(e.data.errors,null,2))}))},e.busDelete=function(t){g.a.del("/bus/".concat(t._id)).then((function(t){p.b.warning("Bus Eliminado correctamente."),e.cleanForm()})).catch((function(e){p.b.error(JSON.stringify(e.data.errors,null,2))}))},e.cleanForm=function(){e.setState({btn:!1,form:{busID:0,driverAssigned:"",licensePlates:""}}),e.getBuses()},e.state={form:{licensePlates:"",driverAssigned:null,busID:0},formErrors:{licensePlates:null,driverAssigned:null},userList:[],busList:[],btn:!1},e.getUserList(),e.getBuses(),e}return Object(s.a)(a,[{key:"getUserList",value:function(){var e=this;g.a.get("/usuarios").then((function(t){e.setState({userList:t.data.users,form:{driverAssigned:t.data.users[0].uid}})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.form,n=t.formErrors;return u.a.createElement(u.a.Fragment,null,u.a.createElement(v.a,null,u.a.createElement(m.a,null,u.a.createElement(d.a,null,u.a.createElement(b.a,null,u.a.createElement(b.a.Body,null,u.a.createElement("hr",null),u.a.createElement(m.a,null,u.a.createElement(d.a,{md:12},u.a.createElement(f.a,{striped:!0,bordered:!0,hover:!0,size:"sm"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",null,"#"),u.a.createElement("th",null,"Placa"),u.a.createElement("th",null,"Conductor"),u.a.createElement("th",null,"Editar"),u.a.createElement("th",null,"Eliminar"))),u.a.createElement("tbody",null,this.state.busList.map((function(t,a){return u.a.createElement("tr",{key:a},u.a.createElement("td",{key:a+1},a+1),u.a.createElement("td",{key:t._id},t.licensePlates),u.a.createElement("td",{key:t.driverAssigned.name},t.driverAssigned.name),u.a.createElement("td",null,u.a.createElement("i",{className:"material-icons btn btn-warning",onClick:function(){return e.editBus(t)}},"edit")),u.a.createElement("td",null,u.a.createElement("i",{className:"material-icons btn btn-danger",onClick:function(){return e.busDelete(t)}},"delete")))})))))),u.a.createElement(m.a,null,u.a.createElement(d.a,{md:3},u.a.createElement(E.a.Group,null,u.a.createElement(E.a.Label,null,"N\xfamero de Placa"),u.a.createElement(E.a.Control,{type:"text",placeholder:"placa",name:"licensePlates",value:a.licensePlates,onChange:this.handleChange,onBlur:this.handleChange}),n.licensePlates&&u.a.createElement("span",{className:"err"},n.licensePlates))),u.a.createElement(d.a,{md:3},u.a.createElement(E.a.Group,{controlId:"exampleForm.ControlSelect1"},u.a.createElement(E.a.Label,null,"Conductor Responsable"),u.a.createElement(d.a,{sm:"8"},u.a.createElement(E.a.Control,{as:"select",name:"driverAssigned",onChange:this.handleChange},this.state.userList.map((function(e,t){var a=e.uid,n=e.name;return u.a.createElement("option",{value:a,key:t}," ",n," ")}))),n.driverAssigned&&u.a.createElement("span",{className:"err"},n.driverAssigned)))),u.a.createElement(d.a,{md:6},u.a.createElement(h.a,{variant:"success",className:"mt-4",onClick:this.handleSubmit,disabled:this.state.btn},"Guardar"),u.a.createElement(h.a,{variant:"warning",className:"mt-4",onClick:this.busModify,disabled:!this.state.btn},"Editar"),u.a.createElement(h.a,{variant:"secondary",className:"mt-4",onClick:this.cleanForm},"Limpiar")))))),u.a.createElement(p.a,{closeButton:!1,position:"bottom-right"}))))}}]),a}(u.a.Component));t.default=k},146:function(e,t,a){},53:function(e,t,a){"use strict";var n=a(7),r=a(8),l=a(55),s=function(){function e(){Object(n.a)(this,e)}return Object(r.a)(e,[{key:"get",value:function(e){return l.a.get(e)}},{key:"post",value:function(e,t){return l.a.post(e,t)}},{key:"put",value:function(e,t){return l.a.put(e,t)}},{key:"del",value:function(e){return l.a.delete(e)}}]),e}();t.a=new s}}]);
//# sourceMappingURL=11.7b189795.chunk.js.map