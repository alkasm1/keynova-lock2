import React, { useState } from "react";
import { getImageHash } from "../utils/hash"; // تأكد من المسار الصحيح

const TestZone: React.FC = () => {
  const [matchPercent, setMatchPercent] = useState<number | null>(null);
  const [feedbackColor, setFeedbackColor] = useState<string>("gray");
  const [message, setMessage] = useState<string>("");

  const calculateSimilarity = (hash1: string, hash2: string): number => {
    let differences = 0;
    for (let i = 0; i < hash1.length; i++) {
      if (hash1[i] !== hash2[i]) differences++;
    }
    const percent = ((hash1.length - differences) / hash1.length) * 100;
    return Math.round(percent);
  };

  const handleVerify = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const inputHash = await getImageHash(file);
    const storedHash = localStorage.getItem("keynova_hash");

    if (!storedHash) {
      setMessage("⚠️ لا يوجد مفتاح مخزن. الرجاء حفظ مفتاح أولًا.");
      setFeedbackColor("gray");
      setMatchPercent(null);
      return;
    }

    const percent = calculateSimilarity(storedHash, inputHash);
    setMatchPercent(percent);

    if (percent >= 90) {
      setMessage(`✅ تم التحقق بنجاح بنسبة تطابق ${percent}%`);
      setFeedbackColor("green");
    } else if (percent >= 70) {
      setMessage(`⚠️ نسبة التطابق ${percent}%. قد تكون الصورة غير دقيقة.`);
      setFeedbackColor("orange");
    } else {
      setMessage(`❌ نسبة التطابق ${percent}%. محتمل أن تكون مزيفة.`);
      setFeedbackColor("red");
    }
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h2>منطقة اختبار الصورة</h2>
      <input type="file" accept="image/*" onChange={handleVerify} />
      {matchPercent !== null && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: feedbackColor, fontWeight: "bold", fontSize: "1.2rem" }}>
            {message}
          </p>
          <progress
            value={matchPercent}
            max={100}
            style={{ width: "80%", height: "16px" }}
          />
        </div>
      )}
    </div>
  );
};

export default TestZone;
