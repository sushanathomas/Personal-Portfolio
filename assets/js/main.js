(function ($) {

	const $window = $(window),
		$body = $('body'),
		$html = $('html');

	// Breakpoints.
	breakpoints({
		large: ['981px', '1680px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch mode.
	if (browser.mobile) {

		let $wrapper;

		// Create wrapper.
		$body.wrapInner('<div id="wrapper" />');
		$wrapper = $('#wrapper');

		// Hack: iOS vh bug.
		if (browser.os == 'ios')
			$wrapper
				.css('margin-top', -25)
				.css('padding-bottom', 25);

		// Pass scroll event to window.
		$wrapper.on('scroll', function () {
			$window.trigger('scroll');
		});

		// Scrolly.
		$window.on('load.hl_scrolly', function () {

			$('.scrolly').scrolly({
				speed: 1500,
				parent: $wrapper,
				pollOnce: true
			});

			$window.off('load.hl_scrolly');

		});

		// Enable touch mode.
		$html.addClass('is-touch');

	}
	else {

		// Scrolly.
		$('.scrolly').scrolly({
			speed: 1500
		});

	}

	// Header.
	const $header = $('#header'),
		$headerTitle = $header.find('header');

	// Make title fixed.
	if (!browser.mobile) {

		$window.on('load.hl_headerTitle', function () {

			breakpoints.on('>medium', function () {

				$headerTitle
					.css('position', 'fixed')
					.css('height', 'auto')
					.css('top', '50%')
					.css('left', '0')
					.css('width', '100%')
					.css('margin-top', ($headerTitle.outerHeight() / -2));

			});

			breakpoints.on('<=medium', function () {

				$headerTitle
					.css('position', '')
					.css('height', '')
					.css('top', '')
					.css('left', '')
					.css('width', '')
					.css('margin-top', '');

			});

			$window.off('load.hl_headerTitle');

		});

	}

	// Scrollex.
	breakpoints.on('>small', function () {
		$header.scrollex({
			terminate: function () {

				$headerTitle.css('opacity', '');

			},
			scroll: function (progress) {

				// Fade out title as user scrolls down.
				let x;

				if (progress > 0.5)
					x = 1 - progress;
				else
					x = progress;

				$headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));

			}
		});
	});

	breakpoints.on('<=small', function () {

		$header.unscrollex();

	});

	const $contactForm = $('#footer form');

	$contactForm.on('submit', function () {
		const form = this;

		setTimeout(function () {
			form.reset();
		}, 100);
	});

})(jQuery);