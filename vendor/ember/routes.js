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
  marker = "AfterModel:" + marker;
  InitializerRecorder.afterModels.push(marker);
  InitializerRecorder.all.push(marker);
};

QUnit.asyncTest("Route的顺序由外到里依次执行", function(assert) {
  expect(2);

  // QUnit.stop();
  setTimeout(function() {
    var routes = ['application', 'posts', 'posts/new'];
    var prefixedRoutes = prefixRoutes(routes);
    assert.deepEqual(InitializerRecorder.routes, prefixedRoutes);

    var bfeModels = ['application'];
    var prefixedBfeModels = prefixBeforeModels(bfeModels);
    assert.deepEqual(InitializerRecorder.beforeModels, prefixedBfeModels)

    QUnit.start();
  });
});

QUnit.asyncTest("Route的顺序由外到里依次执行", function(assert) {
  expect(3);
  // QUnit.stop();
  setTimeout(function() {
    var bfeModels = ['application', 'posts', 'posts/new'];
    var prefixedBfeModels = prefixBeforeModels(bfeModels);
    assert.deepEqual(InitializerRecorder.beforeModels, prefixedBfeModels);

    var afeModels = ['application', 'posts', 'posts/new'];
    var prefixedafeModels = prefixAfterModels(afeModels);
    assert.deepEqual(InitializerRecorder.afterModels, prefixedafeModels);

    var all = [
      'Route:application', 'Route:posts', 'Route:posts/new',
      'BeforeModel:application', 'AfterModel:application',
      'BeforeModel:posts', 'AfterModel:posts',
      'BeforeModel:posts/new', 'AfterModel:posts/new'
    ];
    assert.deepEqual(InitializerRecorder.all, all);

    QUnit.start();
  }, 5000);
});


function prefix(pre, items) {
  return items.map(function (item) {
    return pre + ':' + item;
  });
}

function prefixRoutes (items) {
  return prefix('Route', items);
}

function prefixModels (items) {
  return prefix('Model', items);
}

function prefixBeforeModels (items) {
  return prefix('BeforeModel', items);
}

function prefixAfterModels (items) {
  return prefix('AfterModel', items);
}


// setupController running order?
// controller single instance?
// component mutiple instances?
// store relationship?

