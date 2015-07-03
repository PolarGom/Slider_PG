(function(window, $) {

	/**
	 * Eda 슬라이더 클래스 함수
	 *
	 * @class SliderPG
	 */
	var SliderPG = function(instance, options) {

		/**
		 * 슬라이더로 지정한 객체
		 *
		 * @property instance
		 * @type Object
		 * @default Null
		 */
		this.instance = instance;

		/**
		 * 슬라이더로 지정한 DOM 객체
		 * 
		 * @property container
		 * @type Object
		 * @default Null
		 */
		this.container = null;

		/**
		 * 슬라이더 안에 있는 페이지 리스트
		 * 
		 * @property sliderPages
		 * @type Array
		 * @default Null
		 */
		this.sliderPages = null;

		/**
		 * 총 슬라이더 안에 페이지 갯수
		 * 
		 * @property totalSliderCount
		 * @type Number
		 * @default 0
		 */
		this.totalSliderCount = 0;

		/**
		 * 현재 슬라이더 페이지 위치
		 * 
		 * @property pageCurrent
		 * @type Number
		 * @default 0
		 */
		this.pageCurrent = 0; 

		/**
		 * 슬라이더 옵션 값
		 * 
		 * @property options
		 * @type Object
		 * @default {width: 512, delay: 800, arrow: true}
		 */
		this.options = options; 

		/**
		 * IE가 구버전인지 확인하는 값(8 ,9 ,10 해당)
		 * 
		 * @property isIE
		 * @type Boolean
		 * @default false
		 */
		this.isIE = false;

		/**
		 * 모바일 브라우저인지 체크하는 값
		 * 
		 * @property isMobile
		 * @type Boolean
		 * @default false
		 */
		this.isMobile = false;

		/**
		 * 터치가 시작됐을때 X 좌표 값
		 * 
		 * @property touchX
		 * @type Number
		 * @default 0
		 */
		this.startTouchX = 0;

		/**
		 * 터치가 완료 되었을때 Y 좌표 값
		 * 
		 * @property touchY
		 * @type Number
		 * @default 0
		 */
		this.endTouchX = 0;

		/**
		 * 터치할때 움직이는 슬라이더 값
		 * 
		 * @property moveSliderTouchX
		 * @type Number
		 * @default 0
		 */
		this.moveSliderTouchX = 0;

		this._init();
	};

	SliderPG.prototype = {

		/**
		 * Eda 슬라이더 초기화 함수
		 *
		 * @class SliderPG
		 * @constructor
		 */
		_init: function() {

			var that = this;
			var mobileInfos = ['Android', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson'];

			this.container = $(this.instance);
			this.sliderPages = this.container.find('ul.pg_pages');
			this.container.css('width', this.options.width + 'px'); // 슬라이더 가로 크기
			this.totalSliderCount = this.sliderPages.children().length; // 슬라이더 총 갯수
			this.sliderPages.css('width', (this.totalSliderCount * this.options.width) + 'px'); // 슬라이더 총 가로 길이

			// IE 10 이하인지 체크하는 구문
			if ( window.navigator.userAgent.indexOf('MSIE') > -1 ) {

				this.isIE = true;
			}
			
			// 모바일 브라우저인지 체크하는 구문
			for ( var index = 0, mobileInfoSize = mobileInfos.length; index < mobileInfoSize; index++ ) {

				if ( navigator.userAgent.match(mobileInfos[index]) !== null ) {
			        
					this.isMobile = true;

			        break;
			    }
			}
			
			this._setSliderArrow();
			this._arrowClickEvent();
			this._touchSwipeEvent();
			this._setSliderInterval();
		},

		/**
		 * 좌우 화살표 유무를 표시하는 함수
		 * 
		 * @method _setSliderArrow
		 */
		_setSliderArrow: function() {

			var that = this;

			if ( this.options.arrow === true ) {

				this.container.append('<div class="prev"></div>');
				this.container.append('<div class="next"></div>');
			}
		},

		/**
		 * 좌우 화살표 클릭 이벤트 함수
		 * 
		 * @method _arrowClickEvent
		 */
		_arrowClickEvent: function() {

			var that = this;

			this.container.find('div.prev').click(function() {

				that._prevPage();
			});

			this.container.find('div.next').click(function() {

				that._nextPage();
			});
		},

		/**
		 * 슬라이더를 이전 페이지로 움직이는 함수
		 * 
		 * @method _prevPage
		 */
		_prevPage: function() {

			var that = this;

			this.pageCurrent -= 1;

			if ( this.pageCurrent < 0 ) {

				this.pageCurrent = (this.totalSliderCount -1); // 배열은 0부터 시작하기때문에 총 6장이면 마지막 페이지는 5이다.
			}

			this.gotoPage(this.pageCurrent);
		},

		/**
		 * 슬라이더를 다음 페이지로 움직이는 함수
		 * 
		 * @method _nextPage
		 */
		_nextPage: function() {

			var that = this;

			this.pageCurrent += 1;

			if ( this.pageCurrent > (this.totalSliderCount -1) ) {

				this.pageCurrent = 0; // 맨처음 슬라이드로 이동한다.
			}

			this.gotoPage(this.pageCurrent);
		},

		/**
		 * 특정 페이지로 이동하는 함수
		 *
		 * @method gotoPage
		 * @param index {Number} 이동할 페이지
		 */
		gotoPage: function(index) {

			var that = this;

			if ( (index < 0) || (index > (this.totalSliderCount -1)) ) {

				console.error('>>>> gotoPage(' + index + ') Array Index Out Of Bounds Error');
			} else {

				var moveX = index * this.options.width;

				this.sliderPages.animate({marginLeft: -moveX}, this.options.delay);
			}
		},

		/**
		 * 슬라이드 페이지가 자동으로 움직일지 셋팅하는 함수
		 *
		 * @method _setSliderInterval
		 */
		_setSliderInterval: function() {

			var that = this;
			var sliderAutoAnimation = null;

			if ( (this.options.autoSlide === true) && (this.isIE === true) ) {

				// IE 10 이하 버전에서 작동하는 타이머
				sliderAutoAnimation = setInterval(function() {

					that._nextPage();
				}, this.options.autoIntervalDely);
			} else if ( (this.options.autoSlide === true) && (this.isIE === false) ) {

				console.log('Not IE');

				// IE 11 이상 및 파이어폭스 ,크롬, 사파리에서 작동하는 타이머
				window.requestAnimFrame = function() {
				    return  window.requestAnimationFrame       	|| 
				            window.webkitRequestAnimationFrame	|| 
				            window.mozRequestAnimationFrame    	|| 
				            window.oRequestAnimationFrame      	|| 
				            window.msRequestAnimationFrame;
				};

				sliderAutoAnimation = function() {

					setTimeout(function() {

						window.requestAnimFrame(sliderAutoAnimation());
						that._nextPage();
					}, that.options.autoIntervalDely);
				};

				sliderAutoAnimation();
			}	
		},

		/**
		 * 좌우 터치로 슬라이드 했을때 발생하는 이벤트
		 *
		 * @method _touchSwipeEvent
		 */
		 _touchSwipeEvent: function() {

		 	var that = this;

		 	if ( (this.isMobile === true) && (this.options.touch === true) ) {

		 		this.sliderPages.bind('touchstart', function(event) {

		 			event.preventDefault();

		 			// 터치는 브라우저 width 0부터 시작하기 때문에 해당 레이어의 위치를 구한뒤 빼야 레이어의 0부터 시작함
		 			that.startTouchX = event.originalEvent.targetTouches[0].pageX - that.container.offset().left;
		 		});	

		 		this.sliderPages.bind('touchmove', function(event) {

					event.preventDefault();		 			

					that.moveSliderTouchX = -(that.pageCurrent * that.options.width) + (event.originalEvent.targetTouches[0].screenX - that.container.offset().left - that.startTouchX);

					that.sliderPages.animate({marginLeft: that.moveSliderTouchX}, 0);

				});

		 		this.sliderPages.bind('touchend', function(event) {

		 			that.endTouchX = event.originalEvent.changedTouches[0].pageX - that.container.offset().left;

		 			if ( (that.pageCurrent === 0) && (that.moveSliderTouchX > 0) ) {

		 				// 슬라이더가 marginLeft로 움직일때 값이 0보다 클 경우 첫번째 페이지이기 때문에 맨 처음 페이지로 이동
		 				that.gotoPage(0); 
		 			} else if ( (that.pageCurrent === that.totalSliderCount - 1) 
		 						&& (that.moveSliderTouchX < -(that.pageCurrent * that.options.width)) ) {

		 				// 슬라이더가 marginLeft로 움직일때 값이 -2560(예시값)보다 클 경우 마지막 페이지이기 때문에 마지막 페이지로 이동
		 				that.gotoPage(that.totalSliderCount - 1);
		 			} else {

		 				// 좌우 움직일 방향을 정하는 구문
		 				if ( that.startTouchX > that.endTouchX ) {

		 					that.pageCurrent += 1;
		 				} else if ( that.startTouchX < that.endTouchX ) {

		 					that.pageCurrent -= 1;
		 				}

		 				that.gotoPage(that.pageCurrent);
		 			}
		 		});
		 	}
		 }
	};

	$.fn.sliderPG = function(options) {

		var args = arguments;

		return this.each(function() {

			var settings = {
				width: 512, // 슬라이더 가로 크기
				delay: 800, // 애니메이션 실행 시간
				arrow: true, // 슬라이더 화살표 유무 표시
				autoSlide: false, // 슬라이드가 자동으로 움직일지 유무 값
				autoIntervalDely: 2000, // 슬라이드가 자동으로 움직일 시간
				touch: false // 슬라이드가 모바일 터치 지원 유무 판단하는 값
			}

			$.extend(settings, options);

			if ( typeof $(this).data('sliderPG') === 'undefined' ) {

				var newInstance = new SliderPG(this, settings);

				$(this).data('sliderPG', newInstance);
			} else {

				var currentInstance = $(this).data('sliderPG');
				currentInstance[args[0]](args[1]);
			}
		});
	};
}(window, jQuery));