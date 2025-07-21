import { getImageHash } from "../utils/hash.js";
import { saveHashLocally, verifyHash } from "../utils/storage.js";

document.getElementById("saveKeyBtn").addEventListener("change", async (e) => {
  const file = e.target.files[0];
    if (file) {
        const hash = await getImageHash(file);
            saveHashLocally(hash);
                alert("✅ تم حفظ المفتاح!");
                  }
                  });

                  document.getElementById("verifyKeyBtn").addEventListener("change", async (e) => {
                    const file = e.target.files[0];
                      if (file) {
                          const hash = await getImageHash(file);
                              const match = verifyHash(hash);
                                  alert(match ? "✅ تحقق ناجح!" : "❌ الصورة غير مطابقة!");
                                    }
                                    }); NamedNodeMap