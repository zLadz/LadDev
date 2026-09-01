function openZoom(el) {
  var img = el.querySelector('img');
  var zoomImg = document.getElementById('zoomImage');
  zoomImg.src = img.src;
  document.getElementById('zoomModal').style.display = 'flex';
}

function closeZoom() {
  document.getElementById('zoomModal').style.display = 'none';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeZoom();
  }
});

/* ===== Player de música (áudio local) ===== */
var musicBtn = document.getElementById('musicBtn');
var musicStatus = document.getElementById('musicStatus');

var audio = new Audio('assets/bbno - 1-800 (ft. ironmouse).mp3');
audio.loop = true;
audio.volume = 0.3;
audio.preload = 'metadata';

var playing = false;

function setStatus(texto) {
  if (musicStatus) {
    musicStatus.textContent = texto;
  }
}

function setPlaying(estaTocando) {
  playing = estaTocando;
  if (!musicBtn) return;
  if (estaTocando) {
    musicBtn.textContent = 'Pause';
    musicBtn.classList.add('playing');
  } else {
    musicBtn.textContent = 'Play';
    musicBtn.classList.remove('playing');
  }
}

audio.addEventListener('play', function () {
  setPlaying(true);
  setStatus('tocando');
});

audio.addEventListener('pause', function () {
  setPlaying(false);
  setStatus('pausado');
});

audio.addEventListener('error', function () {
  setPlaying(false);
  setStatus('erro de reprodução');
});

if (musicBtn) {
  musicBtn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  });
}

/* ===== Projetos (via API) ===== */
function carregarProjetos() {
  var container = document.getElementById('lista-projetos');
  if (!container) return;
  container.innerHTML = '<p>Carregando projetos...</p>';
  fetch('/api/projetos')
    .then(function (res) {
      return res.json();
    })
    .then(function (projetos) {
      container.innerHTML = '';
      projetos.forEach(function (p) {
        var card = document.createElement('div');
        card.className = 'project-card';
        var rotulo;
        var classe;
        if (p.tipo === 'site') {
          rotulo = 'Visitar site';
          classe = 'site-btn';
        } else {
          rotulo = 'Ver no GitHub';
          classe = 'viewgh-btn';
        }
        card.innerHTML =
          '<h3>' + p.titulo + '</h3>' +
          '<p>' + p.descricao + '</p>' +
          '<a href="' + p.link + '" target="_blank" rel="noopener" class="' + classe + '">' + rotulo + '</a>';
        container.appendChild(card);
      });
    })
    .catch(function () {
      if (container) {
        container.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
      }
    });
}

/* ===== Navegação sem recarregar a página (música continua) ===== */
function routePath() {
  return location.pathname.split('/').pop() || 'index.html';
}

function setActiveNav(path) {
  document.querySelectorAll('nav a').forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('href') === path);
  });
}

function navigateTo(href) {
  fetch(href)
    .then(function (res) {
      return res.text();
    })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var novo = doc.querySelector('.container');
      var alvo = document.querySelector('.container');
      if (novo && alvo) {
        alvo.innerHTML = novo.innerHTML;
      }
      var titulo = doc.querySelector('title');
      if (titulo) {
        document.title = titulo.textContent;
      }
      var path = href.split('/').pop();
      setActiveNav(path);
      if (path === 'projetos.html') {
        carregarProjetos();
      }
      window.scrollTo(0, 0);
    });
}

document.addEventListener('click', function (e) {
  var link = e.target.closest ? e.target.closest('nav a') : null;
  if (link) {
    e.preventDefault();
    var href = link.getAttribute('href');
    if (href === routePath()) return;
    history.pushState({}, '', href);
    navigateTo(href);
  }
});

window.addEventListener('popstate', function () {
  navigateTo(routePath());
});

/* ===== Inicialização ===== */
(function () {
  var path = routePath();
  setActiveNav(path);
  if (path === 'projetos.html') {
    carregarProjetos();
  }
})();