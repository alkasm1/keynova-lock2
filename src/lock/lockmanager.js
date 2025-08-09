// حفظ المفتاح المرتبط بمكون معين داخل LocalStorage
export function lockItem(itemId, hash) {
  localStorage.setItem(`locked_${itemId}`, hash);
  }

  // التحقق من أن الصورة المدخلة تطابق المفتاح المحفوظ للمكون
  export function isItemUnlocked(itemId, inputHash) {
    const storedHash = localStorage.getItem(`locked_${itemId}`);
      return storedHash === inputHash;
      }

      // إزالة المفتاح بالكامل (فك القفل)
      export function unlockItem(itemId) {
        localStorage.removeItem(`locked_${itemId}`);
        }

        // التحقق مما إذا كان المكون مقفل حاليًا
        export function isItemLocked(itemId) {
          return localStorage.getItem(`locked_${itemId}`) !== null;
          }