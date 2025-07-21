import { useState } from "react";
import { getImageHash } from "./utils/hash";
import { saveHashLocally, verifyHash } from "./utils/storage";
import { lockItem, isItemUnlocked } from "./lock/lockManager";

export default function TestZone() {
  const [hash, setHash] = useState("");
    const [message, setMessage] = useState("");

      const handleSave = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
              if (file) {
                    const imgHash = await getImageHash(file);
                          saveHashLocally(imgHash);
                                lockItem("test_panel", imgHash);
                                      setHash(imgHash);
                                            setMessage("✅ المفتاح محفوظ وتم قفل العنصر!");
                                                  console.log("Saved Hash:", imgHash);
                                                      }
                                                        };

                                                          const handleVerify = async (e: React.ChangeEvent<HTMLInputElement>) => {
                                                              const file = e.target.files?.[0];
                                                                  if (file) {
                                                                        const imgHash = await getImageHash(file);
                                                                              const match = verifyHash(imgHash);
                                                                                    const unlock = isItemUnlocked("test_panel", imgHash);
                                                                                          setMessage(match && unlock ? "✅ تحقق ناجح وفُك القفل!" : "❌ فشل التحقق!");
                                                                                                console.log("Input Hash:", imgHash);
                                                                                                      console.log("Stored:", localStorage.getItem("keynova_hash"));
                                                                                                          }
                                                                                                            };

                                                                                                              return (
                                                                                                                  <div style={{ padding: "2rem" }}>
                                                                                                                        <h2>🔬 صفحة اختبار Keynova Lock</h2>

                                                                                                                              <label>⬆️ اختر صورة لحفظ المفتاح</label>
                                                                                                                                    <input type="file" accept="image/*" onChange={handleSave} />

                                                                                                                                          <label style={{ marginTop: "1rem" }}>⬆️ اختر صورة للتحقق</label>
                                                                                                                                                <input type="file" accept="image/*" onChange={handleVerify} />

                                                                                                                                                      <p><strong>Hash الحالي:</strong> {hash}</p>
                                                                                                                                                            <p><strong>النتيجة:</strong> {message}</p>
                                                                                                                                                                </div>
                                                                                                                                                                  );
                                                                                                                                                                  }