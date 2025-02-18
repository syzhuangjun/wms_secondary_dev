/*!
 * 退货出库
 */
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	var SpxxObj = [
		{ name:'spid', type:'string'},
		{ name:'spname', type:'string'},
		{ name:'xinghao', type:'string'},
		{ name:'dw', type:'string'},
		{ name:'minnum', type:'string'},
		{ name:'csname', type:'string'},
		{ name:'bz', type:'string'},
		{ name:'lbid', type:'int'},
		{ name:'lbname', type:'string'}
	];
	
	//退货商品数据
	var tkspStore = new Ext.data.JsonStore({
	    url: 'spxx_findPageSpxx.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj,
	    listeners:{beforeload:function(a){a.baseParams={start:v_start, limit:v_limit};}}
	});
	
	//退货商品列表
    var tkspGrid = new Ext.grid.GridPanel({
    	id:'djspGrid',
        store: tkspStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},//禁止表头菜单
			columns:[new Ext.grid.RowNumberer(),
				{header: '商品编号', width: 100, sortable:true, dataIndex: 'spid'},
	            {header: '商品名称', width: 200, sortable:true, dataIndex: 'spname'},
	            {header: '商品型号', width: 150, sortable:true, dataIndex: 'xinghao'},  
	            {header: '数量', width: 100, sortable:true, align:'center', dataIndex: 'sl'},
	            {header: '单位', width: 100, sortable:true, dataIndex: 'dw'}
	            ]
        }),
        stripeRows: true, 	//行分隔符
        columnLines : true, //列分隔符
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
        		var record= tkspGrid.getSelectionModel().getSelected(); 
				if(!record){
                	Ext.Msg.alert('信息提示','请选择要修改的商品');
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
        		var record= tkspGrid.getSelectionModel().getSelected();
				if(!record){
                	Ext.Msg.alert('信息提示','请选择要删除的商品');  
				}else{
					Ext.MessageBox.confirm('删除提示', '是否删除该记录？', function(c) {
						var djForm = Ext.getCmp("djForm").getForm();
						tkspStore.remove(record);
					});
				}
        	}
        }],
        
        listeners:{
        	rowdblclick:function(){
        		var record= tkspGrid.getSelectionModel().getSelected(); 
				if(record){
	        		addJhWindow.show();
	        		addJhWindow.buttons[0].setVisible(false);
	        		record.set("update","true");
					addJhForm.getForm().loadRecord(record);
				}
        	}
        }
    });
    
	//客户下拉数据
    var khStore = new Ext.data.JsonStore({
		url: 'kh_findKhComb.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: ['value','text'],
	    listeners:{
	    	load:function(s){
	    		r = s.getAt(0);
	    		if(r){
	    			Ext.getCmp("khcombo").onSelect(r, 0);
	    		}
	    	}
	    }
	});
		
	//退货表单
	var tkdForm = new Ext.FormPanel({
		id:'djForm',
		region:'north',
		height: 110,
		border : false,
		layout : 'form',
		labelWidth:60,
		padding : 20,
		items:[{
			id:"tkdfieldset",
			xtype:"fieldset",
			title:"单号：",
			padding:'0 20 0 15',
			items:[{
				layout:"column",
				defaults:{
					xtype:"container",
					autoEl:"div",
					columnWidth:0.3,
					labelAlign:'right',
					layout:"form"
				},
				items:[{
					items:[{
							width:100,
							id:'khcombo',
							xtype:'combo',
							hiddenName:'khid',
							fieldLabel:'客&nbsp;&nbsp;&nbsp;户',
							mode: 'local',
							triggerAction: 'all',
							valueField :'value',
							displayField: 'text',
							allowBlank : false,
							editable : false,
							store : khStore,
							anchor:"90%",
							listeners:{
								select : function(a,b){
									tkdForm.getForm().findField("khname").setValue(b.data.text);
								}
							}
					}]
				},
				{
					items:[{
						xtype:"textfield",
						name:'owner',
						fieldLabel:"保管人",
						allowBlank : true,
						anchor:"90%",
						maxLength :200
					}]
				}
				,{columnWidth:0.1},{
					items:[{
						id:'tkriqi',
						xtype:"datefield",
						name:'riqi',
						fieldLabel:"收货日期",
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
					columnWidth:.6,
					items:[{
						xtype:"textfield",
						name:'bz',
						fieldLabel:"备&nbsp;&nbsp;&nbsp;注",
						anchor:"95%",
						maxLength :200
					}]
				}
				,{
					columnWidth:.4,
					items:[{
						width:75,
						xtype:"button",
						text:'保存',
						handler:function(){
							var f = tkdForm.getForm();
							if (f.isValid()) {
								if(tkspStore.getCount()<=0){
									Ext.Msg.alert("信息提示","请添加商品");
									return;
								}
								var jsonArray = [];
						        tkspStore.each(function(item) {
						            jsonArray.push(item.data);
						        });
								f.submit({
									url : 'xs_saveOrUpdateTkd.do',
									params :{djsps:Ext.encode(jsonArray) },
									success : function(form, action) {
										Ext.Msg.alert("信息提示","数据保存成功",function(){
											getCode();
											f.findField("bz").setValue("");
											f.findField("yfje").setValue("");
											f.findField("sfje").setValue("");
											f.clearInvalid();
											tkspStore.removeAll();
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
				name:'khname'
			}]
		}]
	});
	//设置单据编号
	var getCode = function(){
		var ymd = Ext.getCmp("tkriqi").getValue().format("Y-m-d");
		Ext.Ajax.request({
   			url : "xs_getDjCode.do",
   			params : {tab:'Tkd',ymd:ymd},
   			success : function(o) {
   				if(o.responseText){
   					var code = "XT"+o.responseText;
   					Ext.getCmp("tkdfieldset").setTitle("单号："+code);
   					tkdForm.getForm().findField("djid").setValue(code);
   				}
   			}
   		});
	};
	
	//布局
    new Ext.Viewport({
		layout:'fit',
		items:[{
			frame:true,
			iconCls:'menu-22',
			title:'退货出库',
			layout:'border',
			items:[tkdForm,tkspGrid]
		}],
		listeners:{
			render:function(){
				getCode();
				khStore.load();
			}
		}
	});
	

	

});