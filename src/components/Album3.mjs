// export ({ props }) => {
//   return (
//     <div>
//       { props.galleries.map( gallery => {
//         return (
//           <div>
//             {{ gallery.name }}
//           </div>
//         )
//       }) }
//     </div>
//   );
// };

// <div class="">
//   <div class="gallery-inner">
//   <div class="text-card">
//     <h1 class="text-card-title">{{title}}</h1>
//     <span>{{data.text}}</span>
//   </div>
//   <a href="{{../path}}{{this.data}}"
//     style="display: block; background-image: url(/img?src=/images/{{this.path}}/{{this.thumb}}&h=600)"
//     class="scroll-gallery-item"
//   >
//     <img src="/img?src=/images/{{this.path}}/{{this.thumb}}&h=600" alt="{{}}" class="attachment-large">
//     <div class="gallery-heading">{{this.title}}</div>
//   </a>


export default ({ props }) => (
  <div class="gallery photo">
    <div class="gallery-inner">
      {props.data.images.map(
        image => (
          <a
            class="scroll-gallery-item"
            href={`/media/images/${props.pathname}/${image.filename}`}
            style={`display: block; background-image: url(/media/images/${props.pathname}/${image.filename /* image.cache.md.url */})`}
            data-pswp-width="600"
            data-pswp-height="600"
          >
            <img x-src={`/media/images/${props.pathname}/${image.filename}`} style="opacity: 0" />
            {props.title && <div class="gallery-heading">{props.title || 'title'}</div>}
          </a>
        )
      )}
    </div>
  </div>
)
