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
  var tip = document.getElementById('tip');
  if (tip) {
    tip.remove();
  }
  tip = document.createElement('div');
  tip.className = 'tooltip';
  tip.id = 'tip';
  tip.innerHTML = this.dataset.tooltip;    
  tip.style.left = this.getBoundingClientRect().left + 'px';
  this.insertAdjacentElement('beforeBegin', tip);
  tip.style.top = this.getBoundingClientRect().top - tip.clientHeight - 10 + 'px';
};


function hideTip() {
  var tip = document.getElementById('tip');
  tip.classList.add('hide-tooltip');
  setTimeout(function() {
    tip.remove();
  }, 500);
};
