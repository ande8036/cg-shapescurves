class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
	let left_bottom = {x:100, y:100};
	let right_top = {x:500, y:400};

        this.drawRectangle(left_bottom, right_top, [0, 0, 0, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
	let center = {x:300, y:300};
	let radius = 200;

        this.drawCircle(center, radius, [0, 0, 0, 255], ctx);

	if(this.show_points == true) {//draw circle at points if true
            let degreeChange = Math.PI * 2 / this.num_curve_sections;
            let degreeCounter = 0;
            let currentX = 0;
            let currentY = 0;

            for(let i = 0; i < this.num_curve_sections; i++) {//get array of points
                //console.log(degreeCounter);
                currentX = center.x + (radius * Math.cos(degreeCounter));//this shit is in radians
                currentY = center.y + (radius * Math.sin(degreeCounter));
                
		this.drawCircle({x:currentX, y:currentY}, 10, [255, 0, 0, 255], ctx);

                degreeCounter += degreeChange;
            }
	}
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
	let pt0 = {x:300, y:300};
	let pt1 = {x:350, y:600};
	let pt2 = {x:700, y:300};
	let pt3 = {x:750, y:550};

	this.drawBezierCurve(pt0, pt1, pt2, pt3, [0, 0, 0, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
	this.drawRectangle({x:270, y:500}, {x:320, y:500}, [0, 0, 0, 255], ctx);//start of E
	this.drawRectangle({x:270, y:500}, {x:270, y:425}, [0, 0, 0, 255], ctx);
	this.drawRectangle({x:270, y:425}, {x:320, y:425}, [0, 0, 0, 255], ctx);
	this.drawRectangle({x:270, y:463}, {x:310, y:463}, [0, 0, 0, 255], ctx);//end of E

	this.drawRectangle({x:340, y:500}, {x:340, y:425}, [0, 0, 0, 255], ctx);//start of R
	this.drawBezierCurve({x:340, y:463}, {x:390, y:425}, {x:340, y:463}, {x:390, y:425}, [0, 0, 0, 255], ctx);
	this.drawBezierCurve({x:340, y:500}, {x:405, y:500}, {x:405, y:463}, {x:340, y:463}, [0, 0, 0, 255], ctx);//end of R

	this.drawCircle({x:435, y:480}, 5, [0, 0, 0, 255], ctx);//start of i
	let center = {x:435, y:480};
	let radius = 5;

	if(this.show_points == true) {//draw circle at points if true
            let degreeChange = Math.PI * 2 / this.num_curve_sections;
            let degreeCounter = 0;
            let currentX = 0;
            let currentY = 0;

            for(let i = 0; i < this.num_curve_sections; i++) {//get array of points
                //console.log(degreeCounter);
                currentX = center.x + (radius * Math.cos(degreeCounter));
                currentY = center.y + (radius * Math.sin(degreeCounter));
                
		this.drawCircle({x:currentX, y:currentY}, 10, [255, 0, 0, 255], ctx);

                degreeCounter += degreeChange;
            }
	}
	this.drawRectangle({x:435, y:463}, {x:435, y:425}, [0, 0, 0, 255], ctx);//end of i

	this.drawRectangle({x:480, y:500}, {x:480, y:425}, [0, 0, 0, 255], ctx);//start of K
	this.drawBezierCurve({x:480, y:463}, {x:530, y:500}, {x:480, y:463}, {x:530, y:500}, [0, 0, 0, 255], ctx);
	this.drawBezierCurve({x:480, y:463}, {x:530, y:425}, {x:480, y:463}, {x:530, y:425}, [0, 0, 0, 255], ctx);//end of K

	this.drawBezierCurve({x:130, y:330}, {x:155, y:405}, {x:130, y:330}, {x:155, y:405}, [0, 0, 0, 255], ctx);//start of A
	this.drawBezierCurve({x:155, y:405}, {x:180, y:330}, {x:155, y:405}, {x:180, y:330}, [0, 0, 0, 255], ctx);
	this.drawRectangle({x:130, y:368}, {x:180, y:368}, [0, 0, 0, 255], ctx);//end of A

	this.drawRectangle({x:200, y:330}, {x:200, y:405}, [0, 0, 0, 255], ctx);//start of N
	this.drawRectangle({x:250, y:330}, {x:250, y:405}, [0, 0, 0, 255], ctx);
	this.drawBezierCurve({x:200, y:405}, {x:250, y:330}, {x:200, y:405}, {x:250, y:330}, [0, 0, 0, 255], ctx);//end of N

	this.drawRectangle({x:270, y:330}, {x:270, y:405}, [0, 0, 0, 255], ctx);//start of D
	this.drawBezierCurve({x:270, y:405}, {x:330, y:405}, {x:330, y:330}, {x:270, y:330}, [0, 0, 0, 255], ctx);//end of D

	this.drawRectangle({x:340, y:405}, {x:390, y:405}, [0, 0, 0, 255], ctx);//start of E
	this.drawRectangle({x:340, y:405}, {x:340, y:330}, [0, 0, 0, 255], ctx);
	this.drawRectangle({x:340, y:330}, {x:390, y:330}, [0, 0, 0, 255], ctx);
	this.drawRectangle({x:340, y:368}, {x:380, y:368}, [0, 0, 0, 255], ctx);//end of E

	this.drawRectangle({x:410, y:405}, {x:410, y:330}, [0, 0, 0, 255], ctx);//start of R
	this.drawBezierCurve({x:410, y:368}, {x:460, y:330}, {x:410, y:368}, {x:460, y:330}, [0, 0, 0, 255], ctx);
	this.drawBezierCurve({x:410, y:405}, {x:475, y:405}, {x:475, y:368}, {x:410, y:368}, [0, 0, 0, 255], ctx);//end of R

	this.drawBezierCurve({x:530, y:405}, {x:470, y:415}, {x:470, y:368}, {x:505, y:368}, [0, 0, 0, 255], ctx);//start of S
	this.drawBezierCurve({x:505, y:368}, {x:540, y:368}, {x:540, y:320}, {x:480, y:330}, [0, 0, 0, 255], ctx);//end of S

	this.drawRectangle({x:550, y:405}, {x:600, y:405}, [0, 0, 0, 255], ctx);//start of E
	this.drawRectangle({x:550, y:405}, {x:550, y:330}, [0, 0, 0, 255], ctx);
	this.drawRectangle({x:550, y:330}, {x:600, y:330}, [0, 0, 0, 255], ctx);
	this.drawRectangle({x:550, y:368}, {x:590, y:368}, [0, 0, 0, 255], ctx);//end of E

	this.drawRectangle({x:620, y:330}, {x:620, y:405}, [0, 0, 0, 255], ctx);//start of N
	this.drawRectangle({x:670, y:330}, {x:670, y:405}, [0, 0, 0, 255], ctx);
	this.drawBezierCurve({x:620, y:405}, {x:670, y:330}, {x:620, y:405}, {x:670, y:330}, [0, 0, 0, 255], ctx);//end of N
	

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        this.drawLine({x:left_bottom.x, y:left_bottom.y}, {x:left_bottom.x, y:right_top.y}, [0,0,0,255], ctx);
        this.drawLine({x:left_bottom.x, y:left_bottom.y}, {x:right_top.x, y:left_bottom.y}, [0,0,0,255], ctx);
        this.drawLine({x:left_bottom.x, y:right_top.y}, {x:right_top.x, y:right_top.y}, [0,0,0,255], ctx);
        this.drawLine({x:right_top.x, y:right_top.y}, {x:right_top.x, y:left_bottom.y}, [0,0,0,255], ctx);

	if(this.show_points == true) {
	    this.drawCircle({x:left_bottom.x, y:left_bottom.y}, 10, [255, 0, 0, 255], ctx);
	    this.drawCircle({x:left_bottom.x, y:right_top.y}, 10, [255, 0, 0, 255], ctx);
	    this.drawCircle({x:right_top.x, y:left_bottom.y}, 10, [255, 0, 0, 255], ctx);
    	    this.drawCircle({x:right_top.x, y:right_top.y}, 10, [255, 0, 0, 255], ctx);
	}
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let numPoints = this.num_curve_sections;
        //console.log(numPoints);

        let pointArray = [];
        let degreeChange = Math.PI * 2 / numPoints;
        let degreeCounter = 0;
        let currentX = 0;
        let currentY = 0;
        //console.log(Math.cos(30));

        for(let i = 0; i < numPoints; i++) {//get array of points
            //console.log(degreeCounter);
            currentX = center.x + (radius * Math.cos(degreeCounter));
            currentY = center.y + (radius * Math.sin(degreeCounter));
            pointArray.push({x:currentX, y:currentY});

            degreeCounter += degreeChange;
        }

        //console.log(pointArray);

        for(let i = 0; i < pointArray.length - 1; i++) {
            this.drawLine(pointArray[i], pointArray[i + 1], color, ctx);
        }
        this.drawLine(pointArray[0], pointArray[pointArray.length - 1], color, ctx);
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let t = 0.0;
	let countValue = 1.0 / this.num_curve_sections;
	
	let pointArray = [];

	let currentX = 0;
	let currentY = 0;

	for(let i = 0; i < this.num_curve_sections + 1; i++) {
	    //console.log(t);
	    currentX = Math.pow((1 - t), 3) * pt0.x + 3 * Math.pow((1 - t), 2) * t * pt1.x + 3 * (1 - t) * (t*t) * pt2.x + Math.pow(t, 3) * pt3.x;
	    currentY = Math.pow((1 - t), 3) * pt0.y + 3 * Math.pow((1 - t), 2) * t * pt1.y + 3 * (1 - t) * (t*t) * pt2.y + Math.pow(t, 3) * pt3.y;
	
	    pointArray.push({x:currentX, y:currentY});
	
	    t += countValue;
	}

	//console.log(pointArray);

	for(let i = 0; i < pointArray.length - 1; i++) {
            this.drawLine(pointArray[i], pointArray[i + 1], color, ctx);
        }

	if(this.show_points == true) {
	    for(let i = 0; i < pointArray.length; i++) {
		this.drawCircle({x:pointArray[i].x, y:pointArray[i].y}, 10, [255, 0, 0, 255], ctx);
	    }
	    this.drawCircle({x:pt1.x, y:pt1.y}, 10, [0, 255, 0, 100], ctx);
	    this.drawCircle({x:pt2.x, y:pt2.y}, 10, [0, 255, 0, 100], ctx);
	}
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
