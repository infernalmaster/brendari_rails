export default function ajaxGet({url, onSuccess, onError}) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          onSuccess(xhr)
        } else {
          onError(xhr)
        }
      }
  }

  xhr.open("GET", url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.setRequestHeader('X-CSRF-Token', document.querySelector('meta[name=csrf-token]').content)
  xhr.send()
}
