<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.cxstock.biz.power.dto.UserDTO"%>
<%UserDTO userInfo=(UserDTO)session.getAttribute("userInfo");%>
<html>
<head>
	<meta name="renderer"  http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1"/>
<!-- 	content="webkit" -->
  	<title>耗材出库</title>
    <link rel="stylesheet" type="text/css" href="../../ext/resources/css/ext-all.css">
    <link rel="stylesheet" type="text/css" href="../../css/ext-icon.css">
    <script type="text/javascript">
	     window.log_id="<%=userInfo.getUserid()%>";<%--!--%>
	     window.log_name="<%=userInfo.getUsername()%>";<%--!--%>
	</script>
    <script type="text/javascript" src="../../ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../../ext/ext-all.js"></script>
    <script type="text/javascript" src="../../ext/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="../../ext/ux/SearchField.js"></script>
	<script type="text/javascript" src="../../dist/json2.js"></script>
	<script type="text/javascript" src="../../dist/polyfill.min.js"></script>
	<script type="text/javascript" src="../../dist/FileSaver.js"></script>
	<script type="text/javascript" src="../../dist/Blob.js"></script>
    <script type="text/javascript" src="../../dist/jszip.js"></script>
	<script type="text/javascript" src="../../dist/xlsx1.js"></script>
    <script type="text/javascript" src="spxx.js"></script>
    <script type="text/javascript" src="chuku.js"></script>
  </head>
  <body>
  </body>
</html>