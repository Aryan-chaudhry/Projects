
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
        ip.value = str;
    }
    else if(key === '+' || key === '-' || key === '*' || key === '/'){
        str += key;
        ip.value = str;
    }
    else if(key === 'Enter'){
       try{
        str = eval(str);
        ip.value = str;
       }
       catch{
        ip.value = 'Error';
        str = "";
       }
    }
    else if(key === 'Backspace'){
        str = str.substring(0, str.length-1);
        ip.value  = str;
    }
    else if(key === 'Escape' || key === 'Delete'){
        str = "";
        ip.value = str;
    }
    else if(key === 'r' || key === 'R'){
        let num = Number(str);
        if(!isNaN(num)){
            str = Math.sqrt(num).toString();
            ip.value = str;
        }
    }
    else if(key === 's' || key == 'S'){
        let num = Number(str);
        if(!isNaN(num)){
            str = (num*num).toString();
            ip.value = str;
        }
    }
})

