import { useState, useEffect, useRef } from 'react';

// maxTime: 秒単位（整数）
// 内部で 1/10秒単位の整数として管理し、浮動小数点誤差を防ぐ
// 戻り値: 残り秒数（小数第一位まで）
export function useTimer(maxTime: number, onExpire: () => void) {
  const [tenths, setTenths] = useState(maxTime * 10);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    hasExpiredRef.current = false;
    const id = setInterval(() => {
      setTenths((prev) => Math.max(prev - 1, 0));
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (tenths === 0 && !hasExpiredRef.current) {
      hasExpiredRef.current = true;
      onExpireRef.current();
    }
  }, [tenths]);

  return tenths / 10;
}
