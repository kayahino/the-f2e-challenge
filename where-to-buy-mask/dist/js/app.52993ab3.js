(function(e){function t(t){for(var a,r,o=t[0],s=t[1],u=t[2],l=0,f=[];l<o.length;l++)r=o[l],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==i[o]&&(a=!1)}a&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={app:0},i={app:0},c=[];function o(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-61fae372":"955bf0a9","chunk-6d16c31d":"69ed3173","chunk-7c8fceaa":"0463dace"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-61fae372":1,"chunk-6d16c31d":1,"chunk-7c8fceaa":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-61fae372":"2cceb3b4","chunk-6d16c31d":"96e2e844","chunk-7c8fceaa":"4a11356d"}[e]+".css",i=s.p+a,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var u=c[o],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===i))return t()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){u=f[o],l=u.getAttribute("data-href");if(l===a||l===i)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||i,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete r[e],d.parentNode.removeChild(d),n(c)},d.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){r[e]=0})));var a=i[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise((function(t,n){a=i[e]=[t,n]}));t.push(a[2]=c);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=o(e);var f=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=i[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",f.name="ChunkLoadError",f.type=a,f.request=r,n[1](f)}i[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0025":function(e,t,n){},"30db":function(e,t,n){"use strict";var a=n("0025"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=n("750b"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("Header",{ref:"header",on:{popup:function(t){e.state.popupOpen=!0},openModal:function(t){e.state.modalOpen=!0}}}),a("div",{staticClass:"wrapper"},[a("keep-alive",[a("router-view",{staticClass:"container"})],1),a("keep-alive",[e.isMobile?e._e():a("Map",{staticClass:"map"})],1)],1),a("transition",{attrs:{name:"slide",mode:"out-in"}},[e.state.popupOpen&&e.menuOpen?a("div",{ref:"popup",staticClass:"howToBuy"},[a("img",{attrs:{src:n("f6fe"),draggable:"false"}})]):e._e()]),a("transition",{attrs:{name:"popup",mode:"out-in"}},[e.state.modalOpen?a("Modal",{ref:"maskInfo"},[a("div",{attrs:{slot:"modal-content"},slot:"modal-content"},[a("img",{attrs:{src:n("f6fe"),draggable:"false"}})])]):e._e()],1),a("div",{ref:"footer",staticClass:"footer"},[a("p",[e._v("防疫專線 1922 ｜ 口罩資訊 1911")]),e._m(0)])],1)},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",{staticClass:"copyright"},[e._v(" Design / PY Design "),n("br"),e._v("Made / Cleo ")])}],o=(n("d3b7"),n("96cf"),n("1da1")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"header",class:["header",e.state.menuOpen?"isOpen":""]},[n("div",{staticClass:"wrap"},[n("div",{staticClass:"header__logo",on:{click:e.toIndex}},[e._m(0),n("div",{staticClass:"title"},[e._v("口罩即時查")])]),n("div",{staticClass:"menu__trigger",on:{click:function(t){e.state.menuOpen=!e.state.menuOpen}}},[n("div",{staticClass:"dash top"}),n("div",{staticClass:"dash bottom"})])]),n("div",{staticClass:"header__menu"},[n("router-link",{staticClass:"link active",attrs:{to:{name:"index"}}},[e._v("口罩供給現況")]),n("a",{staticClass:"link",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.$emit("openModal")}}},[e._v("口罩怎麼買")])],1)])},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"logo"},[n("div",{staticClass:"circle"})])}],l={setup:function(e,t){Object(r["d"])((function(){document.body.addEventListener("click",o),window.addEventListener("scroll",s)})),Object(r["e"])((function(){document.body.removeEventListener("click",o),window.removeEventListener("scroll",s)}));var n=Object(r["g"])(null),a=Object(r["a"])((function(){return t.root.$store.isMobile})),i=Object(r["f"])({menuOpen:!1});function c(){t.root.$router.push({name:"index"}).catch((function(e){console.log(e)}))}function o(e){n.value.contains(e.target)||(i.menuOpen=!1)}function s(){if(!i.menuOpen)return!1;i.menuOpen=!1}return{state:i,isMobile:a,toIndex:c,menuHandler:s,header:n}}},f=l,d=(n("8a06"),n("2877")),p=Object(d["a"])(f,s,u,!1,null,"abc8504a",null),m=p.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal"},[n("div",{staticClass:"modal__wrap"},[e._t("modal-content")],2)])},v=[],g={},b=g,_=(n("30db"),Object(d["a"])(b,h,v,!1,null,null,null)),O=_.exports,w=n("61da"),E={name:"app",components:{Header:m,Map:function(){return n.e("chunk-7c8fceaa").then(n.bind(null,"a0be"))},Modal:O},setup:function(e,t){var n=t.root;t.emit;Object(r["d"])(Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.$store.dispatch("getData"),n.$store.dispatch("checkIfMobile"),window.addEventListener("resize",d),document.body.addEventListener("click",p,!0);case 4:case"end":return e.stop()}}),e)})))),Object(r["c"])((function(){window.removeEventListener("resize",d),document.body.removeEventListener("click",p),w["a"].$off()}));var a=Object(r["g"])(null),i=Object(r["g"])(null),c=Object(r["g"])(null),s=Object(r["g"])(null),u=Object(r["a"])((function(){return a.value.state.menuOpen||(l.popupOpen=!1),a.value.state.menuOpen})),l=Object(r["f"])({tab:"list",filterData:null,currentCoords:{},isLoaded:!1,popupOpen:!1,isMobile:!1,modalOpen:!1}),f=Object(r["a"])((function(){return n.$store.state.isMobile}));function d(){window.innerWidth<600?n.$store.commit("SET_IS_MOBILE",!0):n.$store.commit("SET_IS_MOBILE",!1)}var p=function(e){return!!l.modalOpen&&(!s.value.$el.children[0].contains(e.target)&&void(l.modalOpen=!1))};return{state:l,isMobile:f,popup:c,header:a,footer:i,menuOpen:u,maskInfo:s}}},k=E,T=(n("5c0b"),Object(d["a"])(k,i,c,!1,null,null,null)),M=T.exports,y=n("bc3a"),S=n.n(y),C=n("a7fe"),j=n.n(C),L=n("2f62"),A=(n("99af"),n("d81d"),n("b0c0"),n("6cc5"),n("e11e")),I=n.n(A),D=n("e496"),x=n.n(D),P=(n("4160"),n("fb6a"),n("ac1f"),n("1276"),n("498a"),n("159b"),{mon:{morning:!1,afternoon:!1,evening:!1},tue:{morning:!1,afternoon:!1,evening:!1},wed:{morning:!1,afternoon:!1,evening:!1},thu:{morning:!1,afternoon:!1,evening:!1},fri:{morning:!1,afternoon:!1,evening:!1},sat:{morning:!1,afternoon:!1,evening:!1},sun:{morning:!1,afternoon:!1,evening:!1}}),$={"星期一":"mon","星期二":"tue","星期三":"wed","星期四":"thu","星期五":"fri","星期六":"sat","星期日":"sun"},R={"上午":"morning","下午":"afternoon","晚上":"evening"};function N(e){var t=e.split("、");return t.forEach((function(e){if(0===e.trim().length)return!1;var t=$[e.slice(0,3)],n=R[e.slice(3,5)],a=e.slice(5,7);P[t][n]="看診"===a})),P}function B(e){return'\n    <table class="popup__table">\n      <thead>\n        <tr>\n          <th scope="col">＃</th>\n          <th scope="col">一</th>\n          <th scope="col">二</th>\n          <th scope="col">三</th>\n          <th scope="col">四</th>\n          <th scope="col">五</th>\n          <th scope="col">六</th>\n          <th scope="col">日</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <th scope="row">早上</th>\n          <td>'.concat(e.mon.morning?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.tue.morning?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.wed.morning?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.thu.morning?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.fri.morning?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.sat.morning?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.sun.morning?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>','</td>\n        </tr>\n        <tr>\n          <th scope="row">下午</th>\n          <td>').concat(e.mon.afternoon?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.tue.afternoon?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.wed.afternoon?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.thu.afternoon?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.fri.afternoon?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.sat.afternoon?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.sun.afternoon?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>','</td>\n        </tr>\n        <tr>\n          <th scope="row">晚上</th>\n          <td>').concat(e.mon.evening?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.tue.evening?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.wed.evening?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.thu.evening?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.fri.evening?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.sat.evening?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n          <td>").concat(e.sun.evening?'<i class="far fa-circle"></i>':'<i class="fas fa-times"></i>',"</td>\n        </tr>\n      </tbody>\n    </table>\n  ")}var G={convert:N,tableTemplate:B,tableData:P},U={radius:8,fillColor:"#ff7800",color:"#000",weight:1,opacity:1,fillOpacity:.8},H=I.a.icon({iconUrl:x.a,iconSize:[40,40],iconAnchor:[20,40],popupAnchor:[-3,-76]}),z=function(e,t,n){var a=I.a.map(e,t);return F(a,n),a},q=function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t,n,a){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,I.a.tileLayer(n,a);case 2:return r=e.sent,r.addTo(t),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),F=function(e,t){I.a.geoJSON(t,{pointToLayer:function(e,t){return I.a.circleMarker(t,U)},onEachFeature:function(e,t){var n=G.convert(e.properties.available),a=G.tableTemplate(n);t.bindPopup('\n        <h3 class="popup__title">'.concat(e.properties.name,"</h3>\n        ").concat(a,'\n        <div class="popup__note">\n          <div>備註</div><div>').concat(0===e.properties.note.length?"無":e.properties.note,"</div>\n        </div>\n      ")),t.storeID=e.properties.id}}).addTo(e)},J=function(e,t){var n=I.a.circleMarker(t,{color:"red",fillColor:"#f03",fillOpacity:.5,radius:100}).addTo(e);return n},K=function(e,t){var n=I.a.marker({lat:t.latitude,lng:t.longitude},{icon:H}).addTo(e);return n},Y={createMap:z,createTileLayer:q,pinMark:F,showDistanceRange:J,setPosMarker:K},W=n("bb71"),Q={map:Y,getDistance:W["a"]},V=n("8c4f");a["a"].use(V["a"]);var X=[{name:"index",path:"/",redirect:{path:"/list"}},{name:"list",path:"/list",component:function(){return n.e("chunk-61fae372").then(n.bind(null,"a3c5"))},meta:{keepAlive:!0}},{name:"search",path:"/search",component:function(){return n.e("chunk-6d16c31d").then(n.bind(null,"2d3b"))},meta:{keepAlive:!1}}],Z=new V["a"]({routes:X}),ee=Z;n("dca8");a["a"].use(L["a"]);var te=new L["a"].Store({strict:!0,state:{isMobile:!1,maskData:[],dataCache:{},location:{},lastUpdated:"",isLoading:!1,errMsg:null,status:null},getters:{getMaskData:function(e){return e.maskData}},actions:{getData:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t,n){var a,r,i,c,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.commit,r="https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json",a("SET_LOADING",!0),e.prev=3,e.next=6,S.a.get(r);case 6:i=e.sent,c=new Date,o="".concat(c.getHours(),":").concat(c.getMinutes(),":").concat(c.getMilliseconds()),s=Object.freeze(i.data),a("GET_MASKDATA",s),a("UPDATE_TIME",o),a("SET_LOADING",!1),e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](3),setTimeout((function(){a("SET_ERR_MSG","Failed to get data.")}),1e3);case 18:case"end":return e.stop()}}),e,null,[[3,15]])})));function t(t,n){return e.apply(this,arguments)}return t}(),getLocation:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t,n){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.commit,a("SET_LOADING",!0),e.next=4,ne();case 4:r=e.sent,a("SET_LOCATION",r),a("SET_STATUS","LOCATE_BY_LATLNG"),a("SET_LOADING",!1);case 8:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}(),setDataCache:function(e,t){var n=e.commit;n("SET_CACHE",t)},checkIfMobile:function(e,t){var n=e.commit;/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)?n("SET_IS_MOBILE",!0):n("SET_IS_MOBILE",!1)}},mutations:{GET_MASKDATA:function(e,t){e.maskData=t},SET_LOCATION:function(e,t){e.location=t},SET_LOADING:function(e,t){e.isLoading=t},UPDATE_TIME:function(e,t){e.lastUpdated=t},SET_STATUS:function(e,t){e.status=t},SET_CACHE:function(e,t){e.dataCache=t},SET_IS_MOBILE:function(e,t){e.isMobile=t},SET_ERR_MSG:function(e,t){e.errMsg=t}}});function ne(){return new Promise((function(e,t){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((function(t){e(t.coords)}),(function(e){console.warn("ERROR ".concat(e.code,": ").concat(e.message)),t(e)}))}))}n("f5df1"),n("15f5");a["a"].config.productionTip=!1,a["a"].use(r["b"]),a["a"].use(j.a,S.a),a["a"].use(L["a"]),a["a"].prototype.$utils=Q,new a["a"]({store:te,router:ee,render:function(e){return e(M)}}).$mount("#app")},"5a2d":function(e,t,n){},"5c0b":function(e,t,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"61da":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("2b0e"),r=new a["a"]},"8a06":function(e,t,n){"use strict";var a=n("5a2d"),r=n.n(a);r.a},"9c0c":function(e,t,n){},bb71:function(e,t,n){"use strict";function a(e,t,n,a){var i=6371,c=r(n-e),o=r(a-t),s=r(e),u=r(n),l=Math.pow(Math.sin(c/2),2)+Math.cos(s)*Math.cos(u)*Math.pow(Math.sin(o/2),2),f=2*Math.asin(Math.sqrt(l));return f*i}function r(e){return e*Math.PI/180}t["a"]=a},e496:function(e,t,n){e.exports=n.p+"img/location.da67f94d.svg"},f6fe:function(e,t,n){e.exports=n.p+"img/howToBuy.ad4f02a7.png"}});
//# sourceMappingURL=app.52993ab3.js.map