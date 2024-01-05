class MyMath {
    number = 0;

    constructor(value: number) {
        this.number = value;
    }

    add(num1, num2){
        this.number = this.number + num1 + num2;
        return this;
    }

    minus(nums){
        this.number = this.number - nums
        return this;
    }

    times(num){
        this.number = this.number * num;
        return this;
    }

    getValue(){
        return this.number
    }
}
