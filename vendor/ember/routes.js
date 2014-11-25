window.InitializerRecorder = {
  routes: [],
  models: [],
  beforeModels: [],
  afterModels: [],
  all: []
};

InitializerRecorder.pushRoute = function (route) {
  route = "Route:" + route;
  InitializerRecorder.routes.push(route);
  InitializerRecorder.all.push(route);
};

InitializerRecorder.pushModels = function (model) {
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
  marker = "AfterModel" + marker;
  InitializerRecorder.afterModels.push(marker);
  InitializerRecorder.all.push(marker);
};

QUnit.asyncTest("Route的顺序由外到里依次执行", function(assert) {
  expect(2);
  // QUnit.stop();
  setTimeout(function() {
    assert.deepEqual(InitializerRecorder.routes, ['application', 'posts', 'posts/new']);
    assert.deepEqual(InitializerRecorder.beforeModels, ['application'])
    debugger
    QUnit.start();
  });
});

QUnit.asyncTest("Route的顺序由外到里依次执行", function(assert) {
  expect(3);
  // QUnit.stop();
  setTimeout(function() {
    assert.deepEqual(InitializerRecorder.beforeModels, ['application', 'posts', 'posts/new']);
    assert.deepEqual(InitializerRecorder.afterModels, ['application', 'posts', 'posts/new']);
    assert.deepEqual(InitializerRecorder.all, [
      'application', 'posts', 'posts/new',
      'application', 'application',
      'posts', 'posts',
      'posts/new', 'posts/new'
    ])
    QUnit.start();
  }, 5000);
});


// setupController running order?
// controller single instance?
// component mutiple instances?
// store relationship?

