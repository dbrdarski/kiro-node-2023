// export ({ attrs }) => {
//   return (
//     <div>
//       { attrs.galleries.map( gallery => {
//         return (
//           <div>
//             {{ gallery.name }}
//           </div>
//         )
//       }) }
//     </div>
//   );
// };


export default ({ attrs }, h) => {
  const albumFolders = Object.keys(attrs.data)
  console.log(albumFolders)
  return h('div', { class: 'gallery' },
    h('div', { class: 'gallery-inner' },
      albumFolders.map( dirname => {
        const album = attrs.data[dirname]
        const { filename } = Object.values(album)[0]
        return h('div', null,
          h('a', {
            class: 'xs-album scroll-gallery-item',
            href: `/media/albums/${dirname}`
          },
            h('img', { src: `/media/images/${dirname}/md/${filename}`})
          )
        )
      })
    )
  );
};
