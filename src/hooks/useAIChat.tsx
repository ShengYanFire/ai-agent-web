import { useCallback, useEffect, useRef, useState } from 'react';

export type HistoryItem<Req = any, Res = any> = {
  id: string;          // 时间戳即可
  req: Req;            // 请求参数
  res: Res[];          // 本次请求解析后的所有 JSON
  ts: number;          // 时间戳
};

export type Status = 'idle' | 'loading' | 'done' | 'error';

export type UsePostStreamJSONReturn<Req, Res> = {
  /* 运行状态 */
  status: Status;
  error: string | null;

  /* 本次解析后的数据 */
  data: Res[];

  /* 历史记录 */
  historyList: HistoryItem<Req, Res>[];

  /* 发起请求 */
  post: (url: string, body: Req) => void;

  /* 终止当前请求 */
  abort: () => void;

  /* 初始化历史 */
  initHistory: (list: HistoryItem<Req, Res>[]) => void;

  /* 选中某条历史 */
  selectHistoryItem: (id: string) => void;
};

export default function usePostStreamJSON<Req = any, Res = any>():
  UsePostStreamJSONReturn<Req, Res> {

  /* ---------- 状态 ---------- */
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Res[]>([]);

  const [historyList, setHistoryList] = useState<HistoryItem<Req, Res>[]>([]);

  /* 保存当前请求的 AbortController */
  const abortRef = useRef<AbortController | null>(null);

  /* 清理函数 */
  const clean = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  /* 组件卸载时务必清理 */
  useEffect(() => clean, [clean]);

  /* ---------- 核心：发起流式 POST ---------- */
  const post = useCallback(async (url: string, body: Req) => {
    /* 1. 如果有正在进行的请求，先终止 */
    clean();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    /* 2. 重置状态 */
    setStatus('loading');
    setError(null);
    setData([]);

    const currentRes: Res[] = [];      // 收集本次全部 JSON
    const id = Date.now().toString();  // 用时间戳当 id

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'event-stream' },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder('utf-8');
      let buf = '';

      // 按 chunk 读取流
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        // 按行切分
        const lines = buf.split('\n');
        buf = lines.pop()!; // 最后一行可能不完整，留到下一轮

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json: Res = JSON.parse(line);
            currentRes.push(json);
            /* 增量渲染：实时推到界面 */
            setData(prev => [...prev, json]);
          } catch (e) {
            console.warn('parse json line error:', line, e);
          }
        }
      }

      /* 流正常结束 */
      setStatus('done');
      /* 追加到历史 */
      const item: HistoryItem<Req, Res> = {
        id,
        req: body,
        res: currentRes,
        ts: Number(id),
      };
      setHistoryList(prev => [item, ...prev]);
    } catch (e: any) {
      if (e.name === 'AbortError') return; // 用户主动终止，不视为错误
      setError(e.message || 'Unknown error');
      setStatus('error');
    } finally {
      abortRef.current = null;
    }
  }, [clean]);

  /* ---------- 终止 ---------- */
  const abort = useCallback(() => {
    clean();
    if (status === 'loading') setStatus('idle');
  }, [clean, status]);

  /* ---------- 初始化历史 ---------- */
  const initHistory = useCallback((list: HistoryItem<Req, Res>[]) => {
    setHistoryList(list);
  }, []);

  /* ---------- 选中历史 ---------- */
  const selectHistoryItem = useCallback((id: string) => {
    const target = historyList.find(h => h.id === id);
    if (!target) return;
    /* 把选中的历史当做“当前”数据展示 */
    setData(target.res);
    setStatus('done');
    setError(null);
  }, [historyList]);

  return {
    status,
    error,
    data,
    historyList,
    post,
    abort,
    initHistory,
    selectHistoryItem,
  };
}