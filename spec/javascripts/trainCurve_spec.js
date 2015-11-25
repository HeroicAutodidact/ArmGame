describe("CurveCache", function() {
  var acc, posArrEq;
  posArrEq = function(a, b) {
    var i;
    if (a.length !== b.length) {
      return false;
    }
    for (i in a) {
      if (!(a[i][0] === b[i][0] && a[i][1] === b[i][1])) {
        return false;
      }
    }
    return true;
  };
  acc = void 0;
  beforeEach(function() {
    return acc = new CurveCache;
  });
  it("has methods and attributes I would expect it to ", function() {
    expect(acc.samples).toBeDefined();
    expect(acc.control_points).toBeDefined();
    expect(typeof acc["eval"]).toBe("function");
    expect(typeof acc.arclenToU).toBe("function");
    return expect(typeof acc.resample).toBe("function");
  });
  describe("interPoint", function() {
    return it("should give an expected value between points", function() {
      return expect(CurveCache.interPoint([1, 1], [2, 2], .7)).toEqual([1.7, 1.7]);
    });
  });
  describe("the eval method", function() {
    beforeEach(function() {
      acc.control_points = [[0, 0], [0, 1], [1, 1], [1, 0]];
      return acc.resample();
    });
    it("should return the first and last cps at t=0 and t=1", function() {
      expect(acc["eval"](0)).toEqual([0, 0]);
      return expect(acc["eval"](1)).toEqual([1, 0]);
    });
    return it("should have a sensible value at t=.5", function() {
      return expect(acc["eval"](.5)).toEqual([.5, .75]);
    });
  });
  return describe("the resample method", function() {
    return it("should leave the acc with an array named samples of size-2 arrays", function() {
      acc.control_points = [[0, 0], [0, 100], [100, 100], [100, 0]];
      acc.resample();
      return console.log(acc.samples);
    });
  });
});
