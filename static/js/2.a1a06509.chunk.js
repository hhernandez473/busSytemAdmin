(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[2],{50:function(e,t,a){"use strict";t.a={BLANK_LINK:"#!"}},62:function(e,t,a){"use strict";t.a={items:[{id:"register",title:"Formularios",type:"group",icon:"directions_bus",children:[{id:"register2",title:"Registro de Bus",type:"item",url:"/register/register-bus",icon:"feather icon-book"},{id:"register3",title:"Registro de Ruta",type:"item",url:"/register/register-route",icon:"feather icon-map"},{id:"register4",title:"Registro de Horarios",type:"item",url:"/register/register-schedule",icon:"feather icon-clock"},{id:"register5",title:"Paradas de Bus",type:"item",url:"/register/stop-bus",icon:"feather icon-map-pin"}]}]}},64:function(e,t,a){"use strict";var i=a(7),r=a(8),s=a(10),n=a(9),c=a(0),l=a.n(c),m=a(69),o=a(11),u=a(62),p=a(50),d=a(19),h=function(e){Object(s.a)(a,e);var t=Object(n.a)(a);function a(){var e;Object(i.a)(this,a);for(var r=arguments.length,s=new Array(r),n=0;n<r;n++)s[n]=arguments[n];return(e=t.call.apply(t,[this].concat(s))).state={main:[],item:[]},e.componentWillReceiveProps=function(){u.a.items.map((function(t,a){return t.type&&"group"===t.type&&e.getCollapse(t),!1}))},e.getCollapse=function(t){t.children&&t.children.filter((function(a){return a.type&&"collapse"===a.type?e.getCollapse(a):a.type&&"item"===a.type&&document.location.pathname===o.a.basename+a.url&&e.setState({item:a,main:t}),!1}))},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;u.a.items.map((function(t,a){return t.type&&"group"===t.type&&e.getCollapse(t,a),!1}))}},{key:"render",value:function(){var e,t,a="",i="Bus";return this.state.main&&"collapse"===this.state.main.type&&(e=l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement("a",{href:p.a.BLANK_LINK},this.state.main.title))),this.state.item&&"item"===this.state.item.type&&(i=this.state.item.title,t=l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement("a",{href:p.a.BLANK_LINK},i)),!1!==this.state.item.breadcrumbs&&(a=l.a.createElement("div",{className:"page-header"},l.a.createElement("div",{className:"page-block"},l.a.createElement("div",{className:"row align-items-center"},l.a.createElement("div",{className:"col-md-12"},l.a.createElement("div",{className:"page-header-title"},l.a.createElement("h5",{className:"m-b-10"},i)),l.a.createElement("ul",{className:"breadcrumb"},l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement(m.a,{to:"/"},l.a.createElement("i",{className:"feather icon-home"}))),e,t))))))),document.title=i+" Sytem Admin",l.a.createElement(d.a,null,a)}}]),a}(c.Component);t.a=h},97:function(e,t,a){}}]);
//# sourceMappingURL=2.a1a06509.chunk.js.map