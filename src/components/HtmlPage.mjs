import PhotoSwipe from "./PhotoSwipe.mjs";
import Header from "./Header.mjs";

const socialProfiles = [
  { url: "https://www.facebook.com/kiro.urdin.official", name: "facebook" },
  { url: "https://vimeo.com/kirourdin", name: "vimeo" },
  { url: "https://www.instagram.com/kirourdin/", name: "instagram" },
  { url: "https://twitter.com/KiroUrdin", name: "twitter" },
];

const menuItems = [
  // { title: 'Planetarsim', url: '/planetarism' },
  { title: "Artwork", url: "/" },
  { title: "Films", url: "/artwork/films" },
  { title: "Photo Gallery", url: "/photo-gallery" },
  { title: "Biography", url: "/biography" },
  // { title: 'News', url: '/news' },
  { title: "Awards", url: "/awards" },
  { title: "Contact", url: "mailto:contact@kirourdin.com" },
];

const htmlPage = ({
  children,
  props: { background = "#f0f0f0", title = "" },
}) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
      />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
      {/* <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous"
      */}
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/photoswipe.css" />
      <title>
        {title} | Kiro Urdin - Artistic Founder of Planetarism Movement
      </title>
    </head>
    <body style={`background: ${background || "#ccccc3"}`}>
      <Header menuItems={menuItems} socialProfiles={socialProfiles} />
      <main id="main-content">{children}</main>
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
  </html>
);

export default htmlPage;
