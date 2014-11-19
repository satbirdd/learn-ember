window.Route = {
  routes: []
};

Route.push = function (route) {
  Route.routes.push(route);
};

setTimeout(function () {

});

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.asyncTest( "asynchronous test: one second later!", function( assert ) {
  expect( 1 );

  setTimeout(function() {
    assert.deepEqual(['application'], Route.routes);
    QUnit.start();
  });
});
