// // element argument can be a selector string
// //   for an individual element
document.addEventListener('DOMContentLoaded', (event) => {
  const grid = document.querySelector('.gallery .gallery-inner')
  const itemSelector = '.scroll-gallery-item, .text-card'
  const imageSelector = '> img'

  const loadImage = fn => el => {
    // const newImg = new Image()
    const img = el.querySelector('img')
    const src = img
      .getAttribute('x-src')
    // console.log(img, src)
    img.onload = () => {
      // if (!! el.parent)
      // else
      //   el.src = src;

      fn && fn(img)
    }
    if (src) {
      img.src = src
    }
  }
  // })
  const elem = document.querySelector('.gallery.artwork')
  const msnry = elem && new Masonry(elem, {
    itemSelector,
    percentPosition: true,
    transitionDuration: 0,
    columnWidth: '.gallery > .gallery-inner > a'
  });

  grid && grid
    .querySelectorAll(`${itemSelector} ${imageSelector}`)
    .forEach(
      loadImage(el => {
        el.parentElement.classList.add('animate')
        msnry?.layout()
      })
    )

  // new AnimOnScroll(grid, itemSelector, {
  //   minDuration : 0.4,
  //   maxDuration : 0.7,
  //   viewportFactor : 0.2
  // });

  const sliderItem = document.querySelector('#xx2')
  sliderItem && setInterval((state => () => {
    sliderItem.style.width = state ? '0%' : '100%'
    state = !state
  })(false), 7000)
})
