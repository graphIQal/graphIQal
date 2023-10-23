import { useWorkspace } from '@/components/context/WorkspaceContext';
import { useEffect, useCallback, useRef } from 'react';

type OptionalConfig = Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'shiftKey'>;

interface ShortcutConfig extends Partial<OptionalConfig> {
  code: KeyboardEvent['code'];
  workspace?: string; // represents graph or doc id (0 for doc)
  shortcutTarget?: HTMLElement | null;
}

type ShortcutAction = (e: KeyboardEvent) => void;

export const useKeyboardShortcut = (
  shortcutAction: ShortcutAction,
  config: ShortcutConfig
) => {
  const targetElement = config.shortcutTarget || document;
  const { activeWorkspace } = useWorkspace();

  const activeWorkspaceRef = useRef(activeWorkspace);

  useEffect(() => {
    activeWorkspaceRef.current = activeWorkspace;
  }, [activeWorkspace]);

  const eventHandler = useCallback(
    (e: Event) => {
      const currWorkspace = activeWorkspaceRef.current;
      const { code, ctrlKey, altKey, shiftKey, metaKey } = e as KeyboardEvent;

      if (config.code !== code) return;
      if (config.shiftKey && !shiftKey) return;
      if (config.ctrlKey && !(ctrlKey || metaKey)) return;
      if (config.altKey && !altKey) return;
      if (shiftKey && !config.shiftKey) return; // prevent undo when using redo shortcut
      if (config.workspace) {
        // if we're working with a specific workspace (or tab)
        if (currWorkspace === config.workspace) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          shortcutAction(e as KeyboardEvent);
        }
      } else {
        // general keyboard shortcut
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        shortcutAction(e as KeyboardEvent);
      }
    },
    [shortcutAction, config]
  );

  useEffect(() => {
    targetElement.addEventListener('keydown', (e: Event) => eventHandler(e));
    return () =>
      targetElement.removeEventListener('keydown', (e: Event) =>
        eventHandler(e)
      );
  });
};
