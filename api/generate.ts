// File: /api/generate.ts
//
// THIS IS THE CORRECT CODE FOR YOUR STANDARD POD (A1111)

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
    // 1. Get parameters from your React frontend
    const { prompt, negative_prompt, width, height } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // 2. Get your Pod's URL from the Vercel Environment Variables
    //    THIS IS THE CORRECT VARIABLE NAME
    const POD_API_URL = process.env.RUNPOD_A1111_API_URL;

    // 3. Check if the variable was found
    if (!POD_API_URL) {
      console.error('Missing RUNPOD_A1111_API_URL environment variable.');
      // This is the error you are seeing!
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // 4. Create the payload for the Automatic1111 API
    const a1111Payload = {
      prompt: prompt,
      negative_prompt: negative_prompt || "blurry, low quality, deformed",
      steps: 25,
      width: width || 512,
      height: height || 512,
      sampler_name: "Euler a", // A good default sampler
    };

    // 5. Call your Pod's API
    const response = await fetch(POD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // No 'Authorization' header is needed for this
      },
      body: JSON.stringify(a1111Payload),
    });

    if (!response.ok) {
      const errorData = await response.text(); // A1111 errors are often text
      console.error('A1111 Pod API Error:', errorData);
      return res.status(response.status).json({ message: 'Failed to generate image', details: errorData });
    }

    // 6. Process the A1111 response
    //    It returns { "images": ["base64_string"] }
    const data = await response.json();

    if (!data.images || !data.images[0]) {
      console.error('Invalid response from A1111 Pod:', data);
      return res.status(500).json({ message: 'Received no image from pod' });
    }

    // 7. Send the image back to the frontend in the format it expects
    res.status(200).json({
      output: {
        image_base64: data.images[0], // This is just the base64 string
      },
    });

  } catch (error: any) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}