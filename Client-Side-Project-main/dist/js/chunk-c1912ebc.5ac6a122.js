(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c1912ebc"],{"1e64":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("b-card",{staticStyle:{border:"none",background:"transparent"}},[a("b-card-text",[a("ul",[a("div",[a("router-link",{attrs:{to:{name:"player_page_by_id",params:{id:e.id}}}},[a("img",{attrs:{src:e.imageURL}})])],1),a("div",[a("router-link",{attrs:{to:{name:"player_page_by_id",params:{id:e.id}}}},[a("b",[e._v("Full Name:")]),e._v(" "+e._s(e.name))])],1),a("li",[e._v(" Player ID: "+e._s(e.id))]),a("li",[e._v(" Team: "+e._s(e.team_name))]),a("li",[e._v(" Position: "+e._s(e.position))])])])],1)],1)},n=[],s=(a("a9e3"),{name:"PlayerPreview",props:{id:{type:Number,required:!0},name:{type:String,required:!0},team_name:{type:String,required:!0},position:{type:Number,required:!0},imageURL:{type:String}},mounted:function(){console.log("player preview mounted")}}),r=s,l=a("2877"),o=Object(l["a"])(r,i,n,!1,null,null,null);t["a"]=o.exports},4105:function(e,t,a){"use strict";var i=a("73e2"),n=a.n(i);n.a},"4e00":function(e,t,a){},"73e2":function(e,t,a){},"87bb":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[a("b-card",[a("b-card-text",[a("div",{attrs:{align:"center"}},[a("TeamPreview",{key:e.team_id,attrs:{team_name:e.team_name,teamImageURL:e.teamImageURL}})],1),a("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #555"},attrs:{id:"carousel-1",interval:4e3,controls:"",indicators:"",background:"grey","img-width":"1800","img-height":"480"},on:{"sliding-start":e.onSlideStart,"sliding-end":e.onSlideEnd}},e._l(e.players,(function(e,t){return a("b-carousel-slide",{key:t,attrs:{"img-blank":""}},[[a("PlayerPreview",{key:e.playerId,attrs:{id:e.id,name:e.name,team_name:e.team_name,position:e.position,imageURL:e.image}})]],2)})),1)],1)],1)],1),a("div",[a("h3",{attrs:{align:"center"}},[e._v(" Past Matches")]),a("b-table",{attrs:{items:e.past_matches,fields:e.fields_past,striped:"",responsive:"sm"},scopedSlots:e._u([{key:"cell(show_details)",fn:function(t){return[a("b-button",{staticClass:"mr-2",attrs:{size:"sm"},on:{click:t.toggleDetails}},[e._v(" "+e._s(t.detailsShowing?"Hide":"Show")+" Events ")])]}},{key:"row-details",fn:function(t){return[a("b-card",[a("b-table",{attrs:{items:t.item.events,fields:e.fields_events,striped:"",responsive:"sm"}},[a("b-button",{attrs:{size:"sm"},on:{click:t.toggleDetails}},[e._v("Hide Events")])],1)],1)]}}])})],1),a("div",[a("h3",{attrs:{align:"center"}},[e._v(" Future Matches")]),a("b-table",{attrs:{items:e.future_matches,fields:e.fields_future,striped:"",responsive:"sm"},scopedSlots:e._u([{key:"cell(show_details)",fn:function(t){return[a("b-button",{staticClass:"mr-2",attrs:{size:"sm"},on:{click:t.toggleDetails}},[e._v(" "+e._s(t.detailsShowing?"Hide":"Show")+" Events ")])]}}])})],1)])},n=[],s=(a("b0c0"),a("96cf"),a("1da1")),r=a("1e64"),l=a("cd1d"),o={name:"team_page_by_id",components:{PlayerPreview:r["a"],TeamPreview:l["a"]},data:function(){return{team_id:0,teamImageURL:"",team_name:"",players:[],past_matches:[],future_matches:[],fields_past:["match_id","local_team","visitor_team","date_game","hour","venue","result","show_details"],fields_future:["match_id","local_team","visitor_team","date_game","hour","venue"],fields_events:["minute","description","hour"],sliding:null}},methods:{onSlideStart:function(){this.sliding=!0},onSlideEnd:function(){this.sliding=!1},teamDetails:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.axios.get("http://localhost:3000/teams/teamFullDetails/".concat(e.$route.params.id));case 3:a=t.sent,e.team_id=a.data[0].id,e.teamImageURL=a.data[0].logo_path,e.team_name=a.data[0].name,e.players=[],e.past_matches=[],e.future_matches=[],e.players=a.data[1],e.past_matches=a.data[3],e.past_matches._showDetails=!0,e.future_matches=a.data[2],t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),console.log(t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()}},mounted:function(){this.teamDetails()}},m=o,d=(a("9de9"),a("2877")),c=Object(d["a"])(m,i,n,!1,null,null,null);t["default"]=c.exports},"9de9":function(e,t,a){"use strict";var i=a("4e00"),n=a.n(i);n.a},cd1d:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("b-card",{staticStyle:{border:"none",background:"transparent"}},[a("b-card-text",[a("ul",{staticClass:"player-content"},[a("div",[a("router-link",{attrs:{to:{name:"team_page_by_id",params:{id:e.team_id}}}},[a("img",{attrs:{src:e.teamImageURL}})])],1),a("div",[a("router-link",{attrs:{to:{name:"team_page_by_id",params:{id:e.team_id}}}},[a("b",[e._v("Team Name:")]),e._v(" "+e._s(e.team_name))])],1)])])],1)],1)},n=[],s=(a("a9e3"),{name:"TeamPreview",props:{team_id:{type:Number,required:!0},team_name:{type:String,required:!0},teamImageURL:{type:String}},mounted:function(){console.log("team preview mounted")}}),r=s,l=(a("4105"),a("2877")),o=Object(l["a"])(r,i,n,!1,null,null,null);t["a"]=o.exports}}]);
//# sourceMappingURL=chunk-c1912ebc.5ac6a122.js.map