window.Route = {
  routes: []
};

Route.push = function (route) {
  Route.routes.push(route);
};

QUnit.asyncTest("Route的顺序由外到里依次执行", function(assert) {
  expect(1);

  setTimeout(function() {
    assert.deepEqual(Route.routes, ['application', 'posts', 'posts/new']);
    QUnit.start();
  });
});

// setupController running order?
// controller single instance?
// component mutiple instances?
// store relationship?

