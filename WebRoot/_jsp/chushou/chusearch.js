/*!
 * 销售单据查询
 */
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	var v_start=0, v_limit=20;
	var date = new Date();
	date.setMonth(date.getMonth()-1);
	//查询表单
	var ckdForm = new Ext.FormPanel({
		region:'north',
		height: 80,
		border : false,
		layout : 'form',
		padding : '5 20 0 20',
		items:[{
			id:"ckdfieldset",
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
					width:250,
					items:[{
						labelWidth:100,
						xtype:"textfield",
						name:'search',
						fieldLabel:"客户/单据编号",
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
							var f = ckdForm.getForm();
							if (f.isValid()) {
								ckdStore.load({params:f.getValues()});
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
							var record= ckdGrid.getSelectionModel().getSelected();
							if(!record){
			                	Ext.Msg.alert('信息提示','请选择要删除的进货单');  
							}else{
								Ext.MessageBox.confirm('删除提示', '删除进货单后将无法恢复，是否删除？', function(c) {
								   if(c=='yes'){
								   		Ext.Ajax.request({
								   			url : "xs_deleteCkd.do",
								   			params:{ djid : record.get("djid") },
								   			success : function() {
								   				ckdStore.reload();
								   				ckspStore.removeAll();
								   			}
								   		});
								    }
								});
							}
						}
					}]
				},
				{	
					width:100,
					items:[{
					width:75,
					xtype:"button",
					store:ckdStore,
					store:ckspStore,
					text:'导出',
					handler:function(){
					var ExcelSheet ;    
					try {  
					   ExcelSheet = new ActiveXObject("Excel.Application");  
					     
					   wb = ExcelSheet.Workbooks.open("http://10.10.36.14:8080/MyStock/data/ckd.xls"); 
					   ckdGrid.getColumnModel();
					   ckdGrid.getStore();
					   var view1 = ckdGrid.getView();						   
					   var selectedGrid = ckdGrid.getSelectionModel().getSelections();//获得选中的项
					   var row1id = ckdGrid.getStore().indexOf(selectedGrid[0]);
					   var curTime = new Date().toLocaleDateString();
					   ExcelSheet.ActiveSheet.Cells(1,1).Value = "编号：" + view1.getCell(row1id,4).innerText;
					   ExcelSheet.ActiveSheet.Cells(3,1).Value = "日期：" + curTime;
					   //ExcelSheet.ActiveSheet.Cells(4,2).Value = view1.getCell(row1id,1).innerText;
					   //ExcelSheet.ActiveSheet.Cells(4,6).Value = view1.getCell(row1id,1).innerText;
					   //ExcelSheet.ActiveSheet.Cells(6,2).Value = view1.getCell(row1id,2).innerText;
					   ExcelSheet.ActiveSheet.Cells(8,5).Value = "送修日期：" + view1.getCell(row1id,3).innerText;
					   //ckspGrid.getColumnModel();
					   //ckspGrid.getStore();
					   //var view2 = ckspGrid.getView();
					   //var selectedGrid1 = ckspGrid.getSelectionModel().getSelections();//获得选中的项
					   //var row2id = ckspGrid.getStore().indexOf(selectedGrid1[0]);
					   //ExcelSheet.ActiveSheet.Cells(5,2).Value = view2.getCell(row2id,2).innerText;
					   //ExcelSheet.ActiveSheet.Cells(5,6).Value = view2.getCell(row2id,3).innerText; 
					   //ExcelSheet.ActiveSheet.Cells(6,6).Value = view2.getCell(row2id,3).innerText;
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
				}


				
				]
			}]
		}]
	});
	
	var CkdObj = [
		{ name:'djid', type:'string'},
		{ name:'khid', type:'int'},
		{ name:'department', type:'department'},
		{ name:'owner', type:'string'},
		{ name:'riqi', type:'date', mapping : 'riqi.time', dateFormat : 'time' },
		{ name:'username', type:'string'},
		{ name:'bz', type:'string'},
		{ name:'type', type:'string'},
	];
	
	//销售单数据
	var ckdStore = new Ext.data.JsonStore({
	    url: "../xs_findDjByParams.do?tab=Ckd",
	    root: 'root',
	    totalProperty: 'total',
	    fields: CkdObj
	});
	
	//销售单列表
    var ckdGrid = new Ext.grid.GridPanel({
        store: ckdStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},//禁止表头菜单
			columns:[new Ext.grid.RowNumberer(),
				{header: '部门', width: 200, sortable:true, dataIndex: 'department'},
				{header: '保管人', width: 50, sortable:true, dataIndex: 'owner'},
	            {header: '日期', width: 80, sortable:true, align:'center', renderer : Ext.util.Format.dateRenderer('Y-m-d'),  dataIndex: 'riqi'},
	            {header: '单号', width: 120, sortable:true, align:'center', dataIndex: 'djid'},
	            {header: '类型', width: 100, sortable:true, align:'center', dataIndex: 'type'},
	            {header: '操作员', width: 80, sortable:true, align:'center', dataIndex: 'username'},
	            {header: '备注', width: 220, dataIndex: 'bz'}]
        }),
        stripeRows: true, 	//行分隔符
        columnLines : true, //列分隔符
        margins:'10 20 0 20',
        style:'border:1px solid',
		region:'center',
        iconCls:'',
        
        listeners:{
        	rowclick:function(a,b){
        		ckspStore.load({params:{djid:ckdStore.getAt(b).get("djid")}});
        	}
        }
    });
	
	
	var SpxxObj = [
		{ name:'spid', type:'string'},
		{ name:'spname', type:'string'},
		{ name:'spxinghao', type:'string'},
		{ name:'spdw', type:'string'},
		{ name:'sl', type:'string'},
	];
	
	//销售商品数据
	var ckspStore = new Ext.data.JsonStore({
	    url: "../xs_findDjspByParams.do?tab=Ckdsp&info=ckd",
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj
	});
	
	//销售商品列表
    var ckspGrid = new Ext.grid.GridPanel({
    	id:'djspGrid',
        store: ckspStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},//禁止表头菜单
			columns:[new Ext.grid.RowNumberer(),
				{header: '商品编号', width: 100, sortable:true, dataIndex: 'spid'},
	            {header: '商品名称', width: 200, sortable:true, dataIndex: 'spname'},
	            {header: '商品型号', width: 150, sortable:true, dataIndex: 'spxinghao'},
	            {header: '单位', width: 100, sortable:true, dataIndex: 'spdw'},
	            {header: '数量', width: 100, sortable:true, align:'center', dataIndex: 'sl'}
	            ]
        }),
        stripeRows: true, 	//行分隔符
        columnLines : true, //列分隔符
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
			title:'出库单据查询',
			iconCls:'menu-13',
			layout:'border',
			items:[ckdForm,ckdGrid,ckspGrid]
		}],
		listeners:{
			render:function(){
			}
		}
	});

});