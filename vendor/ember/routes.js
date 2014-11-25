window.InitializerRecorder = {
  routes: [],
  models: [],
  beforeModels: [],
  afterModels: [],
  setupControllers: [],
  all: []
};

var nodes = ['application', 'posts', 'posts/new'];

InitializerRecorder.pushRoute = function (route) {
  route = "Route:" + route;
  InitializerRecorder.routes.push(route);
  InitializerRecorder.all.push(route);
};

InitializerRecorder.pushModel = function (model) {
  model = "Model:" + model;
  InitializerRecorder.models.push(model);
  InitializerRecorder.all.push(model);
};

InitializerRecorder.pushBeforeModel = function (marker) {
  marker = "BeforeModel:" + marker;
  InitializerRecorder.beforeModels.push(marker);
  InitializerRecorder.all.push(marker);
};

InitializerRecorder.pushAfterModel = function (marker) {
  marker = "AfterModel:" + marker;
  InitializerRecorder.afterModels.push(marker);
  InitializerRecorder.all.push(marker);
};

InitializerRecorder.pushSetupController = function (marker) {
  marker = "SetupController:" + marker;
  InitializerRecorder.setupControllers.push(marker);
  InitializerRecorder.all.push(marker);
};


QUnit.module('初始化过程(首页为/post/new)，脚本执行阶段');
QUnit.asyncTest("Route的启动顺序,既各个route的init方法的执行顺序为：application  ->  posts  ->  posts/new", function(assert) {
  expect(1);

  // QUnit.stop();
  setTimeout(function() {
    var prefixedRoutes = prefixRoutes(nodes);
    assert.deepEqual(InitializerRecorder.routes, prefixedRoutes);
    QUnit.start();
  });
});

QUnit.asyncTest("application路由的beforeModel方法为同步调用，其他路由的beforeModel方法为异步调用，既：application的beforeModel方法为脚本执行与回调执行的（已知的）分界线", function(assert) {
  expect(1);

  // QUnit.stop();
  setTimeout(function() {
    var bfeModels = ['application'];
    var prefixed = prefixBeforeModels(bfeModels);
    assert.deepEqual(InitializerRecorder.beforeModels, prefixed)

    QUnit.start();
  });
});


QUnit.module('回调执行阶段(启动尚未完成)');
QUnit.asyncTest("各个route的beforeModel方法的执行顺序为：application -> posts -> posts/new", function(assert) {
  expect(1);

  setTimeout(function() {
    var prefixed = prefixBeforeModels(nodes);
    assert.deepEqual(InitializerRecorder.beforeModels, prefixed);
    QUnit.start();
  }, 1000);
});

QUnit.asyncTest("各个route的model方法的执行顺序为：application -> posts -> posts/new", function(assert) {
  expect(1);

  setTimeout(function() {
    var prefixed = prefixModels(nodes);
    assert.deepEqual(InitializerRecorder.models, prefixed);
    QUnit.start();
  }, 1);
});

QUnit.asyncTest("各个route的AfterModel方法的执行顺序为：application -> posts -> posts/new", function(assert) {
  expect(1);

  setTimeout(function() {
    var prefixed = prefixAfterModels(nodes);
    assert.deepEqual(InitializerRecorder.afterModels, prefixed);
    QUnit.start();
  }, 1);
});

QUnit.asyncTest("各个route的setupController方法的执行顺序为：application -> posts -> posts/new", function(assert) {
  expect(1);

  setTimeout(function() {
    var prefixed = prefixSetupControllers(nodes);
    assert.deepEqual(InitializerRecorder.setupControllers, prefixed);
    QUnit.start();
  }, 1);
});

QUnit.asyncTest("整个route内部的启动顺序为：application路由的init -> posts路由的init -> \
  posts/new路由的init -> application路由beforeModel -> （回调开始）application路由的model -> \
  application路由的afterModel -> posts路由的beforeModel -> posts路由的model -> \
  posts路由的afterModel -> application路由的setupController -> posts路由的setupController -> \
  posts/newne路由的setupController", function(assert) {
  expect(1);
  // QUnit.stop();
  setTimeout(function() {
    var all = [
      'Route:application', 'Route:posts', 'Route:posts/new',
      'BeforeModel:application', 'Model:application', 'AfterModel:application',
      'BeforeModel:posts', 'Model:posts', 'AfterModel:posts',
      'BeforeModel:posts/new', 'Model:posts/new', 'AfterModel:posts/new',
      'SetupController:application', 'SetupController:posts', 'SetupController:posts/new'
    ];
    assert.deepEqual(InitializerRecorder.all, all);

    QUnit.start();
  }, 1);
});


function prefix(pre, items) {
  return items.map(function (item) {
    return pre + ':' + item;
  });
}

['Route', 'BeforeModel', 'Model', 'AfterModel', 'SetupController'].forEach(
  function (hook, index) {
    this['prefix' + hook + 's'] = function (items) {
      return prefix(hook, items);
    }
  });


// setupController running order?
// controller single instance?
// component mutiple instances?
// store relationship?

