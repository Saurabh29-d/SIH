import asyncio
import base64
import os
from dotenv import load_dotenv
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

load_dotenv('/app/backend/.env')

async def save_cultural_images():
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
    
    # Create images directory
    os.makedirs('/app/frontend/public/images', exist_ok=True)
    
    image_urls = []
    
    for i, prompt in enumerate(prompts):
        try:
            print(f"Generating and saving image {i+1}/6...")
            images = await image_gen.generate_images(
                prompt=prompt,
                model="gpt-image-1",
                number_of_images=1
            )
            
            if images and len(images) > 0:
                # Save as actual image file
                filename = f"cultural_heritage_{i+1}.png"
                filepath = f"/app/frontend/public/images/{filename}"
                
                with open(filepath, "wb") as f:
                    f.write(images[0])
                
                # Create URL for use in code
                image_url = f"/images/{filename}"
                image_urls.append(image_url)
                
                print(f"✅ Image {i+1} saved as {filename}")
            else:
                print(f"❌ Failed to generate image {i+1}")
                
        except Exception as e:
            print(f"❌ Error generating image {i+1}: {str(e)}")
    
    print(f"\n🎉 Saved {len(image_urls)} cultural heritage images!")
    print("\n📝 Image URLs for your code:")
    for i, url in enumerate(image_urls, 1):
        print(f"Image {i}: {url}")
    
    return image_urls

if __name__ == "__main__":
    asyncio.run(save_cultural_images())