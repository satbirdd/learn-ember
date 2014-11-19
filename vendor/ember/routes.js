window.Route = {
  routes: []
};

Route.push = function (route) {
  Route.routes.push(route);
};

QUnit.asyncTest( "asynchronous test: one second later!", function( assert ) {
  expect( 1 );

  setTimeout(function() {
    assert.deepEqual(Route.routes, ['application', 'index']);
    QUnit.start();
  });
});
