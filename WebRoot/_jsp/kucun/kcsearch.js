/*!
 * 当前库存查询
 */
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	var v_lbid="0",v_lbname="所有类别",v_start=0, v_limit=20;
		
	//商品类别树窗口
    var splbTreeWindow = new Ext.Window({
		width:240,
		height:260,
		closeAction:"hide",
		layout : "fit",
		buttonAlign : "center",
		items : [{
			xtype:"treepanel",
			useArrows: true,
	        autoScroll:true,
	        enableDD:false,
	        containerScroll: true,
	        dataUrl: "splb_findSplbTree.do",
	        root: {
	            nodeType: "async",
	            text: "所有类别",
	            select:true,
	            draggable: false,
	            id: "0"
	        },
	        listeners:{
	        	load:function(){
	        		this.getSelectionModel().select(this.root);
	        	},
	        	click:function(n){
	        		v_lbid = n.id;
	        		v_lbname = n.text;
	        	},
	        	dblclick:function(n){
	        		v_lbid = n.id;
	        		v_lbname = n.text;
	        		splbTreeWindow.hide();
					searchForm.getForm().findField("lbid").setValue(v_lbid);
					searchForm.getForm().findField("lbname").setValue(v_lbname);
	        	}
	        	
	        }
		}],
		listeners:{
			beforeshow:function(){
				var xy = Ext.getCmp("lbtext").getPosition();
				splbTreeWindow.setPosition(xy[0],xy[1]+25);
			},
        	show:function(){
        		this.items.get(0).getRootNode().expand();
        	}
        },
		buttons : [{
			width:60,
			text : "选择",
			handler : function() {
				splbTreeWindow.hide();
				searchForm.getForm().findField("lbid").setValue(v_lbid);
				searchForm.getForm().findField("lbname").setValue(v_lbname);
			}
		}, {
			width:60,
			text : "取消",
			handler : function() {
				splbTreeWindow.hide();
			}
		}]
	});
	
	//查询表单
	var searchForm = new Ext.FormPanel({
		region:"north",
		height: 80,
		border : false,
		layout : "form",
		padding : "5 20 0 20",
		items:[{
			xtype:"fieldset",
			title:"查询设置",
			padding:"0 20 0 15",
			items:[{
				layout:"column",
				defaults:{
					xtype:"container",
					autoEl:"div",
					labelAlign:"right",
					layout:"form"
				},
				items:[{
					width:190,
					labelWidth:60,
					items:[{
						width:100,
						id:"lbtext",
						xtype : "textfield",
						name:"lbname",
						fieldLabel:"商品类别",
						value:"所有类别",
						maxLength :50,
						enableKeyEvents:true,
						listeners:{
							focus:function(){
								splbTreeWindow.show();
							}
						}
					}]
				},{
					width:310,
					items:[{
						width:180,
						labelWidth:100,
						xtype:"textfield",
						name:"search",
						fieldLabel:"商品编号或名称"
					}]
				},{
					width:150,
					items:[{
						width:75,
						xtype:"button",
						iconCls:"btn-list",
						text:"查询",
						handler:function(){
							var f = searchForm.getForm();
							if (f.isValid()) {
								kcspStore.load({params:f.getValues()});
							}
						}
					}]
				},
				
				{
					width:250,
					items:[{
						width:75,
						xtype:"button",
						store: kcspStore,
						text:"导出",
						handler:function outExcel(){
						var KcSheet ;    
						try {  
							KcSheet = new ActiveXObject("Excel.Application");  
						   //alert(ExcelSheet .Version);  
						   wb = KcSheet.Workbooks.open("http://10.10.36.14:8080/MyStock/data/pdd.xls"); 
						   kcspGrid.getColumnModel();
						   kcspGrid.getStore();
						    var cm = kcspGrid.getColumnModel();
						    var colCount = cm.getColumnCount();  
						    var temp_obj = [];  
						    //只下载没有隐藏的列(isHidden()为true表示隐藏,其他都为显示)   
						    //临时数组,存放所有当前显示列的下标   
						    for (i = 0; i < colCount; i++)
						    {  
						        if (cm.isHidden(i) == true) {  
						        }  
						       else 
						       {  
						            temp_obj.push(i);  
						        }  
						    } 
						    var recordCount = kcspStore.getCount();
						    kcspGrid.getStore(); 
						    var view = kcspGrid.getView();
						    
						    for (i = 1; i <= recordCount; i++) {//
						        for (j = 1; j <=temp_obj.length ; j++) {//
						            //EXCEL数据从第二行开始,故row = i + 1;   
						        	KcSheet.ActiveSheet.Cells(i + 3, j).Value = view.getCell(i-1,j-1).innerText;   
						        }  
						    }
						    KcSheet.Columns.AutoFit; 
						    KcSheet.Visible = true; 
						} catch(e) {  
						if (KcSheet != undefined){  
						   alert('Error happened : ' + e);  
						   KcSheet.Quit();  
						}  
						   return '';  
						}
						}
					}]
				}
				]
			},{
				xtype:'hidden',
				name:'lbid',
				value:'0'
			}]
		}]
	});
	
	var DqkcObj = [
		{ name:'spid', type:'string'},
		{ name:'spname', type:'string'},
		{ name:'lbname', type:'string'},
		{ name:'xinghao', type:'string'},
		{ name:'kcsl', type:'int'},
		{ name:'xsll', type:'int'},

		{ name:'dw', type:'string'},
		{ name:'csname', type:'string'}
	];
	
	//库存数据
	var kcspStore = new Ext.data.JsonStore({
	    url: 'search_findKcByParams.do',
	    root: 'root',
	    totalProperty: 'total',
	    fields: DqkcObj
	});
	
	//库存列表
    var kcspGrid = new Ext.grid.GridPanel({
    	id:"djspGrid",
        store: kcspStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},//禁止表头菜单
			columns:[new Ext.grid.RowNumberer(),
				{header: '商品编号', width: 100, sortable:true, dataIndex: 'spid'},
	            {header: '商品名称', width: 130, sortable:true, dataIndex: 'spname'},
	            {header: '类别', width: 60, sortable:true, dataIndex: 'lbname'},
	            {header: '型号', width: 80, sortable:true, dataIndex: 'xinghao'},
	            {header: '库存数量', width: 80, sortable:true, dataIndex: 'kcsl'},
	            {header: '单位', width: 60, sortable:true, dataIndex: 'dw'},
	            {header: '生产厂商', width: 100, sortable:true, dataIndex: 'csname'},
	            {header: '备注', width: 200, sortable:true, dataIndex: 'bz'}]
        }),
        stripeRows: true, 	//行分隔符
        columnLines : true, //列分隔符
        height:150,
        margins:"10 20 5 20",
        style:"border:1px solid",
	region:"center",
        iconCls:"",
        listeners:{
        	render:function(){
        		kcspStore.load({params:searchForm.getForm().getValues()});
        	}
        }

    });
    
	
	//布局
    new Ext.Viewport({
		layout:"fit",
		items:[{
			frame:true,
			title:"当前库存查询",
			iconCls:'menu-15',
			layout:"border",
			items:[searchForm,kcspGrid]
		}]
	});

});