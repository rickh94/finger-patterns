// const halfStep = 30;
// const wholeStep = 2.5 * halfStep;
// const xStart = 50;
// drawPattern(xStart, [halfStep, wholeStep, wholeStep], 'finger-pattern-1-2');
// drawPattern(xStart, [wholeStep, halfStep, wholeStep], 'finger-pattern-2-3');
// drawPattern(xStart, [wholeStep, wholeStep, halfStep], 'finger-pattern-3-4');
// drawPattern(xStart - halfStep, [wholeStep, wholeStep, wholeStep], 'finger-pattern-whole');
// drawPattern(xStart, [halfStep, wholeStep + halfStep, halfStep], 'finger-pattern-half');
//
// function drawLine(ctx) {
//   ctx.moveTo(0, 50);
//   ctx.lineTo(300, 50);
// }
//
// function drawFinger(ctx, number, xCoordinate) {
//   ctx.fillText(number, xCoordinate - 5, 85);
//   return ctx.arc(xCoordinate, 50, 8, 0, 2 * Math.PI);
// }
//
// function drawPattern(start, pattern, id) {
//   const c = document.getElementById(id);
//   const ctx = c.getContext('2d');
//   ctx.beginPath();
//   ctx.font = "20px serif";
//   ctx.lineWidth = 2;
//   ctx.fillStyle = "black";
//   drawLine(ctx);
//   const finger1 = drawFinger(ctx, '1', start);
//   console.log(finger1);
//   drawFinger(ctx, '2', start + pattern[0]);
//   drawFinger(ctx, '3', start + pattern[0] + pattern[1]);
//   drawFinger(ctx, '4', start + pattern[0] + pattern[1] + pattern[2]);
//   setTimeout(() => {
//     finger1.fillStyle = 'red';
//     }, 1500
//   );
//   ctx.fill();
//   ctx.stroke();
// }

document.getElementById('finger-1-2-1').style.fill = 'red';
