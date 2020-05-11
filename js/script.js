const button = document.querySelector(".save");
const textarea = document.querySelector("textarea");
const button2 = document.querySelector(".save2");
let boxes = document.querySelectorAll('input[type=checkbox]');

function setCookie(name, value, options={}) {
  options = {
    path: '/'
  }
  let updatedCookie = encodeURIComponent(name)+'='+encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie +=';' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie +='=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, '', {
    'max-age':-1
  })
}

function checkCookie() {
  [].map.call(boxes, function(el){
    if (getCookie(el.id) != '' &&  getCookie(el.id) != undefined) {
      el.checked = true
    }
  });
}

button.onclick = () => {
  let value = textarea.value;
  if (value != "") {
    this.setCookie("town", value);
    document.location.reload();
  } else {
    alert('Vvedite gorod')
  }
}

button2.onclick = () => {
  [].map.call(boxes, function(el){
    if (el.checked) {
      setCookie(el.id, el.id);
    } else {
      return !el.checked;
    }
  });
  console.log(document.cookie);
}

if (getCookie("town")) {
  let town = getCookie("town");
  let p = document.createElement("p");
  let a = document.createElement("a");
  p.textContent = `Your town is ${town}`;
  a.textContent = `Delete town`;
  a.href = "#";
  document.querySelector('.text-form').style.display = 'none';
  document.querySelector('.town-task').appendChild(p);
  document.querySelector('.town-task').appendChild(a);
  a.onclick = () => {
    deleteCookie("town");
    document.location.reload();
  }
}

checkCookie();
