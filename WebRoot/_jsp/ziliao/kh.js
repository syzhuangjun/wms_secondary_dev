/*!
 * 客户管理
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
	    autoLoad: {params:{start:0, limit:15}},
	    fields: KhObj
	});
	
	//客户列表
    var grid = new Ext.grid.GridPanel({
        store: store,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},//禁止表头菜单
			columns:[new Ext.grid.RowNumberer(),
	            {id:'assetid',header: '资产编码', width:	180,align:'center',dataIndex: 'assetid'},
	            {header: '设备名称', width: 80,align:'center', dataIndex: 'assetname'},
	            {header: '设备型号', width: 150,align:'center', dataIndex: 'assettype'},
	            {header: 'MAC地址', width: 150, align:'center',dataIndex: 'mac'},
	            {header: '部门', width: 200, align:'center',dataIndex: 'department'},
	            {header: '保管人', width: 50,align:'center', dataIndex: 'owner'},
	            {header: '工号', width: 50,align:'center', dataIndex: 'ownerbadge'},
	            {header: '办公地点', width: 200, align:'center',dataIndex: 'address'},
	            {header: '联系方式', width: 80, align:'center',dataIndex: 'tel'}	            
	            
	            ]
        }),
        stripeRows: true, 	//行分隔符
        columnLines : true, //列分隔符
        //autoExpandColumn: 'khbz', //自动扩展列
		loadMask : true,	//加载时的遮罩
		frame : true,
        title:'设备管理',
        iconCls:'menu-51',
        
        tbar:['->',{
        	text:'增加',
        	iconCls:'btn-add',
        	handler: function(){
        		addWindow.show();
        		addForm.getForm().reset();
        	}
        },'-',{
        	text:'修改',
        	iconCls:'btn-edit',
        	handler: function(){
        		var record= grid.getSelectionModel().getSelected(); 
				if(!record){
                	Ext.Msg.alert('信息提示','请选择要修改的设备');
				}else{
	        		addWindow.show();
					addForm.getForm().loadRecord(record);
				}
        	}
        },'-',{
        	text:'删除',
        	iconCls:'btn-remove',
        	handler: function(){
        		var record= grid.getSelectionModel().getSelected();
				if(!record){
                	Ext.Msg.alert('信息提示','请选择要删除的设备');  
				}else{
					Ext.MessageBox.confirm('删除提示', '是否删除该设备？', function(c) {
					   if(c=='yes'){
					   		Ext.Ajax.request({
					   			url : "kh_deleteKh.do",
					   			params:{ khid : record.get("sbid") },
					   			success : function() {
					   				store.reload();
					   			}
					   		});
					    }
					});
				}
        	}
        }],
        
        bbar: new Ext.PagingToolbar({
            pageSize: 15,
            store: store,
            displayInfo: true
        })
    });

    //客户表单
    var addForm = new Ext.FormPanel({
		layout : 'form',
		baseCls:'x-plain',
		labelWidth:60,
		border : false,
		padding : '15 10 0 8',
		defaults : {
			anchor : '100%',
			xtype : 'textfield'
		},
		items:[{
				name:'assetid',
				fieldLabel:'资产编码',
				maxLength :50,
				allowBlank : false
			},
			{
				name:'assetname',
				fieldLabel:'设备名称',
				maxLength :20
			},{
				name:'assettype',
				fieldLabel:'设备型号',
				maxLength :30
			},{
				name:'mac',
				fieldLabel:'MAC地址',
				maxLength :30
			},{
				
				name:'department',
				fieldLabel:'部门',
				
				maxLength :50
			},
			{
				name:'owner',
				fieldLabel:'保管人',
				maxLength :20
			},
			{
				name:'ownerbadge',
				fieldLabel:'工号',
				maxLength :20
			},{
				name:'address',
				fieldLabel:'办公地点',
				maxLength :50
			},{
				name:'tel',
				fieldLabel:'联系方式',
				maxLength :20
			},{
				xtype : 'hidden',
			    name : 'sbid'
			}
]
	});
    
	//增加客户窗口
    var addWindow = new Ext.Window({
		title : '设备信息',
		width:400,
		height:350,
		closeAction:'hide',
		modal : true,
		layout : 'fit',
		buttonAlign : 'center',
		items : [addForm],
		buttons : [{
			text : '保存',
			handler : function() {
				if (addForm.getForm().isValid()) {
					addForm.getForm().submit({
						url : 'kh_saveOrUpdateKh.do',
						success : function(form, action) {
							Ext.Msg.alert('信息提示',action.result.message);
							addWindow.hide();
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
		}, {
			text : '取消',
			handler : function() {
				addWindow.hide();
			}
		}]
	});
    
	//布局
    new Ext.Viewport({
		layout:'border',
		items:[{
			region:'center',
			layout:'fit',
			border:false,
			items:grid
		}]
	});

});