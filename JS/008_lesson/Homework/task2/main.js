var elements =  document.body.getElementsByTagName('*');
var i;


function addEventListenersAll(){
  for (i = 0; i < elements.length; i++) {
    if (elements[i].dataset.tooltip) {
      elements[i].addEventListener('mouseover', showTip, false);
      elements[i].addEventListener('mouseout', hideTip, false);
    }  
  }
} 

addEventListenersAll();


function showTip() {    
  var tip = document.createElement('span');
  tip.className = 'tooltip';
  tip.id = 'tip';
  tip.innerHTML = this.dataset.tooltip;    
  tip.style.left = this.getBoundingClientRect().left + 'px';
  tip.style.top = this.getBoundingClientRect().bottom + 'px';
  this.insertAdjacentElement('afterEnd', tip);
};


function hideTip() {
  var tip = document.getElementById('tip');
  tip.remove();
};
