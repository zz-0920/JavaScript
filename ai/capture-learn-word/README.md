
## 🔧 核心功能实现

### 图片上传与处理

应用使用 `FileReader` API 将用户上传的图片转换为 base64 格式，然后发送给 AI 服务进行分析。

### AI 图片识别

集成 Moonshot AI 的视觉模型，能够：
- 识别图片内容
- 提取代表性英语单词（A1-A2级别）
- 生成例句和详细解释
- 提供互动式回复建议

### 语音合成

使用火山引擎 TTS API 为识别出的单词生成语音，支持：
- 多种音色选择
- 语速调节
- 情感语调

### 响应式UI

- 渐变背景设计
- 流畅的展开/收起动画
- 移动端适配
- 现代化交互体验

## 📝 使用说明

1. **上传图片**：点击图片区域选择要分析的图片
2. **AI分析**：应用自动调用AI服务分析图片内容
3. **学习内容**：查看生成的单词、例句和解释
4. **语音播放**：点击播放按钮听取单词发音
5. **详细学习**：点击"Talk about it"查看更多学习内容

## 🛠️ 开发指南

### 代码规范

项目使用 ESLint 进行代码规范检查：

```bash
npm run lint
```

### 类型检查

使用 TypeScript 进行静态类型检查，确保代码质量。

### 组件开发

- 使用函数式组件和 React Hooks
- 遵循单一职责原则
- 合理使用 TypeScript 接口定义

## 🔌 API 集成

### Moonshot AI API

```typescript
const endpoint = "https://api.moonshot.cn/v1/chat/completions"
const model = "moonshot-v1-8k-vision-preview"
```

### TTS API

```typescript
const endpoint = "/tts/api/v1/tts"
const voiceType = "zh_female_linjianvhai_moon_bigtts"
```

## 🎯 应用场景

- **英语学习者**：通过图片学习新单词，增强记忆效果
- **教育工作者**：快速为教学材料生成词汇解释
- **内容创作者**：为图片内容生成英语描述
- **语言练习**：结合视觉和听觉的多感官学习

## 🚧 未来规划

- [ ] 支持更多语言对
- [ ] 添加学习进度跟踪
- [ ] 实现单词收藏功能
- [ ] 增加语法分析功能
- [ ] 支持批量图片处理


## 🙏 致谢

- [Moonshot AI](https://www.moonshot.cn/) - 提供强大的AI图片识别服务
- [火山引擎](https://www.volcengine.com/) - 提供高质量的语音合成服务
- [React](https://reactjs.org/) - 优秀的前端框架
- [Vite](https://vitejs.dev/) - 快速的构建工具

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！