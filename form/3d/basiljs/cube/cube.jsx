// @includepath "~/Documents/;%USERPROFILE%Documents"; // eslint-disable-line
// @include "basiljs/bundle/basil.js"; // eslint-disable-line
// based on this flash tutorial
//  Scripting 3D in Flash
//  by senocular
// https://www.kirupa.com/developer/actionscript/3dindex.htm
//
//  TODO: expolore the tutorial even more (e.g. camera)
//
var pw = 200; // for easier handling
var ph = 200; // for easier handling
// see https://en.wikipedia.org/wiki/Focal_length
var focalLength = 300;
var camera = {
  x: -100,
  y: -150,
  z: -400,
  rotation: 0
};
/**
 * creates a 3D point
 * @param  {Number} x the x location
 * @param  {Number} y the y location
 * @param  {Number} z the z location
 * @return {Object}   an Object with {x:Nmber, y:Number, z:Number}
 */
var point = function(x, y, z) {
  var p = {};
  p.x = x;
  p.y = y;
  p.z = z;
  return p;
};
/**
 * Converts a 3D point Object to screen coordiantes
 * @param  {Object} pointIn3D an Object created by the point function
 * @return {Object} an Object with {x:Number, y:Number}
 */
var toScreen = function(pointIn3D) {
  var pointIn2D = {};
  pointIn3D.x -= camera.x;
  pointIn3D.y -= camera.y;
  pointIn3D.z -= camera.z;
  var angle = Math.atan2(pointIn3D.z, pointIn3D.x);
  var radius = Math.sqrt(pointIn3D.x * pointIn3D.x + pointIn3D.z * pointIn3D.z);
  pointIn3D.x = Math.cos(angle + camera.rotation) * radius;
  pointIn3D.z = Math.sin(angle + camera.rotation) * radius;
  var scaleRatio = focalLength / (focalLength + pointIn3D.z);
  pointIn2D.x = pointIn3D.x * scaleRatio;
  pointIn2D.y = pointIn3D.y * scaleRatio;
  return pointIn2D;
};

function cube(x, y, z, w, h, d) {
  points3D = [
    point((-w / 2) + x, (-h / 2) + y, (-d) + z),
    point((w / 2) + x, (-h / 2) + y, (-d) + z),
    point((w / 2) + x, (-h / 2) + y, (d) + z),
    point((-w / 2) + x, (-h / 2) + y, (d) + z),
    point((-w / 2) + x, (h / 2) + y, (-d) + z),
    point((w / 2) + x, (h / 2) + y, (-d) + z),
    point((w / 2) + x, (h / 2) + y, (d) + z),
    point((-w / 2) + x, (h / 2) + y, (d) + z)
  ];
  var points2D = []; // will hold the 2D points
  // convert them from 3D to 2D
  for (var i = 0; i < points3D.length; i++) {
    var p = points3D[i];
    points2D[i] = toScreen(p);
  }
  var items = [];
  // top shape
  b.beginShape(b.CLOSE);
  b.vertex(points2D[0].x, points2D[0].y + (Math.random() * 10) - 10);
  // b.text('0',points2D[0].x, points2D[0].y,20,20);
  b.vertex(points2D[1].x, points2D[1].y + (Math.random() * 10) - 10);
  // b.text('1',points2D[1].x, points2D[1].y,20,20);
  b.vertex(points2D[2].x, points2D[2].y + (Math.random() * 10) - 10);
  // b.text('2',points2D[2].x, points2D[2].y,20,20);
  b.vertex(points2D[3].x, points2D[3].y + (Math.random() * 10) - 10);
  // b.text('3',points2D[3].x, points2D[3].y,20,20);
  var top = b.endShape();
  // draw the bottom plane
  b.beginShape(b.CLOSE);
  b.vertex(points2D[4].x, points2D[4].y);
  // b.text('4',points2D[4].x, points2D[4].y,20,20);
  b.vertex(points2D[5].x, points2D[5].y);
  // b.text('5',points2D[5].x, points2D[5].y,20,20);
  b.vertex(points2D[6].x, points2D[6].y);
  // b.text('6',points2D[6].x, points2D[6].y,20,20);
  b.vertex(points2D[7].x, points2D[7].y);
  // b.text('7',points2D[7].x, points2D[7].y,20,20);
  var bottom = b.endShape(); //
  // // front
  b.beginShape(b.CLOSE);
  b.vertex(points2D[0].x, points2D[0].y);
  b.vertex(points2D[1].x, points2D[1].y);
  b.vertex(points2D[5].x, points2D[5].y);
  b.vertex(points2D[4].x, points2D[4].y);
  var front = b.endShape(); //
  // // back
  b.beginShape(b.CLOSE);
  b.vertex(points2D[3].x, points2D[3].y);
  b.vertex(points2D[2].x, points2D[2].y);
  b.vertex(points2D[6].x, points2D[6].y);
  b.vertex(points2D[7].x, points2D[7].y);
  var back = b.endShape(); //
  // left
  b.beginShape(b.CLOSE);
  b.vertex(points2D[0].x, points2D[0].y);
  b.vertex(points2D[3].x, points2D[3].y);
  b.vertex(points2D[7].x, points2D[7].y);
  b.vertex(points2D[4].x, points2D[4].y);
  var left = b.endShape(); //
  // right
  b.beginShape(b.CLOSE);
  b.vertex(points2D[1].x, points2D[1].y);
  b.vertex(points2D[2].x, points2D[2].y);
  b.vertex(points2D[6].x, points2D[6].y);
  b.vertex(points2D[5].x, points2D[5].y);
  var right = b.endShape(); //
  front.bringToFront();
  top.sendToBack();
  bottom.sendToBack();
  left.sendToBack();
  right.sendToBack();
  back.sendToBack();
  return [top, bottom, front, back, left, right];
}

