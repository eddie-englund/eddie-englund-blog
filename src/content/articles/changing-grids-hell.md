---
title: 'How changing data tables in a legacy front-end made my life hell'
subtitle: 'Updating dependencies in a legacy application'
date: 'Mon 19 Mar 2023'
author: 'Eddie Englund'
---

# How changing data tables made my life hell

Recently at my work I was assigned a task to change our data grid on the front-end. Sounds easy, right? Well, not in our legacy application...

To give some context to this front-end application, it runs or rather ran on webpack 2, vue2, and a whole ton of 5 year old (or older) dependencies. For example [Axios](https://www.npmjs.com/package/axios?activeTab=versions) was running on [0.23.0](https://www.npmjs.com/package/axios?activeTab=versions) and the current version is [1.3.4](https://www.npmjs.com/package/axios?activeTab=versions)!

This and many poor decitions made local development hell as we were also proxying all of our requests to our back-end via a local nginx server. Startup times were generally ca 3 minutes on a MacBook Pro M1 (14-inch, 2021) and even slower on my collegues machine. Then general compiles took ca 30 seconds to render basic css changes and other changes. This, along with a poor eslint setup causing auto formatting to format into an invalid format made working locally a living nightmare!


### What was wrong with the old grid?

Our old grid is called [Handontable](https://handsontable.com/demo) and there were a couple of issues with this grid.

First of all, it [doesn't look great](https://handsontable.com/demo) but worse than that was it's performance. Now, unfortunately, I don't know if this was the grid itself or if it was due to our old dependencies and I can't test it with our new ones (I'll explain this later). But switching to our newer grid it was like night and day in this regard.

Secondly, the developer experience is not great. Here below, you can see an example from the [docs](https://handsontable.com/docs/javascript-data-grid/vue-vuex-example/)

```js
import Vue from 'vue';
import Vuex from 'vuex';
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

Vue.use(Vuex);

// register Handsontable's modules
registerAllModules();

const ExampleComponent = {
  data() {
    return {
      hotSettings: {
        data: [
          ['A1', 'B1', 'C1', 'D1'],
          ['A2', 'B2', 'C2', 'D2'],
          ['A3', 'B3', 'C3', 'D3'],
          ['A4', 'B4', 'C4', 'D4'],
        ],
        colHeaders: true,
        rowHeaders: true,
        readOnly: true,
        height: 'auto',
        afterChange: () => {
          if (this.hotRef) {
            this.$store.commit('updateData', this.hotRef.getSourceData());
          }
        },
        licenseKey: 'non-commercial-and-evaluation'
      },
      hotRef: null
    };
  },
  mounted() {
    this.hotRef = this.$refs.wrapper.hotInstance;
    this.$store.subscribe(() => this.updateVuexPreview());
    this.$store.commit('updateData', this.hotRef.getSourceData());
  },
  methods: {
    toggleReadOnly(event) {
      this.hotSettings.readOnly = event.target.checked;
      this.$store.commit('updateSettings', {prop: 'readOnly', value: this.hotSettings.readOnly});
    },
    updateVuexPreview() {
      // This method serves only as a renderer for the Vuex's state dump.

      const previewTable = document.querySelector('#vuex-preview table');
      let newInnerHtml = '<tbody>';

      for (const [key, value] of Object.entries(this.$store.state)) {
        newInnerHtml += `<tr><td class="table-container">`;

        if (key === 'hotData' && Array.isArray(value)) {
          newInnerHtml += `<strong>hotData:</strong> <br><table><tbody>`;

          for (let row of value) {
            newInnerHtml += `<tr>`;

            for (let cell of row) {
              newInnerHtml += `<td>${cell}</td>`;
            }

            newInnerHtml += `</tr>`;
          }
          newInnerHtml += `</tbody></table>`;

        } else if (key === 'hotSettings') {
          newInnerHtml += `<strong>hotSettings:</strong> <ul>`;

          for (let settingsKey of Object.keys(value)) {
            newInnerHtml += `<li>${settingsKey}: ${this.$store.state.hotSettings[settingsKey]}</li>`;
          }

          newInnerHtml += `</ul>`;
        }

        newInnerHtml += `</td></tr>`;
      }
      newInnerHtml += `</tbody>`;

      previewTable.innerHTML = newInnerHtml;
    }
  },
  components: {
    HotTable
  },
  store: new Vuex.Store({
    state: {
      hotData: null,
      hotSettings: {
        readOnly: false
      }
    },
    mutations: {
      updateData(state, hotData) {
        state.hotData = hotData;
      },
      updateSettings(state, updateObj) {
        state.hotSettings[updateObj.prop] = updateObj.value;
      }
    }
  })
}

export default ExampleComponent;
```

And honestly, I won't dive to deep into it but the fact that you need to compare strings all the times and deal with type checking and other creates a lot of code that's really hard to maintain. Our setup however, wasn't even this good like the docs above and it created a lot of hastle... 

Now the biggest reason of all was that handsontable or at least the version we had simply didn't let us upgrade change our core dependencies!

You see a few months earlier we tried to upgrade all of our dependencies and this including chaning out our webpack 2 (current webpack is version 5) setup to [Vite](https://vitejs.dev/) because it straight up wouldn't work with the addons and other stuff we had with Handontable.

There were also other reasons to our switch but I won't go into those here.

### The replacement grid

So, what did we choose instead of Handsontable? Let me introduce [RevoGrid](https://revolist.github.io/revogrid/). We chose this grid for a few reasons, but the main one is that we wanted an "Excel like" grid as the application itself is very data centric and is frequently used to copy paste, search for data, etc. And this feature is something that RevoGrid boasts quite heavly in their marketing.

> "Inspired by the best features Excel has. Range edit, copy paste, csv export, incredible performance." - [RevoGrid](https://revolist.github.io/revogrid/)

Another reason for using it was it's customisability and reusability of code. Which in theory should lead to a better development experience. However, it really wasn't but not due to any fault of RevoGrid itself (I'll discuss this further later).

### The hurdles

Because Handontable was blocking us from upgrading to new dependencies we wanted to first change our grids and upgrade the UI/UX where we could in our application in relation to the grids (buttons, inputs, dropdowns, etc). And as such we wanted to do a gradual change allowing us to focus on other tasks that were just as if not more important.

However, when I started changing the first view and updating it's back-end endpoint I quickly noticed that RevoGrid was erroring out of it's a**...

<video controls width="500">
  <source src="/revogrid-errors.webm">
</video>

Then to investigate... Eventually we found out that it was due to our old dependencies (node 14 and other stuff), and so we attempted to use Babel to resolve it but no dice...

So all I could do was to suck it up and just make sure to reload manually every time I mad a change (the errors mainly occured when a hot reload was made).

### Conclusion

After rougly 3 gruesome months, 6+ pages that had to be re-done on the back-end and front-end I was done...

So, don't change stuff in a legacy application with such old dependencies, unless you absolutely have to! If possible convince your production owner to create a new front-end with new dependencies and technologies.