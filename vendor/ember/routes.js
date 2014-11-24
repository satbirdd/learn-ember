window.InitializerRecorder = {
  routes: [],
  // models: [],
  beforeModels: [],
  afterModels: []
};

InitializerRecorder.pushRoute = function (route) {
  InitializerRecorder.routes.push(route);
};

InitializerRecorder.pushModels = function (model) {
  InitializerRecorder.models.push(model);
};

InitializerRecorder.pushBeforeModel = function (marker) {
  InitializerRecorder.beforeModels.push(marker);
};

InitializerRecorder.pushAfterModel = function (marker) {
  InitializerRecorder.afterModels.push(marker);
};

QUnit.asyncTest("Route的顺序由外到里依次执行", function(assert) {
  expect(1);

  setTimeout(function() {
    assert.deepEqual(InitializerRecorder.routes, ['application', 'posts', 'posts/new']);
    // assert.deepEqual(InitializerRecorder.beforeModels, ['application', 'posts', 'posts/new']);
    // assert.deepEqual(InitializerRecorder.afterModels, ['application', 'posts', 'posts/new']);
    QUnit.start();
  });
});

// setupController running order?
// controller single instance?
// component mutiple instances?
// store relationship?

