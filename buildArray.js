const memory = require('./memory')



const Memory = new memory

class Array {
    
    constructor(){
        this.length = 0;
        this._capacity = 0;
        this.ptr = Memory.allocate(this.length)
    }
    

    push(value){
        if(this.length>= this._capacity){
            this._resize((this.length+1)*Array.SIZE_RATIO);
        }
        Memory.set(this.ptr+this.length, value);
        this.length++
    }

    _resize(size){
        const oldPtr = this.ptr;
        this.ptr = Memory.allocate(size)
        if(this.ptr===null){
            throw new Errow('Out of memory');
        }
        Memory.copy(this.ptr,oldPtr,this.length);
        Memory.free(oldPtr);
        this._capacity=size;
    }

    get(index){
        if(index<0 || index>= this.length){
            throw new Error('Index error');            
        }
        return Memory.get(this.ptr+index)
    }

    pop(){
        if(this.length==0){
            throw new Error('index error');
        }
        const value = Memory.get(this.ptr+this.length-1);
        this.length--;
        return value; 
    }
}

Array.SIZE_RATIO=3

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    // Array { length: 1, _capacity: 3, ptr: 0 }
    console.log(arr);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    console.log(arr);
    arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);
  console.log(arr.get(0))
  arr.empty()
  console.log(arr.get())
}

main()