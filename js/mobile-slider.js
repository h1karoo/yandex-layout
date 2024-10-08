document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const paginationContainer = document.querySelector('.pagination');
    let slides = [];
    let currentSlide = 0;

    function createSlider(data) {
        sliderWrapper.innerHTML = '';
        paginationContainer.innerHTML = '';

        const slideGroups = [
            data.slice(0, 2),
            data.slice(2, 3), 
            data.slice(3, 5),
            data.slice(5, 6),
            data.slice(6, 7) 
        ];

        slideGroups.forEach((slideGroup, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.position = 'absolute';
            slide.style.top = 0;
            slide.style.left = 0;
            slide.style.width = '100%';

            if (index === 0) {
                slide.classList.add('active');
                slide.style.visibility = 'visible';
            } else {
                slide.style.visibility = 'hidden';
            }

            slideGroup.forEach(item => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');

                const number = document.createElement('div');
                number.classList.add('grid-number');
                number.textContent = item.number;

                const content = document.createElement('div');
                content.classList.add('grid-content');
                content.textContent = item.content;

                gridItem.appendChild(number);
                gridItem.appendChild(content);
                slide.appendChild(gridItem);
            });

            sliderWrapper.appendChild(slide);
            slides.push(slide);

            const paginationDot = document.createElement('span');
            if (index === 0) paginationDot.classList.add('active');
            paginationDot.addEventListener('click', () => {
                goToSlide(index);
            });
            paginationContainer.appendChild(paginationDot);
        });

        updateSliderHeight();
        updateButtonStates();
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.classList.add('active');
                slide.style.visibility = 'visible'; 
            } else {
                slide.classList.remove('active');
                slide.style.visibility = 'hidden';
            }
        });

        const paginationDots = paginationContainer.children;
        for (let i = 0; i < paginationDots.length; i++) {
            if (i === slideIndex) {
                paginationDots[i].classList.add('active');
            } else {
                paginationDots[i].classList.remove('active');
            }
        }

        updateSliderHeight();
        updateButtonStates(); 
    }

    function updateSliderHeight() {
        const activeSlide = slides.find(slide => slide.classList.contains('active'));
        if (activeSlide) {
            const slideHeight = activeSlide.offsetHeight; 
            sliderWrapper.style.height = `${slideHeight}px`; 
        }
    }

    function updateButtonStates() {
        const prevButton = document.querySelector('.prev-slide');
        const nextButton = document.querySelector('.next-slide');

        if (!prevButton || !nextButton) {
            console.error('Кнопки переключения не найдены.');
            return;
        }
        if (currentSlide === 0) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }

        if (currentSlide === slides.length - 1) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }

    document.querySelector('.prev-slide').addEventListener('click', () => {
        if (currentSlide > 0) { 
            currentSlide--;
            goToSlide(currentSlide);
        }
    });

    document.querySelector('.next-slide').addEventListener('click', () => {
        if (currentSlide < slides.length - 1) { 
            currentSlide++;
            goToSlide(currentSlide);
        }
    });

    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            createSlider(data);
            updateButtonStates();
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
});