function axis() {
  var xplus3D = [point(0, 0, 0), point(200, 0, 0)];
  var xminus3D = [point(0, 0, 0), point(-200, 0, 0)];
  var yplus3D = [point(0, 0, 0), point(0, 200, 0)];
  var yminus3D = [point(0, 0, 0), point(0, -200, 0)];
  var zplus3D = [point(0, 0, 0), point(0, 0, 200)];
  var zminus3D = [point(0, 0, 0), point(0, 0, -200)];
  var convertToScreen = function(p3d) {
    var p2d = []; // will hold the 2D points
      // convert them from 3D to 2D
    for (var i = 0; i < p3d.length; i++) {
      var p = p3d[i];
      p2d[i] = toScreen(p);
    } // end loop
    return p2d;
  }; // end convert
  var xplus2D = convertToScreen(xplus3D);
  var xminus2D = convertToScreen(xminus3D);
  var yplus2D = convertToScreen(yplus3D);
  var yminus2D = convertToScreen(yminus3D);
  var zplus2D = convertToScreen(zplus3D);
  var zminus2D = convertToScreen(zminus3D);
  var line1 = b.line(xplus2D[0].x, xplus2D[0].y, xplus2D[1].x, xplus2D[1].y);
  var txt1 = b.text('+x', xplus2D[1].x, xplus2D[1].y, 20, 20);
  var line2 = b.line(xminus2D[0].x, xminus2D[0].y, xminus2D[1].x, xminus2D[1].y);
  var txt2 = b.text('-x', xminus2D[1].x, xminus2D[1].y, 20, 20);
  var line3 = b.line(yplus2D[0].x, yplus2D[0].y, yplus2D[1].x, yplus2D[1].y);
  var txt3 = b.text('+y', yplus2D[1].x, yplus2D[1].y, 20, 20);
  var line4 = b.line(yminus2D[0].x, yminus2D[0].y, yminus2D[1].x, yminus2D[1].y);
  var txt4 = b.text('-y', yminus2D[1].x, yminus2D[1].y, 20, 20);
  var line5 = b.line(zplus2D[0].x, zplus2D[0].y, zplus2D[1].x, zplus2D[1].y);
  var txt5 = b.text('+z', zplus2D[1].x, zplus2D[1].y, 20, 20);
  var line6 = b.line(zminus2D[0].x, zminus2D[0].y, zminus2D[1].x, zminus2D[1].y);
  var txt6 = b.text('-z', zminus2D[1].x, zminus2D[1].y, 20, 20);
  return [line1, line2, line3, line4, line5, line6, txt1, txt2, txt3, txt4, txt5, txt6];
}

function draw() {
  b.clear(b.doc()); // clear the current document
  b.units(b.MM); // we want to print. use MM instead of default pixels
  var doc = b.doc(); // a reference to the current document
  // set some preferneces of the document for better handling
  doc.documentPreferences.properties = {
    pageWidth: pw,
    pageHeight: ph
  }; // set the page size
  doc.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN; // upper left corner
  // ----------
  // main code goes here
  // define some 3D points
  b.noFill();
  // var makeACube = function (x,y,z,w,h,d){
  // b.pushMatrix(); // push the matrix
  // b.translate(x, y); // to the center of the screen
  // var c = cube(x,y,z,w,h,d);
  // draw the top plane. Could also be a polygon
  // b.popMatrix();// reset the matrix
  // return c;
  // }
  // ~   b.pushMatrix(); // push the matrix
  // ~   b.translate(b.width/2, b.height/2); // to the center of the screen
  // ~   var planes = cube(50,100,100);
  // draw the top plane. Could also be a polygon
  // ~   b.popMatrix();// reset the matrix
  doc.pages[0].groups.add(cube(b.width / 2, b.height / 2, -200, 50, 50, 50));
  doc.pages[0].groups.add(cube(b.width / 2, -(b.height / 2), -200, 50, 50, 50));
  // doc.pages[0].groups.add(makeACube (b.width/4,b.height/2, 50,50,50));
  // doc.pages[0].groups.add(makeACube ((b.width/4)*3,b.height/2, 50,50,100));
  // b.pushMatrix();
  // b.translate(b.width/2,b.height/2);
  b.fill(0);
  doc.pages[0].groups.add(axis());
  // b.popMatrix();
  // ----------
  var fname = File($.fileName).parent.fsName + '/' + ($.fileName.split('/')[$.fileName.split('/').length - 1]).split('.')[0] + '.indd';
  // b.println(fname);
  doc.save(fname, false, 'basil', true);
  b.savePNG('out.png');
}
b.go();
