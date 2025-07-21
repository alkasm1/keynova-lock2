import jsSHA from "jssha";

export function getImageHash(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
      shaObj.update(reader.result);
      const hash = shaObj.getHash("HEX");
      resolve(hash);
    };

    reader.onerror = () => reject("فشل في قراءة الملف");
    reader.readAsArrayBuffer(file);
  });
}