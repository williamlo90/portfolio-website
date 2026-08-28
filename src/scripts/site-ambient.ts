const ambient = document.querySelector<HTMLElement>("[data-site-ambient]");
const lens = ambient?.querySelector<HTMLElement>("[data-site-ambient-lens]");

if (ambient && lens) {
  setupSiteAmbient(ambient, lens);
}

function setupSiteAmbient(ambient: HTMLElement, lens: HTMLElement) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia(
    "(min-width: 801px) and (hover: hover) and (pointer: fine)",
  );
  const forcedColors = window.matchMedia("(forced-colors: active)");
  const controller = new AbortController();
  let interactionController: AbortController | undefined;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let lensRadius = 380;

  const deactivate = () => {
    delete ambient.dataset.active;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };

  const paint = () => {
    frame = 0;
    if (document.hidden) return;
    lens.style.transform = `translate3d(${pointerX - lensRadius}px, ${pointerY - lensRadius}px, 0)`;
    ambient.dataset.active = "true";
  };

  const stop = () => {
    interactionController?.abort();
    interactionController = undefined;
    deactivate();
  };

  const start = () => {
    if (interactionController) return;
    lensRadius = lens.getBoundingClientRect().width / 2 || 380;
    interactionController = new AbortController();
    const signal = interactionController.signal;

    document.addEventListener(
      "pointermove",
      (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (frame) return;
        frame = window.requestAnimationFrame(paint);
      },
      { passive: true, signal },
    );
    document.documentElement.addEventListener("pointerleave", deactivate, {
      signal,
    });
    window.addEventListener("blur", deactivate, { signal });
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) deactivate();
      },
      { signal },
    );
  };

  const sync = () => {
    if (
      !reducedMotion.matches &&
      finePointer.matches &&
      !forcedColors.matches
    ) {
      start();
    } else {
      stop();
    }
  };

  [reducedMotion, finePointer, forcedColors].forEach((query) => {
    query.addEventListener("change", sync, { signal: controller.signal });
  });
  window.addEventListener(
    "pagehide",
    (event) => {
      if (event.persisted) {
        deactivate();
        return;
      }
      stop();
      controller.abort();
    },
    { signal: controller.signal },
  );

  sync();
}
