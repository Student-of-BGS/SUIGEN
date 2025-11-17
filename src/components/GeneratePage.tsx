// src/components/GeneratePage.tsx

import { useState } from "react";
import { motion } from "motion/react";
import { Wand2, RotateCw, Download, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

// Added from your file structure
import { Card } from "@/components/ui/card"; 
import { Skeleton } from "@/components/ui/skeleton";

export function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // --- NEW STATES FOR API ---
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  // --------------------------

  const [formData, setFormData] = useState({
    gender: "",
    ageRange: "",
    skinTone: "",
    hairColor: "",
    hairStyle: "",
    eyeColor: "",
    facialShape: "",
    distinctiveFeatures: "",
  });

  // --- THIS IS THE MAIN UPDATE ---
  const handleGenerate = async () => {
    setIsGenerating(true);
    setHasGenerated(false);
    setImageUrl("");
    setError(null);

    // 1. Build a descriptive prompt from the form data
    //    We filter out any empty fields.
    const parts = [
      "A high-resolution, photorealistic portrait of a",
      formData.gender,
      formData.ageRange ? `around ${formData.ageRange} years old` : "",
      formData.facialShape ? `with a ${formData.facialShape} face` : "",
      formData.skinTone ? `with ${formData.skinTone} skin` : "",
      formData.eyeColor ? `${formData.eyeColor} eyes` : "",
      formData.hairColor || formData.hairStyle
        ? `and ${formData.hairColor} ${formData.hairStyle} hair`
        : "",
    ];

    let prompt = parts.filter(Boolean).join(", "); // "A photo of a, male, 25-35..."
    prompt = prompt.replace(", ,", ",").replace("  ", " "); // Clean up commas
    
    // Add distinctive features at the end
    if (formData.distinctiveFeatures) {
      prompt += `. Distinctive features include: ${formData.distinctiveFeatures}.`;
    }

    const negativePrompt = "cartoon, 3d, (disfigured), (bad art), (deformed), (poorly drawn), (extra limbs), blurry, sketch";

    // 2. Call your secure backend API
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          negative_prompt: negativePrompt,
          width: 512, // Or pull from form
          height: 512, // Or pull from form
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();

      // 3. Find the image in the response (same logic as before)
      let generatedImage: string | null = null;
      
      if (data.output && Array.isArray(data.output) && data.output[0]?.image_url) {
        generatedImage = data.output[0].image_url;
      } else if (data.output && data.output.image_base64) {
        generatedImage = `data:image/jpeg;base64,${data.output.image_base64}`;
      } else if (data.output && data.output.images && data.output.images[0]?.data) {
        generatedImage = `data:image/png;base64,${data.output.images[0].data}`;
      } else {
         console.error("Unexpected response structure:", data);
         throw new Error("Could not find image in API response.");
      }

      setImageUrl(generatedImage);
      setHasGenerated(true);

    } catch (err: any) {
      setError(err.message);
      console.error("API Call Failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };
  // ---------------------------------

  const handleReset = () => {
    setFormData({
      gender: "",
      ageRange: "",
      skinTone: "",
      hairColor: "",
      hairStyle: "",
      eyeColor: "",
      facialShape: "",
      distinctiveFeatures: "",
    });
    setHasGenerated(false);
    setImageUrl(""); // Clear the image
    setError(null); // Clear any errors
  };
  
  // Helper function to download the image
  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "generated-suspect-image.png";
    a.click();
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1
            className="mb-4"
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #f5f5f7 0%, #00BFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Generate Suspect Image
          </h1>
          <p style={{ color: "#a0a0ab", fontSize: "1.125rem" }}>
            Provide detailed descriptions to generate an accurate facial
            reconstruction
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Section (Your code, unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card p-8"
            style={{
              background: "rgba(26, 26, 36, 0.6)",
              backdropFilter: "blur(12px)",
              borderRadius: '24px', // Added for consistency
            }}
          >
            <h2
              className="mb-6 flex items-center gap-2"
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#00BFFF",
              }}
            >
              <Wand2 className="w-6 h-6" />
              Describe the Suspect
            </h2>

            {/* All your form inputs go here... (Omitted for brevity, paste your form code back here) */}
            <div className="space-y-6">
              {/* Gender */}
              <div>
                <Label htmlFor="gender" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Gender
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                  disabled={isGenerating}
                >
                  <SelectTrigger
                    className="rounded-xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="transgender">Transgender</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Range */}
              <div>
                <Label htmlFor="ageRange" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Age Range
                </Label>
                <Input
                  id="ageRange"
                  placeholder="e.g., 25-35 or around 40"
                  value={formData.ageRange}
                  onChange={(e) =>
                    setFormData({ ...formData, ageRange: e.target.value })
                  }
                  disabled={isGenerating}
                  className="rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              {/* Skin Tone */}
              <div>
                <Label htmlFor="skinTone" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Skin Tone
                </Label>
                <Select
                  value={formData.skinTone}
                  onValueChange={(value) =>
                    setFormData({ ...formData, skinTone: value })
                  }
                  disabled={isGenerating}
                >
                  <SelectTrigger
                    className="rounded-xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <SelectValue placeholder="Select skin tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very-fair">Very Fair</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="olive">Olive</SelectItem>
                    <SelectItem value="tan">Tan</SelectItem>
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="dark-brown">Dark Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hair Color */}
              <div>
                <Label htmlFor="hairColor" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Hair Color
                </Label>
                <Input
                  id="hairColor"
                  placeholder="e.g., Black, Brown, Blonde"
                  value={formData.hairColor}
                  onChange={(e) =>
                    setFormData({ ...formData, hairColor: e.target.value })
                  }
                  disabled={isGenerating}
                  className="rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              {/* Hair Style */}
              <div>
                <Label htmlFor="hairStyle" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Hair Style
                </Label>
                <Input
                  id="hairStyle"
                  placeholder="e.g., Short, Curly, Straight"
                  value={formData.hairStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, hairStyle: e.target.value })
                  }
                  disabled={isGenerating}
                  className="rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              {/* Eye Color */}
              <div>
                <Label htmlFor="eyeColor" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Eye Color
                </Label>
                <Select
                  value={formData.eyeColor}
                  onValueChange={(value) =>
                    setFormData({ ...formData, eyeColor: value })
                  }
                  disabled={isGenerating}
                >
                  <SelectTrigger
                    className="rounded-xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <SelectValue placeholder="Select eye color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="hazel">Hazel</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Facial Shape */}
              <div>
                <Label htmlFor="facialShape" className="mb-2 block" style={{ color: "#f5f5f7" }}>
                  Facial Shape
                </Label>
                <Select
                  value={formData.facialShape}
                  onValueChange={(value) =>
                    setFormData({ ...formData, facialShape: value })
                  }
                  disabled={isGenerating}
                >
                  <SelectTrigger
                    className="rounded-xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <SelectValue placeholder="Select facial shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oval">Oval</SelectItem>
                    <SelectItem value="round">Round</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="heart">Heart</SelectItem>
                    <SelectItem value="diamond">Diamond</SelectItem>
                    <SelectItem value="oblong">Oblong</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distinctive Features */}
              <div>
                <Label
                  htmlFor="distinctiveFeatures"
                  className="mb-2 block"
                  style={{ color: "#f5f5f7" }}
                >
                  Distinctive Features
                </Label>
                <Textarea
                  id="distinctiveFeatures"
                  placeholder="Describe scars, tattoos, beard, glasses, etc."
                  value={formData.distinctiveFeatures}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      distinctiveFeatures: e.target.value,
                    })
                  }
                  disabled={isGenerating}
                  className="rounded-xl min-h-[100px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 rounded-xl py-6 group relative overflow-hidden text-base font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, #00BFFF 0%, #0099CC 100%)",
                    border: "none",
                  }}
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        Generate Image
                      </>
                    )}
                  </motion.span>
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={isGenerating}
                  className="rounded-xl px-6 py-6"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <RotateCw className="w-5 h-5" />
                </Button>
              </div>

              {/* Display API Error (if any) */}
              {error && (
                <p className="pt-4 text-center text-red-400">Error: {error}</p>
              )}
            </div>
          </motion.div>


          {/* --- RIGHT PANEL - IMAGE DISPLAY --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col"
          >
            <Card
              className="glass-card aspect-square w-full flex items-center justify-center p-6"
              style={{
                background: "rgba(26, 26, 36, 0.6)",
                backdropFilter: "blur(12px)",
                borderRadius: '24px',
              }}
            >
              <div className="w-full h-full relative">
                {isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Loader2 className="w-16 h-16 animate-spin text-blue-400" />
                    <p className="mt-4 text-lg text-gray-400">Generating portrait...</p>
                  </div>
                )}
                
                {!isGenerating && !hasGenerated && !error && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xl text-gray-500">
                      Your generated image will appear here
                    </p>
                  </div>
                )}

                {hasGenerated && imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Generated suspect"
                    className="w-full h-full object-contain rounded-lg"
                  />
                )}
              </div>
            </Card>

            {/* Download Button */}
            {hasGenerated && imageUrl && (
              <Button
                onClick={handleDownload}
                className="mt-6 rounded-xl py-6 text-base font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, #1e90ff 0%, #00BFFF 100%)",
                  border: "none",
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Image
              </Button>
            )}
          </motion.div>
          {/* ---------------------------------- */}

        </div>
      </div>
    </div>
  );
}