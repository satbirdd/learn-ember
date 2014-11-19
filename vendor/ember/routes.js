window.Routes = {
  routes: []
};

Routes.push = function (route) {
  Routes.routes.push(route);
};

QUnit.asyncTest("Route的顺序由外到里依次执行", function( assert ) {
  expect( 1 );

  setTimeout(function() {
    assert.deepEqual(['application', 'posts'], Routes.routes);
    QUnit.start();
  });
});
