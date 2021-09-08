sap.ui.define(["epta/ps/views/search/Search.controller","sap/ui/model/json/JSONModel","epta/ps/model/formatter","epta/ps/model/models","sap/ui/model/Filter","sap/ui/model/FilterOperator","epta/ps/ui5/controller/ErrorHandler"],function(e,t,a,r,o,i,n){"use strict";return e.extend("epta.ps.views.search.fragments.gantt.Gantt",{onInit:function(){this.getEventBus().subscribe("_onSearch","start",this._onSearch,this);this.getEventBus().subscribe("_onSearch","end",this._onSearch,this)},onRowSelectionChange:function(e){debugger;var t=e.getParameters().originEvent.getParameter("rowContext");if(!t){this.getView().getModel("footer").setProperty("/project","");this.getView().getModel("footer").setProperty("/enable",false);return}if(t.getModel().getProperty(t.getPath()+"/table/FunctionEnabled")!=="X"){this.getView().getModel("footer").setProperty("/project","");this.getView().getModel("footer").setProperty("/enable",false);return}var a=t.getModel().getProperty(t.getPath()+"/table/Wbselement");this.getView().getModel("footer").setProperty("/project",a);this.getView().getModel("footer").setProperty("/enable",true)},onNoteModify:function(e){this._oSelectedContext=e.getSource().getParent().getBindingContext();if(!this._oNoteDialog){this._oNoteDialog=sap.ui.xmlfragment("epta.ps.views.search.fragments.gantt.fragments.DialogNote",this);this.getView().addDependent(this._oNoteDialog)}this._oNoteDialog.getContent()[0].setValue(this._oSelectedContext.oModel.getProperty(this._oSelectedContext.sPath+"/table/Longtext"));this._oNoteDialog.open()},onNoteDialogSave:function(e){var t=this;var a=e.getSource().getContent()[0].getValue();this._oSelectedContext.oModel.setProperty(this._oSelectedContext.sPath+"/table/Longtext",a);this.getService().getModel().update("/WBSProjectSet('"+this._oSelectedContext.oModel.getProperty(this._oSelectedContext.sPath+"/table/Wbselement")+"')",{Longtext:a},{groupId:this.getService()._sGroupUpdateNoteId});this.getService().saveData({groupId:this.getService()._sGroupUpdateNoteId,success:function(e){t._onSuccessOrFailureDialog(e,"{i18n>ui5Success}","Success","{i18n>ui5Success}")},error:function(e){t._onSuccessOrFailureDialog(e,"{i18n>ui5Failure}","Error","{i18n>ui5Failure}")}})},_onSearch:function(e,t,a){if(t==="start"){this.getView().setBusy(true);return}var o=r.createGanttBaseModel();a.results.forEach(function(e){o.root.children.push(e)});var i=this._activitiesToTree(a.results);this.getView().byId("gntGanttChartTable").setData(i);this.getView().setBusy(false);var n=this.getView().byId("gntGanttChartContainer").getGanttCharts()[0];n.jumpToPosition(new Date)},_activitiesToTree:function(e){var t=r.createGanttBaseModel();for(var o=0;o<e.length;o++){var i=e[o];var n=i.Basicstartdate;if(n){n=new Date(new Date(n).getTime()+new Date(n).getTimezoneOffset()*6e4)}var s=i.Basicenddate;if(s){s=new Date(new Date(s).getTime()+new Date(s).getTimezoneOffset()*6e4)}var g=i.Forecastedstartdate;if(g){g=new Date(new Date(g).getTime()+new Date(g).getTimezoneOffset()*6e4)}var l=i.Forecastedenddate;if(l){l=new Date(new Date(l).getTime()+new Date(l).getTimezoneOffset()*6e4)}var d=i.Wbsdescription;var c="";var u={id:("000"+o).substr(-3),wbs:i.Wbselement,level:"01",name:d,tooltip:d,table:i,children:[],order:[]};if(i.Basicstartdate&&i.Basicenddate){c=("0"+n.getDate()).substr(-2)+"/"+("0"+(n.getMonth()+1)).substr(-2);c+=" - "+("0"+s.getDate()).substr(-2)+"/"+("0"+(s.getMonth()+1)).substr(-2);u.order.push({startTime:n,endTime:s,level:"0",name:c})}if(i.Forecastedstartdate&&i.Forecastedenddate){c=("0"+g.getDate()).substr(-2)+"/"+("0"+(g.getMonth()+1)).substr(-2);c+=" - "+("0"+l.getDate()).substr(-2)+"/"+("0"+(l.getMonth()+1)).substr(-2);u.children.push({id:i.Wbselement,level:"02",name:d,tooltip:c,order:[{startTime:g,endTime:l,level:"1",name:c}],table:{Longtext:""}})}t.root.children.push(u);if(g&&g<t.ganttStartTime){t.ganttStartTime=g}if(n&&n<t.ganttStartTime){t.ganttStartTime=n}if(l&&l>t.ganttEndTime){t.ganttEndTime=l}if(s&&s>t.ganttEndTime){t.ganttEndTime=s}}t.ganttStartTime=a.dateToString(new Date(t.ganttStartTime.getFullYear(),t.ganttStartTime.getMonth()+1,1));t.ganttEndTime=a.dateToString(new Date(t.ganttEndTime.getFullYear(),t.ganttEndTime.getMonth()+3,0));return t}})});