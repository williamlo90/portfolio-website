import { animate } from "motion/mini";

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (!reducedMotionQuery.matches) {
  setupHomeMotion();
}

function setupHomeMotion() {
  const controller = new AbortController();
  const timers = new Set<number>();
  const observers = new Set<IntersectionObserver>();
  const activeAnimations = new Set<ReturnType<typeof animate>>();
  const ease = [0.22, 1, 0.36, 1] as const;

  const trackAnimation = (animation: ReturnType<typeof animate>) => {
    activeAnimations.add(animation);
    void animation.finished.then(
      () => activeAnimations.delete(animation),
      () => activeAnimations.delete(animation),
    );
    return animation;
  };

  const animateAndRelease = (
    element: HTMLElement,
    keyframes: Parameters<typeof animate>[1],
    options: Parameters<typeof animate>[2],
  ) => {
    const animation = trackAnimation(animate(element, keyframes, options));
    void animation.finished
      .then(() => {
        animation.cancel();
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      })
      .catch(() => undefined);
  };

  const schedule = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };

  setupEvidenceChain({
    animateAndRelease,
    ease,
    observers,
    schedule,
    trackAnimation,
  });

  const cleanup = () => {
    controller.abort();
    observers.forEach((observer) => observer.disconnect());
    timers.forEach((timer) => window.clearTimeout(timer));
    activeAnimations.forEach((animation) => animation.cancel());
  };

  reducedMotionQuery.addEventListener(
    "change",
    (event) => {
      if (!event.matches) return;
      cleanup();
      restoreStableState();
    },
    { signal: controller.signal },
  );
  window.addEventListener(
    "pagehide",
    (event) => {
      if (event.persisted) return;
      cleanup();
    },
    { signal: controller.signal },
  );
}

interface EvidenceChainSetup {
  animateAndRelease: (
    element: HTMLElement,
    keyframes: Parameters<typeof animate>[1],
    options: Parameters<typeof animate>[2],
  ) => void;
  ease: readonly [number, number, number, number];
  observers: Set<IntersectionObserver>;
  schedule: (callback: () => void, delay: number) => void;
  trackAnimation: (
    animation: ReturnType<typeof animate>,
  ) => ReturnType<typeof animate>;
}

function setupEvidenceChain({
  animateAndRelease,
  ease,
  observers,
  schedule,
  trackAnimation,
}: EvidenceChainSetup) {
  const chain = document.querySelector<HTMLElement>("[data-motion-chain]");
  if (!chain || !("IntersectionObserver" in window)) return;

  const stages = Array.from(
    chain.querySelectorAll<HTMLElement>("[data-chain-stage]"),
  );
  const sweep = chain.querySelector<HTMLElement>("[data-chain-sweep]");
  const heading = chain.querySelector<HTMLElement>(".chain-heading");
  if (stages.length !== 4 || !sweep) return;

  chain.dataset.motionChainState = "prepared";

  const runSequence = () => {
    if (chain.dataset.motionChainState !== "prepared") return;
    chain.dataset.motionChainState = "running";

    if (heading) {
      animateAndRelease(
        heading,
        {
          transform: ["translateY(0px)", "translateY(-3px)", "translateY(0px)"],
        },
        { duration: 0.52, ease },
      );
    }

    if (window.matchMedia("(min-width: 801px)").matches) {
      const progressAnimation = trackAnimation(
        animate(
          sweep,
          { transform: ["scaleX(0)", "scaleX(1)"] },
          { duration: 1.9, ease: "linear" },
        ),
      );
      void progressAnimation.finished.catch(() => undefined);
    }

    const stepDelay = 440;
    stages.forEach((stage, index) => {
      schedule(() => {
        stage.dataset.motionState = "active";

        const node = stage.querySelector<HTMLElement>(".chain-node");
        const copy = stage.querySelector<HTMLElement>("div");
        if (node) {
          animateAndRelease(
            node,
            {
              transform:
                index === stages.length - 1
                  ? ["scale(0.96)", "scale(1.055)", "scale(1)"]
                  : ["scale(0.96)", "scale(1)"],
            },
            { duration: index === stages.length - 1 ? 0.46 : 0.3, ease },
          );
        }
        if (copy) {
          animateAndRelease(
            copy,
            {
              transform: ["translateY(6px)", "translateY(0px)"],
            },
            { duration: 0.32, ease },
          );
        }
        schedule(() => delete stage.dataset.motionState, 360);
      }, index * stepDelay);
    });

    schedule(
      () => finishEvidenceChain(chain, stages),
      stepDelay * (stages.length - 1) + 520,
    );
  };

  const chainObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      observers.delete(observer);
      runSequence();
    },
    { threshold: 0.35, rootMargin: "0px 0px -20% 0px" },
  );
  chainObserver.observe(chain);
  observers.add(chainObserver);
}

function finishEvidenceChain(chain: HTMLElement, stages: HTMLElement[]) {
  stages.forEach((stage) => delete stage.dataset.motionState);
  chain.classList.add("is-motion-complete");
  chain.dataset.motionChainState = "complete";
}

function restoreStableState() {
  document
    .querySelectorAll<HTMLElement>(
      ".chain-heading, .chain-node, .chain-item > div",
    )
    .forEach((element) => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    });

  const chain = document.querySelector<HTMLElement>("[data-motion-chain]");
  if (!chain) return;
  const sweep = chain.querySelector<HTMLElement>("[data-chain-sweep]");
  sweep?.style.removeProperty("opacity");
  sweep?.style.removeProperty("transform");
  const stages = Array.from(
    chain.querySelectorAll<HTMLElement>("[data-chain-stage]"),
  );
  finishEvidenceChain(chain, stages);
}
