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

			this.container = $(this.instance);
			this.sliderPages = this.container.find('ul.pg_pages');
			this.container.css('width', this.options.width + 'px'); // 슬라이더 가로 크기
			this.totalSliderCount = this.sliderPages.children().length; // 슬라이더 총 갯수
			this.sliderPages.css('width', (this.totalSliderCount * this.options.width) + 'px'); // 슬라이더 총 가로 길이

			this._sliderArrow();
			this._arrowClickEvent();
		},

		/**
		 * 좌우 화살표 유무를 표시하는 함수
		 * 
		 * @method _sliderArrow
		 */
		_sliderArrow: function() {

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
			
			if ( (index < 0) || (index > (this.totalSliderCount -1)) ) {

				console.error('>>>> gotoPage(' + index + ') Array Index Out Of Bounds Error');
			} else {

				var that = this;
				var moveX = index * this.options.width;

				this.sliderPages.animate({marginLeft: -moveX}, this.options.delay);
			}
		}
	};

	$.fn.sliderPG = function(options) {

		var args = arguments;

		return this.each(function() {

			var settings = {
				width: 512, // 슬라이더 가로 크기
				delay: 800, // 애니메이션 실행 시간
				arrow: true // 슬라이더 화살표 유무 표시
			}

			$.extend(settings, options);

			if ( typeof $(this).data('sliderPG') === 'undefined' ) {

				var newInstance = new SliderPG(this, settings);

				$( this ).data('sliderPG', newInstance);
			} else {

				var currentInstance = $(this).data('sliderPG');
				currentInstance[args[0]](args[1]);
			}
		});
	};
}(window, jQuery));