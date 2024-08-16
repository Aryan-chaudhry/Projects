let string = '';
let input = document.getElementById('Text');
let buttons = document.querySelectorAll('button');

let arr = Array.from(buttons);

arr.forEach(button =>{
    button.addEventListener('click', (e)=>{
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
        }
        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        }
        else if(e.target.innerHTML == 'C'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else if(e.target.innerHTML == 'sq'){
            string = string*string;
            input.value = string;
        }
        else if(e.target.innerHTML == 'rt'){
            let num = Number(string);
            let root = Math.sqrt(num);
            string = root.toString();
            input.value = string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
    })
})

let str = "";
let ip = document.getElementById('Text');

document.addEventListener('keydown', (e)=>{
    const key = e.key;

    if(key >= '0' && key <= '9'){
        str += key;
        input.value = key;
    }
    else if(key === '+' || key === '-' || key === '*' || key === '/'){
        str += key;
        input.value = str;
    }
    else if(key === 'Enter'){
       try{
        str = eval(str);
        input.value = str;
       }
       catch{
        str = "Error";
        input.value = str;
        str = "";
       }
    }
    else if(key === 'Backspace'){
        str = str.substring(0, str.length-1);
        input.value  = str;
    }
    else if(key === 'Escape' || key === 'Delete'){
        str = "";
        input.value = str;
    }
    else if(key === 'r' || key === 'R'){
        let num = Number(str);
        let root = Math.sqrt(root);
        str = root.toString();
        input.value = str;
    }
    else if(key === 's' || key == 'S'){
        str = str*str;
        input.value = str;
    }
    else if(key === '.'){
        str += key;
        input.value = str;
    }
    else{
        str = "Enter valid operator";
        input.value = str;
    }
})

