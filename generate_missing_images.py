import asyncio
import base64
import os
from dotenv import load_dotenv
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

load_dotenv('/app/backend/.env')

async def generate_missing_destination_images():
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        print("EMERGENT_LLM_KEY not found in environment")
        return
    
    image_gen = OpenAIImageGeneration(api_key=api_key)
    
    # Missing destination images
    prompts = [
        "Betla National Park in Jharkhand India - lush green forest with tigers and elephants, wildlife sanctuary with dense vegetation, realistic nature photography style",
        "Traditional tribal village in Jharkhand with authentic mud houses, thatched roofs, village life, tribal people in traditional attire, rural landscape setting",
        "Hundru Falls waterfall in Jharkhand - spectacular 98 meter waterfall cascading down rocky cliffs, surrounded by green forest, mist and natural beauty",
        "Jharkhand wildlife scene in Betla National Park - elephants in natural habitat, dense forest background, wildlife photography style"
    ]
    
    filenames = [
        "betla_national_park.png",
        "tribal_village.png", 
        "hundru_falls_realistic.png",
        "jharkhand_wildlife.png"
    ]
    
    # Create images directory if it doesn't exist
    os.makedirs('/app/frontend/public/images', exist_ok=True)
    
    image_urls = []
    
    for i, (prompt, filename) in enumerate(zip(prompts, filenames)):
        try:
            print(f"Generating missing image {i+1}/4: {filename}")
            images = await image_gen.generate_images(
                prompt=prompt,
                model="gpt-image-1",
                number_of_images=1
            )
            
            if images and len(images) > 0:
                # Save as actual image file
                filepath = f"/app/frontend/public/images/{filename}"
                
                with open(filepath, "wb") as f:
                    f.write(images[0])
                
                # Create URL for use in code
                image_url = f"/images/{filename}"
                image_urls.append({
                    'filename': filename,
                    'url': image_url,
                    'description': prompt[:50] + "..."
                })
                
                print(f"✅ {filename} saved successfully")
            else:
                print(f"❌ Failed to generate {filename}")
                
        except Exception as e:
            print(f"❌ Error generating {filename}: {str(e)}")
    
    print(f"\n🎉 Generated {len(image_urls)} missing destination images!")
    print("\n📝 New Image URLs:")
    for img in image_urls:
        print(f"- {img['filename']}: {img['url']}")
    
    return image_urls

if __name__ == "__main__":
    asyncio.run(generate_missing_destination_images())