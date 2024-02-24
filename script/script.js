"use strict";

//////////////////////////////////////////////////////
////////IMPLEMENTING ASIDE MENU BAR///////////////
//////////////////////////////////////////////////////
const header = document.querySelector("header");
const allSections = document.querySelectorAll("section");
const sideBarUl = document.querySelector(".sidebar_ul");
const wholeSidebar = document.querySelector(".sideOverlay_menu_section");
const sidebarButton = document.querySelector(".sidebarButton");
allSections.forEach(function (domEle, ind, arr) {
  let eachHeading = domEle.querySelector(".section_title").textContent;
  let htmlContent = `<li data-classname="${domEle.classList[0]}">${eachHeading}</li>`;
  sideBarUl.insertAdjacentHTML("beforeend", htmlContent);
});
const allListElement = document.querySelectorAll(".sidebar_ul li");
const obsOption = {
  root: null,
  threshold: 0,
};
const allSectionObsOption = {
  root: null,
  threshold: 0.9,
};
sideBarUl.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    removeActiveLi(allListElement, "active_li");
    event.target.classList.add("active_li");

    let elementToScroll = document.querySelector(
      `.${event.target.dataset.classname}`
    );
    elementToScroll.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    return;
  }
});
const headerObserver = new IntersectionObserver(
  headerObsFun,
  obsOption
).observe(header);

Array.from(allSections).forEach(function (eachSection) {
  new IntersectionObserver(allSectionObsFun, allSectionObsOption).observe(
    eachSection
  );
});

//--------DRAGABLE functionality-------------//
// const dragable = {
//   state: false,
// };
// document.addEventListener("mouseup", function () {
//   dragable.state = false;
// });
// sidebarButton.addEventListener("mousedown", function () {
//   dragable.state = true;
// });
// sidebarButton.addEventListener("mousemove", function (event) {
//   if (dragable.state) {
//     if (event.movementX > 0) {
//       showSidenav();
//     } else {
//       hideSidenav();
//     }
//   }
// });
//---------Implementing click functionality-----------//
sidebarButton.addEventListener("click", function () {
  wholeSidebar.classList.toggle("hideSideMenu");
});

//----------Necessary call backs---------------
function removeActiveLi(elements, cssClass) {
  elements.forEach(function (listElement) {
    listElement.classList.remove(cssClass);
  });
}
function showSidenav() {
  wholeSidebar.classList.remove("hideSideMenu");
}
function hideSidenav() {
  wholeSidebar.classList.add("hideSideMenu");
}
function headerObsFun(events) {
  let [event] = events;
  if (!event.isIntersecting) {
    showSidenav();
  } else {
    hideSidenav();
  }
}

function allSectionObsFun(events) {
  let [event] = events;
  if (event.isIntersecting) {
    let classNameTarget = event.target.classList[0];
    let findElement = Array.from(allListElement).find(function (ele) {
      return ele.dataset.classname === classNameTarget;
    });
    removeActiveLi(allListElement, "active_li");
    findElement.classList.add("active_li");
  } else {
    return;
  }
}
//////////////////////////////////////////////////////
////////IMPLEMENTING THE TOP SLIDER///////////////
//////////////////////////////////////////////////////
const allSlides = document.querySelectorAll(".eachSlide");
const rightButtonTopSlider = document.querySelector(".arrowBoxRight");
const leftButtonTopSlider = document.querySelector(".arrowBoxLeft");
let maxSlide = allSlides.length;
let current_slider = 0;

//--Initialization of the slider ---//
gotoSlide(0);

rightButtonTopSlider.addEventListener("click", function (event) {
  const button = event.target.closest("div");
  if (button) {
    nextSlide();
  }
});

leftButtonTopSlider.addEventListener("click", function (event) {
  const button = event.target.closest("div");
  if (button) {
    previousSlide();
  }
});

setInterval(function () {
  nextSlide();
}, 7000);

//----Necessary call backs -----//
function gotoSlide(slideNum) {
  allSlides.forEach(function (ele, ind) {
    ele.style.transform = `translateX(${(ind - slideNum) * 100}%)`;
  });

  // document.querySelectorAll(".id_container").forEach((ele) => {
  //   ele.classList.remove("rightPosition");
  // });

  document.querySelectorAll(".sliderInfo_holder").forEach((ele) => {
    ele.classList.remove("rightPosition");
  });

  allSlides[slideNum]
    .querySelector(".sliderInfo_holder")
    .classList.add("rightPosition");

  // allSlides[slideNum]
  //   .querySelector(".id_container")
  //   .classList.add("rightPosition");
}
function nextSlide() {
  if (current_slider === maxSlide - 1) {
    current_slider = 0;
  } else {
    current_slider++;
  }

  gotoSlide(current_slider);
}

