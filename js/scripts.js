const header = document.querySelector('.header');
const headerMnml = document.querySelector('.header-mnml');

/* Sign up Quiz */

const nextButton = document.querySelector('#quiz-next');
const skipButton = document.querySelector('#quiz-skip');
const backButton = document.querySelector('#quiz-back');
const submitButton = document.querySelector('#quiz-submit');
const totalStepsCounter = document.querySelector('#steps-total');
const currentStepIndicator = document.querySelector('#steps-current');
const progressBarIndicator = document.querySelector('#quiz-progress');
const contentTabs = document.querySelectorAll('.signup-quiz__main__content');
let currentStep = 0;

const updateProgress = () => {
  progressBarIndicator.style.width = `${Math.round((100/contentTabs.length) * (currentStep + 1))}%`;
  currentStepIndicator.innerHTML = currentStep + 1;
  console.log(currentStep);
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
    backButton.classList.add('d-none')
    submitButton.classList.add('d-none')
    // In all other instances, display both buttons 
  } else {
    nextButton.classList.remove('d-none')
    skipButton.classList.remove('d-none')
    backButton.classList.remove('d-none')
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

  backButton.addEventListener('click', (event) => {
    // Prevent default on links 
    event.preventDefault()
  
    // Hide current tab 
    contentTabs[currentStep].classList.add('d-none')
    
    // Show previous tab 
    contentTabs[currentStep - 1].classList.remove('d-none')
    currentStep -= 1
    updateProgress();
    updateStatusDisplay();
  })
}


/* Double Range Slider */

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#ECECEC', '#EB477B', controlSlider);
  if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
  } else {
      fromSlider.value = from;
  }
}
  
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#ECECEC', '#EB477B', controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
  } else {
      toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
const [from, to] = getParsed(fromSlider, toSlider);
fillSlider(fromSlider, toSlider, '#ECECEC', '#EB477B', toSlider);
if (from > to) {
  fromSlider.value = to;
  fromInput.value = to;
} else {
  fromInput.value = from;
}
}

function controlToSlider(fromSlider, toSlider, toInput) {
const [from, to] = getParsed(fromSlider, toSlider);
fillSlider(fromSlider, toSlider, '#ECECEC', '#EB477B', toSlider);
setToggleAccessible(toSlider);
if (from <= to) {
  toSlider.value = to;
  toInput.value = to;
} else {
  toInput.value = from;
  toSlider.value = from;
}
}

function getParsed(currentFrom, currentTo) {
const from = parseInt(currentFrom.value, 10);
const to = parseInt(currentTo.value, 10);
return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max-to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
    ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
    ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
const toSlider = document.querySelector('#toSlider');
if (Number(currentTarget.value) <= 0 ) {
  toSlider.style.zIndex = 2;
} else {
  toSlider.style.zIndex = 0;
}
}

function updateRangeNumbersDisplay(elements, from, to) {
  if (elements) {
    elements[0].innerHTML = from.value;
    elements[1].innerHTML = to.value;
  }
}

const filterRangeOnPage = document.querySelector('.peoples__filter-range');

if (filterRangeOnPage) {
  const fromSlider = document.querySelector('#fromSlider');
  const toSlider = document.querySelector('#toSlider');
  const fromInput = document.querySelector('#fromInput');
  const toInput = document.querySelector('#toInput');
  fillSlider(fromSlider, toSlider, '#ECECEC', '#EB477B', toSlider);
  setToggleAccessible(toSlider);
  
  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
  fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
  toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
  
  const rangeNumbersDisplay = document.querySelectorAll('.peoples__filter-range__numbers span');
  
  updateRangeNumbersDisplay(rangeNumbersDisplay, fromInput, toInput);
  
  fromSlider.addEventListener('input', (e) => {
    updateRangeNumbersDisplay(rangeNumbersDisplay, fromInput, toInput);
  })
  
  toSlider.addEventListener('input', (e) => {
    updateRangeNumbersDisplay(rangeNumbersDisplay, fromInput, toInput);
  })
}

// if ($('.form__select-multiple-items select')) {
//   $('.form__select-multiple-items select').chosen();
// }


class CustomSelect {
  constructor(originalSelect) {
    this.originalSelect = originalSelect;
    this.customSelect = document.createElement("div");
    this.customSelect.classList.add("traits-select");

    this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
      const itemElement = document.createElement("div");

      itemElement.classList.add("traits-select__item");
      itemElement.textContent = optionElement.textContent;
      this.customSelect.appendChild(itemElement);

      if (optionElement.selected) {
        this._select(itemElement);
      }

      itemElement.addEventListener("click", () => {
        if (
          this.originalSelect.multiple &&
          itemElement.classList.contains("traits-select__item--selected")
        ) {
          this._deselect(itemElement);
        } else {
          this._select(itemElement);
        }
      });
    });

    this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
    this.originalSelect.style.display = "none";
  }

  _select(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    if (!this.originalSelect.multiple) {
      this.customSelect.querySelectorAll(".traits-select__item").forEach((el) => {
        el.classList.remove("traits-select__item--selected");
      });
    }

    this.originalSelect.querySelectorAll("option")[index].selected = true;
    itemElement.classList.add("traits-select__item--selected");
  }

  _deselect(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    this.originalSelect.querySelectorAll("option")[index].selected = false;
    itemElement.classList.remove("traits-select__item--selected");
  }
}

document.querySelectorAll(".custom-select").forEach((selectElement) => {
  new CustomSelect(selectElement);
});

document.querySelectorAll(".gender-select").forEach((selectElement) => {
  const genderSelect = selectElement.nextSibling;
  genderSelect.classList.add('gender-select');
  const genderSelectItems = genderSelect.querySelectorAll('.traits-select__item');
  const selectOptions = selectElement.options;
  
  for (var i =0; i < selectOptions.length; i++) {
    console.log(selectOptions[i].dataset.value);
    genderSelectItems[i].dataset.value = selectOptions[i].dataset.value;
    genderSelectItems[i].innerHTML = `<span>${selectOptions[i].dataset.value}</span>`;
  }
});
