Ext.onReady(function(){
	var v_start=0, v_limit=2000;
	Ext.QuickTips.init();
	this.focus();
	var SpxxObj = [
		{ name:'spid', type:'string'},
		{ name:'spname', type:'string'},
		{ name:'xinghao', type:'string'},
		{ name:'dw', type:'string'},
		{ name:'minnum', type:'string'},
		{ name:'csname', type:'string'},
		{ name:'bz', type:'string'},
		{ name:'lbid', type:'int'},
		{ name:'lbname', type:'string'},
		{ name:'kcsl', type:'int'},
		{ name:'sl', type:'int'}
	];
	
	//商品数据
	var jhspStore = new Ext.data.JsonStore({
	    url: 'spxx_findPageSpxx.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj,
	    listeners:{beforeload:function(a){a.baseParams={start:v_start, limit:v_limit};}}
	});

	var allStore = new Ext.data.JsonStore({
	    url: 'spxx_findPageSpxx.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj,
		
	    listeners:{beforeload:function(a){a.baseParams={start:v_start, limit:v_limit};}}
	});

    var jhspGrid = new Ext.grid.GridPanel({
    	id:'djspGrid',
        store: jhspStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},
			columns:[new Ext.grid.RowNumberer(),
				{header: '耗材编号', width: 100, sortable:true, dataIndex: 'spid'},
	            {header: '耗材名称', width: 200, sortable:true, dataIndex: 'spname'},
	            {header: '耗材型号', width: 150, sortable:true, dataIndex: 'xinghao'},
	            {header: '数量', width: 100, sortable:true, align:'center', dataIndex: 'sl'},
	            {header: '单位', width: 100, sortable:true, dataIndex: 'dw'},
				{header: '位置', width: 100, sortable:true, dataIndex: 'bz'}]

        }),
        stripeRows: true,
        columnLines : true,
        margins:'20',
        style:'border:1px solid',
		region:'center',
        iconCls:'',
        
        tbar:[{
        	text:'添加',
        	iconCls:'btn-add',
        	handler: function(){
        		bsspWindow.show();
        	}
        },'-',{
        	text:'修改',
        	iconCls:'btn-edit',
        	handler: function(){
        		var record= jhspGrid.getSelectionModel().getSelected(); 
				if(!record){
                	Ext.Msg.alert('信息提示','请选择要修改的耗材');
				}else{
	        		addJhWindow.show();
	        		addJhWindow.buttons[0].setVisible(false);
	        		record.set("update","true");
					addJhForm.getForm().loadRecord(record);
				}
        	}
        },'-',{
        	text:'删除',
        	iconCls:'btn-remove',
        	handler: function(){
        		var record= jhspGrid.getSelectionModel().getSelected();
				if(!record){
                	Ext.Msg.alert('信息提示','请选择要删除的耗材');  
				}else{
					Ext.MessageBox.confirm('删除提示', '是否删除该记录？', function(c) {
						var djForm = Ext.getCmp("djForm").getForm();
						jhspStore.remove(record);
					});
				}
        	}
        }],
        
        listeners:{
        	rowdblclick:function(){
        		var record= jhspGrid.getSelectionModel().getSelected(); 
				if(record){
	        		addJhWindow.show();
	        		addJhWindow.buttons[0].setVisible(false);
	        		record.set("update","true");
					addJhForm.getForm().loadRecord(record);
				}
        	}
        }
    });
    
    var gysStore = new Ext.data.JsonStore({
		url: 'gys_findGysComb.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: ['value','text'],
	    listeners:{
	    	load:function(s){
	    		r = s.getAt(0);
	    		if(r){
	    			Ext.getCmp("gyscombo").onSelect(r, 0);
	    		}
	    	}
	    }
	});
	
	var jhdForm = new Ext.FormPanel({
		id:'djForm',
		region:'north',
		height: 120,
		border : false,
		layout : 'form',
		labelWidth:60,
		padding : 20,
		items:[{
			id:"jhdfieldset",
			xtype:"fieldset",
			title:"单号：",
			padding:'0 20 0 15',
			items:[{
				layout:"column",
				defaults:{
					xtype:"container",
					autoEl:"div",
					columnWidth:0.2,
					labelAlign:'right',
					layout:"form"
				},
				items:[{
					items:[{
							width:100,
							id:'gyscombo',
							xtype:'combo',
							hiddenName:'gysid',
							fieldLabel:'供应商',
							mode: 'local',
							triggerAction: 'all',
							valueField :'value',
							displayField: 'text',
							allowBlank : false,
							editable : false,
							store : gysStore,
							listeners:{
								select : function(a,b){
									jhdForm.getForm().findField("gysname").setValue(b.data.text);
								}
							}
					}]
				},
				{columnWidth:0.1},{
					items:[{
						id:'jhriqi',
						xtype:"datefield",
						width:150,
						name:'riqi',
						fieldLabel:"入库日期",
						format:'Y-m-d',
						allowBlank : false,
						value:new Date(),
						anchor:"90%",
						listeners:{
							select : function(a,b){
								getCode(b.format("Y-m-d"));
							}
						}
					}]
				}]
			},{
				layout:"column",
				defaults:{
					xtype:"container",
					autoEl:"div",
					labelAlign:'right',
					layout:"form"
				},
				items:[{
					columnWidth:0.7,
					items:[{
						xtype:"textfield",
						width:850,
						name:'bz',
						fieldLabel:"备&nbsp;&nbsp;&nbsp;注",
						anchor:"95%",
						maxLength :200
					}]
				},
				{
					columnWidth:.2,
					items:[{
						width:75,
						xtype:"button",
						text:'保存',
						handler:function(){
							var f = jhdForm.getForm();
							if (f.isValid()) {
								if(jhspStore.getCount()<=0){
									Ext.Msg.alert("信息提示","请添加耗材");
									return;
								}
								var jsonArray = [];
						        jhspStore.each(function(item) {
						            jsonArray.push(item.data);
						        });
								f.submit({
									url : 'jh_saveOrUpdateJhd.do',
									params :{djsps:Ext.encode(jsonArray) },
									success : function(form, action) {
										Ext.Msg.alert("信息提示","数据保存成功",function(){
											getCode();
											f.findField("bz").setValue("");
											f.clearInvalid();
											jhspStore.removeAll();
										});
									},
									failure : function(form, action) {
										if(action.result && action.result.errors){
											Ext.Msg.alert('信息提示',action.result.errors);
										}else{
											Ext.Msg.alert('信息提示','连接失败');
										}
									}
								});
							}
						}
					}]
				}]
			},{
				xtype:'hidden',
				name:'djid'
			},{
				xtype:'hidden',
				name:'gysname'
			}]
		}]
	});

		function initScannerModule(){
		var code = "";
        var lastTime,nextTime;
        var lastCode,nextCode;
		document.onkeypress = function(e) {
			var e = e || event;
            nextCode = e.keyCode || e.charCode || e.which;
			nextTime = new Date().getTime(); 
			if(lastCode != null && lastTime != null && nextTime - lastTime <= 30) 
				{ code += String.fromCharCode(lastCode); } 
			else if(lastCode != null && lastTime != null && nextTime - lastTime > 100)
				{ code = ""; } 
			lastCode = nextCode; 
			lastTime = nextTime;
		}

			function keydown(e){
			var currKey = 0, e = e || event;
			currKey = e.keyCode || e.charCode || e.which;
            if(currKey ==13){
						allStore.load();
			var count = Ext.getCmp("djspGrid").getStore().getCount();
			if (count != 0)
			{
			
				var n = Ext.getCmp("djspGrid").getStore().find('spid',code);
				if (n != -1)
				{
					var m = Ext.getCmp("djspGrid").getStore().getAt(n).get('sl');
					var record = Ext.getCmp("djspGrid").getStore().getAt(n);
					Ext.getCmp("djspGrid").getStore().remove(record);
					var index = allStore.find('spid',code);			
					var r = allStore.getAt(index);
					Ext.getCmp("djspGrid").getStore().add(r);
					var p = Ext.getCmp("djspGrid").getStore().find('spid',code);
					Ext.getCmp("djspGrid").getStore().getAt(p).set('sl',m + 1);
				}else
				{
					
					var index = allStore.find('spid',code);			
					var record = allStore.getAt(index);			
					Ext.getCmp("djspGrid").getStore().add(record);
					var n = Ext.getCmp("djspGrid").getStore().find('spid',code);			
					Ext.getCmp("djspGrid").getStore().getAt(n).set('sl',1);
				}
			}else
					{	
						
						var index = allStore.find('spid',code);			
						var record = allStore.getAt(index);					
						Ext.getCmp("djspGrid").getStore().add(record);
						var n = Ext.getCmp("djspGrid").getStore().find('spid',code);
						Ext.getCmp("djspGrid").getStore().getAt(n).set('sl',1);
						
					};
					code = "";
				}
			}
			document.onkeydown = keydown;
	};

	var getCode = function(){
		var ymd = Ext.getCmp("jhriqi").getValue().format("Y-m-d");
		Ext.Ajax.request({
   			url : "jh_getDjCode.do",
   			params : {tab:'Jhd',ymd:ymd},
   			success : function(o) {
   				if(o.responseText){
   					var code = "JH"+o.responseText;
   					Ext.getCmp("jhdfieldset").setTitle("单号："+code);
   					jhdForm.getForm().findField("djid").setValue(code);
   				}
   			}
   		});
	};
	
    new Ext.Viewport({
		layout:'fit',
		items:[{
			frame:true,
			title:'办公耗材入库登记',
			iconCls:'menu-11',
			layout:'border',
			items:[jhdForm,jhspGrid]
		}],
		listeners:{
			render:function(){
				getCode();
				gysStore.load();
				allStore.load();
				initScannerModule();
			}
		}
	});
	

	

});