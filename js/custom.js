$(document).ready(function () {
  $('.services-item__right-top').on('click', function(){

    const $this = $(this).closest('.services-item');
    const $img = $this.find('.services-item__img');
    const $content = $this.find('.services-item__right-bottom');
    const isActive = $this.hasClass('active');

    if (isActive) {
      $this.removeClass('active');
      $content.slideUp(300);

      $img.animate({
        height: '80px',
        maxWidth: '50%'
      }, 300);
    } else {
      $('.services-item').removeClass('active');
      $('.services-item__right-bottom').slideUp(300);
      $('.services-item__img').animate({
        height: '80px',
        maxWidth: '50%'
      }, 0);

      $this.addClass('active');
      $content.slideDown(300);

      $img.animate({
        height: '246px',
        maxWidth: '100%'
      }, 300);
    }

  })
  $('.services-item__right-top').first().trigger('click');

  if($('.technology-list').length>0){
    const $list = $('.technology-list');
    const $items = $('.technology-item');
    const $firstItem = $items.first();

    $items.on('mouseenter', function () {
      $items.removeClass('active');
      $(this).addClass('active');
    });

    $list.on('mouseleave', function () {
      $items.removeClass('active');
      $firstItem.addClass('active');
    });
  }

  if($('.number__num').length>0){
    $(".number__num").each(function () {
      let $this = $(this),
          num = parseInt($this.data("num")),
          duration = parseInt($this.data("duration")) || 2000;
      $({count: 0}).animate({count: num}, {
        duration: duration,
        easing: "swing",
        step: function (now) {
          $this.find("b").text(Math.floor(now));
        },
        complete: function () {
          $this.find("b").text(num);
        }
      });
    });
  }

  $('.burger').on('click', function(){
    $(this).toggleClass('opened');
    $('.header').toggleClass('opened');
    $('html').toggleClass('no-scroll');
  })

  $('.header .menu__link').on('click', function() {
    close()
  });
  function close(){
    $('.burger').removeClass('opened');
    $('.header').removeClass('opened');
    $('html').removeClass('no-scroll');
  }

  function closeMobileHeader(val){
    if (val > 1200){
      close();
    }
  }

  $( window ).resize(function() {
    closeMobileHeader($(window).width())
  });
  Fancybox.bind("[data-fancybox]");

  const $tablinks = $('.tablinks a');
  const $tabcontent = $('.tabcontent');
  $tablinks.on('click', function (e){

    e.preventDefault();
    const $t = $(this);
    const id = $t .data('tab');
    const $tab = $(`.tabcontent[data-tab=${id}]`);
    $tabcontent.removeClass('show');
    $tablinks.removeClass('active');
    $t.addClass('active');
    $tab.addClass('show');

    $tab.find('.gallery-slider.swiper').each(function() {
      let swiperInstance = this.swiper; // Swiper сохраняется в DOM-элементе
      if (swiperInstance) swiperInstance.update();
    });
  })

  let sliders = [];

  $('.gallery-slider.swiper').each(function(_, el) {
    const $slider = $(el);
    const $current = $slider.find('.swiper-current');
    const $total = $slider.find('.swiper-total');

    const domTotal = $slider.find('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)').length;
    $total.text(domTotal);

    const swiper = new Swiper(el, {
      loop: false,
      centeredSlides: true,
      slidesPerView: 3,
      spaceBetween: 280,
      speed: 1000,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: $slider.find('.swiper-btn-next')[0],
        prevEl: $slider.find('.swiper-btn-prev')[0]
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,

        },
        600: {
          slidesPerView: 2,
          spaceBetween: 10,

        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 200,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 280,
        }
      },
      on: {
        init: function(sw) {
          const totalNow = $slider.find('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)').length;
          $total.text(totalNow);
          $current.text((sw.realIndex || 0) + 1);
        },
        slideChange: function(sw) {
          $current.text(sw.realIndex + 1);
        }
      }
    });

    sliders.push(swiper);

    if (!$slider.is(':visible')) {
      $current.text(1);
    }
  });
  $(window).on('resize', function() {
    sliders.forEach(function(sw) {
      sw.update();
      const $el = $(sw.el);
      $el.find('.swiper-total').text($el.find('.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)').length);
      $el.find('.swiper-current').text(sw.realIndex + 1);
    });
  });



  var text = $('.hero__title .typing').text().trim();

  var newText = text.split('').map(letter => '<span>' + letter + '</span>').join('');
  $('.hero__title .typing').html(newText);
  setTimeout(() => {
    $('.hero__title .typing span').each(function (index) {
      var t = $(this);
      setTimeout(() => {
        t.addClass('show');
        setTimeout(() => {
          t.addClass('unblur');
          if (index === $('.hero__title .typing span').length - 1) {
            $(document).trigger('aboutTypeEnd');
          }
        }, 100)
      }, 100 * index)
    })
  }, 1000)

  $(document).on('aboutTypeEnd', function () {
    setTimeout(() => {
      $('.hero__title .hidden').removeClass('hidden');
    }, 200)

    setTimeout(() => {
      $('.hero__item').each(function (index) {
        var t = $(this);
        setTimeout(() => {
          t.removeClass('hidden');
        }, 200 * index)
      })
    }, 700)

  })
});
