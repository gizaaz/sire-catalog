"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
== malihu jquery custom scrollbar plugin == 
Version: 3.1.5 
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development. 
For production, use either the minified jquery.mCustomScrollbar.min.js script or 
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
and dependencies (minified). 
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else if (typeof module !== "undefined" && module.exports) {
		module.exports = factory;
	} else {
		factory(jQuery, window, document);
	}
})(function ($) {
	(function (init) {
		var _rjs = typeof define === "function" && define.amd,
		    /* RequireJS */
		_njs = typeof module !== "undefined" && module.exports,
		    /* NodeJS */
		_dlp = "https:" == document.location.protocol ? "https:" : "http:",
		    /* location protocol */
		_url = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
		if (!_rjs) {
			if (_njs) {
				require("jquery-mousewheel")($);
			} else {
				/* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS 
    (works when mCustomScrollbar fn is called on window load) */
				$.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src=" + _dlp + "//" + _url + "%3E%3C/script%3E"));
			}
		}
		init();
	})(function () {

		/* 
  ----------------------------------------
  PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
  ----------------------------------------
  */

		var pluginNS = "mCustomScrollbar",
		    pluginPfx = "mCS",
		    defaultSelector = ".mCustomScrollbar",


		/* 
  ----------------------------------------
  DEFAULT OPTIONS 
  ----------------------------------------
  */

		defaults = {
			/*
   set element/content width/height programmatically 
   values: boolean, pixels, percentage 
   	option						default
   	-------------------------------------
   	setWidth					false
   	setHeight					false
   */
			/*
   set the initial css top property of content  
   values: string (e.g. "-100px", "10%" etc.)
   */
			setTop: 0,
			/*
   set the initial css left property of content  
   values: string (e.g. "-100px", "10%" etc.)
   */
			setLeft: 0,
			/* 
   scrollbar axis (vertical and/or horizontal scrollbars) 
   values (string): "y", "x", "yx"
   */
			axis: "y",
			/*
   position of scrollbar relative to content  
   values (string): "inside", "outside" ("outside" requires elements with position:relative)
   */
			scrollbarPosition: "inside",
			/*
   scrolling inertia
   values: integer (milliseconds)
   */
			scrollInertia: 950,
			/* 
   auto-adjust scrollbar dragger length
   values: boolean
   */
			autoDraggerLength: true,
			/*
   auto-hide scrollbar when idle 
   values: boolean
   	option						default
   	-------------------------------------
   	autoHideScrollbar			false
   */
			/*
   auto-expands scrollbar on mouse-over and dragging
   values: boolean
   	option						default
   	-------------------------------------
   	autoExpandScrollbar			false
   */
			/*
   always show scrollbar, even when there's nothing to scroll 
   values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
   */
			alwaysShowScrollbar: 0,
			/*
   scrolling always snaps to a multiple of this number in pixels
   values: integer, array ([y,x])
   	option						default
   	-------------------------------------
   	snapAmount					null
   */
			/*
   when snapping, snap with this number in pixels as an offset 
   values: integer
   */
			snapOffset: 0,
			/* 
   mouse-wheel scrolling
   */
			mouseWheel: {
				/* 
    enable mouse-wheel scrolling
    values: boolean
    */
				enable: true,
				/* 
    scrolling amount in pixels
    values: "auto", integer 
    */
				scrollAmount: "auto",
				/* 
    mouse-wheel scrolling axis 
    the default scrolling direction when both vertical and horizontal scrollbars are present 
    values (string): "y", "x" 
    */
				axis: "y",
				/* 
    prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached 
    values: boolean
    	option						default
    	-------------------------------------
    	preventDefault				null
    */
				/*
    the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
    values: "auto", integer 
    "auto" uses the default OS/browser value 
    */
				deltaFactor: "auto",
				/*
    normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
    values: boolean
    	option						default
    	-------------------------------------
    	normalizeDelta				null
    */
				/*
    invert mouse-wheel scrolling direction 
    values: boolean
    	option						default
    	-------------------------------------
    	invert						null
    */
				/*
    the tags that disable mouse-wheel when cursor is over them
    */
				disableOver: ["select", "option", "keygen", "datalist", "textarea"]
			},
			/* 
   scrollbar buttons
   */
			scrollButtons: {
				/*
    enable scrollbar buttons
    values: boolean
    	option						default
    	-------------------------------------
    	enable						null
    */
				/*
    scrollbar buttons scrolling type 
    values (string): "stepless", "stepped"
    */
				scrollType: "stepless",
				/*
    scrolling amount in pixels
    values: "auto", integer 
    */
				scrollAmount: "auto"
				/*
    tabindex of the scrollbar buttons
    values: false, integer
    	option						default
    	-------------------------------------
    	tabindex					null
    */
			},
			/* 
   keyboard scrolling
   */
			keyboard: {
				/*
    enable scrolling via keyboard
    values: boolean
    */
				enable: true,
				/*
    keyboard scrolling type 
    values (string): "stepless", "stepped"
    */
				scrollType: "stepless",
				/*
    scrolling amount in pixels
    values: "auto", integer 
    */
				scrollAmount: "auto"
			},
			/*
   enable content touch-swipe scrolling 
   values: boolean, integer, string (number)
   integer values define the axis-specific minimum amount required for scrolling momentum
   */
			contentTouchScroll: 25,
			/*
   enable/disable document (default) touch-swipe scrolling 
   */
			documentTouchScroll: true,
			/*
   advanced option parameters
   */
			advanced: {
				/*
    auto-expand content horizontally (for "x" or "yx" axis) 
    values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
    	option						default
    	-------------------------------------
    	autoExpandHorizontalScroll	null
    */
				/*
    auto-scroll to elements with focus
    */
				autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
				/*
    auto-update scrollbars on content, element or viewport resize 
    should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
    values: boolean
    */
				updateOnContentResize: true,
				/*
    auto-update scrollbars each time each image inside the element is fully loaded 
    values: "auto", boolean
    */
				updateOnImageLoad: "auto",
				/*
    auto-update scrollbars based on the amount and size changes of specific selectors 
    useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
    values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
    a value of true (boolean) will auto-update scrollbars each time any element is changed
    	option						default
    	-------------------------------------
    	updateOnSelectorChange		null
    */
				/*
    extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
    	option						default
    	-------------------------------------
    	extraDraggableSelectors		null
    */
				/*
    extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
    	option						default
    	-------------------------------------
    	releaseDraggableSelectors	null
    */
				/*
    auto-update timeout 
    values: integer (milliseconds)
    */
				autoUpdateTimeout: 60
			},
			/* 
   scrollbar theme 
   values: string (see CSS/plugin URI for a list of ready-to-use themes)
   */
			theme: "light",
			/*
   user defined callback functions
   */
			callbacks: {
				/*
    Available callbacks: 
    	callback					default
    	-------------------------------------
    	onCreate					null
    	onInit						null
    	onScrollStart				null
    	onScroll					null
    	onTotalScroll				null
    	onTotalScrollBack			null
    	whileScrolling				null
    	onOverflowY					null
    	onOverflowX					null
    	onOverflowYNone				null
    	onOverflowXNone				null
    	onImageLoad					null
    	onSelectorChange			null
    	onBeforeUpdate				null
    	onUpdate					null
    */
				onTotalScrollOffset: 0,
				onTotalScrollBackOffset: 0,
				alwaysTriggerOffsets: true
				/*
    add scrollbar(s) on all elements matching the current selector, now and in the future 
    values: boolean, string 
    string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
    liveSelector values: string (selector)
    	option						default
    	-------------------------------------
    	live						false
    	liveSelector				null
    */
			} },


		/* 
  ----------------------------------------
  VARS, CONSTANTS 
  ----------------------------------------
  */

		totalInstances = 0,
		    /* plugin instances amount */
		liveTimers = {},
		    /* live option timers */
		oldIE = window.attachEvent && !window.addEventListener ? 1 : 0,
		    /* detect IE < 9 */
		touchActive = false,
		    touchable,
		    /* global touch vars (for touch and pointer events) */
		/* general plugin classes */
		classes = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],


		/* 
  ----------------------------------------
  METHODS 
  ----------------------------------------
  */

		methods = {

			/* 
   plugin initialization method 
   creates the scrollbar(s), plugin data object and options
   ----------------------------------------
   */

			init: function init(options) {

				var options = $.extend(true, {}, defaults, options),
				    selector = _selector.call(this); /* validate selector */

				/* 
    if live option is enabled, monitor for elements matching the current selector and 
    apply scrollbar(s) when found (now and in the future) 
    */
				if (options.live) {
					var liveSelector = options.liveSelector || this.selector || defaultSelector,
					    /* live selector(s) */
					$liveSelector = $(liveSelector); /* live selector(s) as jquery object */
					if (options.live === "off") {
						/* 
      disable live if requested 
      usage: $(selector).mCustomScrollbar({live:"off"}); 
      */
						removeLiveTimers(liveSelector);
						return;
					}
					liveTimers[liveSelector] = setTimeout(function () {
						/* call mCustomScrollbar fn on live selector(s) every half-second */
						$liveSelector.mCustomScrollbar(options);
						if (options.live === "once" && $liveSelector.length) {
							/* disable live after first invocation */
							removeLiveTimers(liveSelector);
						}
					}, 500);
				} else {
					removeLiveTimers(liveSelector);
				}

				/* options backward compatibility (for versions < 3.0.0) and normalization */
				options.setWidth = options.set_width ? options.set_width : options.setWidth;
				options.setHeight = options.set_height ? options.set_height : options.setHeight;
				options.axis = options.horizontalScroll ? "x" : _findAxis(options.axis);
				options.scrollInertia = options.scrollInertia > 0 && options.scrollInertia < 17 ? 17 : options.scrollInertia;
				if (_typeof(options.mouseWheel) !== "object" && options.mouseWheel == true) {
					/* old school mouseWheel option (non-object) */
					options.mouseWheel = { enable: true, scrollAmount: "auto", axis: "y", preventDefault: false, deltaFactor: "auto", normalizeDelta: false, invert: false };
				}
				options.mouseWheel.scrollAmount = !options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
				options.mouseWheel.normalizeDelta = !options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
				options.scrollButtons.scrollType = _findScrollButtonsType(options.scrollButtons.scrollType);

				_theme(options); /* theme-specific options */

				/* plugin constructor */
				return $(selector).each(function () {

					var $this = $(this);

					if (!$this.data(pluginPfx)) {
						/* prevent multiple instantiations */

						/* store options and create objects in jquery data */
						$this.data(pluginPfx, {
							idx: ++totalInstances, /* instance index */
							opt: options, /* options */
							scrollRatio: { y: null, x: null }, /* scrollbar to content ratio */
							overflowed: null, /* overflowed axis */
							contentReset: { y: null, x: null }, /* object to check when content resets */
							bindEvents: false, /* object to check if events are bound */
							tweenRunning: false, /* object to check if tween is running */
							sequential: {}, /* sequential scrolling object */
							langDir: $this.css("direction"), /* detect/store direction (ltr or rtl) */
							cbOffsets: null, /* object to check whether callback offsets always trigger */
							/* 
       object to check how scrolling events where last triggered 
       "internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
       usage: object.data("mCS").trigger
       */
							trigger: null,
							/* 
       object to check for changes in elements in order to call the update method automatically 
       */
							poll: { size: { o: 0, n: 0 }, img: { o: 0, n: 0 }, change: { o: 0, n: 0 } }
						});

						var d = $this.data(pluginPfx),
						    o = d.opt,

						/* HTML data attributes */
						htmlDataAxis = $this.data("mcs-axis"),
						    htmlDataSbPos = $this.data("mcs-scrollbar-position"),
						    htmlDataTheme = $this.data("mcs-theme");

						if (htmlDataAxis) {
							o.axis = htmlDataAxis;
						} /* usage example: data-mcs-axis="y" */
						if (htmlDataSbPos) {
							o.scrollbarPosition = htmlDataSbPos;
						} /* usage example: data-mcs-scrollbar-position="outside" */
						if (htmlDataTheme) {
							/* usage example: data-mcs-theme="minimal" */
							o.theme = htmlDataTheme;
							_theme(o); /* theme-specific options */
						}

						_pluginMarkup.call(this); /* add plugin markup */

						if (d && o.callbacks.onCreate && typeof o.callbacks.onCreate === "function") {
							o.callbacks.onCreate.call(this);
						} /* callbacks: onCreate */

						$("#mCSB_" + d.idx + "_container img:not(." + classes[2] + ")").addClass(classes[2]); /* flag loaded images */

						methods.update.call(null, $this); /* call the update method */
					}
				});
			},
			/* ---------------------------------------- */

			/* 
   plugin update method 
   updates content and scrollbar(s) values, events and status 
   ----------------------------------------
   usage: $(selector).mCustomScrollbar("update");
   */

			update: function update(el, cb) {

				var selector = el || _selector.call(this); /* validate selector */

				return $(selector).each(function () {

					var $this = $(this);

					if ($this.data(pluginPfx)) {
						/* check if plugin has initialized */

						var d = $this.data(pluginPfx),
						    o = d.opt,
						    mCSB_container = $("#mCSB_" + d.idx + "_container"),
						    mCustomScrollBox = $("#mCSB_" + d.idx),
						    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];

						if (!mCSB_container.length) {
							return;
						}

						if (d.tweenRunning) {
							_stop($this);
						} /* stop any running tweens while updating */

						if (cb && d && o.callbacks.onBeforeUpdate && typeof o.callbacks.onBeforeUpdate === "function") {
							o.callbacks.onBeforeUpdate.call(this);
						} /* callbacks: onBeforeUpdate */

						/* if element was disabled or destroyed, remove class(es) */
						if ($this.hasClass(classes[3])) {
							$this.removeClass(classes[3]);
						}
						if ($this.hasClass(classes[4])) {
							$this.removeClass(classes[4]);
						}

						/* css flexbox fix, detect/set max-height */
						mCustomScrollBox.css("max-height", "none");
						if (mCustomScrollBox.height() !== $this.height()) {
							mCustomScrollBox.css("max-height", $this.height());
						}

						_expandContentHorizontally.call(this); /* expand content horizontally */

						if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
							mCSB_container.css("width", _contentWidth(mCSB_container));
						}

						d.overflowed = _overflowed.call(this); /* determine if scrolling is required */

						_scrollbarVisibility.call(this); /* show/hide scrollbar(s) */

						/* auto-adjust scrollbar dragger length analogous to content */
						if (o.autoDraggerLength) {
							_setDraggerLength.call(this);
						}

						_scrollRatio.call(this); /* calculate and store scrollbar to content ratio */

						_bindEvents.call(this); /* bind scrollbar events */

						/* reset scrolling position and/or events */
						var to = [Math.abs(mCSB_container[0].offsetTop), Math.abs(mCSB_container[0].offsetLeft)];
						if (o.axis !== "x") {
							/* y/yx axis */
							if (!d.overflowed[0]) {
								/* y scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if (o.axis === "y") {
									_unbindEvents.call(this);
								} else if (o.axis === "yx" && d.overflowed[1]) {
									_scrollTo($this, to[1].toString(), { dir: "x", dur: 0, overwrite: "none" });
								}
							} else if (mCSB_dragger[0].height() > mCSB_dragger[0].parent().height()) {
								_resetContentPosition.call(this); /* reset content position */
							} else {
								/* y scrolling is required */
								_scrollTo($this, to[0].toString(), { dir: "y", dur: 0, overwrite: "none" });
								d.contentReset.y = null;
							}
						}
						if (o.axis !== "y") {
							/* x/yx axis */
							if (!d.overflowed[1]) {
								/* x scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if (o.axis === "x") {
									_unbindEvents.call(this);
								} else if (o.axis === "yx" && d.overflowed[0]) {
									_scrollTo($this, to[0].toString(), { dir: "y", dur: 0, overwrite: "none" });
								}
							} else if (mCSB_dragger[1].width() > mCSB_dragger[1].parent().width()) {
								_resetContentPosition.call(this); /* reset content position */
							} else {
								/* x scrolling is required */
								_scrollTo($this, to[1].toString(), { dir: "x", dur: 0, overwrite: "none" });
								d.contentReset.x = null;
							}
						}

						/* callbacks: onImageLoad, onSelectorChange, onUpdate */
						if (cb && d) {
							if (cb === 2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad === "function") {
								o.callbacks.onImageLoad.call(this);
							} else if (cb === 3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange === "function") {
								o.callbacks.onSelectorChange.call(this);
							} else if (o.callbacks.onUpdate && typeof o.callbacks.onUpdate === "function") {
								o.callbacks.onUpdate.call(this);
							}
						}

						_autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
					}
				});
			},
			/* ---------------------------------------- */

			/* 
   plugin scrollTo method 
   triggers a scrolling event to a specific value
   ----------------------------------------
   usage: $(selector).mCustomScrollbar("scrollTo",value,options);
   */

			scrollTo: function scrollTo(val, options) {

				/* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
				if (typeof val == "undefined" || val == null) {
					return;
				}

				var selector = _selector.call(this); /* validate selector */

				return $(selector).each(function () {

					var $this = $(this);

					if ($this.data(pluginPfx)) {
						/* check if plugin has initialized */

						var d = $this.data(pluginPfx),
						    o = d.opt,

						/* method default options */
						methodDefaults = {
							trigger: "external", /* method is by default triggered externally (e.g. from other scripts) */
							scrollInertia: o.scrollInertia, /* scrolling inertia (animation duration) */
							scrollEasing: "mcsEaseInOut", /* animation easing */
							moveDragger: false, /* move dragger instead of content */
							timeout: 60, /* scroll-to delay */
							callbacks: true, /* enable/disable callbacks */
							onStart: true,
							onUpdate: true,
							onComplete: true
						},
						    methodOptions = $.extend(true, {}, methodDefaults, options),
						    to = _arr.call(this, val),
						    dur = methodOptions.scrollInertia > 0 && methodOptions.scrollInertia < 17 ? 17 : methodOptions.scrollInertia;

						/* translate yx values to actual scroll-to positions */
						to[0] = _to.call(this, to[0], "y");
						to[1] = _to.call(this, to[1], "x");

						/* 
      check if scroll-to value moves the dragger instead of content. 
      Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
      */
						if (methodOptions.moveDragger) {
							to[0] *= d.scrollRatio.y;
							to[1] *= d.scrollRatio.x;
						}

						methodOptions.dur = _isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden

						setTimeout(function () {
							/* do the scrolling */
							if (to[0] !== null && typeof to[0] !== "undefined" && o.axis !== "x" && d.overflowed[0]) {
								/* scroll y */
								methodOptions.dir = "y";
								methodOptions.overwrite = "all";
								_scrollTo($this, to[0].toString(), methodOptions);
							}
							if (to[1] !== null && typeof to[1] !== "undefined" && o.axis !== "y" && d.overflowed[1]) {
								/* scroll x */
								methodOptions.dir = "x";
								methodOptions.overwrite = "none";
								_scrollTo($this, to[1].toString(), methodOptions);
							}
						}, methodOptions.timeout);
					}
				});
			},
			/* ---------------------------------------- */

			/*
   plugin stop method 
   stops scrolling animation
   ----------------------------------------
   usage: $(selector).mCustomScrollbar("stop");
   */
			stop: function stop() {

				var selector = _selector.call(this); /* validate selector */

				return $(selector).each(function () {

					var $this = $(this);

					if ($this.data(pluginPfx)) {
						/* check if plugin has initialized */

						_stop($this);
					}
				});
			},
			/* ---------------------------------------- */

			/*
   plugin disable method 
   temporarily disables the scrollbar(s) 
   ----------------------------------------
   usage: $(selector).mCustomScrollbar("disable",reset); 
   reset (boolean): resets content position to 0 
   */
			disable: function disable(r) {

				var selector = _selector.call(this); /* validate selector */

				return $(selector).each(function () {

					var $this = $(this);

					if ($this.data(pluginPfx)) {
						/* check if plugin has initialized */

						var d = $this.data(pluginPfx);

						_autoUpdate.call(this, "remove"); /* remove automatic updating */

						_unbindEvents.call(this); /* unbind events */

						if (r) {
							_resetContentPosition.call(this);
						} /* reset content position */

						_scrollbarVisibility.call(this, true); /* show/hide scrollbar(s) */

						$this.addClass(classes[3]); /* add disable class */
					}
				});
			},
			/* ---------------------------------------- */

			/*
   plugin destroy method 
   completely removes the scrollbar(s) and returns the element to its original state
   ----------------------------------------
   usage: $(selector).mCustomScrollbar("destroy"); 
   */
			destroy: function destroy() {

				var selector = _selector.call(this); /* validate selector */

				return $(selector).each(function () {

					var $this = $(this);

					if ($this.data(pluginPfx)) {
						/* check if plugin has initialized */

						var d = $this.data(pluginPfx),
						    o = d.opt,
						    mCustomScrollBox = $("#mCSB_" + d.idx),
						    mCSB_container = $("#mCSB_" + d.idx + "_container"),
						    scrollbar = $(".mCSB_" + d.idx + "_scrollbar");

						if (o.live) {
							removeLiveTimers(o.liveSelector || $(selector).selector);
						} /* remove live timers */

						_autoUpdate.call(this, "remove"); /* remove automatic updating */

						_unbindEvents.call(this); /* unbind events */

						_resetContentPosition.call(this); /* reset content position */

						$this.removeData(pluginPfx); /* remove plugin data object */

						_delete(this, "mcs"); /* delete callbacks object */

						/* remove plugin markup */
						scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
						mCSB_container.find("img." + classes[2]).removeClass(classes[2]); /* remove loaded images flag */
						mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
						/* remove plugin classes from the element and add destroy class */
						$this.removeClass(pluginNS + " _" + pluginPfx + "_" + d.idx + " " + classes[6] + " " + classes[7] + " " + classes[5] + " " + classes[3]).addClass(classes[4]);
					}
				});
			}
			/* ---------------------------------------- */

		},


		/* 
  ----------------------------------------
  FUNCTIONS
  ----------------------------------------
  */

		/* validates selector (if selector is invalid or undefined uses the default one) */
		_selector = function _selector() {
			return _typeof($(this)) !== "object" || $(this).length < 1 ? defaultSelector : this;
		},

		/* -------------------- */

		/* changes options according to theme */
		_theme = function _theme(obj) {
			var fixedSizeScrollbarThemes = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
			    nonExpandedScrollbarThemes = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
			    disabledScrollButtonsThemes = ["minimal", "minimal-dark"],
			    enabledAutoHideScrollbarThemes = ["minimal", "minimal-dark"],
			    scrollbarPositionOutsideThemes = ["minimal", "minimal-dark"];
			obj.autoDraggerLength = $.inArray(obj.theme, fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
			obj.autoExpandScrollbar = $.inArray(obj.theme, nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
			obj.scrollButtons.enable = $.inArray(obj.theme, disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
			obj.autoHideScrollbar = $.inArray(obj.theme, enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
			obj.scrollbarPosition = $.inArray(obj.theme, scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
		},

		/* -------------------- */

		/* live option timers removal */
		removeLiveTimers = function removeLiveTimers(selector) {
			if (liveTimers[selector]) {
				clearTimeout(liveTimers[selector]);
				_delete(liveTimers, selector);
			}
		},

		/* -------------------- */

		/* normalizes axis option to valid values: "y", "x", "yx" */
		_findAxis = function _findAxis(val) {
			return val === "yx" || val === "xy" || val === "auto" ? "yx" : val === "x" || val === "horizontal" ? "x" : "y";
		},

		/* -------------------- */

		/* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
		_findScrollButtonsType = function _findScrollButtonsType(val) {
			return val === "stepped" || val === "pixels" || val === "step" || val === "click" ? "stepped" : "stepless";
		},

		/* -------------------- */

		/* generates plugin markup */
		_pluginMarkup = function _pluginMarkup() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    expandClass = o.autoExpandScrollbar ? " " + classes[1] + "_expand" : "",
			    scrollbar = ["<div id='mCSB_" + d.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + d.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_vertical" + expandClass + "'><div class='" + classes[12] + "'><div id='mCSB_" + d.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + d.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + d.idx + "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_horizontal" + expandClass + "'><div class='" + classes[12] + "'><div id='mCSB_" + d.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
			    wrapperClass = o.axis === "yx" ? "mCSB_vertical_horizontal" : o.axis === "x" ? "mCSB_horizontal" : "mCSB_vertical",
			    scrollbars = o.axis === "yx" ? scrollbar[0] + scrollbar[1] : o.axis === "x" ? scrollbar[1] : scrollbar[0],
			    contentWrapper = o.axis === "yx" ? "<div id='mCSB_" + d.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
			    autoHideClass = o.autoHideScrollbar ? " " + classes[6] : "",
			    scrollbarDirClass = o.axis !== "x" && d.langDir === "rtl" ? " " + classes[7] : "";
			if (o.setWidth) {
				$this.css("width", o.setWidth);
			} /* set element width */
			if (o.setHeight) {
				$this.css("height", o.setHeight);
			} /* set element height */
			o.setLeft = o.axis !== "y" && d.langDir === "rtl" ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
			$this.addClass(pluginNS + " _" + pluginPfx + "_" + d.idx + autoHideClass + scrollbarDirClass).wrapInner("<div id='mCSB_" + d.idx + "' class='mCustomScrollBox mCS-" + o.theme + " " + wrapperClass + "'><div id='mCSB_" + d.idx + "_container' class='mCSB_container' style='position:relative; top:" + o.setTop + "; left:" + o.setLeft + ";' dir='" + d.langDir + "' /></div>");
			var mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container");
			if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
				mCSB_container.css("width", _contentWidth(mCSB_container));
			}
			if (o.scrollbarPosition === "outside") {
				if ($this.css("position") === "static") {
					/* requires elements with non-static position */
					$this.css("position", "relative");
				}
				$this.css("overflow", "visible");
				mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
			} else {
				mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
				mCSB_container.wrap(contentWrapper);
			}
			_scrollButtons.call(this); /* add scrollbar buttons */
			/* minimum dragger length */
			var mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];
			mCSB_dragger[0].css("min-height", mCSB_dragger[0].height());
			mCSB_dragger[1].css("min-width", mCSB_dragger[1].width());
		},

		/* -------------------- */

		/* calculates content width */
		_contentWidth = function _contentWidth(el) {
			var val = [el[0].scrollWidth, Math.max.apply(Math, el.children().map(function () {
				return $(this).outerWidth(true);
			}).get())],
			    w = el.parent().width();
			return val[0] > w ? val[0] : val[1] > w ? val[1] : "100%";
		},

		/* -------------------- */

		/* expands content horizontally */
		_expandContentHorizontally = function _expandContentHorizontally() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    mCSB_container = $("#mCSB_" + d.idx + "_container");
			if (o.advanced.autoExpandHorizontalScroll && o.axis !== "y") {
				/* calculate scrollWidth */
				mCSB_container.css({ "width": "auto", "min-width": 0, "overflow-x": "scroll" });
				var w = Math.ceil(mCSB_container[0].scrollWidth);
				if (o.advanced.autoExpandHorizontalScroll === 3 || o.advanced.autoExpandHorizontalScroll !== 2 && w > mCSB_container.parent().width()) {
					mCSB_container.css({ "width": w, "min-width": "100%", "overflow-x": "inherit" });
				} else {
					/* 
     wrap content with an infinite width div and set its position to absolute and width to auto. 
     Setting width to auto before calculating the actual width is important! 
     We must let the browser set the width as browser zoom values are impossible to calculate.
     */
					mCSB_container.css({ "overflow-x": "inherit", "position": "absolute" }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({ /* set actual width, original position and un-wrap */
						/* 
      get the exact width (with decimals) and then round-up. 
      Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
      */
						"width": Math.ceil(mCSB_container[0].getBoundingClientRect().right + 0.4) - Math.floor(mCSB_container[0].getBoundingClientRect().left),
						"min-width": "100%",
						"position": "relative"
					}).unwrap();
				}
			}
		},

		/* -------------------- */

		/* adds scrollbar buttons */
		_scrollButtons = function _scrollButtons() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    mCSB_scrollTools = $(".mCSB_" + d.idx + "_scrollbar:first"),
			    tabindex = !_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='" + o.scrollButtons.tabindex + "'",
			    btnHTML = ["<a href='#' class='" + classes[13] + "' " + tabindex + " />", "<a href='#' class='" + classes[14] + "' " + tabindex + " />", "<a href='#' class='" + classes[15] + "' " + tabindex + " />", "<a href='#' class='" + classes[16] + "' " + tabindex + " />"],
			    btn = [o.axis === "x" ? btnHTML[2] : btnHTML[0], o.axis === "x" ? btnHTML[3] : btnHTML[1], btnHTML[2], btnHTML[3]];
			if (o.scrollButtons.enable) {
				mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
			}
		},

		/* -------------------- */

		/* auto-adjusts scrollbar dragger length */
		_setDraggerLength = function _setDraggerLength() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
			    ratio = [mCustomScrollBox.height() / mCSB_container.outerHeight(false), mCustomScrollBox.width() / mCSB_container.outerWidth(false)],
			    l = [parseInt(mCSB_dragger[0].css("min-height")), Math.round(ratio[0] * mCSB_dragger[0].parent().height()), parseInt(mCSB_dragger[1].css("min-width")), Math.round(ratio[1] * mCSB_dragger[1].parent().width())],
			    h = oldIE && l[1] < l[0] ? l[0] : l[1],
			    w = oldIE && l[3] < l[2] ? l[2] : l[3];
			mCSB_dragger[0].css({
				"height": h, "max-height": mCSB_dragger[0].parent().height() - 10
			}).find(".mCSB_dragger_bar").css({ "line-height": l[0] + "px" });
			mCSB_dragger[1].css({
				"width": w, "max-width": mCSB_dragger[1].parent().width() - 10
			});
		},

		/* -------------------- */

		/* calculates scrollbar to content ratio */
		_scrollRatio = function _scrollRatio() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
			    scrollAmount = [mCSB_container.outerHeight(false) - mCustomScrollBox.height(), mCSB_container.outerWidth(false) - mCustomScrollBox.width()],
			    ratio = [scrollAmount[0] / (mCSB_dragger[0].parent().height() - mCSB_dragger[0].height()), scrollAmount[1] / (mCSB_dragger[1].parent().width() - mCSB_dragger[1].width())];
			d.scrollRatio = { y: ratio[0], x: ratio[1] };
		},

		/* -------------------- */

		/* toggles scrolling classes */
		_onDragClasses = function _onDragClasses(el, action, xpnd) {
			var expandClass = xpnd ? classes[0] + "_expanded" : "",
			    scrollbar = el.closest(".mCSB_scrollTools");
			if (action === "active") {
				el.toggleClass(classes[0] + " " + expandClass);scrollbar.toggleClass(classes[1]);
				el[0]._draggable = el[0]._draggable ? 0 : 1;
			} else {
				if (!el[0]._draggable) {
					if (action === "hide") {
						el.removeClass(classes[0]);scrollbar.removeClass(classes[1]);
					} else {
						el.addClass(classes[0]);scrollbar.addClass(classes[1]);
					}
				}
			}
		},

		/* -------------------- */

		/* checks if content overflows its container to determine if scrolling is required */
		_overflowed = function _overflowed() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    contentHeight = d.overflowed == null ? mCSB_container.height() : mCSB_container.outerHeight(false),
			    contentWidth = d.overflowed == null ? mCSB_container.width() : mCSB_container.outerWidth(false),
			    h = mCSB_container[0].scrollHeight,
			    w = mCSB_container[0].scrollWidth;
			if (h > contentHeight) {
				contentHeight = h;
			}
			if (w > contentWidth) {
				contentWidth = w;
			}
			return [contentHeight > mCustomScrollBox.height(), contentWidth > mCustomScrollBox.width()];
		},

		/* -------------------- */

		/* resets content position to 0 */
		_resetContentPosition = function _resetContentPosition() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")];
			_stop($this); /* stop any current scrolling before resetting */
			if (o.axis !== "x" && !d.overflowed[0] || o.axis === "y" && d.overflowed[0]) {
				/* reset y */
				mCSB_dragger[0].add(mCSB_container).css("top", 0);
				_scrollTo($this, "_resetY");
			}
			if (o.axis !== "y" && !d.overflowed[1] || o.axis === "x" && d.overflowed[1]) {
				/* reset x */
				var cx = dx = 0;
				if (d.langDir === "rtl") {
					/* adjust left position for rtl direction */
					cx = mCustomScrollBox.width() - mCSB_container.outerWidth(false);
					dx = Math.abs(cx / d.scrollRatio.x);
				}
				mCSB_container.css("left", cx);
				mCSB_dragger[1].css("left", dx);
				_scrollTo($this, "_resetX");
			}
		},

		/* -------------------- */

		/* binds scrollbar events */
		_bindEvents = function _bindEvents() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt;
			if (!d.bindEvents) {
				/* check if events are already bound */
				_draggable.call(this);
				if (o.contentTouchScroll) {
					_contentDraggable.call(this);
				}
				_selectable.call(this);
				if (o.mouseWheel.enable) {
					/* bind mousewheel fn when plugin is available */
					var _mwt = function _mwt() {
						mousewheelTimeout = setTimeout(function () {
							if (!$.event.special.mousewheel) {
								_mwt();
							} else {
								clearTimeout(mousewheelTimeout);
								_mousewheel.call($this[0]);
							}
						}, 100);
					};

					var mousewheelTimeout;
					_mwt();
				}
				_draggerRail.call(this);
				_wrapperScroll.call(this);
				if (o.advanced.autoScrollOnFocus) {
					_focus.call(this);
				}
				if (o.scrollButtons.enable) {
					_buttons.call(this);
				}
				if (o.keyboard.enable) {
					_keyboard.call(this);
				}
				d.bindEvents = true;
			}
		},

		/* -------------------- */

		/* unbinds scrollbar events */
		_unbindEvents = function _unbindEvents() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    namespace = pluginPfx + "_" + d.idx,
			    sb = ".mCSB_" + d.idx + "_scrollbar",
			    sel = $("#mCSB_" + d.idx + ",#mCSB_" + d.idx + "_container,#mCSB_" + d.idx + "_container_wrapper," + sb + " ." + classes[12] + ",#mCSB_" + d.idx + "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal," + sb + ">a"),
			    mCSB_container = $("#mCSB_" + d.idx + "_container");
			if (o.advanced.releaseDraggableSelectors) {
				sel.add($(o.advanced.releaseDraggableSelectors));
			}
			if (o.advanced.extraDraggableSelectors) {
				sel.add($(o.advanced.extraDraggableSelectors));
			}
			if (d.bindEvents) {
				/* check if events are bound */
				/* unbind namespaced events from document/selectors */
				$(document).add($(!_canAccessIFrame() || top.document)).unbind("." + namespace);
				sel.each(function () {
					$(this).unbind("." + namespace);
				});
				/* clear and delete timeouts/objects */
				clearTimeout($this[0]._focusTimeout);_delete($this[0], "_focusTimeout");
				clearTimeout(d.sequential.step);_delete(d.sequential, "step");
				clearTimeout(mCSB_container[0].onCompleteTimeout);_delete(mCSB_container[0], "onCompleteTimeout");
				d.bindEvents = false;
			}
		},

		/* -------------------- */

		/* toggles scrollbar visibility */
		_scrollbarVisibility = function _scrollbarVisibility(disabled) {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    contentWrapper = $("#mCSB_" + d.idx + "_container_wrapper"),
			    content = contentWrapper.length ? contentWrapper : $("#mCSB_" + d.idx + "_container"),
			    scrollbar = [$("#mCSB_" + d.idx + "_scrollbar_vertical"), $("#mCSB_" + d.idx + "_scrollbar_horizontal")],
			    mCSB_dragger = [scrollbar[0].find(".mCSB_dragger"), scrollbar[1].find(".mCSB_dragger")];
			if (o.axis !== "x") {
				if (d.overflowed[0] && !disabled) {
					scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display", "block");
					content.removeClass(classes[8] + " " + classes[10]);
				} else {
					if (o.alwaysShowScrollbar) {
						if (o.alwaysShowScrollbar !== 2) {
							mCSB_dragger[0].css("display", "none");
						}
						content.removeClass(classes[10]);
					} else {
						scrollbar[0].css("display", "none");
						content.addClass(classes[10]);
					}
					content.addClass(classes[8]);
				}
			}
			if (o.axis !== "y") {
				if (d.overflowed[1] && !disabled) {
					scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display", "block");
					content.removeClass(classes[9] + " " + classes[11]);
				} else {
					if (o.alwaysShowScrollbar) {
						if (o.alwaysShowScrollbar !== 2) {
							mCSB_dragger[1].css("display", "none");
						}
						content.removeClass(classes[11]);
					} else {
						scrollbar[1].css("display", "none");
						content.addClass(classes[11]);
					}
					content.addClass(classes[9]);
				}
			}
			if (!d.overflowed[0] && !d.overflowed[1]) {
				$this.addClass(classes[5]);
			} else {
				$this.removeClass(classes[5]);
			}
		},

		/* -------------------- */

		/* returns input coordinates of pointer, touch and mouse events (relative to document) */
		_coordinates = function _coordinates(e) {
			var t = e.type,
			    o = e.target.ownerDocument !== document && frameElement !== null ? [$(frameElement).offset().top, $(frameElement).offset().left] : null,
			    io = _canAccessIFrame() && e.target.ownerDocument !== top.document && frameElement !== null ? [$(e.view.frameElement).offset().top, $(e.view.frameElement).offset().left] : [0, 0];
			switch (t) {
				case "pointerdown":case "MSPointerDown":case "pointermove":case "MSPointerMove":case "pointerup":case "MSPointerUp":
					return o ? [e.originalEvent.pageY - o[0] + io[0], e.originalEvent.pageX - o[1] + io[1], false] : [e.originalEvent.pageY, e.originalEvent.pageX, false];
					break;
				case "touchstart":case "touchmove":case "touchend":
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
					    touches = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
					return e.target.ownerDocument !== document ? [touch.screenY, touch.screenX, touches > 1] : [touch.pageY, touch.pageX, touches > 1];
					break;
				default:
					return o ? [e.pageY - o[0] + io[0], e.pageX - o[1] + io[1], false] : [e.pageY, e.pageX, false];
			}
		},

		/* -------------------- */

		/* 
  SCROLLBAR DRAG EVENTS
  scrolls content via scrollbar dragging 
  */
		_draggable = function _draggable() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    namespace = pluginPfx + "_" + d.idx,
			    draggerId = ["mCSB_" + d.idx + "_dragger_vertical", "mCSB_" + d.idx + "_dragger_horizontal"],
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    mCSB_dragger = $("#" + draggerId[0] + ",#" + draggerId[1]),
			    draggable,
			    dragY,
			    dragX,
			    rds = o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
			    eds = o.advanced.extraDraggableSelectors ? $(!_canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) : $(!_canAccessIFrame() || top.document);
			mCSB_dragger.bind("contextmenu." + namespace, function (e) {
				e.preventDefault(); //prevent right click
			}).bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, function (e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				if (!_mouseBtnLeft(e)) {
					return;
				} /* left mouse button only */
				touchActive = true;
				if (oldIE) {
					document.onselectstart = function () {
						return false;
					};
				} /* disable text selection for IE < 9 */
				_iframe.call(mCSB_container, false); /* enable scrollbar dragging over iframes by disabling their events */
				_stop($this);
				draggable = $(this);
				var offset = draggable.offset(),
				    y = _coordinates(e)[0] - offset.top,
				    x = _coordinates(e)[1] - offset.left,
				    h = draggable.height() + offset.top,
				    w = draggable.width() + offset.left;
				if (y < h && y > 0 && x < w && x > 0) {
					dragY = y;
					dragX = x;
				}
				_onDragClasses(draggable, "active", o.autoExpandScrollbar);
			}).bind("touchmove." + namespace, function (e) {
				e.stopImmediatePropagation();
				e.preventDefault();
				var offset = draggable.offset(),
				    y = _coordinates(e)[0] - offset.top,
				    x = _coordinates(e)[1] - offset.left;
				_drag(dragY, dragX, y, x);
			});
			$(document).add(eds).bind("mousemove." + namespace + " pointermove." + namespace + " MSPointerMove." + namespace, function (e) {
				if (draggable) {
					var offset = draggable.offset(),
					    y = _coordinates(e)[0] - offset.top,
					    x = _coordinates(e)[1] - offset.left;
					if (dragY === y && dragX === x) {
						return;
					} /* has it really moved? */
					_drag(dragY, dragX, y, x);
				}
			}).add(rds).bind("mouseup." + namespace + " touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace, function (e) {
				if (draggable) {
					_onDragClasses(draggable, "active", o.autoExpandScrollbar);
					draggable = null;
				}
				touchActive = false;
				if (oldIE) {
					document.onselectstart = null;
				} /* enable text selection for IE < 9 */
				_iframe.call(mCSB_container, true); /* enable iframes events */
			});
			function _drag(dragY, dragX, y, x) {
				mCSB_container[0].idleTimer = o.scrollInertia < 233 ? 250 : 0;
				if (draggable.attr("id") === draggerId[1]) {
					var dir = "x",
					    to = (draggable[0].offsetLeft - dragX + x) * d.scrollRatio.x;
				} else {
					var dir = "y",
					    to = (draggable[0].offsetTop - dragY + y) * d.scrollRatio.y;
				}
				_scrollTo($this, to.toString(), { dir: dir, drag: true });
			}
		},

		/* -------------------- */

		/* 
  TOUCH SWIPE EVENTS
  scrolls content via touch swipe 
  Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
  */
		_contentDraggable = function _contentDraggable() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    namespace = pluginPfx + "_" + d.idx,
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
			    draggable,
			    dragY,
			    dragX,
			    touchStartY,
			    touchStartX,
			    touchMoveY = [],
			    touchMoveX = [],
			    startTime,
			    runningTime,
			    endTime,
			    distance,
			    speed,
			    amount,
			    durA = 0,
			    durB,
			    overwrite = o.axis === "yx" ? "none" : "all",
			    touchIntent = [],
			    touchDrag,
			    docDrag,
			    iframe = mCSB_container.find("iframe"),
			    events = ["touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, //start
			"touchmove." + namespace + " pointermove." + namespace + " MSPointerMove." + namespace, //move
			"touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace //end
			],
			    touchAction = document.body.style.touchAction !== undefined && document.body.style.touchAction !== "";
			mCSB_container.bind(events[0], function (e) {
				_onTouchstart(e);
			}).bind(events[1], function (e) {
				_onTouchmove(e);
			});
			mCustomScrollBox.bind(events[0], function (e) {
				_onTouchstart2(e);
			}).bind(events[2], function (e) {
				_onTouchend(e);
			});
			if (iframe.length) {
				iframe.each(function () {
					$(this).bind("load", function () {
						/* bind events on accessible iframes */
						if (_canAccessIFrame(this)) {
							$(this.contentDocument || this.contentWindow.document).bind(events[0], function (e) {
								_onTouchstart(e);
								_onTouchstart2(e);
							}).bind(events[1], function (e) {
								_onTouchmove(e);
							}).bind(events[2], function (e) {
								_onTouchend(e);
							});
						}
					});
				});
			}
			function _onTouchstart(e) {
				if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
					touchable = 0;return;
				}
				touchable = 1;touchDrag = 0;docDrag = 0;draggable = 1;
				$this.removeClass("mCS_touch_action");
				var offset = mCSB_container.offset();
				dragY = _coordinates(e)[0] - offset.top;
				dragX = _coordinates(e)[1] - offset.left;
				touchIntent = [_coordinates(e)[0], _coordinates(e)[1]];
			}
			function _onTouchmove(e) {
				if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
					return;
				}
				if (!o.documentTouchScroll) {
					e.preventDefault();
				}
				e.stopImmediatePropagation();
				if (docDrag && !touchDrag) {
					return;
				}
				if (draggable) {
					runningTime = _getTime();
					var offset = mCustomScrollBox.offset(),
					    y = _coordinates(e)[0] - offset.top,
					    x = _coordinates(e)[1] - offset.left,
					    easing = "mcsLinearOut";
					touchMoveY.push(y);
					touchMoveX.push(x);
					touchIntent[2] = Math.abs(_coordinates(e)[0] - touchIntent[0]);touchIntent[3] = Math.abs(_coordinates(e)[1] - touchIntent[1]);
					if (d.overflowed[0]) {
						var limit = mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(),
						    prevent = dragY - y > 0 && y - dragY > -(limit * d.scrollRatio.y) && (touchIntent[3] * 2 < touchIntent[2] || o.axis === "yx");
					}
					if (d.overflowed[1]) {
						var limitX = mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
						    preventX = dragX - x > 0 && x - dragX > -(limitX * d.scrollRatio.x) && (touchIntent[2] * 2 < touchIntent[3] || o.axis === "yx");
					}
					if (prevent || preventX) {
						/* prevent native document scrolling */
						if (!touchAction) {
							e.preventDefault();
						}
						touchDrag = 1;
					} else {
						docDrag = 1;
						$this.addClass("mCS_touch_action");
					}
					if (touchAction) {
						e.preventDefault();
					}
					amount = o.axis === "yx" ? [dragY - y, dragX - x] : o.axis === "x" ? [null, dragX - x] : [dragY - y, null];
					mCSB_container[0].idleTimer = 250;
					if (d.overflowed[0]) {
						_drag(amount[0], durA, easing, "y", "all", true);
					}
					if (d.overflowed[1]) {
						_drag(amount[1], durA, easing, "x", overwrite, true);
					}
				}
			}
			function _onTouchstart2(e) {
				if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
					touchable = 0;return;
				}
				touchable = 1;
				e.stopImmediatePropagation();
				_stop($this);
				startTime = _getTime();
				var offset = mCustomScrollBox.offset();
				touchStartY = _coordinates(e)[0] - offset.top;
				touchStartX = _coordinates(e)[1] - offset.left;
				touchMoveY = [];touchMoveX = [];
			}
			function _onTouchend(e) {
				if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
					return;
				}
				draggable = 0;
				e.stopImmediatePropagation();
				touchDrag = 0;docDrag = 0;
				endTime = _getTime();
				var offset = mCustomScrollBox.offset(),
				    y = _coordinates(e)[0] - offset.top,
				    x = _coordinates(e)[1] - offset.left;
				if (endTime - runningTime > 30) {
					return;
				}
				speed = 1000 / (endTime - startTime);
				var easing = "mcsEaseOut",
				    slow = speed < 2.5,
				    diff = slow ? [touchMoveY[touchMoveY.length - 2], touchMoveX[touchMoveX.length - 2]] : [0, 0];
				distance = slow ? [y - diff[0], x - diff[1]] : [y - touchStartY, x - touchStartX];
				var absDistance = [Math.abs(distance[0]), Math.abs(distance[1])];
				speed = slow ? [Math.abs(distance[0] / 4), Math.abs(distance[1] / 4)] : [speed, speed];
				var a = [Math.abs(mCSB_container[0].offsetTop) - distance[0] * _m(absDistance[0] / speed[0], speed[0]), Math.abs(mCSB_container[0].offsetLeft) - distance[1] * _m(absDistance[1] / speed[1], speed[1])];
				amount = o.axis === "yx" ? [a[0], a[1]] : o.axis === "x" ? [null, a[1]] : [a[0], null];
				durB = [absDistance[0] * 4 + o.scrollInertia, absDistance[1] * 4 + o.scrollInertia];
				var md = parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
				amount[0] = absDistance[0] > md ? amount[0] : 0;
				amount[1] = absDistance[1] > md ? amount[1] : 0;
				if (d.overflowed[0]) {
					_drag(amount[0], durB[0], easing, "y", overwrite, false);
				}
				if (d.overflowed[1]) {
					_drag(amount[1], durB[1], easing, "x", overwrite, false);
				}
			}
			function _m(ds, s) {
				var r = [s * 1.5, s * 2, s / 1.5, s / 2];
				if (ds > 90) {
					return s > 4 ? r[0] : r[3];
				} else if (ds > 60) {
					return s > 3 ? r[3] : r[2];
				} else if (ds > 30) {
					return s > 8 ? r[1] : s > 6 ? r[0] : s > 4 ? s : r[2];
				} else {
					return s > 8 ? s : r[3];
				}
			}
			function _drag(amount, dur, easing, dir, overwrite, drag) {
				if (!amount) {
					return;
				}
				_scrollTo($this, amount.toString(), { dur: dur, scrollEasing: easing, dir: dir, overwrite: overwrite, drag: drag });
			}
		},

		/* -------------------- */

		/* 
  SELECT TEXT EVENTS 
  scrolls content when text is selected 
  */
		_selectable = function _selectable() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    seq = d.sequential,
			    namespace = pluginPfx + "_" + d.idx,
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    wrapper = mCSB_container.parent(),
			    action;
			mCSB_container.bind("mousedown." + namespace, function (e) {
				if (touchable) {
					return;
				}
				if (!action) {
					action = 1;touchActive = true;
				}
			}).add(document).bind("mousemove." + namespace, function (e) {
				if (!touchable && action && _sel()) {
					var offset = mCSB_container.offset(),
					    y = _coordinates(e)[0] - offset.top + mCSB_container[0].offsetTop,
					    x = _coordinates(e)[1] - offset.left + mCSB_container[0].offsetLeft;
					if (y > 0 && y < wrapper.height() && x > 0 && x < wrapper.width()) {
						if (seq.step) {
							_seq("off", null, "stepped");
						}
					} else {
						if (o.axis !== "x" && d.overflowed[0]) {
							if (y < 0) {
								_seq("on", 38);
							} else if (y > wrapper.height()) {
								_seq("on", 40);
							}
						}
						if (o.axis !== "y" && d.overflowed[1]) {
							if (x < 0) {
								_seq("on", 37);
							} else if (x > wrapper.width()) {
								_seq("on", 39);
							}
						}
					}
				}
			}).bind("mouseup." + namespace + " dragend." + namespace, function (e) {
				if (touchable) {
					return;
				}
				if (action) {
					action = 0;_seq("off", null);
				}
				touchActive = false;
			});
			function _sel() {
				return window.getSelection ? window.getSelection().toString() : document.selection && document.selection.type != "Control" ? document.selection.createRange().text : 0;
			}
			function _seq(a, c, s) {
				seq.type = s && action ? "stepped" : "stepless";
				seq.scrollAmount = 10;
				_sequentialScroll($this, a, c, "mcsLinearOut", s ? 60 : null);
			}
		},

		/* -------------------- */

		/* 
  MOUSE WHEEL EVENT
  scrolls content via mouse-wheel 
  via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
  */
		_mousewheel = function _mousewheel() {
			if (!$(this).data(pluginPfx)) {
				return;
			} /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    namespace = pluginPfx + "_" + d.idx,
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $("#mCSB_" + d.idx + "_dragger_horizontal")],
			    iframe = $("#mCSB_" + d.idx + "_container").find("iframe");
			if (iframe.length) {
				iframe.each(function () {
					$(this).bind("load", function () {
						/* bind events on accessible iframes */
						if (_canAccessIFrame(this)) {
							$(this.contentDocument || this.contentWindow.document).bind("mousewheel." + namespace, function (e, delta) {
								_onMousewheel(e, delta);
							});
						}
					});
				});
			}
			mCustomScrollBox.bind("mousewheel." + namespace, function (e, delta) {
				_onMousewheel(e, delta);
			});
			function _onMousewheel(e, delta) {
				_stop($this);
				if (_disableMousewheel($this, e.target)) {
					return;
				} /* disables mouse-wheel when hovering specific elements */
				var deltaFactor = o.mouseWheel.deltaFactor !== "auto" ? parseInt(o.mouseWheel.deltaFactor) : oldIE && e.deltaFactor < 100 ? 100 : e.deltaFactor || 100,
				    dur = o.scrollInertia;
				if (o.axis === "x" || o.mouseWheel.axis === "x") {
					var dir = "x",
					    px = [Math.round(deltaFactor * d.scrollRatio.x), parseInt(o.mouseWheel.scrollAmount)],
					    amount = o.mouseWheel.scrollAmount !== "auto" ? px[1] : px[0] >= mCustomScrollBox.width() ? mCustomScrollBox.width() * 0.9 : px[0],
					    contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[0].offsetLeft),
					    draggerPos = mCSB_dragger[1][0].offsetLeft,
					    limit = mCSB_dragger[1].parent().width() - mCSB_dragger[1].width(),
					    dlt = o.mouseWheel.axis === "y" ? e.deltaY || delta : e.deltaX;
				} else {
					var dir = "y",
					    px = [Math.round(deltaFactor * d.scrollRatio.y), parseInt(o.mouseWheel.scrollAmount)],
					    amount = o.mouseWheel.scrollAmount !== "auto" ? px[1] : px[0] >= mCustomScrollBox.height() ? mCustomScrollBox.height() * 0.9 : px[0],
					    contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[0].offsetTop),
					    draggerPos = mCSB_dragger[0][0].offsetTop,
					    limit = mCSB_dragger[0].parent().height() - mCSB_dragger[0].height(),
					    dlt = e.deltaY || delta;
				}
				if (dir === "y" && !d.overflowed[0] || dir === "x" && !d.overflowed[1]) {
					return;
				}
				if (o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) {
					dlt = -dlt;
				}
				if (o.mouseWheel.normalizeDelta) {
					dlt = dlt < 0 ? -1 : 1;
				}
				if (dlt > 0 && draggerPos !== 0 || dlt < 0 && draggerPos !== limit || o.mouseWheel.preventDefault) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
				if (e.deltaFactor < 5 && !o.mouseWheel.normalizeDelta) {
					//very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
					amount = e.deltaFactor;dur = 17;
				}
				_scrollTo($this, (contentPos - dlt * amount).toString(), { dir: dir, dur: dur });
			}
		},

		/* -------------------- */

		/* checks if iframe can be accessed */
		_canAccessIFrameCache = new Object(),
		    _canAccessIFrame = function _canAccessIFrame(iframe) {
			var result = false,
			    cacheKey = false,
			    html = null;
			if (iframe === undefined) {
				cacheKey = "#empty";
			} else if ($(iframe).attr("id") !== undefined) {
				cacheKey = $(iframe).attr("id");
			}
			if (cacheKey !== false && _canAccessIFrameCache[cacheKey] !== undefined) {
				return _canAccessIFrameCache[cacheKey];
			}
			if (!iframe) {
				try {
					var doc = top.document;
					html = doc.body.innerHTML;
				} catch (err) {/* do nothing */}
				result = html !== null;
			} else {
				try {
					var doc = iframe.contentDocument || iframe.contentWindow.document;
					html = doc.body.innerHTML;
				} catch (err) {/* do nothing */}
				result = html !== null;
			}
			if (cacheKey !== false) {
				_canAccessIFrameCache[cacheKey] = result;
			}
			return result;
		},

		/* -------------------- */

		/* switches iframe's pointer-events property (drag, mousewheel etc. over cross-domain iframes) */
		_iframe = function _iframe(evt) {
			var el = this.find("iframe");
			if (!el.length) {
				return;
			} /* check if content contains iframes */
			var val = !evt ? "none" : "auto";
			el.css("pointer-events", val); /* for IE11, iframe's display property should not be "block" */
		},

		/* -------------------- */

		/* disables mouse-wheel when hovering specific elements like select, datalist etc. */
		_disableMousewheel = function _disableMousewheel(el, target) {
			var tag = target.nodeName.toLowerCase(),
			    tags = el.data(pluginPfx).opt.mouseWheel.disableOver,

			/* elements that require focus */
			focusTags = ["select", "textarea"];
			return $.inArray(tag, tags) > -1 && !($.inArray(tag, focusTags) > -1 && !$(target).is(":focus"));
		},

		/* -------------------- */

		/* 
  DRAGGER RAIL CLICK EVENT
  scrolls content via dragger rail 
  */
		_draggerRail = function _draggerRail() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    namespace = pluginPfx + "_" + d.idx,
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    wrapper = mCSB_container.parent(),
			    mCSB_draggerContainer = $(".mCSB_" + d.idx + "_scrollbar ." + classes[12]),
			    clickable;
			mCSB_draggerContainer.bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace, function (e) {
				touchActive = true;
				if (!$(e.target).hasClass("mCSB_dragger")) {
					clickable = 1;
				}
			}).bind("touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace, function (e) {
				touchActive = false;
			}).bind("click." + namespace, function (e) {
				if (!clickable) {
					return;
				}
				clickable = 0;
				if ($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")) {
					_stop($this);
					var el = $(this),
					    mCSB_dragger = el.find(".mCSB_dragger");
					if (el.parent(".mCSB_scrollTools_horizontal").length > 0) {
						if (!d.overflowed[1]) {
							return;
						}
						var dir = "x",
						    clickDir = e.pageX > mCSB_dragger.offset().left ? -1 : 1,
						    to = Math.abs(mCSB_container[0].offsetLeft) - clickDir * (wrapper.width() * 0.9);
					} else {
						if (!d.overflowed[0]) {
							return;
						}
						var dir = "y",
						    clickDir = e.pageY > mCSB_dragger.offset().top ? -1 : 1,
						    to = Math.abs(mCSB_container[0].offsetTop) - clickDir * (wrapper.height() * 0.9);
					}
					_scrollTo($this, to.toString(), { dir: dir, scrollEasing: "mcsEaseInOut" });
				}
			});
		},

		/* -------------------- */

		/* 
  FOCUS EVENT
  scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
  */
		_focus = function _focus() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    namespace = pluginPfx + "_" + d.idx,
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    wrapper = mCSB_container.parent();
			mCSB_container.bind("focusin." + namespace, function (e) {
				var el = $(document.activeElement),
				    nested = mCSB_container.find(".mCustomScrollBox").length,
				    dur = 0;
				if (!el.is(o.advanced.autoScrollOnFocus)) {
					return;
				}
				_stop($this);
				clearTimeout($this[0]._focusTimeout);
				$this[0]._focusTimer = nested ? (dur + 17) * nested : 0;
				$this[0]._focusTimeout = setTimeout(function () {
					var to = [_childPos(el)[0], _childPos(el)[1]],
					    contentPos = [mCSB_container[0].offsetTop, mCSB_container[0].offsetLeft],
					    isVisible = [contentPos[0] + to[0] >= 0 && contentPos[0] + to[0] < wrapper.height() - el.outerHeight(false), contentPos[1] + to[1] >= 0 && contentPos[0] + to[1] < wrapper.width() - el.outerWidth(false)],
					    overwrite = o.axis === "yx" && !isVisible[0] && !isVisible[1] ? "none" : "all";
					if (o.axis !== "x" && !isVisible[0]) {
						_scrollTo($this, to[0].toString(), { dir: "y", scrollEasing: "mcsEaseInOut", overwrite: overwrite, dur: dur });
					}
					if (o.axis !== "y" && !isVisible[1]) {
						_scrollTo($this, to[1].toString(), { dir: "x", scrollEasing: "mcsEaseInOut", overwrite: overwrite, dur: dur });
					}
				}, $this[0]._focusTimer);
			});
		},

		/* -------------------- */

		/* sets content wrapper scrollTop/scrollLeft always to 0 */
		_wrapperScroll = function _wrapperScroll() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    namespace = pluginPfx + "_" + d.idx,
			    wrapper = $("#mCSB_" + d.idx + "_container").parent();
			wrapper.bind("scroll." + namespace, function (e) {
				if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !== 0) {
					$(".mCSB_" + d.idx + "_scrollbar").css("visibility", "hidden"); /* hide scrollbar(s) */
				}
			});
		},

		/* -------------------- */

		/* 
  BUTTONS EVENTS
  scrolls content via up, down, left and right buttons 
  */
		_buttons = function _buttons() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    seq = d.sequential,
			    namespace = pluginPfx + "_" + d.idx,
			    sel = ".mCSB_" + d.idx + "_scrollbar",
			    btn = $(sel + ">a");
			btn.bind("contextmenu." + namespace, function (e) {
				e.preventDefault(); //prevent right click
			}).bind("mousedown." + namespace + " touchstart." + namespace + " pointerdown." + namespace + " MSPointerDown." + namespace + " mouseup." + namespace + " touchend." + namespace + " pointerup." + namespace + " MSPointerUp." + namespace + " mouseout." + namespace + " pointerout." + namespace + " MSPointerOut." + namespace + " click." + namespace, function (e) {
				e.preventDefault();
				if (!_mouseBtnLeft(e)) {
					return;
				} /* left mouse button only */
				var btnClass = $(this).attr("class");
				seq.type = o.scrollButtons.scrollType;
				switch (e.type) {
					case "mousedown":case "touchstart":case "pointerdown":case "MSPointerDown":
						if (seq.type === "stepped") {
							return;
						}
						touchActive = true;
						d.tweenRunning = false;
						_seq("on", btnClass);
						break;
					case "mouseup":case "touchend":case "pointerup":case "MSPointerUp":
					case "mouseout":case "pointerout":case "MSPointerOut":
						if (seq.type === "stepped") {
							return;
						}
						touchActive = false;
						if (seq.dir) {
							_seq("off", btnClass);
						}
						break;
					case "click":
						if (seq.type !== "stepped" || d.tweenRunning) {
							return;
						}
						_seq("on", btnClass);
						break;
				}
				function _seq(a, c) {
					seq.scrollAmount = o.scrollButtons.scrollAmount;
					_sequentialScroll($this, a, c);
				}
			});
		},

		/* -------------------- */

		/* 
  KEYBOARD EVENTS
  scrolls content via keyboard 
  Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
  */
		_keyboard = function _keyboard() {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    seq = d.sequential,
			    namespace = pluginPfx + "_" + d.idx,
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    wrapper = mCSB_container.parent(),
			    editables = "input,textarea,select,datalist,keygen,[contenteditable='true']",
			    iframe = mCSB_container.find("iframe"),
			    events = ["blur." + namespace + " keydown." + namespace + " keyup." + namespace];
			if (iframe.length) {
				iframe.each(function () {
					$(this).bind("load", function () {
						/* bind events on accessible iframes */
						if (_canAccessIFrame(this)) {
							$(this.contentDocument || this.contentWindow.document).bind(events[0], function (e) {
								_onKeyboard(e);
							});
						}
					});
				});
			}
			mCustomScrollBox.attr("tabindex", "0").bind(events[0], function (e) {
				_onKeyboard(e);
			});
			function _onKeyboard(e) {
				switch (e.type) {
					case "blur":
						if (d.tweenRunning && seq.dir) {
							_seq("off", null);
						}
						break;
					case "keydown":case "keyup":
						var code = e.keyCode ? e.keyCode : e.which,
						    action = "on";
						if (o.axis !== "x" && (code === 38 || code === 40) || o.axis !== "y" && (code === 37 || code === 39)) {
							/* up (38), down (40), left (37), right (39) arrows */
							if ((code === 38 || code === 40) && !d.overflowed[0] || (code === 37 || code === 39) && !d.overflowed[1]) {
								return;
							}
							if (e.type === "keyup") {
								action = "off";
							}
							if (!$(document.activeElement).is(editables)) {
								e.preventDefault();
								e.stopImmediatePropagation();
								_seq(action, code);
							}
						} else if (code === 33 || code === 34) {
							/* PgUp (33), PgDn (34) */
							if (d.overflowed[0] || d.overflowed[1]) {
								e.preventDefault();
								e.stopImmediatePropagation();
							}
							if (e.type === "keyup") {
								_stop($this);
								var keyboardDir = code === 34 ? -1 : 1;
								if (o.axis === "x" || o.axis === "yx" && d.overflowed[1] && !d.overflowed[0]) {
									var dir = "x",
									    to = Math.abs(mCSB_container[0].offsetLeft) - keyboardDir * (wrapper.width() * 0.9);
								} else {
									var dir = "y",
									    to = Math.abs(mCSB_container[0].offsetTop) - keyboardDir * (wrapper.height() * 0.9);
								}
								_scrollTo($this, to.toString(), { dir: dir, scrollEasing: "mcsEaseInOut" });
							}
						} else if (code === 35 || code === 36) {
							/* End (35), Home (36) */
							if (!$(document.activeElement).is(editables)) {
								if (d.overflowed[0] || d.overflowed[1]) {
									e.preventDefault();
									e.stopImmediatePropagation();
								}
								if (e.type === "keyup") {
									if (o.axis === "x" || o.axis === "yx" && d.overflowed[1] && !d.overflowed[0]) {
										var dir = "x",
										    to = code === 35 ? Math.abs(wrapper.width() - mCSB_container.outerWidth(false)) : 0;
									} else {
										var dir = "y",
										    to = code === 35 ? Math.abs(wrapper.height() - mCSB_container.outerHeight(false)) : 0;
									}
									_scrollTo($this, to.toString(), { dir: dir, scrollEasing: "mcsEaseInOut" });
								}
							}
						}
						break;
				}
				function _seq(a, c) {
					seq.type = o.keyboard.scrollType;
					seq.scrollAmount = o.keyboard.scrollAmount;
					if (seq.type === "stepped" && d.tweenRunning) {
						return;
					}
					_sequentialScroll($this, a, c);
				}
			}
		},

		/* -------------------- */

		/* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
		_sequentialScroll = function _sequentialScroll(el, action, trigger, e, s) {
			var d = el.data(pluginPfx),
			    o = d.opt,
			    seq = d.sequential,
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    once = seq.type === "stepped" ? true : false,
			    steplessSpeed = o.scrollInertia < 26 ? 26 : o.scrollInertia,
			    /* 26/1.5=17 */
			steppedSpeed = o.scrollInertia < 1 ? 17 : o.scrollInertia;
			switch (action) {
				case "on":
					seq.dir = [trigger === classes[16] || trigger === classes[15] || trigger === 39 || trigger === 37 ? "x" : "y", trigger === classes[13] || trigger === classes[15] || trigger === 38 || trigger === 37 ? -1 : 1];
					_stop(el);
					if (_isNumeric(trigger) && seq.type === "stepped") {
						return;
					}
					_on(once);
					break;
				case "off":
					_off();
					if (once || d.tweenRunning && seq.dir) {
						_on(true);
					}
					break;
			}

			/* starts sequence */
			function _on(once) {
				if (o.snapAmount) {
					seq.scrollAmount = !(o.snapAmount instanceof Array) ? o.snapAmount : seq.dir[0] === "x" ? o.snapAmount[1] : o.snapAmount[0];
				} /* scrolling snapping */
				var c = seq.type !== "stepped",
				    /* continuous scrolling */
				t = s ? s : !once ? 1000 / 60 : c ? steplessSpeed / 1.5 : steppedSpeed,
				    /* timer */
				m = !once ? 2.5 : c ? 7.5 : 40,
				    /* multiplier */
				contentPos = [Math.abs(mCSB_container[0].offsetTop), Math.abs(mCSB_container[0].offsetLeft)],
				    ratio = [d.scrollRatio.y > 10 ? 10 : d.scrollRatio.y, d.scrollRatio.x > 10 ? 10 : d.scrollRatio.x],
				    amount = seq.dir[0] === "x" ? contentPos[1] + seq.dir[1] * (ratio[1] * m) : contentPos[0] + seq.dir[1] * (ratio[0] * m),
				    px = seq.dir[0] === "x" ? contentPos[1] + seq.dir[1] * parseInt(seq.scrollAmount) : contentPos[0] + seq.dir[1] * parseInt(seq.scrollAmount),
				    to = seq.scrollAmount !== "auto" ? px : amount,
				    easing = e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
				    onComplete = !once ? false : true;
				if (once && t < 17) {
					to = seq.dir[0] === "x" ? contentPos[1] : contentPos[0];
				}
				_scrollTo(el, to.toString(), { dir: seq.dir[0], scrollEasing: easing, dur: t, onComplete: onComplete });
				if (once) {
					seq.dir = false;
					return;
				}
				clearTimeout(seq.step);
				seq.step = setTimeout(function () {
					_on();
				}, t);
			}
			/* stops sequence */
			function _off() {
				clearTimeout(seq.step);
				_delete(seq, "step");
				_stop(el);
			}
		},

		/* -------------------- */

		/* returns a yx array from value */
		_arr = function _arr(val) {
			var o = $(this).data(pluginPfx).opt,
			    vals = [];
			if (typeof val === "function") {
				val = val();
			} /* check if the value is a single anonymous function */
			/* check if value is object or array, its length and create an array with yx values */
			if (!(val instanceof Array)) {
				/* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
				vals[0] = val.y ? val.y : val.x || o.axis === "x" ? null : val;
				vals[1] = val.x ? val.x : val.y || o.axis === "y" ? null : val;
			} else {
				/* array value (e.g. [100,100]) */
				vals = val.length > 1 ? [val[0], val[1]] : o.axis === "x" ? [null, val[0]] : [val[0], null];
			}
			/* check if array values are anonymous functions */
			if (typeof vals[0] === "function") {
				vals[0] = vals[0]();
			}
			if (typeof vals[1] === "function") {
				vals[1] = vals[1]();
			}
			return vals;
		},

		/* -------------------- */

		/* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
		_to = function _to(val, dir) {
			if (val == null || typeof val == "undefined") {
				return;
			}
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    wrapper = mCSB_container.parent(),
			    t = typeof val === "undefined" ? "undefined" : _typeof(val);
			if (!dir) {
				dir = o.axis === "x" ? "x" : "y";
			}
			var contentLength = dir === "x" ? mCSB_container.outerWidth(false) - wrapper.width() : mCSB_container.outerHeight(false) - wrapper.height(),
			    contentPos = dir === "x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
			    cssProp = dir === "x" ? "left" : "top";
			switch (t) {
				case "function":
					/* this currently is not used. Consider removing it */
					return val();
					break;
				case "object":
					/* js/jquery object */
					var obj = val.jquery ? val : $(val);
					if (!obj.length) {
						return;
					}
					return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[0];
					break;
				case "string":case "number":
					if (_isNumeric(val)) {
						/* numeric value */
						return Math.abs(val);
					} else if (val.indexOf("%") !== -1) {
						/* percentage value */
						return Math.abs(contentLength * parseInt(val) / 100);
					} else if (val.indexOf("-=") !== -1) {
						/* decrease value */
						return Math.abs(contentPos - parseInt(val.split("-=")[1]));
					} else if (val.indexOf("+=") !== -1) {
						/* inrease value */
						var p = contentPos + parseInt(val.split("+=")[1]);
						return p >= 0 ? 0 : Math.abs(p);
					} else if (val.indexOf("px") !== -1 && _isNumeric(val.split("px")[0])) {
						/* pixels string value (e.g. "100px") */
						return Math.abs(val.split("px")[0]);
					} else {
						if (val === "top" || val === "left") {
							/* special strings */
							return 0;
						} else if (val === "bottom") {
							return Math.abs(wrapper.height() - mCSB_container.outerHeight(false));
						} else if (val === "right") {
							return Math.abs(wrapper.width() - mCSB_container.outerWidth(false));
						} else if (val === "first" || val === "last") {
							var obj = mCSB_container.find(":" + val);
							return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[0];
						} else {
							if ($(val).length) {
								/* jquery selector */
								return dir === "x" ? _childPos($(val))[1] : _childPos($(val))[0];
							} else {
								/* other values (e.g. "100em") */
								mCSB_container.css(cssProp, val);
								methods.update.call(null, $this[0]);
								return;
							}
						}
					}
					break;
			}
		},

		/* -------------------- */

		/* calls the update method automatically */
		_autoUpdate = function _autoUpdate(rem) {
			var $this = $(this),
			    d = $this.data(pluginPfx),
			    o = d.opt,
			    mCSB_container = $("#mCSB_" + d.idx + "_container");
			if (rem) {
				/* 
    removes autoUpdate timer 
    usage: _autoUpdate.call(this,"remove");
    */
				clearTimeout(mCSB_container[0].autoUpdate);
				_delete(mCSB_container[0], "autoUpdate");
				return;
			}
			upd();
			function upd() {
				clearTimeout(mCSB_container[0].autoUpdate);
				if ($this.parents("html").length === 0) {
					/* check element in dom tree */
					$this = null;
					return;
				}
				mCSB_container[0].autoUpdate = setTimeout(function () {
					/* update on specific selector(s) length and size change */
					if (o.advanced.updateOnSelectorChange) {
						d.poll.change.n = sizesSum();
						if (d.poll.change.n !== d.poll.change.o) {
							d.poll.change.o = d.poll.change.n;
							doUpd(3);
							return;
						}
					}
					/* update on main element and scrollbar size changes */
					if (o.advanced.updateOnContentResize) {
						d.poll.size.n = $this[0].scrollHeight + $this[0].scrollWidth + mCSB_container[0].offsetHeight + $this[0].offsetHeight + $this[0].offsetWidth;
						if (d.poll.size.n !== d.poll.size.o) {
							d.poll.size.o = d.poll.size.n;
							doUpd(1);
							return;
						}
					}
					/* update on image load */
					if (o.advanced.updateOnImageLoad) {
						if (!(o.advanced.updateOnImageLoad === "auto" && o.axis === "y")) {
							//by default, it doesn't run on vertical content
							d.poll.img.n = mCSB_container.find("img").length;
							if (d.poll.img.n !== d.poll.img.o) {
								d.poll.img.o = d.poll.img.n;
								mCSB_container.find("img").each(function () {
									imgLoader(this);
								});
								return;
							}
						}
					}
					if (o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad) {
						upd();
					}
				}, o.advanced.autoUpdateTimeout);
			}
			/* a tiny image loader */
			function imgLoader(el) {
				if ($(el).hasClass(classes[2])) {
					doUpd();return;
				}
				var img = new Image();
				function createDelegate(contextObject, delegateMethod) {
					return function () {
						return delegateMethod.apply(contextObject, arguments);
					};
				}
				function imgOnLoad() {
					this.onload = null;
					$(el).addClass(classes[2]);
					doUpd(2);
				}
				img.onload = createDelegate(img, imgOnLoad);
				img.src = el.src;
			}
			/* returns the total height and width sum of all elements matching the selector */
			function sizesSum() {
				if (o.advanced.updateOnSelectorChange === true) {
					o.advanced.updateOnSelectorChange = "*";
				}
				var total = 0,
				    sel = mCSB_container.find(o.advanced.updateOnSelectorChange);
				if (o.advanced.updateOnSelectorChange && sel.length > 0) {
					sel.each(function () {
						total += this.offsetHeight + this.offsetWidth;
					});
				}
				return total;
			}
			/* calls the update method */
			function doUpd(cb) {
				clearTimeout(mCSB_container[0].autoUpdate);
				methods.update.call(null, $this[0], cb);
			}
		},

		/* -------------------- */

		/* snaps scrolling to a multiple of a pixels number */
		_snapAmount = function _snapAmount(to, amount, offset) {
			return Math.round(to / amount) * amount - offset;
		},

		/* -------------------- */

		/* stops content and scrollbar animations */
		_stop = function _stop(el) {
			var d = el.data(pluginPfx),
			    sel = $("#mCSB_" + d.idx + "_container,#mCSB_" + d.idx + "_container_wrapper,#mCSB_" + d.idx + "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal");
			sel.each(function () {
				_stopTween.call(this);
			});
		},

		/* -------------------- */

		/* 
  ANIMATES CONTENT 
  This is where the actual scrolling happens
  */
		_scrollTo = function _scrollTo(el, to, options) {
			var d = el.data(pluginPfx),
			    o = d.opt,
			    defaults = {
				trigger: "internal",
				dir: "y",
				scrollEasing: "mcsEaseOut",
				drag: false,
				dur: o.scrollInertia,
				overwrite: "all",
				callbacks: true,
				onStart: true,
				onUpdate: true,
				onComplete: true
			},
			    options = $.extend(defaults, options),
			    dur = [options.dur, options.drag ? 0 : options.dur],
			    mCustomScrollBox = $("#mCSB_" + d.idx),
			    mCSB_container = $("#mCSB_" + d.idx + "_container"),
			    wrapper = mCSB_container.parent(),
			    totalScrollOffsets = o.callbacks.onTotalScrollOffset ? _arr.call(el, o.callbacks.onTotalScrollOffset) : [0, 0],
			    totalScrollBackOffsets = o.callbacks.onTotalScrollBackOffset ? _arr.call(el, o.callbacks.onTotalScrollBackOffset) : [0, 0];
			d.trigger = options.trigger;
			if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !== 0) {
				/* always reset scrollTop/Left */
				$(".mCSB_" + d.idx + "_scrollbar").css("visibility", "visible");
				wrapper.scrollTop(0).scrollLeft(0);
			}
			if (to === "_resetY" && !d.contentReset.y) {
				/* callbacks: onOverflowYNone */
				if (_cb("onOverflowYNone")) {
					o.callbacks.onOverflowYNone.call(el[0]);
				}
				d.contentReset.y = 1;
			}
			if (to === "_resetX" && !d.contentReset.x) {
				/* callbacks: onOverflowXNone */
				if (_cb("onOverflowXNone")) {
					o.callbacks.onOverflowXNone.call(el[0]);
				}
				d.contentReset.x = 1;
			}
			if (to === "_resetY" || to === "_resetX") {
				return;
			}
			if ((d.contentReset.y || !el[0].mcs) && d.overflowed[0]) {
				/* callbacks: onOverflowY */
				if (_cb("onOverflowY")) {
					o.callbacks.onOverflowY.call(el[0]);
				}
				d.contentReset.x = null;
			}
			if ((d.contentReset.x || !el[0].mcs) && d.overflowed[1]) {
				/* callbacks: onOverflowX */
				if (_cb("onOverflowX")) {
					o.callbacks.onOverflowX.call(el[0]);
				}
				d.contentReset.x = null;
			}
			if (o.snapAmount) {
				/* scrolling snapping */
				var snapAmount = !(o.snapAmount instanceof Array) ? o.snapAmount : options.dir === "x" ? o.snapAmount[1] : o.snapAmount[0];
				to = _snapAmount(to, snapAmount, o.snapOffset);
			}
			switch (options.dir) {
				case "x":
					var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_horizontal"),
					    property = "left",
					    contentPos = mCSB_container[0].offsetLeft,
					    limit = [mCustomScrollBox.width() - mCSB_container.outerWidth(false), mCSB_dragger.parent().width() - mCSB_dragger.width()],
					    scrollTo = [to, to === 0 ? 0 : to / d.scrollRatio.x],
					    tso = totalScrollOffsets[1],
					    tsbo = totalScrollBackOffsets[1],
					    totalScrollOffset = tso > 0 ? tso / d.scrollRatio.x : 0,
					    totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.x : 0;
					break;
				case "y":
					var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_vertical"),
					    property = "top",
					    contentPos = mCSB_container[0].offsetTop,
					    limit = [mCustomScrollBox.height() - mCSB_container.outerHeight(false), mCSB_dragger.parent().height() - mCSB_dragger.height()],
					    scrollTo = [to, to === 0 ? 0 : to / d.scrollRatio.y],
					    tso = totalScrollOffsets[0],
					    tsbo = totalScrollBackOffsets[0],
					    totalScrollOffset = tso > 0 ? tso / d.scrollRatio.y : 0,
					    totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.y : 0;
					break;
			}
			if (scrollTo[1] < 0 || scrollTo[0] === 0 && scrollTo[1] === 0) {
				scrollTo = [0, 0];
			} else if (scrollTo[1] >= limit[1]) {
				scrollTo = [limit[0], limit[1]];
			} else {
				scrollTo[0] = -scrollTo[0];
			}
			if (!el[0].mcs) {
				_mcs(); /* init mcs object (once) to make it available before callbacks */
				if (_cb("onInit")) {
					o.callbacks.onInit.call(el[0]);
				} /* callbacks: onInit */
			}
			clearTimeout(mCSB_container[0].onCompleteTimeout);
			_tweenTo(mCSB_dragger[0], property, Math.round(scrollTo[1]), dur[1], options.scrollEasing);
			if (!d.tweenRunning && (contentPos === 0 && scrollTo[0] >= 0 || contentPos === limit[0] && scrollTo[0] <= limit[0])) {
				return;
			}
			_tweenTo(mCSB_container[0], property, Math.round(scrollTo[0]), dur[0], options.scrollEasing, options.overwrite, {
				onStart: function onStart() {
					if (options.callbacks && options.onStart && !d.tweenRunning) {
						/* callbacks: onScrollStart */
						if (_cb("onScrollStart")) {
							_mcs();o.callbacks.onScrollStart.call(el[0]);
						}
						d.tweenRunning = true;
						_onDragClasses(mCSB_dragger);
						d.cbOffsets = _cbOffsets();
					}
				}, onUpdate: function onUpdate() {
					if (options.callbacks && options.onUpdate) {
						/* callbacks: whileScrolling */
						if (_cb("whileScrolling")) {
							_mcs();o.callbacks.whileScrolling.call(el[0]);
						}
					}
				}, onComplete: function onComplete() {
					if (options.callbacks && options.onComplete) {
						if (o.axis === "yx") {
							clearTimeout(mCSB_container[0].onCompleteTimeout);
						}
						var t = mCSB_container[0].idleTimer || 0;
						mCSB_container[0].onCompleteTimeout = setTimeout(function () {
							/* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
							if (_cb("onScroll")) {
								_mcs();o.callbacks.onScroll.call(el[0]);
							}
							if (_cb("onTotalScroll") && scrollTo[1] >= limit[1] - totalScrollOffset && d.cbOffsets[0]) {
								_mcs();o.callbacks.onTotalScroll.call(el[0]);
							}
							if (_cb("onTotalScrollBack") && scrollTo[1] <= totalScrollBackOffset && d.cbOffsets[1]) {
								_mcs();o.callbacks.onTotalScrollBack.call(el[0]);
							}
							d.tweenRunning = false;
							mCSB_container[0].idleTimer = 0;
							_onDragClasses(mCSB_dragger, "hide");
						}, t);
					}
				}
			});
			/* checks if callback function exists */
			function _cb(cb) {
				return d && o.callbacks[cb] && typeof o.callbacks[cb] === "function";
			}
			/* checks whether callback offsets always trigger */
			function _cbOffsets() {
				return [o.callbacks.alwaysTriggerOffsets || contentPos >= limit[0] + tso, o.callbacks.alwaysTriggerOffsets || contentPos <= -tsbo];
			}
			/* 
   populates object with useful values for the user 
   values: 
   	content: this.mcs.content
   	content top position: this.mcs.top 
   	content left position: this.mcs.left 
   	dragger top position: this.mcs.draggerTop 
   	dragger left position: this.mcs.draggerLeft 
   	scrolling y percentage: this.mcs.topPct 
   	scrolling x percentage: this.mcs.leftPct 
   	scrolling direction: this.mcs.direction
   */
			function _mcs() {
				var cp = [mCSB_container[0].offsetTop, mCSB_container[0].offsetLeft],
				    /* content position */
				dp = [mCSB_dragger[0].offsetTop, mCSB_dragger[0].offsetLeft],
				    /* dragger position */
				cl = [mCSB_container.outerHeight(false), mCSB_container.outerWidth(false)],
				    /* content length */
				pl = [mCustomScrollBox.height(), mCustomScrollBox.width()]; /* content parent length */
				el[0].mcs = {
					content: mCSB_container, /* original content wrapper as jquery object */
					top: cp[0], left: cp[1], draggerTop: dp[0], draggerLeft: dp[1],
					topPct: Math.round(100 * Math.abs(cp[0]) / (Math.abs(cl[0]) - pl[0])), leftPct: Math.round(100 * Math.abs(cp[1]) / (Math.abs(cl[1]) - pl[1])),
					direction: options.dir
				};
				/* 
    this refers to the original element containing the scrollbar(s)
    usage: this.mcs.top, this.mcs.leftPct etc. 
    */
			}
		},

		/* -------------------- */

		/* 
  CUSTOM JAVASCRIPT ANIMATION TWEEN 
  Lighter and faster than jquery animate() and css transitions 
  Animates top/left properties and includes easings 
  */
		_tweenTo = function _tweenTo(el, prop, to, duration, easing, overwrite, callbacks) {
			if (!el._mTween) {
				el._mTween = { top: {}, left: {} };
			}
			var callbacks = callbacks || {},
			    onStart = callbacks.onStart || function () {},
			    onUpdate = callbacks.onUpdate || function () {},
			    onComplete = callbacks.onComplete || function () {},
			    startTime = _getTime(),
			    _delay,
			    progress = 0,
			    from = el.offsetTop,
			    elStyle = el.style,
			    _request,
			    tobj = el._mTween[prop];
			if (prop === "left") {
				from = el.offsetLeft;
			}
			var diff = to - from;
			tobj.stop = 0;
			if (overwrite !== "none") {
				_cancelTween();
			}
			_startTween();
			function _step() {
				if (tobj.stop) {
					return;
				}
				if (!progress) {
					onStart.call();
				}
				progress = _getTime() - startTime;
				_tween();
				if (progress >= tobj.time) {
					tobj.time = progress > tobj.time ? progress + _delay - (progress - tobj.time) : progress + _delay - 1;
					if (tobj.time < progress + 1) {
						tobj.time = progress + 1;
					}
				}
				if (tobj.time < duration) {
					tobj.id = _request(_step);
				} else {
					onComplete.call();
				}
			}
			function _tween() {
				if (duration > 0) {
					tobj.currVal = _ease(tobj.time, from, diff, duration, easing);
					elStyle[prop] = Math.round(tobj.currVal) + "px";
				} else {
					elStyle[prop] = to + "px";
				}
				onUpdate.call();
			}
			function _startTween() {
				_delay = 1000 / 60;
				tobj.time = progress + _delay;
				_request = !window.requestAnimationFrame ? function (f) {
					_tween();return setTimeout(f, 0.01);
				} : window.requestAnimationFrame;
				tobj.id = _request(_step);
			}
			function _cancelTween() {
				if (tobj.id == null) {
					return;
				}
				if (!window.requestAnimationFrame) {
					clearTimeout(tobj.id);
				} else {
					window.cancelAnimationFrame(tobj.id);
				}
				tobj.id = null;
			}
			function _ease(t, b, c, d, type) {
				switch (type) {
					case "linear":case "mcsLinear":
						return c * t / d + b;
						break;
					case "mcsLinearOut":
						t /= d;t--;return c * Math.sqrt(1 - t * t) + b;
						break;
					case "easeInOutSmooth":
						t /= d / 2;
						if (t < 1) return c / 2 * t * t + b;
						t--;
						return -c / 2 * (t * (t - 2) - 1) + b;
						break;
					case "easeInOutStrong":
						t /= d / 2;
						if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
						t--;
						return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
						break;
					case "easeInOut":case "mcsEaseInOut":
						t /= d / 2;
						if (t < 1) return c / 2 * t * t * t + b;
						t -= 2;
						return c / 2 * (t * t * t + 2) + b;
						break;
					case "easeOutSmooth":
						t /= d;t--;
						return -c * (t * t * t * t - 1) + b;
						break;
					case "easeOutStrong":
						return c * (-Math.pow(2, -10 * t / d) + 1) + b;
						break;
					case "easeOut":case "mcsEaseOut":default:
						var ts = (t /= d) * t,
						    tc = ts * t;
						return b + c * (0.499999999999997 * tc * ts + -2.5 * ts * ts + 5.5 * tc + -6.5 * ts + 4 * t);
				}
			}
		},

		/* -------------------- */

		/* returns current time */
		_getTime = function _getTime() {
			if (window.performance && window.performance.now) {
				return window.performance.now();
			} else {
				if (window.performance && window.performance.webkitNow) {
					return window.performance.webkitNow();
				} else {
					if (Date.now) {
						return Date.now();
					} else {
						return new Date().getTime();
					}
				}
			}
		},

		/* -------------------- */

		/* stops a tween */
		_stopTween = function _stopTween() {
			var el = this;
			if (!el._mTween) {
				el._mTween = { top: {}, left: {} };
			}
			var props = ["top", "left"];
			for (var i = 0; i < props.length; i++) {
				var prop = props[i];
				if (el._mTween[prop].id) {
					if (!window.requestAnimationFrame) {
						clearTimeout(el._mTween[prop].id);
					} else {
						window.cancelAnimationFrame(el._mTween[prop].id);
					}
					el._mTween[prop].id = null;
					el._mTween[prop].stop = 1;
				}
			}
		},

		/* -------------------- */

		/* deletes a property (avoiding the exception thrown by IE) */
		_delete = function _delete(c, m) {
			try {
				delete c[m];
			} catch (e) {
				c[m] = null;
			}
		},

		/* -------------------- */

		/* detects left mouse button */
		_mouseBtnLeft = function _mouseBtnLeft(e) {
			return !(e.which && e.which !== 1);
		},

		/* -------------------- */

		/* detects if pointer type event is touch */
		_pointerTouch = function _pointerTouch(e) {
			var t = e.originalEvent.pointerType;
			return !(t && t !== "touch" && t !== 2);
		},

		/* -------------------- */

		/* checks if value is numeric */
		_isNumeric = function _isNumeric(val) {
			return !isNaN(parseFloat(val)) && isFinite(val);
		},

		/* -------------------- */

		/* returns element position according to content */
		_childPos = function _childPos(el) {
			var p = el.parents(".mCSB_container");
			return [el.offset().top - p.offset().top, el.offset().left - p.offset().left];
		},

		/* -------------------- */

		/* checks if browser tab is hidden/inactive via Page Visibility API */
		_isTabHidden = function _isTabHidden() {
			var prop = _getHiddenProp();
			if (!prop) return false;
			return document[prop];
			function _getHiddenProp() {
				var pfx = ["webkit", "moz", "ms", "o"];
				if ("hidden" in document) return "hidden"; //natively supported
				for (var i = 0; i < pfx.length; i++) {
					//prefixed
					if (pfx[i] + "Hidden" in document) return pfx[i] + "Hidden";
				}
				return null; //not supported
			}
		};
		/* -------------------- */

		/* 
  ----------------------------------------
  PLUGIN SETUP 
  ----------------------------------------
  */

		/* plugin constructor functions */
		$.fn[pluginNS] = function (method) {
			/* usage: $(selector).mCustomScrollbar(); */
			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if ((typeof method === "undefined" ? "undefined" : _typeof(method)) === "object" || !method) {
				return methods.init.apply(this, arguments);
			} else {
				$.error("Method " + method + " does not exist");
			}
		};
		$[pluginNS] = function (method) {
			/* usage: $.mCustomScrollbar(); */
			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if ((typeof method === "undefined" ? "undefined" : _typeof(method)) === "object" || !method) {
				return methods.init.apply(this, arguments);
			} else {
				$.error("Method " + method + " does not exist");
			}
		};

		/* 
  allow setting plugin default options. 
  usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
  to apply any changed default options on default selectors (below), use inside document ready fn 
  e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
  */
		$[pluginNS].defaults = defaults;

		/* 
  add window object (window.mCustomScrollbar) 
  usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
  */
		window[pluginNS] = true;

		$(window).bind("load", function () {

			$(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */

			/* extend jQuery expressions */
			$.extend($.expr[":"], {
				/* checks if element is within scrollable viewport */
				mcsInView: $.expr[":"].mcsInView || function (el) {
					var $el = $(el),
					    content = $el.parents(".mCSB_container"),
					    wrapper,
					    cPos;
					if (!content.length) {
						return;
					}
					wrapper = content.parent();
					cPos = [content[0].offsetTop, content[0].offsetLeft];
					return cPos[0] + _childPos($el)[0] >= 0 && cPos[0] + _childPos($el)[0] < wrapper.height() - $el.outerHeight(false) && cPos[1] + _childPos($el)[1] >= 0 && cPos[1] + _childPos($el)[1] < wrapper.width() - $el.outerWidth(false);
				},
				/* checks if element or part of element is in view of scrollable viewport */
				mcsInSight: $.expr[":"].mcsInSight || function (el, i, m) {
					var $el = $(el),
					    elD,
					    content = $el.parents(".mCSB_container"),
					    wrapperView,
					    pos,
					    wrapperViewPct,
					    pctVals = m[3] === "exact" ? [[1, 0], [1, 0]] : [[0.9, 0.1], [0.6, 0.4]];
					if (!content.length) {
						return;
					}
					elD = [$el.outerHeight(false), $el.outerWidth(false)];
					pos = [content[0].offsetTop + _childPos($el)[0], content[0].offsetLeft + _childPos($el)[1]];
					wrapperView = [content.parent()[0].offsetHeight, content.parent()[0].offsetWidth];
					wrapperViewPct = [elD[0] < wrapperView[0] ? pctVals[0] : pctVals[1], elD[1] < wrapperView[1] ? pctVals[0] : pctVals[1]];
					return pos[0] - wrapperView[0] * wrapperViewPct[0][0] < 0 && pos[0] + elD[0] - wrapperView[0] * wrapperViewPct[0][1] >= 0 && pos[1] - wrapperView[1] * wrapperViewPct[1][0] < 0 && pos[1] + elD[1] - wrapperView[1] * wrapperViewPct[1][1] >= 0;
				},
				/* checks if element is overflowed having visible scrollbar(s) */
				mcsOverflow: $.expr[":"].mcsOverflow || function (el) {
					var d = $(el).data(pluginPfx);
					if (!d) {
						return;
					}
					return d.overflowed[0] || d.overflowed[1];
				}
			});
		});
	});
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5tQ3VzdG9tU2Nyb2xsYmFyLmpzIl0sIm5hbWVzIjpbImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGUiLCJleHBvcnRzIiwialF1ZXJ5Iiwid2luZG93IiwiZG9jdW1lbnQiLCIkIiwiaW5pdCIsIl9yanMiLCJfbmpzIiwiX2RscCIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJfdXJsIiwicmVxdWlyZSIsImV2ZW50Iiwic3BlY2lhbCIsIm1vdXNld2hlZWwiLCJhcHBlbmQiLCJkZWNvZGVVUkkiLCJwbHVnaW5OUyIsInBsdWdpblBmeCIsImRlZmF1bHRTZWxlY3RvciIsImRlZmF1bHRzIiwic2V0VG9wIiwic2V0TGVmdCIsImF4aXMiLCJzY3JvbGxiYXJQb3NpdGlvbiIsInNjcm9sbEluZXJ0aWEiLCJhdXRvRHJhZ2dlckxlbmd0aCIsImFsd2F5c1Nob3dTY3JvbGxiYXIiLCJzbmFwT2Zmc2V0IiwibW91c2VXaGVlbCIsImVuYWJsZSIsInNjcm9sbEFtb3VudCIsImRlbHRhRmFjdG9yIiwiZGlzYWJsZU92ZXIiLCJzY3JvbGxCdXR0b25zIiwic2Nyb2xsVHlwZSIsImtleWJvYXJkIiwiY29udGVudFRvdWNoU2Nyb2xsIiwiZG9jdW1lbnRUb3VjaFNjcm9sbCIsImFkdmFuY2VkIiwiYXV0b1Njcm9sbE9uRm9jdXMiLCJ1cGRhdGVPbkNvbnRlbnRSZXNpemUiLCJ1cGRhdGVPbkltYWdlTG9hZCIsImF1dG9VcGRhdGVUaW1lb3V0IiwidGhlbWUiLCJjYWxsYmFja3MiLCJvblRvdGFsU2Nyb2xsT2Zmc2V0Iiwib25Ub3RhbFNjcm9sbEJhY2tPZmZzZXQiLCJhbHdheXNUcmlnZ2VyT2Zmc2V0cyIsInRvdGFsSW5zdGFuY2VzIiwibGl2ZVRpbWVycyIsIm9sZElFIiwiYXR0YWNoRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwidG91Y2hBY3RpdmUiLCJ0b3VjaGFibGUiLCJjbGFzc2VzIiwibWV0aG9kcyIsIm9wdGlvbnMiLCJleHRlbmQiLCJzZWxlY3RvciIsIl9zZWxlY3RvciIsImNhbGwiLCJsaXZlIiwibGl2ZVNlbGVjdG9yIiwiJGxpdmVTZWxlY3RvciIsInJlbW92ZUxpdmVUaW1lcnMiLCJzZXRUaW1lb3V0IiwibUN1c3RvbVNjcm9sbGJhciIsImxlbmd0aCIsInNldFdpZHRoIiwic2V0X3dpZHRoIiwic2V0SGVpZ2h0Iiwic2V0X2hlaWdodCIsImhvcml6b250YWxTY3JvbGwiLCJfZmluZEF4aXMiLCJwcmV2ZW50RGVmYXVsdCIsIm5vcm1hbGl6ZURlbHRhIiwiaW52ZXJ0IiwibW91c2VXaGVlbFBpeGVscyIsIm5vcm1hbGl6ZU1vdXNlV2hlZWxEZWx0YSIsIl9maW5kU2Nyb2xsQnV0dG9uc1R5cGUiLCJfdGhlbWUiLCJlYWNoIiwiJHRoaXMiLCJkYXRhIiwiaWR4Iiwib3B0Iiwic2Nyb2xsUmF0aW8iLCJ5IiwieCIsIm92ZXJmbG93ZWQiLCJjb250ZW50UmVzZXQiLCJiaW5kRXZlbnRzIiwidHdlZW5SdW5uaW5nIiwic2VxdWVudGlhbCIsImxhbmdEaXIiLCJjc3MiLCJjYk9mZnNldHMiLCJ0cmlnZ2VyIiwicG9sbCIsInNpemUiLCJvIiwibiIsImltZyIsImNoYW5nZSIsImQiLCJodG1sRGF0YUF4aXMiLCJodG1sRGF0YVNiUG9zIiwiaHRtbERhdGFUaGVtZSIsIl9wbHVnaW5NYXJrdXAiLCJvbkNyZWF0ZSIsImFkZENsYXNzIiwidXBkYXRlIiwiZWwiLCJjYiIsIm1DU0JfY29udGFpbmVyIiwibUN1c3RvbVNjcm9sbEJveCIsIm1DU0JfZHJhZ2dlciIsIl9zdG9wIiwib25CZWZvcmVVcGRhdGUiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGVpZ2h0IiwiX2V4cGFuZENvbnRlbnRIb3Jpem9udGFsbHkiLCJhdXRvRXhwYW5kSG9yaXpvbnRhbFNjcm9sbCIsIl9jb250ZW50V2lkdGgiLCJfb3ZlcmZsb3dlZCIsIl9zY3JvbGxiYXJWaXNpYmlsaXR5IiwiX3NldERyYWdnZXJMZW5ndGgiLCJfc2Nyb2xsUmF0aW8iLCJfYmluZEV2ZW50cyIsInRvIiwiTWF0aCIsImFicyIsIm9mZnNldFRvcCIsIm9mZnNldExlZnQiLCJfcmVzZXRDb250ZW50UG9zaXRpb24iLCJfdW5iaW5kRXZlbnRzIiwiX3Njcm9sbFRvIiwidG9TdHJpbmciLCJkaXIiLCJkdXIiLCJvdmVyd3JpdGUiLCJwYXJlbnQiLCJ3aWR0aCIsIm9uSW1hZ2VMb2FkIiwib25TZWxlY3RvckNoYW5nZSIsIm9uVXBkYXRlIiwiX2F1dG9VcGRhdGUiLCJzY3JvbGxUbyIsInZhbCIsIm1ldGhvZERlZmF1bHRzIiwic2Nyb2xsRWFzaW5nIiwibW92ZURyYWdnZXIiLCJ0aW1lb3V0Iiwib25TdGFydCIsIm9uQ29tcGxldGUiLCJtZXRob2RPcHRpb25zIiwiX2FyciIsIl90byIsIl9pc1RhYkhpZGRlbiIsInN0b3AiLCJkaXNhYmxlIiwiciIsImRlc3Ryb3kiLCJzY3JvbGxiYXIiLCJyZW1vdmVEYXRhIiwiX2RlbGV0ZSIsInJlbW92ZSIsImZpbmQiLCJyZXBsYWNlV2l0aCIsImNvbnRlbnRzIiwib2JqIiwiZml4ZWRTaXplU2Nyb2xsYmFyVGhlbWVzIiwibm9uRXhwYW5kZWRTY3JvbGxiYXJUaGVtZXMiLCJkaXNhYmxlZFNjcm9sbEJ1dHRvbnNUaGVtZXMiLCJlbmFibGVkQXV0b0hpZGVTY3JvbGxiYXJUaGVtZXMiLCJzY3JvbGxiYXJQb3NpdGlvbk91dHNpZGVUaGVtZXMiLCJpbkFycmF5IiwiYXV0b0V4cGFuZFNjcm9sbGJhciIsImF1dG9IaWRlU2Nyb2xsYmFyIiwiY2xlYXJUaW1lb3V0IiwiZXhwYW5kQ2xhc3MiLCJ3cmFwcGVyQ2xhc3MiLCJzY3JvbGxiYXJzIiwiY29udGVudFdyYXBwZXIiLCJhdXRvSGlkZUNsYXNzIiwic2Nyb2xsYmFyRGlyQ2xhc3MiLCJ3cmFwSW5uZXIiLCJhZnRlciIsIndyYXAiLCJfc2Nyb2xsQnV0dG9ucyIsInNjcm9sbFdpZHRoIiwibWF4IiwiYXBwbHkiLCJjaGlsZHJlbiIsIm1hcCIsIm91dGVyV2lkdGgiLCJnZXQiLCJ3IiwiY2VpbCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJpZ2h0IiwiZmxvb3IiLCJsZWZ0IiwidW53cmFwIiwibUNTQl9zY3JvbGxUb29scyIsInRhYmluZGV4IiwiX2lzTnVtZXJpYyIsImJ0bkhUTUwiLCJidG4iLCJwcmVwZW5kIiwibmV4dCIsInJhdGlvIiwib3V0ZXJIZWlnaHQiLCJsIiwicGFyc2VJbnQiLCJyb3VuZCIsImgiLCJfb25EcmFnQ2xhc3NlcyIsImFjdGlvbiIsInhwbmQiLCJjbG9zZXN0IiwidG9nZ2xlQ2xhc3MiLCJfZHJhZ2dhYmxlIiwiY29udGVudEhlaWdodCIsImNvbnRlbnRXaWR0aCIsInNjcm9sbEhlaWdodCIsImFkZCIsImN4IiwiZHgiLCJfY29udGVudERyYWdnYWJsZSIsIl9zZWxlY3RhYmxlIiwiX213dCIsIm1vdXNld2hlZWxUaW1lb3V0IiwiX21vdXNld2hlZWwiLCJfZHJhZ2dlclJhaWwiLCJfd3JhcHBlclNjcm9sbCIsIl9mb2N1cyIsIl9idXR0b25zIiwiX2tleWJvYXJkIiwibmFtZXNwYWNlIiwic2IiLCJzZWwiLCJyZWxlYXNlRHJhZ2dhYmxlU2VsZWN0b3JzIiwiZXh0cmFEcmFnZ2FibGVTZWxlY3RvcnMiLCJfY2FuQWNjZXNzSUZyYW1lIiwidG9wIiwidW5iaW5kIiwiX2ZvY3VzVGltZW91dCIsInN0ZXAiLCJvbkNvbXBsZXRlVGltZW91dCIsImRpc2FibGVkIiwiY29udGVudCIsIl9jb29yZGluYXRlcyIsImUiLCJ0IiwidHlwZSIsInRhcmdldCIsIm93bmVyRG9jdW1lbnQiLCJmcmFtZUVsZW1lbnQiLCJvZmZzZXQiLCJpbyIsInZpZXciLCJvcmlnaW5hbEV2ZW50IiwicGFnZVkiLCJwYWdlWCIsInRvdWNoIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwic2NyZWVuWSIsInNjcmVlblgiLCJkcmFnZ2VySWQiLCJkcmFnZ2FibGUiLCJkcmFnWSIsImRyYWdYIiwicmRzIiwiZWRzIiwiYmluZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsIl9tb3VzZUJ0bkxlZnQiLCJvbnNlbGVjdHN0YXJ0IiwiX2lmcmFtZSIsIl9kcmFnIiwiaWRsZVRpbWVyIiwiYXR0ciIsImRyYWciLCJ0b3VjaFN0YXJ0WSIsInRvdWNoU3RhcnRYIiwidG91Y2hNb3ZlWSIsInRvdWNoTW92ZVgiLCJzdGFydFRpbWUiLCJydW5uaW5nVGltZSIsImVuZFRpbWUiLCJkaXN0YW5jZSIsInNwZWVkIiwiYW1vdW50IiwiZHVyQSIsImR1ckIiLCJ0b3VjaEludGVudCIsInRvdWNoRHJhZyIsImRvY0RyYWciLCJpZnJhbWUiLCJldmVudHMiLCJ0b3VjaEFjdGlvbiIsImJvZHkiLCJzdHlsZSIsInVuZGVmaW5lZCIsIl9vblRvdWNoc3RhcnQiLCJfb25Ub3VjaG1vdmUiLCJfb25Ub3VjaHN0YXJ0MiIsIl9vblRvdWNoZW5kIiwiY29udGVudERvY3VtZW50IiwiY29udGVudFdpbmRvdyIsIl9wb2ludGVyVG91Y2giLCJfZ2V0VGltZSIsImVhc2luZyIsInB1c2giLCJsaW1pdCIsInByZXZlbnQiLCJsaW1pdFgiLCJwcmV2ZW50WCIsInNsb3ciLCJkaWZmIiwiYWJzRGlzdGFuY2UiLCJhIiwiX20iLCJtZCIsImRzIiwicyIsInNlcSIsIndyYXBwZXIiLCJfc2VsIiwiX3NlcSIsImdldFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwidGV4dCIsImMiLCJfc2VxdWVudGlhbFNjcm9sbCIsImRlbHRhIiwiX29uTW91c2V3aGVlbCIsIl9kaXNhYmxlTW91c2V3aGVlbCIsInB4IiwiY29udGVudFBvcyIsImRyYWdnZXJQb3MiLCJkbHQiLCJkZWx0YVkiLCJkZWx0YVgiLCJ3ZWJraXREaXJlY3Rpb25JbnZlcnRlZEZyb21EZXZpY2UiLCJfY2FuQWNjZXNzSUZyYW1lQ2FjaGUiLCJPYmplY3QiLCJyZXN1bHQiLCJjYWNoZUtleSIsImh0bWwiLCJkb2MiLCJpbm5lckhUTUwiLCJlcnIiLCJldnQiLCJ0YWciLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwidGFncyIsImZvY3VzVGFncyIsImlzIiwibUNTQl9kcmFnZ2VyQ29udGFpbmVyIiwiY2xpY2thYmxlIiwiY2xpY2tEaXIiLCJhY3RpdmVFbGVtZW50IiwibmVzdGVkIiwiX2ZvY3VzVGltZXIiLCJfY2hpbGRQb3MiLCJpc1Zpc2libGUiLCJzY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwiYnRuQ2xhc3MiLCJlZGl0YWJsZXMiLCJfb25LZXlib2FyZCIsImNvZGUiLCJrZXlDb2RlIiwid2hpY2giLCJrZXlib2FyZERpciIsIm9uY2UiLCJzdGVwbGVzc1NwZWVkIiwic3RlcHBlZFNwZWVkIiwiX29uIiwiX29mZiIsInNuYXBBbW91bnQiLCJBcnJheSIsIm0iLCJ2YWxzIiwiY29udGVudExlbmd0aCIsImNzc1Byb3AiLCJqcXVlcnkiLCJpbmRleE9mIiwic3BsaXQiLCJwIiwicmVtIiwiYXV0b1VwZGF0ZSIsInVwZCIsInBhcmVudHMiLCJ1cGRhdGVPblNlbGVjdG9yQ2hhbmdlIiwic2l6ZXNTdW0iLCJkb1VwZCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwiaW1nTG9hZGVyIiwiSW1hZ2UiLCJjcmVhdGVEZWxlZ2F0ZSIsImNvbnRleHRPYmplY3QiLCJkZWxlZ2F0ZU1ldGhvZCIsImFyZ3VtZW50cyIsImltZ09uTG9hZCIsIm9ubG9hZCIsInNyYyIsInRvdGFsIiwiX3NuYXBBbW91bnQiLCJfc3RvcFR3ZWVuIiwidG90YWxTY3JvbGxPZmZzZXRzIiwidG90YWxTY3JvbGxCYWNrT2Zmc2V0cyIsIl9jYiIsIm9uT3ZlcmZsb3dZTm9uZSIsIm9uT3ZlcmZsb3dYTm9uZSIsIm1jcyIsIm9uT3ZlcmZsb3dZIiwib25PdmVyZmxvd1giLCJwcm9wZXJ0eSIsInRzbyIsInRzYm8iLCJ0b3RhbFNjcm9sbE9mZnNldCIsInRvdGFsU2Nyb2xsQmFja09mZnNldCIsIl9tY3MiLCJvbkluaXQiLCJfdHdlZW5UbyIsIm9uU2Nyb2xsU3RhcnQiLCJfY2JPZmZzZXRzIiwid2hpbGVTY3JvbGxpbmciLCJvblNjcm9sbCIsIm9uVG90YWxTY3JvbGwiLCJvblRvdGFsU2Nyb2xsQmFjayIsImNwIiwiZHAiLCJjbCIsInBsIiwiZHJhZ2dlclRvcCIsImRyYWdnZXJMZWZ0IiwidG9wUGN0IiwibGVmdFBjdCIsImRpcmVjdGlvbiIsInByb3AiLCJkdXJhdGlvbiIsIl9tVHdlZW4iLCJfZGVsYXkiLCJwcm9ncmVzcyIsImZyb20iLCJlbFN0eWxlIiwiX3JlcXVlc3QiLCJ0b2JqIiwiX2NhbmNlbFR3ZWVuIiwiX3N0YXJ0VHdlZW4iLCJfc3RlcCIsIl90d2VlbiIsInRpbWUiLCJpZCIsImN1cnJWYWwiLCJfZWFzZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImIiLCJzcXJ0IiwicG93IiwidHMiLCJ0YyIsInBlcmZvcm1hbmNlIiwibm93Iiwid2Via2l0Tm93IiwiRGF0ZSIsImdldFRpbWUiLCJwcm9wcyIsImkiLCJwb2ludGVyVHlwZSIsImlzTmFOIiwicGFyc2VGbG9hdCIsImlzRmluaXRlIiwiX2dldEhpZGRlblByb3AiLCJwZngiLCJmbiIsIm1ldGhvZCIsInByb3RvdHlwZSIsInNsaWNlIiwiZXJyb3IiLCJleHByIiwibWNzSW5WaWV3IiwiJGVsIiwiY1BvcyIsIm1jc0luU2lnaHQiLCJlbEQiLCJ3cmFwcGVyVmlldyIsInBvcyIsIndyYXBwZXJWaWV3UGN0IiwicGN0VmFscyIsIm1jc092ZXJmbG93Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOzs7Ozs7O0FBT0MsV0FBU0EsT0FBVCxFQUFpQjtBQUNqQixLQUFHLE9BQU9DLE1BQVAsS0FBZ0IsVUFBaEIsSUFBOEJBLE9BQU9DLEdBQXhDLEVBQTRDO0FBQzNDRCxTQUFPLENBQUMsUUFBRCxDQUFQLEVBQWtCRCxPQUFsQjtBQUNBLEVBRkQsTUFFTSxJQUFHLE9BQU9HLE1BQVAsS0FBZ0IsV0FBaEIsSUFBK0JBLE9BQU9DLE9BQXpDLEVBQWlEO0FBQ3RERCxTQUFPQyxPQUFQLEdBQWVKLE9BQWY7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QUF3QkcsUUFBUSxDQUFSLENBQXhCLEdBQXFDQSxRQUFRLENBQVIsQ0FBdEYsQ0FBZjtBQUNBLFlBQVFGLElBQUksQ0FBSixJQUFRRCxZQUFZLENBQVosSUFBZUUsZUFBZSxDQUFmLEVBQWtCLENBQWxCLENBQXZCLEdBQTZDLENBQTdDLElBQWtERCxJQUFJLENBQUosSUFBT0YsSUFBSSxDQUFKLENBQVAsR0FBZUMsWUFBWSxDQUFaLElBQWVFLGVBQWUsQ0FBZixFQUFrQixDQUFsQixDQUE5QixJQUFxRCxDQUF2RyxJQUNORCxJQUFJLENBQUosSUFBUUQsWUFBWSxDQUFaLElBQWVFLGVBQWUsQ0FBZixFQUFrQixDQUFsQixDQUF2QixHQUE2QyxDQUR2QyxJQUM0Q0QsSUFBSSxDQUFKLElBQU9GLElBQUksQ0FBSixDQUFQLEdBQWVDLFlBQVksQ0FBWixJQUFlRSxlQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBOUIsSUFBcUQsQ0FEekc7QUFFQSxLQXJCbUI7QUFzQnBCO0FBQ0FFLGlCQUFZcGYsRUFBRTBlLElBQUYsQ0FBTyxHQUFQLEVBQVlVLFdBQVosSUFBMkIsVUFBU3JZLEVBQVQsRUFBWTtBQUNsRCxTQUFJUixJQUFFdkcsRUFBRStHLEVBQUYsRUFBTTdCLElBQU4sQ0FBV25FLFNBQVgsQ0FBTjtBQUNBLFNBQUcsQ0FBQ3dGLENBQUosRUFBTTtBQUFDO0FBQVE7QUFDZixZQUFPQSxFQUFFZixVQUFGLENBQWEsQ0FBYixLQUFtQmUsRUFBRWYsVUFBRixDQUFhLENBQWIsQ0FBMUI7QUFDQTtBQTNCbUIsSUFBckI7QUE4QkEsR0FuQ0Q7QUFxQ0EsRUExMkVBLENBQUQ7QUEwMkVJLENBbjNFSCxDQUFEIiwiZmlsZSI6ImpxdWVyeS5tQ3VzdG9tU2Nyb2xsYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbj09IG1hbGlodSBqcXVlcnkgY3VzdG9tIHNjcm9sbGJhciBwbHVnaW4gPT0gXG5WZXJzaW9uOiAzLjEuNSBcblBsdWdpbiBVUkk6IGh0dHA6Ly9tYW5vcy5tYWxpaHUuZ3IvanF1ZXJ5LWN1c3RvbS1jb250ZW50LXNjcm9sbGVyIFxuQXV0aG9yOiBtYWxpaHVcbkF1dGhvciBVUkk6IGh0dHA6Ly9tYW5vcy5tYWxpaHUuZ3JcbkxpY2Vuc2U6IE1JVCBMaWNlbnNlIChNSVQpXG4qL1xuXG4vKlxuQ29weXJpZ2h0IE1hbm9zIE1hbGlodXRzYWtpcyAoZW1haWw6IG1hbm9zQG1hbGlodS5ncilcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuLypcblRoZSBjb2RlIGJlbG93IGlzIGZhaXJseSBsb25nLCBmdWxseSBjb21tZW50ZWQgYW5kIHNob3VsZCBiZSBub3JtYWxseSB1c2VkIGluIGRldmVsb3BtZW50LiBcbkZvciBwcm9kdWN0aW9uLCB1c2UgZWl0aGVyIHRoZSBtaW5pZmllZCBqcXVlcnkubUN1c3RvbVNjcm9sbGJhci5taW4uanMgc2NyaXB0IG9yIFxudGhlIHByb2R1Y3Rpb24tcmVhZHkganF1ZXJ5Lm1DdXN0b21TY3JvbGxiYXIuY29uY2F0Lm1pbi5qcyB3aGljaCBjb250YWlucyB0aGUgcGx1Z2luIFxuYW5kIGRlcGVuZGVuY2llcyAobWluaWZpZWQpLiBcbiovXG5cbihmdW5jdGlvbihmYWN0b3J5KXtcblx0aWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKXtcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLGZhY3RvcnkpO1xuXHR9ZWxzZSBpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyl7XG5cdFx0bW9kdWxlLmV4cG9ydHM9ZmFjdG9yeTtcblx0fWVsc2V7XG5cdFx0ZmFjdG9yeShqUXVlcnksd2luZG93LGRvY3VtZW50KTtcblx0fVxufShmdW5jdGlvbigkKXtcbihmdW5jdGlvbihpbml0KXtcblx0dmFyIF9yanM9dHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kLCAvKiBSZXF1aXJlSlMgKi9cblx0XHRfbmpzPXR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMsIC8qIE5vZGVKUyAqL1xuXHRcdF9kbHA9KFwiaHR0cHM6XCI9PWRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sKSA/IFwiaHR0cHM6XCIgOiBcImh0dHA6XCIsIC8qIGxvY2F0aW9uIHByb3RvY29sICovXG5cdFx0X3VybD1cImNkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9qcXVlcnktbW91c2V3aGVlbC8zLjEuMTMvanF1ZXJ5Lm1vdXNld2hlZWwubWluLmpzXCI7XG5cdGlmKCFfcmpzKXtcblx0XHRpZihfbmpzKXtcblx0XHRcdHJlcXVpcmUoXCJqcXVlcnktbW91c2V3aGVlbFwiKSgkKTtcblx0XHR9ZWxzZXtcblx0XHRcdC8qIGxvYWQganF1ZXJ5LW1vdXNld2hlZWwgcGx1Z2luICh2aWEgQ0ROKSBpZiBpdCdzIG5vdCBwcmVzZW50IG9yIG5vdCBsb2FkZWQgdmlhIFJlcXVpcmVKUyBcblx0XHRcdCh3b3JrcyB3aGVuIG1DdXN0b21TY3JvbGxiYXIgZm4gaXMgY2FsbGVkIG9uIHdpbmRvdyBsb2FkKSAqL1xuXHRcdFx0JC5ldmVudC5zcGVjaWFsLm1vdXNld2hlZWwgfHwgJChcImhlYWRcIikuYXBwZW5kKGRlY29kZVVSSShcIiUzQ3NjcmlwdCBzcmM9XCIrX2RscCtcIi8vXCIrX3VybCtcIiUzRSUzQy9zY3JpcHQlM0VcIikpO1xuXHRcdH1cblx0fVxuXHRpbml0KCk7XG59KGZ1bmN0aW9uKCl7XG5cdFxuXHQvKiBcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRQTFVHSU4gTkFNRVNQQUNFLCBQUkVGSVgsIERFRkFVTFQgU0VMRUNUT1IoUykgXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ki9cblx0XG5cdHZhciBwbHVnaW5OUz1cIm1DdXN0b21TY3JvbGxiYXJcIixcblx0XHRwbHVnaW5QZng9XCJtQ1NcIixcblx0XHRkZWZhdWx0U2VsZWN0b3I9XCIubUN1c3RvbVNjcm9sbGJhclwiLFxuXHRcblx0XG5cdFx0XG5cdFxuXHRcblx0LyogXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0REVGQVVMVCBPUFRJT05TIFxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCovXG5cdFxuXHRcdGRlZmF1bHRzPXtcblx0XHRcdC8qXG5cdFx0XHRzZXQgZWxlbWVudC9jb250ZW50IHdpZHRoL2hlaWdodCBwcm9ncmFtbWF0aWNhbGx5IFxuXHRcdFx0dmFsdWVzOiBib29sZWFuLCBwaXhlbHMsIHBlcmNlbnRhZ2UgXG5cdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0XHRzZXRXaWR0aFx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHRzZXRIZWlnaHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdCovXG5cdFx0XHQvKlxuXHRcdFx0c2V0IHRoZSBpbml0aWFsIGNzcyB0b3AgcHJvcGVydHkgb2YgY29udGVudCAgXG5cdFx0XHR2YWx1ZXM6IHN0cmluZyAoZS5nLiBcIi0xMDBweFwiLCBcIjEwJVwiIGV0Yy4pXG5cdFx0XHQqL1xuXHRcdFx0c2V0VG9wOjAsXG5cdFx0XHQvKlxuXHRcdFx0c2V0IHRoZSBpbml0aWFsIGNzcyBsZWZ0IHByb3BlcnR5IG9mIGNvbnRlbnQgIFxuXHRcdFx0dmFsdWVzOiBzdHJpbmcgKGUuZy4gXCItMTAwcHhcIiwgXCIxMCVcIiBldGMuKVxuXHRcdFx0Ki9cblx0XHRcdHNldExlZnQ6MCxcblx0XHRcdC8qIFxuXHRcdFx0c2Nyb2xsYmFyIGF4aXMgKHZlcnRpY2FsIGFuZC9vciBob3Jpem9udGFsIHNjcm9sbGJhcnMpIFxuXHRcdFx0dmFsdWVzIChzdHJpbmcpOiBcInlcIiwgXCJ4XCIsIFwieXhcIlxuXHRcdFx0Ki9cblx0XHRcdGF4aXM6XCJ5XCIsXG5cdFx0XHQvKlxuXHRcdFx0cG9zaXRpb24gb2Ygc2Nyb2xsYmFyIHJlbGF0aXZlIHRvIGNvbnRlbnQgIFxuXHRcdFx0dmFsdWVzIChzdHJpbmcpOiBcImluc2lkZVwiLCBcIm91dHNpZGVcIiAoXCJvdXRzaWRlXCIgcmVxdWlyZXMgZWxlbWVudHMgd2l0aCBwb3NpdGlvbjpyZWxhdGl2ZSlcblx0XHRcdCovXG5cdFx0XHRzY3JvbGxiYXJQb3NpdGlvbjpcImluc2lkZVwiLFxuXHRcdFx0Lypcblx0XHRcdHNjcm9sbGluZyBpbmVydGlhXG5cdFx0XHR2YWx1ZXM6IGludGVnZXIgKG1pbGxpc2Vjb25kcylcblx0XHRcdCovXG5cdFx0XHRzY3JvbGxJbmVydGlhOjk1MCxcblx0XHRcdC8qIFxuXHRcdFx0YXV0by1hZGp1c3Qgc2Nyb2xsYmFyIGRyYWdnZXIgbGVuZ3RoXG5cdFx0XHR2YWx1ZXM6IGJvb2xlYW5cblx0XHRcdCovXG5cdFx0XHRhdXRvRHJhZ2dlckxlbmd0aDp0cnVlLFxuXHRcdFx0Lypcblx0XHRcdGF1dG8taGlkZSBzY3JvbGxiYXIgd2hlbiBpZGxlIFxuXHRcdFx0dmFsdWVzOiBib29sZWFuXG5cdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0XHRhdXRvSGlkZVNjcm9sbGJhclx0XHRcdGZhbHNlXG5cdFx0XHQqL1xuXHRcdFx0Lypcblx0XHRcdGF1dG8tZXhwYW5kcyBzY3JvbGxiYXIgb24gbW91c2Utb3ZlciBhbmQgZHJhZ2dpbmdcblx0XHRcdHZhbHVlczogYm9vbGVhblxuXHRcdFx0XHRvcHRpb25cdFx0XHRcdFx0XHRkZWZhdWx0XG5cdFx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0YXV0b0V4cGFuZFNjcm9sbGJhclx0XHRcdGZhbHNlXG5cdFx0XHQqL1xuXHRcdFx0Lypcblx0XHRcdGFsd2F5cyBzaG93IHNjcm9sbGJhciwgZXZlbiB3aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBzY3JvbGwgXG5cdFx0XHR2YWx1ZXM6IGludGVnZXIgKDA9ZGlzYWJsZSwgMT1hbHdheXMgc2hvdyBkcmFnZ2VyIHJhaWwgYW5kIGJ1dHRvbnMsIDI9YWx3YXlzIHNob3cgZHJhZ2dlciByYWlsLCBkcmFnZ2VyIGFuZCBidXR0b25zKSwgYm9vbGVhblxuXHRcdFx0Ki9cblx0XHRcdGFsd2F5c1Nob3dTY3JvbGxiYXI6MCxcblx0XHRcdC8qXG5cdFx0XHRzY3JvbGxpbmcgYWx3YXlzIHNuYXBzIHRvIGEgbXVsdGlwbGUgb2YgdGhpcyBudW1iZXIgaW4gcGl4ZWxzXG5cdFx0XHR2YWx1ZXM6IGludGVnZXIsIGFycmF5IChbeSx4XSlcblx0XHRcdFx0b3B0aW9uXHRcdFx0XHRcdFx0ZGVmYXVsdFxuXHRcdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdHNuYXBBbW91bnRcdFx0XHRcdFx0bnVsbFxuXHRcdFx0Ki9cblx0XHRcdC8qXG5cdFx0XHR3aGVuIHNuYXBwaW5nLCBzbmFwIHdpdGggdGhpcyBudW1iZXIgaW4gcGl4ZWxzIGFzIGFuIG9mZnNldCBcblx0XHRcdHZhbHVlczogaW50ZWdlclxuXHRcdFx0Ki9cblx0XHRcdHNuYXBPZmZzZXQ6MCxcblx0XHRcdC8qIFxuXHRcdFx0bW91c2Utd2hlZWwgc2Nyb2xsaW5nXG5cdFx0XHQqL1xuXHRcdFx0bW91c2VXaGVlbDp7XG5cdFx0XHRcdC8qIFxuXHRcdFx0XHRlbmFibGUgbW91c2Utd2hlZWwgc2Nyb2xsaW5nXG5cdFx0XHRcdHZhbHVlczogYm9vbGVhblxuXHRcdFx0XHQqL1xuXHRcdFx0XHRlbmFibGU6dHJ1ZSxcblx0XHRcdFx0LyogXG5cdFx0XHRcdHNjcm9sbGluZyBhbW91bnQgaW4gcGl4ZWxzXG5cdFx0XHRcdHZhbHVlczogXCJhdXRvXCIsIGludGVnZXIgXG5cdFx0XHRcdCovXG5cdFx0XHRcdHNjcm9sbEFtb3VudDpcImF1dG9cIixcblx0XHRcdFx0LyogXG5cdFx0XHRcdG1vdXNlLXdoZWVsIHNjcm9sbGluZyBheGlzIFxuXHRcdFx0XHR0aGUgZGVmYXVsdCBzY3JvbGxpbmcgZGlyZWN0aW9uIHdoZW4gYm90aCB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCBzY3JvbGxiYXJzIGFyZSBwcmVzZW50IFxuXHRcdFx0XHR2YWx1ZXMgKHN0cmluZyk6IFwieVwiLCBcInhcIiBcblx0XHRcdFx0Ki9cblx0XHRcdFx0YXhpczpcInlcIixcblx0XHRcdFx0LyogXG5cdFx0XHRcdHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIHdoaWNoIGF1dG9tYXRpY2FsbHkgc2Nyb2xscyB0aGUgcGFyZW50IGVsZW1lbnQocykgd2hlbiBlbmQgb2Ygc2Nyb2xsaW5nIGlzIHJlYWNoZWQgXG5cdFx0XHRcdHZhbHVlczogYm9vbGVhblxuXHRcdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdFx0cHJldmVudERlZmF1bHRcdFx0XHRcdG51bGxcblx0XHRcdFx0Ki9cblx0XHRcdFx0Lypcblx0XHRcdFx0dGhlIHJlcG9ydGVkIG1vdXNlLXdoZWVsIGRlbHRhIHZhbHVlLiBUaGUgbnVtYmVyIG9mIGxpbmVzICh0cmFuc2xhdGVkIHRvIHBpeGVscykgb25lIHdoZWVsIG5vdGNoIHNjcm9sbHMuICBcblx0XHRcdFx0dmFsdWVzOiBcImF1dG9cIiwgaW50ZWdlciBcblx0XHRcdFx0XCJhdXRvXCIgdXNlcyB0aGUgZGVmYXVsdCBPUy9icm93c2VyIHZhbHVlIFxuXHRcdFx0XHQqL1xuXHRcdFx0XHRkZWx0YUZhY3RvcjpcImF1dG9cIixcblx0XHRcdFx0Lypcblx0XHRcdFx0bm9ybWFsaXplIG1vdXNlLXdoZWVsIGRlbHRhIHRvIC0xIG9yIDEgKGRpc2FibGVzIG1vdXNlLXdoZWVsIGFjY2VsZXJhdGlvbikgXG5cdFx0XHRcdHZhbHVlczogYm9vbGVhblxuXHRcdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdFx0bm9ybWFsaXplRGVsdGFcdFx0XHRcdG51bGxcblx0XHRcdFx0Ki9cblx0XHRcdFx0Lypcblx0XHRcdFx0aW52ZXJ0IG1vdXNlLXdoZWVsIHNjcm9sbGluZyBkaXJlY3Rpb24gXG5cdFx0XHRcdHZhbHVlczogYm9vbGVhblxuXHRcdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdFx0aW52ZXJ0XHRcdFx0XHRcdFx0bnVsbFxuXHRcdFx0XHQqL1xuXHRcdFx0XHQvKlxuXHRcdFx0XHR0aGUgdGFncyB0aGF0IGRpc2FibGUgbW91c2Utd2hlZWwgd2hlbiBjdXJzb3IgaXMgb3ZlciB0aGVtXG5cdFx0XHRcdCovXG5cdFx0XHRcdGRpc2FibGVPdmVyOltcInNlbGVjdFwiLFwib3B0aW9uXCIsXCJrZXlnZW5cIixcImRhdGFsaXN0XCIsXCJ0ZXh0YXJlYVwiXVxuXHRcdFx0fSxcblx0XHRcdC8qIFxuXHRcdFx0c2Nyb2xsYmFyIGJ1dHRvbnNcblx0XHRcdCovXG5cdFx0XHRzY3JvbGxCdXR0b25zOnsgXG5cdFx0XHRcdC8qXG5cdFx0XHRcdGVuYWJsZSBzY3JvbGxiYXIgYnV0dG9uc1xuXHRcdFx0XHR2YWx1ZXM6IGJvb2xlYW5cblx0XHRcdFx0XHRvcHRpb25cdFx0XHRcdFx0XHRkZWZhdWx0XG5cdFx0XHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0XHRcdGVuYWJsZVx0XHRcdFx0XHRcdG51bGxcblx0XHRcdFx0Ki9cblx0XHRcdFx0Lypcblx0XHRcdFx0c2Nyb2xsYmFyIGJ1dHRvbnMgc2Nyb2xsaW5nIHR5cGUgXG5cdFx0XHRcdHZhbHVlcyAoc3RyaW5nKTogXCJzdGVwbGVzc1wiLCBcInN0ZXBwZWRcIlxuXHRcdFx0XHQqL1xuXHRcdFx0XHRzY3JvbGxUeXBlOlwic3RlcGxlc3NcIixcblx0XHRcdFx0Lypcblx0XHRcdFx0c2Nyb2xsaW5nIGFtb3VudCBpbiBwaXhlbHNcblx0XHRcdFx0dmFsdWVzOiBcImF1dG9cIiwgaW50ZWdlciBcblx0XHRcdFx0Ki9cblx0XHRcdFx0c2Nyb2xsQW1vdW50OlwiYXV0b1wiXG5cdFx0XHRcdC8qXG5cdFx0XHRcdHRhYmluZGV4IG9mIHRoZSBzY3JvbGxiYXIgYnV0dG9uc1xuXHRcdFx0XHR2YWx1ZXM6IGZhbHNlLCBpbnRlZ2VyXG5cdFx0XHRcdFx0b3B0aW9uXHRcdFx0XHRcdFx0ZGVmYXVsdFxuXHRcdFx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0XHR0YWJpbmRleFx0XHRcdFx0XHRudWxsXG5cdFx0XHRcdCovXG5cdFx0XHR9LFxuXHRcdFx0LyogXG5cdFx0XHRrZXlib2FyZCBzY3JvbGxpbmdcblx0XHRcdCovXG5cdFx0XHRrZXlib2FyZDp7IFxuXHRcdFx0XHQvKlxuXHRcdFx0XHRlbmFibGUgc2Nyb2xsaW5nIHZpYSBrZXlib2FyZFxuXHRcdFx0XHR2YWx1ZXM6IGJvb2xlYW5cblx0XHRcdFx0Ki9cblx0XHRcdFx0ZW5hYmxlOnRydWUsXG5cdFx0XHRcdC8qXG5cdFx0XHRcdGtleWJvYXJkIHNjcm9sbGluZyB0eXBlIFxuXHRcdFx0XHR2YWx1ZXMgKHN0cmluZyk6IFwic3RlcGxlc3NcIiwgXCJzdGVwcGVkXCJcblx0XHRcdFx0Ki9cblx0XHRcdFx0c2Nyb2xsVHlwZTpcInN0ZXBsZXNzXCIsXG5cdFx0XHRcdC8qXG5cdFx0XHRcdHNjcm9sbGluZyBhbW91bnQgaW4gcGl4ZWxzXG5cdFx0XHRcdHZhbHVlczogXCJhdXRvXCIsIGludGVnZXIgXG5cdFx0XHRcdCovXG5cdFx0XHRcdHNjcm9sbEFtb3VudDpcImF1dG9cIlxuXHRcdFx0fSxcblx0XHRcdC8qXG5cdFx0XHRlbmFibGUgY29udGVudCB0b3VjaC1zd2lwZSBzY3JvbGxpbmcgXG5cdFx0XHR2YWx1ZXM6IGJvb2xlYW4sIGludGVnZXIsIHN0cmluZyAobnVtYmVyKVxuXHRcdFx0aW50ZWdlciB2YWx1ZXMgZGVmaW5lIHRoZSBheGlzLXNwZWNpZmljIG1pbmltdW0gYW1vdW50IHJlcXVpcmVkIGZvciBzY3JvbGxpbmcgbW9tZW50dW1cblx0XHRcdCovXG5cdFx0XHRjb250ZW50VG91Y2hTY3JvbGw6MjUsXG5cdFx0XHQvKlxuXHRcdFx0ZW5hYmxlL2Rpc2FibGUgZG9jdW1lbnQgKGRlZmF1bHQpIHRvdWNoLXN3aXBlIHNjcm9sbGluZyBcblx0XHRcdCovXG5cdFx0XHRkb2N1bWVudFRvdWNoU2Nyb2xsOnRydWUsXG5cdFx0XHQvKlxuXHRcdFx0YWR2YW5jZWQgb3B0aW9uIHBhcmFtZXRlcnNcblx0XHRcdCovXG5cdFx0XHRhZHZhbmNlZDp7XG5cdFx0XHRcdC8qXG5cdFx0XHRcdGF1dG8tZXhwYW5kIGNvbnRlbnQgaG9yaXpvbnRhbGx5IChmb3IgXCJ4XCIgb3IgXCJ5eFwiIGF4aXMpIFxuXHRcdFx0XHR2YWx1ZXM6IGJvb2xlYW4sIGludGVnZXIgKHRoZSB2YWx1ZSAyIGZvcmNlcyB0aGUgbm9uIHNjcm9sbEhlaWdodC9zY3JvbGxXaWR0aCBtZXRob2QsIHRoZSB2YWx1ZSAzIGZvcmNlcyB0aGUgc2Nyb2xsSGVpZ2h0L3Njcm9sbFdpZHRoIG1ldGhvZClcblx0XHRcdFx0XHRvcHRpb25cdFx0XHRcdFx0XHRkZWZhdWx0XG5cdFx0XHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0XHRcdGF1dG9FeHBhbmRIb3Jpem9udGFsU2Nyb2xsXHRudWxsXG5cdFx0XHRcdCovXG5cdFx0XHRcdC8qXG5cdFx0XHRcdGF1dG8tc2Nyb2xsIHRvIGVsZW1lbnRzIHdpdGggZm9jdXNcblx0XHRcdFx0Ki9cblx0XHRcdFx0YXV0b1Njcm9sbE9uRm9jdXM6XCJpbnB1dCx0ZXh0YXJlYSxzZWxlY3QsYnV0dG9uLGRhdGFsaXN0LGtleWdlbixhW3RhYmluZGV4XSxhcmVhLG9iamVjdCxbY29udGVudGVkaXRhYmxlPSd0cnVlJ11cIixcblx0XHRcdFx0Lypcblx0XHRcdFx0YXV0by11cGRhdGUgc2Nyb2xsYmFycyBvbiBjb250ZW50LCBlbGVtZW50IG9yIHZpZXdwb3J0IHJlc2l6ZSBcblx0XHRcdFx0c2hvdWxkIGJlIHRydWUgZm9yIGZsdWlkIGxheW91dHMvZWxlbWVudHMsIGFkZGluZy9yZW1vdmluZyBjb250ZW50IGR5bmFtaWNhbGx5LCBoaWRpbmcvc2hvd2luZyBlbGVtZW50cywgY29udGVudCB3aXRoIGltYWdlcyBldGMuIFxuXHRcdFx0XHR2YWx1ZXM6IGJvb2xlYW5cblx0XHRcdFx0Ki9cblx0XHRcdFx0dXBkYXRlT25Db250ZW50UmVzaXplOnRydWUsXG5cdFx0XHRcdC8qXG5cdFx0XHRcdGF1dG8tdXBkYXRlIHNjcm9sbGJhcnMgZWFjaCB0aW1lIGVhY2ggaW1hZ2UgaW5zaWRlIHRoZSBlbGVtZW50IGlzIGZ1bGx5IGxvYWRlZCBcblx0XHRcdFx0dmFsdWVzOiBcImF1dG9cIiwgYm9vbGVhblxuXHRcdFx0XHQqL1xuXHRcdFx0XHR1cGRhdGVPbkltYWdlTG9hZDpcImF1dG9cIixcblx0XHRcdFx0Lypcblx0XHRcdFx0YXV0by11cGRhdGUgc2Nyb2xsYmFycyBiYXNlZCBvbiB0aGUgYW1vdW50IGFuZCBzaXplIGNoYW5nZXMgb2Ygc3BlY2lmaWMgc2VsZWN0b3JzIFxuXHRcdFx0XHR1c2VmdWwgd2hlbiB5b3UgbmVlZCB0byB1cGRhdGUgdGhlIHNjcm9sbGJhcihzKSBhdXRvbWF0aWNhbGx5LCBlYWNoIHRpbWUgYSB0eXBlIG9mIGVsZW1lbnQgaXMgYWRkZWQsIHJlbW92ZWQgb3IgY2hhbmdlcyBpdHMgc2l6ZSBcblx0XHRcdFx0dmFsdWVzOiBib29sZWFuLCBzdHJpbmcgKGUuZy4gXCJ1bCBsaVwiIHdpbGwgYXV0by11cGRhdGUgc2Nyb2xsYmFycyBlYWNoIHRpbWUgbGlzdC1pdGVtcyBpbnNpZGUgdGhlIGVsZW1lbnQgYXJlIGNoYW5nZWQpIFxuXHRcdFx0XHRhIHZhbHVlIG9mIHRydWUgKGJvb2xlYW4pIHdpbGwgYXV0by11cGRhdGUgc2Nyb2xsYmFycyBlYWNoIHRpbWUgYW55IGVsZW1lbnQgaXMgY2hhbmdlZFxuXHRcdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdFx0dXBkYXRlT25TZWxlY3RvckNoYW5nZVx0XHRudWxsXG5cdFx0XHRcdCovXG5cdFx0XHRcdC8qXG5cdFx0XHRcdGV4dHJhIHNlbGVjdG9ycyB0aGF0J2xsIGFsbG93IHNjcm9sbGJhciBkcmFnZ2luZyB1cG9uIG1vdXNlbW92ZS91cCwgcG9pbnRlcm1vdmUvdXAsIHRvdWNoZW5kIGV0Yy4gKGUuZy4gXCJzZWxlY3Rvci0xLCBzZWxlY3Rvci0yXCIpXG5cdFx0XHRcdFx0b3B0aW9uXHRcdFx0XHRcdFx0ZGVmYXVsdFxuXHRcdFx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0XHRleHRyYURyYWdnYWJsZVNlbGVjdG9yc1x0XHRudWxsXG5cdFx0XHRcdCovXG5cdFx0XHRcdC8qXG5cdFx0XHRcdGV4dHJhIHNlbGVjdG9ycyB0aGF0J2xsIHJlbGVhc2Ugc2Nyb2xsYmFyIGRyYWdnaW5nIHVwb24gbW91c2V1cCwgcG9pbnRlcnVwLCB0b3VjaGVuZCBldGMuIChlLmcuIFwic2VsZWN0b3ItMSwgc2VsZWN0b3ItMlwiKVxuXHRcdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdFx0cmVsZWFzZURyYWdnYWJsZVNlbGVjdG9yc1x0bnVsbFxuXHRcdFx0XHQqL1xuXHRcdFx0XHQvKlxuXHRcdFx0XHRhdXRvLXVwZGF0ZSB0aW1lb3V0IFxuXHRcdFx0XHR2YWx1ZXM6IGludGVnZXIgKG1pbGxpc2Vjb25kcylcblx0XHRcdFx0Ki9cblx0XHRcdFx0YXV0b1VwZGF0ZVRpbWVvdXQ6NjBcblx0XHRcdH0sXG5cdFx0XHQvKiBcblx0XHRcdHNjcm9sbGJhciB0aGVtZSBcblx0XHRcdHZhbHVlczogc3RyaW5nIChzZWUgQ1NTL3BsdWdpbiBVUkkgZm9yIGEgbGlzdCBvZiByZWFkeS10by11c2UgdGhlbWVzKVxuXHRcdFx0Ki9cblx0XHRcdHRoZW1lOlwibGlnaHRcIixcblx0XHRcdC8qXG5cdFx0XHR1c2VyIGRlZmluZWQgY2FsbGJhY2sgZnVuY3Rpb25zXG5cdFx0XHQqL1xuXHRcdFx0Y2FsbGJhY2tzOntcblx0XHRcdFx0Lypcblx0XHRcdFx0QXZhaWxhYmxlIGNhbGxiYWNrczogXG5cdFx0XHRcdFx0Y2FsbGJhY2tcdFx0XHRcdFx0ZGVmYXVsdFxuXHRcdFx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFx0XHRvbkNyZWF0ZVx0XHRcdFx0XHRudWxsXG5cdFx0XHRcdFx0b25Jbml0XHRcdFx0XHRcdFx0bnVsbFxuXHRcdFx0XHRcdG9uU2Nyb2xsU3RhcnRcdFx0XHRcdG51bGxcblx0XHRcdFx0XHRvblNjcm9sbFx0XHRcdFx0XHRudWxsXG5cdFx0XHRcdFx0b25Ub3RhbFNjcm9sbFx0XHRcdFx0bnVsbFxuXHRcdFx0XHRcdG9uVG90YWxTY3JvbGxCYWNrXHRcdFx0bnVsbFxuXHRcdFx0XHRcdHdoaWxlU2Nyb2xsaW5nXHRcdFx0XHRudWxsXG5cdFx0XHRcdFx0b25PdmVyZmxvd1lcdFx0XHRcdFx0bnVsbFxuXHRcdFx0XHRcdG9uT3ZlcmZsb3dYXHRcdFx0XHRcdG51bGxcblx0XHRcdFx0XHRvbk92ZXJmbG93WU5vbmVcdFx0XHRcdG51bGxcblx0XHRcdFx0XHRvbk92ZXJmbG93WE5vbmVcdFx0XHRcdG51bGxcblx0XHRcdFx0XHRvbkltYWdlTG9hZFx0XHRcdFx0XHRudWxsXG5cdFx0XHRcdFx0b25TZWxlY3RvckNoYW5nZVx0XHRcdG51bGxcblx0XHRcdFx0XHRvbkJlZm9yZVVwZGF0ZVx0XHRcdFx0bnVsbFxuXHRcdFx0XHRcdG9uVXBkYXRlXHRcdFx0XHRcdG51bGxcblx0XHRcdFx0Ki9cblx0XHRcdFx0b25Ub3RhbFNjcm9sbE9mZnNldDowLFxuXHRcdFx0XHRvblRvdGFsU2Nyb2xsQmFja09mZnNldDowLFxuXHRcdFx0XHRhbHdheXNUcmlnZ2VyT2Zmc2V0czp0cnVlXG5cdFx0XHR9XG5cdFx0XHQvKlxuXHRcdFx0YWRkIHNjcm9sbGJhcihzKSBvbiBhbGwgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIGN1cnJlbnQgc2VsZWN0b3IsIG5vdyBhbmQgaW4gdGhlIGZ1dHVyZSBcblx0XHRcdHZhbHVlczogYm9vbGVhbiwgc3RyaW5nIFxuXHRcdFx0c3RyaW5nIHZhbHVlczogXCJvblwiIChlbmFibGUpLCBcIm9uY2VcIiAoZGlzYWJsZSBhZnRlciBmaXJzdCBpbnZvY2F0aW9uKSwgXCJvZmZcIiAoZGlzYWJsZSlcblx0XHRcdGxpdmVTZWxlY3RvciB2YWx1ZXM6IHN0cmluZyAoc2VsZWN0b3IpXG5cdFx0XHRcdG9wdGlvblx0XHRcdFx0XHRcdGRlZmF1bHRcblx0XHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0XHRsaXZlXHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0bGl2ZVNlbGVjdG9yXHRcdFx0XHRudWxsXG5cdFx0XHQqL1xuXHRcdH0sXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0LyogXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0VkFSUywgQ09OU1RBTlRTIFxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCovXG5cdFxuXHRcdHRvdGFsSW5zdGFuY2VzPTAsIC8qIHBsdWdpbiBpbnN0YW5jZXMgYW1vdW50ICovXG5cdFx0bGl2ZVRpbWVycz17fSwgLyogbGl2ZSBvcHRpb24gdGltZXJzICovXG5cdFx0b2xkSUU9KHdpbmRvdy5hdHRhY2hFdmVudCAmJiAhd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpID8gMSA6IDAsIC8qIGRldGVjdCBJRSA8IDkgKi9cblx0XHR0b3VjaEFjdGl2ZT1mYWxzZSx0b3VjaGFibGUsIC8qIGdsb2JhbCB0b3VjaCB2YXJzIChmb3IgdG91Y2ggYW5kIHBvaW50ZXIgZXZlbnRzKSAqL1xuXHRcdC8qIGdlbmVyYWwgcGx1Z2luIGNsYXNzZXMgKi9cblx0XHRjbGFzc2VzPVtcblx0XHRcdFwibUNTQl9kcmFnZ2VyX29uRHJhZ1wiLFwibUNTQl9zY3JvbGxUb29sc19vbkRyYWdcIixcIm1DU19pbWdfbG9hZGVkXCIsXCJtQ1NfZGlzYWJsZWRcIixcIm1DU19kZXN0cm95ZWRcIixcIm1DU19ub19zY3JvbGxiYXJcIixcblx0XHRcdFwibUNTLWF1dG9IaWRlXCIsXCJtQ1MtZGlyLXJ0bFwiLFwibUNTX25vX3Njcm9sbGJhcl95XCIsXCJtQ1Nfbm9fc2Nyb2xsYmFyX3hcIixcIm1DU195X2hpZGRlblwiLFwibUNTX3hfaGlkZGVuXCIsXCJtQ1NCX2RyYWdnZXJDb250YWluZXJcIixcblx0XHRcdFwibUNTQl9idXR0b25VcFwiLFwibUNTQl9idXR0b25Eb3duXCIsXCJtQ1NCX2J1dHRvbkxlZnRcIixcIm1DU0JfYnV0dG9uUmlnaHRcIlxuXHRcdF0sXG5cdFx0XG5cdFxuXHRcblx0XG5cdFxuXHQvKiBcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRNRVRIT0RTIFxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCovXG5cdFxuXHRcdG1ldGhvZHM9e1xuXHRcdFx0XG5cdFx0XHQvKiBcblx0XHRcdHBsdWdpbiBpbml0aWFsaXphdGlvbiBtZXRob2QgXG5cdFx0XHRjcmVhdGVzIHRoZSBzY3JvbGxiYXIocyksIHBsdWdpbiBkYXRhIG9iamVjdCBhbmQgb3B0aW9uc1xuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0Ki9cblx0XHRcdFxuXHRcdFx0aW5pdDpmdW5jdGlvbihvcHRpb25zKXtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBvcHRpb25zPSQuZXh0ZW5kKHRydWUse30sZGVmYXVsdHMsb3B0aW9ucyksXG5cdFx0XHRcdFx0c2VsZWN0b3I9X3NlbGVjdG9yLmNhbGwodGhpcyk7IC8qIHZhbGlkYXRlIHNlbGVjdG9yICovXG5cdFx0XHRcdFxuXHRcdFx0XHQvKiBcblx0XHRcdFx0aWYgbGl2ZSBvcHRpb24gaXMgZW5hYmxlZCwgbW9uaXRvciBmb3IgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIGN1cnJlbnQgc2VsZWN0b3IgYW5kIFxuXHRcdFx0XHRhcHBseSBzY3JvbGxiYXIocykgd2hlbiBmb3VuZCAobm93IGFuZCBpbiB0aGUgZnV0dXJlKSBcblx0XHRcdFx0Ki9cblx0XHRcdFx0aWYob3B0aW9ucy5saXZlKXtcblx0XHRcdFx0XHR2YXIgbGl2ZVNlbGVjdG9yPW9wdGlvbnMubGl2ZVNlbGVjdG9yIHx8IHRoaXMuc2VsZWN0b3IgfHwgZGVmYXVsdFNlbGVjdG9yLCAvKiBsaXZlIHNlbGVjdG9yKHMpICovXG5cdFx0XHRcdFx0XHQkbGl2ZVNlbGVjdG9yPSQobGl2ZVNlbGVjdG9yKTsgLyogbGl2ZSBzZWxlY3RvcihzKSBhcyBqcXVlcnkgb2JqZWN0ICovXG5cdFx0XHRcdFx0aWYob3B0aW9ucy5saXZlPT09XCJvZmZcIil7XG5cdFx0XHRcdFx0XHQvKiBcblx0XHRcdFx0XHRcdGRpc2FibGUgbGl2ZSBpZiByZXF1ZXN0ZWQgXG5cdFx0XHRcdFx0XHR1c2FnZTogJChzZWxlY3RvcikubUN1c3RvbVNjcm9sbGJhcih7bGl2ZTpcIm9mZlwifSk7IFxuXHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdHJlbW92ZUxpdmVUaW1lcnMobGl2ZVNlbGVjdG9yKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGl2ZVRpbWVyc1tsaXZlU2VsZWN0b3JdPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdC8qIGNhbGwgbUN1c3RvbVNjcm9sbGJhciBmbiBvbiBsaXZlIHNlbGVjdG9yKHMpIGV2ZXJ5IGhhbGYtc2Vjb25kICovXG5cdFx0XHRcdFx0XHQkbGl2ZVNlbGVjdG9yLm1DdXN0b21TY3JvbGxiYXIob3B0aW9ucyk7XG5cdFx0XHRcdFx0XHRpZihvcHRpb25zLmxpdmU9PT1cIm9uY2VcIiAmJiAkbGl2ZVNlbGVjdG9yLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRcdC8qIGRpc2FibGUgbGl2ZSBhZnRlciBmaXJzdCBpbnZvY2F0aW9uICovXG5cdFx0XHRcdFx0XHRcdHJlbW92ZUxpdmVUaW1lcnMobGl2ZVNlbGVjdG9yKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LDUwMCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJlbW92ZUxpdmVUaW1lcnMobGl2ZVNlbGVjdG9yKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Lyogb3B0aW9ucyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IChmb3IgdmVyc2lvbnMgPCAzLjAuMCkgYW5kIG5vcm1hbGl6YXRpb24gKi9cblx0XHRcdFx0b3B0aW9ucy5zZXRXaWR0aD0ob3B0aW9ucy5zZXRfd2lkdGgpID8gb3B0aW9ucy5zZXRfd2lkdGggOiBvcHRpb25zLnNldFdpZHRoO1xuXHRcdFx0XHRvcHRpb25zLnNldEhlaWdodD0ob3B0aW9ucy5zZXRfaGVpZ2h0KSA/IG9wdGlvbnMuc2V0X2hlaWdodCA6IG9wdGlvbnMuc2V0SGVpZ2h0O1xuXHRcdFx0XHRvcHRpb25zLmF4aXM9KG9wdGlvbnMuaG9yaXpvbnRhbFNjcm9sbCkgPyBcInhcIiA6IF9maW5kQXhpcyhvcHRpb25zLmF4aXMpO1xuXHRcdFx0XHRvcHRpb25zLnNjcm9sbEluZXJ0aWE9b3B0aW9ucy5zY3JvbGxJbmVydGlhPjAgJiYgb3B0aW9ucy5zY3JvbGxJbmVydGlhPDE3ID8gMTcgOiBvcHRpb25zLnNjcm9sbEluZXJ0aWE7XG5cdFx0XHRcdGlmKHR5cGVvZiBvcHRpb25zLm1vdXNlV2hlZWwhPT1cIm9iamVjdFwiICYmICBvcHRpb25zLm1vdXNlV2hlZWw9PXRydWUpeyAvKiBvbGQgc2Nob29sIG1vdXNlV2hlZWwgb3B0aW9uIChub24tb2JqZWN0KSAqL1xuXHRcdFx0XHRcdG9wdGlvbnMubW91c2VXaGVlbD17ZW5hYmxlOnRydWUsc2Nyb2xsQW1vdW50OlwiYXV0b1wiLGF4aXM6XCJ5XCIscHJldmVudERlZmF1bHQ6ZmFsc2UsZGVsdGFGYWN0b3I6XCJhdXRvXCIsbm9ybWFsaXplRGVsdGE6ZmFsc2UsaW52ZXJ0OmZhbHNlfVxuXHRcdFx0XHR9XG5cdFx0XHRcdG9wdGlvbnMubW91c2VXaGVlbC5zY3JvbGxBbW91bnQ9IW9wdGlvbnMubW91c2VXaGVlbFBpeGVscyA/IG9wdGlvbnMubW91c2VXaGVlbC5zY3JvbGxBbW91bnQgOiBvcHRpb25zLm1vdXNlV2hlZWxQaXhlbHM7XG5cdFx0XHRcdG9wdGlvbnMubW91c2VXaGVlbC5ub3JtYWxpemVEZWx0YT0hb3B0aW9ucy5hZHZhbmNlZC5ub3JtYWxpemVNb3VzZVdoZWVsRGVsdGEgPyBvcHRpb25zLm1vdXNlV2hlZWwubm9ybWFsaXplRGVsdGEgOiBvcHRpb25zLmFkdmFuY2VkLm5vcm1hbGl6ZU1vdXNlV2hlZWxEZWx0YTtcblx0XHRcdFx0b3B0aW9ucy5zY3JvbGxCdXR0b25zLnNjcm9sbFR5cGU9X2ZpbmRTY3JvbGxCdXR0b25zVHlwZShvcHRpb25zLnNjcm9sbEJ1dHRvbnMuc2Nyb2xsVHlwZSk7IFxuXHRcdFx0XHRcblx0XHRcdFx0X3RoZW1lKG9wdGlvbnMpOyAvKiB0aGVtZS1zcGVjaWZpYyBvcHRpb25zICovXG5cdFx0XHRcdFxuXHRcdFx0XHQvKiBwbHVnaW4gY29uc3RydWN0b3IgKi9cblx0XHRcdFx0cmV0dXJuICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgJHRoaXM9JCh0aGlzKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZighJHRoaXMuZGF0YShwbHVnaW5QZngpKXsgLyogcHJldmVudCBtdWx0aXBsZSBpbnN0YW50aWF0aW9ucyAqL1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Lyogc3RvcmUgb3B0aW9ucyBhbmQgY3JlYXRlIG9iamVjdHMgaW4ganF1ZXJ5IGRhdGEgKi9cblx0XHRcdFx0XHRcdCR0aGlzLmRhdGEocGx1Z2luUGZ4LHtcblx0XHRcdFx0XHRcdFx0aWR4OisrdG90YWxJbnN0YW5jZXMsIC8qIGluc3RhbmNlIGluZGV4ICovXG5cdFx0XHRcdFx0XHRcdG9wdDpvcHRpb25zLCAvKiBvcHRpb25zICovXG5cdFx0XHRcdFx0XHRcdHNjcm9sbFJhdGlvOnt5Om51bGwseDpudWxsfSwgLyogc2Nyb2xsYmFyIHRvIGNvbnRlbnQgcmF0aW8gKi9cblx0XHRcdFx0XHRcdFx0b3ZlcmZsb3dlZDpudWxsLCAvKiBvdmVyZmxvd2VkIGF4aXMgKi9cblx0XHRcdFx0XHRcdFx0Y29udGVudFJlc2V0Ont5Om51bGwseDpudWxsfSwgLyogb2JqZWN0IHRvIGNoZWNrIHdoZW4gY29udGVudCByZXNldHMgKi9cblx0XHRcdFx0XHRcdFx0YmluZEV2ZW50czpmYWxzZSwgLyogb2JqZWN0IHRvIGNoZWNrIGlmIGV2ZW50cyBhcmUgYm91bmQgKi9cblx0XHRcdFx0XHRcdFx0dHdlZW5SdW5uaW5nOmZhbHNlLCAvKiBvYmplY3QgdG8gY2hlY2sgaWYgdHdlZW4gaXMgcnVubmluZyAqL1xuXHRcdFx0XHRcdFx0XHRzZXF1ZW50aWFsOnt9LCAvKiBzZXF1ZW50aWFsIHNjcm9sbGluZyBvYmplY3QgKi9cblx0XHRcdFx0XHRcdFx0bGFuZ0RpcjokdGhpcy5jc3MoXCJkaXJlY3Rpb25cIiksIC8qIGRldGVjdC9zdG9yZSBkaXJlY3Rpb24gKGx0ciBvciBydGwpICovXG5cdFx0XHRcdFx0XHRcdGNiT2Zmc2V0czpudWxsLCAvKiBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBjYWxsYmFjayBvZmZzZXRzIGFsd2F5cyB0cmlnZ2VyICovXG5cdFx0XHRcdFx0XHRcdC8qIFxuXHRcdFx0XHRcdFx0XHRvYmplY3QgdG8gY2hlY2sgaG93IHNjcm9sbGluZyBldmVudHMgd2hlcmUgbGFzdCB0cmlnZ2VyZWQgXG5cdFx0XHRcdFx0XHRcdFwiaW50ZXJuYWxcIiAoZGVmYXVsdCAtIHRyaWdnZXJlZCBieSB0aGlzIHNjcmlwdCksIFwiZXh0ZXJuYWxcIiAodHJpZ2dlcmVkIGJ5IG90aGVyIHNjcmlwdHMsIGUuZy4gdmlhIHNjcm9sbFRvIG1ldGhvZCkgXG5cdFx0XHRcdFx0XHRcdHVzYWdlOiBvYmplY3QuZGF0YShcIm1DU1wiKS50cmlnZ2VyXG5cdFx0XHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0XHRcdHRyaWdnZXI6bnVsbCxcblx0XHRcdFx0XHRcdFx0LyogXG5cdFx0XHRcdFx0XHRcdG9iamVjdCB0byBjaGVjayBmb3IgY2hhbmdlcyBpbiBlbGVtZW50cyBpbiBvcmRlciB0byBjYWxsIHRoZSB1cGRhdGUgbWV0aG9kIGF1dG9tYXRpY2FsbHkgXG5cdFx0XHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0XHRcdHBvbGw6e3NpemU6e286MCxuOjB9LGltZzp7bzowLG46MH0sY2hhbmdlOntvOjAsbjowfX1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR2YXIgZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0XHRcdFx0LyogSFRNTCBkYXRhIGF0dHJpYnV0ZXMgKi9cblx0XHRcdFx0XHRcdFx0aHRtbERhdGFBeGlzPSR0aGlzLmRhdGEoXCJtY3MtYXhpc1wiKSxodG1sRGF0YVNiUG9zPSR0aGlzLmRhdGEoXCJtY3Mtc2Nyb2xsYmFyLXBvc2l0aW9uXCIpLGh0bWxEYXRhVGhlbWU9JHRoaXMuZGF0YShcIm1jcy10aGVtZVwiKTtcblx0XHRcdFx0XHRcdCBcblx0XHRcdFx0XHRcdGlmKGh0bWxEYXRhQXhpcyl7by5heGlzPWh0bWxEYXRhQXhpczt9IC8qIHVzYWdlIGV4YW1wbGU6IGRhdGEtbWNzLWF4aXM9XCJ5XCIgKi9cblx0XHRcdFx0XHRcdGlmKGh0bWxEYXRhU2JQb3Mpe28uc2Nyb2xsYmFyUG9zaXRpb249aHRtbERhdGFTYlBvczt9IC8qIHVzYWdlIGV4YW1wbGU6IGRhdGEtbWNzLXNjcm9sbGJhci1wb3NpdGlvbj1cIm91dHNpZGVcIiAqL1xuXHRcdFx0XHRcdFx0aWYoaHRtbERhdGFUaGVtZSl7IC8qIHVzYWdlIGV4YW1wbGU6IGRhdGEtbWNzLXRoZW1lPVwibWluaW1hbFwiICovXG5cdFx0XHRcdFx0XHRcdG8udGhlbWU9aHRtbERhdGFUaGVtZTtcblx0XHRcdFx0XHRcdFx0X3RoZW1lKG8pOyAvKiB0aGVtZS1zcGVjaWZpYyBvcHRpb25zICovXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdF9wbHVnaW5NYXJrdXAuY2FsbCh0aGlzKTsgLyogYWRkIHBsdWdpbiBtYXJrdXAgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYoZCAmJiBvLmNhbGxiYWNrcy5vbkNyZWF0ZSAmJiB0eXBlb2Ygby5jYWxsYmFja3Mub25DcmVhdGU9PT1cImZ1bmN0aW9uXCIpe28uY2FsbGJhY2tzLm9uQ3JlYXRlLmNhbGwodGhpcyk7fSAvKiBjYWxsYmFja3M6IG9uQ3JlYXRlICovXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdCQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXIgaW1nOm5vdCguXCIrY2xhc3Nlc1syXStcIilcIikuYWRkQ2xhc3MoY2xhc3Nlc1syXSk7IC8qIGZsYWcgbG9hZGVkIGltYWdlcyAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRtZXRob2RzLnVwZGF0ZS5jYWxsKG51bGwsJHRoaXMpOyAvKiBjYWxsIHRoZSB1cGRhdGUgbWV0aG9kICovXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFx0XG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0LyogXG5cdFx0XHRwbHVnaW4gdXBkYXRlIG1ldGhvZCBcblx0XHRcdHVwZGF0ZXMgY29udGVudCBhbmQgc2Nyb2xsYmFyKHMpIHZhbHVlcywgZXZlbnRzIGFuZCBzdGF0dXMgXG5cdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHR1c2FnZTogJChzZWxlY3RvcikubUN1c3RvbVNjcm9sbGJhcihcInVwZGF0ZVwiKTtcblx0XHRcdCovXG5cdFx0XHRcblx0XHRcdHVwZGF0ZTpmdW5jdGlvbihlbCxjYil7XG5cdFx0XHRcdFxuXHRcdFx0XHR2YXIgc2VsZWN0b3I9ZWwgfHwgX3NlbGVjdG9yLmNhbGwodGhpcyk7IC8qIHZhbGlkYXRlIHNlbGVjdG9yICovXG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHZhciAkdGhpcz0kKHRoaXMpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKCR0aGlzLmRhdGEocGx1Z2luUGZ4KSl7IC8qIGNoZWNrIGlmIHBsdWdpbiBoYXMgaW5pdGlhbGl6ZWQgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0dmFyIGQ9JHRoaXMuZGF0YShwbHVnaW5QZngpLG89ZC5vcHQsXG5cdFx0XHRcdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIiksXG5cdFx0XHRcdFx0XHRcdG1DdXN0b21TY3JvbGxCb3g9JChcIiNtQ1NCX1wiK2QuaWR4KSxcblx0XHRcdFx0XHRcdFx0bUNTQl9kcmFnZ2VyPVskKFwiI21DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl92ZXJ0aWNhbFwiKSwkKFwiI21DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl9ob3Jpem9udGFsXCIpXTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYoIW1DU0JfY29udGFpbmVyLmxlbmd0aCl7cmV0dXJuO31cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYoZC50d2VlblJ1bm5pbmcpe19zdG9wKCR0aGlzKTt9IC8qIHN0b3AgYW55IHJ1bm5pbmcgdHdlZW5zIHdoaWxlIHVwZGF0aW5nICovXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGlmKGNiICYmIGQgJiYgby5jYWxsYmFja3Mub25CZWZvcmVVcGRhdGUgJiYgdHlwZW9mIG8uY2FsbGJhY2tzLm9uQmVmb3JlVXBkYXRlPT09XCJmdW5jdGlvblwiKXtvLmNhbGxiYWNrcy5vbkJlZm9yZVVwZGF0ZS5jYWxsKHRoaXMpO30gLyogY2FsbGJhY2tzOiBvbkJlZm9yZVVwZGF0ZSAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvKiBpZiBlbGVtZW50IHdhcyBkaXNhYmxlZCBvciBkZXN0cm95ZWQsIHJlbW92ZSBjbGFzcyhlcykgKi9cblx0XHRcdFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKGNsYXNzZXNbM10pKXskdGhpcy5yZW1vdmVDbGFzcyhjbGFzc2VzWzNdKTt9XG5cdFx0XHRcdFx0XHRpZigkdGhpcy5oYXNDbGFzcyhjbGFzc2VzWzRdKSl7JHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3Nlc1s0XSk7fVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvKiBjc3MgZmxleGJveCBmaXgsIGRldGVjdC9zZXQgbWF4LWhlaWdodCAqL1xuXHRcdFx0XHRcdFx0bUN1c3RvbVNjcm9sbEJveC5jc3MoXCJtYXgtaGVpZ2h0XCIsXCJub25lXCIpO1xuXHRcdFx0XHRcdFx0aWYobUN1c3RvbVNjcm9sbEJveC5oZWlnaHQoKSE9PSR0aGlzLmhlaWdodCgpKXttQ3VzdG9tU2Nyb2xsQm94LmNzcyhcIm1heC1oZWlnaHRcIiwkdGhpcy5oZWlnaHQoKSk7fVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRfZXhwYW5kQ29udGVudEhvcml6b250YWxseS5jYWxsKHRoaXMpOyAvKiBleHBhbmQgY29udGVudCBob3Jpem9udGFsbHkgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYoby5heGlzIT09XCJ5XCIgJiYgIW8uYWR2YW5jZWQuYXV0b0V4cGFuZEhvcml6b250YWxTY3JvbGwpe1xuXHRcdFx0XHRcdFx0XHRtQ1NCX2NvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLF9jb250ZW50V2lkdGgobUNTQl9jb250YWluZXIpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0ZC5vdmVyZmxvd2VkPV9vdmVyZmxvd2VkLmNhbGwodGhpcyk7IC8qIGRldGVybWluZSBpZiBzY3JvbGxpbmcgaXMgcmVxdWlyZWQgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0X3Njcm9sbGJhclZpc2liaWxpdHkuY2FsbCh0aGlzKTsgLyogc2hvdy9oaWRlIHNjcm9sbGJhcihzKSAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvKiBhdXRvLWFkanVzdCBzY3JvbGxiYXIgZHJhZ2dlciBsZW5ndGggYW5hbG9nb3VzIHRvIGNvbnRlbnQgKi9cblx0XHRcdFx0XHRcdGlmKG8uYXV0b0RyYWdnZXJMZW5ndGgpe19zZXREcmFnZ2VyTGVuZ3RoLmNhbGwodGhpcyk7fVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRfc2Nyb2xsUmF0aW8uY2FsbCh0aGlzKTsgLyogY2FsY3VsYXRlIGFuZCBzdG9yZSBzY3JvbGxiYXIgdG8gY29udGVudCByYXRpbyAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRfYmluZEV2ZW50cy5jYWxsKHRoaXMpOyAvKiBiaW5kIHNjcm9sbGJhciBldmVudHMgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0LyogcmVzZXQgc2Nyb2xsaW5nIHBvc2l0aW9uIGFuZC9vciBldmVudHMgKi9cblx0XHRcdFx0XHRcdHZhciB0bz1bTWF0aC5hYnMobUNTQl9jb250YWluZXJbMF0ub2Zmc2V0VG9wKSxNYXRoLmFicyhtQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRMZWZ0KV07XG5cdFx0XHRcdFx0XHRpZihvLmF4aXMhPT1cInhcIil7IC8qIHkveXggYXhpcyAqL1xuXHRcdFx0XHRcdFx0XHRpZighZC5vdmVyZmxvd2VkWzBdKXsgLyogeSBzY3JvbGxpbmcgaXMgbm90IHJlcXVpcmVkICovXG5cdFx0XHRcdFx0XHRcdFx0X3Jlc2V0Q29udGVudFBvc2l0aW9uLmNhbGwodGhpcyk7IC8qIHJlc2V0IGNvbnRlbnQgcG9zaXRpb24gKi9cblx0XHRcdFx0XHRcdFx0XHRpZihvLmF4aXM9PT1cInlcIil7XG5cdFx0XHRcdFx0XHRcdFx0XHRfdW5iaW5kRXZlbnRzLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0XHRcdFx0fWVsc2UgaWYoby5heGlzPT09XCJ5eFwiICYmIGQub3ZlcmZsb3dlZFsxXSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRfc2Nyb2xsVG8oJHRoaXMsdG9bMV0udG9TdHJpbmcoKSx7ZGlyOlwieFwiLGR1cjowLG92ZXJ3cml0ZTpcIm5vbmVcIn0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fWVsc2UgaWYobUNTQl9kcmFnZ2VyWzBdLmhlaWdodCgpPm1DU0JfZHJhZ2dlclswXS5wYXJlbnQoKS5oZWlnaHQoKSl7XG5cdFx0XHRcdFx0XHRcdFx0X3Jlc2V0Q29udGVudFBvc2l0aW9uLmNhbGwodGhpcyk7IC8qIHJlc2V0IGNvbnRlbnQgcG9zaXRpb24gKi9cblx0XHRcdFx0XHRcdFx0fWVsc2V7IC8qIHkgc2Nyb2xsaW5nIGlzIHJlcXVpcmVkICovXG5cdFx0XHRcdFx0XHRcdFx0X3Njcm9sbFRvKCR0aGlzLHRvWzBdLnRvU3RyaW5nKCkse2RpcjpcInlcIixkdXI6MCxvdmVyd3JpdGU6XCJub25lXCJ9KTtcblx0XHRcdFx0XHRcdFx0XHRkLmNvbnRlbnRSZXNldC55PW51bGw7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKG8uYXhpcyE9PVwieVwiKXsgLyogeC95eCBheGlzICovXG5cdFx0XHRcdFx0XHRcdGlmKCFkLm92ZXJmbG93ZWRbMV0peyAvKiB4IHNjcm9sbGluZyBpcyBub3QgcmVxdWlyZWQgKi9cblx0XHRcdFx0XHRcdFx0XHRfcmVzZXRDb250ZW50UG9zaXRpb24uY2FsbCh0aGlzKTsgLyogcmVzZXQgY29udGVudCBwb3NpdGlvbiAqL1xuXHRcdFx0XHRcdFx0XHRcdGlmKG8uYXhpcz09PVwieFwiKXtcblx0XHRcdFx0XHRcdFx0XHRcdF91bmJpbmRFdmVudHMuY2FsbCh0aGlzKTtcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZSBpZihvLmF4aXM9PT1cInl4XCIgJiYgZC5vdmVyZmxvd2VkWzBdKXtcblx0XHRcdFx0XHRcdFx0XHRcdF9zY3JvbGxUbygkdGhpcyx0b1swXS50b1N0cmluZygpLHtkaXI6XCJ5XCIsZHVyOjAsb3ZlcndyaXRlOlwibm9uZVwifSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZihtQ1NCX2RyYWdnZXJbMV0ud2lkdGgoKT5tQ1NCX2RyYWdnZXJbMV0ucGFyZW50KCkud2lkdGgoKSl7XG5cdFx0XHRcdFx0XHRcdFx0X3Jlc2V0Q29udGVudFBvc2l0aW9uLmNhbGwodGhpcyk7IC8qIHJlc2V0IGNvbnRlbnQgcG9zaXRpb24gKi9cblx0XHRcdFx0XHRcdFx0fWVsc2V7IC8qIHggc2Nyb2xsaW5nIGlzIHJlcXVpcmVkICovXG5cdFx0XHRcdFx0XHRcdFx0X3Njcm9sbFRvKCR0aGlzLHRvWzFdLnRvU3RyaW5nKCkse2RpcjpcInhcIixkdXI6MCxvdmVyd3JpdGU6XCJub25lXCJ9KTtcblx0XHRcdFx0XHRcdFx0XHRkLmNvbnRlbnRSZXNldC54PW51bGw7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0LyogY2FsbGJhY2tzOiBvbkltYWdlTG9hZCwgb25TZWxlY3RvckNoYW5nZSwgb25VcGRhdGUgKi9cblx0XHRcdFx0XHRcdGlmKGNiICYmIGQpe1xuXHRcdFx0XHRcdFx0XHRpZihjYj09PTIgJiYgby5jYWxsYmFja3Mub25JbWFnZUxvYWQgJiYgdHlwZW9mIG8uY2FsbGJhY2tzLm9uSW1hZ2VMb2FkPT09XCJmdW5jdGlvblwiKXtcblx0XHRcdFx0XHRcdFx0XHRvLmNhbGxiYWNrcy5vbkltYWdlTG9hZC5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZihjYj09PTMgJiYgby5jYWxsYmFja3Mub25TZWxlY3RvckNoYW5nZSAmJiB0eXBlb2Ygby5jYWxsYmFja3Mub25TZWxlY3RvckNoYW5nZT09PVwiZnVuY3Rpb25cIil7XG5cdFx0XHRcdFx0XHRcdFx0by5jYWxsYmFja3Mub25TZWxlY3RvckNoYW5nZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZihvLmNhbGxiYWNrcy5vblVwZGF0ZSAmJiB0eXBlb2Ygby5jYWxsYmFja3Mub25VcGRhdGU9PT1cImZ1bmN0aW9uXCIpe1xuXHRcdFx0XHRcdFx0XHRcdG8uY2FsbGJhY2tzLm9uVXBkYXRlLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0X2F1dG9VcGRhdGUuY2FsbCh0aGlzKTsgLyogaW5pdGlhbGl6ZSBhdXRvbWF0aWMgdXBkYXRpbmcgKGZvciBkeW5hbWljIGNvbnRlbnQsIGZsdWlkIGxheW91dHMgZXRjLikgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcdFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdC8qIFxuXHRcdFx0cGx1Z2luIHNjcm9sbFRvIG1ldGhvZCBcblx0XHRcdHRyaWdnZXJzIGEgc2Nyb2xsaW5nIGV2ZW50IHRvIGEgc3BlY2lmaWMgdmFsdWVcblx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdHVzYWdlOiAkKHNlbGVjdG9yKS5tQ3VzdG9tU2Nyb2xsYmFyKFwic2Nyb2xsVG9cIix2YWx1ZSxvcHRpb25zKTtcblx0XHRcdCovXG5cdFx0XG5cdFx0XHRzY3JvbGxUbzpmdW5jdGlvbih2YWwsb3B0aW9ucyl7XG5cdFx0XHRcdFxuXHRcdFx0XHQvKiBwcmV2ZW50IHNpbGx5IHRoaW5ncyBsaWtlICQoc2VsZWN0b3IpLm1DdXN0b21TY3JvbGxiYXIoXCJzY3JvbGxUb1wiLHVuZGVmaW5lZCk7ICovXG5cdFx0XHRcdGlmKHR5cGVvZiB2YWw9PVwidW5kZWZpbmVkXCIgfHwgdmFsPT1udWxsKXtyZXR1cm47fVxuXHRcdFx0XHRcblx0XHRcdFx0dmFyIHNlbGVjdG9yPV9zZWxlY3Rvci5jYWxsKHRoaXMpOyAvKiB2YWxpZGF0ZSBzZWxlY3RvciAqL1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR2YXIgJHRoaXM9JCh0aGlzKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZigkdGhpcy5kYXRhKHBsdWdpblBmeCkpeyAvKiBjaGVjayBpZiBwbHVnaW4gaGFzIGluaXRpYWxpemVkICovXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR2YXIgZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0XHRcdFx0LyogbWV0aG9kIGRlZmF1bHQgb3B0aW9ucyAqL1xuXHRcdFx0XHRcdFx0XHRtZXRob2REZWZhdWx0cz17XG5cdFx0XHRcdFx0XHRcdFx0dHJpZ2dlcjpcImV4dGVybmFsXCIsIC8qIG1ldGhvZCBpcyBieSBkZWZhdWx0IHRyaWdnZXJlZCBleHRlcm5hbGx5IChlLmcuIGZyb20gb3RoZXIgc2NyaXB0cykgKi9cblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxJbmVydGlhOm8uc2Nyb2xsSW5lcnRpYSwgLyogc2Nyb2xsaW5nIGluZXJ0aWEgKGFuaW1hdGlvbiBkdXJhdGlvbikgKi9cblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxFYXNpbmc6XCJtY3NFYXNlSW5PdXRcIiwgLyogYW5pbWF0aW9uIGVhc2luZyAqL1xuXHRcdFx0XHRcdFx0XHRcdG1vdmVEcmFnZ2VyOmZhbHNlLCAvKiBtb3ZlIGRyYWdnZXIgaW5zdGVhZCBvZiBjb250ZW50ICovXG5cdFx0XHRcdFx0XHRcdFx0dGltZW91dDo2MCwgLyogc2Nyb2xsLXRvIGRlbGF5ICovXG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzOnRydWUsIC8qIGVuYWJsZS9kaXNhYmxlIGNhbGxiYWNrcyAqL1xuXHRcdFx0XHRcdFx0XHRcdG9uU3RhcnQ6dHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRvblVwZGF0ZTp0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdG9uQ29tcGxldGU6dHJ1ZVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRtZXRob2RPcHRpb25zPSQuZXh0ZW5kKHRydWUse30sbWV0aG9kRGVmYXVsdHMsb3B0aW9ucyksXG5cdFx0XHRcdFx0XHRcdHRvPV9hcnIuY2FsbCh0aGlzLHZhbCksZHVyPW1ldGhvZE9wdGlvbnMuc2Nyb2xsSW5lcnRpYT4wICYmIG1ldGhvZE9wdGlvbnMuc2Nyb2xsSW5lcnRpYTwxNyA/IDE3IDogbWV0aG9kT3B0aW9ucy5zY3JvbGxJbmVydGlhO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvKiB0cmFuc2xhdGUgeXggdmFsdWVzIHRvIGFjdHVhbCBzY3JvbGwtdG8gcG9zaXRpb25zICovXG5cdFx0XHRcdFx0XHR0b1swXT1fdG8uY2FsbCh0aGlzLHRvWzBdLFwieVwiKTtcblx0XHRcdFx0XHRcdHRvWzFdPV90by5jYWxsKHRoaXMsdG9bMV0sXCJ4XCIpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvKiBcblx0XHRcdFx0XHRcdGNoZWNrIGlmIHNjcm9sbC10byB2YWx1ZSBtb3ZlcyB0aGUgZHJhZ2dlciBpbnN0ZWFkIG9mIGNvbnRlbnQuIFxuXHRcdFx0XHRcdFx0T25seSBwaXhlbCB2YWx1ZXMgYXBwbHkgb24gZHJhZ2dlciAoZS5nLiAxMDAsIFwiMTAwcHhcIiwgXCItPTEwMFwiIGV0Yy4pIFxuXHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdGlmKG1ldGhvZE9wdGlvbnMubW92ZURyYWdnZXIpe1xuXHRcdFx0XHRcdFx0XHR0b1swXSo9ZC5zY3JvbGxSYXRpby55O1xuXHRcdFx0XHRcdFx0XHR0b1sxXSo9ZC5zY3JvbGxSYXRpby54O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRtZXRob2RPcHRpb25zLmR1cj1faXNUYWJIaWRkZW4oKSA/IDAgOiBkdXI7IC8vc2tpcCBhbmltYXRpb25zIGlmIGJyb3dzZXIgdGFiIGlzIGhpZGRlblxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IFxuXHRcdFx0XHRcdFx0XHQvKiBkbyB0aGUgc2Nyb2xsaW5nICovXG5cdFx0XHRcdFx0XHRcdGlmKHRvWzBdIT09bnVsbCAmJiB0eXBlb2YgdG9bMF0hPT1cInVuZGVmaW5lZFwiICYmIG8uYXhpcyE9PVwieFwiICYmIGQub3ZlcmZsb3dlZFswXSl7IC8qIHNjcm9sbCB5ICovXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kT3B0aW9ucy5kaXI9XCJ5XCI7XG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kT3B0aW9ucy5vdmVyd3JpdGU9XCJhbGxcIjtcblx0XHRcdFx0XHRcdFx0XHRfc2Nyb2xsVG8oJHRoaXMsdG9bMF0udG9TdHJpbmcoKSxtZXRob2RPcHRpb25zKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0b1sxXSE9PW51bGwgJiYgdHlwZW9mIHRvWzFdIT09XCJ1bmRlZmluZWRcIiAmJiBvLmF4aXMhPT1cInlcIiAmJiBkLm92ZXJmbG93ZWRbMV0peyAvKiBzY3JvbGwgeCAqL1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZE9wdGlvbnMuZGlyPVwieFwiO1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZE9wdGlvbnMub3ZlcndyaXRlPVwibm9uZVwiO1xuXHRcdFx0XHRcdFx0XHRcdF9zY3JvbGxUbygkdGhpcyx0b1sxXS50b1N0cmluZygpLG1ldGhvZE9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LG1ldGhvZE9wdGlvbnMudGltZW91dCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHQvKlxuXHRcdFx0cGx1Z2luIHN0b3AgbWV0aG9kIFxuXHRcdFx0c3RvcHMgc2Nyb2xsaW5nIGFuaW1hdGlvblxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0dXNhZ2U6ICQoc2VsZWN0b3IpLm1DdXN0b21TY3JvbGxiYXIoXCJzdG9wXCIpO1xuXHRcdFx0Ki9cblx0XHRcdHN0b3A6ZnVuY3Rpb24oKXtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBzZWxlY3Rvcj1fc2VsZWN0b3IuY2FsbCh0aGlzKTsgLyogdmFsaWRhdGUgc2VsZWN0b3IgKi9cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyICR0aGlzPSQodGhpcyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoJHRoaXMuZGF0YShwbHVnaW5QZngpKXsgLyogY2hlY2sgaWYgcGx1Z2luIGhhcyBpbml0aWFsaXplZCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdF9zdG9wKCR0aGlzKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHQvKlxuXHRcdFx0cGx1Z2luIGRpc2FibGUgbWV0aG9kIFxuXHRcdFx0dGVtcG9yYXJpbHkgZGlzYWJsZXMgdGhlIHNjcm9sbGJhcihzKSBcblx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdHVzYWdlOiAkKHNlbGVjdG9yKS5tQ3VzdG9tU2Nyb2xsYmFyKFwiZGlzYWJsZVwiLHJlc2V0KTsgXG5cdFx0XHRyZXNldCAoYm9vbGVhbik6IHJlc2V0cyBjb250ZW50IHBvc2l0aW9uIHRvIDAgXG5cdFx0XHQqL1xuXHRcdFx0ZGlzYWJsZTpmdW5jdGlvbihyKXtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBzZWxlY3Rvcj1fc2VsZWN0b3IuY2FsbCh0aGlzKTsgLyogdmFsaWRhdGUgc2VsZWN0b3IgKi9cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyICR0aGlzPSQodGhpcyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoJHRoaXMuZGF0YShwbHVnaW5QZngpKXsgLyogY2hlY2sgaWYgcGx1Z2luIGhhcyBpbml0aWFsaXplZCAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR2YXIgZD0kdGhpcy5kYXRhKHBsdWdpblBmeCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdF9hdXRvVXBkYXRlLmNhbGwodGhpcyxcInJlbW92ZVwiKTsgLyogcmVtb3ZlIGF1dG9tYXRpYyB1cGRhdGluZyAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRfdW5iaW5kRXZlbnRzLmNhbGwodGhpcyk7IC8qIHVuYmluZCBldmVudHMgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0aWYocil7X3Jlc2V0Q29udGVudFBvc2l0aW9uLmNhbGwodGhpcyk7fSAvKiByZXNldCBjb250ZW50IHBvc2l0aW9uICovXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdF9zY3JvbGxiYXJWaXNpYmlsaXR5LmNhbGwodGhpcyx0cnVlKTsgLyogc2hvdy9oaWRlIHNjcm9sbGJhcihzKSAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcyhjbGFzc2VzWzNdKTsgLyogYWRkIGRpc2FibGUgY2xhc3MgKi9cblx0XHRcdFx0XHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHQvKlxuXHRcdFx0cGx1Z2luIGRlc3Ryb3kgbWV0aG9kIFxuXHRcdFx0Y29tcGxldGVseSByZW1vdmVzIHRoZSBzY3JvbGxiYXIocykgYW5kIHJldHVybnMgdGhlIGVsZW1lbnQgdG8gaXRzIG9yaWdpbmFsIHN0YXRlXG5cdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHR1c2FnZTogJChzZWxlY3RvcikubUN1c3RvbVNjcm9sbGJhcihcImRlc3Ryb3lcIik7IFxuXHRcdFx0Ki9cblx0XHRcdGRlc3Ryb3k6ZnVuY3Rpb24oKXtcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBzZWxlY3Rvcj1fc2VsZWN0b3IuY2FsbCh0aGlzKTsgLyogdmFsaWRhdGUgc2VsZWN0b3IgKi9cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyICR0aGlzPSQodGhpcyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoJHRoaXMuZGF0YShwbHVnaW5QZngpKXsgLyogY2hlY2sgaWYgcGx1Z2luIGhhcyBpbml0aWFsaXplZCAqL1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0dmFyIGQ9JHRoaXMuZGF0YShwbHVnaW5QZngpLG89ZC5vcHQsXG5cdFx0XHRcdFx0XHRcdG1DdXN0b21TY3JvbGxCb3g9JChcIiNtQ1NCX1wiK2QuaWR4KSxcblx0XHRcdFx0XHRcdFx0bUNTQl9jb250YWluZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0XHRcdFx0c2Nyb2xsYmFyPSQoXCIubUNTQl9cIitkLmlkeCtcIl9zY3JvbGxiYXJcIik7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRpZihvLmxpdmUpe3JlbW92ZUxpdmVUaW1lcnMoby5saXZlU2VsZWN0b3IgfHwgJChzZWxlY3Rvcikuc2VsZWN0b3IpO30gLyogcmVtb3ZlIGxpdmUgdGltZXJzICovXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdF9hdXRvVXBkYXRlLmNhbGwodGhpcyxcInJlbW92ZVwiKTsgLyogcmVtb3ZlIGF1dG9tYXRpYyB1cGRhdGluZyAqL1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRfdW5iaW5kRXZlbnRzLmNhbGwodGhpcyk7IC8qIHVuYmluZCBldmVudHMgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0X3Jlc2V0Q29udGVudFBvc2l0aW9uLmNhbGwodGhpcyk7IC8qIHJlc2V0IGNvbnRlbnQgcG9zaXRpb24gKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlRGF0YShwbHVnaW5QZngpOyAvKiByZW1vdmUgcGx1Z2luIGRhdGEgb2JqZWN0ICovXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdF9kZWxldGUodGhpcyxcIm1jc1wiKTsgLyogZGVsZXRlIGNhbGxiYWNrcyBvYmplY3QgKi9cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0LyogcmVtb3ZlIHBsdWdpbiBtYXJrdXAgKi9cblx0XHRcdFx0XHRcdHNjcm9sbGJhci5yZW1vdmUoKTsgLyogcmVtb3ZlIHNjcm9sbGJhcihzKSBmaXJzdCAodGhvc2UgY2FuIGJlIGVpdGhlciBpbnNpZGUgb3Igb3V0c2lkZSBwbHVnaW4ncyBpbm5lciB3cmFwcGVyKSAqL1xuXHRcdFx0XHRcdFx0bUNTQl9jb250YWluZXIuZmluZChcImltZy5cIitjbGFzc2VzWzJdKS5yZW1vdmVDbGFzcyhjbGFzc2VzWzJdKTsgLyogcmVtb3ZlIGxvYWRlZCBpbWFnZXMgZmxhZyAqL1xuXHRcdFx0XHRcdFx0bUN1c3RvbVNjcm9sbEJveC5yZXBsYWNlV2l0aChtQ1NCX2NvbnRhaW5lci5jb250ZW50cygpKTsgLyogcmVwbGFjZSBwbHVnaW4ncyBpbm5lciB3cmFwcGVyIHdpdGggdGhlIG9yaWdpbmFsIGNvbnRlbnQgKi9cblx0XHRcdFx0XHRcdC8qIHJlbW92ZSBwbHVnaW4gY2xhc3NlcyBmcm9tIHRoZSBlbGVtZW50IGFuZCBhZGQgZGVzdHJveSBjbGFzcyAqL1xuXHRcdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MocGx1Z2luTlMrXCIgX1wiK3BsdWdpblBmeCtcIl9cIitkLmlkeCtcIiBcIitjbGFzc2VzWzZdK1wiIFwiK2NsYXNzZXNbN10rXCIgXCIrY2xhc3Nlc1s1XStcIiBcIitjbGFzc2VzWzNdKS5hZGRDbGFzcyhjbGFzc2VzWzRdKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcdFxuXHRcdH0sXG5cdFxuXHRcblx0XG5cdFxuXHRcdFxuXHQvKiBcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRGVU5DVElPTlNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQqL1xuXHRcblx0XHQvKiB2YWxpZGF0ZXMgc2VsZWN0b3IgKGlmIHNlbGVjdG9yIGlzIGludmFsaWQgb3IgdW5kZWZpbmVkIHVzZXMgdGhlIGRlZmF1bHQgb25lKSAqL1xuXHRcdF9zZWxlY3Rvcj1mdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICh0eXBlb2YgJCh0aGlzKSE9PVwib2JqZWN0XCIgfHwgJCh0aGlzKS5sZW5ndGg8MSkgPyBkZWZhdWx0U2VsZWN0b3IgOiB0aGlzO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBjaGFuZ2VzIG9wdGlvbnMgYWNjb3JkaW5nIHRvIHRoZW1lICovXG5cdFx0X3RoZW1lPWZ1bmN0aW9uKG9iail7XG5cdFx0XHR2YXIgZml4ZWRTaXplU2Nyb2xsYmFyVGhlbWVzPVtcInJvdW5kZWRcIixcInJvdW5kZWQtZGFya1wiLFwicm91bmRlZC1kb3RzXCIsXCJyb3VuZGVkLWRvdHMtZGFya1wiXSxcblx0XHRcdFx0bm9uRXhwYW5kZWRTY3JvbGxiYXJUaGVtZXM9W1wicm91bmRlZC1kb3RzXCIsXCJyb3VuZGVkLWRvdHMtZGFya1wiLFwiM2RcIixcIjNkLWRhcmtcIixcIjNkLXRoaWNrXCIsXCIzZC10aGljay1kYXJrXCIsXCJpbnNldFwiLFwiaW5zZXQtZGFya1wiLFwiaW5zZXQtMlwiLFwiaW5zZXQtMi1kYXJrXCIsXCJpbnNldC0zXCIsXCJpbnNldC0zLWRhcmtcIl0sXG5cdFx0XHRcdGRpc2FibGVkU2Nyb2xsQnV0dG9uc1RoZW1lcz1bXCJtaW5pbWFsXCIsXCJtaW5pbWFsLWRhcmtcIl0sXG5cdFx0XHRcdGVuYWJsZWRBdXRvSGlkZVNjcm9sbGJhclRoZW1lcz1bXCJtaW5pbWFsXCIsXCJtaW5pbWFsLWRhcmtcIl0sXG5cdFx0XHRcdHNjcm9sbGJhclBvc2l0aW9uT3V0c2lkZVRoZW1lcz1bXCJtaW5pbWFsXCIsXCJtaW5pbWFsLWRhcmtcIl07XG5cdFx0XHRvYmouYXV0b0RyYWdnZXJMZW5ndGg9JC5pbkFycmF5KG9iai50aGVtZSxmaXhlZFNpemVTY3JvbGxiYXJUaGVtZXMpID4gLTEgPyBmYWxzZSA6IG9iai5hdXRvRHJhZ2dlckxlbmd0aDtcblx0XHRcdG9iai5hdXRvRXhwYW5kU2Nyb2xsYmFyPSQuaW5BcnJheShvYmoudGhlbWUsbm9uRXhwYW5kZWRTY3JvbGxiYXJUaGVtZXMpID4gLTEgPyBmYWxzZSA6IG9iai5hdXRvRXhwYW5kU2Nyb2xsYmFyO1xuXHRcdFx0b2JqLnNjcm9sbEJ1dHRvbnMuZW5hYmxlPSQuaW5BcnJheShvYmoudGhlbWUsZGlzYWJsZWRTY3JvbGxCdXR0b25zVGhlbWVzKSA+IC0xID8gZmFsc2UgOiBvYmouc2Nyb2xsQnV0dG9ucy5lbmFibGU7XG5cdFx0XHRvYmouYXV0b0hpZGVTY3JvbGxiYXI9JC5pbkFycmF5KG9iai50aGVtZSxlbmFibGVkQXV0b0hpZGVTY3JvbGxiYXJUaGVtZXMpID4gLTEgPyB0cnVlIDogb2JqLmF1dG9IaWRlU2Nyb2xsYmFyO1xuXHRcdFx0b2JqLnNjcm9sbGJhclBvc2l0aW9uPSQuaW5BcnJheShvYmoudGhlbWUsc2Nyb2xsYmFyUG9zaXRpb25PdXRzaWRlVGhlbWVzKSA+IC0xID8gXCJvdXRzaWRlXCIgOiBvYmouc2Nyb2xsYmFyUG9zaXRpb247XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIGxpdmUgb3B0aW9uIHRpbWVycyByZW1vdmFsICovXG5cdFx0cmVtb3ZlTGl2ZVRpbWVycz1mdW5jdGlvbihzZWxlY3Rvcil7XG5cdFx0XHRpZihsaXZlVGltZXJzW3NlbGVjdG9yXSl7XG5cdFx0XHRcdGNsZWFyVGltZW91dChsaXZlVGltZXJzW3NlbGVjdG9yXSk7XG5cdFx0XHRcdF9kZWxldGUobGl2ZVRpbWVycyxzZWxlY3Rvcik7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIG5vcm1hbGl6ZXMgYXhpcyBvcHRpb24gdG8gdmFsaWQgdmFsdWVzOiBcInlcIiwgXCJ4XCIsIFwieXhcIiAqL1xuXHRcdF9maW5kQXhpcz1mdW5jdGlvbih2YWwpe1xuXHRcdFx0cmV0dXJuICh2YWw9PT1cInl4XCIgfHwgdmFsPT09XCJ4eVwiIHx8IHZhbD09PVwiYXV0b1wiKSA/IFwieXhcIiA6ICh2YWw9PT1cInhcIiB8fCB2YWw9PT1cImhvcml6b250YWxcIikgPyBcInhcIiA6IFwieVwiO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBub3JtYWxpemVzIHNjcm9sbEJ1dHRvbnMuc2Nyb2xsVHlwZSBvcHRpb24gdG8gdmFsaWQgdmFsdWVzOiBcInN0ZXBsZXNzXCIsIFwic3RlcHBlZFwiICovXG5cdFx0X2ZpbmRTY3JvbGxCdXR0b25zVHlwZT1mdW5jdGlvbih2YWwpe1xuXHRcdFx0cmV0dXJuICh2YWw9PT1cInN0ZXBwZWRcIiB8fCB2YWw9PT1cInBpeGVsc1wiIHx8IHZhbD09PVwic3RlcFwiIHx8IHZhbD09PVwiY2xpY2tcIikgPyBcInN0ZXBwZWRcIiA6IFwic3RlcGxlc3NcIjtcblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogZ2VuZXJhdGVzIHBsdWdpbiBtYXJrdXAgKi9cblx0XHRfcGx1Z2luTWFya3VwPWZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgJHRoaXM9JCh0aGlzKSxkPSR0aGlzLmRhdGEocGx1Z2luUGZ4KSxvPWQub3B0LFxuXHRcdFx0XHRleHBhbmRDbGFzcz1vLmF1dG9FeHBhbmRTY3JvbGxiYXIgPyBcIiBcIitjbGFzc2VzWzFdK1wiX2V4cGFuZFwiIDogXCJcIixcblx0XHRcdFx0c2Nyb2xsYmFyPVtcIjxkaXYgaWQ9J21DU0JfXCIrZC5pZHgrXCJfc2Nyb2xsYmFyX3ZlcnRpY2FsJyBjbGFzcz0nbUNTQl9zY3JvbGxUb29scyBtQ1NCX1wiK2QuaWR4K1wiX3Njcm9sbGJhciBtQ1MtXCIrby50aGVtZStcIiBtQ1NCX3Njcm9sbFRvb2xzX3ZlcnRpY2FsXCIrZXhwYW5kQ2xhc3MrXCInPjxkaXYgY2xhc3M9J1wiK2NsYXNzZXNbMTJdK1wiJz48ZGl2IGlkPSdtQ1NCX1wiK2QuaWR4K1wiX2RyYWdnZXJfdmVydGljYWwnIGNsYXNzPSdtQ1NCX2RyYWdnZXInIHN0eWxlPSdwb3NpdGlvbjphYnNvbHV0ZTsnPjxkaXYgY2xhc3M9J21DU0JfZHJhZ2dlcl9iYXInIC8+PC9kaXY+PGRpdiBjbGFzcz0nbUNTQl9kcmFnZ2VyUmFpbCcgLz48L2Rpdj48L2Rpdj5cIixcIjxkaXYgaWQ9J21DU0JfXCIrZC5pZHgrXCJfc2Nyb2xsYmFyX2hvcml6b250YWwnIGNsYXNzPSdtQ1NCX3Njcm9sbFRvb2xzIG1DU0JfXCIrZC5pZHgrXCJfc2Nyb2xsYmFyIG1DUy1cIitvLnRoZW1lK1wiIG1DU0Jfc2Nyb2xsVG9vbHNfaG9yaXpvbnRhbFwiK2V4cGFuZENsYXNzK1wiJz48ZGl2IGNsYXNzPSdcIitjbGFzc2VzWzEyXStcIic+PGRpdiBpZD0nbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX2hvcml6b250YWwnIGNsYXNzPSdtQ1NCX2RyYWdnZXInIHN0eWxlPSdwb3NpdGlvbjphYnNvbHV0ZTsnPjxkaXYgY2xhc3M9J21DU0JfZHJhZ2dlcl9iYXInIC8+PC9kaXY+PGRpdiBjbGFzcz0nbUNTQl9kcmFnZ2VyUmFpbCcgLz48L2Rpdj48L2Rpdj5cIl0sXG5cdFx0XHRcdHdyYXBwZXJDbGFzcz1vLmF4aXM9PT1cInl4XCIgPyBcIm1DU0JfdmVydGljYWxfaG9yaXpvbnRhbFwiIDogby5heGlzPT09XCJ4XCIgPyBcIm1DU0JfaG9yaXpvbnRhbFwiIDogXCJtQ1NCX3ZlcnRpY2FsXCIsXG5cdFx0XHRcdHNjcm9sbGJhcnM9by5heGlzPT09XCJ5eFwiID8gc2Nyb2xsYmFyWzBdK3Njcm9sbGJhclsxXSA6IG8uYXhpcz09PVwieFwiID8gc2Nyb2xsYmFyWzFdIDogc2Nyb2xsYmFyWzBdLFxuXHRcdFx0XHRjb250ZW50V3JhcHBlcj1vLmF4aXM9PT1cInl4XCIgPyBcIjxkaXYgaWQ9J21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyX3dyYXBwZXInIGNsYXNzPSdtQ1NCX2NvbnRhaW5lcl93cmFwcGVyJyAvPlwiIDogXCJcIixcblx0XHRcdFx0YXV0b0hpZGVDbGFzcz1vLmF1dG9IaWRlU2Nyb2xsYmFyID8gXCIgXCIrY2xhc3Nlc1s2XSA6IFwiXCIsXG5cdFx0XHRcdHNjcm9sbGJhckRpckNsYXNzPShvLmF4aXMhPT1cInhcIiAmJiBkLmxhbmdEaXI9PT1cInJ0bFwiKSA/IFwiIFwiK2NsYXNzZXNbN10gOiBcIlwiO1xuXHRcdFx0aWYoby5zZXRXaWR0aCl7JHRoaXMuY3NzKFwid2lkdGhcIixvLnNldFdpZHRoKTt9IC8qIHNldCBlbGVtZW50IHdpZHRoICovXG5cdFx0XHRpZihvLnNldEhlaWdodCl7JHRoaXMuY3NzKFwiaGVpZ2h0XCIsby5zZXRIZWlnaHQpO30gLyogc2V0IGVsZW1lbnQgaGVpZ2h0ICovXG5cdFx0XHRvLnNldExlZnQ9KG8uYXhpcyE9PVwieVwiICYmIGQubGFuZ0Rpcj09PVwicnRsXCIpID8gXCI5ODk5OTlweFwiIDogby5zZXRMZWZ0OyAvKiBhZGp1c3QgbGVmdCBwb3NpdGlvbiBmb3IgcnRsIGRpcmVjdGlvbiAqL1xuXHRcdFx0JHRoaXMuYWRkQ2xhc3MocGx1Z2luTlMrXCIgX1wiK3BsdWdpblBmeCtcIl9cIitkLmlkeCthdXRvSGlkZUNsYXNzK3Njcm9sbGJhckRpckNsYXNzKS53cmFwSW5uZXIoXCI8ZGl2IGlkPSdtQ1NCX1wiK2QuaWR4K1wiJyBjbGFzcz0nbUN1c3RvbVNjcm9sbEJveCBtQ1MtXCIrby50aGVtZStcIiBcIit3cmFwcGVyQ2xhc3MrXCInPjxkaXYgaWQ9J21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyJyBjbGFzcz0nbUNTQl9jb250YWluZXInIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTsgdG9wOlwiK28uc2V0VG9wK1wiOyBsZWZ0OlwiK28uc2V0TGVmdCtcIjsnIGRpcj0nXCIrZC5sYW5nRGlyK1wiJyAvPjwvZGl2PlwiKTtcblx0XHRcdHZhciBtQ3VzdG9tU2Nyb2xsQm94PSQoXCIjbUNTQl9cIitkLmlkeCksXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIik7XG5cdFx0XHRpZihvLmF4aXMhPT1cInlcIiAmJiAhby5hZHZhbmNlZC5hdXRvRXhwYW5kSG9yaXpvbnRhbFNjcm9sbCl7XG5cdFx0XHRcdG1DU0JfY29udGFpbmVyLmNzcyhcIndpZHRoXCIsX2NvbnRlbnRXaWR0aChtQ1NCX2NvbnRhaW5lcikpO1xuXHRcdFx0fVxuXHRcdFx0aWYoby5zY3JvbGxiYXJQb3NpdGlvbj09PVwib3V0c2lkZVwiKXtcblx0XHRcdFx0aWYoJHRoaXMuY3NzKFwicG9zaXRpb25cIik9PT1cInN0YXRpY1wiKXsgLyogcmVxdWlyZXMgZWxlbWVudHMgd2l0aCBub24tc3RhdGljIHBvc2l0aW9uICovXG5cdFx0XHRcdFx0JHRoaXMuY3NzKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCR0aGlzLmNzcyhcIm92ZXJmbG93XCIsXCJ2aXNpYmxlXCIpO1xuXHRcdFx0XHRtQ3VzdG9tU2Nyb2xsQm94LmFkZENsYXNzKFwibUNTQl9vdXRzaWRlXCIpLmFmdGVyKHNjcm9sbGJhcnMpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG1DdXN0b21TY3JvbGxCb3guYWRkQ2xhc3MoXCJtQ1NCX2luc2lkZVwiKS5hcHBlbmQoc2Nyb2xsYmFycyk7XG5cdFx0XHRcdG1DU0JfY29udGFpbmVyLndyYXAoY29udGVudFdyYXBwZXIpO1xuXHRcdFx0fVxuXHRcdFx0X3Njcm9sbEJ1dHRvbnMuY2FsbCh0aGlzKTsgLyogYWRkIHNjcm9sbGJhciBidXR0b25zICovXG5cdFx0XHQvKiBtaW5pbXVtIGRyYWdnZXIgbGVuZ3RoICovXG5cdFx0XHR2YXIgbUNTQl9kcmFnZ2VyPVskKFwiI21DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl92ZXJ0aWNhbFwiKSwkKFwiI21DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl9ob3Jpem9udGFsXCIpXTtcblx0XHRcdG1DU0JfZHJhZ2dlclswXS5jc3MoXCJtaW4taGVpZ2h0XCIsbUNTQl9kcmFnZ2VyWzBdLmhlaWdodCgpKTtcblx0XHRcdG1DU0JfZHJhZ2dlclsxXS5jc3MoXCJtaW4td2lkdGhcIixtQ1NCX2RyYWdnZXJbMV0ud2lkdGgoKSk7XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIGNhbGN1bGF0ZXMgY29udGVudCB3aWR0aCAqL1xuXHRcdF9jb250ZW50V2lkdGg9ZnVuY3Rpb24oZWwpe1xuXHRcdFx0dmFyIHZhbD1bZWxbMF0uc2Nyb2xsV2lkdGgsTWF0aC5tYXguYXBwbHkoTWF0aCxlbC5jaGlsZHJlbigpLm1hcChmdW5jdGlvbigpe3JldHVybiAkKHRoaXMpLm91dGVyV2lkdGgodHJ1ZSk7fSkuZ2V0KCkpXSx3PWVsLnBhcmVudCgpLndpZHRoKCk7XG5cdFx0XHRyZXR1cm4gdmFsWzBdPncgPyB2YWxbMF0gOiB2YWxbMV0+dyA/IHZhbFsxXSA6IFwiMTAwJVwiO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBleHBhbmRzIGNvbnRlbnQgaG9yaXpvbnRhbGx5ICovXG5cdFx0X2V4cGFuZENvbnRlbnRIb3Jpem9udGFsbHk9ZnVuY3Rpb24oKXtcblx0XHRcdHZhciAkdGhpcz0kKHRoaXMpLGQ9JHRoaXMuZGF0YShwbHVnaW5QZngpLG89ZC5vcHQsXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIik7XG5cdFx0XHRpZihvLmFkdmFuY2VkLmF1dG9FeHBhbmRIb3Jpem9udGFsU2Nyb2xsICYmIG8uYXhpcyE9PVwieVwiKXtcblx0XHRcdFx0LyogY2FsY3VsYXRlIHNjcm9sbFdpZHRoICovXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyLmNzcyh7XCJ3aWR0aFwiOlwiYXV0b1wiLFwibWluLXdpZHRoXCI6MCxcIm92ZXJmbG93LXhcIjpcInNjcm9sbFwifSk7XG5cdFx0XHRcdHZhciB3PU1hdGguY2VpbChtQ1NCX2NvbnRhaW5lclswXS5zY3JvbGxXaWR0aCk7XG5cdFx0XHRcdGlmKG8uYWR2YW5jZWQuYXV0b0V4cGFuZEhvcml6b250YWxTY3JvbGw9PT0zIHx8IChvLmFkdmFuY2VkLmF1dG9FeHBhbmRIb3Jpem9udGFsU2Nyb2xsIT09MiAmJiB3Pm1DU0JfY29udGFpbmVyLnBhcmVudCgpLndpZHRoKCkpKXtcblx0XHRcdFx0XHRtQ1NCX2NvbnRhaW5lci5jc3Moe1wid2lkdGhcIjp3LFwibWluLXdpZHRoXCI6XCIxMDAlXCIsXCJvdmVyZmxvdy14XCI6XCJpbmhlcml0XCJ9KTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0LyogXG5cdFx0XHRcdFx0d3JhcCBjb250ZW50IHdpdGggYW4gaW5maW5pdGUgd2lkdGggZGl2IGFuZCBzZXQgaXRzIHBvc2l0aW9uIHRvIGFic29sdXRlIGFuZCB3aWR0aCB0byBhdXRvLiBcblx0XHRcdFx0XHRTZXR0aW5nIHdpZHRoIHRvIGF1dG8gYmVmb3JlIGNhbGN1bGF0aW5nIHRoZSBhY3R1YWwgd2lkdGggaXMgaW1wb3J0YW50ISBcblx0XHRcdFx0XHRXZSBtdXN0IGxldCB0aGUgYnJvd3NlciBzZXQgdGhlIHdpZHRoIGFzIGJyb3dzZXIgem9vbSB2YWx1ZXMgYXJlIGltcG9zc2libGUgdG8gY2FsY3VsYXRlLlxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0bUNTQl9jb250YWluZXIuY3NzKHtcIm92ZXJmbG93LXhcIjpcImluaGVyaXRcIixcInBvc2l0aW9uXCI6XCJhYnNvbHV0ZVwifSlcblx0XHRcdFx0XHRcdC53cmFwKFwiPGRpdiBjbGFzcz0nbUNTQl9oX3dyYXBwZXInIHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTsgbGVmdDowOyB3aWR0aDo5OTk5OTlweDsnIC8+XCIpXG5cdFx0XHRcdFx0XHQuY3NzKHsgLyogc2V0IGFjdHVhbCB3aWR0aCwgb3JpZ2luYWwgcG9zaXRpb24gYW5kIHVuLXdyYXAgKi9cblx0XHRcdFx0XHRcdFx0LyogXG5cdFx0XHRcdFx0XHRcdGdldCB0aGUgZXhhY3Qgd2lkdGggKHdpdGggZGVjaW1hbHMpIGFuZCB0aGVuIHJvdW5kLXVwLiBcblx0XHRcdFx0XHRcdFx0VXNpbmcganF1ZXJ5IG91dGVyV2lkdGgoKSB3aWxsIHJvdW5kIHRoZSB3aWR0aCB2YWx1ZSB3aGljaCB3aWxsIG1lc3MgdXAgd2l0aCBpbm5lciBlbGVtZW50cyB0aGF0IGhhdmUgbm9uLWludGVnZXIgd2lkdGhcblx0XHRcdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcdFx0XCJ3aWR0aFwiOihNYXRoLmNlaWwobUNTQl9jb250YWluZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQrMC40KS1NYXRoLmZsb29yKG1DU0JfY29udGFpbmVyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpKSxcblx0XHRcdFx0XHRcdFx0XCJtaW4td2lkdGhcIjpcIjEwMCVcIixcblx0XHRcdFx0XHRcdFx0XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIlxuXHRcdFx0XHRcdFx0fSkudW53cmFwKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogYWRkcyBzY3JvbGxiYXIgYnV0dG9ucyAqL1xuXHRcdF9zY3JvbGxCdXR0b25zPWZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgJHRoaXM9JCh0aGlzKSxkPSR0aGlzLmRhdGEocGx1Z2luUGZ4KSxvPWQub3B0LFxuXHRcdFx0XHRtQ1NCX3Njcm9sbFRvb2xzPSQoXCIubUNTQl9cIitkLmlkeCtcIl9zY3JvbGxiYXI6Zmlyc3RcIiksXG5cdFx0XHRcdHRhYmluZGV4PSFfaXNOdW1lcmljKG8uc2Nyb2xsQnV0dG9ucy50YWJpbmRleCkgPyBcIlwiIDogXCJ0YWJpbmRleD0nXCIrby5zY3JvbGxCdXR0b25zLnRhYmluZGV4K1wiJ1wiLFxuXHRcdFx0XHRidG5IVE1MPVtcblx0XHRcdFx0XHRcIjxhIGhyZWY9JyMnIGNsYXNzPSdcIitjbGFzc2VzWzEzXStcIicgXCIrdGFiaW5kZXgrXCIgLz5cIixcblx0XHRcdFx0XHRcIjxhIGhyZWY9JyMnIGNsYXNzPSdcIitjbGFzc2VzWzE0XStcIicgXCIrdGFiaW5kZXgrXCIgLz5cIixcblx0XHRcdFx0XHRcIjxhIGhyZWY9JyMnIGNsYXNzPSdcIitjbGFzc2VzWzE1XStcIicgXCIrdGFiaW5kZXgrXCIgLz5cIixcblx0XHRcdFx0XHRcIjxhIGhyZWY9JyMnIGNsYXNzPSdcIitjbGFzc2VzWzE2XStcIicgXCIrdGFiaW5kZXgrXCIgLz5cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRidG49WyhvLmF4aXM9PT1cInhcIiA/IGJ0bkhUTUxbMl0gOiBidG5IVE1MWzBdKSwoby5heGlzPT09XCJ4XCIgPyBidG5IVE1MWzNdIDogYnRuSFRNTFsxXSksYnRuSFRNTFsyXSxidG5IVE1MWzNdXTtcblx0XHRcdGlmKG8uc2Nyb2xsQnV0dG9ucy5lbmFibGUpe1xuXHRcdFx0XHRtQ1NCX3Njcm9sbFRvb2xzLnByZXBlbmQoYnRuWzBdKS5hcHBlbmQoYnRuWzFdKS5uZXh0KFwiLm1DU0Jfc2Nyb2xsVG9vbHNcIikucHJlcGVuZChidG5bMl0pLmFwcGVuZChidG5bM10pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBhdXRvLWFkanVzdHMgc2Nyb2xsYmFyIGRyYWdnZXIgbGVuZ3RoICovXG5cdFx0X3NldERyYWdnZXJMZW5ndGg9ZnVuY3Rpb24oKXtcblx0XHRcdHZhciAkdGhpcz0kKHRoaXMpLGQ9JHRoaXMuZGF0YShwbHVnaW5QZngpLFxuXHRcdFx0XHRtQ3VzdG9tU2Nyb2xsQm94PSQoXCIjbUNTQl9cIitkLmlkeCksXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIiksXG5cdFx0XHRcdG1DU0JfZHJhZ2dlcj1bJChcIiNtQ1NCX1wiK2QuaWR4K1wiX2RyYWdnZXJfdmVydGljYWxcIiksJChcIiNtQ1NCX1wiK2QuaWR4K1wiX2RyYWdnZXJfaG9yaXpvbnRhbFwiKV0sXG5cdFx0XHRcdHJhdGlvPVttQ3VzdG9tU2Nyb2xsQm94LmhlaWdodCgpL21DU0JfY29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKSxtQ3VzdG9tU2Nyb2xsQm94LndpZHRoKCkvbUNTQl9jb250YWluZXIub3V0ZXJXaWR0aChmYWxzZSldLFxuXHRcdFx0XHRsPVtcblx0XHRcdFx0XHRwYXJzZUludChtQ1NCX2RyYWdnZXJbMF0uY3NzKFwibWluLWhlaWdodFwiKSksTWF0aC5yb3VuZChyYXRpb1swXSptQ1NCX2RyYWdnZXJbMF0ucGFyZW50KCkuaGVpZ2h0KCkpLFxuXHRcdFx0XHRcdHBhcnNlSW50KG1DU0JfZHJhZ2dlclsxXS5jc3MoXCJtaW4td2lkdGhcIikpLE1hdGgucm91bmQocmF0aW9bMV0qbUNTQl9kcmFnZ2VyWzFdLnBhcmVudCgpLndpZHRoKCkpXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGg9b2xkSUUgJiYgKGxbMV08bFswXSkgPyBsWzBdIDogbFsxXSx3PW9sZElFICYmIChsWzNdPGxbMl0pID8gbFsyXSA6IGxbM107XG5cdFx0XHRtQ1NCX2RyYWdnZXJbMF0uY3NzKHtcblx0XHRcdFx0XCJoZWlnaHRcIjpoLFwibWF4LWhlaWdodFwiOihtQ1NCX2RyYWdnZXJbMF0ucGFyZW50KCkuaGVpZ2h0KCktMTApXG5cdFx0XHR9KS5maW5kKFwiLm1DU0JfZHJhZ2dlcl9iYXJcIikuY3NzKHtcImxpbmUtaGVpZ2h0XCI6bFswXStcInB4XCJ9KTtcblx0XHRcdG1DU0JfZHJhZ2dlclsxXS5jc3Moe1xuXHRcdFx0XHRcIndpZHRoXCI6dyxcIm1heC13aWR0aFwiOihtQ1NCX2RyYWdnZXJbMV0ucGFyZW50KCkud2lkdGgoKS0xMClcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBjYWxjdWxhdGVzIHNjcm9sbGJhciB0byBjb250ZW50IHJhdGlvICovXG5cdFx0X3Njcm9sbFJhdGlvPWZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgJHRoaXM9JCh0aGlzKSxkPSR0aGlzLmRhdGEocGx1Z2luUGZ4KSxcblx0XHRcdFx0bUN1c3RvbVNjcm9sbEJveD0kKFwiI21DU0JfXCIrZC5pZHgpLFxuXHRcdFx0XHRtQ1NCX2NvbnRhaW5lcj0kKFwiI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyXCIpLFxuXHRcdFx0XHRtQ1NCX2RyYWdnZXI9WyQoXCIjbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX3ZlcnRpY2FsXCIpLCQoXCIjbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX2hvcml6b250YWxcIildLFxuXHRcdFx0XHRzY3JvbGxBbW91bnQ9W21DU0JfY29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKS1tQ3VzdG9tU2Nyb2xsQm94LmhlaWdodCgpLG1DU0JfY29udGFpbmVyLm91dGVyV2lkdGgoZmFsc2UpLW1DdXN0b21TY3JvbGxCb3gud2lkdGgoKV0sXG5cdFx0XHRcdHJhdGlvPVtcblx0XHRcdFx0XHRzY3JvbGxBbW91bnRbMF0vKG1DU0JfZHJhZ2dlclswXS5wYXJlbnQoKS5oZWlnaHQoKS1tQ1NCX2RyYWdnZXJbMF0uaGVpZ2h0KCkpLFxuXHRcdFx0XHRcdHNjcm9sbEFtb3VudFsxXS8obUNTQl9kcmFnZ2VyWzFdLnBhcmVudCgpLndpZHRoKCktbUNTQl9kcmFnZ2VyWzFdLndpZHRoKCkpXG5cdFx0XHRcdF07XG5cdFx0XHRkLnNjcm9sbFJhdGlvPXt5OnJhdGlvWzBdLHg6cmF0aW9bMV19O1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiB0b2dnbGVzIHNjcm9sbGluZyBjbGFzc2VzICovXG5cdFx0X29uRHJhZ0NsYXNzZXM9ZnVuY3Rpb24oZWwsYWN0aW9uLHhwbmQpe1xuXHRcdFx0dmFyIGV4cGFuZENsYXNzPXhwbmQgPyBjbGFzc2VzWzBdK1wiX2V4cGFuZGVkXCIgOiBcIlwiLFxuXHRcdFx0XHRzY3JvbGxiYXI9ZWwuY2xvc2VzdChcIi5tQ1NCX3Njcm9sbFRvb2xzXCIpO1xuXHRcdFx0aWYoYWN0aW9uPT09XCJhY3RpdmVcIil7XG5cdFx0XHRcdGVsLnRvZ2dsZUNsYXNzKGNsYXNzZXNbMF0rXCIgXCIrZXhwYW5kQ2xhc3MpOyBzY3JvbGxiYXIudG9nZ2xlQ2xhc3MoY2xhc3Nlc1sxXSk7IFxuXHRcdFx0XHRlbFswXS5fZHJhZ2dhYmxlPWVsWzBdLl9kcmFnZ2FibGUgPyAwIDogMTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZighZWxbMF0uX2RyYWdnYWJsZSl7XG5cdFx0XHRcdFx0aWYoYWN0aW9uPT09XCJoaWRlXCIpe1xuXHRcdFx0XHRcdFx0ZWwucmVtb3ZlQ2xhc3MoY2xhc3Nlc1swXSk7IHNjcm9sbGJhci5yZW1vdmVDbGFzcyhjbGFzc2VzWzFdKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGVsLmFkZENsYXNzKGNsYXNzZXNbMF0pOyBzY3JvbGxiYXIuYWRkQ2xhc3MoY2xhc3Nlc1sxXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIGNoZWNrcyBpZiBjb250ZW50IG92ZXJmbG93cyBpdHMgY29udGFpbmVyIHRvIGRldGVybWluZSBpZiBzY3JvbGxpbmcgaXMgcmVxdWlyZWQgKi9cblx0XHRfb3ZlcmZsb3dlZD1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksXG5cdFx0XHRcdG1DdXN0b21TY3JvbGxCb3g9JChcIiNtQ1NCX1wiK2QuaWR4KSxcblx0XHRcdFx0bUNTQl9jb250YWluZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0Y29udGVudEhlaWdodD1kLm92ZXJmbG93ZWQ9PW51bGwgPyBtQ1NCX2NvbnRhaW5lci5oZWlnaHQoKSA6IG1DU0JfY29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKSxcblx0XHRcdFx0Y29udGVudFdpZHRoPWQub3ZlcmZsb3dlZD09bnVsbCA/IG1DU0JfY29udGFpbmVyLndpZHRoKCkgOiBtQ1NCX2NvbnRhaW5lci5vdXRlcldpZHRoKGZhbHNlKSxcblx0XHRcdFx0aD1tQ1NCX2NvbnRhaW5lclswXS5zY3JvbGxIZWlnaHQsdz1tQ1NCX2NvbnRhaW5lclswXS5zY3JvbGxXaWR0aDtcblx0XHRcdGlmKGg+Y29udGVudEhlaWdodCl7Y29udGVudEhlaWdodD1oO31cblx0XHRcdGlmKHc+Y29udGVudFdpZHRoKXtjb250ZW50V2lkdGg9dzt9XG5cdFx0XHRyZXR1cm4gW2NvbnRlbnRIZWlnaHQ+bUN1c3RvbVNjcm9sbEJveC5oZWlnaHQoKSxjb250ZW50V2lkdGg+bUN1c3RvbVNjcm9sbEJveC53aWR0aCgpXTtcblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogcmVzZXRzIGNvbnRlbnQgcG9zaXRpb24gdG8gMCAqL1xuXHRcdF9yZXNldENvbnRlbnRQb3NpdGlvbj1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0bUN1c3RvbVNjcm9sbEJveD0kKFwiI21DU0JfXCIrZC5pZHgpLFxuXHRcdFx0XHRtQ1NCX2NvbnRhaW5lcj0kKFwiI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyXCIpLFxuXHRcdFx0XHRtQ1NCX2RyYWdnZXI9WyQoXCIjbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX3ZlcnRpY2FsXCIpLCQoXCIjbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX2hvcml6b250YWxcIildO1xuXHRcdFx0X3N0b3AoJHRoaXMpOyAvKiBzdG9wIGFueSBjdXJyZW50IHNjcm9sbGluZyBiZWZvcmUgcmVzZXR0aW5nICovXG5cdFx0XHRpZigoby5heGlzIT09XCJ4XCIgJiYgIWQub3ZlcmZsb3dlZFswXSkgfHwgKG8uYXhpcz09PVwieVwiICYmIGQub3ZlcmZsb3dlZFswXSkpeyAvKiByZXNldCB5ICovXG5cdFx0XHRcdG1DU0JfZHJhZ2dlclswXS5hZGQobUNTQl9jb250YWluZXIpLmNzcyhcInRvcFwiLDApO1xuXHRcdFx0XHRfc2Nyb2xsVG8oJHRoaXMsXCJfcmVzZXRZXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYoKG8uYXhpcyE9PVwieVwiICYmICFkLm92ZXJmbG93ZWRbMV0pIHx8IChvLmF4aXM9PT1cInhcIiAmJiBkLm92ZXJmbG93ZWRbMV0pKXsgLyogcmVzZXQgeCAqL1xuXHRcdFx0XHR2YXIgY3g9ZHg9MDtcblx0XHRcdFx0aWYoZC5sYW5nRGlyPT09XCJydGxcIil7IC8qIGFkanVzdCBsZWZ0IHBvc2l0aW9uIGZvciBydGwgZGlyZWN0aW9uICovXG5cdFx0XHRcdFx0Y3g9bUN1c3RvbVNjcm9sbEJveC53aWR0aCgpLW1DU0JfY29udGFpbmVyLm91dGVyV2lkdGgoZmFsc2UpO1xuXHRcdFx0XHRcdGR4PU1hdGguYWJzKGN4L2Quc2Nyb2xsUmF0aW8ueCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bUNTQl9jb250YWluZXIuY3NzKFwibGVmdFwiLGN4KTtcblx0XHRcdFx0bUNTQl9kcmFnZ2VyWzFdLmNzcyhcImxlZnRcIixkeCk7XG5cdFx0XHRcdF9zY3JvbGxUbygkdGhpcyxcIl9yZXNldFhcIik7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIGJpbmRzIHNjcm9sbGJhciBldmVudHMgKi9cblx0XHRfYmluZEV2ZW50cz1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdDtcblx0XHRcdGlmKCFkLmJpbmRFdmVudHMpeyAvKiBjaGVjayBpZiBldmVudHMgYXJlIGFscmVhZHkgYm91bmQgKi9cblx0XHRcdFx0X2RyYWdnYWJsZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRpZihvLmNvbnRlbnRUb3VjaFNjcm9sbCl7X2NvbnRlbnREcmFnZ2FibGUuY2FsbCh0aGlzKTt9XG5cdFx0XHRcdF9zZWxlY3RhYmxlLmNhbGwodGhpcyk7XG5cdFx0XHRcdGlmKG8ubW91c2VXaGVlbC5lbmFibGUpeyAvKiBiaW5kIG1vdXNld2hlZWwgZm4gd2hlbiBwbHVnaW4gaXMgYXZhaWxhYmxlICovXG5cdFx0XHRcdFx0ZnVuY3Rpb24gX213dCgpe1xuXHRcdFx0XHRcdFx0bW91c2V3aGVlbFRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRpZighJC5ldmVudC5zcGVjaWFsLm1vdXNld2hlZWwpe1xuXHRcdFx0XHRcdFx0XHRcdF9td3QoKTtcblx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG1vdXNld2hlZWxUaW1lb3V0KTtcblx0XHRcdFx0XHRcdFx0XHRfbW91c2V3aGVlbC5jYWxsKCR0aGlzWzBdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSwxMDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgbW91c2V3aGVlbFRpbWVvdXQ7XG5cdFx0XHRcdFx0X213dCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9kcmFnZ2VyUmFpbC5jYWxsKHRoaXMpO1xuXHRcdFx0XHRfd3JhcHBlclNjcm9sbC5jYWxsKHRoaXMpO1xuXHRcdFx0XHRpZihvLmFkdmFuY2VkLmF1dG9TY3JvbGxPbkZvY3VzKXtfZm9jdXMuY2FsbCh0aGlzKTt9XG5cdFx0XHRcdGlmKG8uc2Nyb2xsQnV0dG9ucy5lbmFibGUpe19idXR0b25zLmNhbGwodGhpcyk7fVxuXHRcdFx0XHRpZihvLmtleWJvYXJkLmVuYWJsZSl7X2tleWJvYXJkLmNhbGwodGhpcyk7fVxuXHRcdFx0XHRkLmJpbmRFdmVudHM9dHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogdW5iaW5kcyBzY3JvbGxiYXIgZXZlbnRzICovXG5cdFx0X3VuYmluZEV2ZW50cz1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0bmFtZXNwYWNlPXBsdWdpblBmeCtcIl9cIitkLmlkeCxcblx0XHRcdFx0c2I9XCIubUNTQl9cIitkLmlkeCtcIl9zY3JvbGxiYXJcIixcblx0XHRcdFx0c2VsPSQoXCIjbUNTQl9cIitkLmlkeCtcIiwjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXIsI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyX3dyYXBwZXIsXCIrc2IrXCIgLlwiK2NsYXNzZXNbMTJdK1wiLCNtQ1NCX1wiK2QuaWR4K1wiX2RyYWdnZXJfdmVydGljYWwsI21DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl9ob3Jpem9udGFsLFwiK3NiK1wiPmFcIiksXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIik7XG5cdFx0XHRpZihvLmFkdmFuY2VkLnJlbGVhc2VEcmFnZ2FibGVTZWxlY3RvcnMpe3NlbC5hZGQoJChvLmFkdmFuY2VkLnJlbGVhc2VEcmFnZ2FibGVTZWxlY3RvcnMpKTt9XG5cdFx0XHRpZihvLmFkdmFuY2VkLmV4dHJhRHJhZ2dhYmxlU2VsZWN0b3JzKXtzZWwuYWRkKCQoby5hZHZhbmNlZC5leHRyYURyYWdnYWJsZVNlbGVjdG9ycykpO31cblx0XHRcdGlmKGQuYmluZEV2ZW50cyl7IC8qIGNoZWNrIGlmIGV2ZW50cyBhcmUgYm91bmQgKi9cblx0XHRcdFx0LyogdW5iaW5kIG5hbWVzcGFjZWQgZXZlbnRzIGZyb20gZG9jdW1lbnQvc2VsZWN0b3JzICovXG5cdFx0XHRcdCQoZG9jdW1lbnQpLmFkZCgkKCFfY2FuQWNjZXNzSUZyYW1lKCkgfHwgdG9wLmRvY3VtZW50KSkudW5iaW5kKFwiLlwiK25hbWVzcGFjZSk7XG5cdFx0XHRcdHNlbC5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCh0aGlzKS51bmJpbmQoXCIuXCIrbmFtZXNwYWNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdC8qIGNsZWFyIGFuZCBkZWxldGUgdGltZW91dHMvb2JqZWN0cyAqL1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoJHRoaXNbMF0uX2ZvY3VzVGltZW91dCk7IF9kZWxldGUoJHRoaXNbMF0sXCJfZm9jdXNUaW1lb3V0XCIpO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoZC5zZXF1ZW50aWFsLnN0ZXApOyBfZGVsZXRlKGQuc2VxdWVudGlhbCxcInN0ZXBcIik7XG5cdFx0XHRcdGNsZWFyVGltZW91dChtQ1NCX2NvbnRhaW5lclswXS5vbkNvbXBsZXRlVGltZW91dCk7IF9kZWxldGUobUNTQl9jb250YWluZXJbMF0sXCJvbkNvbXBsZXRlVGltZW91dFwiKTtcblx0XHRcdFx0ZC5iaW5kRXZlbnRzPWZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiB0b2dnbGVzIHNjcm9sbGJhciB2aXNpYmlsaXR5ICovXG5cdFx0X3Njcm9sbGJhclZpc2liaWxpdHk9ZnVuY3Rpb24oZGlzYWJsZWQpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0Y29udGVudFdyYXBwZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lcl93cmFwcGVyXCIpLFxuXHRcdFx0XHRjb250ZW50PWNvbnRlbnRXcmFwcGVyLmxlbmd0aCA/IGNvbnRlbnRXcmFwcGVyIDogJChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0c2Nyb2xsYmFyPVskKFwiI21DU0JfXCIrZC5pZHgrXCJfc2Nyb2xsYmFyX3ZlcnRpY2FsXCIpLCQoXCIjbUNTQl9cIitkLmlkeCtcIl9zY3JvbGxiYXJfaG9yaXpvbnRhbFwiKV0sXG5cdFx0XHRcdG1DU0JfZHJhZ2dlcj1bc2Nyb2xsYmFyWzBdLmZpbmQoXCIubUNTQl9kcmFnZ2VyXCIpLHNjcm9sbGJhclsxXS5maW5kKFwiLm1DU0JfZHJhZ2dlclwiKV07XG5cdFx0XHRpZihvLmF4aXMhPT1cInhcIil7XG5cdFx0XHRcdGlmKGQub3ZlcmZsb3dlZFswXSAmJiAhZGlzYWJsZWQpe1xuXHRcdFx0XHRcdHNjcm9sbGJhclswXS5hZGQobUNTQl9kcmFnZ2VyWzBdKS5hZGQoc2Nyb2xsYmFyWzBdLmNoaWxkcmVuKFwiYVwiKSkuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIik7XG5cdFx0XHRcdFx0Y29udGVudC5yZW1vdmVDbGFzcyhjbGFzc2VzWzhdK1wiIFwiK2NsYXNzZXNbMTBdKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0aWYoby5hbHdheXNTaG93U2Nyb2xsYmFyKXtcblx0XHRcdFx0XHRcdGlmKG8uYWx3YXlzU2hvd1Njcm9sbGJhciE9PTIpe21DU0JfZHJhZ2dlclswXS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO31cblx0XHRcdFx0XHRcdGNvbnRlbnQucmVtb3ZlQ2xhc3MoY2xhc3Nlc1sxMF0pO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0c2Nyb2xsYmFyWzBdLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7XG5cdFx0XHRcdFx0XHRjb250ZW50LmFkZENsYXNzKGNsYXNzZXNbMTBdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29udGVudC5hZGRDbGFzcyhjbGFzc2VzWzhdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoby5heGlzIT09XCJ5XCIpe1xuXHRcdFx0XHRpZihkLm92ZXJmbG93ZWRbMV0gJiYgIWRpc2FibGVkKXtcblx0XHRcdFx0XHRzY3JvbGxiYXJbMV0uYWRkKG1DU0JfZHJhZ2dlclsxXSkuYWRkKHNjcm9sbGJhclsxXS5jaGlsZHJlbihcImFcIikpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xuXHRcdFx0XHRcdGNvbnRlbnQucmVtb3ZlQ2xhc3MoY2xhc3Nlc1s5XStcIiBcIitjbGFzc2VzWzExXSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGlmKG8uYWx3YXlzU2hvd1Njcm9sbGJhcil7XG5cdFx0XHRcdFx0XHRpZihvLmFsd2F5c1Nob3dTY3JvbGxiYXIhPT0yKXttQ1NCX2RyYWdnZXJbMV0uY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTt9XG5cdFx0XHRcdFx0XHRjb250ZW50LnJlbW92ZUNsYXNzKGNsYXNzZXNbMTFdKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHNjcm9sbGJhclsxXS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO1xuXHRcdFx0XHRcdFx0Y29udGVudC5hZGRDbGFzcyhjbGFzc2VzWzExXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnRlbnQuYWRkQ2xhc3MoY2xhc3Nlc1s5XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCFkLm92ZXJmbG93ZWRbMF0gJiYgIWQub3ZlcmZsb3dlZFsxXSl7XG5cdFx0XHRcdCR0aGlzLmFkZENsYXNzKGNsYXNzZXNbNV0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKGNsYXNzZXNbNV0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiByZXR1cm5zIGlucHV0IGNvb3JkaW5hdGVzIG9mIHBvaW50ZXIsIHRvdWNoIGFuZCBtb3VzZSBldmVudHMgKHJlbGF0aXZlIHRvIGRvY3VtZW50KSAqL1xuXHRcdF9jb29yZGluYXRlcz1mdW5jdGlvbihlKXtcblx0XHRcdHZhciB0PWUudHlwZSxvPWUudGFyZ2V0Lm93bmVyRG9jdW1lbnQhPT1kb2N1bWVudCAmJiBmcmFtZUVsZW1lbnQhPT1udWxsID8gWyQoZnJhbWVFbGVtZW50KS5vZmZzZXQoKS50b3AsJChmcmFtZUVsZW1lbnQpLm9mZnNldCgpLmxlZnRdIDogbnVsbCxcblx0XHRcdFx0aW89X2NhbkFjY2Vzc0lGcmFtZSgpICYmIGUudGFyZ2V0Lm93bmVyRG9jdW1lbnQhPT10b3AuZG9jdW1lbnQgJiYgZnJhbWVFbGVtZW50IT09bnVsbCA/IFskKGUudmlldy5mcmFtZUVsZW1lbnQpLm9mZnNldCgpLnRvcCwkKGUudmlldy5mcmFtZUVsZW1lbnQpLm9mZnNldCgpLmxlZnRdIDogWzAsMF07XG5cdFx0XHRzd2l0Y2godCl7XG5cdFx0XHRcdGNhc2UgXCJwb2ludGVyZG93blwiOiBjYXNlIFwiTVNQb2ludGVyRG93blwiOiBjYXNlIFwicG9pbnRlcm1vdmVcIjogY2FzZSBcIk1TUG9pbnRlck1vdmVcIjogY2FzZSBcInBvaW50ZXJ1cFwiOiBjYXNlIFwiTVNQb2ludGVyVXBcIjpcblx0XHRcdFx0XHRyZXR1cm4gbyA/IFtlLm9yaWdpbmFsRXZlbnQucGFnZVktb1swXStpb1swXSxlLm9yaWdpbmFsRXZlbnQucGFnZVgtb1sxXStpb1sxXSxmYWxzZV0gOiBbZS5vcmlnaW5hbEV2ZW50LnBhZ2VZLGUub3JpZ2luYWxFdmVudC5wYWdlWCxmYWxzZV07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ0b3VjaHN0YXJ0XCI6IGNhc2UgXCJ0b3VjaG1vdmVcIjogY2FzZSBcInRvdWNoZW5kXCI6XG5cdFx0XHRcdFx0dmFyIHRvdWNoPWUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdIHx8IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSxcblx0XHRcdFx0XHRcdHRvdWNoZXM9ZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoIHx8IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7XG5cdFx0XHRcdFx0cmV0dXJuIGUudGFyZ2V0Lm93bmVyRG9jdW1lbnQhPT1kb2N1bWVudCA/IFt0b3VjaC5zY3JlZW5ZLHRvdWNoLnNjcmVlblgsdG91Y2hlcz4xXSA6IFt0b3VjaC5wYWdlWSx0b3VjaC5wYWdlWCx0b3VjaGVzPjFdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBvID8gW2UucGFnZVktb1swXStpb1swXSxlLnBhZ2VYLW9bMV0raW9bMV0sZmFsc2VdIDogW2UucGFnZVksZS5wYWdlWCxmYWxzZV07XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIFxuXHRcdFNDUk9MTEJBUiBEUkFHIEVWRU5UU1xuXHRcdHNjcm9sbHMgY29udGVudCB2aWEgc2Nyb2xsYmFyIGRyYWdnaW5nIFxuXHRcdCovXG5cdFx0X2RyYWdnYWJsZT1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0bmFtZXNwYWNlPXBsdWdpblBmeCtcIl9cIitkLmlkeCxcblx0XHRcdFx0ZHJhZ2dlcklkPVtcIm1DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl92ZXJ0aWNhbFwiLFwibUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX2hvcml6b250YWxcIl0sXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIiksXG5cdFx0XHRcdG1DU0JfZHJhZ2dlcj0kKFwiI1wiK2RyYWdnZXJJZFswXStcIiwjXCIrZHJhZ2dlcklkWzFdKSxcblx0XHRcdFx0ZHJhZ2dhYmxlLGRyYWdZLGRyYWdYLFxuXHRcdFx0XHRyZHM9by5hZHZhbmNlZC5yZWxlYXNlRHJhZ2dhYmxlU2VsZWN0b3JzID8gbUNTQl9kcmFnZ2VyLmFkZCgkKG8uYWR2YW5jZWQucmVsZWFzZURyYWdnYWJsZVNlbGVjdG9ycykpIDogbUNTQl9kcmFnZ2VyLFxuXHRcdFx0XHRlZHM9by5hZHZhbmNlZC5leHRyYURyYWdnYWJsZVNlbGVjdG9ycyA/ICQoIV9jYW5BY2Nlc3NJRnJhbWUoKSB8fCB0b3AuZG9jdW1lbnQpLmFkZCgkKG8uYWR2YW5jZWQuZXh0cmFEcmFnZ2FibGVTZWxlY3RvcnMpKSA6ICQoIV9jYW5BY2Nlc3NJRnJhbWUoKSB8fCB0b3AuZG9jdW1lbnQpO1xuXHRcdFx0bUNTQl9kcmFnZ2VyLmJpbmQoXCJjb250ZXh0bWVudS5cIituYW1lc3BhY2UsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy9wcmV2ZW50IHJpZ2h0IGNsaWNrXG5cdFx0XHR9KS5iaW5kKFwibW91c2Vkb3duLlwiK25hbWVzcGFjZStcIiB0b3VjaHN0YXJ0LlwiK25hbWVzcGFjZStcIiBwb2ludGVyZG93bi5cIituYW1lc3BhY2UrXCIgTVNQb2ludGVyRG93bi5cIituYW1lc3BhY2UsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0aWYoIV9tb3VzZUJ0bkxlZnQoZSkpe3JldHVybjt9IC8qIGxlZnQgbW91c2UgYnV0dG9uIG9ubHkgKi9cblx0XHRcdFx0dG91Y2hBY3RpdmU9dHJ1ZTtcblx0XHRcdFx0aWYob2xkSUUpe2RvY3VtZW50Lm9uc2VsZWN0c3RhcnQ9ZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2U7fX0gLyogZGlzYWJsZSB0ZXh0IHNlbGVjdGlvbiBmb3IgSUUgPCA5ICovXG5cdFx0XHRcdF9pZnJhbWUuY2FsbChtQ1NCX2NvbnRhaW5lcixmYWxzZSk7IC8qIGVuYWJsZSBzY3JvbGxiYXIgZHJhZ2dpbmcgb3ZlciBpZnJhbWVzIGJ5IGRpc2FibGluZyB0aGVpciBldmVudHMgKi9cblx0XHRcdFx0X3N0b3AoJHRoaXMpO1xuXHRcdFx0XHRkcmFnZ2FibGU9JCh0aGlzKTtcblx0XHRcdFx0dmFyIG9mZnNldD1kcmFnZ2FibGUub2Zmc2V0KCkseT1fY29vcmRpbmF0ZXMoZSlbMF0tb2Zmc2V0LnRvcCx4PV9jb29yZGluYXRlcyhlKVsxXS1vZmZzZXQubGVmdCxcblx0XHRcdFx0XHRoPWRyYWdnYWJsZS5oZWlnaHQoKStvZmZzZXQudG9wLHc9ZHJhZ2dhYmxlLndpZHRoKCkrb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdGlmKHk8aCAmJiB5PjAgJiYgeDx3ICYmIHg+MCl7XG5cdFx0XHRcdFx0ZHJhZ1k9eTsgXG5cdFx0XHRcdFx0ZHJhZ1g9eDtcblx0XHRcdFx0fVxuXHRcdFx0XHRfb25EcmFnQ2xhc3NlcyhkcmFnZ2FibGUsXCJhY3RpdmVcIixvLmF1dG9FeHBhbmRTY3JvbGxiYXIpOyBcblx0XHRcdH0pLmJpbmQoXCJ0b3VjaG1vdmUuXCIrbmFtZXNwYWNlLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHZhciBvZmZzZXQ9ZHJhZ2dhYmxlLm9mZnNldCgpLHk9X2Nvb3JkaW5hdGVzKGUpWzBdLW9mZnNldC50b3AseD1fY29vcmRpbmF0ZXMoZSlbMV0tb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdF9kcmFnKGRyYWdZLGRyYWdYLHkseCk7XG5cdFx0XHR9KTtcblx0XHRcdCQoZG9jdW1lbnQpLmFkZChlZHMpLmJpbmQoXCJtb3VzZW1vdmUuXCIrbmFtZXNwYWNlK1wiIHBvaW50ZXJtb3ZlLlwiK25hbWVzcGFjZStcIiBNU1BvaW50ZXJNb3ZlLlwiK25hbWVzcGFjZSxmdW5jdGlvbihlKXtcblx0XHRcdFx0aWYoZHJhZ2dhYmxlKXtcblx0XHRcdFx0XHR2YXIgb2Zmc2V0PWRyYWdnYWJsZS5vZmZzZXQoKSx5PV9jb29yZGluYXRlcyhlKVswXS1vZmZzZXQudG9wLHg9X2Nvb3JkaW5hdGVzKGUpWzFdLW9mZnNldC5sZWZ0O1xuXHRcdFx0XHRcdGlmKGRyYWdZPT09eSAmJiBkcmFnWD09PXgpe3JldHVybjt9IC8qIGhhcyBpdCByZWFsbHkgbW92ZWQ/ICovXG5cdFx0XHRcdFx0X2RyYWcoZHJhZ1ksZHJhZ1gseSx4KTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuYWRkKHJkcykuYmluZChcIm1vdXNldXAuXCIrbmFtZXNwYWNlK1wiIHRvdWNoZW5kLlwiK25hbWVzcGFjZStcIiBwb2ludGVydXAuXCIrbmFtZXNwYWNlK1wiIE1TUG9pbnRlclVwLlwiK25hbWVzcGFjZSxmdW5jdGlvbihlKXtcblx0XHRcdFx0aWYoZHJhZ2dhYmxlKXtcblx0XHRcdFx0XHRfb25EcmFnQ2xhc3NlcyhkcmFnZ2FibGUsXCJhY3RpdmVcIixvLmF1dG9FeHBhbmRTY3JvbGxiYXIpOyBcblx0XHRcdFx0XHRkcmFnZ2FibGU9bnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHR0b3VjaEFjdGl2ZT1mYWxzZTtcblx0XHRcdFx0aWYob2xkSUUpe2RvY3VtZW50Lm9uc2VsZWN0c3RhcnQ9bnVsbDt9IC8qIGVuYWJsZSB0ZXh0IHNlbGVjdGlvbiBmb3IgSUUgPCA5ICovXG5cdFx0XHRcdF9pZnJhbWUuY2FsbChtQ1NCX2NvbnRhaW5lcix0cnVlKTsgLyogZW5hYmxlIGlmcmFtZXMgZXZlbnRzICovXG5cdFx0XHR9KTtcblx0XHRcdGZ1bmN0aW9uIF9kcmFnKGRyYWdZLGRyYWdYLHkseCl7XG5cdFx0XHRcdG1DU0JfY29udGFpbmVyWzBdLmlkbGVUaW1lcj1vLnNjcm9sbEluZXJ0aWE8MjMzID8gMjUwIDogMDtcblx0XHRcdFx0aWYoZHJhZ2dhYmxlLmF0dHIoXCJpZFwiKT09PWRyYWdnZXJJZFsxXSl7XG5cdFx0XHRcdFx0dmFyIGRpcj1cInhcIix0bz0oKGRyYWdnYWJsZVswXS5vZmZzZXRMZWZ0LWRyYWdYKSt4KSpkLnNjcm9sbFJhdGlvLng7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZhciBkaXI9XCJ5XCIsdG89KChkcmFnZ2FibGVbMF0ub2Zmc2V0VG9wLWRyYWdZKSt5KSpkLnNjcm9sbFJhdGlvLnk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X3Njcm9sbFRvKCR0aGlzLHRvLnRvU3RyaW5nKCkse2RpcjpkaXIsZHJhZzp0cnVlfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIFxuXHRcdFRPVUNIIFNXSVBFIEVWRU5UU1xuXHRcdHNjcm9sbHMgY29udGVudCB2aWEgdG91Y2ggc3dpcGUgXG5cdFx0RW11bGF0ZXMgdGhlIG5hdGl2ZSB0b3VjaC1zd2lwZSBzY3JvbGxpbmcgd2l0aCBtb21lbnR1bSBmb3VuZCBpbiBpT1MsIEFuZHJvaWQgYW5kIFdQIGRldmljZXMgXG5cdFx0Ki9cblx0XHRfY29udGVudERyYWdnYWJsZT1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0bmFtZXNwYWNlPXBsdWdpblBmeCtcIl9cIitkLmlkeCxcblx0XHRcdFx0bUN1c3RvbVNjcm9sbEJveD0kKFwiI21DU0JfXCIrZC5pZHgpLFxuXHRcdFx0XHRtQ1NCX2NvbnRhaW5lcj0kKFwiI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyXCIpLFxuXHRcdFx0XHRtQ1NCX2RyYWdnZXI9WyQoXCIjbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX3ZlcnRpY2FsXCIpLCQoXCIjbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX2hvcml6b250YWxcIildLFxuXHRcdFx0XHRkcmFnZ2FibGUsZHJhZ1ksZHJhZ1gsdG91Y2hTdGFydFksdG91Y2hTdGFydFgsdG91Y2hNb3ZlWT1bXSx0b3VjaE1vdmVYPVtdLHN0YXJ0VGltZSxydW5uaW5nVGltZSxlbmRUaW1lLGRpc3RhbmNlLHNwZWVkLGFtb3VudCxcblx0XHRcdFx0ZHVyQT0wLGR1ckIsb3ZlcndyaXRlPW8uYXhpcz09PVwieXhcIiA/IFwibm9uZVwiIDogXCJhbGxcIix0b3VjaEludGVudD1bXSx0b3VjaERyYWcsZG9jRHJhZyxcblx0XHRcdFx0aWZyYW1lPW1DU0JfY29udGFpbmVyLmZpbmQoXCJpZnJhbWVcIiksXG5cdFx0XHRcdGV2ZW50cz1bXG5cdFx0XHRcdFx0XCJ0b3VjaHN0YXJ0LlwiK25hbWVzcGFjZStcIiBwb2ludGVyZG93bi5cIituYW1lc3BhY2UrXCIgTVNQb2ludGVyRG93bi5cIituYW1lc3BhY2UsIC8vc3RhcnRcblx0XHRcdFx0XHRcInRvdWNobW92ZS5cIituYW1lc3BhY2UrXCIgcG9pbnRlcm1vdmUuXCIrbmFtZXNwYWNlK1wiIE1TUG9pbnRlck1vdmUuXCIrbmFtZXNwYWNlLCAvL21vdmVcblx0XHRcdFx0XHRcInRvdWNoZW5kLlwiK25hbWVzcGFjZStcIiBwb2ludGVydXAuXCIrbmFtZXNwYWNlK1wiIE1TUG9pbnRlclVwLlwiK25hbWVzcGFjZSAvL2VuZFxuXHRcdFx0XHRdLFxuXHRcdFx0XHR0b3VjaEFjdGlvbj1kb2N1bWVudC5ib2R5LnN0eWxlLnRvdWNoQWN0aW9uIT09dW5kZWZpbmVkICYmIGRvY3VtZW50LmJvZHkuc3R5bGUudG91Y2hBY3Rpb24hPT1cIlwiO1xuXHRcdFx0bUNTQl9jb250YWluZXIuYmluZChldmVudHNbMF0sZnVuY3Rpb24oZSl7XG5cdFx0XHRcdF9vblRvdWNoc3RhcnQoZSk7XG5cdFx0XHR9KS5iaW5kKGV2ZW50c1sxXSxmdW5jdGlvbihlKXtcblx0XHRcdFx0X29uVG91Y2htb3ZlKGUpO1xuXHRcdFx0fSk7XG5cdFx0XHRtQ3VzdG9tU2Nyb2xsQm94LmJpbmQoZXZlbnRzWzBdLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRfb25Ub3VjaHN0YXJ0MihlKTtcblx0XHRcdH0pLmJpbmQoZXZlbnRzWzJdLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRfb25Ub3VjaGVuZChlKTtcblx0XHRcdH0pO1xuXHRcdFx0aWYoaWZyYW1lLmxlbmd0aCl7XG5cdFx0XHRcdGlmcmFtZS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCh0aGlzKS5iaW5kKFwibG9hZFwiLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHQvKiBiaW5kIGV2ZW50cyBvbiBhY2Nlc3NpYmxlIGlmcmFtZXMgKi9cblx0XHRcdFx0XHRcdGlmKF9jYW5BY2Nlc3NJRnJhbWUodGhpcykpe1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMuY29udGVudERvY3VtZW50IHx8IHRoaXMuY29udGVudFdpbmRvdy5kb2N1bWVudCkuYmluZChldmVudHNbMF0sZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdFx0X29uVG91Y2hzdGFydChlKTtcblx0XHRcdFx0XHRcdFx0XHRfb25Ub3VjaHN0YXJ0MihlKTtcblx0XHRcdFx0XHRcdFx0fSkuYmluZChldmVudHNbMV0sZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdFx0X29uVG91Y2htb3ZlKGUpO1xuXHRcdFx0XHRcdFx0XHR9KS5iaW5kKGV2ZW50c1syXSxmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdFx0XHRfb25Ub3VjaGVuZChlKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gX29uVG91Y2hzdGFydChlKXtcblx0XHRcdFx0aWYoIV9wb2ludGVyVG91Y2goZSkgfHwgdG91Y2hBY3RpdmUgfHwgX2Nvb3JkaW5hdGVzKGUpWzJdKXt0b3VjaGFibGU9MDsgcmV0dXJuO31cblx0XHRcdFx0dG91Y2hhYmxlPTE7IHRvdWNoRHJhZz0wOyBkb2NEcmFnPTA7IGRyYWdnYWJsZT0xO1xuXHRcdFx0XHQkdGhpcy5yZW1vdmVDbGFzcyhcIm1DU190b3VjaF9hY3Rpb25cIik7XG5cdFx0XHRcdHZhciBvZmZzZXQ9bUNTQl9jb250YWluZXIub2Zmc2V0KCk7XG5cdFx0XHRcdGRyYWdZPV9jb29yZGluYXRlcyhlKVswXS1vZmZzZXQudG9wO1xuXHRcdFx0XHRkcmFnWD1fY29vcmRpbmF0ZXMoZSlbMV0tb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdHRvdWNoSW50ZW50PVtfY29vcmRpbmF0ZXMoZSlbMF0sX2Nvb3JkaW5hdGVzKGUpWzFdXTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIF9vblRvdWNobW92ZShlKXtcblx0XHRcdFx0aWYoIV9wb2ludGVyVG91Y2goZSkgfHwgdG91Y2hBY3RpdmUgfHwgX2Nvb3JkaW5hdGVzKGUpWzJdKXtyZXR1cm47fVxuXHRcdFx0XHRpZighby5kb2N1bWVudFRvdWNoU2Nyb2xsKXtlLnByZXZlbnREZWZhdWx0KCk7fSBcblx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0aWYoZG9jRHJhZyAmJiAhdG91Y2hEcmFnKXtyZXR1cm47fVxuXHRcdFx0XHRpZihkcmFnZ2FibGUpe1xuXHRcdFx0XHRcdHJ1bm5pbmdUaW1lPV9nZXRUaW1lKCk7XG5cdFx0XHRcdFx0dmFyIG9mZnNldD1tQ3VzdG9tU2Nyb2xsQm94Lm9mZnNldCgpLHk9X2Nvb3JkaW5hdGVzKGUpWzBdLW9mZnNldC50b3AseD1fY29vcmRpbmF0ZXMoZSlbMV0tb2Zmc2V0LmxlZnQsXG5cdFx0XHRcdFx0XHRlYXNpbmc9XCJtY3NMaW5lYXJPdXRcIjtcblx0XHRcdFx0XHR0b3VjaE1vdmVZLnB1c2goeSk7XG5cdFx0XHRcdFx0dG91Y2hNb3ZlWC5wdXNoKHgpO1xuXHRcdFx0XHRcdHRvdWNoSW50ZW50WzJdPU1hdGguYWJzKF9jb29yZGluYXRlcyhlKVswXS10b3VjaEludGVudFswXSk7IHRvdWNoSW50ZW50WzNdPU1hdGguYWJzKF9jb29yZGluYXRlcyhlKVsxXS10b3VjaEludGVudFsxXSk7XG5cdFx0XHRcdFx0aWYoZC5vdmVyZmxvd2VkWzBdKXtcblx0XHRcdFx0XHRcdHZhciBsaW1pdD1tQ1NCX2RyYWdnZXJbMF0ucGFyZW50KCkuaGVpZ2h0KCktbUNTQl9kcmFnZ2VyWzBdLmhlaWdodCgpLFxuXHRcdFx0XHRcdFx0XHRwcmV2ZW50PSgoZHJhZ1kteSk+MCAmJiAoeS1kcmFnWSk+LShsaW1pdCpkLnNjcm9sbFJhdGlvLnkpICYmICh0b3VjaEludGVudFszXSoyPHRvdWNoSW50ZW50WzJdIHx8IG8uYXhpcz09PVwieXhcIikpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihkLm92ZXJmbG93ZWRbMV0pe1xuXHRcdFx0XHRcdFx0dmFyIGxpbWl0WD1tQ1NCX2RyYWdnZXJbMV0ucGFyZW50KCkud2lkdGgoKS1tQ1NCX2RyYWdnZXJbMV0ud2lkdGgoKSxcblx0XHRcdFx0XHRcdFx0cHJldmVudFg9KChkcmFnWC14KT4wICYmICh4LWRyYWdYKT4tKGxpbWl0WCpkLnNjcm9sbFJhdGlvLngpICYmICh0b3VjaEludGVudFsyXSoyPHRvdWNoSW50ZW50WzNdIHx8IG8uYXhpcz09PVwieXhcIikpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihwcmV2ZW50IHx8IHByZXZlbnRYKXsgLyogcHJldmVudCBuYXRpdmUgZG9jdW1lbnQgc2Nyb2xsaW5nICovXG5cdFx0XHRcdFx0XHRpZighdG91Y2hBY3Rpb24pe2UucHJldmVudERlZmF1bHQoKTt9IFxuXHRcdFx0XHRcdFx0dG91Y2hEcmFnPTE7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRkb2NEcmFnPTE7XG5cdFx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcyhcIm1DU190b3VjaF9hY3Rpb25cIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHRvdWNoQWN0aW9uKXtlLnByZXZlbnREZWZhdWx0KCk7fSBcblx0XHRcdFx0XHRhbW91bnQ9by5heGlzPT09XCJ5eFwiID8gWyhkcmFnWS15KSwoZHJhZ1gteCldIDogby5heGlzPT09XCJ4XCIgPyBbbnVsbCwoZHJhZ1gteCldIDogWyhkcmFnWS15KSxudWxsXTtcblx0XHRcdFx0XHRtQ1NCX2NvbnRhaW5lclswXS5pZGxlVGltZXI9MjUwO1xuXHRcdFx0XHRcdGlmKGQub3ZlcmZsb3dlZFswXSl7X2RyYWcoYW1vdW50WzBdLGR1ckEsZWFzaW5nLFwieVwiLFwiYWxsXCIsdHJ1ZSk7fVxuXHRcdFx0XHRcdGlmKGQub3ZlcmZsb3dlZFsxXSl7X2RyYWcoYW1vdW50WzFdLGR1ckEsZWFzaW5nLFwieFwiLG92ZXJ3cml0ZSx0cnVlKTt9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIF9vblRvdWNoc3RhcnQyKGUpe1xuXHRcdFx0XHRpZighX3BvaW50ZXJUb3VjaChlKSB8fCB0b3VjaEFjdGl2ZSB8fCBfY29vcmRpbmF0ZXMoZSlbMl0pe3RvdWNoYWJsZT0wOyByZXR1cm47fVxuXHRcdFx0XHR0b3VjaGFibGU9MTtcblx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0X3N0b3AoJHRoaXMpO1xuXHRcdFx0XHRzdGFydFRpbWU9X2dldFRpbWUoKTtcblx0XHRcdFx0dmFyIG9mZnNldD1tQ3VzdG9tU2Nyb2xsQm94Lm9mZnNldCgpO1xuXHRcdFx0XHR0b3VjaFN0YXJ0WT1fY29vcmRpbmF0ZXMoZSlbMF0tb2Zmc2V0LnRvcDtcblx0XHRcdFx0dG91Y2hTdGFydFg9X2Nvb3JkaW5hdGVzKGUpWzFdLW9mZnNldC5sZWZ0O1xuXHRcdFx0XHR0b3VjaE1vdmVZPVtdOyB0b3VjaE1vdmVYPVtdO1xuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gX29uVG91Y2hlbmQoZSl7XG5cdFx0XHRcdGlmKCFfcG9pbnRlclRvdWNoKGUpIHx8IHRvdWNoQWN0aXZlIHx8IF9jb29yZGluYXRlcyhlKVsyXSl7cmV0dXJuO31cblx0XHRcdFx0ZHJhZ2dhYmxlPTA7XG5cdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRvdWNoRHJhZz0wOyBkb2NEcmFnPTA7XG5cdFx0XHRcdGVuZFRpbWU9X2dldFRpbWUoKTtcblx0XHRcdFx0dmFyIG9mZnNldD1tQ3VzdG9tU2Nyb2xsQm94Lm9mZnNldCgpLHk9X2Nvb3JkaW5hdGVzKGUpWzBdLW9mZnNldC50b3AseD1fY29vcmRpbmF0ZXMoZSlbMV0tb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdGlmKChlbmRUaW1lLXJ1bm5pbmdUaW1lKT4zMCl7cmV0dXJuO31cblx0XHRcdFx0c3BlZWQ9MTAwMC8oZW5kVGltZS1zdGFydFRpbWUpO1xuXHRcdFx0XHR2YXIgZWFzaW5nPVwibWNzRWFzZU91dFwiLHNsb3c9c3BlZWQ8Mi41LFxuXHRcdFx0XHRcdGRpZmY9c2xvdyA/IFt0b3VjaE1vdmVZW3RvdWNoTW92ZVkubGVuZ3RoLTJdLHRvdWNoTW92ZVhbdG91Y2hNb3ZlWC5sZW5ndGgtMl1dIDogWzAsMF07XG5cdFx0XHRcdGRpc3RhbmNlPXNsb3cgPyBbKHktZGlmZlswXSksKHgtZGlmZlsxXSldIDogW3ktdG91Y2hTdGFydFkseC10b3VjaFN0YXJ0WF07XG5cdFx0XHRcdHZhciBhYnNEaXN0YW5jZT1bTWF0aC5hYnMoZGlzdGFuY2VbMF0pLE1hdGguYWJzKGRpc3RhbmNlWzFdKV07XG5cdFx0XHRcdHNwZWVkPXNsb3cgPyBbTWF0aC5hYnMoZGlzdGFuY2VbMF0vNCksTWF0aC5hYnMoZGlzdGFuY2VbMV0vNCldIDogW3NwZWVkLHNwZWVkXTtcblx0XHRcdFx0dmFyIGE9W1xuXHRcdFx0XHRcdE1hdGguYWJzKG1DU0JfY29udGFpbmVyWzBdLm9mZnNldFRvcCktKGRpc3RhbmNlWzBdKl9tKChhYnNEaXN0YW5jZVswXS9zcGVlZFswXSksc3BlZWRbMF0pKSxcblx0XHRcdFx0XHRNYXRoLmFicyhtQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRMZWZ0KS0oZGlzdGFuY2VbMV0qX20oKGFic0Rpc3RhbmNlWzFdL3NwZWVkWzFdKSxzcGVlZFsxXSkpXG5cdFx0XHRcdF07XG5cdFx0XHRcdGFtb3VudD1vLmF4aXM9PT1cInl4XCIgPyBbYVswXSxhWzFdXSA6IG8uYXhpcz09PVwieFwiID8gW251bGwsYVsxXV0gOiBbYVswXSxudWxsXTtcblx0XHRcdFx0ZHVyQj1bKGFic0Rpc3RhbmNlWzBdKjQpK28uc2Nyb2xsSW5lcnRpYSwoYWJzRGlzdGFuY2VbMV0qNCkrby5zY3JvbGxJbmVydGlhXTtcblx0XHRcdFx0dmFyIG1kPXBhcnNlSW50KG8uY29udGVudFRvdWNoU2Nyb2xsKSB8fCAwOyAvKiBhYnNvbHV0ZSBtaW5pbXVtIGRpc3RhbmNlIHJlcXVpcmVkICovXG5cdFx0XHRcdGFtb3VudFswXT1hYnNEaXN0YW5jZVswXT5tZCA/IGFtb3VudFswXSA6IDA7XG5cdFx0XHRcdGFtb3VudFsxXT1hYnNEaXN0YW5jZVsxXT5tZCA/IGFtb3VudFsxXSA6IDA7XG5cdFx0XHRcdGlmKGQub3ZlcmZsb3dlZFswXSl7X2RyYWcoYW1vdW50WzBdLGR1ckJbMF0sZWFzaW5nLFwieVwiLG92ZXJ3cml0ZSxmYWxzZSk7fVxuXHRcdFx0XHRpZihkLm92ZXJmbG93ZWRbMV0pe19kcmFnKGFtb3VudFsxXSxkdXJCWzFdLGVhc2luZyxcInhcIixvdmVyd3JpdGUsZmFsc2UpO31cblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIF9tKGRzLHMpe1xuXHRcdFx0XHR2YXIgcj1bcyoxLjUscyoyLHMvMS41LHMvMl07XG5cdFx0XHRcdGlmKGRzPjkwKXtcblx0XHRcdFx0XHRyZXR1cm4gcz40ID8gclswXSA6IHJbM107XG5cdFx0XHRcdH1lbHNlIGlmKGRzPjYwKXtcblx0XHRcdFx0XHRyZXR1cm4gcz4zID8gclszXSA6IHJbMl07XG5cdFx0XHRcdH1lbHNlIGlmKGRzPjMwKXtcblx0XHRcdFx0XHRyZXR1cm4gcz44ID8gclsxXSA6IHM+NiA/IHJbMF0gOiBzPjQgPyBzIDogclsyXTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIHM+OCA/IHMgOiByWzNdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBfZHJhZyhhbW91bnQsZHVyLGVhc2luZyxkaXIsb3ZlcndyaXRlLGRyYWcpe1xuXHRcdFx0XHRpZighYW1vdW50KXtyZXR1cm47fVxuXHRcdFx0XHRfc2Nyb2xsVG8oJHRoaXMsYW1vdW50LnRvU3RyaW5nKCkse2R1cjpkdXIsc2Nyb2xsRWFzaW5nOmVhc2luZyxkaXI6ZGlyLG92ZXJ3cml0ZTpvdmVyd3JpdGUsZHJhZzpkcmFnfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIFxuXHRcdFNFTEVDVCBURVhUIEVWRU5UUyBcblx0XHRzY3JvbGxzIGNvbnRlbnQgd2hlbiB0ZXh0IGlzIHNlbGVjdGVkIFxuXHRcdCovXG5cdFx0X3NlbGVjdGFibGU9ZnVuY3Rpb24oKXtcblx0XHRcdHZhciAkdGhpcz0kKHRoaXMpLGQ9JHRoaXMuZGF0YShwbHVnaW5QZngpLG89ZC5vcHQsc2VxPWQuc2VxdWVudGlhbCxcblx0XHRcdFx0bmFtZXNwYWNlPXBsdWdpblBmeCtcIl9cIitkLmlkeCxcblx0XHRcdFx0bUNTQl9jb250YWluZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0d3JhcHBlcj1tQ1NCX2NvbnRhaW5lci5wYXJlbnQoKSxcblx0XHRcdFx0YWN0aW9uO1xuXHRcdFx0bUNTQl9jb250YWluZXIuYmluZChcIm1vdXNlZG93bi5cIituYW1lc3BhY2UsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGlmKHRvdWNoYWJsZSl7cmV0dXJuO31cblx0XHRcdFx0aWYoIWFjdGlvbil7YWN0aW9uPTE7IHRvdWNoQWN0aXZlPXRydWU7fVxuXHRcdFx0fSkuYWRkKGRvY3VtZW50KS5iaW5kKFwibW91c2Vtb3ZlLlwiK25hbWVzcGFjZSxmdW5jdGlvbihlKXtcblx0XHRcdFx0aWYoIXRvdWNoYWJsZSAmJiBhY3Rpb24gJiYgX3NlbCgpKXtcblx0XHRcdFx0XHR2YXIgb2Zmc2V0PW1DU0JfY29udGFpbmVyLm9mZnNldCgpLFxuXHRcdFx0XHRcdFx0eT1fY29vcmRpbmF0ZXMoZSlbMF0tb2Zmc2V0LnRvcCttQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRUb3AseD1fY29vcmRpbmF0ZXMoZSlbMV0tb2Zmc2V0LmxlZnQrbUNTQl9jb250YWluZXJbMF0ub2Zmc2V0TGVmdDtcblx0XHRcdFx0XHRpZih5PjAgJiYgeTx3cmFwcGVyLmhlaWdodCgpICYmIHg+MCAmJiB4PHdyYXBwZXIud2lkdGgoKSl7XG5cdFx0XHRcdFx0XHRpZihzZXEuc3RlcCl7X3NlcShcIm9mZlwiLG51bGwsXCJzdGVwcGVkXCIpO31cblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGlmKG8uYXhpcyE9PVwieFwiICYmIGQub3ZlcmZsb3dlZFswXSl7XG5cdFx0XHRcdFx0XHRcdGlmKHk8MCl7XG5cdFx0XHRcdFx0XHRcdFx0X3NlcShcIm9uXCIsMzgpO1xuXHRcdFx0XHRcdFx0XHR9ZWxzZSBpZih5PndyYXBwZXIuaGVpZ2h0KCkpe1xuXHRcdFx0XHRcdFx0XHRcdF9zZXEoXCJvblwiLDQwKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoby5heGlzIT09XCJ5XCIgJiYgZC5vdmVyZmxvd2VkWzFdKXtcblx0XHRcdFx0XHRcdFx0aWYoeDwwKXtcblx0XHRcdFx0XHRcdFx0XHRfc2VxKFwib25cIiwzNyk7XG5cdFx0XHRcdFx0XHRcdH1lbHNlIGlmKHg+d3JhcHBlci53aWR0aCgpKXtcblx0XHRcdFx0XHRcdFx0XHRfc2VxKFwib25cIiwzOSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pLmJpbmQoXCJtb3VzZXVwLlwiK25hbWVzcGFjZStcIiBkcmFnZW5kLlwiK25hbWVzcGFjZSxmdW5jdGlvbihlKXtcblx0XHRcdFx0aWYodG91Y2hhYmxlKXtyZXR1cm47fVxuXHRcdFx0XHRpZihhY3Rpb24pe2FjdGlvbj0wOyBfc2VxKFwib2ZmXCIsbnVsbCk7fVxuXHRcdFx0XHR0b3VjaEFjdGl2ZT1mYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0ZnVuY3Rpb24gX3NlbCgpe1xuXHRcdFx0XHRyZXR1cm4gXHR3aW5kb3cuZ2V0U2VsZWN0aW9uID8gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkgOiBcblx0XHRcdFx0XHRcdGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24udHlwZSE9XCJDb250cm9sXCIgPyBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0IDogMDtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIF9zZXEoYSxjLHMpe1xuXHRcdFx0XHRzZXEudHlwZT1zICYmIGFjdGlvbiA/IFwic3RlcHBlZFwiIDogXCJzdGVwbGVzc1wiO1xuXHRcdFx0XHRzZXEuc2Nyb2xsQW1vdW50PTEwO1xuXHRcdFx0XHRfc2VxdWVudGlhbFNjcm9sbCgkdGhpcyxhLGMsXCJtY3NMaW5lYXJPdXRcIixzID8gNjAgOiBudWxsKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogXG5cdFx0TU9VU0UgV0hFRUwgRVZFTlRcblx0XHRzY3JvbGxzIGNvbnRlbnQgdmlhIG1vdXNlLXdoZWVsIFxuXHRcdHZpYSBtb3VzZS13aGVlbCBwbHVnaW4gKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFuZG9uYWFyb24vanF1ZXJ5LW1vdXNld2hlZWwpXG5cdFx0Ki9cblx0XHRfbW91c2V3aGVlbD1mdW5jdGlvbigpe1xuXHRcdFx0aWYoISQodGhpcykuZGF0YShwbHVnaW5QZngpKXtyZXR1cm47fSAvKiBDaGVjayBpZiB0aGUgc2Nyb2xsYmFyIGlzIHJlYWR5IHRvIHVzZSBtb3VzZXdoZWVsIGV2ZW50cyAoaXNzdWU6ICMxODUpICovXG5cdFx0XHR2YXIgJHRoaXM9JCh0aGlzKSxkPSR0aGlzLmRhdGEocGx1Z2luUGZ4KSxvPWQub3B0LFxuXHRcdFx0XHRuYW1lc3BhY2U9cGx1Z2luUGZ4K1wiX1wiK2QuaWR4LFxuXHRcdFx0XHRtQ3VzdG9tU2Nyb2xsQm94PSQoXCIjbUNTQl9cIitkLmlkeCksXG5cdFx0XHRcdG1DU0JfZHJhZ2dlcj1bJChcIiNtQ1NCX1wiK2QuaWR4K1wiX2RyYWdnZXJfdmVydGljYWxcIiksJChcIiNtQ1NCX1wiK2QuaWR4K1wiX2RyYWdnZXJfaG9yaXpvbnRhbFwiKV0sXG5cdFx0XHRcdGlmcmFtZT0kKFwiI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyXCIpLmZpbmQoXCJpZnJhbWVcIik7XG5cdFx0XHRpZihpZnJhbWUubGVuZ3RoKXtcblx0XHRcdFx0aWZyYW1lLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQkKHRoaXMpLmJpbmQoXCJsb2FkXCIsZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdC8qIGJpbmQgZXZlbnRzIG9uIGFjY2Vzc2libGUgaWZyYW1lcyAqL1xuXHRcdFx0XHRcdFx0aWYoX2NhbkFjY2Vzc0lGcmFtZSh0aGlzKSl7XG5cdFx0XHRcdFx0XHRcdCQodGhpcy5jb250ZW50RG9jdW1lbnQgfHwgdGhpcy5jb250ZW50V2luZG93LmRvY3VtZW50KS5iaW5kKFwibW91c2V3aGVlbC5cIituYW1lc3BhY2UsZnVuY3Rpb24oZSxkZWx0YSl7XG5cdFx0XHRcdFx0XHRcdFx0X29uTW91c2V3aGVlbChlLGRlbHRhKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0bUN1c3RvbVNjcm9sbEJveC5iaW5kKFwibW91c2V3aGVlbC5cIituYW1lc3BhY2UsZnVuY3Rpb24oZSxkZWx0YSl7XG5cdFx0XHRcdF9vbk1vdXNld2hlZWwoZSxkZWx0YSk7XG5cdFx0XHR9KTtcblx0XHRcdGZ1bmN0aW9uIF9vbk1vdXNld2hlZWwoZSxkZWx0YSl7XG5cdFx0XHRcdF9zdG9wKCR0aGlzKTtcblx0XHRcdFx0aWYoX2Rpc2FibGVNb3VzZXdoZWVsKCR0aGlzLGUudGFyZ2V0KSl7cmV0dXJuO30gLyogZGlzYWJsZXMgbW91c2Utd2hlZWwgd2hlbiBob3ZlcmluZyBzcGVjaWZpYyBlbGVtZW50cyAqL1xuXHRcdFx0XHR2YXIgZGVsdGFGYWN0b3I9by5tb3VzZVdoZWVsLmRlbHRhRmFjdG9yIT09XCJhdXRvXCIgPyBwYXJzZUludChvLm1vdXNlV2hlZWwuZGVsdGFGYWN0b3IpIDogKG9sZElFICYmIGUuZGVsdGFGYWN0b3I8MTAwKSA/IDEwMCA6IGUuZGVsdGFGYWN0b3IgfHwgMTAwLFxuXHRcdFx0XHRcdGR1cj1vLnNjcm9sbEluZXJ0aWE7XG5cdFx0XHRcdGlmKG8uYXhpcz09PVwieFwiIHx8IG8ubW91c2VXaGVlbC5heGlzPT09XCJ4XCIpe1xuXHRcdFx0XHRcdHZhciBkaXI9XCJ4XCIsXG5cdFx0XHRcdFx0XHRweD1bTWF0aC5yb3VuZChkZWx0YUZhY3RvcipkLnNjcm9sbFJhdGlvLngpLHBhcnNlSW50KG8ubW91c2VXaGVlbC5zY3JvbGxBbW91bnQpXSxcblx0XHRcdFx0XHRcdGFtb3VudD1vLm1vdXNlV2hlZWwuc2Nyb2xsQW1vdW50IT09XCJhdXRvXCIgPyBweFsxXSA6IHB4WzBdPj1tQ3VzdG9tU2Nyb2xsQm94LndpZHRoKCkgPyBtQ3VzdG9tU2Nyb2xsQm94LndpZHRoKCkqMC45IDogcHhbMF0sXG5cdFx0XHRcdFx0XHRjb250ZW50UG9zPU1hdGguYWJzKCQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIilbMF0ub2Zmc2V0TGVmdCksXG5cdFx0XHRcdFx0XHRkcmFnZ2VyUG9zPW1DU0JfZHJhZ2dlclsxXVswXS5vZmZzZXRMZWZ0LFxuXHRcdFx0XHRcdFx0bGltaXQ9bUNTQl9kcmFnZ2VyWzFdLnBhcmVudCgpLndpZHRoKCktbUNTQl9kcmFnZ2VyWzFdLndpZHRoKCksXG5cdFx0XHRcdFx0XHRkbHQ9by5tb3VzZVdoZWVsLmF4aXM9PT1cInlcIiA/IChlLmRlbHRhWSB8fCBkZWx0YSkgOiBlLmRlbHRhWDtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dmFyIGRpcj1cInlcIixcblx0XHRcdFx0XHRcdHB4PVtNYXRoLnJvdW5kKGRlbHRhRmFjdG9yKmQuc2Nyb2xsUmF0aW8ueSkscGFyc2VJbnQoby5tb3VzZVdoZWVsLnNjcm9sbEFtb3VudCldLFxuXHRcdFx0XHRcdFx0YW1vdW50PW8ubW91c2VXaGVlbC5zY3JvbGxBbW91bnQhPT1cImF1dG9cIiA/IHB4WzFdIDogcHhbMF0+PW1DdXN0b21TY3JvbGxCb3guaGVpZ2h0KCkgPyBtQ3VzdG9tU2Nyb2xsQm94LmhlaWdodCgpKjAuOSA6IHB4WzBdLFxuXHRcdFx0XHRcdFx0Y29udGVudFBvcz1NYXRoLmFicygkKFwiI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyXCIpWzBdLm9mZnNldFRvcCksXG5cdFx0XHRcdFx0XHRkcmFnZ2VyUG9zPW1DU0JfZHJhZ2dlclswXVswXS5vZmZzZXRUb3AsXG5cdFx0XHRcdFx0XHRsaW1pdD1tQ1NCX2RyYWdnZXJbMF0ucGFyZW50KCkuaGVpZ2h0KCktbUNTQl9kcmFnZ2VyWzBdLmhlaWdodCgpLFxuXHRcdFx0XHRcdFx0ZGx0PWUuZGVsdGFZIHx8IGRlbHRhO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKChkaXI9PT1cInlcIiAmJiAhZC5vdmVyZmxvd2VkWzBdKSB8fCAoZGlyPT09XCJ4XCIgJiYgIWQub3ZlcmZsb3dlZFsxXSkpe3JldHVybjt9XG5cdFx0XHRcdGlmKG8ubW91c2VXaGVlbC5pbnZlcnQgfHwgZS53ZWJraXREaXJlY3Rpb25JbnZlcnRlZEZyb21EZXZpY2Upe2RsdD0tZGx0O31cblx0XHRcdFx0aWYoby5tb3VzZVdoZWVsLm5vcm1hbGl6ZURlbHRhKXtkbHQ9ZGx0PDAgPyAtMSA6IDE7fVxuXHRcdFx0XHRpZigoZGx0PjAgJiYgZHJhZ2dlclBvcyE9PTApIHx8IChkbHQ8MCAmJiBkcmFnZ2VyUG9zIT09bGltaXQpIHx8IG8ubW91c2VXaGVlbC5wcmV2ZW50RGVmYXVsdCl7XG5cdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoZS5kZWx0YUZhY3Rvcjw1ICYmICFvLm1vdXNlV2hlZWwubm9ybWFsaXplRGVsdGEpe1xuXHRcdFx0XHRcdC8vdmVyeSBsb3cgZGVsdGFGYWN0b3IgdmFsdWVzIG1lYW4gc29tZSBraW5kIG9mIGRlbHRhIGFjY2VsZXJhdGlvbiAoZS5nLiBvc3ggdHJhY2twYWQpLCBzbyBhZGp1c3Rpbmcgc2Nyb2xsaW5nIGFjY29yZGluZ2x5XG5cdFx0XHRcdFx0YW1vdW50PWUuZGVsdGFGYWN0b3I7IGR1cj0xNztcblx0XHRcdFx0fVxuXHRcdFx0XHRfc2Nyb2xsVG8oJHRoaXMsKGNvbnRlbnRQb3MtKGRsdCphbW91bnQpKS50b1N0cmluZygpLHtkaXI6ZGlyLGR1cjpkdXJ9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogY2hlY2tzIGlmIGlmcmFtZSBjYW4gYmUgYWNjZXNzZWQgKi9cblx0XHRfY2FuQWNjZXNzSUZyYW1lQ2FjaGU9bmV3IE9iamVjdCgpLFxuXHRcdF9jYW5BY2Nlc3NJRnJhbWU9ZnVuY3Rpb24oaWZyYW1lKXtcblx0XHQgICAgdmFyIHJlc3VsdD1mYWxzZSxjYWNoZUtleT1mYWxzZSxodG1sPW51bGw7XG5cdFx0ICAgIGlmKGlmcmFtZT09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdGNhY2hlS2V5PVwiI2VtcHR5XCI7XG5cdFx0ICAgIH1lbHNlIGlmKCQoaWZyYW1lKS5hdHRyKFwiaWRcIikhPT11bmRlZmluZWQpe1xuXHRcdFx0XHRjYWNoZUtleT0kKGlmcmFtZSkuYXR0cihcImlkXCIpO1xuXHRcdCAgICB9XG5cdFx0XHRpZihjYWNoZUtleSE9PWZhbHNlICYmIF9jYW5BY2Nlc3NJRnJhbWVDYWNoZVtjYWNoZUtleV0hPT11bmRlZmluZWQpe1xuXHRcdFx0XHRyZXR1cm4gX2NhbkFjY2Vzc0lGcmFtZUNhY2hlW2NhY2hlS2V5XTtcblx0XHRcdH1cblx0XHRcdGlmKCFpZnJhbWUpe1xuXHRcdFx0XHR0cnl7XG5cdFx0XHRcdFx0dmFyIGRvYz10b3AuZG9jdW1lbnQ7XG5cdFx0XHRcdFx0aHRtbD1kb2MuYm9keS5pbm5lckhUTUw7XG5cdFx0XHRcdH1jYXRjaChlcnIpey8qIGRvIG5vdGhpbmcgKi99XG5cdFx0XHRcdHJlc3VsdD0oaHRtbCE9PW51bGwpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHR2YXIgZG9jPWlmcmFtZS5jb250ZW50RG9jdW1lbnQgfHwgaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG5cdFx0XHRcdFx0aHRtbD1kb2MuYm9keS5pbm5lckhUTUw7XG5cdFx0XHRcdH1jYXRjaChlcnIpey8qIGRvIG5vdGhpbmcgKi99XG5cdFx0XHRcdHJlc3VsdD0oaHRtbCE9PW51bGwpO1xuXHRcdFx0fVxuXHRcdFx0aWYoY2FjaGVLZXkhPT1mYWxzZSl7X2NhbkFjY2Vzc0lGcmFtZUNhY2hlW2NhY2hlS2V5XT1yZXN1bHQ7fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0Lyogc3dpdGNoZXMgaWZyYW1lJ3MgcG9pbnRlci1ldmVudHMgcHJvcGVydHkgKGRyYWcsIG1vdXNld2hlZWwgZXRjLiBvdmVyIGNyb3NzLWRvbWFpbiBpZnJhbWVzKSAqL1xuXHRcdF9pZnJhbWU9ZnVuY3Rpb24oZXZ0KXtcblx0XHRcdHZhciBlbD10aGlzLmZpbmQoXCJpZnJhbWVcIik7XG5cdFx0XHRpZighZWwubGVuZ3RoKXtyZXR1cm47fSAvKiBjaGVjayBpZiBjb250ZW50IGNvbnRhaW5zIGlmcmFtZXMgKi9cblx0XHRcdHZhciB2YWw9IWV2dCA/IFwibm9uZVwiIDogXCJhdXRvXCI7XG5cdFx0XHRlbC5jc3MoXCJwb2ludGVyLWV2ZW50c1wiLHZhbCk7IC8qIGZvciBJRTExLCBpZnJhbWUncyBkaXNwbGF5IHByb3BlcnR5IHNob3VsZCBub3QgYmUgXCJibG9ja1wiICovXG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIGRpc2FibGVzIG1vdXNlLXdoZWVsIHdoZW4gaG92ZXJpbmcgc3BlY2lmaWMgZWxlbWVudHMgbGlrZSBzZWxlY3QsIGRhdGFsaXN0IGV0Yy4gKi9cblx0XHRfZGlzYWJsZU1vdXNld2hlZWw9ZnVuY3Rpb24oZWwsdGFyZ2V0KXtcblx0XHRcdHZhciB0YWc9dGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdHRhZ3M9ZWwuZGF0YShwbHVnaW5QZngpLm9wdC5tb3VzZVdoZWVsLmRpc2FibGVPdmVyLFxuXHRcdFx0XHQvKiBlbGVtZW50cyB0aGF0IHJlcXVpcmUgZm9jdXMgKi9cblx0XHRcdFx0Zm9jdXNUYWdzPVtcInNlbGVjdFwiLFwidGV4dGFyZWFcIl07XG5cdFx0XHRyZXR1cm4gJC5pbkFycmF5KHRhZyx0YWdzKSA+IC0xICYmICEoJC5pbkFycmF5KHRhZyxmb2N1c1RhZ3MpID4gLTEgJiYgISQodGFyZ2V0KS5pcyhcIjpmb2N1c1wiKSk7XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIFxuXHRcdERSQUdHRVIgUkFJTCBDTElDSyBFVkVOVFxuXHRcdHNjcm9sbHMgY29udGVudCB2aWEgZHJhZ2dlciByYWlsIFxuXHRcdCovXG5cdFx0X2RyYWdnZXJSYWlsPWZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgJHRoaXM9JCh0aGlzKSxkPSR0aGlzLmRhdGEocGx1Z2luUGZ4KSxcblx0XHRcdFx0bmFtZXNwYWNlPXBsdWdpblBmeCtcIl9cIitkLmlkeCxcblx0XHRcdFx0bUNTQl9jb250YWluZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0d3JhcHBlcj1tQ1NCX2NvbnRhaW5lci5wYXJlbnQoKSxcblx0XHRcdFx0bUNTQl9kcmFnZ2VyQ29udGFpbmVyPSQoXCIubUNTQl9cIitkLmlkeCtcIl9zY3JvbGxiYXIgLlwiK2NsYXNzZXNbMTJdKSxcblx0XHRcdFx0Y2xpY2thYmxlO1xuXHRcdFx0bUNTQl9kcmFnZ2VyQ29udGFpbmVyLmJpbmQoXCJtb3VzZWRvd24uXCIrbmFtZXNwYWNlK1wiIHRvdWNoc3RhcnQuXCIrbmFtZXNwYWNlK1wiIHBvaW50ZXJkb3duLlwiK25hbWVzcGFjZStcIiBNU1BvaW50ZXJEb3duLlwiK25hbWVzcGFjZSxmdW5jdGlvbihlKXtcblx0XHRcdFx0dG91Y2hBY3RpdmU9dHJ1ZTtcblx0XHRcdFx0aWYoISQoZS50YXJnZXQpLmhhc0NsYXNzKFwibUNTQl9kcmFnZ2VyXCIpKXtjbGlja2FibGU9MTt9XG5cdFx0XHR9KS5iaW5kKFwidG91Y2hlbmQuXCIrbmFtZXNwYWNlK1wiIHBvaW50ZXJ1cC5cIituYW1lc3BhY2UrXCIgTVNQb2ludGVyVXAuXCIrbmFtZXNwYWNlLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR0b3VjaEFjdGl2ZT1mYWxzZTtcblx0XHRcdH0pLmJpbmQoXCJjbGljay5cIituYW1lc3BhY2UsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGlmKCFjbGlja2FibGUpe3JldHVybjt9XG5cdFx0XHRcdGNsaWNrYWJsZT0wO1xuXHRcdFx0XHRpZigkKGUudGFyZ2V0KS5oYXNDbGFzcyhjbGFzc2VzWzEyXSkgfHwgJChlLnRhcmdldCkuaGFzQ2xhc3MoXCJtQ1NCX2RyYWdnZXJSYWlsXCIpKXtcblx0XHRcdFx0XHRfc3RvcCgkdGhpcyk7XG5cdFx0XHRcdFx0dmFyIGVsPSQodGhpcyksbUNTQl9kcmFnZ2VyPWVsLmZpbmQoXCIubUNTQl9kcmFnZ2VyXCIpO1xuXHRcdFx0XHRcdGlmKGVsLnBhcmVudChcIi5tQ1NCX3Njcm9sbFRvb2xzX2hvcml6b250YWxcIikubGVuZ3RoPjApe1xuXHRcdFx0XHRcdFx0aWYoIWQub3ZlcmZsb3dlZFsxXSl7cmV0dXJuO31cblx0XHRcdFx0XHRcdHZhciBkaXI9XCJ4XCIsXG5cdFx0XHRcdFx0XHRcdGNsaWNrRGlyPWUucGFnZVg+bUNTQl9kcmFnZ2VyLm9mZnNldCgpLmxlZnQgPyAtMSA6IDEsXG5cdFx0XHRcdFx0XHRcdHRvPU1hdGguYWJzKG1DU0JfY29udGFpbmVyWzBdLm9mZnNldExlZnQpLShjbGlja0Rpciood3JhcHBlci53aWR0aCgpKjAuOSkpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0aWYoIWQub3ZlcmZsb3dlZFswXSl7cmV0dXJuO31cblx0XHRcdFx0XHRcdHZhciBkaXI9XCJ5XCIsXG5cdFx0XHRcdFx0XHRcdGNsaWNrRGlyPWUucGFnZVk+bUNTQl9kcmFnZ2VyLm9mZnNldCgpLnRvcCA/IC0xIDogMSxcblx0XHRcdFx0XHRcdFx0dG89TWF0aC5hYnMobUNTQl9jb250YWluZXJbMF0ub2Zmc2V0VG9wKS0oY2xpY2tEaXIqKHdyYXBwZXIuaGVpZ2h0KCkqMC45KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF9zY3JvbGxUbygkdGhpcyx0by50b1N0cmluZygpLHtkaXI6ZGlyLHNjcm9sbEVhc2luZzpcIm1jc0Vhc2VJbk91dFwifSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBcblx0XHRGT0NVUyBFVkVOVFxuXHRcdHNjcm9sbHMgY29udGVudCB2aWEgZWxlbWVudCBmb2N1cyAoZS5nLiBjbGlja2luZyBhbiBpbnB1dCwgcHJlc3NpbmcgVEFCIGtleSBldGMuKVxuXHRcdCovXG5cdFx0X2ZvY3VzPWZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgJHRoaXM9JCh0aGlzKSxkPSR0aGlzLmRhdGEocGx1Z2luUGZ4KSxvPWQub3B0LFxuXHRcdFx0XHRuYW1lc3BhY2U9cGx1Z2luUGZ4K1wiX1wiK2QuaWR4LFxuXHRcdFx0XHRtQ1NCX2NvbnRhaW5lcj0kKFwiI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyXCIpLFxuXHRcdFx0XHR3cmFwcGVyPW1DU0JfY29udGFpbmVyLnBhcmVudCgpO1xuXHRcdFx0bUNTQl9jb250YWluZXIuYmluZChcImZvY3VzaW4uXCIrbmFtZXNwYWNlLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR2YXIgZWw9JChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSxcblx0XHRcdFx0XHRuZXN0ZWQ9bUNTQl9jb250YWluZXIuZmluZChcIi5tQ3VzdG9tU2Nyb2xsQm94XCIpLmxlbmd0aCxcblx0XHRcdFx0XHRkdXI9MDtcblx0XHRcdFx0aWYoIWVsLmlzKG8uYWR2YW5jZWQuYXV0b1Njcm9sbE9uRm9jdXMpKXtyZXR1cm47fVxuXHRcdFx0XHRfc3RvcCgkdGhpcyk7XG5cdFx0XHRcdGNsZWFyVGltZW91dCgkdGhpc1swXS5fZm9jdXNUaW1lb3V0KTtcblx0XHRcdFx0JHRoaXNbMF0uX2ZvY3VzVGltZXI9bmVzdGVkID8gKGR1cisxNykqbmVzdGVkIDogMDtcblx0XHRcdFx0JHRoaXNbMF0uX2ZvY3VzVGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dmFyXHR0bz1bX2NoaWxkUG9zKGVsKVswXSxfY2hpbGRQb3MoZWwpWzFdXSxcblx0XHRcdFx0XHRcdGNvbnRlbnRQb3M9W21DU0JfY29udGFpbmVyWzBdLm9mZnNldFRvcCxtQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRMZWZ0XSxcblx0XHRcdFx0XHRcdGlzVmlzaWJsZT1bXG5cdFx0XHRcdFx0XHRcdChjb250ZW50UG9zWzBdK3RvWzBdPj0wICYmIGNvbnRlbnRQb3NbMF0rdG9bMF08d3JhcHBlci5oZWlnaHQoKS1lbC5vdXRlckhlaWdodChmYWxzZSkpLFxuXHRcdFx0XHRcdFx0XHQoY29udGVudFBvc1sxXSt0b1sxXT49MCAmJiBjb250ZW50UG9zWzBdK3RvWzFdPHdyYXBwZXIud2lkdGgoKS1lbC5vdXRlcldpZHRoKGZhbHNlKSlcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRvdmVyd3JpdGU9KG8uYXhpcz09PVwieXhcIiAmJiAhaXNWaXNpYmxlWzBdICYmICFpc1Zpc2libGVbMV0pID8gXCJub25lXCIgOiBcImFsbFwiO1xuXHRcdFx0XHRcdGlmKG8uYXhpcyE9PVwieFwiICYmICFpc1Zpc2libGVbMF0pe1xuXHRcdFx0XHRcdFx0X3Njcm9sbFRvKCR0aGlzLHRvWzBdLnRvU3RyaW5nKCkse2RpcjpcInlcIixzY3JvbGxFYXNpbmc6XCJtY3NFYXNlSW5PdXRcIixvdmVyd3JpdGU6b3ZlcndyaXRlLGR1cjpkdXJ9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoby5heGlzIT09XCJ5XCIgJiYgIWlzVmlzaWJsZVsxXSl7XG5cdFx0XHRcdFx0XHRfc2Nyb2xsVG8oJHRoaXMsdG9bMV0udG9TdHJpbmcoKSx7ZGlyOlwieFwiLHNjcm9sbEVhc2luZzpcIm1jc0Vhc2VJbk91dFwiLG92ZXJ3cml0ZTpvdmVyd3JpdGUsZHVyOmR1cn0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwkdGhpc1swXS5fZm9jdXNUaW1lcik7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0Lyogc2V0cyBjb250ZW50IHdyYXBwZXIgc2Nyb2xsVG9wL3Njcm9sbExlZnQgYWx3YXlzIHRvIDAgKi9cblx0XHRfd3JhcHBlclNjcm9sbD1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksXG5cdFx0XHRcdG5hbWVzcGFjZT1wbHVnaW5QZngrXCJfXCIrZC5pZHgsXG5cdFx0XHRcdHdyYXBwZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKS5wYXJlbnQoKTtcblx0XHRcdHdyYXBwZXIuYmluZChcInNjcm9sbC5cIituYW1lc3BhY2UsZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGlmKHdyYXBwZXIuc2Nyb2xsVG9wKCkhPT0wIHx8IHdyYXBwZXIuc2Nyb2xsTGVmdCgpIT09MCl7XG5cdFx0XHRcdFx0JChcIi5tQ1NCX1wiK2QuaWR4K1wiX3Njcm9sbGJhclwiKS5jc3MoXCJ2aXNpYmlsaXR5XCIsXCJoaWRkZW5cIik7IC8qIGhpZGUgc2Nyb2xsYmFyKHMpICovXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBcblx0XHRCVVRUT05TIEVWRU5UU1xuXHRcdHNjcm9sbHMgY29udGVudCB2aWEgdXAsIGRvd24sIGxlZnQgYW5kIHJpZ2h0IGJ1dHRvbnMgXG5cdFx0Ki9cblx0XHRfYnV0dG9ucz1mdW5jdGlvbigpe1xuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxzZXE9ZC5zZXF1ZW50aWFsLFxuXHRcdFx0XHRuYW1lc3BhY2U9cGx1Z2luUGZ4K1wiX1wiK2QuaWR4LFxuXHRcdFx0XHRzZWw9XCIubUNTQl9cIitkLmlkeCtcIl9zY3JvbGxiYXJcIixcblx0XHRcdFx0YnRuPSQoc2VsK1wiPmFcIik7XG5cdFx0XHRidG4uYmluZChcImNvbnRleHRtZW51LlwiK25hbWVzcGFjZSxmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvL3ByZXZlbnQgcmlnaHQgY2xpY2tcblx0XHRcdH0pLmJpbmQoXCJtb3VzZWRvd24uXCIrbmFtZXNwYWNlK1wiIHRvdWNoc3RhcnQuXCIrbmFtZXNwYWNlK1wiIHBvaW50ZXJkb3duLlwiK25hbWVzcGFjZStcIiBNU1BvaW50ZXJEb3duLlwiK25hbWVzcGFjZStcIiBtb3VzZXVwLlwiK25hbWVzcGFjZStcIiB0b3VjaGVuZC5cIituYW1lc3BhY2UrXCIgcG9pbnRlcnVwLlwiK25hbWVzcGFjZStcIiBNU1BvaW50ZXJVcC5cIituYW1lc3BhY2UrXCIgbW91c2VvdXQuXCIrbmFtZXNwYWNlK1wiIHBvaW50ZXJvdXQuXCIrbmFtZXNwYWNlK1wiIE1TUG9pbnRlck91dC5cIituYW1lc3BhY2UrXCIgY2xpY2suXCIrbmFtZXNwYWNlLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGlmKCFfbW91c2VCdG5MZWZ0KGUpKXtyZXR1cm47fSAvKiBsZWZ0IG1vdXNlIGJ1dHRvbiBvbmx5ICovXG5cdFx0XHRcdHZhciBidG5DbGFzcz0kKHRoaXMpLmF0dHIoXCJjbGFzc1wiKTtcblx0XHRcdFx0c2VxLnR5cGU9by5zY3JvbGxCdXR0b25zLnNjcm9sbFR5cGU7XG5cdFx0XHRcdHN3aXRjaChlLnR5cGUpe1xuXHRcdFx0XHRcdGNhc2UgXCJtb3VzZWRvd25cIjogY2FzZSBcInRvdWNoc3RhcnRcIjogY2FzZSBcInBvaW50ZXJkb3duXCI6IGNhc2UgXCJNU1BvaW50ZXJEb3duXCI6XG5cdFx0XHRcdFx0XHRpZihzZXEudHlwZT09PVwic3RlcHBlZFwiKXtyZXR1cm47fVxuXHRcdFx0XHRcdFx0dG91Y2hBY3RpdmU9dHJ1ZTtcblx0XHRcdFx0XHRcdGQudHdlZW5SdW5uaW5nPWZhbHNlO1xuXHRcdFx0XHRcdFx0X3NlcShcIm9uXCIsYnRuQ2xhc3MpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIm1vdXNldXBcIjogY2FzZSBcInRvdWNoZW5kXCI6IGNhc2UgXCJwb2ludGVydXBcIjogY2FzZSBcIk1TUG9pbnRlclVwXCI6XG5cdFx0XHRcdFx0Y2FzZSBcIm1vdXNlb3V0XCI6IGNhc2UgXCJwb2ludGVyb3V0XCI6IGNhc2UgXCJNU1BvaW50ZXJPdXRcIjpcblx0XHRcdFx0XHRcdGlmKHNlcS50eXBlPT09XCJzdGVwcGVkXCIpe3JldHVybjt9XG5cdFx0XHRcdFx0XHR0b3VjaEFjdGl2ZT1mYWxzZTtcblx0XHRcdFx0XHRcdGlmKHNlcS5kaXIpe19zZXEoXCJvZmZcIixidG5DbGFzcyk7fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcImNsaWNrXCI6XG5cdFx0XHRcdFx0XHRpZihzZXEudHlwZSE9PVwic3RlcHBlZFwiIHx8IGQudHdlZW5SdW5uaW5nKXtyZXR1cm47fVxuXHRcdFx0XHRcdFx0X3NlcShcIm9uXCIsYnRuQ2xhc3MpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gX3NlcShhLGMpe1xuXHRcdFx0XHRcdHNlcS5zY3JvbGxBbW91bnQ9by5zY3JvbGxCdXR0b25zLnNjcm9sbEFtb3VudDtcblx0XHRcdFx0XHRfc2VxdWVudGlhbFNjcm9sbCgkdGhpcyxhLGMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogXG5cdFx0S0VZQk9BUkQgRVZFTlRTXG5cdFx0c2Nyb2xscyBjb250ZW50IHZpYSBrZXlib2FyZCBcblx0XHRLZXlzOiB1cCBhcnJvdywgZG93biBhcnJvdywgbGVmdCBhcnJvdywgcmlnaHQgYXJyb3csIFBnVXAsIFBnRG4sIEhvbWUsIEVuZFxuXHRcdCovXG5cdFx0X2tleWJvYXJkPWZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgJHRoaXM9JCh0aGlzKSxkPSR0aGlzLmRhdGEocGx1Z2luUGZ4KSxvPWQub3B0LHNlcT1kLnNlcXVlbnRpYWwsXG5cdFx0XHRcdG5hbWVzcGFjZT1wbHVnaW5QZngrXCJfXCIrZC5pZHgsXG5cdFx0XHRcdG1DdXN0b21TY3JvbGxCb3g9JChcIiNtQ1NCX1wiK2QuaWR4KSxcblx0XHRcdFx0bUNTQl9jb250YWluZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0d3JhcHBlcj1tQ1NCX2NvbnRhaW5lci5wYXJlbnQoKSxcblx0XHRcdFx0ZWRpdGFibGVzPVwiaW5wdXQsdGV4dGFyZWEsc2VsZWN0LGRhdGFsaXN0LGtleWdlbixbY29udGVudGVkaXRhYmxlPSd0cnVlJ11cIixcblx0XHRcdFx0aWZyYW1lPW1DU0JfY29udGFpbmVyLmZpbmQoXCJpZnJhbWVcIiksXG5cdFx0XHRcdGV2ZW50cz1bXCJibHVyLlwiK25hbWVzcGFjZStcIiBrZXlkb3duLlwiK25hbWVzcGFjZStcIiBrZXl1cC5cIituYW1lc3BhY2VdO1xuXHRcdFx0aWYoaWZyYW1lLmxlbmd0aCl7XG5cdFx0XHRcdGlmcmFtZS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0JCh0aGlzKS5iaW5kKFwibG9hZFwiLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHQvKiBiaW5kIGV2ZW50cyBvbiBhY2Nlc3NpYmxlIGlmcmFtZXMgKi9cblx0XHRcdFx0XHRcdGlmKF9jYW5BY2Nlc3NJRnJhbWUodGhpcykpe1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMuY29udGVudERvY3VtZW50IHx8IHRoaXMuY29udGVudFdpbmRvdy5kb2N1bWVudCkuYmluZChldmVudHNbMF0sZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRcdFx0X29uS2V5Ym9hcmQoZSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdG1DdXN0b21TY3JvbGxCb3guYXR0cihcInRhYmluZGV4XCIsXCIwXCIpLmJpbmQoZXZlbnRzWzBdLGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRfb25LZXlib2FyZChlKTtcblx0XHRcdH0pO1xuXHRcdFx0ZnVuY3Rpb24gX29uS2V5Ym9hcmQoZSl7XG5cdFx0XHRcdHN3aXRjaChlLnR5cGUpe1xuXHRcdFx0XHRcdGNhc2UgXCJibHVyXCI6XG5cdFx0XHRcdFx0XHRpZihkLnR3ZWVuUnVubmluZyAmJiBzZXEuZGlyKXtfc2VxKFwib2ZmXCIsbnVsbCk7fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcImtleWRvd25cIjogY2FzZSBcImtleXVwXCI6XG5cdFx0XHRcdFx0XHR2YXIgY29kZT1lLmtleUNvZGUgPyBlLmtleUNvZGUgOiBlLndoaWNoLGFjdGlvbj1cIm9uXCI7XG5cdFx0XHRcdFx0XHRpZigoby5heGlzIT09XCJ4XCIgJiYgKGNvZGU9PT0zOCB8fCBjb2RlPT09NDApKSB8fCAoby5heGlzIT09XCJ5XCIgJiYgKGNvZGU9PT0zNyB8fCBjb2RlPT09MzkpKSl7XG5cdFx0XHRcdFx0XHRcdC8qIHVwICgzOCksIGRvd24gKDQwKSwgbGVmdCAoMzcpLCByaWdodCAoMzkpIGFycm93cyAqL1xuXHRcdFx0XHRcdFx0XHRpZigoKGNvZGU9PT0zOCB8fCBjb2RlPT09NDApICYmICFkLm92ZXJmbG93ZWRbMF0pIHx8ICgoY29kZT09PTM3IHx8IGNvZGU9PT0zOSkgJiYgIWQub3ZlcmZsb3dlZFsxXSkpe3JldHVybjt9XG5cdFx0XHRcdFx0XHRcdGlmKGUudHlwZT09PVwia2V5dXBcIil7YWN0aW9uPVwib2ZmXCI7fVxuXHRcdFx0XHRcdFx0XHRpZighJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5pcyhlZGl0YWJsZXMpKXtcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0XHRfc2VxKGFjdGlvbixjb2RlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fWVsc2UgaWYoY29kZT09PTMzIHx8IGNvZGU9PT0zNCl7XG5cdFx0XHRcdFx0XHRcdC8qIFBnVXAgKDMzKSwgUGdEbiAoMzQpICovXG5cdFx0XHRcdFx0XHRcdGlmKGQub3ZlcmZsb3dlZFswXSB8fCBkLm92ZXJmbG93ZWRbMV0pe1xuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGUudHlwZT09PVwia2V5dXBcIil7XG5cdFx0XHRcdFx0XHRcdFx0X3N0b3AoJHRoaXMpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciBrZXlib2FyZERpcj1jb2RlPT09MzQgPyAtMSA6IDE7XG5cdFx0XHRcdFx0XHRcdFx0aWYoby5heGlzPT09XCJ4XCIgfHwgKG8uYXhpcz09PVwieXhcIiAmJiBkLm92ZXJmbG93ZWRbMV0gJiYgIWQub3ZlcmZsb3dlZFswXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGRpcj1cInhcIix0bz1NYXRoLmFicyhtQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRMZWZ0KS0oa2V5Ym9hcmREaXIqKHdyYXBwZXIud2lkdGgoKSowLjkpKTtcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBkaXI9XCJ5XCIsdG89TWF0aC5hYnMobUNTQl9jb250YWluZXJbMF0ub2Zmc2V0VG9wKS0oa2V5Ym9hcmREaXIqKHdyYXBwZXIuaGVpZ2h0KCkqMC45KSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdF9zY3JvbGxUbygkdGhpcyx0by50b1N0cmluZygpLHtkaXI6ZGlyLHNjcm9sbEVhc2luZzpcIm1jc0Vhc2VJbk91dFwifSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1lbHNlIGlmKGNvZGU9PT0zNSB8fCBjb2RlPT09MzYpe1xuXHRcdFx0XHRcdFx0XHQvKiBFbmQgKDM1KSwgSG9tZSAoMzYpICovXG5cdFx0XHRcdFx0XHRcdGlmKCEkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKGVkaXRhYmxlcykpe1xuXHRcdFx0XHRcdFx0XHRcdGlmKGQub3ZlcmZsb3dlZFswXSB8fCBkLm92ZXJmbG93ZWRbMV0pe1xuXHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoZS50eXBlPT09XCJrZXl1cFwiKXtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKG8uYXhpcz09PVwieFwiIHx8IChvLmF4aXM9PT1cInl4XCIgJiYgZC5vdmVyZmxvd2VkWzFdICYmICFkLm92ZXJmbG93ZWRbMF0pKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGRpcj1cInhcIix0bz1jb2RlPT09MzUgPyBNYXRoLmFicyh3cmFwcGVyLndpZHRoKCktbUNTQl9jb250YWluZXIub3V0ZXJXaWR0aChmYWxzZSkpIDogMDtcblx0XHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgZGlyPVwieVwiLHRvPWNvZGU9PT0zNSA/IE1hdGguYWJzKHdyYXBwZXIuaGVpZ2h0KCktbUNTQl9jb250YWluZXIub3V0ZXJIZWlnaHQoZmFsc2UpKSA6IDA7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRfc2Nyb2xsVG8oJHRoaXMsdG8udG9TdHJpbmcoKSx7ZGlyOmRpcixzY3JvbGxFYXNpbmc6XCJtY3NFYXNlSW5PdXRcIn0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gX3NlcShhLGMpe1xuXHRcdFx0XHRcdHNlcS50eXBlPW8ua2V5Ym9hcmQuc2Nyb2xsVHlwZTtcblx0XHRcdFx0XHRzZXEuc2Nyb2xsQW1vdW50PW8ua2V5Ym9hcmQuc2Nyb2xsQW1vdW50O1xuXHRcdFx0XHRcdGlmKHNlcS50eXBlPT09XCJzdGVwcGVkXCIgJiYgZC50d2VlblJ1bm5pbmcpe3JldHVybjt9XG5cdFx0XHRcdFx0X3NlcXVlbnRpYWxTY3JvbGwoJHRoaXMsYSxjKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBzY3JvbGxzIGNvbnRlbnQgc2VxdWVudGlhbGx5ICh1c2VkIHdoZW4gc2Nyb2xsaW5nIHZpYSBidXR0b25zLCBrZXlib2FyZCBhcnJvd3MgZXRjLikgKi9cblx0XHRfc2VxdWVudGlhbFNjcm9sbD1mdW5jdGlvbihlbCxhY3Rpb24sdHJpZ2dlcixlLHMpe1xuXHRcdFx0dmFyIGQ9ZWwuZGF0YShwbHVnaW5QZngpLG89ZC5vcHQsc2VxPWQuc2VxdWVudGlhbCxcblx0XHRcdFx0bUNTQl9jb250YWluZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0b25jZT1zZXEudHlwZT09PVwic3RlcHBlZFwiID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHRzdGVwbGVzc1NwZWVkPW8uc2Nyb2xsSW5lcnRpYSA8IDI2ID8gMjYgOiBvLnNjcm9sbEluZXJ0aWEsIC8qIDI2LzEuNT0xNyAqL1xuXHRcdFx0XHRzdGVwcGVkU3BlZWQ9by5zY3JvbGxJbmVydGlhIDwgMSA/IDE3IDogby5zY3JvbGxJbmVydGlhO1xuXHRcdFx0c3dpdGNoKGFjdGlvbil7XG5cdFx0XHRcdGNhc2UgXCJvblwiOlxuXHRcdFx0XHRcdHNlcS5kaXI9W1xuXHRcdFx0XHRcdFx0KHRyaWdnZXI9PT1jbGFzc2VzWzE2XSB8fCB0cmlnZ2VyPT09Y2xhc3Nlc1sxNV0gfHwgdHJpZ2dlcj09PTM5IHx8IHRyaWdnZXI9PT0zNyA/IFwieFwiIDogXCJ5XCIpLFxuXHRcdFx0XHRcdFx0KHRyaWdnZXI9PT1jbGFzc2VzWzEzXSB8fCB0cmlnZ2VyPT09Y2xhc3Nlc1sxNV0gfHwgdHJpZ2dlcj09PTM4IHx8IHRyaWdnZXI9PT0zNyA/IC0xIDogMSlcblx0XHRcdFx0XHRdO1xuXHRcdFx0XHRcdF9zdG9wKGVsKTtcblx0XHRcdFx0XHRpZihfaXNOdW1lcmljKHRyaWdnZXIpICYmIHNlcS50eXBlPT09XCJzdGVwcGVkXCIpe3JldHVybjt9XG5cdFx0XHRcdFx0X29uKG9uY2UpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwib2ZmXCI6XG5cdFx0XHRcdFx0X29mZigpO1xuXHRcdFx0XHRcdGlmKG9uY2UgfHwgKGQudHdlZW5SdW5uaW5nICYmIHNlcS5kaXIpKXtcblx0XHRcdFx0XHRcdF9vbih0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8qIHN0YXJ0cyBzZXF1ZW5jZSAqL1xuXHRcdFx0ZnVuY3Rpb24gX29uKG9uY2Upe1xuXHRcdFx0XHRpZihvLnNuYXBBbW91bnQpe3NlcS5zY3JvbGxBbW91bnQ9IShvLnNuYXBBbW91bnQgaW5zdGFuY2VvZiBBcnJheSkgPyBvLnNuYXBBbW91bnQgOiBzZXEuZGlyWzBdPT09XCJ4XCIgPyBvLnNuYXBBbW91bnRbMV0gOiBvLnNuYXBBbW91bnRbMF07fSAvKiBzY3JvbGxpbmcgc25hcHBpbmcgKi9cblx0XHRcdFx0dmFyIGM9c2VxLnR5cGUhPT1cInN0ZXBwZWRcIiwgLyogY29udGludW91cyBzY3JvbGxpbmcgKi9cblx0XHRcdFx0XHR0PXMgPyBzIDogIW9uY2UgPyAxMDAwLzYwIDogYyA/IHN0ZXBsZXNzU3BlZWQvMS41IDogc3RlcHBlZFNwZWVkLCAvKiB0aW1lciAqL1xuXHRcdFx0XHRcdG09IW9uY2UgPyAyLjUgOiBjID8gNy41IDogNDAsIC8qIG11bHRpcGxpZXIgKi9cblx0XHRcdFx0XHRjb250ZW50UG9zPVtNYXRoLmFicyhtQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRUb3ApLE1hdGguYWJzKG1DU0JfY29udGFpbmVyWzBdLm9mZnNldExlZnQpXSxcblx0XHRcdFx0XHRyYXRpbz1bZC5zY3JvbGxSYXRpby55PjEwID8gMTAgOiBkLnNjcm9sbFJhdGlvLnksZC5zY3JvbGxSYXRpby54PjEwID8gMTAgOiBkLnNjcm9sbFJhdGlvLnhdLFxuXHRcdFx0XHRcdGFtb3VudD1zZXEuZGlyWzBdPT09XCJ4XCIgPyBjb250ZW50UG9zWzFdKyhzZXEuZGlyWzFdKihyYXRpb1sxXSptKSkgOiBjb250ZW50UG9zWzBdKyhzZXEuZGlyWzFdKihyYXRpb1swXSptKSksXG5cdFx0XHRcdFx0cHg9c2VxLmRpclswXT09PVwieFwiID8gY29udGVudFBvc1sxXSsoc2VxLmRpclsxXSpwYXJzZUludChzZXEuc2Nyb2xsQW1vdW50KSkgOiBjb250ZW50UG9zWzBdKyhzZXEuZGlyWzFdKnBhcnNlSW50KHNlcS5zY3JvbGxBbW91bnQpKSxcblx0XHRcdFx0XHR0bz1zZXEuc2Nyb2xsQW1vdW50IT09XCJhdXRvXCIgPyBweCA6IGFtb3VudCxcblx0XHRcdFx0XHRlYXNpbmc9ZSA/IGUgOiAhb25jZSA/IFwibWNzTGluZWFyXCIgOiBjID8gXCJtY3NMaW5lYXJPdXRcIiA6IFwibWNzRWFzZUluT3V0XCIsXG5cdFx0XHRcdFx0b25Db21wbGV0ZT0hb25jZSA/IGZhbHNlIDogdHJ1ZTtcblx0XHRcdFx0aWYob25jZSAmJiB0PDE3KXtcblx0XHRcdFx0XHR0bz1zZXEuZGlyWzBdPT09XCJ4XCIgPyBjb250ZW50UG9zWzFdIDogY29udGVudFBvc1swXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfc2Nyb2xsVG8oZWwsdG8udG9TdHJpbmcoKSx7ZGlyOnNlcS5kaXJbMF0sc2Nyb2xsRWFzaW5nOmVhc2luZyxkdXI6dCxvbkNvbXBsZXRlOm9uQ29tcGxldGV9KTtcblx0XHRcdFx0aWYob25jZSl7XG5cdFx0XHRcdFx0c2VxLmRpcj1mYWxzZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHNlcS5zdGVwKTtcblx0XHRcdFx0c2VxLnN0ZXA9c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdF9vbigpO1xuXHRcdFx0XHR9LHQpO1xuXHRcdFx0fVxuXHRcdFx0Lyogc3RvcHMgc2VxdWVuY2UgKi9cblx0XHRcdGZ1bmN0aW9uIF9vZmYoKXtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHNlcS5zdGVwKTtcblx0XHRcdFx0X2RlbGV0ZShzZXEsXCJzdGVwXCIpO1xuXHRcdFx0XHRfc3RvcChlbCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIHJldHVybnMgYSB5eCBhcnJheSBmcm9tIHZhbHVlICovXG5cdFx0X2Fycj1mdW5jdGlvbih2YWwpe1xuXHRcdFx0dmFyIG89JCh0aGlzKS5kYXRhKHBsdWdpblBmeCkub3B0LHZhbHM9W107XG5cdFx0XHRpZih0eXBlb2YgdmFsPT09XCJmdW5jdGlvblwiKXt2YWw9dmFsKCk7fSAvKiBjaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBzaW5nbGUgYW5vbnltb3VzIGZ1bmN0aW9uICovXG5cdFx0XHQvKiBjaGVjayBpZiB2YWx1ZSBpcyBvYmplY3Qgb3IgYXJyYXksIGl0cyBsZW5ndGggYW5kIGNyZWF0ZSBhbiBhcnJheSB3aXRoIHl4IHZhbHVlcyAqL1xuXHRcdFx0aWYoISh2YWwgaW5zdGFuY2VvZiBBcnJheSkpeyAvKiBvYmplY3QgdmFsdWUgKGUuZy4ge3k6XCIxMDBcIix4OlwiMTAwXCJ9LCAxMDAgZXRjLikgKi9cblx0XHRcdFx0dmFsc1swXT12YWwueSA/IHZhbC55IDogdmFsLnggfHwgby5heGlzPT09XCJ4XCIgPyBudWxsIDogdmFsO1xuXHRcdFx0XHR2YWxzWzFdPXZhbC54ID8gdmFsLnggOiB2YWwueSB8fCBvLmF4aXM9PT1cInlcIiA/IG51bGwgOiB2YWw7XG5cdFx0XHR9ZWxzZXsgLyogYXJyYXkgdmFsdWUgKGUuZy4gWzEwMCwxMDBdKSAqL1xuXHRcdFx0XHR2YWxzPXZhbC5sZW5ndGg+MSA/IFt2YWxbMF0sdmFsWzFdXSA6IG8uYXhpcz09PVwieFwiID8gW251bGwsdmFsWzBdXSA6IFt2YWxbMF0sbnVsbF07XG5cdFx0XHR9XG5cdFx0XHQvKiBjaGVjayBpZiBhcnJheSB2YWx1ZXMgYXJlIGFub255bW91cyBmdW5jdGlvbnMgKi9cblx0XHRcdGlmKHR5cGVvZiB2YWxzWzBdPT09XCJmdW5jdGlvblwiKXt2YWxzWzBdPXZhbHNbMF0oKTt9XG5cdFx0XHRpZih0eXBlb2YgdmFsc1sxXT09PVwiZnVuY3Rpb25cIil7dmFsc1sxXT12YWxzWzFdKCk7fVxuXHRcdFx0cmV0dXJuIHZhbHM7XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIHRyYW5zbGF0ZXMgdmFsdWVzIChlLmcuIFwidG9wXCIsIDEwMCwgXCIxMDBweFwiLCBcIiNpZFwiKSB0byBhY3R1YWwgc2Nyb2xsLXRvIHBvc2l0aW9ucyAqL1xuXHRcdF90bz1mdW5jdGlvbih2YWwsZGlyKXtcblx0XHRcdGlmKHZhbD09bnVsbCB8fCB0eXBlb2YgdmFsPT1cInVuZGVmaW5lZFwiKXtyZXR1cm47fVxuXHRcdFx0dmFyICR0aGlzPSQodGhpcyksZD0kdGhpcy5kYXRhKHBsdWdpblBmeCksbz1kLm9wdCxcblx0XHRcdFx0bUNTQl9jb250YWluZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2NvbnRhaW5lclwiKSxcblx0XHRcdFx0d3JhcHBlcj1tQ1NCX2NvbnRhaW5lci5wYXJlbnQoKSxcblx0XHRcdFx0dD10eXBlb2YgdmFsO1xuXHRcdFx0aWYoIWRpcil7ZGlyPW8uYXhpcz09PVwieFwiID8gXCJ4XCIgOiBcInlcIjt9XG5cdFx0XHR2YXIgY29udGVudExlbmd0aD1kaXI9PT1cInhcIiA/IG1DU0JfY29udGFpbmVyLm91dGVyV2lkdGgoZmFsc2UpLXdyYXBwZXIud2lkdGgoKSA6IG1DU0JfY29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKS13cmFwcGVyLmhlaWdodCgpLFxuXHRcdFx0XHRjb250ZW50UG9zPWRpcj09PVwieFwiID8gbUNTQl9jb250YWluZXJbMF0ub2Zmc2V0TGVmdCA6IG1DU0JfY29udGFpbmVyWzBdLm9mZnNldFRvcCxcblx0XHRcdFx0Y3NzUHJvcD1kaXI9PT1cInhcIiA/IFwibGVmdFwiIDogXCJ0b3BcIjtcblx0XHRcdHN3aXRjaCh0KXtcblx0XHRcdFx0Y2FzZSBcImZ1bmN0aW9uXCI6IC8qIHRoaXMgY3VycmVudGx5IGlzIG5vdCB1c2VkLiBDb25zaWRlciByZW1vdmluZyBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiB2YWwoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOiAvKiBqcy9qcXVlcnkgb2JqZWN0ICovXG5cdFx0XHRcdFx0dmFyIG9iaj12YWwuanF1ZXJ5ID8gdmFsIDogJCh2YWwpO1xuXHRcdFx0XHRcdGlmKCFvYmoubGVuZ3RoKXtyZXR1cm47fVxuXHRcdFx0XHRcdHJldHVybiBkaXI9PT1cInhcIiA/IF9jaGlsZFBvcyhvYmopWzFdIDogX2NoaWxkUG9zKG9iailbMF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjogY2FzZSBcIm51bWJlclwiOlxuXHRcdFx0XHRcdGlmKF9pc051bWVyaWModmFsKSl7IC8qIG51bWVyaWMgdmFsdWUgKi9cblx0XHRcdFx0XHRcdHJldHVybiBNYXRoLmFicyh2YWwpO1xuXHRcdFx0XHRcdH1lbHNlIGlmKHZhbC5pbmRleE9mKFwiJVwiKSE9PS0xKXsgLyogcGVyY2VudGFnZSB2YWx1ZSAqL1xuXHRcdFx0XHRcdFx0cmV0dXJuIE1hdGguYWJzKGNvbnRlbnRMZW5ndGgqcGFyc2VJbnQodmFsKS8xMDApO1xuXHRcdFx0XHRcdH1lbHNlIGlmKHZhbC5pbmRleE9mKFwiLT1cIikhPT0tMSl7IC8qIGRlY3JlYXNlIHZhbHVlICovXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5hYnMoY29udGVudFBvcy1wYXJzZUludCh2YWwuc3BsaXQoXCItPVwiKVsxXSkpO1xuXHRcdFx0XHRcdH1lbHNlIGlmKHZhbC5pbmRleE9mKFwiKz1cIikhPT0tMSl7IC8qIGlucmVhc2UgdmFsdWUgKi9cblx0XHRcdFx0XHRcdHZhciBwPShjb250ZW50UG9zK3BhcnNlSW50KHZhbC5zcGxpdChcIis9XCIpWzFdKSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcD49MCA/IDAgOiBNYXRoLmFicyhwKTtcblx0XHRcdFx0XHR9ZWxzZSBpZih2YWwuaW5kZXhPZihcInB4XCIpIT09LTEgJiYgX2lzTnVtZXJpYyh2YWwuc3BsaXQoXCJweFwiKVswXSkpeyAvKiBwaXhlbHMgc3RyaW5nIHZhbHVlIChlLmcuIFwiMTAwcHhcIikgKi9cblx0XHRcdFx0XHRcdHJldHVybiBNYXRoLmFicyh2YWwuc3BsaXQoXCJweFwiKVswXSk7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRpZih2YWw9PT1cInRvcFwiIHx8IHZhbD09PVwibGVmdFwiKXsgLyogc3BlY2lhbCBzdHJpbmdzICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdFx0fWVsc2UgaWYodmFsPT09XCJib3R0b21cIil7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBNYXRoLmFicyh3cmFwcGVyLmhlaWdodCgpLW1DU0JfY29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKSk7XG5cdFx0XHRcdFx0XHR9ZWxzZSBpZih2YWw9PT1cInJpZ2h0XCIpe1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5hYnMod3JhcHBlci53aWR0aCgpLW1DU0JfY29udGFpbmVyLm91dGVyV2lkdGgoZmFsc2UpKTtcblx0XHRcdFx0XHRcdH1lbHNlIGlmKHZhbD09PVwiZmlyc3RcIiB8fCB2YWw9PT1cImxhc3RcIil7XG5cdFx0XHRcdFx0XHRcdHZhciBvYmo9bUNTQl9jb250YWluZXIuZmluZChcIjpcIit2YWwpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZGlyPT09XCJ4XCIgPyBfY2hpbGRQb3Mob2JqKVsxXSA6IF9jaGlsZFBvcyhvYmopWzBdO1xuXHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdGlmKCQodmFsKS5sZW5ndGgpeyAvKiBqcXVlcnkgc2VsZWN0b3IgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZGlyPT09XCJ4XCIgPyBfY2hpbGRQb3MoJCh2YWwpKVsxXSA6IF9jaGlsZFBvcygkKHZhbCkpWzBdO1xuXHRcdFx0XHRcdFx0XHR9ZWxzZXsgLyogb3RoZXIgdmFsdWVzIChlLmcuIFwiMTAwZW1cIikgKi9cblx0XHRcdFx0XHRcdFx0XHRtQ1NCX2NvbnRhaW5lci5jc3MoY3NzUHJvcCx2YWwpO1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMudXBkYXRlLmNhbGwobnVsbCwkdGhpc1swXSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBjYWxscyB0aGUgdXBkYXRlIG1ldGhvZCBhdXRvbWF0aWNhbGx5ICovXG5cdFx0X2F1dG9VcGRhdGU9ZnVuY3Rpb24ocmVtKXtcblx0XHRcdHZhciAkdGhpcz0kKHRoaXMpLGQ9JHRoaXMuZGF0YShwbHVnaW5QZngpLG89ZC5vcHQsXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIik7XG5cdFx0XHRpZihyZW0pe1xuXHRcdFx0XHQvKiBcblx0XHRcdFx0cmVtb3ZlcyBhdXRvVXBkYXRlIHRpbWVyIFxuXHRcdFx0XHR1c2FnZTogX2F1dG9VcGRhdGUuY2FsbCh0aGlzLFwicmVtb3ZlXCIpO1xuXHRcdFx0XHQqL1xuXHRcdFx0XHRjbGVhclRpbWVvdXQobUNTQl9jb250YWluZXJbMF0uYXV0b1VwZGF0ZSk7XG5cdFx0XHRcdF9kZWxldGUobUNTQl9jb250YWluZXJbMF0sXCJhdXRvVXBkYXRlXCIpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR1cGQoKTtcblx0XHRcdGZ1bmN0aW9uIHVwZCgpe1xuXHRcdFx0XHRjbGVhclRpbWVvdXQobUNTQl9jb250YWluZXJbMF0uYXV0b1VwZGF0ZSk7XG5cdFx0XHRcdGlmKCR0aGlzLnBhcmVudHMoXCJodG1sXCIpLmxlbmd0aD09PTApe1xuXHRcdFx0XHRcdC8qIGNoZWNrIGVsZW1lbnQgaW4gZG9tIHRyZWUgKi9cblx0XHRcdFx0XHQkdGhpcz1udWxsO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRtQ1NCX2NvbnRhaW5lclswXS5hdXRvVXBkYXRlPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQvKiB1cGRhdGUgb24gc3BlY2lmaWMgc2VsZWN0b3IocykgbGVuZ3RoIGFuZCBzaXplIGNoYW5nZSAqL1xuXHRcdFx0XHRcdGlmKG8uYWR2YW5jZWQudXBkYXRlT25TZWxlY3RvckNoYW5nZSl7XG5cdFx0XHRcdFx0XHRkLnBvbGwuY2hhbmdlLm49c2l6ZXNTdW0oKTtcblx0XHRcdFx0XHRcdGlmKGQucG9sbC5jaGFuZ2UubiE9PWQucG9sbC5jaGFuZ2Uubyl7XG5cdFx0XHRcdFx0XHRcdGQucG9sbC5jaGFuZ2Uubz1kLnBvbGwuY2hhbmdlLm47XG5cdFx0XHRcdFx0XHRcdGRvVXBkKDMpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8qIHVwZGF0ZSBvbiBtYWluIGVsZW1lbnQgYW5kIHNjcm9sbGJhciBzaXplIGNoYW5nZXMgKi9cblx0XHRcdFx0XHRpZihvLmFkdmFuY2VkLnVwZGF0ZU9uQ29udGVudFJlc2l6ZSl7XG5cdFx0XHRcdFx0XHRkLnBvbGwuc2l6ZS5uPSR0aGlzWzBdLnNjcm9sbEhlaWdodCskdGhpc1swXS5zY3JvbGxXaWR0aCttQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRIZWlnaHQrJHRoaXNbMF0ub2Zmc2V0SGVpZ2h0KyR0aGlzWzBdLm9mZnNldFdpZHRoO1xuXHRcdFx0XHRcdFx0aWYoZC5wb2xsLnNpemUubiE9PWQucG9sbC5zaXplLm8pe1xuXHRcdFx0XHRcdFx0XHRkLnBvbGwuc2l6ZS5vPWQucG9sbC5zaXplLm47XG5cdFx0XHRcdFx0XHRcdGRvVXBkKDEpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8qIHVwZGF0ZSBvbiBpbWFnZSBsb2FkICovXG5cdFx0XHRcdFx0aWYoby5hZHZhbmNlZC51cGRhdGVPbkltYWdlTG9hZCl7XG5cdFx0XHRcdFx0XHRpZighKG8uYWR2YW5jZWQudXBkYXRlT25JbWFnZUxvYWQ9PT1cImF1dG9cIiAmJiBvLmF4aXM9PT1cInlcIikpeyAvL2J5IGRlZmF1bHQsIGl0IGRvZXNuJ3QgcnVuIG9uIHZlcnRpY2FsIGNvbnRlbnRcblx0XHRcdFx0XHRcdFx0ZC5wb2xsLmltZy5uPW1DU0JfY29udGFpbmVyLmZpbmQoXCJpbWdcIikubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRpZihkLnBvbGwuaW1nLm4hPT1kLnBvbGwuaW1nLm8pe1xuXHRcdFx0XHRcdFx0XHRcdGQucG9sbC5pbWcubz1kLnBvbGwuaW1nLm47XG5cdFx0XHRcdFx0XHRcdFx0bUNTQl9jb250YWluZXIuZmluZChcImltZ1wiKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbWdMb2FkZXIodGhpcyk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKG8uYWR2YW5jZWQudXBkYXRlT25TZWxlY3RvckNoYW5nZSB8fCBvLmFkdmFuY2VkLnVwZGF0ZU9uQ29udGVudFJlc2l6ZSB8fCBvLmFkdmFuY2VkLnVwZGF0ZU9uSW1hZ2VMb2FkKXt1cGQoKTt9XG5cdFx0XHRcdH0sby5hZHZhbmNlZC5hdXRvVXBkYXRlVGltZW91dCk7XG5cdFx0XHR9XG5cdFx0XHQvKiBhIHRpbnkgaW1hZ2UgbG9hZGVyICovXG5cdFx0XHRmdW5jdGlvbiBpbWdMb2FkZXIoZWwpe1xuXHRcdFx0XHRpZigkKGVsKS5oYXNDbGFzcyhjbGFzc2VzWzJdKSl7ZG9VcGQoKTsgcmV0dXJuO31cblx0XHRcdFx0dmFyIGltZz1uZXcgSW1hZ2UoKTtcblx0XHRcdFx0ZnVuY3Rpb24gY3JlYXRlRGVsZWdhdGUoY29udGV4dE9iamVjdCxkZWxlZ2F0ZU1ldGhvZCl7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGRlbGVnYXRlTWV0aG9kLmFwcGx5KGNvbnRleHRPYmplY3QsYXJndW1lbnRzKTt9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gaW1nT25Mb2FkKCl7XG5cdFx0XHRcdFx0dGhpcy5vbmxvYWQ9bnVsbDtcblx0XHRcdFx0XHQkKGVsKS5hZGRDbGFzcyhjbGFzc2VzWzJdKTtcblx0XHRcdFx0XHRkb1VwZCgyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpbWcub25sb2FkPWNyZWF0ZURlbGVnYXRlKGltZyxpbWdPbkxvYWQpO1xuXHRcdFx0XHRpbWcuc3JjPWVsLnNyYztcblx0XHRcdH1cblx0XHRcdC8qIHJldHVybnMgdGhlIHRvdGFsIGhlaWdodCBhbmQgd2lkdGggc3VtIG9mIGFsbCBlbGVtZW50cyBtYXRjaGluZyB0aGUgc2VsZWN0b3IgKi9cblx0XHRcdGZ1bmN0aW9uIHNpemVzU3VtKCl7XG5cdFx0XHRcdGlmKG8uYWR2YW5jZWQudXBkYXRlT25TZWxlY3RvckNoYW5nZT09PXRydWUpe28uYWR2YW5jZWQudXBkYXRlT25TZWxlY3RvckNoYW5nZT1cIipcIjt9XG5cdFx0XHRcdHZhciB0b3RhbD0wLHNlbD1tQ1NCX2NvbnRhaW5lci5maW5kKG8uYWR2YW5jZWQudXBkYXRlT25TZWxlY3RvckNoYW5nZSk7XG5cdFx0XHRcdGlmKG8uYWR2YW5jZWQudXBkYXRlT25TZWxlY3RvckNoYW5nZSAmJiBzZWwubGVuZ3RoPjApe3NlbC5lYWNoKGZ1bmN0aW9uKCl7dG90YWwrPXRoaXMub2Zmc2V0SGVpZ2h0K3RoaXMub2Zmc2V0V2lkdGg7fSk7fVxuXHRcdFx0XHRyZXR1cm4gdG90YWw7XG5cdFx0XHR9XG5cdFx0XHQvKiBjYWxscyB0aGUgdXBkYXRlIG1ldGhvZCAqL1xuXHRcdFx0ZnVuY3Rpb24gZG9VcGQoY2Ipe1xuXHRcdFx0XHRjbGVhclRpbWVvdXQobUNTQl9jb250YWluZXJbMF0uYXV0b1VwZGF0ZSk7XG5cdFx0XHRcdG1ldGhvZHMudXBkYXRlLmNhbGwobnVsbCwkdGhpc1swXSxjYik7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIHNuYXBzIHNjcm9sbGluZyB0byBhIG11bHRpcGxlIG9mIGEgcGl4ZWxzIG51bWJlciAqL1xuXHRcdF9zbmFwQW1vdW50PWZ1bmN0aW9uKHRvLGFtb3VudCxvZmZzZXQpe1xuXHRcdFx0cmV0dXJuIChNYXRoLnJvdW5kKHRvL2Ftb3VudCkqYW1vdW50LW9mZnNldCk7IFxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBzdG9wcyBjb250ZW50IGFuZCBzY3JvbGxiYXIgYW5pbWF0aW9ucyAqL1xuXHRcdF9zdG9wPWZ1bmN0aW9uKGVsKXtcblx0XHRcdHZhciBkPWVsLmRhdGEocGx1Z2luUGZ4KSxcblx0XHRcdFx0c2VsPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXIsI21DU0JfXCIrZC5pZHgrXCJfY29udGFpbmVyX3dyYXBwZXIsI21DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl92ZXJ0aWNhbCwjbUNTQl9cIitkLmlkeCtcIl9kcmFnZ2VyX2hvcml6b250YWxcIik7XG5cdFx0XHRzZWwuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRfc3RvcFR3ZWVuLmNhbGwodGhpcyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogXG5cdFx0QU5JTUFURVMgQ09OVEVOVCBcblx0XHRUaGlzIGlzIHdoZXJlIHRoZSBhY3R1YWwgc2Nyb2xsaW5nIGhhcHBlbnNcblx0XHQqL1xuXHRcdF9zY3JvbGxUbz1mdW5jdGlvbihlbCx0byxvcHRpb25zKXtcblx0XHRcdHZhciBkPWVsLmRhdGEocGx1Z2luUGZ4KSxvPWQub3B0LFxuXHRcdFx0XHRkZWZhdWx0cz17XG5cdFx0XHRcdFx0dHJpZ2dlcjpcImludGVybmFsXCIsXG5cdFx0XHRcdFx0ZGlyOlwieVwiLFxuXHRcdFx0XHRcdHNjcm9sbEVhc2luZzpcIm1jc0Vhc2VPdXRcIixcblx0XHRcdFx0XHRkcmFnOmZhbHNlLFxuXHRcdFx0XHRcdGR1cjpvLnNjcm9sbEluZXJ0aWEsXG5cdFx0XHRcdFx0b3ZlcndyaXRlOlwiYWxsXCIsXG5cdFx0XHRcdFx0Y2FsbGJhY2tzOnRydWUsXG5cdFx0XHRcdFx0b25TdGFydDp0cnVlLFxuXHRcdFx0XHRcdG9uVXBkYXRlOnRydWUsXG5cdFx0XHRcdFx0b25Db21wbGV0ZTp0cnVlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM9JC5leHRlbmQoZGVmYXVsdHMsb3B0aW9ucyksXG5cdFx0XHRcdGR1cj1bb3B0aW9ucy5kdXIsKG9wdGlvbnMuZHJhZyA/IDAgOiBvcHRpb25zLmR1cildLFxuXHRcdFx0XHRtQ3VzdG9tU2Nyb2xsQm94PSQoXCIjbUNTQl9cIitkLmlkeCksXG5cdFx0XHRcdG1DU0JfY29udGFpbmVyPSQoXCIjbUNTQl9cIitkLmlkeCtcIl9jb250YWluZXJcIiksXG5cdFx0XHRcdHdyYXBwZXI9bUNTQl9jb250YWluZXIucGFyZW50KCksXG5cdFx0XHRcdHRvdGFsU2Nyb2xsT2Zmc2V0cz1vLmNhbGxiYWNrcy5vblRvdGFsU2Nyb2xsT2Zmc2V0ID8gX2Fyci5jYWxsKGVsLG8uY2FsbGJhY2tzLm9uVG90YWxTY3JvbGxPZmZzZXQpIDogWzAsMF0sXG5cdFx0XHRcdHRvdGFsU2Nyb2xsQmFja09mZnNldHM9by5jYWxsYmFja3Mub25Ub3RhbFNjcm9sbEJhY2tPZmZzZXQgPyBfYXJyLmNhbGwoZWwsby5jYWxsYmFja3Mub25Ub3RhbFNjcm9sbEJhY2tPZmZzZXQpIDogWzAsMF07XG5cdFx0XHRkLnRyaWdnZXI9b3B0aW9ucy50cmlnZ2VyO1xuXHRcdFx0aWYod3JhcHBlci5zY3JvbGxUb3AoKSE9PTAgfHwgd3JhcHBlci5zY3JvbGxMZWZ0KCkhPT0wKXsgLyogYWx3YXlzIHJlc2V0IHNjcm9sbFRvcC9MZWZ0ICovXG5cdFx0XHRcdCQoXCIubUNTQl9cIitkLmlkeCtcIl9zY3JvbGxiYXJcIikuY3NzKFwidmlzaWJpbGl0eVwiLFwidmlzaWJsZVwiKTtcblx0XHRcdFx0d3JhcHBlci5zY3JvbGxUb3AoMCkuc2Nyb2xsTGVmdCgwKTtcblx0XHRcdH1cblx0XHRcdGlmKHRvPT09XCJfcmVzZXRZXCIgJiYgIWQuY29udGVudFJlc2V0Lnkpe1xuXHRcdFx0XHQvKiBjYWxsYmFja3M6IG9uT3ZlcmZsb3dZTm9uZSAqL1xuXHRcdFx0XHRpZihfY2IoXCJvbk92ZXJmbG93WU5vbmVcIikpe28uY2FsbGJhY2tzLm9uT3ZlcmZsb3dZTm9uZS5jYWxsKGVsWzBdKTt9XG5cdFx0XHRcdGQuY29udGVudFJlc2V0Lnk9MTtcblx0XHRcdH1cblx0XHRcdGlmKHRvPT09XCJfcmVzZXRYXCIgJiYgIWQuY29udGVudFJlc2V0Lngpe1xuXHRcdFx0XHQvKiBjYWxsYmFja3M6IG9uT3ZlcmZsb3dYTm9uZSAqL1xuXHRcdFx0XHRpZihfY2IoXCJvbk92ZXJmbG93WE5vbmVcIikpe28uY2FsbGJhY2tzLm9uT3ZlcmZsb3dYTm9uZS5jYWxsKGVsWzBdKTt9XG5cdFx0XHRcdGQuY29udGVudFJlc2V0Lng9MTtcblx0XHRcdH1cblx0XHRcdGlmKHRvPT09XCJfcmVzZXRZXCIgfHwgdG89PT1cIl9yZXNldFhcIil7cmV0dXJuO31cblx0XHRcdGlmKChkLmNvbnRlbnRSZXNldC55IHx8ICFlbFswXS5tY3MpICYmIGQub3ZlcmZsb3dlZFswXSl7XG5cdFx0XHRcdC8qIGNhbGxiYWNrczogb25PdmVyZmxvd1kgKi9cblx0XHRcdFx0aWYoX2NiKFwib25PdmVyZmxvd1lcIikpe28uY2FsbGJhY2tzLm9uT3ZlcmZsb3dZLmNhbGwoZWxbMF0pO31cblx0XHRcdFx0ZC5jb250ZW50UmVzZXQueD1udWxsO1xuXHRcdFx0fVxuXHRcdFx0aWYoKGQuY29udGVudFJlc2V0LnggfHwgIWVsWzBdLm1jcykgJiYgZC5vdmVyZmxvd2VkWzFdKXtcblx0XHRcdFx0LyogY2FsbGJhY2tzOiBvbk92ZXJmbG93WCAqL1xuXHRcdFx0XHRpZihfY2IoXCJvbk92ZXJmbG93WFwiKSl7by5jYWxsYmFja3Mub25PdmVyZmxvd1guY2FsbChlbFswXSk7fVxuXHRcdFx0XHRkLmNvbnRlbnRSZXNldC54PW51bGw7XG5cdFx0XHR9XG5cdFx0XHRpZihvLnNuYXBBbW91bnQpeyAvKiBzY3JvbGxpbmcgc25hcHBpbmcgKi9cblx0XHRcdFx0dmFyIHNuYXBBbW91bnQ9IShvLnNuYXBBbW91bnQgaW5zdGFuY2VvZiBBcnJheSkgPyBvLnNuYXBBbW91bnQgOiBvcHRpb25zLmRpcj09PVwieFwiID8gby5zbmFwQW1vdW50WzFdIDogby5zbmFwQW1vdW50WzBdO1xuXHRcdFx0XHR0bz1fc25hcEFtb3VudCh0byxzbmFwQW1vdW50LG8uc25hcE9mZnNldCk7XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2gob3B0aW9ucy5kaXIpe1xuXHRcdFx0XHRjYXNlIFwieFwiOlxuXHRcdFx0XHRcdHZhciBtQ1NCX2RyYWdnZXI9JChcIiNtQ1NCX1wiK2QuaWR4K1wiX2RyYWdnZXJfaG9yaXpvbnRhbFwiKSxcblx0XHRcdFx0XHRcdHByb3BlcnR5PVwibGVmdFwiLFxuXHRcdFx0XHRcdFx0Y29udGVudFBvcz1tQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRMZWZ0LFxuXHRcdFx0XHRcdFx0bGltaXQ9W1xuXHRcdFx0XHRcdFx0XHRtQ3VzdG9tU2Nyb2xsQm94LndpZHRoKCktbUNTQl9jb250YWluZXIub3V0ZXJXaWR0aChmYWxzZSksXG5cdFx0XHRcdFx0XHRcdG1DU0JfZHJhZ2dlci5wYXJlbnQoKS53aWR0aCgpLW1DU0JfZHJhZ2dlci53aWR0aCgpXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0c2Nyb2xsVG89W3RvLHRvPT09MCA/IDAgOiAodG8vZC5zY3JvbGxSYXRpby54KV0sXG5cdFx0XHRcdFx0XHR0c289dG90YWxTY3JvbGxPZmZzZXRzWzFdLFxuXHRcdFx0XHRcdFx0dHNibz10b3RhbFNjcm9sbEJhY2tPZmZzZXRzWzFdLFxuXHRcdFx0XHRcdFx0dG90YWxTY3JvbGxPZmZzZXQ9dHNvPjAgPyB0c28vZC5zY3JvbGxSYXRpby54IDogMCxcblx0XHRcdFx0XHRcdHRvdGFsU2Nyb2xsQmFja09mZnNldD10c2JvPjAgPyB0c2JvL2Quc2Nyb2xsUmF0aW8ueCA6IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ5XCI6XG5cdFx0XHRcdFx0dmFyIG1DU0JfZHJhZ2dlcj0kKFwiI21DU0JfXCIrZC5pZHgrXCJfZHJhZ2dlcl92ZXJ0aWNhbFwiKSxcblx0XHRcdFx0XHRcdHByb3BlcnR5PVwidG9wXCIsXG5cdFx0XHRcdFx0XHRjb250ZW50UG9zPW1DU0JfY29udGFpbmVyWzBdLm9mZnNldFRvcCxcblx0XHRcdFx0XHRcdGxpbWl0PVtcblx0XHRcdFx0XHRcdFx0bUN1c3RvbVNjcm9sbEJveC5oZWlnaHQoKS1tQ1NCX2NvbnRhaW5lci5vdXRlckhlaWdodChmYWxzZSksXG5cdFx0XHRcdFx0XHRcdG1DU0JfZHJhZ2dlci5wYXJlbnQoKS5oZWlnaHQoKS1tQ1NCX2RyYWdnZXIuaGVpZ2h0KClcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRzY3JvbGxUbz1bdG8sdG89PT0wID8gMCA6ICh0by9kLnNjcm9sbFJhdGlvLnkpXSxcblx0XHRcdFx0XHRcdHRzbz10b3RhbFNjcm9sbE9mZnNldHNbMF0sXG5cdFx0XHRcdFx0XHR0c2JvPXRvdGFsU2Nyb2xsQmFja09mZnNldHNbMF0sXG5cdFx0XHRcdFx0XHR0b3RhbFNjcm9sbE9mZnNldD10c28+MCA/IHRzby9kLnNjcm9sbFJhdGlvLnkgOiAwLFxuXHRcdFx0XHRcdFx0dG90YWxTY3JvbGxCYWNrT2Zmc2V0PXRzYm8+MCA/IHRzYm8vZC5zY3JvbGxSYXRpby55IDogMDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmKHNjcm9sbFRvWzFdPDAgfHwgKHNjcm9sbFRvWzBdPT09MCAmJiBzY3JvbGxUb1sxXT09PTApKXtcblx0XHRcdFx0c2Nyb2xsVG89WzAsMF07XG5cdFx0XHR9ZWxzZSBpZihzY3JvbGxUb1sxXT49bGltaXRbMV0pe1xuXHRcdFx0XHRzY3JvbGxUbz1bbGltaXRbMF0sbGltaXRbMV1dO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHNjcm9sbFRvWzBdPS1zY3JvbGxUb1swXTtcblx0XHRcdH1cblx0XHRcdGlmKCFlbFswXS5tY3Mpe1xuXHRcdFx0XHRfbWNzKCk7ICAvKiBpbml0IG1jcyBvYmplY3QgKG9uY2UpIHRvIG1ha2UgaXQgYXZhaWxhYmxlIGJlZm9yZSBjYWxsYmFja3MgKi9cblx0XHRcdFx0aWYoX2NiKFwib25Jbml0XCIpKXtvLmNhbGxiYWNrcy5vbkluaXQuY2FsbChlbFswXSk7fSAvKiBjYWxsYmFja3M6IG9uSW5pdCAqL1xuXHRcdFx0fVxuXHRcdFx0Y2xlYXJUaW1lb3V0KG1DU0JfY29udGFpbmVyWzBdLm9uQ29tcGxldGVUaW1lb3V0KTtcblx0XHRcdF90d2VlblRvKG1DU0JfZHJhZ2dlclswXSxwcm9wZXJ0eSxNYXRoLnJvdW5kKHNjcm9sbFRvWzFdKSxkdXJbMV0sb3B0aW9ucy5zY3JvbGxFYXNpbmcpO1xuXHRcdFx0aWYoIWQudHdlZW5SdW5uaW5nICYmICgoY29udGVudFBvcz09PTAgJiYgc2Nyb2xsVG9bMF0+PTApIHx8IChjb250ZW50UG9zPT09bGltaXRbMF0gJiYgc2Nyb2xsVG9bMF08PWxpbWl0WzBdKSkpe3JldHVybjt9XG5cdFx0XHRfdHdlZW5UbyhtQ1NCX2NvbnRhaW5lclswXSxwcm9wZXJ0eSxNYXRoLnJvdW5kKHNjcm9sbFRvWzBdKSxkdXJbMF0sb3B0aW9ucy5zY3JvbGxFYXNpbmcsb3B0aW9ucy5vdmVyd3JpdGUse1xuXHRcdFx0XHRvblN0YXJ0OmZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0aWYob3B0aW9ucy5jYWxsYmFja3MgJiYgb3B0aW9ucy5vblN0YXJ0ICYmICFkLnR3ZWVuUnVubmluZyl7XG5cdFx0XHRcdFx0XHQvKiBjYWxsYmFja3M6IG9uU2Nyb2xsU3RhcnQgKi9cblx0XHRcdFx0XHRcdGlmKF9jYihcIm9uU2Nyb2xsU3RhcnRcIikpe19tY3MoKTsgby5jYWxsYmFja3Mub25TY3JvbGxTdGFydC5jYWxsKGVsWzBdKTt9XG5cdFx0XHRcdFx0XHRkLnR3ZWVuUnVubmluZz10cnVlO1xuXHRcdFx0XHRcdFx0X29uRHJhZ0NsYXNzZXMobUNTQl9kcmFnZ2VyKTtcblx0XHRcdFx0XHRcdGQuY2JPZmZzZXRzPV9jYk9mZnNldHMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sb25VcGRhdGU6ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRpZihvcHRpb25zLmNhbGxiYWNrcyAmJiBvcHRpb25zLm9uVXBkYXRlKXtcblx0XHRcdFx0XHRcdC8qIGNhbGxiYWNrczogd2hpbGVTY3JvbGxpbmcgKi9cblx0XHRcdFx0XHRcdGlmKF9jYihcIndoaWxlU2Nyb2xsaW5nXCIpKXtfbWNzKCk7IG8uY2FsbGJhY2tzLndoaWxlU2Nyb2xsaW5nLmNhbGwoZWxbMF0pO31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sb25Db21wbGV0ZTpmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGlmKG9wdGlvbnMuY2FsbGJhY2tzICYmIG9wdGlvbnMub25Db21wbGV0ZSl7XG5cdFx0XHRcdFx0XHRpZihvLmF4aXM9PT1cInl4XCIpe2NsZWFyVGltZW91dChtQ1NCX2NvbnRhaW5lclswXS5vbkNvbXBsZXRlVGltZW91dCk7fVxuXHRcdFx0XHRcdFx0dmFyIHQ9bUNTQl9jb250YWluZXJbMF0uaWRsZVRpbWVyIHx8IDA7XG5cdFx0XHRcdFx0XHRtQ1NCX2NvbnRhaW5lclswXS5vbkNvbXBsZXRlVGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdC8qIGNhbGxiYWNrczogb25TY3JvbGwsIG9uVG90YWxTY3JvbGwsIG9uVG90YWxTY3JvbGxCYWNrICovXG5cdFx0XHRcdFx0XHRcdGlmKF9jYihcIm9uU2Nyb2xsXCIpKXtfbWNzKCk7IG8uY2FsbGJhY2tzLm9uU2Nyb2xsLmNhbGwoZWxbMF0pO31cblx0XHRcdFx0XHRcdFx0aWYoX2NiKFwib25Ub3RhbFNjcm9sbFwiKSAmJiBzY3JvbGxUb1sxXT49bGltaXRbMV0tdG90YWxTY3JvbGxPZmZzZXQgJiYgZC5jYk9mZnNldHNbMF0pe19tY3MoKTsgby5jYWxsYmFja3Mub25Ub3RhbFNjcm9sbC5jYWxsKGVsWzBdKTt9XG5cdFx0XHRcdFx0XHRcdGlmKF9jYihcIm9uVG90YWxTY3JvbGxCYWNrXCIpICYmIHNjcm9sbFRvWzFdPD10b3RhbFNjcm9sbEJhY2tPZmZzZXQgJiYgZC5jYk9mZnNldHNbMV0pe19tY3MoKTsgby5jYWxsYmFja3Mub25Ub3RhbFNjcm9sbEJhY2suY2FsbChlbFswXSk7fVxuXHRcdFx0XHRcdFx0XHRkLnR3ZWVuUnVubmluZz1mYWxzZTtcblx0XHRcdFx0XHRcdFx0bUNTQl9jb250YWluZXJbMF0uaWRsZVRpbWVyPTA7XG5cdFx0XHRcdFx0XHRcdF9vbkRyYWdDbGFzc2VzKG1DU0JfZHJhZ2dlcixcImhpZGVcIik7XG5cdFx0XHRcdFx0XHR9LHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHQvKiBjaGVja3MgaWYgY2FsbGJhY2sgZnVuY3Rpb24gZXhpc3RzICovXG5cdFx0XHRmdW5jdGlvbiBfY2IoY2Ipe1xuXHRcdFx0XHRyZXR1cm4gZCAmJiBvLmNhbGxiYWNrc1tjYl0gJiYgdHlwZW9mIG8uY2FsbGJhY2tzW2NiXT09PVwiZnVuY3Rpb25cIjtcblx0XHRcdH1cblx0XHRcdC8qIGNoZWNrcyB3aGV0aGVyIGNhbGxiYWNrIG9mZnNldHMgYWx3YXlzIHRyaWdnZXIgKi9cblx0XHRcdGZ1bmN0aW9uIF9jYk9mZnNldHMoKXtcblx0XHRcdFx0cmV0dXJuIFtvLmNhbGxiYWNrcy5hbHdheXNUcmlnZ2VyT2Zmc2V0cyB8fCBjb250ZW50UG9zPj1saW1pdFswXSt0c28sby5jYWxsYmFja3MuYWx3YXlzVHJpZ2dlck9mZnNldHMgfHwgY29udGVudFBvczw9LXRzYm9dO1xuXHRcdFx0fVxuXHRcdFx0LyogXG5cdFx0XHRwb3B1bGF0ZXMgb2JqZWN0IHdpdGggdXNlZnVsIHZhbHVlcyBmb3IgdGhlIHVzZXIgXG5cdFx0XHR2YWx1ZXM6IFxuXHRcdFx0XHRjb250ZW50OiB0aGlzLm1jcy5jb250ZW50XG5cdFx0XHRcdGNvbnRlbnQgdG9wIHBvc2l0aW9uOiB0aGlzLm1jcy50b3AgXG5cdFx0XHRcdGNvbnRlbnQgbGVmdCBwb3NpdGlvbjogdGhpcy5tY3MubGVmdCBcblx0XHRcdFx0ZHJhZ2dlciB0b3AgcG9zaXRpb246IHRoaXMubWNzLmRyYWdnZXJUb3AgXG5cdFx0XHRcdGRyYWdnZXIgbGVmdCBwb3NpdGlvbjogdGhpcy5tY3MuZHJhZ2dlckxlZnQgXG5cdFx0XHRcdHNjcm9sbGluZyB5IHBlcmNlbnRhZ2U6IHRoaXMubWNzLnRvcFBjdCBcblx0XHRcdFx0c2Nyb2xsaW5nIHggcGVyY2VudGFnZTogdGhpcy5tY3MubGVmdFBjdCBcblx0XHRcdFx0c2Nyb2xsaW5nIGRpcmVjdGlvbjogdGhpcy5tY3MuZGlyZWN0aW9uXG5cdFx0XHQqL1xuXHRcdFx0ZnVuY3Rpb24gX21jcygpe1xuXHRcdFx0XHR2YXIgY3A9W21DU0JfY29udGFpbmVyWzBdLm9mZnNldFRvcCxtQ1NCX2NvbnRhaW5lclswXS5vZmZzZXRMZWZ0XSwgLyogY29udGVudCBwb3NpdGlvbiAqL1xuXHRcdFx0XHRcdGRwPVttQ1NCX2RyYWdnZXJbMF0ub2Zmc2V0VG9wLG1DU0JfZHJhZ2dlclswXS5vZmZzZXRMZWZ0XSwgLyogZHJhZ2dlciBwb3NpdGlvbiAqL1xuXHRcdFx0XHRcdGNsPVttQ1NCX2NvbnRhaW5lci5vdXRlckhlaWdodChmYWxzZSksbUNTQl9jb250YWluZXIub3V0ZXJXaWR0aChmYWxzZSldLCAvKiBjb250ZW50IGxlbmd0aCAqL1xuXHRcdFx0XHRcdHBsPVttQ3VzdG9tU2Nyb2xsQm94LmhlaWdodCgpLG1DdXN0b21TY3JvbGxCb3gud2lkdGgoKV07IC8qIGNvbnRlbnQgcGFyZW50IGxlbmd0aCAqL1xuXHRcdFx0XHRlbFswXS5tY3M9e1xuXHRcdFx0XHRcdGNvbnRlbnQ6bUNTQl9jb250YWluZXIsIC8qIG9yaWdpbmFsIGNvbnRlbnQgd3JhcHBlciBhcyBqcXVlcnkgb2JqZWN0ICovXG5cdFx0XHRcdFx0dG9wOmNwWzBdLGxlZnQ6Y3BbMV0sZHJhZ2dlclRvcDpkcFswXSxkcmFnZ2VyTGVmdDpkcFsxXSxcblx0XHRcdFx0XHR0b3BQY3Q6TWF0aC5yb3VuZCgoMTAwKk1hdGguYWJzKGNwWzBdKSkvKE1hdGguYWJzKGNsWzBdKS1wbFswXSkpLGxlZnRQY3Q6TWF0aC5yb3VuZCgoMTAwKk1hdGguYWJzKGNwWzFdKSkvKE1hdGguYWJzKGNsWzFdKS1wbFsxXSkpLFxuXHRcdFx0XHRcdGRpcmVjdGlvbjpvcHRpb25zLmRpclxuXHRcdFx0XHR9O1xuXHRcdFx0XHQvKiBcblx0XHRcdFx0dGhpcyByZWZlcnMgdG8gdGhlIG9yaWdpbmFsIGVsZW1lbnQgY29udGFpbmluZyB0aGUgc2Nyb2xsYmFyKHMpXG5cdFx0XHRcdHVzYWdlOiB0aGlzLm1jcy50b3AsIHRoaXMubWNzLmxlZnRQY3QgZXRjLiBcblx0XHRcdFx0Ki9cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogXG5cdFx0Q1VTVE9NIEpBVkFTQ1JJUFQgQU5JTUFUSU9OIFRXRUVOIFxuXHRcdExpZ2h0ZXIgYW5kIGZhc3RlciB0aGFuIGpxdWVyeSBhbmltYXRlKCkgYW5kIGNzcyB0cmFuc2l0aW9ucyBcblx0XHRBbmltYXRlcyB0b3AvbGVmdCBwcm9wZXJ0aWVzIGFuZCBpbmNsdWRlcyBlYXNpbmdzIFxuXHRcdCovXG5cdFx0X3R3ZWVuVG89ZnVuY3Rpb24oZWwscHJvcCx0byxkdXJhdGlvbixlYXNpbmcsb3ZlcndyaXRlLGNhbGxiYWNrcyl7XG5cdFx0XHRpZighZWwuX21Ud2Vlbil7ZWwuX21Ud2Vlbj17dG9wOnt9LGxlZnQ6e319O31cblx0XHRcdHZhciBjYWxsYmFja3M9Y2FsbGJhY2tzIHx8IHt9LFxuXHRcdFx0XHRvblN0YXJ0PWNhbGxiYWNrcy5vblN0YXJ0IHx8IGZ1bmN0aW9uKCl7fSxvblVwZGF0ZT1jYWxsYmFja3Mub25VcGRhdGUgfHwgZnVuY3Rpb24oKXt9LG9uQ29tcGxldGU9Y2FsbGJhY2tzLm9uQ29tcGxldGUgfHwgZnVuY3Rpb24oKXt9LFxuXHRcdFx0XHRzdGFydFRpbWU9X2dldFRpbWUoKSxfZGVsYXkscHJvZ3Jlc3M9MCxmcm9tPWVsLm9mZnNldFRvcCxlbFN0eWxlPWVsLnN0eWxlLF9yZXF1ZXN0LHRvYmo9ZWwuX21Ud2Vlbltwcm9wXTtcblx0XHRcdGlmKHByb3A9PT1cImxlZnRcIil7ZnJvbT1lbC5vZmZzZXRMZWZ0O31cblx0XHRcdHZhciBkaWZmPXRvLWZyb207XG5cdFx0XHR0b2JqLnN0b3A9MDtcblx0XHRcdGlmKG92ZXJ3cml0ZSE9PVwibm9uZVwiKXtfY2FuY2VsVHdlZW4oKTt9XG5cdFx0XHRfc3RhcnRUd2VlbigpO1xuXHRcdFx0ZnVuY3Rpb24gX3N0ZXAoKXtcblx0XHRcdFx0aWYodG9iai5zdG9wKXtyZXR1cm47fVxuXHRcdFx0XHRpZighcHJvZ3Jlc3Mpe29uU3RhcnQuY2FsbCgpO31cblx0XHRcdFx0cHJvZ3Jlc3M9X2dldFRpbWUoKS1zdGFydFRpbWU7XG5cdFx0XHRcdF90d2VlbigpO1xuXHRcdFx0XHRpZihwcm9ncmVzcz49dG9iai50aW1lKXtcblx0XHRcdFx0XHR0b2JqLnRpbWU9KHByb2dyZXNzPnRvYmoudGltZSkgPyBwcm9ncmVzcytfZGVsYXktKHByb2dyZXNzLXRvYmoudGltZSkgOiBwcm9ncmVzcytfZGVsYXktMTtcblx0XHRcdFx0XHRpZih0b2JqLnRpbWU8cHJvZ3Jlc3MrMSl7dG9iai50aW1lPXByb2dyZXNzKzE7fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRvYmoudGltZTxkdXJhdGlvbil7dG9iai5pZD1fcmVxdWVzdChfc3RlcCk7fWVsc2V7b25Db21wbGV0ZS5jYWxsKCk7fVxuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gX3R3ZWVuKCl7XG5cdFx0XHRcdGlmKGR1cmF0aW9uPjApe1xuXHRcdFx0XHRcdHRvYmouY3VyclZhbD1fZWFzZSh0b2JqLnRpbWUsZnJvbSxkaWZmLGR1cmF0aW9uLGVhc2luZyk7XG5cdFx0XHRcdFx0ZWxTdHlsZVtwcm9wXT1NYXRoLnJvdW5kKHRvYmouY3VyclZhbCkrXCJweFwiO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRlbFN0eWxlW3Byb3BdPXRvK1wicHhcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRvblVwZGF0ZS5jYWxsKCk7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBfc3RhcnRUd2Vlbigpe1xuXHRcdFx0XHRfZGVsYXk9MTAwMC82MDtcblx0XHRcdFx0dG9iai50aW1lPXByb2dyZXNzK19kZWxheTtcblx0XHRcdFx0X3JlcXVlc3Q9KCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSA/IGZ1bmN0aW9uKGYpe190d2VlbigpOyByZXR1cm4gc2V0VGltZW91dChmLDAuMDEpO30gOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHRcdFx0XHR0b2JqLmlkPV9yZXF1ZXN0KF9zdGVwKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIF9jYW5jZWxUd2Vlbigpe1xuXHRcdFx0XHRpZih0b2JqLmlkPT1udWxsKXtyZXR1cm47fVxuXHRcdFx0XHRpZighd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSl7Y2xlYXJUaW1lb3V0KHRvYmouaWQpO1xuXHRcdFx0XHR9ZWxzZXt3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodG9iai5pZCk7fVxuXHRcdFx0XHR0b2JqLmlkPW51bGw7XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBfZWFzZSh0LGIsYyxkLHR5cGUpe1xuXHRcdFx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRcdFx0Y2FzZSBcImxpbmVhclwiOiBjYXNlIFwibWNzTGluZWFyXCI6XG5cdFx0XHRcdFx0XHRyZXR1cm4gYyp0L2QgKyBiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIm1jc0xpbmVhck91dFwiOlxuXHRcdFx0XHRcdFx0dC89ZDsgdC0tOyByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gdCp0KSArIGI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiZWFzZUluT3V0U21vb3RoXCI6XG5cdFx0XHRcdFx0XHR0Lz1kLzI7XG5cdFx0XHRcdFx0XHRpZih0PDEpIHJldHVybiBjLzIqdCp0ICsgYjtcblx0XHRcdFx0XHRcdHQtLTtcblx0XHRcdFx0XHRcdHJldHVybiAtYy8yICogKHQqKHQtMikgLSAxKSArIGI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiZWFzZUluT3V0U3Ryb25nXCI6XG5cdFx0XHRcdFx0XHR0Lz1kLzI7XG5cdFx0XHRcdFx0XHRpZih0PDEpIHJldHVybiBjLzIgKiBNYXRoLnBvdyggMiwgMTAgKiAodCAtIDEpICkgKyBiO1xuXHRcdFx0XHRcdFx0dC0tO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGMvMiAqICggLU1hdGgucG93KCAyLCAtMTAgKiB0KSArIDIgKSArIGI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiZWFzZUluT3V0XCI6IGNhc2UgXCJtY3NFYXNlSW5PdXRcIjpcblx0XHRcdFx0XHRcdHQvPWQvMjtcblx0XHRcdFx0XHRcdGlmKHQ8MSkgcmV0dXJuIGMvMip0KnQqdCArIGI7XG5cdFx0XHRcdFx0XHR0LT0yO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGMvMioodCp0KnQgKyAyKSArIGI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiZWFzZU91dFNtb290aFwiOlxuXHRcdFx0XHRcdFx0dC89ZDsgdC0tO1xuXHRcdFx0XHRcdFx0cmV0dXJuIC1jICogKHQqdCp0KnQgLSAxKSArIGI7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiZWFzZU91dFN0cm9uZ1wiOlxuXHRcdFx0XHRcdFx0cmV0dXJuIGMgKiAoIC1NYXRoLnBvdyggMiwgLTEwICogdC9kICkgKyAxICkgKyBiO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcImVhc2VPdXRcIjogY2FzZSBcIm1jc0Vhc2VPdXRcIjogZGVmYXVsdDpcblx0XHRcdFx0XHRcdHZhciB0cz0odC89ZCkqdCx0Yz10cyp0O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGIrYyooMC40OTk5OTk5OTk5OTk5OTcqdGMqdHMgKyAtMi41KnRzKnRzICsgNS41KnRjICsgLTYuNSp0cyArIDQqdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogcmV0dXJucyBjdXJyZW50IHRpbWUgKi9cblx0XHRfZ2V0VGltZT1mdW5jdGlvbigpe1xuXHRcdFx0aWYod2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpe1xuXHRcdFx0XHRyZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uud2Via2l0Tm93KXtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLndlYmtpdE5vdygpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRpZihEYXRlLm5vdyl7cmV0dXJuIERhdGUubm93KCk7fWVsc2V7cmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO31cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBzdG9wcyBhIHR3ZWVuICovXG5cdFx0X3N0b3BUd2Vlbj1mdW5jdGlvbigpe1xuXHRcdFx0dmFyIGVsPXRoaXM7XG5cdFx0XHRpZighZWwuX21Ud2Vlbil7ZWwuX21Ud2Vlbj17dG9wOnt9LGxlZnQ6e319O31cblx0XHRcdHZhciBwcm9wcz1bXCJ0b3BcIixcImxlZnRcIl07XG5cdFx0XHRmb3IodmFyIGk9MDsgaTxwcm9wcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHZhciBwcm9wPXByb3BzW2ldO1xuXHRcdFx0XHRpZihlbC5fbVR3ZWVuW3Byb3BdLmlkKXtcblx0XHRcdFx0XHRpZighd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSl7Y2xlYXJUaW1lb3V0KGVsLl9tVHdlZW5bcHJvcF0uaWQpO1xuXHRcdFx0XHRcdH1lbHNle3dpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShlbC5fbVR3ZWVuW3Byb3BdLmlkKTt9XG5cdFx0XHRcdFx0ZWwuX21Ud2Vlbltwcm9wXS5pZD1udWxsO1xuXHRcdFx0XHRcdGVsLl9tVHdlZW5bcHJvcF0uc3RvcD0xO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcdFxuXHRcdC8qIGRlbGV0ZXMgYSBwcm9wZXJ0eSAoYXZvaWRpbmcgdGhlIGV4Y2VwdGlvbiB0aHJvd24gYnkgSUUpICovXG5cdFx0X2RlbGV0ZT1mdW5jdGlvbihjLG0pe1xuXHRcdFx0dHJ5e2RlbGV0ZSBjW21dO31jYXRjaChlKXtjW21dPW51bGw7fVxuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBkZXRlY3RzIGxlZnQgbW91c2UgYnV0dG9uICovXG5cdFx0X21vdXNlQnRuTGVmdD1mdW5jdGlvbihlKXtcblx0XHRcdHJldHVybiAhKGUud2hpY2ggJiYgZS53aGljaCE9PTEpO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBkZXRlY3RzIGlmIHBvaW50ZXIgdHlwZSBldmVudCBpcyB0b3VjaCAqL1xuXHRcdF9wb2ludGVyVG91Y2g9ZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgdD1lLm9yaWdpbmFsRXZlbnQucG9pbnRlclR5cGU7XG5cdFx0XHRyZXR1cm4gISh0ICYmIHQhPT1cInRvdWNoXCIgJiYgdCE9PTIpO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiBjaGVja3MgaWYgdmFsdWUgaXMgbnVtZXJpYyAqL1xuXHRcdF9pc051bWVyaWM9ZnVuY3Rpb24odmFsKXtcblx0XHRcdHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSAmJiBpc0Zpbml0ZSh2YWwpO1xuXHRcdH0sXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0XHRcblx0XHRcblx0XHQvKiByZXR1cm5zIGVsZW1lbnQgcG9zaXRpb24gYWNjb3JkaW5nIHRvIGNvbnRlbnQgKi9cblx0XHRfY2hpbGRQb3M9ZnVuY3Rpb24oZWwpe1xuXHRcdFx0dmFyIHA9ZWwucGFyZW50cyhcIi5tQ1NCX2NvbnRhaW5lclwiKTtcblx0XHRcdHJldHVybiBbZWwub2Zmc2V0KCkudG9wLXAub2Zmc2V0KCkudG9wLGVsLm9mZnNldCgpLmxlZnQtcC5vZmZzZXQoKS5sZWZ0XTtcblx0XHR9LFxuXHRcdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdFx0XG5cdFx0XG5cdFx0LyogY2hlY2tzIGlmIGJyb3dzZXIgdGFiIGlzIGhpZGRlbi9pbmFjdGl2ZSB2aWEgUGFnZSBWaXNpYmlsaXR5IEFQSSAqL1xuXHRcdF9pc1RhYkhpZGRlbj1mdW5jdGlvbigpe1xuXHRcdFx0dmFyIHByb3A9X2dldEhpZGRlblByb3AoKTtcblx0XHRcdGlmKCFwcm9wKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnRbcHJvcF07XG5cdFx0XHRmdW5jdGlvbiBfZ2V0SGlkZGVuUHJvcCgpe1xuXHRcdFx0XHR2YXIgcGZ4PVtcIndlYmtpdFwiLFwibW96XCIsXCJtc1wiLFwib1wiXTtcblx0XHRcdFx0aWYoXCJoaWRkZW5cIiBpbiBkb2N1bWVudCkgcmV0dXJuIFwiaGlkZGVuXCI7IC8vbmF0aXZlbHkgc3VwcG9ydGVkXG5cdFx0XHRcdGZvcih2YXIgaT0wOyBpPHBmeC5sZW5ndGg7IGkrKyl7IC8vcHJlZml4ZWRcblx0XHRcdFx0ICAgIGlmKChwZnhbaV0rXCJIaWRkZW5cIikgaW4gZG9jdW1lbnQpIFxuXHRcdFx0XHQgICAgICAgIHJldHVybiBwZnhbaV0rXCJIaWRkZW5cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbnVsbDsgLy9ub3Qgc3VwcG9ydGVkXG5cdFx0XHR9XG5cdFx0fTtcblx0XHQvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRcdFxuXHRcblx0XG5cdFxuXHRcblx0LyogXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0UExVR0lOIFNFVFVQIFxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCovXG5cdFxuXHQvKiBwbHVnaW4gY29uc3RydWN0b3IgZnVuY3Rpb25zICovXG5cdCQuZm5bcGx1Z2luTlNdPWZ1bmN0aW9uKG1ldGhvZCl7IC8qIHVzYWdlOiAkKHNlbGVjdG9yKS5tQ3VzdG9tU2Nyb2xsYmFyKCk7ICovXG5cdFx0aWYobWV0aG9kc1ttZXRob2RdKXtcblx0XHRcdHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcyxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpO1xuXHRcdH1lbHNlIGlmKHR5cGVvZiBtZXRob2Q9PT1cIm9iamVjdFwiIHx8ICFtZXRob2Qpe1xuXHRcdFx0cmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XG5cdFx0fWVsc2V7XG5cdFx0XHQkLmVycm9yKFwiTWV0aG9kIFwiK21ldGhvZCtcIiBkb2VzIG5vdCBleGlzdFwiKTtcblx0XHR9XG5cdH07XG5cdCRbcGx1Z2luTlNdPWZ1bmN0aW9uKG1ldGhvZCl7IC8qIHVzYWdlOiAkLm1DdXN0b21TY3JvbGxiYXIoKTsgKi9cblx0XHRpZihtZXRob2RzW21ldGhvZF0pe1xuXHRcdFx0cmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSk7XG5cdFx0fWVsc2UgaWYodHlwZW9mIG1ldGhvZD09PVwib2JqZWN0XCIgfHwgIW1ldGhvZCl7XG5cdFx0XHRyZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcblx0XHR9ZWxzZXtcblx0XHRcdCQuZXJyb3IoXCJNZXRob2QgXCIrbWV0aG9kK1wiIGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0fTtcblx0XG5cdC8qIFxuXHRhbGxvdyBzZXR0aW5nIHBsdWdpbiBkZWZhdWx0IG9wdGlvbnMuIFxuXHR1c2FnZTogJC5tQ3VzdG9tU2Nyb2xsYmFyLmRlZmF1bHRzLnNjcm9sbEluZXJ0aWE9NTAwOyBcblx0dG8gYXBwbHkgYW55IGNoYW5nZWQgZGVmYXVsdCBvcHRpb25zIG9uIGRlZmF1bHQgc2VsZWN0b3JzIChiZWxvdyksIHVzZSBpbnNpZGUgZG9jdW1lbnQgcmVhZHkgZm4gXG5cdGUuZy46ICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7ICQubUN1c3RvbVNjcm9sbGJhci5kZWZhdWx0cy5zY3JvbGxJbmVydGlhPTUwMDsgfSk7XG5cdCovXG5cdCRbcGx1Z2luTlNdLmRlZmF1bHRzPWRlZmF1bHRzO1xuXHRcblx0LyogXG5cdGFkZCB3aW5kb3cgb2JqZWN0ICh3aW5kb3cubUN1c3RvbVNjcm9sbGJhcikgXG5cdHVzYWdlOiBpZih3aW5kb3cubUN1c3RvbVNjcm9sbGJhcil7Y29uc29sZS5sb2coXCJjdXN0b20gc2Nyb2xsYmFyIHBsdWdpbiBsb2FkZWRcIik7fVxuXHQqL1xuXHR3aW5kb3dbcGx1Z2luTlNdPXRydWU7XG5cdFxuXHQkKHdpbmRvdykuYmluZChcImxvYWRcIixmdW5jdGlvbigpe1xuXHRcdFxuXHRcdCQoZGVmYXVsdFNlbGVjdG9yKVtwbHVnaW5OU10oKTsgLyogYWRkIHNjcm9sbGJhcnMgYXV0b21hdGljYWxseSBvbiBkZWZhdWx0IHNlbGVjdG9yICovXG5cdFx0XG5cdFx0LyogZXh0ZW5kIGpRdWVyeSBleHByZXNzaW9ucyAqL1xuXHRcdCQuZXh0ZW5kKCQuZXhwcltcIjpcIl0se1xuXHRcdFx0LyogY2hlY2tzIGlmIGVsZW1lbnQgaXMgd2l0aGluIHNjcm9sbGFibGUgdmlld3BvcnQgKi9cblx0XHRcdG1jc0luVmlldzokLmV4cHJbXCI6XCJdLm1jc0luVmlldyB8fCBmdW5jdGlvbihlbCl7XG5cdFx0XHRcdHZhciAkZWw9JChlbCksY29udGVudD0kZWwucGFyZW50cyhcIi5tQ1NCX2NvbnRhaW5lclwiKSx3cmFwcGVyLGNQb3M7XG5cdFx0XHRcdGlmKCFjb250ZW50Lmxlbmd0aCl7cmV0dXJuO31cblx0XHRcdFx0d3JhcHBlcj1jb250ZW50LnBhcmVudCgpO1xuXHRcdFx0XHRjUG9zPVtjb250ZW50WzBdLm9mZnNldFRvcCxjb250ZW50WzBdLm9mZnNldExlZnRdO1xuXHRcdFx0XHRyZXR1cm4gXHRjUG9zWzBdK19jaGlsZFBvcygkZWwpWzBdPj0wICYmIGNQb3NbMF0rX2NoaWxkUG9zKCRlbClbMF08d3JhcHBlci5oZWlnaHQoKS0kZWwub3V0ZXJIZWlnaHQoZmFsc2UpICYmIFxuXHRcdFx0XHRcdFx0Y1Bvc1sxXStfY2hpbGRQb3MoJGVsKVsxXT49MCAmJiBjUG9zWzFdK19jaGlsZFBvcygkZWwpWzFdPHdyYXBwZXIud2lkdGgoKS0kZWwub3V0ZXJXaWR0aChmYWxzZSk7XG5cdFx0XHR9LFxuXHRcdFx0LyogY2hlY2tzIGlmIGVsZW1lbnQgb3IgcGFydCBvZiBlbGVtZW50IGlzIGluIHZpZXcgb2Ygc2Nyb2xsYWJsZSB2aWV3cG9ydCAqL1xuXHRcdFx0bWNzSW5TaWdodDokLmV4cHJbXCI6XCJdLm1jc0luU2lnaHQgfHwgZnVuY3Rpb24oZWwsaSxtKXtcblx0XHRcdFx0dmFyICRlbD0kKGVsKSxlbEQsY29udGVudD0kZWwucGFyZW50cyhcIi5tQ1NCX2NvbnRhaW5lclwiKSx3cmFwcGVyVmlldyxwb3Msd3JhcHBlclZpZXdQY3QsXG5cdFx0XHRcdFx0cGN0VmFscz1tWzNdPT09XCJleGFjdFwiID8gW1sxLDBdLFsxLDBdXSA6IFtbMC45LDAuMV0sWzAuNiwwLjRdXTtcblx0XHRcdFx0aWYoIWNvbnRlbnQubGVuZ3RoKXtyZXR1cm47fVxuXHRcdFx0XHRlbEQ9WyRlbC5vdXRlckhlaWdodChmYWxzZSksJGVsLm91dGVyV2lkdGgoZmFsc2UpXTtcblx0XHRcdFx0cG9zPVtjb250ZW50WzBdLm9mZnNldFRvcCtfY2hpbGRQb3MoJGVsKVswXSxjb250ZW50WzBdLm9mZnNldExlZnQrX2NoaWxkUG9zKCRlbClbMV1dO1xuXHRcdFx0XHR3cmFwcGVyVmlldz1bY29udGVudC5wYXJlbnQoKVswXS5vZmZzZXRIZWlnaHQsY29udGVudC5wYXJlbnQoKVswXS5vZmZzZXRXaWR0aF07XG5cdFx0XHRcdHdyYXBwZXJWaWV3UGN0PVtlbERbMF08d3JhcHBlclZpZXdbMF0gPyBwY3RWYWxzWzBdIDogcGN0VmFsc1sxXSxlbERbMV08d3JhcHBlclZpZXdbMV0gPyBwY3RWYWxzWzBdIDogcGN0VmFsc1sxXV07XG5cdFx0XHRcdHJldHVybiBcdHBvc1swXS0od3JhcHBlclZpZXdbMF0qd3JhcHBlclZpZXdQY3RbMF1bMF0pPDAgJiYgcG9zWzBdK2VsRFswXS0od3JhcHBlclZpZXdbMF0qd3JhcHBlclZpZXdQY3RbMF1bMV0pPj0wICYmIFxuXHRcdFx0XHRcdFx0cG9zWzFdLSh3cmFwcGVyVmlld1sxXSp3cmFwcGVyVmlld1BjdFsxXVswXSk8MCAmJiBwb3NbMV0rZWxEWzFdLSh3cmFwcGVyVmlld1sxXSp3cmFwcGVyVmlld1BjdFsxXVsxXSk+PTA7XG5cdFx0XHR9LFxuXHRcdFx0LyogY2hlY2tzIGlmIGVsZW1lbnQgaXMgb3ZlcmZsb3dlZCBoYXZpbmcgdmlzaWJsZSBzY3JvbGxiYXIocykgKi9cblx0XHRcdG1jc092ZXJmbG93OiQuZXhwcltcIjpcIl0ubWNzT3ZlcmZsb3cgfHwgZnVuY3Rpb24oZWwpe1xuXHRcdFx0XHR2YXIgZD0kKGVsKS5kYXRhKHBsdWdpblBmeCk7XG5cdFx0XHRcdGlmKCFkKXtyZXR1cm47fVxuXHRcdFx0XHRyZXR1cm4gZC5vdmVyZmxvd2VkWzBdIHx8IGQub3ZlcmZsb3dlZFsxXTtcblx0XHRcdH1cblx0XHR9KTtcblx0XG5cdH0pO1xuXG59KSl9KSk7Il19
