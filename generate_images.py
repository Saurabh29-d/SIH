import asyncio
import base64
import os
from dotenv import load_dotenv
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

load_dotenv('/app/backend/.env')

async def generate_cultural_images():
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        print("EMERGENT_LLM_KEY not found in environment")
        return
    
    image_gen = OpenAIImageGeneration(api_key=api_key)
    
    prompts = [
        "Vibrant tribal festival in Jharkhand with people in colorful traditional costumes dancing around bonfire, orange flames illuminating faces, authentic Indian tribal celebration",
        "Traditional Jharkhand handicrafts display - beautiful terracotta pottery, bamboo crafts, and tribal jewelry with prominent orange and earthy colors, artisan marketplace scene",
        "Jharkhand folk art and tribal paintings on walls showing Sohrai and Khovar art forms with orange ochre pigments, traditional patterns and motifs",
        "Colorful Karma festival celebration in Jharkhand with tribal dancers in orange and red attire, traditional drums, and joyful community gathering",
        "Local artisan crafting traditional Jharkhand handicrafts - dokra metal craft and tribal textiles with rich orange and brown colors in authentic workshop setting",
        "Jharkhand tribal cultural performance with musicians playing traditional instruments, dancers in vibrant orange costumes, authentic cultural celebration scene"
    ]
    
    all_images = []
    
    for i, prompt in enumerate(prompts):
        try:
            print(f"Generating image {i+1}/6: {prompt[:50]}...")
            images = await image_gen.generate_images(
                prompt=prompt,
                model="gpt-image-1",
                number_of_images=1
            )
            
            if images and len(images) > 0:
                # Convert to base64 for easy use in frontend
                image_base64 = base64.b64encode(images[0]).decode('utf-8')
                all_images.append({
                    'id': i+1,
                    'prompt': prompt,
                    'data': f"data:image/png;base64,{image_base64}"
                })
                print(f"✅ Image {i+1} generated successfully")
            else:
                print(f"❌ Failed to generate image {i+1}")
                
        except Exception as e:
            print(f"❌ Error generating image {i+1}: {str(e)}")
    
    print(f"\n🎉 Generated {len(all_images)} cultural heritage images!")
    return all_images

if __name__ == "__main__":
    images = asyncio.run(generate_cultural_images())