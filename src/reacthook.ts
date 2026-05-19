// Type definitions for React internals and DevTools hook
interface Fiber {
  type: string | ((...args: unknown[]) => unknown) | object | null;
  tag: number;
  displayName?: string;
  name?: string;
  child: Fiber | null;
  sibling: Fiber | null;
}

interface FiberRoot {
  current: Fiber;
}

interface ReactRenderer {
  version: string;
  [key: string]: unknown;
}

interface ReactDevToolsHook {
  supportsFiber: boolean;
  renderers: Map<number, ReactRenderer>;
  inject(renderer: ReactRenderer): number;
  onCommitFiberRoot(
    rendererID: number,
    root: FiberRoot,
    priority?: unknown,
    didError?: unknown,
  ): void;
  onCommitFiberUnmount(rendererID: number, fiber: Fiber): void;
  onPostCommitFiberRoot(rendererID: number, root: FiberRoot): void;
  on(): void;
  off(): void;
  emit(): void;
  sub(): void;
  checkDCE(): void;
}

// Augment Window interface
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: ReactDevToolsHook;
    __renderTree?: () => void;
    __hookState: {
      trackedRoots: Set<FiberRoot>;
      fiberMeta: Map<Fiber, { name: string; tag: number }>;
    };
    __nameOf: (fiber: Fiber) => string;
    __dumpToLines: (fiber: Fiber, depth: number, lines: string[]) => void;
    __dumpTrees: () => void;
  }
}

(() => {
  const trackedRoots = new Set<FiberRoot>();
  const fiberMeta = new Map<Fiber, { name: string; tag: number }>();
  let rendererCount = 0;

  const myHook: ReactDevToolsHook = {
    supportsFiber: true,
    renderers: new Map(),

    // Called once per renderer (react-dom, react-native, ...).
    // Must return a unique integer ID.
    inject(renderer: ReactRenderer): number {
      const id = ++rendererCount;
      this.renderers.set(id, renderer);
      console.log("[hook] inject renderer", id, "version", renderer.version);
      return id;
    },

    // Called after every commit. `root` is a FiberRoot; root.current is the Fiber.
    onCommitFiberRoot(_rendererID: number, root: FiberRoot): void {
      trackedRoots.add(root);
      indexTree(root.current);
      window.__renderTree?.();
    },

    // Called during the commit phase for each unmounting fiber,
    // BEFORE onCommitFiberRoot fires for that commit.
    onCommitFiberUnmount(_rendererID: number, fiber: Fiber): void {
      fiberMeta.delete(fiber);
    },

    // Called after passive effects (useEffect) have run for a commit.
    onPostCommitFiberRoot(): void {
      // no-op for a basic dump
    },

    // Event-emitter surface used by the real DevTools frontend.
    // React itself never calls these, but the extension will if it's also loaded.
    on() {},
    off() {},
    emit() {},
    sub() {},

    // Production-build DCE check. No-op is fine.
    checkDCE() {},
  };

  // ---- helpers exposed for the rest of the page ----
  function nameOf(fiber: Fiber): string {
    const t = fiber.type;
    if (typeof t === "string") return t; // 'div', 'button', ...
    if (typeof t === "function")
      return (
        (t as { displayName?: string; name?: string }).displayName ||
        (t as { name?: string }).name ||
        "Anonymous"
      );
    if (fiber.tag === 3) return "HostRoot";
    if (fiber.tag === 7) return "Fragment";
    if (t && typeof t === "object")
      return (t as { displayName?: string }).displayName || "SpecialComponent";
    return "?";
  }

  function indexTree(fiber: Fiber): void {
    fiberMeta.set(fiber, { name: nameOf(fiber), tag: fiber.tag });
    let child = fiber.child;
    while (child) {
      indexTree(child);
      child = child.sibling;
    }
  }

  function dumpToLines(fiber: Fiber, depth: number, lines: string[]): void {
    const isComponent = typeof fiber.type === "function";
    lines.push(
      "  ".repeat(depth) + (isComponent ? "◆ " : "· ") + nameOf(fiber),
    );
    let child = fiber.child;
    while (child) {
      dumpToLines(child, depth + 1, lines);
      child = child.sibling;
    }
  }

  // Expose a few things on window so the demo (and you, in the console) can use them.
  window.__hookState = { trackedRoots, fiberMeta };
  window.__nameOf = nameOf;
  window.__dumpToLines = dumpToLines;
  window.__dumpTrees = function (): void {
    console.group("React tree dump");
    for (const root of trackedRoots) {
      const lines: string[] = [];
      dumpToLines(root.current, 0, lines);
      console.log(lines.join("\n"));
    }
    console.groupEnd();
  };

  const existing: ReactDevToolsHook | undefined | null =
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  console.log("encoutered existing hook?", !!existing);
  if (!existing) {
    // No extension installed — install our own (your original code path)
    Object.defineProperty(window, "__REACT_DEVTOOLS_GLOBAL_HOOK__", {
      value: myHook,
      configurable: true,
    });
  } else {
    // Extension is here — wrap its callbacks
    const origCommit = existing.onCommitFiberRoot?.bind(existing);
    const origUnmount = existing.onCommitFiberUnmount?.bind(existing);

    existing.onCommitFiberRoot = function (
      rendererID: number,
      root: FiberRoot,
      priority?: unknown,
      didError?: unknown,
    ): void {
      console.log("[hook] onCommitFiberRoot", {
        rendererID,
        root,
        priority,
        didError,
      });
      if (origCommit) origCommit(rendererID, root, priority, didError);
      trackedRoots.add(root);
      indexTree(root.current);
      window.__renderTree?.();
    };

    existing.onCommitFiberUnmount = function (
      rendererID: number,
      fiber: Fiber,
    ): void {
      if (origUnmount) origUnmount(rendererID, fiber);
      fiberMeta.delete(fiber);
    };
  }
})();
