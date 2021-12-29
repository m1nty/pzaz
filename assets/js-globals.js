// utilities
let responsive = 900 < innerWidth ? false : true;
let responsiveMobile = 600 < innerWidth ? false : true;

window.addEventListener('resize', () => {
	responsive = 900 < innerWidth ? false : true;
	responsiveMobile = 600 < innerWidth ? false : true;
})

// event delegation
// example; on('body', 'click', '.accordion-toggle, .accordion-toggle *', e => {…});
const on = (selector, eventType, childSelectors, eventHandler) => {
  childSelectors = childSelectors.split(',');
  let elements = document.querySelectorAll(selector);
  for (element of elements) {
    element.addEventListener(eventType, eventOnElement => {
    	childSelectors.forEach(selector => {
    		if (eventOnElement.target.matches(selector)) {
	        eventHandler(eventOnElement)
	      }
    	})
    })
  }
}

const getOffset = el => {
	let elBounding = el.getBoundingClientRect();

	return {
		top: elBounding.top + scrollY,
		left: elBounding.left + scrollX,
	}
}