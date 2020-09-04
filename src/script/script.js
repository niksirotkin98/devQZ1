'use strict'

let maxMoveLenght = 0.1;

function Vector(x,y){
    return {
        x : x,
        y : y,
        sum(v){
            return new Vector(this.x + v.x, this.y + v.y);
        },
        diff(v){
            return new Vector(this.x - v.x, this.y - v.y);
        },
        mul(i){
            return new Vector(this.x * i, this.y * i);
        },
        lenght(){
            return (this.x**2 + this.y**2)**0.5;
        },
        set(x,y=this.y){
            this.x = x;
            this.y = y;
        },
        setV(v){
            this.x = v.x;
            this.y = v.y;
        }
    }
}

let mouse = new Vector(0,0),
    moveables = document.querySelectorAll(".back-moveable");



window.addEventListener("mousemove",({clientX:x, clientY:y})=>{
    let screenMaxLenght = (window.innerWidth**2 + window.innerHeight**2)**0.5,
        v = [new Vector(moveables[0].offsetLeft + moveables[0].offsetWidth/2, moveables[0].offsetTop + moveables[0].offsetHeight/2),
             new Vector(moveables[1].offsetLeft + moveables[1].offsetWidth/2, moveables[1].offsetTop + moveables[1].offsetHeight/2)],
        mLenght = 0;
    mouse.set(x,y);
    mLenght = mouse.lenght();
    
    v[0] = mouse.diff(v[0]);
    v[0].len = v[0].lenght();
    v[0].setV(v[0].mul(1/v[0].len).mul(v[0].len*maxMoveLenght));
    v[1] = mouse.diff(v[1]);
    v[1].len = v[1].lenght();
    v[1].setV(v[1].mul(1/v[1].len).mul(v[1].len*maxMoveLenght));
    //v[0] = v[0].mul(v[0].lenght()/screenMaxLenght)
    moveables[0].style.setProperty("--x", Math.floor(v[0].x)+"px");
    moveables[0].style.setProperty("--y", Math.floor(v[0].y)+"px");
    moveables[1].style.setProperty("--x", Math.floor(v[1].x)+"px");
    moveables[1].style.setProperty("--y", Math.floor(v[1].y)+"px");
    console.log(screenMaxLenght, v[0].len, v[1].len)
})

document.fonts.ready.then(()=>{
    console.log("Fonts-loaded")
})
