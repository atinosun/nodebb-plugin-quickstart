"use strict";
var controllers = require('./lib/controllers'),

	plugin = {};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.
	//渲染模板页面的请求
	router.get('/admin/plugins/quickstart', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	//也是渲染模板页面， 当浏览器地址为上面的地址时，会调用下面这个接口来渲染页面
	router.get('/api/admin/plugins/quickstart', controllers.renderAdminPage);
	//通过下面这个路由来获取存到redis的信息
	router.get('/api/plugins/quickstart/categories', controllers.categoriesPage);
	
	router.get('/api/plugins/quickstart/', controllers.renderPage);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/quickstart',
		icon: 'fa-tint',
		name: 'Quickstart'
	});

	callback(null, header);
};

module.exports = plugin;
