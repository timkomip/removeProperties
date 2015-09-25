QUnit.test( "object with array", function( assert ) {
    var obj = { a: [{ x: 1, y: 1}, { x: 2, y: 2} ]};
    assert.deepEqual(removeProperties(obj, ["x"]), { a: [{ y: 1 }, { y: 2} ]} );
});

QUnit.test( "parent object with no target props", function( assert ) {
    var obj = { a: 1, b: { x: 1 }};
    assert.deepEqual(removeProperties(obj, ["x"]), { a: 1, b: { } });
});

QUnit.test( "no nesting and input object is not touched", function( assert ) {
    var obj = { a: 2, b: 3, c: 4};
    assert.deepEqual(removeProperties(obj, ["c"]), { a: 2, b: 3 } );
    assert.deepEqual(removeProperties(obj, ["a"]), { b: 3, c: 4 } );
});

QUnit.test( "object with one nesting", function( assert ) {
    var obj = { a: 1, b: { a : 3, b: 4 }};
    assert.deepEqual(removeProperties(obj, ["a"]), { b: { b: 4 }} );
});

QUnit.test( "object with array", function( assert ) {
    var obj = { a: [{ x: 1, y: 1}, { x: 2, y: 2} ]};
    assert.deepEqual(removeProperties(obj, ["x"]), { a: [{ y: 1 }, { y: 2} ]} );
});

QUnit.test( "array of objects", function( assert ) {
    var obj = [{x: 1}, {x: 2}, {y: 2}];
    assert.deepEqual(removeProperties(obj, ["x"]), [{}, {}, {y: 2}]);
});

QUnit.test( "object with function", function( assert ) {
    var cleanObj = removeProperties({ name: "tom", getName: function () {} }, ["name"]);
    assert.equal(typeof cleanObj.getName, "function");
    assert.equal(typeof cleanObj.name, "undefined");
});

QUnit.test('a mixture of types for values', function (assert) {
    var today = new Date,
        regex = /[a-z]*/;
    var obj = {a: today, x: 'bad', b: regex};
    assert.deepEqual(removeProperties(obj, ['x']), {a: today, b: regex});
});

QUnit.test('passing a function', function (assert) {
    var fun = function () {};
    assert.equal(removeProperties(fun, ['a']), fun);
});

QUnit.test('removing multiple properties', function (assert) {
    var obj = {a: 1, x: 2, c: { x: 2, y: 12, b: 2}};
    assert.deepEqual(removeProperties(obj, ['x', 'y']), {a: 1, c: { b: 2}});
});

QUnit.test('much nesting', function (assert) {
    var obj = {a: 1, b: { x: 2, b: { x: 1, x: 3, c: { x: 1}}}};
    assert.deepEqual(removeProperties(obj, ['x', 'y']), {a: 1, b: { b: { c: { }}}});
});
