class MyAnimation {
    context;
    radius = Math.random() * 20;
    gravitation = 0.0098;
    clientX;
    color;
    floor;
    start;
    end = false;
    V0 = 0;
    S;
    heightGravitation;
    switcher = 0;
   
    constructor(context,clientX, clientY, color, floor) {
      this.context = context;
      this.clientX = clientX;
      this.start = this.heightGravitation = clientY;  
      this.color = color;
      this.floor = floor;
    }
  
    update() {
      this.V0 += this.gravitation*this.radius / 2;
      this.S = this.V0 + this.gravitation / 2;
      this.heightGravitation += this.S; 
    }

    reUpdate() {
      this.V0 -= this.gravitation * this.radius / 2;
      this.S = this.V0 + this.gravitation/2;
      this.heightGravitation -= this.S;
    }
  
    render() {
      this.context?.beginPath();
      this.context?.arc(
        this.clientX,
        this.heightGravitation,
        this.radius,
        0,
        Math.PI * 2
      );
  
      if (this.heightGravitation > this.floor){
        this.switcher = this.heightGravitation;
        this.V0 = Math.sqrt(2 * this.gravitation * (this.floor - this.start) * this.radius) / 2;

        if (this.V0 <= 0.025 * this.radius || this.V0 < 0.01) {
          this.end = true;
        }
      }
        
      this.context && (this.context.fillStyle = this.color);
      this.context?.fill();
    }
  
    reRender() {
      this.context?.beginPath();
      this.context?.arc(
        this.clientX,
        this.heightGravitation,
        this.radius,
        0,
        Math.PI * 2
      );
  
      if (this.V0 <= 0) {
        this.switcher = this.start = this.heightGravitation;
      } 

      this.context && (this.context.fillStyle = this.color);
      this.context?.fill();
    }
  
  }
  