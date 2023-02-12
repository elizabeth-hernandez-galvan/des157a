
//Form
const view = Array.from(document.querySelectorAll("form .view"));
const nextBtn = document.querySelectorAll("form .next");
const prevBtn = document.querySelectorAll("form .previous");
const form = document.querySelector("form");


nextBtn.forEach((button) => {
    button.addEventListener("click", () => {
        flipPage("next");
    });
});
prevBtn.forEach((button) => {
    button.addEventListener("click", () => {
        flipPage("prev");
    });
});

function flipPage(btn) {
    let i = 0;
    const active = document.querySelector(".active");
    i = view.indexOf(active);

    view[i].classList.remove("active");
    if (btn === "next") {
      i++;
    } else if (btn === "prev") {
      i--;
    }
    view[i].classList.add("active");
}
  


//Keyboard
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

//Change to uppercase
shift_btn.addEventListener('click', () => {
    btns.forEach(btns => {
        btns.classList.toggle('upper');
    })
})
