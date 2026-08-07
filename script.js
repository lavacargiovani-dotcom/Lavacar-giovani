/* =========================================================
   LAVACAR GEOVANI — script.js
   Vanilla JS puro. Sem dependências externas.
========================================================= */
(() => {
  "use strict";

  /* -------------------------------------------------------
     1. NAV — muda aparência ao rolar a página
  ------------------------------------------------------- */
  const nav = document.getElementById("nav");
  const onScrollNav = () => {
    if (window.scrollY > 24) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };
  // passive:true evita bloquear o scroll -> melhor performance/INP
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* -------------------------------------------------------
     2. SCROLL REVEAL — IntersectionObserver
     Revela elementos com a classe .reveal quando entram
     na viewport. Muito mais leve que ouvir "scroll".
  ------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    // Sem suporte ou usuário pediu menos animação: mostra tudo direto.
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // pequeno atraso escalonado para cards dentro do mesmo grid
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealEls.forEach((el, index) => {
      // escalona levemente elementos vizinhos (cards de serviço, etc.)
      const localDelay = (index % 4) * 70;
      el.dataset.revealDelay = localDelay;
      revealObserver.observe(el);
    });
  }

  /* -------------------------------------------------------
     3. ANO DINÂMICO NO RODAPÉ
  ------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------
     4. SMOOTH SCROLL PARA ÂNCORAS INTERNAS
     (fallback além do CSS scroll-behavior, com fechamento
     de possível menu mobile futuro)
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* -------------------------------------------------------
     5. OTIMIZAÇÃO DE CARREGAMENTO
     Marca o body quando a página está totalmente carregada,
     permitindo (se quiser) suavizar transições iniciais via CSS
     e evitando disparar animações pesadas antes da hora.
  ------------------------------------------------------- */
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
  });

  /* -------------------------------------------------------
     6. TRACKING LEVE DE CLIQUES NO WHATSAPP (opcional)
     Não usa nenhuma lib externa. Se o usuário conectar o
     Google Analytics / GA4 (gtag) ou Meta Pixel no futuro,
     este bloco já dispara o evento de conversão automaticamente
     sem quebrar nada caso as ferramentas não estejam instaladas.
  ------------------------------------------------------- */
  document.querySelectorAll('a[href*="wa.me"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "click_whatsapp", {
          event_category: "conversao",
          event_label: btn.className,
        });
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact");
      }
    });
  });
})();
