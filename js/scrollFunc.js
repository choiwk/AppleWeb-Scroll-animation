(() => {
  let scrollY = 0; //? window.scrollY 대신에 사용할 변수.
  let prevScrollHeight = 0; //? 현재 스크롤 위치(scrollY)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합.
  let currentScene = 0; //? 현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; //? 새로운 Scene이 시작되는 순간 true. (currentScene이 바뀌는 순간)

  const sceneInfo = [
    {
      //?: 스크롤 높이의 정보를 담는곳.
      // 0
      type: 'sticky',
      heightNum: 5, //? 브라우저의 높이의 5배로 scrollHeight를 셋팅 할 것이다.
      scrollHeight: 0,
      objs: {
        //?: HTML 객체들을 모아두는 곳.
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }], //? 비율로 계산했기 때문에 0.1 ~ 0.2 약 10% 구간에서 동작 하도록 설정.
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }], //? 20% 구간에서 opacity가 동작하도록 설정.
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [0, 1, { start: 0.1, end: 0.2 }],
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  const setLayout = () => {
    //?: 각 스크롤 섹션의 높이 셋팅.
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      //?: 각 scroll-section에 style 높이값을 홈페이지 높이 5배로 적용시킴.
    }

    scrollY = window.scrollY;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      //?: 각 Scene에 scrollHeight의 값을 더해서 totalScrollHeight에 넣어주고 있다.
      totalScrollHeight += sceneInfo[i].scrollHeight;

      if (totalScrollHeight >= scrollY) {
        //?: 현재 scroll 위치보다 totalScrollHeight의 값이 더 크면

        currentScene = i; //? 현재 i값을 currentScene로 셋팅을 하고.
        break; //? for문을 멈추고 빠져나온다.
      }
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`);
  };

  function calcValues(values, currentYScrollSet) {
    //? currentYScrollSet: 현재 Scene에서 얼마나 스크롤 됬는지.
    const scrollHeight = sceneInfo[currentScene].scrollHeight;

    //? scrollRatio : 현재 (Scene)에서 스크롤된 범위를 비율로 구하기
    const scrollRatio = currentYScrollSet / scrollHeight;
    let rv;

    if (values.length === 3) {
      //? start ~ end 사이에 animation 실행.
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs; //TODO: DOM 객체 요소들
    const values = sceneInfo[currentScene].values;
    const currentYScrollSet = scrollY - prevScrollHeight; //TODO: Scene이 바뀌면 scrollY 값이 다시 0에서 시작
    // console.log(
    //   `scrollY : ${scrollY} - prevScrollHeight :${prevScrollHeight} = ${
    //     scrollY - prevScrollHeight
    //   }`
    // );
    console.log(
      '현재 Scene ' +
        currentScene +
        ' 에서 ' +
        currentYScrollSet +
        ' 번째 스크롤'
    );
    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opacity_in,
          currentYScrollSet
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        console.log(messageA_opacity_in);

        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }
    if (scrollY > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++; //? 현재 몇번째 Scene에 있는지.
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (scrollY < prevScrollHeight) {
      if (currentScene === 0) return; //? 브라우저 바운스 효과로 인해 마이너스 되는 것을 방지 (모바일).
      enterNewScene = true;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // console.log('총 scroll : ' + scrollY);
    // console.log('시작영역 = ' + prevScrollHeight);
    // console.log('다음 Scene : ' + `${prevScrollHeight + 5205}`);
    console.log('--------------------------');

    if (enterNewScene) return;
    //? enterNewScene이 true 이면 Scene이 바뀌는 순간 이상한 값이 들어갔을 때는 playAnimation() 를 호출하지 않고 종료된다.

    playAnimation();
  }

  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
    scrollLoop();
  });
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout); //? 윈도우 창이 변할때 setLayout함수가 재실행 되도록 한다.
})();
