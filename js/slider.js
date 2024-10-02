// document.addEventListener('DOMContentLoaded', function () {
//     const slider = document.querySelector('.slider');
//     const slides = Array.from(document.querySelectorAll('.slide'));
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     const slideCounter = document.getElementById('slideCounter');

//     const totalSlides = slides.length;
//     let currentIndex = 0;
//     const slidesToShow = 3;
//     const slideWidth = 100 / slidesToShow;
//     slides.slice(0, 2).forEach(slide => {
//         const clone = slide.cloneNode(true);
//         slider.appendChild(clone);
//     });
//     slides.forEach(slide => slide.style.flex = `0 0 ${slideWidth}%`);
//     function updateSlidePosition() {
//         slider.style.transform = `translateX(-${(currentIndex * slideWidth)}%)`;
//     }
//     function updateCounter() {
//         const activeSlide = (currentIndex % totalSlides) + 1;
//         slideCounter.textContent = `${activeSlide} / ${totalSlides}`;
//     }

//     function nextSlide() {
//         currentIndex++;
//         if (currentIndex >= totalSlides) {
//             currentIndex = 0;
//             setTimeout(() => {
//                 slider.style.transition = 'none';
//                 updateSlidePosition();
//             }, 500);
//         }
//         slider.style.transition = 'transform 0.5s ease-in-out';
//         updateSlidePosition();
//         updateCounter();
//     }
//     function prevSlide() {
//         currentIndex--;
//         if (currentIndex < 0) {
//             currentIndex = totalSlides - 1;
//             setTimeout(() => {
//                 slider.style.transition = 'none';
//                 updateSlidePosition();
//             }, 500);
//         }
//         slider.style.transition = 'transform 0.5s ease-in-out';
//         updateCounter();
//     }

//     // let slideInterval = setInterval(nextSlide, 4000);

//     function stopSlideShow() {
//         clearInterval(slideInterval);
//     }

//     function startSlideShow() {
//         slideInterval = setInterval(nextSlide, 4000);
//     }

//     nextBtn.addEventListener('click', () => {
//         stopSlideShow();
//         nextSlide();
//         startSlideShow();
//     });

//     prevBtn.addEventListener('click', () => {
//         stopSlideShow();
//         prevSlide();
//         startSlideShow();
//     });

//     // Инициализация
//     updateCounter();
//     updateSlidePosition();
//     startSlideShow();
// });
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');

    const totalSlides = slides.length;
    let currentIndex = 0;
    const slidesToShow = 3;
    const gap = 20; // Отступ между слайдами в пикселях

    // Рассчитываем ширину слайда с учётом отступа
    const slideWidth = slider.clientWidth / slidesToShow - (gap * (slidesToShow - 1) / slidesToShow);

    // Устанавливаем flex-basis для каждого слайда
    slides.forEach(slide => slide.style.flex = `0 0 calc(${100 / slidesToShow}% - ${(gap * (slidesToShow - 1)) / slidesToShow}px)`);

    // Добавляем клон первых двух слайдов в конец для бесконечного эффекта
    slides.slice(0, 2).forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });

    // Обновляем положение слайдов
    function updateSlidePosition() {
        const slideWidthWithGap = slideWidth + gap; // Ширина слайда с учётом отступа
        slider.style.transform = `translateX(-${currentIndex * slideWidthWithGap}px)`;
    }

    // Обновляем счётчик
    function updateCounter() {
        const activeSlide = (currentIndex % totalSlides) + 1;
        slideCounter.textContent = `${activeSlide} / ${totalSlides}`;
    }

    // Переход к следующему слайду
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
            setTimeout(() => {
                slider.style.transition = 'none';
                updateSlidePosition();
            }, 500);
        } else {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
        updateSlidePosition();
        updateCounter();
    }

    // Переход к предыдущему слайду
    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
            setTimeout(() => {
                slider.style.transition = 'none';
                updateSlidePosition();
            }, 500);
        } else {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
        updateSlidePosition();
        updateCounter();
    }

    // Запуск автоматического перелистывания
    let slideInterval = setInterval(nextSlide, 4000);

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Обработка кликов на кнопки
    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    // Инициализация
    updateCounter();
    updateSlidePosition();
    startSlideShow();
});


