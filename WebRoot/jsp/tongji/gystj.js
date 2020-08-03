/*!
 * 供应商统计
 */
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	var v_start=0, v_limit=20;
	var date = new Date();
	date.setMonth(date.getMonth()-1);
	//供应商下拉数据
    var gysStore = new Ext.data.JsonStore({
		url: 'gys_findGysComb.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: ['value','text'],
	    listeners:{
	    	load:function(s){
	    		var r = new gysStore.recordType({value:'',text:'所有供应商'});
    			gysStore.insert(0,r);
	    	}
	    }
	});
	//查询表单
	var djmxForm = new Ext.FormPanel({
		region:'north',
		height: 80,
		border : false,
		layout : 'form',
		padding : '5 20 0 20',
		items:[{
			id:"jhdfieldset",
			xtype:"fieldset",
			title:"统计设置",
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
					text:'往来时间:'
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
					width:240,
					items:[{
							id:'gyscombo',
							xtype:'combo',
							hiddenName:'gysid',
							fieldLabel:'供应商',
							mode: 'local',
							triggerAction: 'all',
							valueField :'value',
							displayField: 'text',
							editable : false,
							store : gysStore,
							width:120
					}]
				}
				,{
					width:100,
					items:[{
						width:75,
						xtype:"button",
						text:'查询',
						handler:function(){
							var f = djmxForm.getForm();
							if (f.isValid()) {
								djmxStore.load({params:f.getValues()});
							}
						}
					}]
				}
				]
			}]
		}]
	});
	//结算窗口
	var jieshuanWin =new Ext.Window({
		title:"结算窗口",
		width:250,
		height:144,
		closeAction:'hide',
		layout:"fit",
		buttonAlign : 'center',
		fbar:[{
				text:"保存",
				handler : function() {
					jieshuanWin.hide();
				}
			},{
				text:"取消",
				handler : function() {
					jieshuanWin.hide();
				}
		}]
	});
	
	var DjxmObj = [
		{ name:'djid', type:'string'},
		{ name:'gysid', type:'int'},
		{ name:'gysname', type:'string'},
		{ name:'riqi', type:'date', mapping : 'riqi.time', dateFormat : 'time' },
		{ name:'username', type:'string'},
		{ name:'bz', type:'string'},
		{ name:'type',type:'string'}
	];
	
	//进货单数据
	var djmxStore = new Ext.data.JsonStore({
	    url: "../tongji_findGysTj.do",
	    root: 'root',
	    totalProperty: 'total',
	    fields: DjxmObj
	});
	
	//进货单列表
    var djmxGrid = new Ext.grid.GridPanel({
        store: djmxStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},//禁止表头菜单
			columns:[new Ext.grid.RowNumberer(),
				{header: '供应商名称', width: 120, sortable:true, dataIndex: 'gysname'},
	            {header: '日期', width: 80, sortable:true, align:'center', renderer : Ext.util.Format.dateRenderer('Y-m-d'),  dataIndex: 'riqi'},
	            {header: '单号', width: 120, sortable:true, align:'center', dataIndex: 'djid'},
	            {header: '类型', width: 100, sortable:true, align:'center', dataIndex: 'type',
	            	renderer : function() {return "进货入库"}
	            },
	            //{header: '进货金额', width: 100, sortable:true, align:'right', renderer:zhMoney, dataIndex: 'yfje'},
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
        		var store = djmxStore.getAt(b);
        		var djid = store.get("djid");
        		var tab = djid.substring(0,2);
        		var info = "";
        		if(tab=="JH"){
        			tab = "Jhdsp";
        			info = "jhd";
        		}else{
        		    tab = "Thdsp";
        		    info = "thd";
        		}
        		djspStore.load({params:{tab:tab,info:info,djid:djid}});
        	}
        }
    });
	
	
	var SpxxObj = [
		{ name:'spid', type:'string'},
		{ name:'spname', type:'string'},
		{ name:'spxinghao', type:'string'},
		{ name:'spdw', type:'string'},
		{ name:'sl', type:'string'}

	];
	
	//进货商品数据
	var djspStore = new Ext.data.JsonStore({
	    url: "../jh_findDjspByParams.do",
	    root: 'root',
	    totalProperty: 'total',
	    fields: SpxxObj
	});
	
	//进货商品列表
    var djspGrid = new Ext.grid.GridPanel({
    	id:'djspGrid',
        store: djspStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},//禁止表头菜单
			columns:[new Ext.grid.RowNumberer(),
				{header: '耗材编号', width: 100, sortable:true, dataIndex: 'spid'},
	            {header: '耗材名称', width: 200, sortable:true, dataIndex: 'spname'},
	            {header: '耗材型号', width: 150, sortable:true, dataIndex: 'spxinghao'},
	            {header: '单位', width: 100, sortable:true, dataIndex: 'spdw'},
	            //{header: '采购价', width: 100, sortable:true, align:'right', renderer:zhMoney, dataIndex: 'dj'},
	            {header: '数量', width: 100, sortable:true, align:'center', dataIndex: 'sl'},
	            //{header: '总金额', width: 100, sortable:true, align:'right', renderer:zhMoney, dataIndex: 'zj'}
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
			title:'供应商统计',
			iconCls:'menu-41',
			layout:'border',
			items:[djmxForm,djmxGrid,djspGrid]
		}],
		listeners:{
			render:function(){
				gysStore.load();
			}
		}
	});

});