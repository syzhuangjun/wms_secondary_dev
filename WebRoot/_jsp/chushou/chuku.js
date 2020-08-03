/*!
 * 销售入库
 */
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	var KhObj = [
		     		
	                { name:'assetname', type:'string'},
		     		{ name:'owner', type:'string'},
		     		{ name:'ownerbadge', type:'string'},
		     		{ name:'assettype', type:'string'},
		     		{ name:'mac', type:'string'},
		     		{ name:'tel', type:'string'}, 		     		
		     		{ name:'department', type:'string'},
		     		{ name:'address', type:'string'},
		     		{ name:'assetid', type:'string'}
		     	];
		     	
		     	//客户数据
		     	var store = new Ext.data.JsonStore({
		     	    url: 'kh_findPageKh.do',
		     	    root: 'root',
		     	    totalProperty: 'total',
		     	    autoLoad: {params:{start:0, limit:5000}},
		     	    fields: KhObj
		     	    
		     	});		     	
	
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
	
	//商品数据
	var ckspStore = new Ext.data.JsonStore({
	    url: 'spxx_findPageSpxx.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj,
	    listeners:{beforeload:function(a){a.baseParams={start:v_start, limit:v_limit};}}
	});
	
	//商品列表
    var ckspGrid = new Ext.grid.GridPanel({
    	id:'djspGrid',
        store: ckspStore,
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
        		var record= ckspGrid.getSelectionModel().getSelected(); 
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
        		var record= ckspGrid.getSelectionModel().getSelected();
				if(!record){
                	Ext.Msg.alert('信息提示','请选择要删除的商品');  
				}else{
					Ext.MessageBox.confirm('删除提示', '是否删除该记录？', function(c) {
					    var djForm = Ext.getCmp("djForm").getForm();
						ckspStore.remove(record);
					});
				}
        	}
        }],
        
        listeners:{
        	rowdblclick:function(){
        		var record= ckspGrid.getSelectionModel().getSelected(); 
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

		
	//销售表单
	var ckdForm = new Ext.FormPanel({
		id:'djForm',
		region:'north',
		height: 180,
		border : false,
		layout : 'form',
		labelWidth:60,
		padding : 20,
		items:[{
			id:"ckdfieldset",
			xtype:"fieldset",
			title:"单号：",
			padding:'0 20 0 15',
			items:[{
				layout:"column",
				defaults:{
					xtype:"container",
					autoEl:"div",
					//columnWidth:0.3,
					labelAlign:'right',
					layout:"form"
				},
				items:[
				       
						
						{	columnWidth:.15,
							items:[{
								width:20,
								xtype:"textfield",
								name:'ownerbadge',
								fieldLabel:"工号",
								allowBlank : false,
								anchor:"95%",
								maxLength :50,
						        enableKeyEvents:true,
						        listeners:{                 
						              change:function(){
										ckdForm.getForm().findField("assetid").setValue('');
										var badge = ckdForm.getForm().findField("ownerbadge").getValue();
										var c = store.query('ownerbadge',badge);
										var arr = [];
										c.each(function(item,index,count){ 
											
											arr.push(item.get('assetid'));
										})
										ckdForm.getForm().findField("assetid").getStore().loadData(arr);
						              }               
						          }

							}]
						},
		
				{
					columnWidth:.25,
					items:[{
						width:40,
						xtype:"combo",
						store:[],
						name:"assetid",
						emptyText: "--请选择--",
						fieldLabel:"资产编码",
						displayField:"text",
						valueField: "value",
						anchor:"95%",
						maxLength :50,
					    mode:"local",  
					    triggerAction:"all",
						listeners:{
							select : function(){
				
						var assetid = ckdForm.getForm().findField("assetid").getValue();
						var index = store.find('assetid',assetid);
						//alert(index);
						var tel = store.getAt(index).get('tel');
						var kh = store.getAt(index).get('owner');
						var address = store.getAt(index).get('address');
						var bm = store.getAt(index).get('department');
						var mc = store.getAt(index).get('assetname');
						var lx = store.getAt(index).get('assettype');
						var mac = store.getAt(index).get('mac');
						
						ckdForm.getForm().findField("tel").setValue(tel);
						ckdForm.getForm().findField("owner").setValue(kh);
						ckdForm.getForm().findField("address").setValue(address);
						ckdForm.getForm().findField("department").setValue(bm);
						ckdForm.getForm().findField("assetname").setValue(mc);
						ckdForm.getForm().findField("assettype").setValue(lx);
						ckdForm.getForm().findField("mac").setValue(mac);
						
							}
						}				    	
					}]
				},
				{
					columnWidth:.15,
					items:[{
						width:40,
						xtype:"textfield",
						name:'assetname',
						fieldLabel:"设备名称",
						allowBlank : false,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.2,
					items:[{
						width:40,
						xtype:"textfield",
						name:'assettype',
						fieldLabel:"设备型号",
						allowBlank : false,
						anchor:"95%",
						maxLength :50
					}]
				},{
					columnWidth:.2,
					items:[{
						width:40,
						xtype:"textfield",
						name:'mac',
						fieldLabel:"设备信息",
						allowBlank : false,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.15,
					items:[{
						width:40,
						xtype:"textfield",
						name:'owner',
						fieldLabel:"保管人",
						allowBlank : false,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.3,
					items:[{
						width:100,
						xtype:"textfield",
						name:'department',
						fieldLabel:"车间\科室",
						allowBlank : false,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.3,
					items:[{
						width:200,
						xtype:"textfield",
						name:'address',
						fieldLabel:"办公地点",
						//allowBlank : true,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.2,
					items:[{
						width:120,
						xtype:"textfield",
						name:'tel',
						fieldLabel:"电话",
						//allowBlank : true,
						anchor:"95%",
						maxLength :50
					}]
				},
				
			{			
					columnWidth:.18,  
					items:[{
						id:'jhriqi',
						xtype:"datefield",
						width:123,
						name:'riqi',
						fieldLabel:"出库日期",
						format:'Y-m-d',
						allowBlank : false,
						value:new Date(),
						anchor:"95%",
						listeners:{
							select : function(a,b){
								getCode(b.format("Y-m-d"));
							}
						}
					}]
				},{
					columnWidth:.3,
					items:[{
						
						xtype:"textfield",
						width:150,
						name:'des',
						fieldLabel:"故障简述",
						anchor:"95%",
						maxLength :150
					}]
				}				
				,{
					columnWidth:.2,
					items:[{						
						xtype:"textfield",
						width:150,
						name:'bz',
						fieldLabel:"领用说明",
						anchor:"95%",
						maxLength :150
					}]
				}				
				,{
					xtype:"radiogroup",	
					id:'type',
					name:'type',
					hideLabels:false,
					columnWidth:.1,
					defaults:{
					flex:1
					},
					items:[{
						boxLabel:"更换",
						name:"type",
						inputValue:"更换",
						checked:"1"
					},
					{	
						name:"type",
						boxLabel:"领用",
						inputValue:"领用"
					}]
				},

					{	
						//width:100,
						columnWidth:.1,
						items:[{
						width:75,
						xtype:"button",
						store:ckspStore,
						text:'导出',
						handler:function(){
						var ExcelSheet ; 
						//alert(Ext.getCmp('sm').getValue().inputValue);
						try {  
						   ExcelSheet = new ActiveXObject("Excel.Application");  
						     
						   wb = ExcelSheet.Workbooks.open("http://localhost:8080/MyStock/data/mb.xls");
						   
						   
						   ExcelSheet.ActiveSheet.Cells(1,1).Value = "编号：" + ckdForm.getForm().findField("djid").getValue();
						   ExcelSheet.ActiveSheet.Cells(3,3).Value = "姓名：" + ckdForm.getForm().findField("owner").getValue();
						   ExcelSheet.ActiveSheet.Cells(3,5).Value = "工号：" + ckdForm.getForm().findField("ownerbadge").getValue();
						   ExcelSheet.ActiveSheet.Cells(3,7).Value = "联系方式：" + ckdForm.getForm().findField("tel").getValue();
						   ExcelSheet.ActiveSheet.Cells(4,1).Value = "使用车间\\科室\\工班：" + ckdForm.getForm().findField("department").getValue();						   
						   ExcelSheet.ActiveSheet.Cells(4,5).Value = "办公地点：" + ckdForm.getForm().findField("address").getValue();
						    
						   ExcelSheet.ActiveSheet.Cells(3,1).Value = "申请日期：" + ckdForm.getForm().findField("riqi").getValue().toLocaleDateString();
						   var curTime = new Date().toLocaleDateString();
						   ckspGrid.getColumnModel();
						   ckspGrid.getStore();
						   var cm = ckspGrid.getColumnModel();
						   var colCount = cm.getColumnCount(); 
						   var recordCount = ckspStore.getCount();
						   ckspGrid.getStore(); 
						   var view = ckspGrid.getView();
						    
						   //alert(Ext.getCmp('sm').getChecked()[0]);
						   if(Ext.getCmp('type').getValue().inputValue == "领用")							                
						   {
							   for (i = 1; i <= recordCount; i++) { 
						        { 
						        	ExcelSheet.ActiveSheet.Cells(i + 6, 2).Value = view.getCell(i-1,2).innerText;
						        	ExcelSheet.ActiveSheet.Cells(i + 6, 3).Value = view.getCell(i-1,3).innerText;
						        	ExcelSheet.ActiveSheet.Cells(i + 6, 5).Value = view.getCell(i-1,4).innerText;
						        	ExcelSheet.ActiveSheet.Cells(i + 6, 6).Value = ckdForm.getForm().findField("bz").getValue()
						        }  
							   }
						   }
						   if(Ext.getCmp('type').getValue().inputValue == "更换")
							   {
							   		ExcelSheet.ActiveSheet.Cells(18,1).Value = "设备名称：" + ckdForm.getForm().findField("assetname").getValue();
							   		ExcelSheet.ActiveSheet.Cells(18,3).Value = "设备型号：" + ckdForm.getForm().findField("assettype").getValue();
							   		ExcelSheet.ActiveSheet.Cells(18,7).Value = ckdForm.getForm().findField("mac").getValue();
							   		ExcelSheet.ActiveSheet.Cells(19,1).Value = "资产编码：" + ckdForm.getForm().findField("assetid").getValue();
							   		ExcelSheet.ActiveSheet.Cells(19,3).Value = "保管人：" + ckdForm.getForm().findField("owner").getValue();						   
							   		ExcelSheet.ActiveSheet.Cells(19,5).Value = "故障简述：" + ckdForm.getForm().findField("des").getValue();
								    for (i = 1; i <= recordCount; i++) {
								         
								        	ExcelSheet.ActiveSheet.Cells(i + 20, 2).Value = view.getCell(i-1,2).innerText;
								        	ExcelSheet.ActiveSheet.Cells(i + 20, 3).Value = view.getCell(i-1,3).innerText;
								        	ExcelSheet.ActiveSheet.Cells(i + 20, 5).Value = view.getCell(i-1,4).innerText;
								        	ExcelSheet.ActiveSheet.Cells(i + 20, 6).Value = ckdForm.getForm().findField("bz").getValue()							        
								         
								    }
							   } 
						   //ExcelSheet.Columns.AutoFit; 
						   ExcelSheet.Visible = true; 	   
						} catch(e) {  
						if (ExcelSheet != undefined){  
						   alert('Error happened : ' + e);  
						   ExcelSheet.Quit();  
						}  
						   return '';  
						}
						
							}
						}]
					},
					{
						columnWidth:.1,
						items:[{
							width:75,
							xtype:"button",
							text:'保存',
							handler:function(){
								var f = ckdForm.getForm();
								if (f.isValid()) {
									if(ckspStore.getCount()<=0){
										Ext.Msg.alert("信息提示","请添加商品");
										return;
									}
									var jsonArray = [];
							        ckspStore.each(function(item) {
							            jsonArray.push(item.data);
							            
							        });
									f.submit({
										url : 'xs_saveOrUpdateCkd.do',
										params :{djsps:Ext.encode(jsonArray) },
										success : function(form, action) {  
											Ext.Msg.alert("信息提示","数据保存成功",function(){
										      
												getCode();
												ckdForm.getForm().findField("ownerbadge").setValue("");
												ckdForm.getForm().findField("assetid").setValue("");
												ckdForm.getForm().findField("tel").setValue("");
												ckdForm.getForm().findField("owner").setValue("");
												ckdForm.getForm().findField("address").setValue("");
												ckdForm.getForm().findField("department").setValue("");
												ckdForm.getForm().findField("assetname").setValue("");
												ckdForm.getForm().findField("assettype").setValue("");
												ckdForm.getForm().findField("mac").setValue("");												
												f.clearInvalid();
												ckspStore.removeAll();
												
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
						}
						]},
			{
				xtype:'hidden',
				name:'djid'
			}
					]
					
					}]
				}]
			});
	//设置单据编号
	var getCode = function(){
		var ymd = Ext.getCmp("jhriqi").getValue().format("Y");
		Ext.Ajax.request({
   			url : "xs_getDjCode.do",
   			params : {tab:'Ckd',ymd:ymd},
   			success : function(o) {
   				if(o.responseText){
   					var code = "FLY"+o.responseText;
   					Ext.getCmp("ckdfieldset").setTitle("单号："+code);
   					ckdForm.getForm().findField("djid").setValue(code);
   				}
   			}
   		});
	};
	
	//布局
    new Ext.Viewport({
		layout:'fit',
		items:[{
			frame:true,
			title:'商品出库',
			iconCls:'menu-21',
			layout:'border',
			items:[ckdForm,ckspGrid]
		}],
		listeners:{
			render:function(){
				getCode();
				store.load();
			}
		}
	});
	

	

});