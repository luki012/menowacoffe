// tools toogle utk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
const hMenu = document.querySelector('#hambuerger-menu')

//ketika hamburgermenu di click
hMenu.addEventListener("click", function(){
    navbarNav.classList.toggle('active')
})
//clik diluar untuk menghilangkan nav
document.addEventListener("click",function(a){
    if(!hMenu.contains(a.target)&& !navbarNav.contains(a.target)){
        navbarNav.classList.remove('active')
    }
})

//ketika search di click

const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click", function(){
    searchForm.classList.toggle("active");
    searchBox.focus();
})

//click diluar untuk menghilangkan search
document.addEventListener("click", function(a){
    if(!searchBtn.contains(a.target)&& !searchForm.contains(a.target)){
        searchForm.classList.remove("active")
    }
})


//tangkap shopping card

const shopBtn = document.querySelector("#shopping-card-button");
const shopCard = document.querySelector(".shoping-card");

//ketika shoping-card-btn di click
shopBtn.onclick = (e) => {
    shopCard.classList.toggle("active");
    e.preventDefault()
};

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});

//menghilangkan selain shopping card button

document.addEventListener("click", function(a){
    if(!shopBtn.contains(a.target)&& !shopCard.contains(a.target)){
        shopCard.classList.remove("active")
    }
})

//tangkap element modal
const modal = document.querySelector("#modal-item-detail");
const eyePr = document.querySelectorAll(".eye-product");

//ketika eye di click

eyePr.forEach((btn)=>{
    btn.onclick = (e) => {
        modal.style.display = "flex";
        e.preventDefault()
    } 
})

//click tombol close

const tClose = document.querySelector(".close-icon");
tClose.onclick = (e) => {
    modal.style.display = "none";
    e.preventDefault()
}

//click menghilangkan clik dmana saja

window.onclick = (e) => {
    if(e.target === modal){
        modal.style.display ="none";
    }
}