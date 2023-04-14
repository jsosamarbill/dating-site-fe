const header = document.querySelector('.header');
const headerMnml = document.querySelector('.header-mnml');

/* Sign up Quiz */

const nextButton = document.querySelector('#quiz-next');
const skipButton = document.querySelector('#quiz-skip');
const submitButton = document.querySelector('#quiz-submit');
const totalStepsCounter = document.querySelector('#steps-total');
const currentStepIndicator = document.querySelector('#steps-current');
const progressBarIndicator = document.querySelector('#quiz-progress');
const contentTabs = document.querySelectorAll('.signup-quiz__main__content');
let currentStep = 0;

const updateProgress = () => {
  progressBarIndicator.style.width = `${Math.round(100/(contentTabs.length - currentStep))}%`;
  currentStepIndicator.innerHTML = currentStep + 1;
}


function updateStatusDisplay() {
  // If on the last step, hide the next button and show submit 
  if (currentStep === contentTabs.length - 1) {
    nextButton.classList.add('d-none')
    skipButton.classList.add('d-none')
    submitButton.classList.remove('d-none')
    //validateEntry()
    // If it's the first step, hide the previous button 
  } else if (currentStep == 0) {
    nextButton.classList.remove('d-none')
    skipButton.classList.add('d-none')
    submitButton.classList.add('d-none')
    // In all other instances, display both buttons 
  } else {
    nextButton.classList.remove('d-none')
    skipButton.classList.remove('d-none')
    submitButton.classList.add('d-none')
  }
}

if (document.querySelector('.signup-quiz')) {
  totalStepsCounter.innerHTML = contentTabs.length;
  updateProgress();

  nextButton.addEventListener('click', (event) => {
    // Prevent default on links 
    event.preventDefault()
  
    // Hide current tab 
    contentTabs[currentStep].classList.add('d-none')
  
  
    // Show next tab 
    contentTabs[currentStep + 1].classList.remove('d-none')
    currentStep += 1
    updateProgress();
    updateStatusDisplay();
  })
  
  skipButton.addEventListener('click', (event) => {
    // Prevent default on links 
    event.preventDefault()
  
    // Hide current tab 
    contentTabs[currentStep].classList.add('d-none')
    
    // Show next tab 
    contentTabs[currentStep + 1].classList.remove('d-none')
    currentStep += 1
    updateProgress();
    updateStatusDisplay();
  })
}



/* Double Range Slider */

let rangeMin = 1;
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".peoples__filter-range__numbers input");

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minRange = parseInt(rangeInput[0].value);
    let maxRange = parseInt(rangeInput[1].value);
    console.log('minRange', minRange);
    console.log('maxRange', maxRange);
    if (maxRange - minRange < rangeMin) {     
      if (e.target.className === "min") {
        rangeInput[0].value = maxRange - rangeMin;        
      } else {
        rangeInput[1].value = minRange + rangeMin;        
      }
    } else {
      rangePrice[0].value = minRange;
      rangePrice[1].value = maxRange;
      range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
    }
  });
});

rangePrice.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = rangePrice[0].value;
    let maxPrice = rangePrice[1].value;
    if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});
