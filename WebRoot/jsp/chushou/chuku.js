Ext.onReady(function(){
	var v_start=0, v_limit=2000;
	Ext.QuickTips.init();
	this.focus();
	var KhObj = [
		     		
	                { name:'assetname', type:'string'},
		     		{ name:'owner', type:'string'},
		     		{ name:'ownerbadge', type:'string'},
		     		{ name:'assettype', type:'string'},
		     		{ name:'mac', type:'string'},
		     		{ name:'tel', type:'string'}, 		     		
		     		{ name:'department', type:'string'},
		     		{ name:'address', type:'string'},
		     		{ name:'assetid', type:'string'},
		     		{ name:'sbid', type:'int'}
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

		var allStore = new Ext.data.JsonStore({
	    url: 'spxx_findPageSpxx.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj,
		
	    listeners:{beforeload:function(a){a.baseParams={start:v_start, limit:v_limit};}}
	});
	
    var ckspGrid = new Ext.grid.GridPanel({
    	id:'djspGrid',
        store: ckspStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},
			columns:[new Ext.grid.RowNumberer(),
				{header: '耗材编号', width: 100, sortable:true, dataIndex: 'spid'},
	            {header: '耗材名称', width: 200, sortable:true, dataIndex: 'spname'},
	            {header: '耗材型号', width: 150, sortable:true, dataIndex: 'xinghao'},    	           
	            {header: '数量', width: 100, sortable:true, align:'center', dataIndex: 'sl'},	            
	            {header: '单位', width: 100, sortable:true, dataIndex: 'dw'},	            
	            {header: '位置', width: 100, sortable:true, dataIndex: 'bz'}
	            ]
        }),
        stripeRows: true, 	
        columnLines : true, 
        margins:'2',
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

	var ckdForm = new Ext.FormPanel({
		id:'djForm',
		region:'north',
		height: 120,
		border : false,
		layout : 'form',
		labelWidth:60,
		padding : 2,
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
								allowBlank : true,
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
						var sbid = store.getAt(index).get('sbid');
						ckdForm.getForm().findField("tel").setValue(tel);
						ckdForm.getForm().findField("owner").setValue(kh);
						ckdForm.getForm().findField("address").setValue(address);
						ckdForm.getForm().findField("department").setValue(bm);
						ckdForm.getForm().findField("assetname").setValue(mc);
						ckdForm.getForm().findField("assettype").setValue(lx);
						ckdForm.getForm().findField("mac").setValue(mac);
						ckdForm.getForm().findField("sbid").setValue(sbid);
						
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
						allowBlank : true,
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
						allowBlank : true,
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
						allowBlank : true,
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
						allowBlank : true,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.3,
					items:[{
						width:300,
						xtype:"textfield",
						name:'department',
						fieldLabel:"车间\科室",
						allowBlank : true,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.3,
					items:[{
						width:300,
						xtype:"textfield",
						name:'address',
						fieldLabel:"办公地点",
						allowBlank : true,
						anchor:"95%",
						maxLength :50
					}]
				},
				{
					columnWidth:.15,
					items:[{
						width:120,
						xtype:"textfield",
						name:'tel',
						fieldLabel:"电话",
						allowBlank : true,
						anchor:"95%",
						maxLength :50
					}]
				},
				{	
					//width:100,
					columnWidth:.1,
					items:[{
					width:75,
					xtype:"button",
					store:store,
					text:'更新',
					handler : function()  {						
						var assetid = ckdForm.getForm().findField("assetid").getValue();
						var index = store.find('assetid',assetid);						
						//Ext.Msg.alert(record);
						if (index != -1)
						{
							var record = store.getAt(index).get('sbid');
							ckdForm.getForm().loadRecord(record);
							if (ckdForm.getForm().isValid()) {
							ckdForm.getForm().submit({							
								url : 'kh_saveOrUpdateKh.do',
								params:{ dto : store.getAt(index)},								
								success : function(form, action) {
									Ext.Msg.alert('信息提示',action.result.message);
									store.reload();
								},
								failure : function(form, action) {
									if(action.result.errors){
										Ext.Msg.alert('信息提示',action.result.errors);
									}else{
										Ext.Msg.alert('信息提示','连接失败');
									}
								},
								waitTitle : '提交',
								waitMsg : '正在保存数据，稍后...'
							});
						  }
						}else
						{
							if (ckdForm.getForm().isValid()) {
							ckdForm.getForm().submit({							
								url : 'kh_saveOrUpdateKh.do',							
								success : function(form, action) {
									Ext.Msg.alert('信息提示',action.result.message);
									store.reload();
								},
								failure : function(form, action) {
									if(action.result.errors){
										Ext.Msg.alert('信息提示',action.result.errors);
									}else{
										Ext.Msg.alert('信息提示','连接失败');
									}
								},
								waitTitle : '提交',
								waitMsg : '正在保存数据，稍后...'
							});
						  }
						}

					}
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
						width:300,
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


					  var borderAll = {
					  top: {style: "thin", color: {auto: 1}},
					  right: {style: "thin", color: {auto: 1}},
					  bottom: {style: "thin", color: {auto: 1}},
					  left: {style: "thin", color: {auto: 1}}
					  };
					  var fileName = ckdForm.getForm().findField("djid").getValue();					
					  var workbook1 = {
					  SheetNames: ['领用'],
					  Sheets: {
						'领用': {
						  '!ref':'A1:H17',
						  '!cols': [{wpx: 40}, {wpx: 130}, {wpx: 75}, {wpx: 60}, {wpx: 40}, {wpx: 60}, {wpx: 60}, {wpx: 60}],
						  '!rows': [{hpx: 40},{hpx: 56.25},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 100},{hpx: 20}],
						  '!merges':[],
						  A1:{},B1:{},C1:{},D1:{},E1:{},F1:{},G1:{},H1:{},
						  A2:{},B2:{},C2:{},D2:{},E2:{},F2:{},G2:{},H2:{},
						  A3:{},B3:{},C3:{},D3:{},E3:{},F3:{},G3:{},H3:{},
						  A4:{},B4:{},C4:{},D4:{},E4:{},F4:{},G4:{},H4:{},
						  A5:{},B5:{},C5:{},D5:{},E5:{},F5:{},G5:{},H5:{},
						  A6:{},B6:{},C6:{},D6:{},E6:{},F6:{},G6:{},H6:{},
						  A7:{},B7:{},C7:{},D7:{},E7:{},F7:{},G7:{},H7:{},
						  A8:{},B8:{},C8:{},D8:{},E8:{},F8:{},G8:{},H8:{},
						  A9:{},B9:{},C9:{},D9:{},E9:{},F9:{},G9:{},H9:{},
						  A10:{},B10:{},C10:{},D10:{},E10:{},F10:{},G10:{},H10:{},
						  A11:{},B11:{},C11:{},D11:{},E11:{},F11:{},G11:{},H11:{},
						  A12:{},B12:{},C12:{},D12:{},E12:{},F12:{},G12:{},H12:{},
						  A13:{},B13:{},C13:{},D13:{},E13:{},F13:{},G13:{},H13:{},
						  A14:{},B14:{},C14:{},D14:{},E14:{},F14:{},G14:{},H14:{},
						  A15:{},B15:{},C15:{},D15:{},E15:{},F15:{},G15:{},H15:{},
						  A16:{},B16:{},C16:{},D16:{},E16:{},F16:{},G16:{},H16:{},
						  A17:{},B17:{},C17:{},D17:{},E17:{},F17:{},G17:{},H17:{}					
						}
					  }
					};
					  var workbook2 = {
					  SheetNames: ['更换'],
					  Sheets: {
						'更换': {
						  '!ref':'A1:H22',
						  '!cols': [{wpx: 40}, {wpx: 130}, {wpx: 75}, {wpx: 60}, {wpx: 40}, {wpx: 60}, {wpx: 60}, {wpx: 60}],
						  '!rows': [{hpx: 40},{hpx: 40},{hpx: 10},{hpx: 40},{hpx: 40},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 30},{hpx: 100},{hpx: 20}],
						  '!merges':[],
						  A1:{},B1:{},C1:{},D1:{},E1:{},F1:{},G1:{},H1:{},
						  A2:{},B2:{},C2:{},D2:{},E2:{},F2:{},G2:{},H2:{},
						  A3:{},B3:{},C3:{},D3:{},E3:{},F3:{},G3:{},H3:{},
						  A4:{},B4:{},C4:{},D4:{},E4:{},F4:{},G4:{},H4:{},
						  A5:{},B5:{},C5:{},D5:{},E5:{},F5:{},G5:{},H5:{},
						  A6:{},B6:{},C6:{},D6:{},E6:{},F6:{},G6:{},H6:{},
						  A7:{},B7:{},C7:{},D7:{},E7:{},F7:{},G7:{},H7:{},
						  A8:{},B8:{},C8:{},D8:{},E8:{},F8:{},G8:{},H8:{},
						  A9:{},B9:{},C9:{},D9:{},E9:{},F9:{},G9:{},H9:{},
						  A10:{},B10:{},C10:{},D10:{},E10:{},F10:{},G10:{},H10:{},
						  A11:{},B11:{},C11:{},D11:{},E11:{},F11:{},G11:{},H11:{},
						  A12:{},B12:{},C12:{},D12:{},E12:{},F12:{},G12:{},H12:{},
						  A13:{},B13:{},C13:{},D13:{},E13:{},F13:{},G13:{},H13:{},
						  A14:{},B14:{},C14:{},D14:{},E14:{},F14:{},G14:{},H14:{},
						  A15:{},B15:{},C15:{},D15:{},E15:{},F15:{},G15:{},H15:{},
						  A16:{},B16:{},C16:{},D16:{},E16:{},F16:{},G16:{},H16:{},
						  A17:{},B17:{},C17:{},D17:{},E17:{},F17:{},G17:{},H17:{},
						  A18:{},B18:{},C18:{},D18:{},E18:{},F18:{},G18:{},H18:{},
						  A19:{},B19:{},C19:{},D19:{},E19:{},F19:{},G19:{},H19:{},
						  A20:{},B20:{},C20:{},D20:{},E20:{},F20:{},G20:{},H20:{},
						  A21:{},B21:{},C21:{},D21:{},E21:{},F21:{},G21:{},H21:{},
						  A22:{},B22:{},C22:{},D22:{},E22:{},F22:{},G22:{},H22:{}
						}
					  }
					};
					var workbookOut;

					ckspGrid.getColumnModel();
					ckspGrid.getStore();
					var cm = ckspGrid.getColumnModel();
					var colCount = cm.getColumnCount(); 
					var recordCount = ckspStore.getCount();
					ckspGrid.getStore(); 
					var view = ckspGrid.getView();
					if(Ext.getCmp('type').getValue().inputValue == "领用")
					{
						var worksheet = workbook1.Sheets['领用'];

						worksheet['A1'].v = '编号：'+ fileName;
						worksheet['A1'].s = {
												
												font: {
														name: '黑体',
														sz: 10
													   },
												alignment: {
																horizontal: 'left',
																vertical: 'center'
															}

											};
						worksheet['A2'].v = '';
						worksheet['A2'].s = {
												
												font: {
														name: '黑体',
														sz: 10,
														bold:true
													   },
												alignment: {
															   horizontal: 'center',
															   vertical: 'center'
															}

											};	
					
						worksheet['!merges'].push(
						  {
							s: {c: 0, r: 0},
							e: {c: 7, r: 0}
						  },
						   {
							s: {c: 0, r: 1},
							e: {c: 7, r: 1}
						  },
							{
							s: {c: 0, r: 2},
							e: {c: 1, r: 2}
						  },
							{
							s: {c: 2, r: 2},
							e: {c: 3, r: 2}
						  },
							{
							s: {c: 4, r: 2},
							e: {c: 5, r: 2}
						  },
							{
							s: {c: 6, r: 2},
							e: {c: 7, r: 2}
						  },
							{
							  s: {c: 0, r: 3},
							  e: {c: 3, r: 3}
							},
							{
							s: {c: 4, r: 3},
							e: {c: 7, r: 3}
							}
						);
						
						for (i = 3; i <= 4; i++ )
						{
							for (j = 1; j <= 8; j++ )
							{
								var x = String.fromCharCode(64 + j) + i;
								//alert(x);
								worksheet[x].v = '';
								worksheet[x].s = {
													border: borderAll,
													font: {
																name: '宋体',
																sz: 10
													   },
													alignment: {
																	horizontal: 'left',
																	vertical: 'center',
																	wrapText:'true'
																}
													}
							}
						};
						for (i = 5; i <= 16; i++ )
						{
							for (j = 1; j <= 8; j++ )
							{
								var x = String.fromCharCode(64 + j) + i;
								//alert(x);
								worksheet[x].v = '';
								worksheet[x].s = {
													border: borderAll,
													font: {
																name: '宋体',
																sz: 10
													   },
													alignment: {
																	wrapText:'true',
																	horizontal: 'center',
																	vertical: 'center'
																}
													}
							}
						};
						for (i = 4; i <= 14; i++) {
						worksheet['!merges'].push(					
						  {
							s: {c: 2, r: i},
							e: {c: 3, r: i}
						  },
							{
							s: {c: 5, r: i},
							e: {c: 6, r: i}
						  })
						};
						for (i = 5; i <= 15; i++) {
						worksheet['A' + ( i + 1 )].v = i - 4;
						worksheet['A' + ( i + 1 )].s = {
											border: borderAll,
											font: {
													name: '宋体',
													sz: 10
												   },
											alignment: {
															horizontal: 'center',
															vertical: 'center'
														}
							}
						};
						 worksheet['!merges'].push(
						
						  {
							s: {c: 1, r: 15},
							e: {c: 3, r: 15}
						  },{
							s: {c: 4, r: 15},
							e: {c: 7, r: 15}
						  },					
						  {
							s: {c: 0, r: 16},
							e: {c: 7, r: 16}
						  }  
						  );

						worksheet['A2'].v = "";
						worksheet['A1'].v = "编号：" + ckdForm.getForm().findField("djid").getValue();
						worksheet['A3'].v = "申请日期：" + ckdForm.getForm().findField("riqi").getValue().toLocaleDateString();
						worksheet['C3'].v = "姓名：" + ckdForm.getForm().findField("owner").getValue();
						worksheet['E3'].v = "工号：" + ckdForm.getForm().findField("ownerbadge").getValue();
						worksheet['G3'].v = "联系方式：" + ckdForm.getForm().findField("tel").getValue();
						worksheet['A4'].v = "领用部门：" + ckdForm.getForm().findField("department").getValue();  
						worksheet['E4'].v = "办公地点：" + ckdForm.getForm().findField("address").getValue();
						worksheet['A5'].v = '序号';
						worksheet['A5'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
											
															}

											};
						worksheet['B5'].v = '设备名称';
						worksheet['B5'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['C5'].v = '型号';
						worksheet['C5'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['E5'].v = '数量';
						worksheet['E5'].s = {
												
												font: {
														border: borderAll,
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['F5'].v = '领用说明';
						worksheet['F5'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['H5'].v = '备注';
						worksheet['H5'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						for (i = 1; i <= recordCount; i++) 
						{
							{
								
								worksheet['B' + ( i + 5 )].v = view.getCell(i - 1,2).innerText;
								worksheet['C' + ( i + 5 )].v = view.getCell(i - 1,3).innerText;
								worksheet['E' + ( i + 5 )].v = view.getCell(i - 1,4).innerText;
								worksheet['F' + ( i + 5 )].v = ckdForm.getForm().findField("bz").getValue()
							}
						};
						worksheet['A16'].v = "领用人签字处";
						worksheet['A16'].s = {
						border: borderAll,
						font: {
								name: '宋体',
								sz: 9
							   },
						alignment: {
									   wrapText:'true',
									   horizontal: 'center',
									   vertical: 'center'
									}

						};
						worksheet['E16'].v = "办公服务站人员：" +log_name;
						worksheet['A17'].v = "*此表手写无效";
						worksheet['A17'].s = {
						
						font: {
								name: '宋体',
								sz: 10
							   },
						alignment: {
									   horizontal: 'left',
									   vertical: 'center'
									}

						};
					};
					if(Ext.getCmp('type').getValue().inputValue == "更换")
					{
						var worksheet = workbook2.Sheets['更换'];

						worksheet['A1'].v = '编号：'+ fileName;
						worksheet['A1'].s = {
												
												font: {
														name: '黑体',
														sz: 10
													   },
												alignment: {
																horizontal: 'left',
																vertical: 'center'
															}

											};
						worksheet['A2'].v = '';
						worksheet['A2'].s = {
												
												font: {
														name: '黑体',
														sz: 10,
														bold:true
													   },
												alignment: {
															   horizontal: 'center',
															   vertical: 'center'
															}

											};
						worksheet['A3'].v = '';
						worksheet['A3'].s = {
												
												font: {
														name: '黑体',
														sz: 10,
														bold:true
													   },
												alignment: {
															   horizontal: 'center',
															   vertical: 'center'
															}

											};
						worksheet['A4'].v = '';
						worksheet['A4'].s = {
												
												font: {
														name: '黑体',
														sz: 10,
														bold:true
													   },
												alignment: {
															   horizontal: 'center',
															   vertical: 'center'
															}

											};
						worksheet['A5'].v = '';
						worksheet['A5'].s = {
												
												font: {
														name: '黑体',
														sz: 10,
														bold:true
													   },
												alignment: {
															   horizontal: 'center',
															   vertical: 'center'
															}

											};											
						worksheet['!merges'].push(
						  {
							s: {c: 0, r: 0},
							e: {c: 7, r: 0}
						  },
						   {
							s: {c: 0, r: 1},
							e: {c: 7, r: 1}
						  },
							{
							s: {c: 0, r: 2},
							e: {c: 7, r: 2}
						  },
						  {
							s: {c: 0, r: 3},
							e: {c: 7, r: 3}
						  },
						   {
							s: {c: 0, r: 4},
							e: {c: 7, r: 4}
						  },
							{
							s: {c: 0, r: 5},
							e: {c: 1, r: 5}
						  },
							{
							s: {c: 2, r: 5},
							e: {c: 3, r: 5}
						  },
							{
							s: {c: 4, r: 5},
							e: {c: 5, r: 5}
						  },
							{
							s: {c: 6, r: 5},
							e: {c: 7, r: 5}
						  }
						);
						
						for (i = 6; i <= 9; i++ )
						{
							for (j = 1; j <= 8; j++ )
							{
								var x = String.fromCharCode(64 + j) + i;
								//alert(x);
								worksheet[x].v = '';
								worksheet[x].s = {
													border: borderAll,
													font: {
																name: '宋体',
																sz: 10
													   },
													alignment: {
																	horizontal: 'left',
																	vertical: 'center',
																	wrapText:'true'
																}
													}
							}
						};
						for (i = 10; i <= 21; i++ )
						{
							for (j = 1; j <= 8; j++ )
							{
								var x = String.fromCharCode(64 + j) + i;
								//alert(x);
								worksheet[x].v = '';
								worksheet[x].s = {
													border: borderAll,
													font: {
																name: '宋体',
																sz: 10
													   },
													alignment: {
																	wrapText:'true',
																	horizontal: 'center',
																	vertical: 'center'
																}
													}
							}
						};
						for (i = 8; i <= 18; i++) {
						worksheet['A' + ( i + 3 )].v = i - 7;
						worksheet['A' + ( i + 3 )].s = {
											border: borderAll,
											font: {
													name: '宋体',
													sz: 10
												   },
											alignment: {
															horizontal: 'center',
															vertical: 'center'
														}
							}
						};
						for (i = 9; i <= 19; i++) {
						worksheet['!merges'].push(					
						  {
							s: {c: 2, r: i},
							e: {c: 3, r: i}
						  },
							{
							s: {c: 5, r: i},
							e: {c: 6, r: i}
						  })
						};
					  worksheet['!merges'].push(					  
					  {
						s: {c: 0, r: 6},
						e: {c: 3, r: 6}
					  },
						{
						s: {c: 4, r: 6},
						e: {c: 7, r: 6}
					  },
					  {
						s: {c: 0, r: 7},
						e: {c: 1, r: 7}
					  },{
						s: {c: 2, r: 7},
						e: {c: 4, r: 7}
					  },{
						s: {c: 5, r: 7},
						e: {c: 7, r: 7}
					  },
					  {
						s: {c: 0, r: 8},
						e: {c: 1, r: 8}
					  },{
						s: {c: 2, r: 8},
						e: {c: 5, r: 8}
					  },{
						s: {c: 6, r: 8},
						e: {c: 7, r: 8}
					  },
					  {
						s: {c: 1, r: 20},
						e: {c: 3, r: 20}
					  },{
						s: {c: 4, r: 20},
						e: {c: 7, r: 20}
					  },					
					  {
						s: {c: 0, r: 21},
						e: {c: 7, r: 21}
					  }  
					  );
					    worksheet['A2'].v = "附录C";
						worksheet['A4'].v = "（规范性附录）";
						worksheet['A5'].v = "";
						worksheet['A1'].v = "编号：" + ckdForm.getForm().findField("djid").getValue();
						worksheet['A6'].v = "维修日期：" + ckdForm.getForm().findField("riqi").getValue().toLocaleDateString();
						worksheet['C6'].v = "姓名：" + ckdForm.getForm().findField("owner").getValue();
						worksheet['E6'].v = "工号：" + ckdForm.getForm().findField("ownerbadge").getValue();
						worksheet['G6'].v = "联系方式：" + ckdForm.getForm().findField("tel").getValue();
						worksheet['A7'].v = "领用部门：" + ckdForm.getForm().findField("department").getValue();  
						worksheet['E7'].v = "办公地点：" + ckdForm.getForm().findField("address").getValue();
						worksheet['A' + 8].v = "故障设备：" + ckdForm.getForm().findField("assetname").getValue();
						worksheet['C' + 8].v = "设备型号：" + ckdForm.getForm().findField("assettype").getValue();			
						worksheet['F' + 8].v = "资产编号：" + ckdForm.getForm().findField("assetid").getValue();
						worksheet['A' + 9].v = "设备信息：" + ckdForm.getForm().findField("mac").getValue();  
						worksheet['C' + 9].v = "故障情况：" + ckdForm.getForm().findField("des").getValue();
						worksheet['G' + 9].v = "系统单号：";
						worksheet['A10'].v = '序号';
						worksheet['A10'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
											
															}

											};
						worksheet['B10'].v = '设备名称';
						worksheet['B10'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['C10'].v = '型号';
						worksheet['C10'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['E10'].v = '数量';
						worksheet['E10'].s = {
												
												font: {
														border: borderAll,
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['F10'].v = '领用说明';
						worksheet['F10'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						worksheet['H10'].v = '备注';
						worksheet['H10'].s = {
												border: borderAll,
												font: {
														name: '宋体',
														sz: 10
													   },
												alignment: {
																horizontal: 'center',
																vertical: 'center'
															}

											};
						for (i = 1; i <= recordCount; i++)								 
							{
								
								worksheet['B' + ( i + 10 )].v = view.getCell(i - 1,2).innerText;
								worksheet['C' + ( i + 10 )].v = view.getCell(i - 1,3).innerText;
								worksheet['E' + ( i + 10 )].v = view.getCell(i - 1,4).innerText;
								worksheet['F' + ( i + 10 )].v = ckdForm.getForm().findField("bz").getValue()
							};
						worksheet['A21'].v = "领用人签字处";
						worksheet['A21'].s = {
							border: borderAll,
							font: {
									name: '宋体',
									sz: 10
								   },
							alignment: {
										   wrapText:'true',
										   horizontal: 'left',
										   vertical: 'center'
										}

							};
						worksheet['E21'].v = "办公服务站人员：" +log_name;
						worksheet['A22'].v = "*此表手写无效";
						worksheet['A22'].s = {
						
						font: {
								name: '宋体',
								sz: 10
							   },
						alignment: {
									   horizontal: 'left',
									   vertical: 'center'
									}

						};

					};
				if(Ext.getCmp('type').getValue().inputValue == "领用")
				{
					 workbookOut = XLSX.write(workbook1, {
												bookType: 'xlsx',
												bookSST: false,
												type: 'binary'
										  });
				};
				if(Ext.getCmp('type').getValue().inputValue == "更换")
				{
					workbookOut = XLSX.write(workbook2, {
												bookType: 'xlsx',
												bookSST: false,
												type: 'binary'
										  });
				};
				saveAs(new Blob([s2ab(workbookOut)], { type: "application/octet-stream" }), fileName + '.xlsx');



				function s2ab(s) {
            if (typeof ArrayBuffer !== 'undefined') {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            } else {
                var buf = new Array(s.length);
                for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
        };
							}
						
					}
				]
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
							columnWidth:.2,
							items:[{						
								xtype:"textfield",
								hidden:"true",
								width:150,
								name:'sbid',
								fieldLabel:"设备号",
								anchor:"95%",
								maxLength :150
							}]
						}				
						,
			{
				xtype:'hidden',
				name:'djid'
			}
					]
					
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
			title:'办公耗材出库登记',
			iconCls:'menu-21',
			layout:'border',
			items:[ckdForm,ckspGrid]
		}],
		listeners:{
			render:function(){
				getCode();
				store.load();
				allStore.load();
				initScannerModule();
			}
		}
	});
	

	

});