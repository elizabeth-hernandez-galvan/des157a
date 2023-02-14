(function () {
    console.log('reading js');
    'use strict';

    const myForm = document.querySelector("#madlibs-form");
/*
document.querySelector('form').addEventListener('submit', myForm);
document.querySelector('#reset').addEventListener('click', reset);
*/
    myForm.addEventListener('submit', function(event){
        event.preventDefault();
        const noun1 = document.querySelector("#sNoun").value;
        const verb1 = document.querySelector("#sVerb").value;
        const noun2 = document.querySelector("#zNoun").value;
        const pNoun1 = document.querySelector("#pNoun").value;
        const noun3 = document.querySelector("#fNoun").value;
        const verb2 = document.querySelector("#fVerb").value;
        const num1 = document.querySelector("#num").value;
        const verb3 = document.querySelector("#zVerb").value;
        
    });
 
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

    function StepIndicator(circles) {
        let i = 0;
        const x = document.getElementsByClassName("step");
        for (i; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
        }
        x[circles].className += " active";
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
})();