# Slider_PG - Slider 연습 프로젝트 진행 중
====
### 기능
1. 좌우 화살표 클릭시 슬라이더 페이지 이동

### 사용방법
1. slider-pg-0.0.1.min.js 를 HTML 파일상에 Import 를 합니다.
2. slider.pg.css 를 HTML 파일상에 Import 합니다.
3. 그다음 아래의 원하는 위치에 HTML 태그를 삽입 합니다. 여기서 first_slider 만 이름을 변경할 수 있습니다.

```
<div class="pg_sliders" id="first_slider">
		<ul class="pg_pages">
			<li><img src="./images/1.jpg"></li>
			<li><img src="./images/2.jpg"></li>
			<li><img src="./images/3.jpg"></li>
			<li><img src="./images/4.jpg"></li>
			<li><img src="./images/5.jpg"></li>
			<li><img src="./images/6.jpg"></li>
		</ul>
</div>
```

4. js 파일을 하나 생성하여 아래의 코드로 슬라이더를 추가해줍니다.

```
$(document).ready(function() {

	$('#first_slider').sliderPG({});
});
```

5. 슬라이더를 시작할때 옵션을 줄 수 있는데 옵션은 다음과 같습니다.

```
var settings = {
				width: 512, // 슬라이더 가로 크기
				delay: 800, // 애니메이션 실행 시간
				arrow: true // 슬라이더 화살표 유무 표시
			}
```

### Public 함수
1. gotoPage 함수. 사용자가 원하는 슬라이더 페이지로 이동합니다. 사용방법은 아래와 같습니다.

```
$('#first_slider').sliderPG('gotoPage', 2) // 3페이지로 이동(0부터 시작합니다.)
```

