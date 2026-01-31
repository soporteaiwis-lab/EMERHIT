import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateArtistBio = async (name: string, genre: string, keywords: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key not found, returning mock response.");
    return `(Mock AI) Bio generated for ${name}. This artist specializes in ${genre} and is known for ${keywords}.`;
  }

  try {
    const prompt = `
      Actúa como un experto en marketing musical para artistas emergentes en Latinoamérica.
      Escribe una biografía breve, atractiva y profesional (máximo 80 palabras) para una banda/artista llamada "${name}".
      
      Género: ${genre}
      Palabras clave/Vibe: ${keywords}
      
      La biografía es para su perfil en "EMERHIT", una plataforma que conecta artistas con radios locales.
      El tono debe ser inspirador pero profesional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No se pudo generar la biografía.";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Error al conectar con el asistente de redacción.";
  }
};

export const generateRadioPitch = async (artistName: string, songTitle: string, radioName: string): Promise<string> => {
    if (!apiKey) {
        return `Hola ${radioName}, soy ${artistName} y me gustaría presentarles mi single "${songTitle}".`;
    }

    try {
        const prompt = `
          Escribe un mensaje corto y directo (pitch de correo electrónico) de parte del artista "${artistName}" para la radio "${radioName}".
          El objetivo es presentar el single "${songTitle}" para que lo consideren en su programación.
          Sé educado, breve y profesional.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
    
        return response.text || "Error generando el pitch.";
      } catch (error) {
        console.error("Error generating pitch:", error);
        return "Error generando el mensaje.";
      }
}