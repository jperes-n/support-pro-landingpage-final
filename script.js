// script.js
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.js-scroll-trigger');

  if (!elementsToAnimate.length) {
    console.warn('Nenhum elemento encontrado com a classe .js-scroll-trigger para animar.');
    return;
  }

  const observerOptions = {
    root: null, // observa interseções em relação à viewport
    rootMargin: '0px',
    threshold: 0.1 // dispara quando 10% do elemento está visível
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      const target = entry.target; // Elemento sendo observado
      if (entry.isIntersecting) {
        target.classList.add('animate-now'); // Adiciona a classe para animar a entrada da seção

        // Se a seção hero estiver entrando na tela, anima seus filhos
        if (target.classList.contains('hero')) {
          const heroChildren = target.querySelectorAll('.js-hero-child-animate');
          heroChildren.forEach(child => child.classList.add('animate-now'));
        }
      } else {
        // Se não estiver mais intersectando (saiu da tela), remove a classe
        // para que possa animar novamente ao reentrar.
        target.classList.remove('animate-now');

        // Se a seção hero estiver saindo da tela, reseta a animação de seus filhos
        if (target.classList.contains('hero')) {
          const heroChildren = target.querySelectorAll('.js-hero-child-animate');
          heroChildren.forEach(child => child.classList.remove('animate-now'));
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });

  // Opcional: verificar preferência de movimento reduzido no JS também,
  // embora o CSS já lide com isso de forma robusta.
  // const prefersReducedMotion =       window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // if (prefersReducedMotion) {
  //   elementsToAnimate.forEach(el => {
  //     el.classList.remove('js-scroll-trigger'); // Remove a classe para não ser processado pelo observer
  //     // Garante que estejam visíveis se o CSS não pegar por algum motivo
  //     el.style.opacity = '1';
  //     el.style.visibility = 'visible';
  //     el.style.transform = 'translateY(0)';
  //   });
  //   if (observer) { // Desconecta o observer se não for mais necessário
  //       observer.disconnect();
  //   }
  //   return; // Não configura o observer se movimento reduzido for preferido
  // }

  // Lógica para o menu hamburger
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navMenuContainer = document.querySelector('.nav-menu-container'); // Seleciona o novo container

  if (navbarToggler && navMenuContainer) {
    navbarToggler.addEventListener('click', () => {
      navMenuContainer.classList.toggle('active');
      // Opcional: alternar ícone do hamburger (bars/times)
      // navbarToggler.querySelector('i').classList.toggle('fa-bars');
      // navbarToggler.querySelector('i').classList.toggle('fa-times');
    });
  }
});
