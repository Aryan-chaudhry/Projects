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
