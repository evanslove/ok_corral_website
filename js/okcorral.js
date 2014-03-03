/* ########################################################################
 * ########################################################################
 *
 * Custom JavaScript code for the O.K. Corral Website
 * Written by Evans Love
 *
 * ########################################################################
 * ######################################################################## */

// jQuery function that makes sure the DOM is loaded before running any JavaScript
$(document).ready(function(){

	'use strict';
	
	// Activates the Carousel
	$('.carousel').carousel( {
		interval: 10000
	}
	);
	
	// Activates the Affix
	$('.navbar').affix({
		offset: { top: $('#nav').offset().top }
	});​
	
	// Activates focus for '[placeholder]'
	$('[placeholder]').focus( function () {
		var input = $(this);
		if (input.val() === input.attr('placeholder')) {
			if (this.originalType) {
				this.type = this.originalType;
				delete this.originalType;
			}
			input.val('');
			input.removeClass('placeholder');
		}
	}
	);
	
	// Activates blur for '[placeholder]'
	$('[placeholder]').blur( function () {
		var input = $(this);
		if (input.val() === '') {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}
	);
	
	$('[placeholder]').blur();
	
	
	$('[data-page-class]').each(function () {
		$('html').addClass($(this).data('page-class'));
	}
	);
	
	// show-hide
	$(".show-hide").each(function () {
        $(this).click(function () {
            var state = 'open';
            var target = $(this).attr('data-target');
            var targetState = $(this).attr('data-target-state');
            if (typeof targetState !== 'undefined' && targetState !== false) {
                state = targetState;
            }
            if (state === 'undefined') {
                state = 'open';
            }
            $(target).toggleClass('show-hide-' + state);
            $(this).toggleClass(state);
        }
        );
    }
    );
	
	// jPanelMenu
	if ($.jPanelMenu && $('[data-toggle=jpanel-menu]').size() > 0) {
		var t = $('[data-toggle=jpanel-menu]'), n = $.jPanelMenu( {
			menu : t.data('target'), direction : 'left', trigger : '.' + t.attr('class'), excludedPanelContent : '.jpanel-menu-exclude', openPosition : '280px', afterOpen : function () {
				t.addClass('open');
				$('html').addClass('jpanel-menu-open');
			}
			, afterClose : function () {
				t.removeClass('open');
				$('html').removeClass('jpanel-menu-open');
			}
		}
		), r = jRespond([ {
			label : 'small', enter : 0, exit : 1010;
		}
		]);
		r.addFunc( {
			breakpoint : 'small', enter : function () {
				n.on();
			}
			, exit : function () {
				n.off();
			}
		}
		);
	};
	
	// flexslider
	$('.flexslider').each(function () {
		var sliderSettings = {
			animation : $(this).attr('data-transition'), selector : '.slides > .slide', controlNav :!0, smoothHeight :!0, start : function (sliderSettings) {
				sliderSettings.find('[data-animate-in]').each(function () {
					$(this).css('visibility', 'hidden');
				}
				);
				sliderSettings.find('.slide-bg').each(function () {
					$(this).css( {
						'background-image' : 'url(' + $(this).data('bg-img') + ')';
					}
					);
					$(this).css('visibility', 'visible').addClass('animated').addClass($(this).data('animate-in'));
				}
				);
				sliderSettings.find('.slide').eq(1).find('[data-animate-in]').each(function () {
					$(this).css('visibility', 'hidden');
					$(this).data('animate-delay') && $(this).addClass($(this).data('animate-delay'));
					$(this).data('animate-duration') && $(this).addClass($(this).data('animate-duration'));
					$(this).css('visibility', 'visible').addClass('animated').addClass($(this).data('animate-in'));
					$(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
						$(this).removeClass($(this).data('animate-in'));
					}
					);
				}
				);
			}
			, before : function (sliderSettings) {
				sliderSettings.find('.slide-bg').each(function () {
					$(this).removeClass($(this).data('animate-in')).removeClass('animated').css('visibility', 'hidden');
				}
				);
				sliderSettings.find('.slide').eq(sliderSettings.animatingTo + 1).find('[data-animate-in]').each(function () {
					$(this).css('visibility', 'hidden');
				}
				);
			}
			, after : function (sliderSettings) {
				sliderSettings.find('.slide').find('[data-animate-in]').each(function () {
					$(this).css('visibility', 'hidden');
				}
				);
				sliderSettings.find('.slide').eq(sliderSettings.animatingTo + 1).find('[data-animate-in]').each(function () {
					$(this).data('animate-delay') && $(this).addClass($(this).data('animate-delay'));
					$(this).data('animate-duration') && $(this).addClass($(this).data('animate-duration'));
					$(this).css('visibility', 'visible').addClass('animated').addClass($(this).data('animate-in'));
					$(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
						$(this).removeClass($(this).data('animate-in'));
					}
					);
				}
				);
			}
		}
		, sliderNav = $(this).attr('data-slidernav');
		sliderNav !== 'auto' && (sliderSettings = $.extend( {
		}
		, sliderSettings, {
			manualControls : sliderNav + ' li a', controlsContainer : '.flexslider-wrapper';
		}
		));
		$('html').addClass('has-flexslider');
		$(this).flexslider(sliderSettings);
	}
	);
	
	$('.flexslider').resize();
	
	// $('.navbar-fixed-top').size() > 0 && $('html').addClass('has-navbar-fixed-top');
	}
	
	function classReg( className ) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
		};
		removeClass = function( elem, c ) {
			elem.classList.remove( c );
		};
	}
	else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function( elem, c ) {
			elem.className = elem.className.replace( classReg( c ), ' ' );
		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};

	// transport
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( classie );
	} else {
		// browser global
		window.classie = classie;
	}
	
	var menuRight = $( 'cbp-spmenu-s2' ),
	showRightPush = $( 'showRightPush' ),
	closeRightPush = $( 'closeRightPush' ),
	body = document.body;

	showRightPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toleft' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		disableOther( 'showRightPush' );
	};

	function disableOther( button ) {
		if( button !== 'showRightPush' ) {
			classie.toggle( showRightPush, 'disabled' );
		}
	}

	closeRightPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toleft' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		disableOther( 'closeRightPush' );
	};

	function disableOther( button ) {
		if( button !== 'closeRightPush' ) {
			classie.toggle( closeRightPush, 'disabled' );
		}
	}
);