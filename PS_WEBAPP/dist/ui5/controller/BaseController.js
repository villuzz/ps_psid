sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("epta.ps.ui5.controller.BaseController",{getService:function(){return this.getOwnerComponent().getServiceComponent()},getEventBus:function(){return sap.ui.getCore().getEventBus()},getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},destroyModel:function(e){this.getView().getModel(e).destroy()},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onShareEmailPress:function(){var e=this.getModel("objectView")||this.getModel("worklistView");sap.m.URLHelper.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))},_onSuccessOrFailureDialog:function(e,t,n,o){var r=new sap.m.Dialog({title:t,type:"Message",state:n,content:new sap.m.Text({text:o}),beginButton:new sap.m.Button({type:sap.m.ButtonType.Emphasized,text:"OK",press:function(){r.close()}}),afterClose:function(){r.destroy()}});r.open()}})});