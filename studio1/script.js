

const btns = document.querySelectorAll('.btn');
const delete_btn = document.querySelector('.delete');
const shift_btn = document.querySelector('.shift');
const space_btn = document.querySelector('.space');

list = [];

//Add elements to an array
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        list.push(btn.innerText);
        console.log(list);
    })
})

//Remove elements to an array
delete_btn.addEventListener('click', () => {
    list.pop(delete_btn.innerText);
    console.log(list);
})

//Add spaces to an array
space_btn.addEventListener('click', () => {
    list.push(' ');
    console.log(list);
})

shift_btn.addEventListener('click', () => {
    btns.forEach(btn => {
        btns.classList.toggle('upper');
    })
})
