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
        this.drawRectangle({x:100, y:100}, {x:500, y:400}, [0, 0, 0, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle({x:300, y:300}, 200, [0, 0, 0, 255], ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {

    }

    // ctx:          canvas context
    drawSlide3(ctx) {

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
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let numPoints = document.getElementById("sections").value;
        //console.log(numPoints);

        let pointArray = [];
        let degreeChange = 360.0 / numPoints;
        let degreeCounter = 0;
        let currentX = 0;
        let currentY = 0;
        console.log(Math.cos(30));

        for(let i = 0; i < numPoints; i++) {//get array of points
            console.log(degreeCounter);
            currentX = center.x + (radius * Math.cos(degreeCounter * (180 / Math.PI)));//this shit is in radians
            currentY = center.y + (radius * Math.sin(degreeCounter * (180 / Math.PI)));
            pointArray.push({x:currentX, y:currentY});
            degreeCounter += degreeChange;
        }

        console.log(pointArray);

        for(let i = 0; i < pointArray.length - 1; i++) {
            this.drawLine(pointArray[i], pointArray[i + 1], [0, 0, 0, 255], ctx);
        }
        this.drawLine(pointArray[0], pointArray[pointArray.length - 1], [0, 0, 0, 255], ctx);
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
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
