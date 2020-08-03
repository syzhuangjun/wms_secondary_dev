Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	var v_start=0, v_limit=20;
	var date = new Date();
	date.setMonth(date.getMonth()-1);
	//商品类别树窗口
    var splbTreeWindow = new Ext.Window({
		width:200,
		height:300,
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
	            draggable: false,
	            id: "0"
	        },
	        listeners:{
	        	click:function(n){
	        		splbTreeWindow.hide();
	        		djmxForm.getForm().findField("lbid").setValue(n.id);
					djmxForm.getForm().findField("lbname").setValue(n.text);
	        	}
	        }
		}],
		listeners:{
			beforeshow:function(){
				var xy = Ext.getCmp("spcgtj_splb").getPosition();
				splbTreeWindow.setPosition(xy[0],xy[1]+25);
			},
        	show:function(){
        		this.items.get(0).getRootNode().expand();
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
			id:"khfieldset",
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
					width:200,
					items:[{
						id:'spcgtj_splb',
						labelWidth:100,
						xtype:"textfield",
						name:'lbname',
						fieldLabel:"耗材类别",
						readOnly:true,
						value:'所有类别',
						anchor:'90%',
						listeners:{
							focus:function(){
								splbTreeWindow.show();
							}
						}
					}]
				},{
					width:250,
					items:[{
						labelWidth:100,
						xtype:"textfield",
						name:'search',
						fieldLabel:"耗材编号或名称",
						anchor:"90%"
					}]
				},{
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
				},
				{
					width:100,
					items:[{
						width:75,
						xtype:"button",
						text:'库存查询',
						handler:function(){				
						var f = djmxForm.getForm();

						if (f.isValid()) {
							
								for(var i=0;i<djmxStore.getTotalCount();i++)					
								{
									var index = (kcspStore.find('spid',djmxStore.getAt(i).get('spid')));
									if (index!=-1)
										djmxStore.getAt(i).set('kcsl',kcspStore.getAt(index).get('kcsl'));
								
								}
						}
					}
					}]
				},
				{
					width:100,
					items:[{
						width:75,
						xtype:"button",
						store:djmxStore,
						text:'导出',
						handler:function(){
						var YdckdSheet ;    
						try {  
						   YdckdSheet = new ActiveXObject("Excel.Application");  
						   //alert(ExcelSheet .Version);  
						   wb = YdckdSheet.Workbooks.open(""); 
						   djmxGrid.getColumnModel();
						   djmxGrid.getStore();
						    var cm = djmxGrid.getColumnModel();
						    var colCount = cm.getColumnCount();  
						    var temp_obj = [];    
						    for (i = 0; i < colCount; i++)
						    {  
						        if (cm.isHidden(i) == true) {  
						        }  
						       else 
						       {  
						            temp_obj.push(i);  
						        }  
						    } 
						    var recordCount = djmxStore.getCount();
						    djmxGrid.getStore(); 
						    var view = djmxGrid.getView();
						    
						    for (i = 1; i <= recordCount; i++) {
						        for (j = 1; j <=temp_obj.length ; j++) {
						           
						        	YdckdSheet.ActiveSheet.Cells(i + 2, j).Value = view.getCell(i-1,j-1).innerText;   
						        }  
						    } 
						   YdckdSheet.Visible = true; 
						} catch(e) {  
						if (ExcelSheet != undefined){  
						   alert('Error happened : ' + e);  
						   ExcelSheet.Quit();  
						}  
						   return '';  
						}
					}
					}]
				}]
				}]
			
		},{
			xtype : "hidden",
		    name : "lbid",
		    value : '0'
		}]
	});
	
	var DjxmObj = [
		{ name:'id',type:'string'},
		{ name:'djid',type:'string'},
		{ name:'riqi', type:'date', mapping : 'riqi.time', dateFormat : 'time'},
		{ name:'gyskhid',type:'int'},
		{ name:'owner',type:'string'},
		{ name:'lbid',type:'int'},
		{ name:'lbname',type:'string'},
		{ name:'spid',type:'string'},
		{ name:'spname',type:'string'},
		{ name:'spdw',type:'string'},
		{ name:'spxinghao',type:'string'},
		{ name:'sl',type:'int'},
		{ name:'kcsl',type:'int'}
		

	];
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
	    fields: DqkcObj,
	    autoload:true
	});
	
	var djmxStore = new Ext.data.JsonStore({
	    url: "../tongji_findSpxstj.do",
	    root: 'root',
	    totalProperty: 'total',
	    fields: DjxmObj,
	    sortInfo: {field: "riqi", direction: "DESC"}
	    
	    
	});

    var djmxGrid = new Ext.grid.GridPanel({
        store: djmxStore,
        cm: new Ext.grid.ColumnModel({
			defaults: {	menuDisabled : true},
			columns:[new Ext.grid.RowNumberer(),
	            {header: '单号', width: 120, sortable:true, align:'center', dataIndex: 'djid'},
	            {header: '日期', width: 80, sortable:true, align:'center', renderer : Ext.util.Format.dateRenderer('Y-m-d'),  dataIndex: 'riqi'},
				{header: '保管人', width: 120, sortable:true, dataIndex: 'owner'},
				{header: '耗材编号', width: 80, sortable:true, dataIndex: 'spid'},
				{header: '耗材名称', width: 130, sortable:true, dataIndex: 'spname'},
				{header: '耗材型号', width: 80, sortable:true, dataIndex: 'spxinghao'},
				{header: '耗材类别', width: 80, sortable:true, dataIndex: 'lbname'},
				{header: '数量', width: 60, sortable:true, align:'center', dataIndex: 'sl'},				
				{header: '库存数量', width: 60, sortable:true, align:'center', dataIndex: 'kcsl'},
				{header: '单位', width: 60, sortable:true, dataIndex: 'spdw'}]
				
        }),
        
        stripeRows: true,
        columnLines : true,
        margins:'10 20 0 20',
        style:'border:1px solid',
		region:'center',
        iconCls:''
        
        	
    });

	
	//布局
    new Ext.Viewport({
		layout:'fit',
		items:[{
			frame:true,
			title:'耗材出库统计',
			iconCls:'menu-41',
			layout:'border',
			items:[djmxForm,djmxGrid]
		}],
		listeners:{
			render:function(){
    		
    		djmxStore.load();
    		kcspStore.load();
	
		}
	}
    });
});