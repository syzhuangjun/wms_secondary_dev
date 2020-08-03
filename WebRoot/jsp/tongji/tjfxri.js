Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	var dataLoad = function(){
	    var startdate = Ext.getCmp("startdate").getValue().format("Y-m-d");
	    var enddate = Ext.getCmp("enddate").getValue().format("Y-m-d");
		Ext.Ajax.request({
			url:"tongji_findTjfxRi.do",  
			params:{startdate:startdate,enddate:enddate},
			success:function (response){
				var Result=Ext.decode(response.responseText);
				var fData=Result.fData;
				tjfxFlash.setChartData(fData, true);
				var gData=Result.gData;
	            tjfxGrid.store.loadData(gData);
			}
		});
	};
	
	var date = new Date();
	date.setDate(date.getDate()-6);
	//查询表单
	var tjfxForm = new Ext.Panel({
		region:'north',
		height: 80,
		border : false,
		layout : 'form',
		padding : '5 20 0 20',
		items:[{
			id:"tjfxfieldset",
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
					text:'统计时间:'
				},{
					id:'startdate',
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
					id:'enddate',
					width:100,
					xtype:"datefield",
					name:'enddate',
					format:'Y-m-d',
					allowBlank : false,
					value:new Date()
				},{
					width:30
				},{
					columnWidth:0.2,
					items:[{
						width:75,
						xtype:"button",
						text:'查询',
						handler:function(){
							dataLoad();
						}
					}]
				}]
			}]
		}]
	});
	
    var tjfxFlash = new Ext.ux.Chart.Fusion.Panel({
		collapsible:false,
		region:'center',
		chartCfg:{
			params:{flashVars:{debugMode:0,lang:'EN'}}
		},
		autoScroll:true,
		chartURL:'../../ext/charts/Column3D.swf',//定义图表显示类型，例如：直方，饼图等 dataXML:strXml,
		margins:'10 20 0 20',
		style:'border:1px solid'
	});
	
	
	
	//布局
    new Ext.Viewport({
		layout:'fit',
		items:[{
			frame:true,
			title:'出库分析',
			iconCls:'menu-45',
			layout:'border',
			items:[tjfxForm,tjfxFlash]
		}],
		listeners:{
			render:function(){
				dataLoad();
			}
		}
	});
	
});