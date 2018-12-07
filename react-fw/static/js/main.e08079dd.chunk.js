(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5446:function(e,t,n){e.exports=n(5647)},5647:function(e,t,n){"use strict";n.r(t);var a,r,o,l=n(0),i=n.n(l),c=n(26),s=n(17),u=n(18),d=n(22),m=n(16),p=n(23),h=n(15),b=n(5),f=n(5651),E=n(5652),g=n(5649),v=n(5650),O=n(27),j=n(25);!function(e){e.ALL="all",e.ACTIVE="active",e.COMPLETED="completed",e.NONE="none"}(a||(a={})),function(e){e.EDIT="Edit",e.DELETE="Delete",e.CANCEL="Cancel"}(r||(r={}));var C={todos:{url:"/todos",title:"Todos",icon:i.a.createElement(j.h,null),tabs:(o={},Object(O.a)(o,a.ALL,{url:"/todos/".concat(a.ALL),title:"All",icon:i.a.createElement(j.h,null)}),Object(O.a)(o,a.ACTIVE,{url:"/todos/".concat(a.ACTIVE),title:"Active",icon:i.a.createElement(j.d,null)}),Object(O.a)(o,a.COMPLETED,{url:"/todos/".concat(a.COMPLETED),title:"Completed",icon:i.a.createElement(j.c,null)}),o)},settings:{url:"/settings",title:"Settings",icon:i.a.createElement(j.j,null)},about:{url:"/about",title:"About",icon:i.a.createElement(j.g,null)}},w={edit:{title:r.EDIT,icon:i.a.createElement(j.f,null)},delete:{title:r.DELETE,icon:i.a.createElement(j.e,null)},cancel:{title:r.CANCEL,icon:i.a.createElement(j.b,null)}},y=n(70),k=n(71),T=n.n(k),D=Object(h.createMuiTheme)({palette:{primary:{main:"#0129c7"},secondary:y.pink},typography:{useNextVariants:!0},overrides:{MuiDrawer:{paperAnchorBottom:{maxWidth:500,marginLeft:"auto",marginRight:"auto"}}}});var S=function(e){return function(t){return l.createElement(h.MuiThemeProvider,{theme:D},l.createElement(T.a,null),l.createElement(e,t))}},I=function(e){function t(){return Object(s.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.setTitle(this.props.title)}},{key:"render",value:function(){return i.a.createElement("div",null,"test")}}]),t}(i.a.Component);var A=Object(h.withStyles)(function(e){return Object(h.createStyles)({appBar:Object(O.a)({marginLeft:240},e.breakpoints.up("sm"),{width:"calc(100% - ".concat(240,"px)")}),menuButton:Object(O.a)({marginRight:20},e.breakpoints.up("sm"),{display:"none"})})})(function(e){var t=e.classes;return i.a.createElement(b.a,{position:"fixed",className:t.appBar},i.a.createElement(b.w,null,i.a.createElement(b.n,{color:"inherit","aria-label":"Open drawer",onClick:e.toggleDrawer,className:t.menuButton},i.a.createElement(j.i,null)),i.a.createElement(b.x,{variant:"h6",color:"inherit",noWrap:!0},e.title)))}),x=n(174),L=n(5648);function N(e){e.innerRef;var t=Object(x.a)(e,["innerRef"]);return i.a.createElement(L.a,t)}var M=Object(h.withStyles)(function(e){var t;return Object(h.createStyles)({menuBar:(t={},Object(O.a)(t,e.breakpoints.up("sm"),{width:239}),Object(O.a)(t,"left",0),Object(O.a)(t,"right","auto"),t),toolbar:e.mixins.toolbar})})(function(e){var t=e.classes;return i.a.createElement("div",null,i.a.createElement("div",{className:t.toolbar},i.a.createElement(b.a,{position:"fixed",className:t.menuBar},i.a.createElement(b.w,null,i.a.createElement(b.x,{variant:"h6",color:"inherit",noWrap:!0},"Menu")))),i.a.createElement(b.j,null),i.a.createElement(b.o,null,Object.values(C).map(function(t){return i.a.createElement(b.p,Object.assign({button:!0},{to:t.url},{component:N,key:t.title,onClick:e.closeDrawer}),i.a.createElement(b.q,null,t.icon),i.a.createElement(b.s,{primary:t.title}))})))});var P=Object(h.withStyles)(function(e){return Object(h.createStyles)({drawer:Object(O.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),drawerPaper:{width:240}})},{withTheme:!0})(function(e){var t=e.classes,n=e.theme;return i.a.createElement("nav",{className:t.drawer},i.a.createElement(b.m,{smUp:!0,implementation:"css"},i.a.createElement(b.k,{variant:"temporary",anchor:"rtl"===n.direction?"right":"left",open:e.mobileOpen,onClose:e.closeDrawer,classes:{paper:t.drawerPaper},ModalProps:{keepMounted:!0}},i.a.createElement(M,{closeDrawer:e.closeDrawer}))),i.a.createElement(b.m,{xsDown:!0,implementation:"css"},i.a.createElement(b.k,{classes:{paper:t.drawerPaper},variant:"permanent",open:!0},i.a.createElement(M,{closeDrawer:e.closeDrawer}))))}),W=function(e){function t(){return Object(s.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.setTitle(this.props.title)}},{key:"render",value:function(){return i.a.createElement("div",null,"test")}}]),t}(i.a.Component),B=n(173),V=n(47),R=n(5646),U=n(175),q=n(38),_=n(176),J=function(){function e(){Object(s.a)(this,e),this.storage=_.a,this.storage.items=this.storage.items||new Array}return Object(u.a)(e,[{key:"getAllItems",value:function(){return this.storage.items}},{key:"getItem",value:function(e){return this.storage.items.find(function(t){return t.id===e})}},{key:"createItem",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t={id:(new Date).getTime(),title:e.trim(),completed:!1};this.storage.items=this.storage.items.concat(t)}},{key:"updateItem",value:function(e,t){var n=this.storage.items.findIndex(function(t){return t.id===e});if(!(n<0)){var a=Object.assign(this.storage.items[n],t);this.storage.items=Object(q.a)(this.storage.items.slice(0,n)).concat([a],Object(q.a)(this.storage.items.slice(n+1)))}}},{key:"deleteItem",value:function(e){var t=this.storage.items.findIndex(function(t){return t.id===e});t<0||(this.storage.items=Object(q.a)(this.storage.items.slice(0,t)).concat(Object(q.a)(this.storage.items.slice(t+1))))}},{key:"getCount",value:function(){return this.storage.items.reduce(function(e,t){return{active:e.active+ +!t.completed,completed:e.completed+ +t.completed,all:++e.all}},{active:0,completed:0,all:0})}}]),e}(),K=Object(V.a)(new J),F=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).input=i.a.createRef(),n.handleClose=function(){n.props.handleClose((n.input.current||{value:""}).value,n.props.id)},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(b.f,{open:this.props.opened,onClose:this.handleClose,"aria-labelledby":"form-dialog-title"},i.a.createElement(b.i,{id:"form-dialog-title"},"Create Item"),i.a.createElement(b.h,null,i.a.createElement(b.v,{autoFocus:!0,margin:"dense",id:"title",label:"Title",type:"text",fullWidth:!0,defaultValue:this.props.defaultValue,onKeyUp:function(t){return 13===t.keyCode&&e.handleClose()},inputRef:this.input})),i.a.createElement(b.g,null,i.a.createElement(b.c,{onClick:this.handleClose,color:"primary"},"Cancel"),i.a.createElement(b.c,{onClick:this.handleClose,color:"primary"},"Save")))}}]),t}(i.a.Component),G=function(e){function t(){return Object(s.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(b.k,{anchor:"bottom",open:this.props.opened>-1,onClose:function(){return e.props.handleClose(w.cancel.title,-1)}},i.a.createElement("div",{tabIndex:0,role:"button",onKeyDown:function(){return e.props.handleClose(w.cancel.title,-1)}},i.a.createElement("div",null,i.a.createElement(b.o,null,Object.values(w).map(function(t){return i.a.createElement(b.p,{button:!0,key:t.title,onClick:function(){return e.props.handleClose(t.title,e.props.opened)}},i.a.createElement(b.q,null,t.icon),i.a.createElement(b.s,{primary:t.title}))})))))}}]),t}(i.a.Component),H=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={sheetOpened:-1,dialogState:{opened:!1,id:-1,value:""}},n.handleSheetClose=function(e,t){n.setState({sheetOpened:-1});var a=n.model.getItem(t);if(a)switch(e){case r.EDIT:n.setState({dialogState:{opened:!0,id:t,value:a.title}});break;case r.DELETE:n.model.deleteItem(t);break;case r.CANCEL:}},n.handleDialogClose=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-2;n.setState({dialogState:{opened:!1,id:-1,value:""}});var a=n.model.getItem(t),r=e.trim();a&&a.title!==r&&0!==r.length&&n.model.updateItem(t,{title:r})},n.model=K,n.listType=n.props.type,n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,n=this.model.getAllItems().filter(function(t){switch(e.listType){case a.ALL:return!0;case a.ACTIVE:return!t.completed;case a.COMPLETED:return t.completed;case a.NONE:default:return!1}}).map(function(n){return i.a.createElement(b.p,{button:!0,key:n.id,onClick:function(t){"INPUT"!==t.target.nodeName&&e.setState({sheetOpened:n.id})}},i.a.createElement(b.r,{className:t.secondaryAction},i.a.createElement(b.d,{className:t.checkbox,checked:n.completed,onChange:function(t,a){return e.model.updateItem(n.id,{completed:a})}})),i.a.createElement(b.s,{primary:n.title}))});return i.a.createElement("div",null,i.a.createElement(b.o,{className:t.list},n),i.a.createElement(G,{opened:this.state.sheetOpened,handleClose:this.handleSheetClose}),i.a.createElement(F,{title:"Edit Item",opened:this.state.dialogState.opened,id:this.state.dialogState.id,defaultValue:this.state.dialogState.value,handleClose:this.handleDialogClose}))}}]),t}(i.a.Component),Y=Object(h.withStyles)(function(){return Object(h.createStyles)({list:{backgroundColor:"white",maxHeight:"calc(100vh - 137px)",overflowY:"auto",padding:0},secondaryAction:{position:"inherit",transform:"none"},checkbox:{padding:6}})})(Object(V.b)(H)),$=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={activeTab:0,dialogOpened:!1},n.handleDialogOpen=function(){n.setState({dialogOpened:!0})},n.handleDialogClose=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";n.setState({dialogOpened:!1}),e.trim().length>0&&n.model.createItem(e)},n.handleChange=function(e,t){n.handleChangeIndex(t)},n.handleChangeIndex=function(e){n.setState({activeTab:e})},n.model=K,n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.setTitle(this.props.title)}},{key:"render",value:function(){var e=this,t=this.props.classes;return i.a.createElement("div",null,i.a.createElement(b.a,{position:"static",color:"default"},i.a.createElement(b.u,{value:this.state.activeTab,onChange:this.handleChange,indicatorColor:"primary",textColor:"primary",className:t.tabBar,fullWidth:!0},Object.entries(C.todos.tabs).map(function(t){var n=Object(B.a)(t,2),a=n[0],r=n[1];return i.a.createElement(b.t,Object.assign({label:r.title,icon:i.a.createElement(b.b,{color:"secondary",badgeContent:e.model.getCount()[a]},r.icon),key:r.title},{to:r.url},{component:N}))}))),i.a.createElement(U.a,{index:this.state.activeTab,onChangeIndex:this.handleChangeIndex},i.a.createElement(R.a,{path:C.todos.tabs[a.ALL].url,render:function(e){return i.a.createElement(Y,Object.assign({type:a.ALL},e))}}),i.a.createElement(R.a,{path:C.todos.tabs[a.ACTIVE].url,render:function(e){return i.a.createElement(Y,Object.assign({type:a.ACTIVE},e))}}),i.a.createElement(R.a,{path:C.todos.tabs[a.COMPLETED].url,render:function(e){return i.a.createElement(Y,Object.assign({type:a.COMPLETED},e))}})),i.a.createElement(b.l,{className:t.fab,color:"secondary",onClick:this.handleDialogOpen},i.a.createElement(j.a,null)),i.a.createElement(F,{handleClose:this.handleDialogClose,opened:this.state.dialogOpened,title:"Create Item"}))}}]),t}(i.a.Component),z=Object(h.withStyles)(function(e){return Object(h.createStyles)({tabBar:{backgroundColor:"white",borderBottom:"1px solid rgba(0, 0, 0, 0.12)"},fab:{position:"absolute",bottom:2*e.spacing.unit,right:2*e.spacing.unit}})})(Object(V.b)($)),Q=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={mobileOpen:!1,title:"Todos"},n.handleDrawerToggle=function(){n.setState(function(e){return{mobileOpen:!e.mobileOpen}})},n.handleDrawerClose=function(){n.setState({mobileOpen:!1})},n.setTitle=function(e){n.setState({title:e})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return i.a.createElement(f.a,null,i.a.createElement("div",{className:t.root},i.a.createElement(b.e,null),i.a.createElement(A,{toggleDrawer:this.handleDrawerToggle,title:this.state.title}),i.a.createElement(P,{mobileOpen:this.state.mobileOpen,closeDrawer:this.handleDrawerClose}),i.a.createElement("main",{className:t.content},i.a.createElement("div",{className:t.toolbar}),i.a.createElement(E.a,null,i.a.createElement(g.a,{path:C.todos.url,render:function(t){return i.a.createElement(z,Object.assign({},t,{title:C.todos.title,setTitle:e.setTitle}))}}),i.a.createElement(g.a,{path:C.settings.url,render:function(t){return i.a.createElement(W,Object.assign({},t,{title:C.settings.title,setTitle:e.setTitle}))}}),i.a.createElement(g.a,{path:C.about.url,render:function(t){return i.a.createElement(I,Object.assign({},t,{title:C.about.title,setTitle:e.setTitle}))}}),i.a.createElement(v.a,{to:C.todos.tabs.all.url})))))}}]),t}(i.a.Component),X=S(Object(h.withStyles)(function(e){return Object(h.createStyles)({root:{display:"flex"},toolbar:e.mixins.toolbar,content:{flexGrow:1}})})(Q)),Z=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ee(e,t){navigator.serviceWorker.register(e,t).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.render(l.createElement(X,null),document.querySelector("#root")),function(e){if("serviceWorker"in navigator){if(new URL("/ma_bjoern/react-fw",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/ma_bjoern/react-fw","/service-worker.js");Z?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):ee(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):ee(t,e)})}}({scope:"/ma_bjoern/react-fw/"})}},[[5446,2,1]]]);
//# sourceMappingURL=main.e08079dd.chunk.js.map