
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'
import multer from 'multer'
import axios from 'axios'
import FormData from 'form-data'

dotenv.config()
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
        timeout: 30000
    }
})

const app = express()
const PORT = process.env.PORT || 5000

const frontendOrigin = (
    process.env.FRONTEND_URL || 'http://localhost:5173'
).replace(/\/+$/, '')

app.use(cors({
    origin: frontendOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
}))


app.use(express.json())


app.post('/api/chat', async (req, res) => {
    try {
        const { message, previousInteractionId } = req.body

        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a message.'
            })
        }

        if (message.length > 4000) {
            return res.status(400).json({
                success: false,
                message: 'Message is too long.'
            })
        }

        const systemInstruction = `
You are Sabz Sehar AI, the intelligent plant and application assistant
for GreeHeal AI.

IDENTITY:
You are already initialized. Never introduce yourself again unless
the user explicitly asks who you are.

YOUR MAIN PURPOSE:
Answer the user's actual question directly. Do not respond with generic
greetings, welcome messages, or introductions when a user asks a question.

PLANT KNOWLEDGE:
GreeHeal AI focuses on these plants:
Aloe Vera, Echeveria, Jade Plant, Haworthia, Sempervivum, Sedum,
Kalanchoe, Agave, Gasteria, String of Pearls, Burro's Tail,
Panda Plant, Lithops, Aeonium, Crassula, Graptopetalum,
Graptoveria, Pachyphytum, Euphorbia and Cotyledon.

ANSWERING RULES:
1. Answer the exact question in the user's latest message.
2. For plant-care questions, provide practical and specific guidance.
3. For Aloe Vera watering, explain that the soil should dry completely
   before watering again. Mention that frequency depends on climate,
   season, pot and growing conditions.
4. For plant descriptions, cover appearance, origin, characteristics,
   sunlight, watering and basic care where relevant.
5. Explain difficult concepts in simple language.
6. Use headings and bullet points when they improve readability.
7. Do not repeat your welcome message after the conversation starts.
8. Never give a generic greeting instead of answering a question.
9. Never invent scientific information. Acknowledge uncertainty.
10. Warn users that Euphorbia latex can be irritating or toxic.
11. Do not claim to see the user's garden or images unless provided.
12. You can also explain Dashboard, My Garden, Explore and
    plant-identification features.
13. If a question is unrelated to plants or GreeHeal AI, politely
    redirect the conversation.

RESPONSE STYLE:
Be friendly, knowledgeable, natural and concise.
Do not start every answer with "Hello" or "Welcome to GreeHeal AI".
`

        const requestConfig = {
            model: 'gemini-3.5-flash-lite',
            input: message.trim(),
            system_instruction: systemInstruction,
            generation_config: {
                temperature: 0.4,
                max_output_tokens: 800
            }
        }

        if (previousInteractionId) {
            requestConfig.previous_interaction_id = previousInteractionId
        }

        console.log('Sending user question to Gemini:', message)

        const interaction = await ai.interactions.create(requestConfig)

        const reply = interaction.output_text

        if (!reply) {
            return res.status(502).json({
                success: false,
                message: 'The assistant could not generate a response.'
            })
        }

        console.log('GreeHeal AI response generated.')

        res.json({
            success: true,
            reply,
            interactionId: interaction.id
        })

    } catch (error) {
        console.error('Gemini chat error:', error)

        res.status(500).json({
            success: false,
            message: 'Unable to generate a response. Please try again.'
        })
    }
})


const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits: { fileSize: 4 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png']

        if (!allowedTypes.includes(file.mimetype)) {
            return callback(new Error('Only JPG and PNG images are supported.'))
        }

        callback(null, true)
    }
})

app.get('/', (req, res) => {
    res.json({ message: 'GreeHeal AI Plant Identification API is running.' })
})

