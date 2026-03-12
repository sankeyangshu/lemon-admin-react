import { useMount } from '@reactuses/core';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface TeleportProps {
  /**
   * 指定目标容器
   * - CSS 选择器字符串（如 `#id`、`.class`、`body`）
   * - HTMLElement 实例
   */
  to: string | HTMLElement;
  /**
   * 当值为 `true` 时，内容将保留在其原始位置
   * 而不是移动到目标容器中
   */
  disabled?: boolean;
  /**
   * 要渲染的内容
   */
  children: React.ReactNode;
}

/**
 * 获取目标容器
 * @param to - 目标容器
 */
function getTarget(to: string | HTMLElement) {
  if (typeof to === 'string')
    return document.querySelector<HTMLElement>(to);

  return to;
}

function Teleport({ to, disabled = false, children }: TeleportProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useMount(() => {
    setTarget(getTarget(to));
  });

  if (disabled)
    return <>{children}</>;

  if (!target)
    return null;

  return createPortal(children, target);
}

export default Teleport;