function previousSlide() {
  if (current_slider === 0) {
    current_slider = maxSlide - 1;
  } else {
    current_slider--;
  }
  gotoSlide(current_slider);
}
//////////////////////////////////////////////////////
////////ACTIVITIES OPACITY HOVER ANIMAION///////////////
//////////////////////////////////////////////////////
const projectParent = document.querySelector(".project_cards_holder");
projectParent.addEventListener("mouseover", hoverHandling.bind(0.3));
projectParent.addEventListener("mouseout", hoverHandling.bind(1));
//
// ------------Call back functions ------------------------
function hoverHandling(event) {
  let opacity = this;
  let targetItem = event.target.closest(".project_item");
  if (targetItem && targetItem.classList.contains("project_item")) {
    let itemsBlocks =
      targetItem.parentElement.querySelectorAll(".project_item");
    itemsBlocks.forEach(function (ele, ind, arr) {
      if (ele !== targetItem) {
        ele.style.opacity = opacity;
      }
    });
  }
}

//////////////////////////////////////////////////////
///////PROJECT AND TRAINNING OPACITY ON HOVER///////////////
//////////////////////////////////////////////////////
const trainningParent = document.querySelector(".trainning_holder");
trainningParent.addEventListener("mouseover", trainningHoverHandling.bind(0.3));
trainningParent.addEventListener("mouseout", trainningHoverHandling.bind(1));
//
// ------------Call back functions ------------------------
function trainningHoverHandling(event) {
  let opacity = this;
  let targetItem = event.target.closest(".each_trainning_block");
  if (targetItem && targetItem.classList.contains("each_trainning_block")) {
    let itemsBlocks = targetItem.parentElement.querySelectorAll(
      ".each_trainning_block"
    );
    itemsBlocks.forEach(function (ele, ind, arr) {
      if (ele !== targetItem) {
        ele.style.opacity = opacity;
      }
    });
  }
}
//////////////////////////////////////////////////////
////////IMPLEMENTING TIMELINE GRID////////////////////
//////////////////////////////////////////////////////
const allTimeLineContainer = document.querySelectorAll(".per_year_block");
let stepIdentifier = 1;
allTimeLineContainer.forEach(function (element, ind) {
  if (stepIdentifier % 2 == 0) {
    element.querySelector(".year_block").classList.add("year_block_even");
  } else {
    element.querySelector(".year_block").classList.add("year_block_odd");
  }
  stepIdentifier++;
});
//////////////////////////////////////////////////////
////////FREQUENTLY ASKED QUESTION/////////////////////
//////////////////////////////////////////////////////
const faqUl = document.querySelector(".faq_question_container ul");
const allFaqQuestions = document.querySelectorAll(
  ".faq_question_container ul li"
);
const ansLi = document.querySelectorAll(".ginven_ans_container ul li");
faqUl.addEventListener("click", function (event) {
  if (event.target.closest("li")) {
    let nearestLi = event.target.closest("li");
    let nearestLiDataId = nearestLi.dataset.questionid;
    removeActiveLi(allFaqQuestions, "active_faq_li");
    nearestLi.classList.add("active_faq_li");
    addClass(ansLi, "ans_hidden");
    // console.log(ansLi);
    let questionid =
      document.querySelector(".active_faq_li").dataset.questionid;
    let elementByQuestionID = document.querySelector(`#question_${questionid}`);
    if (elementByQuestionID) {
      elementByQuestionID.classList.remove("ans_hidden");
    }
  }
});

//-------------USEFULL CALBACKS and FUNCTIONS---------//
function addClass(ele, cssClass) {
  ele.forEach(function (item) {
    item.classList.add(cssClass);
  });
}
//////////////////////////////////////////////////////
////////IMPLEMENTING THE COMMENT SLIDER///////////////
//////////////////////////////////////////////////////
const commentSliderWrapper = document.querySelector(".slider_main_wrapper");
const allCommentSlider = document.querySelectorAll(".single_comment");
const comRightArrowBut = document.querySelector(".comArrRightBox");
const comLeftArrowBut = document.querySelector(".comArrLeftBox");
let currentComSlide = 0;
let highestComSlide = allCommentSlider.length;
let escapeslide =
  commentSliderWrapper.getBoundingClientRect().width < 595 ? 1 : 2;
sliderChalojao(0);

