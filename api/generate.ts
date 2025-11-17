// File: /api/generate.ts
//
// This is your secure backend API.
// It now passes all Stable Diffusion parameters to RunPod.

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. Get all Stable Diffusion parameters from the request body
    //    We destructure the body to get all expected values.
    const { prompt, negative_prompt, width, height, num_inference_steps, seed } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // 2. Get your secret keys from Environment Variables
    const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;
    const RUNPOD_RUNSYNC_URL = process.env.RUNPOD_RUNSYNC_URL;

    if (!RUNPOD_API_KEY || !RUNPOD_RUNSYNC_URL) {
      console.error('Missing RunPod environment variables on the server.');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // 3. Prepare the complete request body for RunPod
    //    This is the key change for Stable Diffusion.
    const runpodRequestBody = {
      input: {
        prompt: prompt,
        negative_prompt: negative_prompt || "blurry, low quality, deformed, extra limbs", // Add a default
        width: width || 512,                     // Add a default
        height: height || 512,                   // Add a default
        num_inference_steps: num_inference_steps || 25, // Add a default
        seed: seed || Math.floor(Math.random() * 1000000), // Random seed
        // Add any other parameters your specific model needs
        // e.g., "sampler_name": "DPM++ 2M Karras"
      },
    };

    // 4. Securely call the RunPod API
    const response = await fetch(RUNPOD_RUNSYNC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RUNPOD_API_KEY}`,
      },
      body: JSON.stringify(runpodRequestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('RunPod API Error:', errorData);
      return res.status(response.status).json({ message: 'Failed to generate image', details: errorData });
    }

    // 5. Send the result back to React (no change here)
    const data = await response.json();
    res.status(200).json(data);

  } catch (error: any) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}