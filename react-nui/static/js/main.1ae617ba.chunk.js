(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{61:function(e,t,n){e.exports=n(75)},71:function(e,t,n){},73:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(11),l=(n(65),n(60)),i=n(1),o=n.n(i),r=n(58),c=n.n(r),m=n(78),s=n(79),u=n(80),d=n(77),p=n(6),E=n(8),f=n(4),h=n(5),v=n(7),b=n(31),g=n(17),k=n(22);k.a.items=k.a.items||[];var C=Object(b.a)({getAllItems:function(){return k.a.items},getItem:function(e){return k.a.items.find(function(t){return t.id===e})},createItem:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t={id:(new Date).getTime(),title:e.trim(),completed:!1};k.a.items=k.a.items.concat(t)},updateItem:function(e,t){var n=k.a.items.findIndex(function(t){return t.id===e});if(!(n<0)){var a=Object.assign(k.a.items[n],t);k.a.items=Object(g.a)(k.a.items.slice(0,n)).concat([a],Object(g.a)(k.a.items.slice(n+1)))}},deleteItem:function(e){var t=k.a.items.findIndex(function(t){return t.id===e});t<0||(k.a.items=Object(g.a)(k.a.items.slice(0,t)).concat(Object(g.a)(k.a.items.slice(t+1))))},getCount:function(){return k.a.items.reduce(function(e,t){return{active:e.active+ +!t.completed,completed:e.completed+ +t.completed,total:++e.total}},{active:0,completed:0,total:0})}}),w=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).model=C,n.listType=n.props.f7route.route.tab.id,n.state={sheetOpened:-1,items:[]},n}return Object(v.a)(t,e),Object(E.a)(t,[{key:"renderExternal",value:function(e,t){this.setState({items:t.items})}},{key:"render",value:function(){var e=this,t=this.model.getAllItems().filter(function(t){switch(e.listType){case A.ALL:return!0;case A.ACTIVE:return!t.completed;case A.COMPLETED:return t.completed;case A.NONE:default:return!1}});return o.a.createElement(a.m,null,o.a.createElement(a.f,{noChevron:!0,virtualList:!0,virtualListParams:{items:t,height:this.$theme.ios?63:73,renderExternal:this.renderExternal.bind(this)}},o.a.createElement("ul",null,this.state.items.map(function(t){return o.a.createElement(a.h,{key:t.id,onClick:function(n){"item-inner"===n.target.className&&e.setState({sheetOpened:t.id})}},o.a.createElement("div",{className:"test-row"},o.a.createElement("div",{className:"test-column"},o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("input",{type:"checkbox"})))))),o.a.createElement("div",{className:"test-column"},o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("span",{className:"label"},"Test"))))))),o.a.createElement("div",{className:"test-column"},o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",{className:"animation-square"})))))),o.a.createElement("div",{className:"test-column"},o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("img",{src:"favicon.ico"})))))))))}))),o.a.createElement(a.o,{opened:this.state.sheetOpened>-1,onSheetClosed:function(){e.setState({sheetOpened:-1})}},o.a.createElement(a.f,null,o.a.createElement(a.g,{title:"Edit",sheetClose:!0,onClick:function(){return e.openDialog(e.state.sheetOpened)}}),o.a.createElement(a.g,{title:"Delete",sheetClose:!0,onClick:function(){return e.deleteItem(e.state.sheetOpened)}}),o.a.createElement(a.g,{title:"Cancel",sheetClose:!0}))))}},{key:"toggleItem",value:function(e,t){this.model.updateItem(e,{completed:t.target.checked})}},{key:"deleteItem",value:function(e){this.model.deleteItem(e)}},{key:"openDialog",value:function(e){var t=this,n=this.model.getItem(e),a=this.$f7.dialog.prompt(null,"Edit Item",function(e){n.title!==e&&t.model.updateItem(n.id,{title:e})}).$el.find("input");a.val(n.title),a.focus()}}]),t}(o.a.Component),O=Object(b.b)(w),I=n(59),j=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).isIos=!0===I.a.prototype.device.ios,n.model=C,n}return Object(v.a)(t,e),Object(E.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(a.m,{pageContent:!1,tabs:!0},o.a.createElement(a.l,{bgColor:"primary"},o.a.createElement(a.i,null,o.a.createElement(a.e,{iconIos:"f7:menu",iconMd:"material:menu",panelOpen:"left"})),o.a.createElement(a.k,null,"Todos"),this.isIos&&o.a.createElement(a.j,{onClick:function(){return e.openDialog()}},o.a.createElement(a.e,{iconF7:"add"}))),o.a.createElement(a.s,{tabbar:!0,labels:!0,bgColor:"primary"},o.a.createElement(a.e,{tabLink:!0,routeTabId:A.ALL,href:"/todos/all",tabLinkActive:!0},o.a.createElement(a.d,{ios:"f7:list",md:"material:list"},o.a.createElement(a.b,{color:"red"},this.model.getCount().total.toString())),o.a.createElement("span",{className:"tabbar-label"},"All")),o.a.createElement(a.e,{tabLink:!0,routeTabId:A.ACTIVE,href:"/todos/active"},o.a.createElement(a.d,{ios:"f7:circle",md:"material:check_box_outline_blank"},o.a.createElement(a.b,{color:"red"},this.model.getCount().active.toString())),o.a.createElement("span",{className:"tabbar-label"},"Active")),o.a.createElement(a.e,{tabLink:!0,routeTabId:A.COMPLETED,href:"/todos/completed"},o.a.createElement(a.d,{className:"icon-fill",ios:"f7:check_round_fill",md:"material:check_box"},o.a.createElement(a.b,{color:"red"},this.model.getCount().completed.toString())),o.a.createElement("span",{className:"tabbar-label"},"Completed"))),o.a.createElement(a.r,{routable:!0},o.a.createElement(a.q,{id:A.ALL,tabActive:!0}),o.a.createElement(a.q,{id:A.ACTIVE}),o.a.createElement(a.q,{id:A.COMPLETED})),!this.isIos&&o.a.createElement(a.c,{position:"right-bottom",slot:"fixed",color:"pink",onClick:function(){return e.openDialog()}},o.a.createElement(a.d,{material:"add"})))}},{key:"openDialog",value:function(){var e=this;this.$f7.dialog.prompt(null,"Create Item",function(t){""!==t.trim()&&e.model.createItem(t)}).$el.find("input").focus()}}]),t}(o.a.Component),y=Object(b.b)(j),A={ALL:"all",ACTIVE:"active",COMPLETED:"completed",NONE:"none"},L=[{path:"/todos/",component:y,tabs:[{path:"/all",id:A.ALL,component:O},{path:"/active",id:A.ACTIVE,component:O},{path:"/completed",id:A.COMPLETED,component:O}]},{path:"/menu/",component:function(){return o.a.createElement(a.m,null,o.a.createElement(a.l,{title:"Menu",bgColor:"primary"}),o.a.createElement(a.f,{noChevron:!0},o.a.createElement(a.h,{link:"/todos/",title:"Todos",view:"#main-view",panelClose:!0}),o.a.createElement(a.h,{link:"/settings/",title:"Settings",view:"#main-view",panelClose:!0}),o.a.createElement(a.h,{link:"/about/",title:"About",view:"#main-view",panelClose:!0})))}},{path:"/settings/",component:function(){return o.a.createElement(a.m,null,o.a.createElement(a.l,{bgColor:"primary"},o.a.createElement(a.i,null,o.a.createElement(a.e,{iconIos:"f7:menu",iconMd:"material:menu",panelOpen:"left"})),o.a.createElement(a.k,null,"Settings")),"test")}},{path:"/about/",component:function(){return o.a.createElement(a.m,null,o.a.createElement(a.l,{bgColor:"primary"},o.a.createElement(a.i,null,o.a.createElement(a.e,{iconIos:"f7:menu",iconMd:"material:menu",panelOpen:"left"})),o.a.createElement(a.k,null,"About")),"test")}},{path:"/",redirect:"/todos/"},{path:"(.*)",redirect:"/todos/all"}],T=(n(71),n(73),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function N(e,t){navigator.serviceWorker.register(e,t).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}l.a.use(a.u),c.a.render(o.a.createElement(function(e){var t={id:"io.framework7.react-nui",name:"Todo",theme:"auto",routes:L,panel:{leftBreakpoint:600}};return o.a.createElement(a.a,{params:t},o.a.createElement(a.p,null),o.a.createElement(a.n,{left:!0,cover:!0},o.a.createElement(a.t,{url:"/menu/"})),o.a.createElement(m.a,{basename:"/"},o.a.createElement(s.a,null,o.a.createElement(u.a,{strict:!0,path:"/ma_bjoern/react-nui/"},o.a.createElement(a.t,{id:"main-view",url:"/todos/",main:!0,className:"ios-edges",pushState:!0,pushStateRoot:"/ma_bjoern/react-nui/",pushStateSeparator:"#"})),o.a.createElement(d.a,{to:"/ma_bjoern/react-nui/"}))))}),document.getElementById("app")),function(e){if("serviceWorker"in navigator){if(new URL("/ma_bjoern/react-nui",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/ma_bjoern/react-nui","/service-worker.js");T?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):N(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):N(t,e)})}}({scope:"/ma_bjoern/react-nui/"})}},[[61,2,1]]]);
//# sourceMappingURL=main.1ae617ba.chunk.js.map