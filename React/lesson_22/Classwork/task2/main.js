window.URL = window.URL || window.webkitURL;

window.onload = function() {
  
  function getImage() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET','image.jpg', true);
      xhr.responseType = 'blob';
      setTimeout(function() {
        xhr.send();
      }, 2000);

      xhr.onload = function() {
        if (this.status == 200) {
          var blob = this.response;
          var img = document.createElement('img');
          img.onload = function(e) {
            window.URL.revokeObjectURL(img.src);
          };
          img.src = window.URL.createObjectURL(blob);
          document.body.appendChild(img);
        } else {
          reject(new Error("Network Error"));
        }
      }

      xhr.onerror = function() {
        reject(new Error('Error'));
      };
    });
  }

  async function main() {
    await getImage();
  }

  main();
}