app.post('/api/identify', upload.single('image'), async (req, res) => {
    try {
        if (!process.env.PLANTNET_API_KEY) {
            return res.status(500).json({
                success: false,
                message: 'PlantNet API key is not configured.'
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a plant image.'
            })
        }

        // STEP 1: Identify the plant using PlantNet
        const formData = new FormData()

        formData.append('images', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        })

        formData.append('organs', 'auto')

        const plantNetResponse = await axios.post(
            `https://my-api.plantnet.org/v2/identify/all?api-key=${encodeURIComponent(process.env.PLANTNET_API_KEY)}&lang=en&nb-results=1`,
            formData,
            {
                headers: {
                    ...formData.getHeaders()
                },
                timeout: 60000,
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            }
        )

        const bestResult = plantNetResponse.data.results?.[0]

        if (!bestResult?.species) {
            return res.status(404).json({
                success: false,
                message: 'No plant could be identified. Please try another clear image.'
            })
        }

        const scientificName =
            bestResult.species.scientificNameWithoutAuthor ||
            bestResult.species.scientificName ||
            'Unknown'

        const commonNames = bestResult.species.commonNames || []

        const family =
            bestResult.species.family?.scientificName || 'Unknown'

        // STEP 2: Generate plant information using Gemini
        const prompt = `
You are a professional botanical information assistant.

A plant identification service has identified the uploaded plant as:

Scientific name: ${scientificName}
Possible common names: ${commonNames.join(', ') || 'Not available'}
Plant family: ${family}

Generate a simple and informative profile for this plant.

Return ONLY valid JSON using this exact structure:

{
    "name": "Most widely recognized common name",
    "scientificName": "${scientificName}",
    "uses": [
        "Use 1",
        "Use 2",
        "Use 3"
    ],
    "benefits": [
        "Benefit 1",
        "Benefit 2",
        "Benefit 3"
    ],
    "description": "A short, simple description of the plant."
}

IMPORTANT RULES:
- Use the scientific name to identify the correct species.
- Prefer a recognized common name. If no reliable common name exists, use the scientific name.
- Include only uses that are genuinely associated with this species.
- Do not invent medicinal properties or claim that the plant cures diseases.
- Distinguish traditional uses from scientifically established benefits.
- If a use or benefit is uncertain, do not include it.
- Mention ornamental, environmental, culinary or other relevant uses where appropriate.
- Keep each use and benefit short and understandable.
- Return 3 to 5 uses and 3 to 5 benefits when reliable information is available.
- Do not include confidence scores, predictions, alternative plants or technical identification details.
- Return JSON only. Do not use Markdown code fences.
`

        const interaction = await ai.interactions.create({
            model: 'gemini-3.5-flash-lite',
            input: prompt,
            system_instruction:
                'You provide accurate, cautious and easy-to-understand botanical information. Never invent plant uses or health claims.',
            generation_config: {
                temperature: 0.2,
                max_output_tokens: 1000
            }
        })

        const generatedText = interaction.output_text || ''

        let plantInfo

        try {
            const cleanedText = generatedText
                .replace(/```json/gi, '')
                .replace(/```/g, '')
                .trim()

            plantInfo = JSON.parse(cleanedText)
        } catch (parseError) {
            console.error('Gemini JSON parsing error:', parseError)

            // Fallback if Gemini does not return valid JSON
            plantInfo = {
                name: commonNames[0] || scientificName,
                scientificName,
                uses: [],
                benefits: [],
                description: 'Information could not be generated at this time.'
            }
        }

        // Keep reliable identification data from PlantNet
        // for matching against the user's existing garden collection.
        const plant = {
            name: plantInfo.name || commonNames[0] || scientificName,
            scientificName,
            commonNames,
            family,
            uses: Array.isArray(plantInfo.uses) ? plantInfo.uses : [],
            benefits: Array.isArray(plantInfo.benefits)
                ? plantInfo.benefits
                : [],
            description: plantInfo.description || ''
        }

        return res.json({
            success: true,
            plant
        })

    } catch (error) {
        console.error(
            'Plant identification error:',
            error.response?.data || error.message
        )

        return res.status(error.response?.status || 500).json({
            success: false,
            message: 'Unable to identify this plant. Please try another image.',
            details: error.response?.data || null
        })
    }
})

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            message: error.code === 'LIMIT_FILE_SIZE'
                ? 'Image must be smaller than 4 MB.'
                : error.message
        })
    }

    res.status(400).json({ message: error.message || 'Something went wrong.' })
})

// Local development server
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`GreeHeal AI backend running at http://localhost:${PORT}`)
    })
}

// Export Express app for Vercel
export default app