# 工具列表，第三方函数的说明书
tools = [
    {
        "name": "get_closing_price",
        "description": "使用该工具获取指定股票的收盘价格",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "股票名称，例如：贵州茅台，青岛啤酒等",
                },
            },
            "required": ["name"],
        },
    }
]

def get_closing_price(name):
    # 朝第三方 API 请求获取股票的收盘价
    if name == "贵州茅台":
        return '1488.21'
    elif name == "青岛啤酒":
        return '67.92'
    else:
        return '未搜索到该股票'
