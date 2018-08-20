exports.run = async (bot, message, cmd, args, pdfcrowd, clientee) => {
      if (!args[0]) return message.reply("```>breakingnews | [headline] | [ticker] | [imageurl]```");
      let headline = args.join(' ');
      let ticker = args.join(' ');
      let imageurl = args.join(` `);
      if (!headline[0]) return message.channel.send(":x: estan malpuestos o son incorrectos, intentaaaXD");
      if (!ticker[0]) return message.channel.send(":x: estan malpuestos o son incorrectos, intentaaaXD");
      if (!imageurl[0]) return message.channel.send(":x: estan malpuestos o son incorrectos, intentaaaXD");
      function eventWindowLoaded() {
          canvasApp();
      }
      function drawImageProp(context, img, x, y, w, h, offsetX, offsetY) {

          if (arguments.length === 2) {
              x = y = 0;
              w = 1280;
              h = 720;
          }

          /// default offset is center
          offsetX = offsetX ? offsetX : 0.5;
          offsetY = offsetY ? offsetY : 0.5;

          /// keep bounds [0.0, 1.0]
          if (offsetX < 0) offsetX = 0;
          if (offsetY < 0) offsetY = 0;
          if (offsetX > 1) offsetX = 1;
          if (offsetY > 1) offsetY = 1;

          var iw = img.width,
              ih = img.height,
              r = Math.min(w / iw, h / ih),
              nw = iw * r,   /// new prop. width
              nh = ih * r,   /// new prop. height
              cx, cy, cw, ch, ar = 1;

          /// decide which gap to fill
          if (nw < w) ar = w / nw;
          if (nh < h) ar = h / nh;
          nw *= ar;
          nh *= ar;

          /// calc source rectangle
          cw = iw / (nw / w);
          ch = ih / (nh / h);

          cx = (iw - cw) * offsetX;
          cy = (ih - ch) * offsetY;

          /// make sure source rectangle is valid
          if (cx < 0) cx = 0;
          if (cy < 0) cy = 0;
          if (cw > iw) cw = iw;
          if (ch > ih) ch = ih;

          /// fill image in dest. rectangle
          context.drawImage(img, cx, cy, cw, ch, x, y, w, h);
      }

      function canvasApp() {

          let headline = args.join(' ');
          let ticker = args.join(' ');
          var img = new Image();

          var theCanvas = document.getElementById("canvasOne");
          var context = theCanvas.getContext("2d");


          var imageObj = new Image();
          imageObj.src = 'overlay.png';


          drawScreen();

          function drawScreen() {

              //Background
              context.fillStyle = "#222222";
              context.fillRect(0, 0, theCanvas.width, theCanvas.height);


              //Image
              if (img.src) {
                  drawImageProp(context, img);
              }

              //Live
              context.fillStyle = "rgba(194, 21, 15, 1.000)";
              context.fillRect(80, 40, 104, 60);

              context.font = "700 36px Signika";
              context.fillStyle = "#FFFFFF";
              context.fillText('LIVE', 96, 84);

              //Box
              context.fillStyle = "rgba(255,255,255,0.85)";
              context.fillRect(80, 510, 1200, 110);

              //Clock

              context.fillStyle = "#000";
              context.fillRect(80, 620, 100, 60);

              today = new Date();
              var m = today.getMinutes();
              var h = today.getHours();

              if (m < 10) {
                  m = "0" + m
              };

              context.font = "700 28px Signika";
              context.fillStyle = "#FFFFFF";
              context.fillText((h + ":" + m), 96, 660);

              //Breaking News Strap
              // Create gradient
              redgrd = context.createLinearGradient(0, 430, 0, 510);

              // Add colors
              redgrd.addColorStop(0.000, 'rgba(109, 36, 39, 1.000)');
              redgrd.addColorStop(0.015, 'rgba(224, 54, 44, 1.000)');
              redgrd.addColorStop(0.455, 'rgba(194, 21, 15, 1.000)');
              redgrd.addColorStop(0.488, 'rgba(165, 10, 1, 1.000)');
              redgrd.addColorStop(1.000, 'rgba(109, 36, 39, 1.000)');

              context.fillStyle = redgrd;
              context.fillRect(80, 430, 420, 80);

              context.font = "700 48px Signika";
              context.fillStyle = "#FFFFFF";
              context.fillText('BREAKING NEWS', 100, 488);

              //Text
              context.font = "700 72px Signika";
              context.fillStyle = "#000000";
              context.fillText(headline.toUpperCase(), 100, 590);

              //Ticker
              context.fillStyle = "#feeb1a";
              context.fillRect(180, 620, 1100, 60);

              context.font = "700 28px Signika";
              context.fillStyle = "#000";
              context.fillText(ticker.toUpperCase(), 200, 660);

              //Logo
              context.shadowColor = "rgba(0,0,0,0.7)";
              context.shadowOffsetX = 0;
              context.shadowOffsetY = 0;
              context.shadowBlur = 6;
              context.globalAlpha = 0.6;
              //context.drawImage(imageObj, 560, 20);
              context.font = "400 36px Signika";
              context.fillStyle = "#fff";
              context.fillText('breakyourownnews.com', 860, 80);
              context.globalAlpha = 1;
              context.shadowBlur = 0;
          }
      }
          function handleImage(e) {
              var reader = new FileReader();
              reader.onload = function (event) {
                  img.onload = function () {
                      drawScreen();
                  }
                  img.src = event.target.result;
              }
              reader.readAsDataURL(e.target.files[0]);
          }
          if (cmd === `${prefix}breakingnews | ${headline} | ${ticker} | ` && imageurl === `http://`) {
              eventWindowLoaded();
              message.channel.send(`:speech_balloon: Enviando,,,`).then(msg => msg.delete(4000));
              try {
                clientee.setOutputFormat("png");
              } catch(why) {
                console.error("Pdfcrowd Error: " + why);
                console.error("Pdfcrowd Error Code: " + why.getCode());
                console.error("Pdfcrowd Error Message: " + why.getMessage());
                process.exit(1);
              }
              clientee.convertStringToFile(
                `<link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet"><canvas id="canvasOne" width="1280" height="720" class="byon-canvas">.</canvas>`,
                "breakingnews.png",
                function(err, fileName) {
                  if (err) return console.error("Pdfcrowd Error: " + err);
                  console.log("Success: the file was created " + fileName);
                  message.channel.send({file: ("breakingnews.png")});
                });
          }
}
