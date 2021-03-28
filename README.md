
[![GitHub license](https://img.shields.io/github/license/ethanny2/retro-fansite-update)](https://github.com/ethanny2/retro-fansite-update)[![GitHub stars](https://img.shields.io/github/stars/ethanny2/retro-fansite-update)](https://github.com/ethanny2/retro-fansite-update/stargazers)[![GitHub forks](https://img.shields.io/github/forks/ethanny2/retro-fansite-update)](https://github.com/ethanny2/retro-fansite-update/network)[![Twitter Badge](https://img.shields.io/badge/chat-twitter-blue.svg)](https://twitter.com/ArrayLikeObj)

# Video Game Randomizer Front End

## [https://game-randomizer.netlify.app/](https://game-randomizer.netlify.app/)


<p align="center">
  <img  src="https://media4.giphy.com/media/naqqBuUaeqLW8P3A5E/giphy.gif" alt="Demo gif">
</p>

## Background

The concept for this site was to give video game players/fans the ability to programatically search/filter through a comprehensive game database.

### *How does this differ from any other video game information REST  API project?*
 The mysql database powering the site was built by compiling information through multiple video game data APIs (Giant Bomb , IGBD) and web scraping (How long to beat, MetaCritic). In addition, unlike similar sites/ APIs this includes **nearly all released video games from around 1980 - 2015**.



**Goals (for rehosting site)** : 
   - Optimize the bundle size and lighthouse scores
   - Modernize the design
   - Improve the UI/UX for the filters while still keeping the granularity

## Technology used
- SCSS
- webpack 5 
- jQuery 
- [Packery.js library](https://packery.metafizzy.co/)
- CSS clip path design + loading skeleton animations
- Intersection Observer
- image optimizations with webp + fallbacks
- Infinite scroll on random cover art browser with lodash ```throttle()```
  
## Concepts

### Packery.js for Cover Art Browser

Implemented Packery.js to create a jagged (images do not have equal heights or widths) grid of randomly selected video game cover art. When a cover is clicked a modal with more details on that game is displayed. 

Additionally added in an infinite scroll so more content can be loaded without refreshing the page. On mobile devices this fired too many times in a row so I used lodash to throttle() the function so it is only allowed to be executed every 1.5s.

```
  grid = new Packery(gridElem, {
    columnWidth: ".grid-sizer",
    itemSelector: ".grid-item",
    percentPosition: true,
    resize: true,
    initLayout: true
  });
  $.each(links, function (_, value) {
    if (value) {
      const gridItem = $(`<div tabindex="0"></div>`);
      const image = new Image();
      image.onload = function () {
        if (loader.style.display !== "none") loader.style.display = "none";
        //Send it into the packery grid.
        $(".first_page #grid").append(gridItem);
        grid.appended(gridItem);
        grid.layout();
      };
      image.src = value.cover;
      image.alt = value.name;
      gridItem.addClass("grid-item");
      gridItem.append(image);
      ...
      ...
```

### Intersection Observer Animations

When a specific element is scrolled into the viewport it triggers a fade/slide in animation on my divs shaped with the CSS clip-path property.

```
let counter = 0;
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.5) {
      /*Add animation class */
      const { target } = entry;
      counter ? target.classList.add("fadeLeft") : target.classList.add("fadeRight");
      observer.unobserve(target);
      counter++;
    }
  });
}

```

### Creating the Filter/Checkbox UI

Revisiting this site and trying to decide how to layout all the different filter options/possibilities was most likely the biggest challenge. Previouly these checkboxes were located in a nav/modal the where user could access filters one page/ category at a time. 

After researching this UI/UX issue I came across a [Medium Article from a software engineer working for a Travel site](https://medium.com/tripaneer-techblog/improving-the-usability-of-multi-selecting-from-a-long-list-63e1a67aab35) who had the same issue of finding a intuitive layout for a filter with many options. The article details the A/B testing of user engagement which comes to the conclusion that just laying out the options as checkboxes in their own section with the CSS property ```column-count: 2 (or 3)``` yielded an interface that more users engaged.



### webpack 5 bundling

Using my own custom webpack 5 dev and production configuration to have a local dev-server with [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) and optimizied production build with minification, auto-prefixing for CSS properties and more. The upgrade from webpack 4 -> webpack 5 makes bundling static assets  (images, json files etc...) very easy.
```
/* loads nearly all assets; no external plugins */
{
        test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|webp|woff2|woff|eot)$/i,
        type: "asset/resource"
},
```


### webp images with fallback

Running a script as a pre-build step convert all png/jpg files to webp versions to cut back on bundle sizes for browsers that do support webp images.
```
(async () => {
  const img = await imagemin([path.resolve(__dirname, "src/static/images/*.{jpg,png}").replace(/\\/g, "/")], {
    destination: path.resolve(__dirname, "src/static/images/").replace(/\\/g, "/"),
    plugins: [imageminWebp({ quality: 70 })]
  });
  console.log(img);
  console.log("Done converting images");
})();

```


