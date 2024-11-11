document.addEventListener('DOMContentLoaded', () => {

  const swiperHero = new Swiper('.hero__swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.hero__btn-right',
      prevEl: '.hero__btn-left',
    }
  });

  const swiperServices = new Swiper('.services__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
    },
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.services__btn-right',
      prevEl: '.services__btn-left',
    },
    breakpoints: {
      769: {
        spaceBetween: 25,
      }
    }
  });

  const swiperDoctors = new Swiper('.doctors__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
    },
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.doctors__btn-right',
      prevEl: '.doctors__btn-left',
    }
  });

  const swiperReviewsConfig = {
    direction: "vertical",
    slidesPerView: 6,
    spaceBetween: 10,
    navigation: {
      nextEl: '.reviews__btn-bottom',
      prevEl: '.reviews__btn-top',
    }
  };

  const swiperReviews = new Swiper(".reviews__swiper", swiperReviewsConfig);
  const swiperReviewsText = new Swiper(".reviews__swiper-text", swiperReviewsConfig);
  const swiperReviewsVideo = new Swiper(".reviews__swiper-video", swiperReviewsConfig);

  const swiperReviews2 = new Swiper(".reviews__swiper2", {
    slidesPerView: 1,
    spaceBetween: 10,
    thumbs: {
      swiper: swiperReviews,
    },
  }

  );
  const swiperReviews2Text = new Swiper(".reviews__swiper2-text", {
    slidesPerView: 1,
    spaceBetween: 10,
    thumbs: {
      swiper: swiperReviewsText,
    },
  }
  );
  const swiperReviews2Video = new Swiper(".reviews__swiper2-video", {
    slidesPerView: 1,
    spaceBetween: 10,
    thumbs: {
      swiper: swiperReviewsVideo,
    },
  });


  const doctorsList = document.querySelector('.doctors__list');
  const loadMoreButton = document.querySelector('.doctors__button-else');

  // Данные врачей для подгрузки
  const doctorsData = [
    {
      imgSrc: './img/doctor_1.webp',
      name: 'Сидоров Иван Иванович',
      job: 'Врач-стоматолог хирург',
      desc: 'Специалист по удалению зубов и имплантации',
    },
    {
      imgSrc: './img/doctor_2.webp',
      name: 'Иванова Мария Сергеевна',
      job: 'Врач-стоматолог терапевт',
      desc: 'Специалист по лечению кариеса и пульпита',
    },
    {
      imgSrc: './img/doctor_3.webp',
      name: 'Петров Василий Иванович',
      job: 'Врач-стоматолог ортопед',
      desc: 'Специалист по протезированию на имплантах',
    },
  ];

  let loadedCount = 0;
  const loadAmount = 3; // Количество карточек, загружаемых за один раз
  let allLoaded = false; // Флаг, показывающий, что все карточки загружены

  function loadMoreDoctors() {
    if (!allLoaded) {
      for (let i = 0; i < loadAmount; i++) {

        if (loadedCount >= doctorsData.length) {
          allLoaded = true;
          loadMoreButton.textContent = 'Скрыть';
          break;
        }

        const doctor = doctorsData[loadedCount];
        const doctorCard = document.createElement('article');

        doctorCard.classList.add('doctors__item');
        doctorCard.innerHTML = `
          <div class="doctors__imgbox">
            <img src="${doctor.imgSrc}" alt="${doctor.name}" class="doctors__img">
          </div>
          <div class="doctors__name">${doctor.name}</div>
          <div class="doctors__job">${doctor.job}</div>
          <div class="doctors__desc">${doctor.desc}</div>
          <a href="#" class="button button-white doctors__button">Подробнее</a>
        `;

        doctorsList.appendChild(doctorCard);
        doctorsList.classList.add('expanded');
        doctorCard.classList.add('card-visiable'); // Активируем анимацию

        loadedCount++;

        if (loadedCount >= doctorsData.length) {
          allLoaded = true;
          loadMoreButton.textContent = 'Скрыть';
          return;
        }
      }
    } else {
      const doctorItems = doctorsList.querySelectorAll('.doctors__item');
      doctorItems.forEach((item, index) => {
        if (index >= 3) {
          item.classList.remove('card-visible');
          item.classList.add('card-hidden');
          doctorsList.classList.remove('expanded');

          setTimeout(() => {
            item.remove();
          }, 300);
        }
      });
      loadedCount = 0;
      allLoaded = false;
      loadMoreButton.textContent = 'Загрузить еще';
    }
  }

  loadMoreButton.addEventListener('click', loadMoreDoctors);

  const reviews = document.querySelector('.reviews');
  const reviewsMobile = document.querySelector('.reviews-mobile');
  const links = document.querySelectorAll('.reviews__link');

  const readMobile = reviewsMobile.querySelector('.reviews__read');
  const watchMobile = reviewsMobile.querySelector('.reviews__watch');

  function filterSwipers(filter) {
    reviews.querySelectorAll('.swiper').forEach(swiper => {
      if (swiper.classList.contains('active')) {
        swiper.classList.remove('active');
      }
    })

    if (readMobile.classList.contains('active')) {
      readMobile.classList.remove('active');
    }

    if (watchMobile.classList.contains('active')) {
      watchMobile.classList.remove('active');
    }

    switch (filter) {
      case 'all':
        reviews.querySelector('.reviews__swiper').classList.add('active');
        reviews.querySelector('.reviews__swiper2').classList.add('active');
        reviewsMobile.querySelector('.reviews__watch').classList.add('active');
        break;
      case 'video':
        reviews.querySelector('.reviews__swiper-video').classList.add('active');
        reviews.querySelector('.reviews__swiper2-video').classList.add('active');
        reviewsMobile.querySelector('.reviews__watch').classList.add('active');
        break;
      case 'text':
        reviews.querySelector('.reviews__swiper-text').classList.add('active');
        reviews.querySelector('.reviews__swiper2-text').classList.add('active');
        reviewsMobile.querySelector('.reviews__read').classList.add('active');
        break;
    }
  }

  function onFilterChange(filter) {
    resetVisibility();
    showInitial();
    filterSwipers(filter);
  };

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(link => link.classList.remove('reviews__link-active'));
      link.classList.add('reviews__link-active');
      filterSwipers(link.dataset.filter);
      onFilterChange(link.dataset.filter);
    });
  });

  const activeLink = document.querySelector('.reviews__link-active');
  const initialFilter = activeLink ? activeLink.dataset.filter : 'video';
  filterSwipers(initialFilter);


  const videos = document.querySelectorAll('.reviews__videobox video')
  videos.forEach(video => {
    const playButton = video.closest('.reviews__videobox').querySelector('.reviews__play-button');

    playButton.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playButton.classList.add('hidden');
      }
    });

    video.addEventListener('click', () => {
      if (!video.paused) {
        video.pause();
        playButton.classList.remove('hidden');
      }

    });

    video.addEventListener('ended', () => {
      playButton.classList.remove('hidden');
    });
  });


  const body = document.querySelector('body');
  const burgerCheckbox = document.querySelector('.header__burger-checkbox');

  if (burgerCheckbox) {
    const headerMobile = document.querySelector('.header-mobile');
    const headerLinks = headerMobile.querySelectorAll('a');
  
    burgerCheckbox.addEventListener('change', function () {
      if (this.checked) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "visible";
      }

      headerLinks.forEach(link => {
        link.addEventListener('click', function () {
          burgerCheckbox.checked = false;
          body.style.overflow = "visible";
        })
      });
    });
  }


  const videoBlocks = reviewsMobile.querySelectorAll('.reviews__videobox[data-type="video"]');
  const textBlocks = reviewsMobile.querySelectorAll('.reviews__videobox[data-type="text"]');
  const loadMoreButtonMobile = reviewsMobile.querySelector('.reviews__link-else');
  let visibleCount = 3;

  const resetVisibility = () => {
    [...videoBlocks, ...textBlocks].forEach(block => {
      block.classList.remove('reviews__videobox--visible');
    });
    visibleCount = 3;
    loadMoreButtonMobile.classList.remove('hidden');
  };

  const showInitial = () => {
    videoBlocks.forEach((video, index) => {
      if (index < visibleCount) {
        video.classList.add('reviews__videobox--visible');
      }
    });

    textBlocks.forEach((text, index) => {
      if (index < visibleCount) {
        text.classList.add('reviews__videobox--visible');
      }
    });
  };

  const showMore = () => {
    videoBlocks.forEach((video, index) => {
      if (index >= visibleCount && index < visibleCount + 3) {
        video.classList.add('reviews__videobox--visible');
      }
    });

    textBlocks.forEach((text, index) => {
      if (index >= visibleCount && index < visibleCount + 3) {
        text.classList.add('reviews__videobox--visible');
      }
    });

    visibleCount += 3;

    if (visibleCount >= videoBlocks.length) {
      loadMoreButtonMobile.classList.add('hidden');
    }

    if (visibleCount >= textBlocks.length) {
      loadMoreButtonMobile.classList.add('hidden');
    }
  };

  showInitial();

  loadMoreButtonMobile.addEventListener('click', showMore);
});



