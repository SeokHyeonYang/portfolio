"use strict"; // 우리가 이상한 짓을 못하도록 방지

// 맨 위에 있을 때 탐색 막대를 투명하게 표시
const navbar = document.querySelector("#navbar");
// navbar의 높이를 알 수 있는 함수
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  console.log(window.scrollY);
  console.log(`navbarHeight : ${navbarHeight}`);

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

// handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// 반복되는 함수는 하나로 정리해두기
// selector를 받아오면 그것에 대한 것을 찾아간다.
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
