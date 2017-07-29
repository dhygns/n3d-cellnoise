export default class Timer {
    constructor(fixedDeltaTime) {
        this.new_time = 0.0;
        this.old_time = 0.0;

        this.fixed_delta_time = fixedDeltaTime;
        this.dynamic_delta_time = 0.0;

        this.fixed_step = 0.0;
        this.fixed_pivo = 0.0;
    }

    //Dynamic Frame
    update(time_stamp) {
        this.old_time = this.new_time;
        this.new_time = time_stamp;

        this.dynamic_delta_time = this.new_time - this.old_time;
        
        this.fixed_pivo += this.dynamic_delta_time;
        
        this.fixed_step = (this.fixed_pivo / this.fixed_delta_time) << 0;
        if(this.fixed_pivo >= this.fixed_delta_time) {
            this.fixed_pivo -= this.fixed_delta_time;
        }
        this.fixed_ratio = this.fixed_pivo / this.fixed_delta_time;
    }

    //Fixed Frame.
    get FixedUpdateCount() { return this.fixed_step; }
    get DeltaTime() { return this.new_time - this.old_time;}
    get FixedDeltaTime() { return this.fixed_delta_time;}
    get FixedFrameRatio() { return  this.fixed_ratio; }

    get fuc() { return this.FixedUpdateCount; }
    get dt() { return this.DeltaTime; }
    get fdt() { return this.FixedDeltaTime; }
    get ffr() { return this.FixedFrameRatio; }
}