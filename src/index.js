    
import { el, element, formatDate } from './lib/utils';
// importa öðru sem þarf...
import { fetchEarthquakes } from './lib/earthquakes';

import { createPopup, init} from './lib/map';
function addEarthquakes(earthquakes) {
  earthquakes.then((equakeArray) => {
    equakeArray.forEach((f) => {
      const marker = createPopup(f);
      const eq = el('li',
        el('div',
          el('h2',`M ${f.properties.mag} - ${f.properties.place}`),
          el('dl',
            el('dt','Tími'),
            el('dd',formatDate(f.properties.time)),
            el('dt','Styrkur'),
            el('dd',`${f.properties.mag} á richter`),
          ),
        element('div',{ class: 'buttons' }, null,
          element('button',null,{ click: () => createPopup(marker) },'Sjá á korti',),
          element('a',{ href: f.properties.url, target: '_blank' }, null,'Skoða nánar',),
        ),
      ),
    );
    document.getElementsByClassName('earthquakes')[0].appendChild(eq);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  init(document.getElementsByClassName('map')[0]);
  document.querySelector('.loading').remove(); // remove loading
  const dat = fetchEarthquakes();
  addEarthquakes(dat);
});