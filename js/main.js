
function contextMenu() {
    const refreashBtn = document.querySelector("#refreash-btn")
    const contextMenu = document.querySelector(".cursor-context-menu")
    refreashBtn.addEventListener('click', (e) => {
        console.log("hello");
        location.reload()
    })
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        // Cursor ki exact position pe set
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.display = "block";
    });

    document.addEventListener('click', () => {
        const contextMenu = document.querySelector(".cursor-context-menu");
        contextMenu.style.display = "none";
    });


}
contextMenu()



function connectivityMenu() {
    const connectivityMenu = document.querySelector(".connectivity-menu")
    const connectivity = document.querySelector(".connectivity")
    let isMenuOpen = false;

    connectivity.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent body click

        if (!isMenuOpen) {
            connectivityMenu.style.display = "flex"
            isMenuOpen = true;
        } else {
            connectivityMenu.style.display = "none";
            isMenuOpen = false;
        }
    });
}
connectivityMenu()



const thisPc = document.querySelector('.this-pc')
const thisPcCloseBtn = document.querySelector('.title-bar-close-btn')
const thisPcIcon = document.querySelector('.this-pc-icon')
thisPcIcon.addEventListener('dblclick', () => {
    setTimeout(() => {
        thisPc.style.display = "block"

    }, 100);
})

thisPcCloseBtn.addEventListener('click', (e) => {
    thisPc.style.display = "none"
})