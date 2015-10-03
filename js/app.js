//Custom control
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: 'green',
    cornerSize: 12,
    padding: 5
});
jQuery(function ($) {
    //console.info("Ready");
    var pattern1 = "http://localhost/github/pattern/images/argyle.png",
        pattern2 = "http://localhost/github/pattern/images/arabesque.png";
    var textPattern1 = "http://localhost/github/pattern/images/text1.jpg",
        textPattern2 = "http://localhost/github/pattern/images/text2.jpg",
        textPattern3 = "http://localhost/github/pattern/images/text3.jpg",
        textPattern4 = "http://localhost/github/pattern/images/text4.jpg",
        textPattern5 = "http://localhost/github/pattern/images/text5.jpg";
    var image = textPattern1;
    //Global for debug
    window.canvas = new fabric.Canvas("canvas");
    window.canvasExport = new fabric.Canvas("canvas_export");
    window.imageExport = $("#img_result");
    var rect = new fabric.Rect({
        width: canvas.width,
        height: canvas.height,
        top: 0,
        left: 0,
        fill: 'orange',
        object_type: "pattern_color"
    });
    //rect.scaleToWidth(canvas.getWidth());
    //canvas.add(rect);
    rect.setCoords();
    var rect2 = new fabric.Rect({
        width: canvas.width,
        height: canvas.height,
        top: 0,
        left: 0,
        object_type: "pattern"
    });
    //canvas.add(rect2);
    rect2.setCoords();
    var groupPatternColor = new fabric.Group([rect, rect2], {
    	selectable: false
    });
    canvas.add(groupPatternColor);
    //Add circle objects
    var circle = new fabric.Circle({
        radius: 40,
        fill: '#006699',
        left: 100,
        top: 100
    });
    var circle1 = new fabric.Circle({
        radius: 40,
        fill: '#002266',
        left: 130,
        top: 140
    });
    var triangle = new fabric.Triangle({
        width: 50,
        height: 60,
        fill: 'yellow',
        left: 50,
        top: 50
    });
	
    var group1 = new fabric.Group([circle, circle1, triangle], {
    	top: 10,
        left: 10
    });
    canvas.add(group1);
    //Add a text with pattern
    var text = new fabric.Text("Hello X3", {
        top: 200,
        left: 10,
        fontSize: 72,
        fontFamily: "playball"
    });
    canvas.add(text);
    fabric.util.loadImage(textPattern4, function(img) {
        text.setPatternFill({
            source: img,
            repeat: 'repeat'
        });   
        canvas.renderAll();
    });
    //canvas.add(circle, circle1, triangle);
    //Add a native image
    fabric.Image.fromURL(image, function(oImg) {
        oImg.set({
            width: 150,
            height: 150,
            top: 10,
            left: 250
        });
        canvas.add(oImg);
    });
    function toggleColor() {
        var color = "orange";
        if (rect.getFill() == color) {
            color = "violet";
        }
        rect.setFill(color);
        canvas.renderAll();
    }

    function togglePattern() {
        var src = pattern1,
            rect2Fill = rect2.getFill();
        //console.info(rect2Fill);
        if (rect2.getFill().source && rect2.getFill().source.currentSrc == src) {
            src = pattern2;
        }
        fabric.util.loadImage(src, function (img) {
            rect2.setPatternFill({
                source: img,
                repeat: 'repeat'
            });
            canvas.renderAll();
        });
    }
    togglePattern();
    //User actions
    $("#change_pattern").click(function () {
        togglePattern();
    });
    $("#change_color").click(function () {
        toggleColor();
    });
    $("#move_forward").click(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.bringForward();
            canvas.renderAll();
        }
    });
    $("#move_backward").click(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
		var objIndex = canvas.getObjects().indexOf(activeObj);
            //console.info(canvas._objects, objIndex);
            //If canvas have pattern, then don't allow sending object to behind the pattern
            if(objIndex <= 1) return;
            activeObj.sendBackwards();
            canvas.renderAll();
        }
    });
    $("#clone_canvas").click(function() {
        var designJson = JSON.stringify(canvas.toJSON());
        var newCanvas = new fabric.Canvas();
        newCanvas.setWidth(canvas.width);
        newCanvas.setHeight(canvas.height);
        newCanvas.loadFromJSON(designJson, function() {
            
            canvasExport.loadFromJSON(designJson, canvasExport.renderAll.bind(canvasExport),function(o, object) {
                // `o` = json object
                // `object` = fabric.Object instance
            });
            imageExport.attr("src", newCanvas.toDataURL());
        });
        /*canvasExport.loadFromJSON(designJson, canvasExport.renderAll.bind(canvasExport),function(o, object) {
            // `o` = json object
            // `object` = fabric.Object instance
        });
        imageExport.attr("src", canvasExport.toDataURL());*/
    });
});