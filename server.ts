import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON parsing with sufficient limit for crop photos
  app.use(express.json({ limit: "25mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "CropShield Agricultural Analysis Engine",
      version: "1.0.0",
    });
  });

  // AI Crop Analysis API endpoint
  app.post("/api/analyze-crop", async (req, res) => {
    try {
      const { imageBase64, mimeType = "image/jpeg", cropHint } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: "Missing image data" });
      }

      // Check if Gemini API key is available
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Signal client to use modular internal agricultural classifier
        return res.status(200).json({ fallback: true, message: "Internal classifier active" });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are CropShield's professional AI Agricultural Crop Health Analyst.
Analyze this photo of a crop plant, leaf, vegetable, or fruit.
${cropHint ? `User indicated crop might be: ${cropHint}.` : ""}

Determine if the crop is:
1) "diseased": If visible fungal, bacterial, viral, or pest symptoms are observed. Identify the crop and specific disease (e.g. Tomato Early Blight, Potato Late Blight, Rice Blast, Apple Scab, etc.).
2) "healthy": If the crop foliage appears vibrant green and healthy without noticeable disease lesions.
3) "uncertain": If the image is blurry, too dark, out of focus, or does not clearly show crop vegetation.

IMPORTANT CONSTRAINTS:
- Strictly NEVER mention any underlying AI provider name (e.g. "Teachable Machine", "Google", "Gemini") in any output.
- Present diagnoses respectfully as "Possible disease detected" or "Consistent with...".
- Do NOT invent dangerous chemical product dosages or brand names; recommend standard agricultural safety practices (sanitation, moisture control, spacing, consulting local agricultural extension).
- Provide practical, farmer-friendly, actionable language.

Return structured JSON with the exact following schema:
- status: "healthy" | "diseased" | "uncertain"
- crop: Name of the crop (e.g. "Tomato", "Potato", "Rice", "Apple", "Corn", etc.)
- diseaseName: Specific disease name (e.g. "Tomato Early Blight", or "Healthy Crop (No Disease Detected)", or "Uncertain Crop Diagnosis")
- confidence: Integer percentage between 40 and 98 (e.g. 94)
- severity: "Mild" | "Moderate" | "Severe" | "None"
- symptoms: array of 3 to 4 clear observable symptoms
- possibleCauses: array of 2 to 3 environmental or pathogen causes
- immediateActions: array of 3 to 4 immediate farmer actions (e.g. remove leaves, cease overhead watering)
- agriculturalPractices: array of 2 to 3 long-term farm practices (crop rotation, spacing, drainage)
- preventionSteps: array of 3 preventive steps for future harvests
- safetyPrecautions: array of 3 personal safety & chemical handling precautions
- whenToContactExpert: one clear sentence on when to consult an agronomist
- actionPlan: array of 5 short checkbox steps for the farmer, e.g. [{"id": "1", "text": "Remove affected leaves", "done": false}, ...]
- recommendedSupplierCategory: e.g. "Crop Protection & Bio-Fungicides"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: {
          parts: [
            {
              inlineData: {
                data: imageBase64,
                mimeType: mimeType || "image/jpeg",
              },
            },
            {
              text: prompt,
            },
          ],
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, enum: ["healthy", "diseased", "uncertain"] },
              crop: { type: Type.STRING },
              diseaseName: { type: Type.STRING },
              confidence: { type: Type.INTEGER },
              severity: { type: Type.STRING, enum: ["Mild", "Moderate", "Severe", "None"] },
              symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
              possibleCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
              immediateActions: { type: Type.ARRAY, items: { type: Type.STRING } },
              agriculturalPractices: { type: Type.ARRAY, items: { type: Type.STRING } },
              preventionSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
              safetyPrecautions: { type: Type.ARRAY, items: { type: Type.STRING } },
              whenToContactExpert: { type: Type.STRING },
              actionPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING },
                    done: { type: Type.BOOLEAN },
                  },
                  required: ["id", "text", "done"],
                },
              },
              recommendedSupplierCategory: { type: Type.STRING },
            },
            required: [
              "status",
              "crop",
              "diseaseName",
              "confidence",
              "severity",
              "symptoms",
              "possibleCauses",
              "immediateActions",
              "agriculturalPractices",
              "preventionSteps",
              "safetyPrecautions",
              "whenToContactExpert",
              "actionPlan",
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        return res.status(200).json({ fallback: true });
      }

      const parsedResult = JSON.parse(responseText);
      return res.json(parsedResult);
    } catch (error) {
      console.error("AI Analysis error, using fallback:", error);
      // Seamlessly instruct client to fall back to internal model
      return res.status(200).json({ fallback: true });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CropShield server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
