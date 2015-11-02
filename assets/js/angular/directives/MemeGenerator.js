angular.module('mainApp').directive('memegen', function() {
  return {
    scope: {
      font: '@',
      topText: '@',
      middleText: '@',
      bottomText: '@',
      image: '@',
    },
    template: '<canvas width="400" height="300"/>',
    link: function(scope, element, attrs, controller, transcludeFn) {
      var canvas = scope.canvas = element.find('canvas')[0];
      var context = scope.context = scope.canvas.getContext('2d');
      var image = new Image();
      var topText = middleText = bottomText = '';

      // Text Variables
      context.fillStyle = 'white';
      context.strokeStyle = 'black';
      context.textAlign = 'center';
      context.lineCap = 'round';

      var drawImage = function() {
        // Resize canvas
        canvas.height = image.height;
        canvas.width = image.width;
        // Paint image on canvas.
        context.drawImage(image, 0, 0);
      };

      var drawTextAtPositionY = function(text, positionY) {
        console.log(text, positionY);
        var size = image.height / 6;
        context.font = size + 'px Impact';
        context.lineWidth = size / 32;
        while (context.measureText(text).width > canvas.width) {
          size--;
          console.log('SIZE', size, context.measureText(text).width, canvas.width)
          context.font = size + 'px Impact';
          context.lineWidth = size / 32;
        }
        var centerX = canvas.width / 2;
        var txtCenter = context.measureText(text).width / 2;
        var middleX = centerX - txtCenter;
        context.fillText(text, middleX , positionY);
        context.strokeText(text, middleX, positionY);
      }

      var drawText = function() {
        // Clear out everything.
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Paint image.
        drawImage();

        // Draw top text
        context.textBaseline = 'top';
        drawTextAtPositionY(topText, 0);
        // Draw middle text
        context.textBaseline = 'middle';
        drawTextAtPositionY(middleText, (canvas.height / 2));
        // Draw bottom text
        context.textBaseline = 'bottom';
        drawTextAtPositionY(bottomText, canvas.height);
      };

      scope.$watch('image', function(imageUrl) {
        console.log('imageUrl', imageUrl)
        image.src = imageUrl;
        // Set the canvas dimensions (height, width)
        image.onload = function() {
          console.log('image loaded.', image.height, image.width);
          drawImage();
        };
      });

      scope.$watch('topText', function(newValue) {
        topText = newValue;
        drawText();
      });

      scope.$watch('middleText', function(newValue) {
        middleText = newValue;
        drawText();
      });

      scope.$watch('bottomText', function(newValue) {
        bottomText = newValue;
        drawText();
      });
    }
 };
});
