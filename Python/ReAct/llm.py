# 定义一个函数，用于从 LLM 获取响应
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv('.env.local')

client = OpenAI(
    base_url='https://api.deepseek.com/v1',
    api_key=os.getenv('DEEPSEEK_API_KEY')
)