import openai

class OpenAIHelper:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.setup_openai_api()

    def setup_openai_api(self):
        # API anahtarını OpenAI ile kullanım için ayarlar
        openai.api_key = self.api_key

    def prompt_generator(self, plant_type: str, disease: str, confidence_level: int, method: str = None) -> str:
        # Kullanıcıdan gelen bilgilere göre bir prompt oluşturur
        prompt = f"Bir çiftçi olarak, {plant_type} bitkisinin {disease} hastalığından etkilendiğini analiz ettim."
        if method:
            prompt += " " + method
        return prompt

    def chat_completion(self, content: str, prompt: str) -> dict:
        # OpenAI API'sini kullanarak sohbet tamamlaması yapar
        try:
            response = openai.ChatCompletion.create(
                model='gpt-3.5-turbo',  # Burada istediğiniz modeli belirtebilirsiniz
                messages=[
                    {'role': 'system', 'content': content},
                    {'role': 'user', 'content': prompt},
                ])
            return {'status': 1, 'response': response.choices[0].message.content}
        except Exception as e:
            return {'status': 0, 'response': str(e)}
        
    def answer(self, result: dict) -> str:
        # API'den gelen yanıtı işler
        if result['status'] == 1:
            return result['response']
        else:
            return "Error: " + result['response']

# # Örnek kullanım:
# api_key = "sk-proj-XuKNWEKdiupI5DPVcLRRT3BlbkFJQ2GHFEig8WC0a1dTN2Xc"  # Gerçek API anahtarınızı buraya yerleştirin
# helper = OpenAIHelper(api_key)
# content = '''Patates için bir tarım danışmanısınız, size gelen veriler ışığında bütün olasılıkları değerlendirmeli ve neyden kaynaklandığını bulmalısınız. ,  bütün olasılıkları maddeler şeklinde çıktı vermelisiniz. Ek olarak hangi durumlarda nasıl ilaçlar kullanılır bunu da yazmalısınız ve onu eklerken Sorun Sebepleri: ve Çözümler: (İlaçların isimleri) olacak şekilde 3 tane madde şekilde sonuç vermelisin.'''
# prompt = helper.prompt_generator("patates", "early_blight", 80, 'Tarlamın yanında İnşaat başladı sonrasında bu sorunları yaşadım')
# result = helper.chat_completion(content, prompt)
# print(helper.answer(result))


