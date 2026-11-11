import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
        timeout: 30000
    }
})

async function testGemini() {
    try {
        console.log('Testing Gemini connection...')

        const response = await ai.interactions.create({
            model: 'gemini-3.8-flash',
            input: 'Say hello in one short sentence.'
        })

        console.log('SUCCESS:', response.output_text)

    } catch (error) {
        console.error('FAILED:', error)
    }
}

testGemini()