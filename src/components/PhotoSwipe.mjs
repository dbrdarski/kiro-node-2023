export default () => h("div", { class: "pswp", tabindex: "-1", role: "dialog", "aria-hidden": "true" },
  h("div", { class: "pswp__bg" }),
  h("div", { class: "pswp__scroll-wrap" },
    h("div", { class: "pswp__container" },
      h("div", { class: "pswp__item" }),
      h("div", { class: "pswp__item" }),
      h("div", { class: "pswp__item" })
    ),
    h("div", { class: "pswp__ui pswp__ui--hidden" },
      h("div", { class: "pswp__top-bar" },
        h("div", { class: "pswp__counter" }),
        h("button", { class: "pswp__button pswp__button--close", title: "Close (Esc)" }),
        h("button", { class: "pswp__button pswp__button--share", title: "Share" }),
        h("button", { class: "pswp__button pswp__button--fs", title: "Toggle fullscreen" }),
        h("button", { class: "pswp__button pswp__button--zoom", title: "Zoom in/out" }),
        h("div", { class: "pswp__preloader" },
          h("div", { class: "pswp__preloader__icn" },
            h("div", { class: "pswp__preloader__cut" },
              h("div", { class: "pswp__preloader__donut" })
            )
          )
        )
      ),
      h("div", { class: "pswp__share-modal pswp__share-modal--hidden pswp__single-tap" },
        h("div", { class: "pswp__share-tooltip" })
      ),
      h("button", { class: "pswp__button pswp__button--arrow--left", title: "Previous (arrow left)" }),
      h("button", { class: "pswp__button pswp__button--arrow--right", title: "Next (arrow right)" }),
      h("div", { class: "pswp__caption" },
        h("div", { class: "pswp__caption__center" })
      )
    )
  )
);
