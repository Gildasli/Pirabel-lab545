
import { GoogleGenAI, Type } from "@google/genai";
import { SEOAuditResult, KeywordMetric, UserPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async performDeepAudit(url: string, html: string): Promise<SEOAuditResult> {
    const prompt = `Act as a Senior SEO Engineer. Analyze the following HTML from ${url}:
    ${html.substring(0, 10000)}
    Perform a full technical audit including:
    - Metadata quality (Title, Description, Canonical)
    - Heading hierarchy and semantics
    - Core Web Vitals (simulated/estimated based on structure)
    - Security headers
    - SSL certificate expiry information if available
    - 20 actionable recommendations with impact scores (0-100)
    - SEO score (0-100)`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            metaTags: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                keywords: { type: Type.STRING },
                canonical: { type: Type.STRING },
                robots: { type: Type.STRING }
              }
            },
            headings: {
              type: Type.OBJECT,
              properties: {
                h1: { type: Type.ARRAY, items: { type: Type.STRING } },
                h2: { type: Type.ARRAY, items: { type: Type.STRING } },
                h3: { type: Type.ARRAY, items: { type: Type.STRING } },
                hierarchyScore: { type: Type.NUMBER }
              }
            },
            performance: {
              type: Type.OBJECT,
              properties: {
                loadSpeed: { type: Type.NUMBER },
                pageSize: { type: Type.STRING },
                requestCount: { type: Type.NUMBER }
              }
            },
            coreWebVitals: {
              type: Type.OBJECT,
              properties: {
                lcp: { type: Type.NUMBER },
                fid: { type: Type.NUMBER },
                cls: { type: Type.NUMBER }
              }
            },
            security: {
              type: Type.OBJECT,
              properties: {
                https: { type: Type.BOOLEAN },
                sslExpiry: { type: Type.STRING },
                securityHeaders: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  category: { type: Type.STRING },
                  message: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                  impact: { type: Type.NUMBER }
                }
              }
            },
            images: {
              type: Type.OBJECT,
              properties: {
                total: { type: Type.NUMBER },
                missingAlt: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  },

  async getKeywordIntelligence(seed: string): Promise<KeywordMetric[]> {
    const prompt = `Act as SEMrush Keyword Magic Tool. Generate 15 high-value keywords related to "${seed}". 
    Provide real-world estimated search volume, Keyword Difficulty (KD%), CPC in USD, and User Intent (Informational, Transactional, etc.).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              keyword: { type: Type.STRING },
              volume: { type: Type.NUMBER },
              kd: { type: Type.NUMBER },
              cpc: { type: Type.NUMBER },
              intent: { type: Type.STRING },
              trend: { type: Type.ARRAY, items: { type: Type.NUMBER } }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  },

  async generateUltraLongArticle(topic: string, plan: UserPlan): Promise<{ title: string; content: string; outline: string[] }> {
    const wordCount = plan === UserPlan.AGENCY ? 5000 : plan === UserPlan.PRO ? 3000 : 1000;
    
    const prompt = `Act as an Elite SEO Content Architect. Write a ${wordCount}-word definitive guide about "${topic}".
    Structure it with high-impact H2 and H3 tags. 
    Include internal link placeholders, semantic clusters, and a FAQ section of 10 items.
    Use HTML format for the content. Output as JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            outline: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  }
};
