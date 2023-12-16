let arr = [];
const canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 700;
context = canvas?.getContext('2d');

animation();

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
  
 function animation() {
  requestAnimationFrame(tick);
  
  canvas?.addEventListener('mousedown', (e) => {
    if (arr.length < 15) {
      arr.push(new MyAnimation(context, e.clientX, e.clientY,  `#${(Math.floor(Math.random() * 10000000)).toString(16)}`, 650));   
    }
        
  });
  
  let pTimestamp = 0;

  function tick(timestamp) {
    const diff = timestamp - pTimestamp;
    pTimestamp = timestamp;
    const fps = 1000 / diff;
    const secondPath = diff / 1000;

    const params = {
      timestamp,
      pTimestamp,
      diff,
      fps,
      secondPath,
    };

    clear();
    arr = arr.filter(el => !el.end);

    for (let i = 0; i < arr.length; i++){
      if (arr[i].floor > arr[i].switcher) { 
        arr[i].update();
        arr[i].render();
      } 
      else {
        arr[i].reUpdate();
        arr[i].reRender();
      }
    }
    
    requestAnimationFrame(tick);

  }

}