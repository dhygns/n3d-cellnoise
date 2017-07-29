import Visual from "./visual/visual.js"
import Timer from "./utils/timer.js"

(function() {
    this.setup();
    this.animate(0);
}).bind({
    timer : new Timer(100),

    setup : function() {
        this.visual = new Visual();
    },

    fixedUpdate : function(timer) {
        this.visual.fixedUpdate(timer);
    },

    update : function(timer) {
        this.visual.update(timer);
    },

    animate : function(timeStamp) {
        this.timer.update(timeStamp);
        this.update(this.timer);
        
        for(var step = 0; step < this.timer.fuc ; step++) 
            this.fixedUpdate(this.timer);
        
        requestAnimationFrame(this.animate.bind(this));
    }
})();