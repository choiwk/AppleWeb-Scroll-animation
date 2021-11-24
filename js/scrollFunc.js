(() => {
  const sceneInfo = [
    {
      //TODO: 스크롤 높이의 정보를 담는곳.
      // 0
      type: 'sticky',
      heightNum: 5, //? 브라우저의 높이의 5배로 scrollHeight를 셋팅 할 것이다.
      scrollHeight: 0,
      objs: {
        //TODO: HTML 객체들을 모아두는 곳.
        container: document.querySelector('#scroll-section-0'),
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
    //TODO: 각 스크롤 섹션의 높이 셋팅.
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      //TODO: 각 scroll-section에 style 높이값을 홈페이지 높이 5배로 적용시킴.
    }
    console.log(sceneInfo);
  };
  window.addEventListener('resize', setLayout); //? 윈도우 창이 변할때 setLayout함수가 재실행 되도록 한다.
  setLayout();
})();
