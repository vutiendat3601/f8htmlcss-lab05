window.onload = () => {
  autoSliding();
};

const feedbackSlideshowElem = document.getElementById('feedbackSlideshow');
const feedbackSlide = document.getElementById('feedbackSlide');
const feedbackItemElems = document.getElementsByClassName('feedback-item');
const slideshowControl = document.getElementById('slideshowControl');
const numOfItems = feedbackItemElems.length;
const root = document.querySelector(':root');

if (numOfItems > 0) {
  let prevIndex = -1;
  let index = 0;
  let intervalId = -1;
  let timeoutId = -1;
  let clientX = 0;
  feedbackSlide.ontouchstart = (e) => {
    clientX = e.touches[0].clientX;
  };
  feedbackSlide.ontouchmove = (e) => {
    clearIntervalAndTimeout();
    const offsetX = e.touches[0].clientX - clientX;
    if (offsetX > 0) {
      if (0 < index) {
        showFeedback(index - 1);
      }
    } else if (offsetX < 0) {
      if (index < numOfItems - 1) {
        showFeedback(index + 1);
      }
    }
  };
  function autoSliding() {
    intervalId = setInterval(() => {
      let width = feedbackItemElems[0].offsetWidth;
      slideshowControl.children[index]?.classList.remove('active');
      if (prevIndex < index) {
        prevIndex = index;
        index = ++index % numOfItems;
        prevIndex = index >= numOfItems - 1 ? numOfItems : prevIndex;
      } else {
        prevIndex = index;
        index = --index % numOfItems;
        prevIndex = index <= 0 ? -1 : prevIndex;
      }
      // slideshowControl.children

      root.style.setProperty(
        '--feedback-slide-translate',
        `calc((${-width}px - var(--spacer-x)) * ${index})`
      );
      slideshowControl.children[index]?.classList.add('active');
      feedbackSlide.style.setProperty(
        'transform',
        `translateX(calc((${-width}px - var(--spacer-x)) * ${index}))`
      );
      feedbackSlide.style.setProperty(
        '--webkit-transform',
        `translateX(calc((${-width}px - var(--spacer-x)) * ${index}))`
      );
      // feedbackSlide.style.translate = `calc((${-width}px - var(--spacer-x)) * ${index})`;
    }, 2500);
  }
  function showFeedback(i) {
    clearIntervalAndTimeout();
    slideshowControl.children[index]?.classList.remove('active');
    index = i;
    prevIndex = index >= numOfItems - 1 ? numOfItems : index - 1;
    let width = feedbackItemElems[0].offsetWidth;
    slideshowControl.children[index]?.classList.add('active');
    feedbackSlide.style.translate = `calc((${-width}px - var(--spacer-x)) * ${index})`;
    timeoutId = setTimeout(() => {
      autoSliding();
    }, 10000);
  }
  function clearIntervalAndTimeout() {
    window.clearInterval(intervalId);
    window.clearTimeout(timeoutId);
  }
}