function sliderChalojao(number) {
  allCommentSlider.forEach(function (slide, index) {
    slide.style.transform = `translateX(${(index - number) * 100}%)`;
  });
}

function commentNextSlide() {
  if (currentComSlide === highestComSlide - escapeslide) {
    currentComSlide = 0;
  } else currentComSlide++;
  sliderChalojao(currentComSlide);
}

function commentPreviousSlide() {
  if (currentComSlide === 0) {
    currentComSlide = highestComSlide - 2;
  } else currentComSlide--;
  sliderChalojao(currentComSlide);
}

comRightArrowBut.addEventListener("click", function (event) {
  if (event.target.closest("div")) {
    commentNextSlide();
  }
});

comLeftArrowBut.addEventListener("click", function (event) {
  if (event.target.closest("div")) {
    commentPreviousSlide();
  }
});

//////////////////////////////////////////////////////
////////OPACITY Transition on SCROLL///////////////
//////////////////////////////////////////////////////
const opacityTransitionOption = {
  root: null,
  threshold: 0.4,
};
function opacityTransitionOnScroll(events, observer) {
  let [event] = events;
  if (event.isIntersecting) {
    event.target.classList.remove("opacityZero");
    observer.unobserve(event.target);
  }
}

allSections.forEach(function (eachSection) {
  const scrollObserver = new IntersectionObserver(
    opacityTransitionOnScroll,
    opacityTransitionOption
  ).observe(eachSection);
});

///////////////////////////////////////////
////////-- IMPLEMENTATION MAP -////////////
///////////////////////////////////////////
const branchListHolder = document.querySelector(".branch_list_holder");
const branchListUl = branchListHolder.querySelector("ul");
class MapOperation {
  #currentCoord;
  #mapView;
  #arrayOfCoordsObj;
  constructor() {
    this.#currentCoord;
    this.#arrayOfCoordsObj;
    this.#mapView;
    this._mapInitialization();
  }
  //-INITIAL MAP POSITIONING//
  async _mapInitialization() {
    await this._fetchingCoordsData();
    await this._getCurrentPos();
    await this._setViewWithCurPosition();
    this._parsingHtml();
  }
  //-GETTING COORDS OF CURRENT POSITION.//
  _getCurrentPos() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.#currentCoord = [latitude, longitude];
        resolve("SUCCESS");
      });
    }, this._getNoPosition);
  }
  //-SET MAP VIEW TO CURRENT POSITION//
  _setViewWithCurPosition() {
    return new Promise((resolve, reject) => {
      this.#mapView = L.map("map").setView(this.#currentCoord, 7);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(this.#mapView);
      resolve("SUCCESS");
    });
  }
  //-SETTING OTHER MARKET
  _setAdditionalMarker(eachCord) {
    L.marker(eachCord).addTo(this.#mapView);
  }
  //-GETTING SERVER DATA FOR COORDS//
  _fetchingCoordsData() {
    return new Promise((resolve, reject) => {
      this.#arrayOfCoordsObj = [
        {
          positionName: "Rajshahi Branch",
          coords: [23.9916227, 91.0618504],
        },
        {
          positionName: "Vushondi Branch",
          coords: [24.4326925, 90.760999],
        },
        {
          positionName: "Kakoli Branch",
          coords: [25.4326925, 89.760999],
        },
      ];
      resolve("SUCCESS");
    });
  }
  //-PUSHING HTML OF BRANCH NAME//
  _parsingHtml() {
    branchListHolder.querySelector("p").textContent = `Branch list (${
      this.#arrayOfCoordsObj.length
    })`;
    let listHTML = "";
    this.#arrayOfCoordsObj.forEach((ele) => {
      this._setAdditionalMarker(ele.coords);
      listHTML += `<li data-coord="${ele.coords.join("_")}">${
        ele.positionName
      }</li>`;
    });
    branchListUl.insertAdjacentHTML("beforeend", listHTML);
    branchListUl.addEventListener("click", this._panningToPosition.bind(this));
  }
  //-PANNING TO CLICKED COORDINATES//
  _panningToPosition(e) {
    let targetLi = e.target.closest("li");
    if (!targetLi) return;
    branchListUl.querySelectorAll("li").forEach((ele) => {
      ele.classList.remove("branch_list_active");
    });
    targetLi.classList.add("branch_list_active");
    const coordArr = targetLi.dataset.coord.split("_");
    this.#mapView.setView(coordArr, 9, { animate: true, pan: { duration: 1 } });
  }
}
const locationMap = new MapOperation();
