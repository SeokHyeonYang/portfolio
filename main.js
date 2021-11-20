"use strict"; // 우리가 이상한 짓을 못하도록 방지

// 맨 위에 있을 때 탐색 막대를 투명하게 표시
const navbar = document.querySelector("#navbar");
// navbar의 높이를 알 수 있는 함수
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  //  console.log(window.scrollY);
  //  console.log(`navbarHeight : ${navbarHeight}`);

  // 만약 윈도우의 스크롤이 navbar의 높이보다 클 시
  if (window.scrollY > navbarHeight) {
    // navbar의 navbar--dark 클래스를 추가한다.
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Navbar 메뉴를 누를 때 스크롤을 처리합니다.
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  // event.target -> 우리가 클릭한 요소가 출력
  // datatet -> 우리가 정의한 변수들이 할당
  const target = event.target;
  const link = target.dataset.link;
  // 우리가 원하지 않는 데이터는 실행되지 않게 하기 위함
  if (link == null) {
    return; // 아무것도 하지 않는다.
  }
  scrollIntoView(link);
});

// home에서 "contact me" button 을 클릭합니다.
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  // 스크롤이 그쪽으로 바로 이동한다.
  scrollIntoView("#contact");
});

// 아래로 스크롤 되면서 점점 투명해지게 한다.
const home = document.querySelector(".home__container");
const homeheight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  // 투명도를 정하는 공식
  home.style.opacity = 1 - window.scrollY / homeheight;
});

// 스크롤을 아래로 내릴 때 arrow-up 버튼을 보여준다.
const arrowUp = document.querySelector(".arrow-up");

document.addEventListener("scroll", () => {
  if (window.scrollY > homeheight / 2) {
    // classList => 없으면 있게 , 있으면 없게 하는 함수
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow-up" button
arrowUp.addEventListener("click", () => {
  //버튼을 누를때 홈으로 이동
  scrollIntoView("#home");
});

//Projects
// my work의 상단 버튼
const workBtnContainer = document.querySelector(".work__categories");
// my work의 하단 이미지 프로젝트
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  // 데이터의 필터를 누르는데 안에 스팬이 있어 필터영역에 들어가지 않을 경우
  // 부모노드의 필터를 빌려 쓴다.
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // 이전 항목에서 선택을 제거하고 새 항목을 선택합니다.
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected"); // class의 selected를 없애준다.
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  // 클릭된 것이 버튼이면 그대로 쓰고 아니면 (스팬일 경우) parentNode = button이니깐 버튼을 쓴다.
  target.classList.add("selected"); //현재 선택된 아이 -> e.target

  // 애니메이션 효과를 위한 클래스 추가
  projectContainer.classList.add("anime-out");
  // prijects array의 아이템을 for each를 통해 하나당 각각 번갈아 가면서  하나씩 해준다
  // 몇초의 시간이 흐른 뒤 다시 anime-out을 없애줘야 한다.
  // 지워주지 않으면 계속 anime-out 상태를 유지하게 된다.
  // 0.3초가 지나면 첫번쨰 인자인 {} 함수를 부른다.
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || project.dataset.type === filter) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anime-out");
  }, 300);
});

// 반복되는 함수는 하나로 정리해두기
// selector를 받아오면 그것에 대한 것을 찾아간다.
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
