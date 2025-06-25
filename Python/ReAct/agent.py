# 导入所需的库
import json  # 用于处理JSON数据
from llm import client  # 导入LLM客户端
from prompt import REACT_PROMPT  # 导入预设的提示模板
from tools import get_closing_price,tools  # 导入工具函数
import re  # 导入正则表达式库

# 定义发送消息到LLM的函数
def send_messages(messages):
    """
    向LLM发送消息并获取响应
    :param messages: 消息列表
    :return: LLM的响应
    """
    response = client.chat.completions.create(
        model="deepseek-chat",  # 使用deepseek-chat模型
        messages=messages,  # 传入消息列表
    )
    return response

if __name__ == "__main__":
    # 设置助手的角色说明
    instructions = "你是一个股票助手，可以回答股票相关的问题"

    # 设置用户查询
    query = "青岛啤酒和贵州茅台的收盘价哪个贵？"
    
    # 使用模板构建完整的提示
    # 使用模板构建完整的提示词
    prompt = REACT_PROMPT.format(
        instructions=instructions,
        tools=tools,
        tool_name="get_closing_price",
        input=query
    )
    
    # 初始化消息列表
    messages = [{"role": "user", "content": prompt}]

    # 开始对话循环
    while True:
        # 发送消息并获取响应
        response = send_messages(messages)
        response_text = response.choices[0].message.content

        # 打印模型的回复
        print("大模型的回复：")
        print(response_text)

        # 检查是否有最终答案
        # 使用正则表达式搜索回复文本中是否包含"Final Answer:"，\s*匹配任意空白字符，(.*)捕获冒号后面的所有内容
        final_answer_match = re.search(r'最终答案:\s*(.*)', response_text)
        if final_answer_match:
            # 从正则匹配结果中提取第一个捕获组(括号内匹配到的内容),即"Final Answer:"后面的文本内容
            final_answer = final_answer_match.group(1)
            print("最终答案:", final_answer)
            break  # 如果有最终答案，结束对话

        # 将模型的回复添加到消息历史
        messages.append(response.choices[0].message)

        # 解析模型回复中的动作和参数
        action_match = re.search(r'Action:\s*(\w+)', response_text)
        action_input_match = re.search(r'Action Input:\s*({.*?}|".*?")', response_text, re.DOTALL)  # 非贪婪匹配，匹配到第一个"}"或"""

        # 如果成功解析到动作和参数
        if action_match and action_input_match:
            tool_name = action_match.group(1)  # 获取工具名称
            params = json.loads(action_input_match.group(1))  # 解析参数
            print("工具名称:", tool_name)
            print("参数:", params)

            if tool_name == "get_closing_price":
                result = get_closing_price(params["name"])
                print("调用第三方 API 结果:", result)
                # 将观察结果添加到消息历史
                messages.append({"role": "user", "content": f"观察结果: {result}"})