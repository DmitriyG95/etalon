$(function() {
    /* ленивая загрузка */
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
    // добавление отрицательного отступа для header
    let header = document.querySelector('.header')

    /* fix Для прыжка header */
    $('.header').addClass('header_load')

    function headerMargin() {
        let heightHeader = header.offsetHeight;
        header.style.marginBottom = - +heightHeader + 'px'
    }
    window.addEventListener('resize', headerMargin);
    window.addEventListener('load', headerMargin);
    // инициализация главного слайдера

    document.querySelectorAll('.top-slider').forEach(n => {
        const topSlider = new Swiper(n.querySelector('.swiper'), {
            slidesPerView: 1,
            loop:true,
            delay: 15000,
            speed: 1800,
            navigation: {
                nextEl: n.querySelector('.top-slider__bottom  .swiper-button-next'),
                prevEl: n.querySelector('.top-slider__bottom  .swiper-button-prev'),
            },
            
            pagination: {
                el: n.querySelector('.top-slider__bottom  .swiper-pagination'),
            },

        });


    });

    /* Плавный скролл */
    $('.smooth_scroll').on("click", function () {
        let href = $(this).attr("href");


        if (window.matchMedia("(max-width: 990px)").matches) {
          $("html, body").animate({
            scrollTop: $(href).offset('').top - 40 + 'px'
        }, {
            duration: 500, 
            easing: "linear" 
        });
        } else {
          $("html, body").animate({
            scrollTop: $(href).offset().top - 80 + 'px'
        }, {
            duration: 500, 
            easing: "linear" 
        });
        }
    });

    // Открытие/закрытие бургер меню
    let buttonBurger = document.querySelectorAll('.header__burger')
    burgerMenu = document.querySelector('.burger')

    for (let i = 0; i < buttonBurger.length; i++) {
        buttonBurger[i].addEventListener('click', function(e) {
            e.preventDefault()
            burgerMenu.classList.toggle('open')
            document.body.classList.toggle('burger-opened')
        })
    }

    /* анимация печати в слайдере */
    let blockTyping = document.querySelectorAll('.top-slider__text-cont')

    blockTyping.forEach(function(item){
        
            
        var typed = new Typed(item.querySelector('.result-text'), {
            stringsElement: item.querySelector('.strings-elem'),
            typeSpeed: 100,
            backSpeed: 0,
            backDelay: 500,
            startDelay: 1000,
            loop: true,
            
        })
    })

    /* показ картинок при наведении курсора */
    let hovercont = document.querySelectorAll('.js-hover-block')
    // for(let i=0;i<hovercont.length;i++) {
        
    //     hoverElem = hovercont[i].querySelectorAll(' .js-hover')
    //     hoverImg = hovercont[i].querySelectorAll(' .js-hover-img')
    //     for (let j=0;j<hoverElem.length;j++) {
    //         hoverElem[j].onmouseover = function(){
                
    //                 hoverImg[j].classList.remove('hovered')

    //             hoverImg[j].classList.add('hovered')
                
    //         }
    //     }
    // }
    hovercont.forEach(function(item){
        let hoverElem =   item.querySelectorAll('.js-hover')
        
        hoverElem.forEach(function(item,index){
            item.onmouseover = function(){
                hoverImg = item.closest('.js-hover-block').querySelectorAll('.js-hover-img')   
                for (i=0;i<hoverImg.length;i++) {
                    hoverImg[i].classList.remove('hovered')
                }
                hoverImg[index].classList.add('hovered')
            }
        })
    })
        
    
    /* Инициализация анимации */
    new WOW().init();

    /* проверка на заполненность input */
    var input = $('.form__form input')
        
    input.change(function(){
        var inputPlaceholder = $(this).closest('.form__row').find('.form__placeholder')
        if ($(this).val()) {
            inputPlaceholder.fadeOut()
        } else {
            inputPlaceholder.fadeIn()
            
        }
    })
    function checkText() {
      var inputPlaceholder = $(this).closest('.form__row').find('.form__placeholder')
        if ($(this).val()) {
            inputPlaceholder.fadeOut()
        } else {
            inputPlaceholder.fadeIn()
            
        }
    }
    // /* Маска телефона */
    $(".phone_mask").mask("+7(999)999-99-99");

    /* Слайдер новостей */
    document.querySelectorAll('.news').forEach(n => {
        const topSlider = new Swiper(n.querySelector('.news__slider'), {
            slidesPerView: 4,
            spaceBetween: 20,
            preloadImages: false,
            
            lazy: true,
            loop:false,
            navigation: {
                nextEl: n.querySelector(' .swiper-button-next'),
                prevEl: n.querySelector(' .swiper-button-prev'),
            },
            
            scrollbar: {
                el: n.querySelector(' .swiper-scrollbar'),
                draggable: true,
            },
            breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                1060: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1650: {
                    slidesPerView: 4
                }
            }

        });


    });

    /* fancy */
    $('.btn--popup').on('click', function(e){
        e.preventDefault
        var linkPopup = $(this).attr('href')
        $.fancybox.open({
            src: linkPopup,
		    type: 'inline',
            baseClass: 'popup',
            touch: false,
            smallBtn: false,
        });
    })
    $('.btn--thanks').on('click', function(e){
        e.preventDefault
        var linkPopup = $(this).attr('href')
        $.fancybox.open({
            src: linkPopup,
		    type: 'inline',
            baseClass: 'popup-thanks',
            touch: false,
            smallBtn: false,
        });
    })
    /* закрытие fancy */
    $('.popup__close').on('click', function(){
        $.fancybox.close();
    })

    /* Валидация форм */
    $('.form__form').each(function(){
        $(this).validate({
            rules: {
                agree:  {
                    required: true
                }
                
            },
            messages: {
                name: {
                    required : 'Поле обязательно для заполнения.'
                },
                phone: {
                    required : 'Поле обязательно для заполнения.'
                },
                agree: {
                    required : 'Для отправки формы, требуется согласиться с обработкой персональных данных'
                }
            }
        });
    })
    /* Фикс цифр для блока "онас" */
    let aboutBlock = document.querySelectorAll('.about__list .about__list-block')
    for (let i=0;i<aboutBlock.length;i++) {
      if (i<10) {
        aboutBlock[i].dataset.value = 0;
      }
    }
        
});

