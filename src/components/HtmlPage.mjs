import PhotoSwipe from './PhotoSwipe.mjs'
import Header from './Header.mjs'
// export ({ props, children }) => [
//   <!doctype html>,
//   <html lang="en">
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//
//       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
//
//       <title>Hello, world!</title>
//     </head>
//     <body>
//       <h1>Hello, world!</h1>
//     </body>
//   </html>
// )]

const socialProfiles = [
  { url: '#', name: 'facebook' },
  { url: '#', name: 'vimeo' },
  { url: '#', name: 'instagram' },
  { url: '#', name: 'twitter' },
]

const menuItems = [
  // { title: 'LA Warrior', url: '/about' },
  { title: 'Biography', url: '/biography' },
  { title: 'Planetarsim', url: '/planetarism' },
  { title: 'Artwork', url: '/artwork' },
  { title: 'Projects', url: '/projects' },
  { title: 'Photo Gallery', url: '/photo-gallery' },
  // { title: 'News', url: '/news' },
  { title: 'Contact', url: '/contact' },
  // { title: 'LA Warrior', url: '/media/albums/la' },
  // { title: 'Candy Costume', url: '/media/albums/candy-costum' },
  // { title: 'Time Travelers', url: '/media/albums/time-travelers' },
  // { title: 'Girls and Rugs', url: '/media/albums/kilimi' },
  // { title: '7 Years of Bad Luck', url: '/media/albums/7-years' },
  // { title: 'Big Dreams', url: '/media/albums/mali-mesta-golemi-sonista' },
  // { title: 'Onaka', url: '/media/albums/razno' }
]


const htmlPage = ({ children, props: { background = '#f0f0f0' } }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {/* <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous"
      */}
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/photoswipe.css" />
      <title>Hello, world!</title>
    </head>
    <body style={`background: ${background || "#ccccc3"}`}>
      <Header
        menuItems={menuItems}
        socialProfiles={socialProfiles}
      />
      {children}
      <PhotoSwipe />
      <script src="/masonry.js" />
      <script src="/photoswipe.min.js" />
      <script src="/photoswipe-lightbox.min.js" />
      <script src="/photo-gallery.js" />
      {/* <script src="/classie.js" />
        <script src="/imagesloaded.js" />
        <script src="/AnimOnScroll.js" /> */}
      <script src="/index.js" />
    </body>
  </html >
)

export default htmlPage
