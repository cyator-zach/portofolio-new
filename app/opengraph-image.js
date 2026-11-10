import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zulfikar Achyar | Backend & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    padding: "80px",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                        style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            background: "#f7941d",
                        }}
                    />
                    <span style={{ color: "#f7941d", fontSize: "20px", fontWeight: "bold", letterSpacing: "2px" }}>
                        PORTFOLIO &amp; SYSTEM ARCHITECTURE
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div
                        style={{
                            color: "#ffffff",
                            fontSize: "64px",
                            fontWeight: "900",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                        }}
                    >
                        Zulfikar Achyar
                    </div>
                    <div style={{ color: "#a1a1aa", fontSize: "28px", fontWeight: "500" }}>
                        Backend &amp; Software Engineer
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        borderTop: "1px solid #27272a",
                        paddingTop: "24px",
                        width: "100%",
                        color: "#71717a",
                        fontSize: "18px",
                    }}
                >
                    <span>Node.js</span>
                    <span>•</span>
                    <span>PostgreSQL</span>
                    <span>•</span>
                    <span>Next.js</span>
                    <span>•</span>
                    <span>IoT Integration</span>
                    <span>•</span>
                    <span style={{ color: "#f7941d", marginLeft: "auto" }}>zulfikarachyar.my.id</span>
                </div>
            </div>
        ),
        { ...size }
    );
}

