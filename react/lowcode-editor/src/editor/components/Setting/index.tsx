import React, { useState, useEffect } from 'react'
import { useComponentsStore } from "../../stores/components"
import { useComponentConfigStore } from "../../stores/component-config"
import { Form, Input, Select, Button, Card, Divider, Space, Typography, Empty } from 'antd'
import { SettingOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

// 属性表单组件
interface PropertyFormProps {
  curComponent: any
  curComponentID: string
  componentConfig: any
  updateComponent: (id: string, props: any) => void
  componentName: string
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  curComponent,
  curComponentID,
  componentConfig,
  updateComponent,
  componentName
}) => {
  const [form] = Form.useForm()
  const [hasChanges, setHasChanges] = useState(false)

  // 初始化表单值
  useEffect(() => {
    if (curComponent) {
      const config = componentConfig[curComponent.name]
      const formValues = {
        ...config?.defaultProps,
        ...curComponent.props
      }
      form.setFieldsValue(formValues)
      setHasChanges(false)
    } else {
      form.resetFields()
      setHasChanges(false)
    }
  }, [curComponent, form, componentConfig])

  // 处理表单值变化
  const handleValuesChange = () => {
    setHasChanges(true)
  }

  // 保存属性配置
  const handleSave = async () => {
    if (!curComponentID) return
    
    try {
      const values = await form.validateFields()
      updateComponent(curComponentID, values)
      setHasChanges(false)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  // 重置表单
  const handleReset = () => {
    if (curComponent) {
      const config = componentConfig[curComponent.name]
      const formValues = {
        ...config?.defaultProps,
        ...curComponent.props
      }
      form.setFieldsValue(formValues)
      setHasChanges(false)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      size="small"
      onValuesChange={handleValuesChange}
      className="space-y-4"
    >
      {/* 基础信息 */}
      <Card size="small" title="基础信息" className="mb-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">组件ID</label>
            <Input value={curComponent.id} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">组件类型</label>
            <Input value={curComponent.name} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">组件描述</label>
            <Input value={curComponent.desc} disabled />
          </div>
        </div>
      </Card>

      {/* 属性配置 */}
      <Card size="small" title="属性配置" className="mb-4">
        {componentName === 'Button' && (
          <>
            <Form.Item
              name="text"
              label="按钮文本"
              rules={[{ required: true, message: '请输入按钮文本' }]}
            >
              <Input placeholder="请输入按钮文本" />
            </Form.Item>
            <Form.Item
              name="type"
              label="按钮类型"
              rules={[{ required: true, message: '请选择按钮类型' }]}
            >
              <Select placeholder="请选择按钮类型">
                <Option value="primary">主要按钮</Option>
                <Option value="default">默认按钮</Option>
                <Option value="dashed">虚线按钮</Option>
                <Option value="text">文本按钮</Option>
                <Option value="link">链接按钮</Option>
              </Select>
            </Form.Item>
            <Form.Item name="size" label="按钮尺寸">
              <Select placeholder="请选择按钮尺寸">
                <Option value="large">大</Option>
                <Option value="middle">中</Option>
                <Option value="small">小</Option>
              </Select>
            </Form.Item>
            <Form.Item name="disabled" label="是否禁用">
              <Select placeholder="请选择">
                <Option value={false}>否</Option>
                <Option value={true}>是</Option>
              </Select>
            </Form.Item>
          </>
        )}

        {componentName === 'Container' && (
          <>
            <Form.Item name="padding" label="内边距">
              <Input placeholder="如：20px" />
            </Form.Item>
            <Form.Item name="margin" label="外边距">
              <Input placeholder="如：10px" />
            </Form.Item>
            <Form.Item name="backgroundColor" label="背景颜色">
              <Input placeholder="如：#ffffff" />
            </Form.Item>
            <Form.Item name="borderRadius" label="圆角">
              <Input placeholder="如：4px" />
            </Form.Item>
          </>
        )}

        {componentName === 'Page' && (
          <>
            <Form.Item name="title" label="页面标题">
              <Input placeholder="请输入页面标题" />
            </Form.Item>
            <Form.Item name="backgroundColor" label="背景颜色">
              <Input placeholder="如：#ffffff" />
            </Form.Item>
            <Form.Item name="padding" label="内边距">
              <Input placeholder="如：20px" />
            </Form.Item>
          </>
        )}
      </Card>

      {/* 操作按钮 */}
      <Card size="small">
        <Space>
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            保存配置
          </Button>
          <Button 
            icon={<UndoOutlined />}
            onClick={handleReset}
            disabled={!hasChanges}
          >
            重置
          </Button>
        </Space>
      </Card>
    </Form>
  )
}

export default function Setting() {
  const { curComponent, curComponentID, updateComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  // 根据组件类型渲染不同的属性编辑器
  const renderPropertyEditor = () => {
    if (!curComponent) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请选择一个组件进行配置"
        />
      )
    }

    const componentName = curComponent.name
    
    return (
      <PropertyForm 
        curComponent={curComponent}
        curComponentID={curComponentID?.toString() || ''}
        componentConfig={componentConfig}
        updateComponent={(id, props) => updateComponent(Number(id), props)}
        componentName={componentName}
      />
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <SettingOutlined className="text-blue-500" />
          <Title level={4} className="!mb-0">属性配置</Title>
        </div>
        {curComponent && (
          <Text type="secondary" className="text-sm">
            {curComponent.name} #{curComponent.id}
          </Text>
        )}
      </div>

      {/* 内容区域 */}
      <div className="flex-1 p-4 overflow-auto">
        {renderPropertyEditor()}
      </div>

      {/* 底部信息 */}
      {curComponent && (
        <>
          <Divider className="!my-2" />
          <div className="p-4 bg-gray-50">
            <Text type="secondary" className="text-xs">
              提示：修改属性后点击保存按钮生效
            </Text>
          </div>
        </>
      )}
    </div>
  )
}
