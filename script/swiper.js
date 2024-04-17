var swiper1 = new Swiper(".mainSwiper", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

var swiper2 = new Swiper(".feature-product-Swiper", {
    slidesPerView: 5,
    loop: true,
    
});

var swiper3 = new Swiper(".doi-tac-Swiper", {
    slidesPerView: 6,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});
