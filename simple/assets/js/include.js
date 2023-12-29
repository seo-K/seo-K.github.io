"use strict";

// 공통 헤더
const $HEADER_CONTENT = `
  <div class="_container">
    <a href="./index.html" class="header__logo">a</a>
    <div class="mobile-only">
      <button type="button" class="menu-button">
        <span class="menu-button__line"></span>
        <span class="menu-button__line"></span>
      </button>
    </div>
    <nav>
      <menu>
        <li><a href="" class="nav-link">About</a></li>
        <li><a href="" class="nav-link">Work</a></li>
        <li><a href="./blog.html" class="nav-link">Blog</a></li>
      </menu>
      <button type="button" class="system-theme">Light</button>
    </nav>
  </div>
  <div class="scroll">
    <div class="scroll__bar"></div>
  </div>
`;

// 공통 푸터
const $FOOTER_CONTENT = `
  <div class="inner">
    <a class="footer__logo" href="./index.html">
      <span class="blind">port</span>
    </a>
      <p class="copyright">Copyright &copy; ase</p>
    </div>
  </div>
`;

const $HEADER = document.querySelector("#header");
const $FOOTER = document.querySelector("#footer");
$HEADER && ($HEADER.innerHTML = $HEADER_CONTENT);
$FOOTER && ($FOOTER.innerHTML = $FOOTER_CONTENT);
