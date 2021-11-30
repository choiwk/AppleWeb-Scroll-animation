(() => {
  let scrollY = 0; //? window.scrollY 대신에 사용할 변수.
  let prevScrollHeight = 0; //? 현재 스크롤 위치(scrollY)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합.
  let currentScene = 0; //? 현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)

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
        messageA_opacity: [0, 1],
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
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs; //TODO: DOM 객체 요소들
    const values = sceneInfo[currentScene].values;
    const currentYScrollSet = scrollY - prevScrollHeight; //TODO: Scene이 바뀌면 scrollY 값이 다시 0에서 시작
    console.log(
      '현재 Scene ' +
        currentScene +
        ' 에서 ' +
        currentYScrollSet +
        ' 번째 스크롤'
    );
    switch (currentScene) {
      case 0:
        let messageA_opacity_0 = values.messageA_opacity[0];
        let messageA_opacity_1 = values.messageA_opacity[1];

        // console.log(calcValues(values.messageA_opacity, currentYScrollSet));

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
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }
    if (scrollY > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++; //! 현재 몇번째 Scene에 있는지.
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (scrollY < prevScrollHeight) {
      if (currentScene === 0) return; //? 브라우저 바운스 효과로 인해 마이너스 되는 것을 방지 (모바일).
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    console.log('총 scroll : ' + scrollY);
    console.log('시작영역 = ' + prevScrollHeight);
    console.log('다음 Scene : ' + `${prevScrollHeight + 5205}`);
    console.log('--------------------------');

    playAnimation();
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    scrollLoop();
  });
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout); //? 윈도우 창이 변할때 setLayout함수가 재실행 되도록 한다.
})();
