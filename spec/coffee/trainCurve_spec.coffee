describe "CurveCache", ->
	posArrEq = (a,b)->
		if a.length != b.length
			return false
		for i of a
			unless a[i][0] == b[i][0] and a[i][1]==b[i][1]
				return false
		return true


	acc = undefined

	beforeEach ->
		acc = new CurveCache

	it "has methods and attributes I would expect it to ", ->
		expect(acc.samples).toBeDefined()
		expect(acc.control_points).toBeDefined()
		expect(typeof acc.eval).toBe "function"
		expect(typeof acc.arclenToU).toBe "function"
		expect(typeof acc.resample).toBe "function"

	describe "interPoint", ->
		it "should give an expected value between points", ->
			expect(CurveCache.interPoint([1,1],[2,2],.7)).toEqual [1.7,1.7]

	describe "the eval method", ->
		beforeEach ->
			acc.control_points = [[0,0],[0,1],[1,1],[1,0]]
			acc.resample()

		it "should return the first and last cps at t=0 and t=1", ->
			expect(acc.eval(0)).toEqual [0,0]
			expect(acc.eval(1)).toEqual [1,0]

		it "should have a sensible value at t=.5", ->
			expect(acc.eval(.5)).toEqual [.5,.75]

	describe "the resample method", ->
		it "should leave the acc with an array named samples of size-2 arrays", ->
			acc.control_points = [[0,0],[0,100],[100,100],[100,0]]
			acc.resample()
			console.log acc.samples


