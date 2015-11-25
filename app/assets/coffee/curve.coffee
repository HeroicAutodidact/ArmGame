Curve = ->
	@samples = []
	@control_points = []
	return

Curve.interPoint = (p1,p2,t) ->
	r0 = p1[0] + t*(p2[0] - p1[0])
	r1 = p1[1] + t*(p2[1] - p1[1])
	return [r0,r1]

Curve.rEval = (cps,t)->
	if cps.length is 2
		return Curve.interPoint(cps[0],cps[1],t)
	#recursive branch
	midpoints = []
	for i in [0..cps.length-2]
		midpoints.push Curve.interPoint(cps[i],cps[i+1],t)
	Curve.rEval(midpoints,t)

Curve::eval = (t)->
	Curve.rEval(@control_points,t)


Curve.tolerance = .1
Curve::rResample = (t0, t1)->
	tm = t0 + .5 * (t1-t0)
	p0 = @eval(t0)
	p1 = @eval(t1)
	pm = @eval(tm)
	pLinearMid = []
	pLinearMid[0] = p0[0] + .5 * (p1[0]-p0[0])
	pLinearMid[1] = p0[1] + .5 * (p1[1]-p0[1])
	differenceBetweenRealAndApproximated = Math.pow( Math.pow(pm[0]-pLinearMid[0],2)+Math.pow(pm[1]-pLinearMid[1],2), .5)
	if differenceBetweenRealAndApproximated < Curve.tolerance
		return [[p0,p1]]
	else
		return [p0].concat @rResample(t0,tm), @rResample(tm,t1), [p1]

Curve::resample = ->
	@samples = @rResample(0,1)
	return


Curve::arclenToU = ->
	return