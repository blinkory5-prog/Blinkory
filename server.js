// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = parseInt(process.env.PORT || "3000", 10);
app.use(express.json());
var DATA_DIR = path.resolve(__dirname, "data");
var DB_FILE = path.resolve(DATA_DIR, "applications.json");
function initDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to initialize database file:", err);
  }
}
initDatabase();
function readApplications() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading applications file:", err);
    return [];
  }
}
function saveApplication(record) {
  try {
    const list = readApplications();
    list.push(record);
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(list, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    console.error("Error writing application to file:", err);
    return false;
  }
}
function validateServerPayload(data) {
  if (!data || typeof data !== "object") {
    return { isValid: false, message: "Invalid payload format" };
  }
  const fullName = typeof data.fullName === "string" ? data.fullName.trim() : "";
  if (!fullName || fullName.length < 2) {
    return { isValid: false, message: "Full name is required (at least 2 characters)." };
  }
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { isValid: false, message: "A valid email address is required." };
  }
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const digitsOnly = phone.replace(/\D/g, "");
  if (!phone || digitsOnly.length < 8) {
    return { isValid: false, message: "A valid phone number with country code is required." };
  }
  if (data.agreedToTerms !== true) {
    return { isValid: false, message: "You must agree to be contacted regarding this opportunity." };
  }
  if (data.portfolioUrl && typeof data.portfolioUrl === "string" && data.portfolioUrl.trim() !== "") {
    const trimmedUrl = data.portfolioUrl.trim();
    try {
      const candidate = trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://") ? trimmedUrl : `https://${trimmedUrl}`;
      const parsed = new URL(candidate);
      if (!parsed.hostname || !parsed.hostname.includes(".")) {
        return { isValid: false, message: "Portfolio link is not a valid URL." };
      }
    } catch {
      return { isValid: false, message: "Portfolio link is not a valid URL." };
    }
  }
  return { isValid: true };
}
app.get("/api/health", (req, res) => {
  const apps = readApplications();
  res.json({
    status: "ok",
    storage: "persistent-json-db",
    totalApplications: apps.length,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.post("/api/applications", (req, res) => {
  const validation = validateServerPayload(req.body);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      error: validation.message || "Validation failed"
    });
  }
  const { fullName, phone, email, portfolioUrl, agreedToTerms } = req.body;
  const id = `AC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const submittedAt = (/* @__PURE__ */ new Date()).toISOString();
  const record = {
    id,
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email.trim().toLowerCase(),
    portfolioUrl: portfolioUrl ? portfolioUrl.trim() : "",
    agreedToTerms: Boolean(agreedToTerms),
    submittedAt,
    userAgent: req.headers["user-agent"] || ""
  };
  const saved = saveApplication(record);
  if (!saved) {
    return res.status(500).json({
      success: false,
      error: "Unable to save your application due to a storage error. Please try again."
    });
  }
  return res.status(201).json({
    success: true,
    applicationId: id,
    message: "Application received and securely saved.",
    submittedAt
  });
});
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
