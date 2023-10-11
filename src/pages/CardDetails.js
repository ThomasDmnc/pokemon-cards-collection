const element = document.querySelector(".card");


element.addEventListener("mousemove", (event) => {
    let X = (event.clientX - elRect.left) / elWidth;
    let Y = (event.clientY - elRect.top) / elHeigth;

    let rX = -(-X - 0.5) * 20;
    let rY = (Y - 0.5) * 20;

    document.documentElement.style.setProperty("--x", 100 * X + "%");
    document.documentElement.style.setProperty("--y", 100 * Y + "%");
    document.documentElement.style.setProperty("--r-x", rX + "deg");
    document.documentElement.style.setProperty("--r-y", rY + "deg");
});

function rotateCard(event) {
    let elWidth = element.clientWidth;
    let elHeigth = element.clientHeight;
    let elRect = element.getBoundingClientRect();
    let X = (event.clientX - elRect.left) / elWidth;
    let Y = (event.clientY - elRect.top) / elHeigth;

    let rX = -(-X - 0.5) * 20;
    let rY = (Y - 0.5) * 20;

    document.documentElement.style.setProperty("--x", 100 * X + "%");
    document.documentElement.style.setProperty("--y", 100 * Y + "%");
    document.documentElement.style.setProperty("--r-x", rX + "deg");
    document.documentElement.style.setProperty("--r-y", rY + "deg");
}

element.addEventListener("mouseleave", clearRotate);

function clearRotate(event) {
    if (event.target.classList.contains("card")) {
        document.documentElement.style.setProperty("--x", "0%");
        document.documentElement.style.setProperty("--x", "0%");
        document.documentElement.style.setProperty("--y", "0%");
        document.documentElement.style.setProperty("--r-x", "0%");
        document.documentElement.style.setProperty("--r-y", "0%");
    }
}