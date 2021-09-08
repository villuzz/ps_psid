sap.ui.define(["sap/ui/core/Component","sap/ui/model/json/JSONModel","sap/ui/model/odata/v2/ODataModel","sap/ui/Device"],function(e,t,r,o){"use strict";return e.extend("epta.ps.ui5.component.Service",{_sGroupReadId:"read",_sGroupReadSearchId:"readSearch",_sGroupUpdateId:"update",_sGroupUpdateNoteId:"updateNote",_sGroupCreateId:"create",_oModel:undefined,_oChangeModel:undefined,_sVariantContainer:"",initialize:function(e){var t=this;this._oModel=e;this._oModel._handleError=function(e,t){var r={},o;var a="The following problem occurred: "+e.message;r.message=e.message;if(e.response){this._parseResponse(e.response,t);a+=e.response.statusCode+","+e.response.statusText+","+e.response.body;r.statusCode="404";r.statusText=e.response.statusText;r.headers=e.response.headers;r.responseText=""}sap.ui.getCore().getEventBus().publish("_onODataModel","error",{type:"Error",title:(new Date).toString().substr(16,5)+" "+t.requestUri,message:JSON.parse(e.response.body).error.message.value});return r};this._sVariantContainer="";try{this._sVariantContainer=sap.ushell.Container.getService("UserInfo").getId()}catch(e){}this._oModel.setDeferredGroups([this._sGroupReadId,this._sGroupReadSearchId,this._sGroupUpdateId,this._sGroupUpdateNoteId,this._sGroupCreateId])},getModel:function(){return this._oModel},saveData:function(e){if(typeof e.groupId==="undefined"){e.groupId=this._sGroupUpdateId}this._oModel.submitChanges({groupId:e.groupId,success:function(t){if(typeof e.success==="function"){e.success(t)}},error:function(t){if(typeof e.error==="function"){e.error(t)}}})},readProjectSet:function(e){var t=[];if(typeof e.filters!=="undefined"){t=e.filters}this._oModel.read("/WBSProjectSet",{filters:t,success:function(t){if(typeof e.success==="function"){e.success(t)}},error:function(t){if(typeof e.error==="function"){e.error(t)}}})},readProjectDataById:function(e){var t=this._sGroupReadId;this._oModel.read("/WBSProjectSet('"+e.projectId+"')/ToHierarchy",{groupId:t});this._oModel.read("/WBSProjectSet('"+e.projectId+"')/ToNetworkActivity",{groupId:t});this._oModel.read("/WBSProjectSet('"+e.projectId+"')/ToProjectHeader",{groupId:t});this._oModel.read("/WBSProjectSet('"+e.projectId+"')/ToWBSElementData",{groupId:t});this._oModel.read("/WBSProjectSet('"+e.projectId+"')/ToPurReq",{groupId:t});this._oModel.read("/zInstallationManager_VH",{groupId:t});this._oModel.read("/zVendor_VH(p_posid='"+e.projectId.replace(/\./g,"")+"')/Set",{groupId:t});this._oModel.read("/zWorkCenter_VH(p_posid='"+e.projectId.replace(/\./g,"")+"')/Set",{groupId:t});this._oModel.read("/SearchUomSet",{groupId:t});this._oModel.read("/SearchCurcSet",{groupId:t});this._oModel.read("/ZINSTALLATIONMANAGER2_VH(poski='"+e.projectId+"')/Set",{groupId:t});this._oModel.submitChanges({groupId:t,success:function(t){if(typeof e.success==="function"){e.success(t)}},error:function(t){if(typeof e.error==="function"){e.error(t)}}})},readProjectHeaderDataById:function(e){var t=this._sGroupReadId;this._oModel.read("/WBSProjectSet('"+e.projectId+"')/ToProjectHeader",{groupId:t});this._oModel.submitChanges({groupId:t,success:function(t){if(typeof e.success==="function"){e.success(t)}},error:function(t){if(typeof e.error==="function"){e.error(t)}}})},readFilters:function(e){var t=this._sGroupReadSearchId;this._oModel.read("/zWBSElement_VH",{groupId:t});this._oModel.read("/zSoldTo_VH",{groupId:t});this._oModel.read("/zShipTo_VH",{groupId:t});this._oModel.read("/zSerialNumber_VH",{groupId:t});this._oModel.read("/zInstallationManager_VH",{groupId:t});this._oModel.read("/zSystemStatus_VH",{groupId:t});this._oModel.read("/zUserStatus_VH",{groupId:t});this._oModel.read("/zProjectManager_VH",{groupId:t});this._oModel.read("/SearchStatSet",{groupId:t});this._oModel.submitChanges({groupId:t,success:function(t){if(typeof e.success==="function"){e.success(t)}},error:function(t){if(typeof e.error==="function"){e.error(t)}}})},getCalendarDates:function(e){if(typeof e.urlParameters==="undefined"){e.urlParameters={}}e.urlParameters.Calendar="'IT'";this._oModel.read("/GetDayDates",{urlParameters:e.urlParameters,success:function(t){if(typeof e.success==="function"){e.success(t)}},error:function(t){if(typeof e.error==="function"){e.error(t)}}})},initPersonalizationContainer:function(e){var t=this;if(this._oPersonalizationService){e(true);return}try{this._oPersonalizationService=sap.ushell.Container.getService("Personalization").getPersonalizationContainer(this._sVariantContainer);this._oPersonalizationService.fail(function(){e(false)});this._oPersonalizationService.done(function(r){t._oPersonalizationContainer=r;e(true)}.bind(this))}catch(t){e(false)}},getVariants:function(){var e=this;var t=[];if(!this._oPersonalizationContainer||!this._oPersonalizationContainer.getVariantSet(this._sVariantContainer)){return t}this._oPersonalizationContainer.getVariantSet(this._sVariantContainer).getVariantKeys().forEach(function(r){var o=e._oPersonalizationContainer.getVariantSet(e._sVariantContainer)._oVariantMap.entries[r];t.push({key:o._oVariantKey,text:o._oVariantName,filters:JSON.parse(JSON.parse(o._oItemMap.entries.Filter))})});return t},saveVariant:function(e,t,r){var o={};var a={};var s="";var i=this._sVariantContainer;if(!this._oPersonalizationContainer.containsVariantSet(i)){this._oPersonalizationContainer.addVariantSet(i)}o=this._oPersonalizationContainer.getVariantSet(i);s=o.getVariantKeyByName(e);if(s){a=o.getVariant(s)}else{a=o.addVariant(e)}if(t){a.setItemValue("Filter",JSON.stringify(t))}this._oPersonalizationContainer.save().fail(function(){r(false)}).done(function(){r(true)}.bind(this))}})});