export default class FilterDropdown extends HTMLElement {
      observedAttributes = ["label"]

      constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              position: relative;
            }
            .label {
              display: block;
              color: #09f;
              margin-bottom: 5px;
              font-size: 13px;
              font-weight: 300;
            }
            .input {
              width: 100%;
              box-sizing: border-box;
              background: white;
              color: #09f;
              padding: 10px 16px;
              font-size: 15px;
              border: 0 none;
              font-weight: 400;
              background: #39f2;
              outline: 0 none;
              width: 100%;
              box-shadow: 0 -1px 0 #09f8 inset;
              border-radius: 3px 3px 0 0;
            }
            .input::placeholder {
              color: #09f9;
            }
            .dropdown {
              height: 5.5em; /* Approx 5 rows (assuming ~1.1em line-height) */
              overflow-y: auto;
              display: block; /* Always visible */
              padding: 4px 9px;
              border: 1px solid #09f6;
              border-top: 0 none;
            }
            ::slotted([hidden]) {
              display: none !important;
            }
          </style>
          <label>
            <span class="label">${this.getAttribute("label")}</span>
            <input type="text" class="input" placeholder="Filter...">
          </label>
          <div class="dropdown">
            <slot></slot>
          </div>
        `;

        this.input = this.shadowRoot.querySelector('.input');
      }

      connectedCallback() {
        this.input.addEventListener('input', () => {
          this.filterItems();
        });

        // Initial filter in case input is pre-filled
        this.filterItems();
      }

      filterItems() {
        const filterValue = this.input.value.toLowerCase().trim();
        const items = this.querySelectorAll('[data-filter-value]');

        items.forEach(item => {
          const itemValue = item.getAttribute('data-filter-value') || '';
          if (itemValue.toLowerCase().includes(filterValue)) {
            item.removeAttribute('hidden');
          } else {
            item.setAttribute('hidden', '');
          }
        });
      }
    }

    customElements.define('filter-dropdown', FilterDropdown);
