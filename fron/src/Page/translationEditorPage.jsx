import React, { Component } from 'react'
import { Layout, Tooltip, notification, Form, Input, Button, Row, Col, Card, Affix } from 'antd'
import axios from 'axios'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Content } = Layout
const FormItem = Form.Item

// 提示框
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'successful',
    description: '发布成功，等待小伙伴们的讨论吧',
    duration: 2
  })
}

class translationEditorPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      content: '',
      url: ''
    }
  }

  componentDidMount () {
    // 异步设置编辑器内容
    setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState(null)
      })
    }, 1000)
    this.getArticle()
  }

  getArticle = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/article/' + this.props.match.params.id
      )
      this.setState(function (state) {
        return {
          title: response.data.title,
          content: response.data.content,
          id: response.data.id,
          url: response.data.url
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content.toHTML() // or values.content.toHTML()
        }
        try {
          const response = await axios.post(
            'https://guoliang.online:8080/api/translate/',
            {
              title: submitData.title,
              content: submitData.content,
              pub_date: new Date().toISOString(),
              user: window.localStorage.getItem('url'),
              article: this.state.url
            }
          )
          if (response.status === 201) {
            openNotificationWithIcon('success')
          } else {
            openNotificationWithIcon('error')
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <Content style={{ backgroundColor: '#fff', padding: '20px 80px 20px 80px' }}>
          <Row gutter={30}>
            <Col span={12}>
              <Card title={this.state.title} bordered={false} >
                <div dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ height: '800px', overflowY: 'scroll' }} />
              </Card>
            </Col>
            <Col span={12}>
              <Tooltip title='prompt text'>
                <span>Editor your Text</span>
              </Tooltip>
              <div className='demo-container'>
                <Form onSubmit={this.handleSubmit}>
                  <FormItem label='译文标题'>
                    {getFieldDecorator('title', {
                      rules: [{
                        required: true,
                        message: '请输入标题'
                      }]
                    })(
                      <Input size='large' placeholder='请输入标题' />
                    )}
                  </FormItem>
                  <FormItem label='译文正文'>
                    {getFieldDecorator('content', {
                      validateTrigger: 'onBlur',
                      rules: [{
                        required: true,
                        validator: (_, value, callback) => {
                          if (value.isEmpty()) {
                          } else {
                            callback()
                          }
                        }
                      }]
                    })(
                      <BraftEditor
                        className='my-editor'
                        placeholder='请输入正文内容'
                      />
                    )}
                  </FormItem>
                  <FormItem >
                    <Affix offsetBottom={20} >
                      <Row>
                        <Col span={1} offset={22}>
                          <Button size='large' type='primary' htmlType='submit'>提交</Button>
                        </Col>
                      </Row>
                    </Affix>
                  </FormItem>
                </Form>
              </div>
            </Col>
          </Row>
        </Content>
        <Myfooter />
      </Layout>
    )
  }
}

export default Form.create()(translationEditorPage)