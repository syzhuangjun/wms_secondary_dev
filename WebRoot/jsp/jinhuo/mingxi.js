Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	var v_start=0, v_limit=20;
	var date = new Date();
	date.setMonth(date.getMonth()-1);
	var thdForm = new Ext.FormPanel({
		region:'north',
		height: 80,
		border : false,
		layout : 'form',
		padding : '5 20 0 20',
		items:[{
			id:"thdfieldset",
			xtype:"fieldset",
			title:"查询设置",
			padding:'0 20 0 15',
			items:[{
				layout:"column",
				defaults:{
					xtype:"container",
					autoEl:"div",
					labelAlign:'right',
					layout:"form"
				},
				items:[{
					width:60,
					style:'padding-top:5',
					xtype:'tbtext',
					text:'查询日期:'
				},{
					width:100,
					xtype:"datefield",
					name:'startdate',
					format:'Y-m-d',
					allowBlank : false,
					value:date
				},{
					width:28,
					style:'padding:5 0 0 8',
					xtype:'label',
					text:'至'
				},{
					width:100,
					xtype:"datefield",
					name:'enddate',
					format:'Y-m-d',
					allowBlank : false,
					value:new Date()
				},{
					width:30
				},{
					width:250,
					items:[{
						labelWidth:100,
						xtype:"textfield",
						name:'search',
						fieldLabel:"供应商/单据编号",
						anchor:"90%"
					}]
				}
				,{
					width:100,
					items:[{
						width:75,
						xtype:"button",
						text:'查询',
						handler:function(){
							var f = thdForm.getForm();
							if (f.isValid()) {
								thdStore.load({params:f.getValues()});
							}
						}
					}]
				},{
					width:100,
					items:[{
						width:75,
						xtype:"button",
						text:'删除',
						handler:function(){
							var record= thdGrid.getSelectionModel().getSelected();
							if(!record){
			                	Ext.Msg.alert('信息提示','请选择要删除的入库单');  
							}else{
								Ext.MessageBox.confirm('删除提示', '删除入库单后将无法恢复，是否删除？', function(c) {
								   if(c=='yes'){
								   		Ext.Ajax.request({
								   			url : "jh_deleteThd.do",
								   			params:{ djid : record.get("djid") },
								   			success : function() {
								   				thdStore.reload();
								   				thspStore.removeAll();
								   			}
								   		});
								    }
								});
							}
						}
					}]
				}]
			}]
		}]
	});
	
	var JhdObj = [
		{ name:'djid', type:'string'},
		{ name:'gysid', type:'int'},
		{ name:'gysname', type:'string'},
		{ name:'riqi', type:'date', mapping : 'riqi.time', dateFormat : 'time' },
		{ name:'yfje', type:'string'},
		{ name:'username', type:'string'},
		{ name:'bz', type:'string'}
	];
	
	var thdStore = new Ext.data.JsonStore({
	    url: "../jh_findDjByParams.do?tab=Thd",
	    root: 'root',
	    totalProperty: 'total',
	    fields: JhdObj
	});
	
    var thdGrid = new Ext.grid.GridPanel({
        store: thdStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},
			columns:[new Ext.grid.RowNumberer(),
				{header: '供应商名称', width: 120, sortable:true, dataIndex: 'gysname'},
	            {header: '日期', width: 80, sortable:true, align:'center', renderer : Ext.util.Format.dateRenderer('Y-m-d'),  dataIndex: 'riqi'},
	            {header: '单号', width: 120, sortable:true, align:'center', dataIndex: 'djid'},
	            {header: '类型', width: 100, sortable:true, align:'center', dataIndex: 'type',
	            	renderer : function() {return "退货出库"}
	            },
	           
	            {header: '操作员', width: 80, sortable:true, align:'center', dataIndex: 'username'},
	            {header: '备注', width: 220, dataIndex: 'bz'}]
        }),
        stripeRows: true, 	
        columnLines : true, 
        margins:'10 20 0 20',
        style:'border:1px solid',
		region:'center',
        iconCls:'',
        
        listeners:{
        	rowclick:function(a,b){
        		thspStore.load({params:{djid:thdStore.getAt(b).get("djid")}});
        	}
        }
    });
	
	
	var SpxxObj = [
		{ name:'spid', type:'string'},
		{ name:'spname', type:'string'},
		{ name:'spxinghao', type:'string'},
		{ name:'spdw', type:'string'},
		{ name:'sl', type:'string'},
		{ name:'bz', type:'string'}
	];
	

	var thspStore = new Ext.data.JsonStore({
	    url: "../jh_findDjspByParams.do?tab=Thdsp&info=thd",
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj
	});
	

    var thspGrid = new Ext.grid.GridPanel({
    	id:'djspGrid',
        store: thspStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},
			columns:[new Ext.grid.RowNumberer(),
				{header: '耗材编号', width: 100, sortable:true, dataIndex: 'spid'},
	            {header: '耗材名称', width: 200, sortable:true, dataIndex: 'spname'},
	            {header: '耗材型号', width: 150, sortable:true, dataIndex: 'spxinghao'},
	            {header: '数量', width: 100, sortable:true, align:'center', dataIndex: 'sl'},
	            {header: '单位', width: 100, sortable:true, dataIndex: 'spdw'},
	            {header: '位置', width: 100, sortable:true, dataIndex: 'bz'}
	            
	            ]
        }),
        stripeRows: true, 	
        columnLines : true, 
        height:150,
        margins:'10 20 5 20',
        style:'border:1px solid',
		region:'south',
        iconCls:''
    });
    
	
	//布局
    new Ext.Viewport({
		layout:'fit',
		items:[{
			frame:true,
			title:'退货单据查询',
			iconCls:'menu-13',
			layout:'border',
			items:[thdForm,thdGrid,thspGrid]
		}],
		listeners:{
			render:function(){
			}
		}
	});

});