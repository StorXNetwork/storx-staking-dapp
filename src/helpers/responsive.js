window.$ = window.jQuery = require("jquery");

export const OnScroll = (event) => {
  const scrollTop = event.target.scrollingElement.scrollTop;
  const e = window.document.getElementsByClassName("sticky")[0];
  if (scrollTop >= 50) {
    let currClass = e.getAttribute("class");
    if (!currClass.includes("nav-sticky")) {
      currClass += " nav-sticky";
      e.setAttribute("class", currClass);
    }
  } else {
    let currClass = e.getAttribute("class");
    if (currClass.includes("nav-sticky")) {
      currClass = currClass.replace("nav-sticky", "");
      e.setAttribute("class", currClass);
    }
  }
};

export const InitScrollToTop = () => {
  window.$(window).scroll(function () {
    if (window.$(this).scrollTop() > 100) {
      window.$(".back-to-top").fadeIn();
    } else {
      window.$(".back-to-top").fadeOut();
    }
  });
  window.$(".back-to-top").click(function () {
    window.$("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });
};

export const InitStackableTable = () => {
  window.$(document).ready(function () {
    FlexTable();
    window.onresize = function (event) {
      FlexTable();
    };
  });
};

export const FlexTable = () => {
  if (window.$(window).width() < 768) {
    window.$(".table-responsive-stack").each(function (i) {
      window.$(this).find(".table-responsive-stack-thead").show();
      window.$(this).find("thead").hide();
    });
  } else {
    window.$(".table-responsive-stack").each(function (i) {
      window.$(this).find(".table-responsive-stack-thead").hide();
      window.$(this).find("thead").show();
    });
  }
};
