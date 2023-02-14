console.log('reading js');
'use strict';

/*
document.querySelector('form').addEventListener('submit', myForm);
document.querySelector('#reset').addEventListener('click', reset);

function myForm(event) {

    const noun1 = document.querySelector("#sNoun").value;
    const verb1 = document.querySelector("#sVerb").value;
    const noun2 = document.querySelector("#zNoun").value;
    const pNoun1 = document.querySelector("#pNoun").value;
    const noun3 = document.querySelector("#fNoun").value;
    const verb2 = document.querySelector("#fVerb").value;
    const num1 = document.querySelector("#num").value;
    const verb3 = document.querySelector("#zVerb").value;

    //initiate new section
    var newSec = document.querySelector('#newSec');
    
    //message section
    var message = document.querySelector('#output');
    var h2 = document.querySelector('h2');
    
    //concatenate message
    h2.innerHTML = 'Writting in Progress';
    newSec.innerHTML = 
            `Two households, both alike in dignity
            (In fair ${noun1}, where we lay our scene),
            From ancient grudge break to new mutiny,
            Where civil blood ${verb1} civil hands unclean.
            From forth the fatal loins of these two foes
            A pair of star-crossed  ${pNoun1} take their life;
            Whose misadventured piteous overthrows
            Doth with their death  ${verb2} their parents’ strife.
            The fearful ${noun2} of their death-marked love
            And the continuance of their parents’ rage,
            Which, but their ${noun3}’s end, naught could remove,
            Is now the ${num1} hours’ traffic of our stage;
            The which, if you with patient ears attend,
            What here shall miss, our toil shall  ${verb3} to mend.`

    //New Section styling
    newSec.className = 'show';

    event.preventDefault();
    return false;
}
 
function reset(){
    newSec.className = 'hide';
}
*/
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
