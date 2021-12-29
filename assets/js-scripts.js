// pieces and components
const initPageTransition = () => {
	document.querySelectorAll('a[href]').forEach(item => {
		// if href points to anchor, or points to anchor that exists on page
		if(item.href.startsWith('#') || 
			(item.href.split('#')[1] && 
			item.href.split('#')[0] == window.location.href.split('#')[0])) {
			item.setAttribute('data-page-transition', 'scroll');

		} else if((item.href.includes(siteUrl) || item.href.startsWith('/')) && 
			(item.target != '_blank' && !item.href.includes('mailto:'))) {
			item.setAttribute('data-page-transition', 'internal');
		} else {
			item.rel = 'noopener';
			item.target = '_blank';
		}
	});

	document.querySelectorAll('[data-page-transition]').forEach(item => {
		item.addEventListener('click', (e) => {
			let target = e.target.hasAttribute('data-page-transition') 
				? e.target : e.target.closest('[data-page-transition]');

			target.blur();

			if(target.dataset.pageTransition == 'internal' && !root.classList.contains('key-is-down')) {
				e.preventDefault();
				root.classList.remove('header-is-sticky', 'menu-is-active', 'mobile-menu-is-active', 'minicart-is-active');
				root.classList.add('is_leaving');

				setTimeout(() => {
					location.href = target.href;
				}, 400);

			} else if(target.dataset.pageTransition == 'scroll') {
				e.preventDefault();
				seamless.elementScrollIntoView(document.querySelector(`#${target.href.split('#')[1]}`), {
					behavior: 'smooth'
				});
			}
		});
	});

	window.addEventListener('keydown', () => {
		root.classList.add('key-is-down');
	});

	window.addEventListener('keyup', () => {
		root.classList.remove('key-is-down');
	});
}
const initPageAnimation = () => {
	document.querySelectorAll('[data-animate]').forEach(item => {
		let observer = new IntersectionObserver(el => {
			if(el[0].isIntersecting === true && 
				!el[0].target.classList.contains('is-animated')) {
				el[0].target.classList.add('is-animated');
			}
		}, { threshold: [0.4] });// 0 = page start; 1 = page bottom, items only revealed when in full view

		observer.observe(item);
	});
}

const initAccordions = () => {

	const toggleAccordion = (accordion,isActive) => {
		isActive ? accordion.classList.remove('expand') : accordion.classList.add('expand')
	}

	const closeAccordions = () => {
		let activeAccordions = document.querySelectorAll('.accordion-item.expand');
		activeAccordions.forEach(accordion => {
			accordion.classList.remove('expand');
		})
	}

	on('body', 'click', '.accordion-toggle, .accordion-toggle *', e => {
		let accordion = e.target.closest('.accordion-item');
		let isActive = accordion.classList.contains('expand');
		closeAccordions();
	  toggleAccordion(accordion,isActive);
	});

};

const initCloseby = () => {
		
	on('body', 'click', '.closeby-trigger, a[href="#closeby-trigger"]', e => {
		e.preventDefault();
		document.querySelector('.closeby-launcher-embed-toggle').click();
	})

}


// initiate site
window.addEventListener('DOMContentLoaded', () => {
	// execute pieces and components functions
	initPageTransition();
	initAccordions();
	initCloseby();

	// execute page specific functions
	switch(root.id) {
		case 'frontpage':
			// initFrontpage();
			break;
	}

	// make visible .avoid-style-flash elements
	setTimeout(() => {
		document.querySelectorAll('.avoid-style-flash').forEach(el => {
			el.style.visibility = 'visible';
		});
	}, 400);
});