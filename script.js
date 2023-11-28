let onSlide = false;

window.addEventListener("load", () => {
    autoSlide();

    const dots = document.querySelectorAll(".gallery-dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", () => slide(i));
    }

    const buttonPrev = document.querySelector(".gallery-button__prev");
    const buttonNext = document.querySelector(".gallery-button__next");
    buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
    buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
});

function autoSlide() {
    setInterval(() => {
        slide(getItemActiveIndex() + 1);
    }, 3000); // slide speed = 3s
}

function slide(toIndex) {
    if (onSlide)
        return;
    onSlide = true;

    const itemsArray = Array.from(document.querySelectorAll(".gallery-item"));
    const itemActive = document.querySelector(".gallery-item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    let newItemActive = null;

    if (toIndex > itemActiveIndex) {
        // check if toIndex exceeds the number of gallery items
        if (toIndex >= itemsArray.length) {
            toIndex = 0;
        }

        newItemActive = itemsArray[toIndex];

        // start transition
        newItemActive.classList.add("gallery-item__pos_next");
        setTimeout(() => {
            newItemActive.classList.add("gallery-item__next");
            itemActive.classList.add("gallery-item__next");
        }, 20);
    } else {
        // check if toIndex exceeds the number of gallery items
        if (toIndex < 0) {
            toIndex = itemsArray.length - 1;
        }

        newItemActive = itemsArray[toIndex];

        // start transition
        newItemActive.classList.add("gallery-item__pos_prev");
        setTimeout(() => {
            newItemActive.classList.add("gallery-item__prev");
            itemActive.classList.add("gallery-item__prev");
        }, 20);
    }

    // remove all transition class and switch active class
    newItemActive.addEventListener("transitionend", () => {
        itemActive.className = "gallery-item";
        newItemActive.className = "gallery-item gallery-item__active";
        onSlide = false;
    }, {
        once: true
    });

    slideIndicator(toIndex);
}

function getItemActiveIndex() {
    const itemsArray = Array.from(document.querySelectorAll(".gallery-item"));
    const itemActive = document.querySelector(".gallery-item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
}

function slideIndicator(toIndex) {
    const dots = document.querySelectorAll(".gallery-dot");
    const dotActive = document.querySelector(".gallery-dot__active");
    const newDotActive = dots[toIndex];

    dotActive.classList.remove("gallery-dot__active");
    newDotActive.classList.add("gallery-dot__active");
}
