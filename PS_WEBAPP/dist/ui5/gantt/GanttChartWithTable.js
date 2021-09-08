sap.ui.define(["sap/gantt/GanttChartWithTable","epta/ps/model/formatter","sap/ui/model/json/JSONModel","sap/gantt/def/cal/Calendar","sap/gantt/def/cal/CalendarDefs","sap/gantt/def/cal/TimeInterval","sap/gantt/config/TimeHorizon","sap/gantt/axistime/ProportionZoomStrategy","sap/gantt/shape/Group","sap/gantt/shape/Rectangle","sap/gantt/shape/SelectedShape","sap/gantt/shape/ext/Diamond","sap/gantt/shape/ext/Triangle"],function(t,e,a,n,i,r,s,o,p,g,l,h,m){"use strict";return t.extend("epta.ps.ui5.gantt.GanttChartWithTable",{metadata:{properties:{ganttStartTime:{type:"any",defaultValue:(new Date).setMonth((new Date).getMonth()-4)},ganttEndTime:{type:"any",defaultValue:(new Date).setMonth((new Date).getMonth()+4)},showTitle:{type:"boolean",defaultValue:false}}},init:function(){t.prototype.init.apply(this);this.setShapeDataNames(["top","order","relationship"]);this.setToolbarSchemes(this._createToolbarSchemes());this.setSelectionMode(sap.gantt.SelectionMode.None)},setData:function(t){this.setModel(new a(t));this.bindAggregation("rows",{path:"/root",parameters:{arrayNames:["children"]}});this.bindAggregation("relationships",{path:"/root/relationships"});this.setAxisTimeStrategy(this._createZoomStrategy());this.setShapes(this._configShape());this.setGanttStartTime(t.ganttStartTime);this.setGanttEndTime(t.ganttEndTime)},_createToolbarSchemes:function(){var t=[new sap.gantt.config.ToolbarScheme({key:"GLOBAL_TOOLBAR",customToolbarItems:new sap.gantt.config.ToolbarGroup({position:"R2",overflowPriority:sap.m.OverflowToolbarPriority.High}),timeZoom:new sap.gantt.config.ToolbarGroup({position:"R4",overflowPriority:sap.m.OverflowToolbarPriority.NeverOverflow}),settings:new sap.gantt.config.SettingGroup({position:"R1",overflowPriority:sap.m.OverflowToolbarPriority.Low,items:sap.gantt.config.DEFAULT_TOOLBAR_SETTING_ITEMS}),toolbarDesign:sap.m.ToolbarDesign.Transparent}),new sap.gantt.config.ToolbarScheme({key:"LOCAL_TOOLBAR"})];return t},_configShape:function(){var t=[];sap.ui.define(["sap/gantt/shape/Group"],function(t){var e=t.extend("sap.test.RectangleGroup");e.prototype.getRLSAnchors=function(t,e){var a=this.getShapes();var n;var i,r;for(var s in a){if(a[s]instanceof sap.gantt.shape.Rectangle){n=a[s]}}i=n.getX(t);r=n.getY(t,e)+n.getHeight()/2;return{startPoint:{x:i,y:r,height:n.getHeight(t)},endPoint:{x:i+n.getWidth(t),y:r,height:n.getHeight(t)}}};return e},true);sap.ui.define(["sap/gantt/shape/Rectangle"],function(t){var e=t.extend("sap.test.shapeRectangle");e.prototype.getFill=function(t){switch(t.level){case"1":return"#ffe699";case"2":return"#f8cbad";case"3":return"#ff0000";case"4":return"#2d9d92";default:return"#9bc2e6"}};return e},true);sap.ui.define(["sap/gantt/shape/SelectedShape"],function(t){var e=t.extend("sap.test.selectRectange");e.prototype.getStroke=function(t){switch(t.level){case"1":return"#B57506";default:return"#156589"}};e.prototype.getStrokeWidth=function(){return 2};return e});var e=new sap.gantt.config.Shape({key:"order",shapeDataName:"order",shapeClassName:"sap.test.RectangleGroup",selectedClassName:"sap.test.selectRectange",level:5,shapeProperties:{time:"{startTime}",endTime:"{endTime}",height:20,isDuration:true,enableDnD:"{enableDnD}",title:"{name}"},groupAggregation:[new sap.gantt.config.Shape({shapeClassName:"sap.test.shapeRectangle",selectedClassName:"sap.test.selectRectange",shapeProperties:{time:"{startTime}",endTime:"{endTime}",height:20,isDuration:true,enableDnD:"{enableDnD}"}})]});var a=new sap.gantt.config.Shape({key:"handOver",shapeDataName:"handOver",shapeClassName:"sap.test.shapeRectangle",level:5,shapeProperties:{time:"{handOverDate}",height:35,width:3,isDuration:false,enableDnD:false,title:"{name}"}});var n=new sap.gantt.config.Shape({key:"relationship",shapeDataName:"relationship",level:30,shapeClassName:"sap.gantt.shape.ext.rls.Relationship",shapeProperties:{isDuration:false,lShapeforTypeFS:true,showStart:false,showEnd:true,stroke:"#848F94",strokeWidth:1,type:"{relation_type}",fromObjectPath:"{fromObjectPath}",toObjectPath:"{toObjectPath}",fromDataId:"{fromDataId}",toDataId:"{toDataId}",fromShapeId:"{fromShapeId}",toShapeId:"{toShapeId}",id:"{guid}"}});t=[e,a,n];return t},_createTimeAxis:function(){var t=new sap.gantt.config.TimeAxis({planHorizon:new sap.gantt.config.TimeHorizon({startTime:this.getGanttStartTime(),endTime:this.getGanttEndTime()}),initHorizon:new sap.gantt.config.TimeHorizon({}),granularity:"1week",finestGranularity:"1day",coarsestGranularity:"1year",rate:1});return t},_createZoomStrategy:function(){var t={"1day":{innerInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,range:50},largeInterval:{unit:sap.gantt.config.TimeUnit.week,span:1,pattern:"MMM yyyy, 'Week' ww"},smallInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,pattern:"EEE dd"}},"1week":{innerInterval:{unit:sap.gantt.config.TimeUnit.week,span:1,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,pattern:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.week,span:1,pattern:"'W' w"}},"1month":{innerInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:12,pattern:"yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,pattern:"MMM"}}};return new o({totalHorizon:new s({startTime:this.getModel().getData().ganttStartTime,endTime:this.getModel().getData().ganttEndTime}),visibleHorizon:new s({startTime:this.getModel().getData().ganttStartTime,endTime:this.getModel().getData().ganttEndTime}),timeLineOptions:t,timeLineOption:t["1month"],coarsestTimeLineOption:t["1month"],finestTimeLineOption:t["1day"],zoomLevels:10})},renderer:{}})});