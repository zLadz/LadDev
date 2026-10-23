var musicBtn = document.getElementById('musicBtn');
var musicStatus = document.getElementById('musicStatus');

var audio = new Audio('assets/1000 Handz - Make It Happen.mp3');
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

  musicBtn.textContent = estaTocando ? 'Pause' : 'Play';
  musicBtn.classList.toggle('is-playing', estaTocando);
  musicBtn.setAttribute('aria-pressed', String(estaTocando));
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
      return;
    }

    var tentativa = audio.play();
    if (tentativa && typeof tentativa.catch === 'function') {
      tentativa.catch(function () {
        setPlaying(false);
        setStatus('erro de reprodução');
      });
    }
  });
}

var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
var navSections = navLinks
  .map(function (link) {
    return document.getElementById(link.getAttribute('href').slice(1));
  })
  .filter(Boolean);

function setActiveSection(id) {
  navLinks.forEach(function (link) {
    var ativo = link.getAttribute('href') === '#' + id;
    link.classList.toggle('is-active', ativo);

    if (ativo) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

var frameAgendado = false;

function atualizarSecaoAtiva() {
  frameAgendado = false;
  if (!navSections.length) return;

  var referencia = window.scrollY + 120;
  var atual = navSections[0].id;

  navSections.forEach(function (secao) {
    if (secao.offsetTop <= referencia) {
      atual = secao.id;
    }
  });

  setActiveSection(atual);
}

function agendarAtualizacao() {
  if (frameAgendado) return;
  frameAgendado = true;
  window.requestAnimationFrame(atualizarSecaoAtiva);
}

window.addEventListener('scroll', agendarAtualizacao, { passive: true });
window.addEventListener('resize', agendarAtualizacao);
window.addEventListener('load', agendarAtualizacao);
window.addEventListener('hashchange', agendarAtualizacao);

atualizarSecaoAtiva();
