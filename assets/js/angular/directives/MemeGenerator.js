angular.module('mainApp').directive('memegen', function() {
  return {
    require: 'ngModel',
    scope: {
      font: '@',
      topText: '@',
      middleText: '@',
      bottomText: '@',
      image: '@',
    },
    template: '<canvas width="400" height="300"/>',
    link: function(scope, element, attrs, ngModel) {
      var canvas = scope.canvas = element.find('canvas')[0];
      var context = scope.context = scope.canvas.getContext('2d');
      var image = new Image();
      image.setAttribute('crossOrigin', 'anonymous');
      var topText = middleText = bottomText = '';

      var drawImage = function() {
        // Resize canvas
        canvas.height = image.height;
        canvas.width = image.width;
        // Paint image on canvas.
        context.drawImage(image, 0, 0);
      };

      var drawTextAtPositionY = function(text, positionY) {
        // Text Variables
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.lineCap = 'round';
        var size = image.height / 6;
        context.font = size + 'px Impact';
        context.lineWidth = size / 32;
        while (context.measureText(text).width > canvas.width) {
          size--;
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

        // Set value to ngModel
        ngModel.$setViewValue(canvas.toDataURL());
      };

      scope.$watch('image', function(imageUrl) {
        image.src = imageUrl;
        // Set the canvas dimensions (height, width)
        image.onload = function() {
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