/* preloader */
(function($) {


    var loadedCount = 0; 
    var imagesToLoad = $('.top-slider__slide').length; 
    var loadingProgress = 0; 
  
    $('.top-slider__slide').imagesLoaded({
      background: true
    }).progress(function(instance, image) {
      loadProgress();
    });
  
    function loadProgress(imgLoad, image) {
      loadedCount++;
  
      loadingProgress = (loadedCount / imagesToLoad);

      TweenLite.to(progressTl, 0.7, {
        progress: loadingProgress,
        ease: Linear.easeNone
      });
  
    }
  
    var progressTl = new TimelineMax({
      paused: true,
      onUpdate: progressUpdate,
      onComplete: loadComplete
    });
  
    progressTl
      .to($('.progress span'), 1, {
      width: 100,
      ease: Linear.easeNone
    });
  
    function progressUpdate() {
      loadingProgress = Math.round(progressTl.progress() * 100);
      $(".txt-perc").text(loadingProgress + '%');
  
    }
  
    function loadComplete() {
  
      var preloaderOutTl = new TimelineMax();
  
      preloaderOutTl
        .to($('.progress'), 0.3, {
          y: 100,
          autoAlpha: 0,
          ease: Back.easeIn
        })
        .to($('.txt-perc'), 0.3, {
          y: 100,
          autoAlpha: 0,
          ease: Back.easeIn
        }, 0.1)
        .set($('body'), {
          className: '-=is-loading'
        })
        .set($('#intro'), {
          className: '+=is-loaded'
        })
        .to($('#preloader'), 0.7, {
          yPercent: 100,
          ease: Power4.easeInOut
        })
        .set($('#preloader'), {
          className: '+=is-hidden'
        })
        .from($('#intro .title'), 1, {
          autoAlpha: 0,
          ease: Power1.easeOut
        }, '-=0.2')
        .from($('#intro p'), 0.7, {
          autoAlpha: 0,
          ease: Power1.easeOut
        }, '+=0.2')
        .from($('.scroll-hint'), 0.3, {
          y: -20,
          autoAlpha: 0,
          ease: Power1.easeOut
        }, '+=0.1');
  
      return preloaderOutTl;
    }
  
    
  
  }(jQuery));