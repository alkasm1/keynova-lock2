import { useState } from "react";
import TestZone from "./TestZone"; // صفحة الاختبار
import "./style.css"; // إن أردت ربط تصميم خارجي

function App() {
  const [view, setView] = useState<"home" | "test">("test");

    return (
        <div className="app-wrapper">
              <header>
                      <h1>🔐 Keynova Lock</h1>
                              <nav>
                                        <button onClick={() => setView("home")}>الواجهة الرئيسية</button>
                                                  <button onClick={() => setView("test")}>صفحة الاختبار</button>
                                                          </nav>
                                                                </header>

                                                                      <main>
                                                                              {view === "test" && <TestZone />}
                                                                                      {view === "home" && <p>👋 مرحبًا بك في Keynova Lock</p>}
                                                                                            </main>
                                                                                                </div>
                                                                                                  );
                                                                                                  }

                                                                                                  export default App;