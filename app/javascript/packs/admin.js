import Muuri from 'muuri'

document.addEventListener('DOMContentLoaded', function () {
  const csrfToken = document.querySelector('[name="_csrf"]').content

  const fileInputs = document.querySelectorAll('.js-fileupload')

  function uploadFile (fileInput) {
    if (fileInput.files.length === 0) return

    const wrapper = fileInput.parentNode

    const formData = new window.FormData()
    formData.append('file', fileInput.files[0])
    formData.append('_csrf', csrfToken)

    const request = new window.XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return

      if (request.status === 201) {
        const resp = JSON.parse(request.response)
        console.log(resp)

        wrapper.querySelector('.js-img').src = resp.full_name
        wrapper.querySelector('.js-file-text').value = resp.file
      } else {
        console.log(request.responseText)
      }
    }

    const pbar = wrapper.querySelector('.js-pbar')
    request.upload.addEventListener('progress', function (e) {
      const progress = Math.ceil(e.loaded / e.total * 100)
      pbar.style.width = `${progress}%`
    }, false)
    request.open('post', fileInput.dataset.path)
    request.send(formData)
  }

  fileInputs.forEach((input) => {
    input.addEventListener('change', () => { uploadFile(input) })
  })

  // grid
  const msnryContainer = document.querySelector('.js-msnry')
  if (msnryContainer) {
    msnryContainer.classList.add('js-activated')

    const g = new Muuri('.msnry', {
      items: '.msnry-item',
      dragEnabled: true,
      dragSort: true,
      layout: {
        fillGaps: true,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
      }
    }).on('dragReleaseEnd', () => {
      g.synchronize()
      const ids = Array.from(document.querySelectorAll('.msnry-item')).map(el => el.dataset.id)
      $.ajax({
        type: 'POST',
        url: '/admin/logos/reposition',
        data: {
          ids: ids.join(','),
          _csrf: csrfToken
        },
        success: (resp) => {
          console.log('saved')
        },
        dataType: 'json'
      })
    })
  }
})
