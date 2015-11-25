var Curve;

Curve = function() {
  this.samples = [];
  this.control_points = [];
  this.distances = [];
};

Curve.interPoint = function(p1, p2, t) {
  var r0, r1;
  r0 = p1[0] + t * (p2[0] - p1[0]);
  r1 = p1[1] + t * (p2[1] - p1[1]);
  return [r0, r1];
};

Curve.rEval = function(cps, t) {
  var i, j, midpoints, ref;
  if (cps.length === 2) {
    return Curve.interPoint(cps[0], cps[1], t);
  }
  midpoints = [];
  for (i = j = 0, ref = cps.length - 2; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
    midpoints.push(Curve.interPoint(cps[i], cps[i + 1], t));
  }
  return Curve.rEval(midpoints, t);
};

Curve.prototype["eval"] = function(t) {
  return Curve.rEval(this.control_points, t);
};

Curve.diff = function(a, b) {
  return Math.pow(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2), .5);
};

Curve.tolerance = .1;

Curve.prototype.rResample = function(t0, t1) {
  var differenceBetweenRealAndApproximated, p0, p1, pLinearMid, pm, tm;
  tm = t0 + .5 * (t1 - t0);
  p0 = this["eval"](t0);
  p1 = this["eval"](t1);
  pm = this["eval"](tm);
  pLinearMid = [];
  pLinearMid[0] = p0[0] + .5 * (p1[0] - p0[0]);
  pLinearMid[1] = p0[1] + .5 * (p1[1] - p0[1]);
  differenceBetweenRealAndApproximated = Curve.diff(pm, pLinearMid);
  if (differenceBetweenRealAndApproximated < Curve.tolerance) {
    return [p0, p1];
  } else {
    return [p0].concat(this.rResample(t0, tm), this.rResample(tm, t1), [p1]);
  }
};

Curve.prototype.resample = function() {
  'use strict';
  var i, j, k, ref, ref1, t;
  console.log("controlPoints: " + this.control_points);
  t = this;
  this.samples = this.rResample(0, 1);
  this.distances = [];
  console.log("samples: " + this.samples);
  this.distances = [];
  for (i = j = 1, ref = this.samples.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
    console.log("samples a and b:");
    console.log(this.samples[i][0], this.samples[i + 1][0]);
    this.distances.push(Curve.diff(this.samples[i], this.samples[i + 1]));
  }
  this.totalDistance = 0;
  this.agDistances = [0];
  console.log("distances: " + (JSON.stringify(this.distances)));
  for (i = k = 1, ref1 = this.samples.length; 1 <= ref1 ? k < ref1 : k > ref1; i = 1 <= ref1 ? ++k : --k) {
    this.totalDistance += this.distances[i];
    this.agDistances.push(this.totalDistance);
  }
  console.log(this.agDistances);
  console.log(this.totalDistance);
};

Curve.prototype.arclenToU = function() {};
