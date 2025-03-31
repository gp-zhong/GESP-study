# CCF-GESP 学习小程序

基于React Native开发的CCF-GESP学习移动应用，帮助用户准备CCF-GESP考试。

## 功能特性

- **知识点预习**：系统化展示GESP考试知识点，方便用户学习和复习
- **习题练习**：精选习题，按难度和类型进行分类，强化训练
- **问答讨论**：社区交流，可提问并获得解答
- **真题练习**：提供历年真题，结合DeepSeek AI提供解析
- **个人学习管理**：收藏、学习记录、错题本等功能

## 设计风格

- 现代简约的天空蓝和白色为主色调，辅以浅绿和黄色点缀
- 使用思源黑体(Noto Sans SC)作为主要字体，保证中文显示美观
- 简洁的线条图标和几何形状设计元素，营造高端科技感
- 流畅的动画和过渡效果，提升用户体验

## 技术栈

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Font
- React Native Vector Icons
- React Native Reanimated
- React Native Paper

## 项目结构

```
src/
  ├── assets/         # 图片、字体等静态资源
  ├── components/     # 可复用组件
  ├── constants/      # 常量定义
  ├── hooks/          # 自定义React Hooks
  ├── screens/        # 页面组件
  ├── types/          # TypeScript类型定义
  └── utils/          # 工具函数
```

## 主要页面

1. **知识点页面**：展示热门知识点和完整知识点列表
2. **知识点详情**：详细介绍特定知识点，包括相关习题和真题推荐
3. **习题列表**：展示按难度和类型分类的习题
4. **习题详情**：习题内容、代码编辑器、DeepSeek AI解析
5. **讨论社区**：问题列表和提问界面
6. **真题列表**：按年份和级别展示真题
7. **真题详情**：真题内容和AI解析
8. **个人中心**：用户信息和设置选项

## DeepSeek API集成

应用集成DeepSeek大模型能力，为习题和真题提供智能解析。用户可以在设置中配置：

- API KEY
- API端点
- API模型选择

## 本地开发

1. 克隆项目:
   ```
   git clone [repo-url]
   ```

2. 安装依赖:
   ```
   cd gesp-study-app
   npm install
   ```

3. 启动开发服务器:
   ```
   npm start
   ```

4. 使用Expo Go应用扫描二维码在手机上运行，或使用模拟器

## 注意事项

- 需要配置DeepSeek API KEY才能使用AI解析功能
- 图标资源需要从FontAwesome获取 