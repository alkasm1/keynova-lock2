// قفل مكون باسم معين باستخدام الـ hash
export function lockTarget(targetId, hash) {
    localStorage.setItem(`locked_${targetId}`, hash);
  }
  
  // فك القفل عند المطابقة
  export function unlockTarget(targetId, inputHash) {
    const stored = localStorage.getItem(`locked_${targetId}`);
    return stored === inputHash;
  }