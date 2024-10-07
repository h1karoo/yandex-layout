document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');

    let totalSlides = slides.length;
    let currentIndex = 0;
    let slidesToShow = 3;
    const gap = 20;

    // Определение количества слайдов для показа на разных экранах
    function setSlidesToShow() {
        if (window.innerWidth <= 768) { // Для мобильных устройств
            slidesToShow = 1;
        } else { // Для десктопов
            slidesToShow = 3;
        }
        updateSlideDimensions();
    }

    const slideWidth = () => slider.clientWidth / slidesToShow - (gap * (slidesToShow - 1) / slidesToShow);

    function updateSlideDimensions() {
        slides.forEach(slide => {
            slide.style.flex = `0 0 calc(${100 / slidesToShow}% - ${(gap * (slidesToShow - 1)) / slidesToShow}px)`;
        });
        updateSlidePosition();
    }

    slides.slice(0, 2).forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });

    function updateSlidePosition() {
        const slideWidthWithGap = slideWidth() + gap; 
        slider.style.transform = `translateX(-${currentIndex * slideWidthWithGap}px)`;
    }

    function updateCounter() {
        const activeSlide = (currentIndex % totalSlides) + 1;
        slideCounter.textContent = `${activeSlide} / ${totalSlides}`;
    }

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

    let slideInterval = setInterval(nextSlide, 4000);

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 4000);
    }

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

    window.addEventListener('resize', setSlidesToShow); // Обновление количества слайдов при изменении размера окна

    setSlidesToShow(); // Установка начальных значений при загрузке
    updateCounter();
    updateSlidePosition();
    startSlideShow();
});