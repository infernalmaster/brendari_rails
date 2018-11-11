/*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2017 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-beta.2
 *
 */

function lazyLoad(entries) {
  entries.forEach(entry => {
    let src = entry.getAttribute('data-src')
    let srcset = entry.getAttribute('data-srcset')
    if (
      entry.tagName.toLowerCase() === 'img' ||
      entry.tagName.toLowerCase() === 'video'
    ) {
      if (src) {
        entry.src = src
      }
      if (srcset) {
        entry.srcset = srcset
      }
    } else {
      entry.style.backgroundImage = 'url(' + src + ')'
    }
  })
}

export default lazyLoad
