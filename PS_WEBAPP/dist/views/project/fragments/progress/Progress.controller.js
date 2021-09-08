sap.ui.define(["epta/ps/views/project/Project.controller","sap/ui/model/json/JSONModel","epta/ps/model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(t,e,o,r,i){"use strict";return t.extend("epta.ps.views.project.fragments.progress.Progress",{formatter:o,_oInputBinding:null,onInit:function(){this.setModel(new e,"_dprog");this._controller=this.getView().getControllerName()},onBeforeRendering:function(){this.getModel("layout").setProperty("/footer/save",true);this.getModel("layout").setProperty("/footer/cancel",true);this.getModel("layout").setProperty("/footer/filter",false);this.getModel("layout").setProperty("/footer/enabled",true)},handleValueHelpProgress:function(t){var e=t.getSource().getParent().oBindingContexts;this._oInputBinding=e[Object.keys(e)[0]];this.getModel("_dprog").setProperty("/progress",parseInt(this._oInputBinding.oModel.getProperty(this._oInputBinding.sPath+"/Apoc"),10));if(!this._oDialog){this._oDialog=sap.ui.xmlfragment("epta.ps.views.project.fragments.progress.fragments.DialogProgress",this);this.getView().addDependent(this._oDialog)}this._oDialog.open()},onDialogSave:function(t){var e=this;if(t.getSource().toPropagate()){this.getModel("NetworkActivity").getData().forEach(function(t){if(t.Networkactivity!==""){t.Apoc=e.getModel("_dprog").getProperty("/progress");e._addChange(e._controller,"Progress","/NetworkActivitySet(Projectnetwork='"+t.Projectnetwork+"',"+"Networkactivity='"+t.Networkactivity+"',"+"Wbselement='"+t.Wbselement+"')",{Apoc:e.getModel("_dprog").getProperty("/progress").toString()},e.getService()._sGroupUpdateId)}});this.getModel("NetworkActivity").refresh()}else{this._oInputBinding.oModel.setProperty(this._oInputBinding.sPath+"/Apoc",this.getModel("_dprog").getProperty("/progress"));this._addChange(this._controller,"Progress","/NetworkActivitySet(Projectnetwork='"+e._oInputBinding.oModel.getProperty(e._oInputBinding.sPath+"/Projectnetwork")+"',"+"Networkactivity='"+e._oInputBinding.oModel.getProperty(e._oInputBinding.sPath+"/Networkactivity")+"',"+"Wbselement='"+e._oInputBinding.oModel.getProperty(e._oInputBinding.sPath+"/Wbselement")+"')",{Apoc:e.getModel("_dprog").getProperty("/progress").toString()},this.getService()._sGroupUpdateId)}}})});